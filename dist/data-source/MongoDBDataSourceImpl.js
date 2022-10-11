"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBDataSourceImpl = void 0;
const mongo_access_jps_1 = require("mongo-access-jps");
const debug_1 = __importDefault(require("debug"));
const DataSourceController_1 = require("./DataSourceController");
const MongoView_1 = require("./MongoView");
const moment_1 = __importDefault(require("moment/moment"));
const logger = debug_1.default('mongo-data-source-impl');
const errorLogger = debug_1.default('mongo-data-source-impl-error');
class MongoDBDataSourceImpl {
    constructor() {
        this.views = [];
        mongo_access_jps_1.MongoDataSource.getInstance().initialise();
    }
    shutdown() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, logger) => {
            let obj = {};
            obj[propertyName] = childObject;
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            let modified = {};
            modified[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            logger(`Inserting into collection ${collection} with new array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $push: obj, $set: modified }).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, logger) => {
            let pullObj = {};
            pullObj[propertyName] = { _id: childObject._id };
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            let modified = {};
            modified[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            logger(`Updating collection ${collection} with updated array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $pull: pullObj }).then((result) => {
                    logger(result);
                    let obj = {};
                    obj[propertyName] = childObject;
                    db.collection(collection).updateOne({ _id: parentObjectKey }, { $push: obj, $set: modified }).then((result) => {
                        logger(result);
                        resolve();
                    }).catch((err) => {
                        logger(err);
                        errorLogger(err);
                    });
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey) {
        return new Promise((resolve, logger) => {
            logger(`Updating collection ${collection} removing array element for field ${propertyName} with id ${childObjectKey}`);
            let obj = {};
            obj[propertyName] = { _id: childObjectKey };
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            let modified = {};
            modified[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $pull: obj, $set: modified }).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, logger) => {
            logger(`Updating collection ${collection}  with updated field ${propertyName} with id ${childObject._id}`);
            let obj = {};
            obj[propertyName] = childObject;
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            obj[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $set: obj }).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    deleteOne(collection, object) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} removing id ${object._id}`);
                db.collection(collection).deleteOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    deleteMany(collection, filter) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} removing many with filter`);
                logger(filter);
                db.collection(collection).deleteMany(filter).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    find(collection, filter, sort) {
        return new Promise((resolve, logger) => {
            let localFilter = {};
            if (filter) {
                localFilter = filter;
            }
            logger(`Collection ${collection} finding with filter`);
            logger(filter);
            this.getDatabase().then((db) => {
                if (sort) {
                    logger(`Collection ${collection} finding with filter and sorting`);
                    logger(sort);
                    db.collection(collection).find(localFilter).sort(sort).toArray().then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        logger(err);
                        errorLogger(err);
                    });
                }
                else {
                    db.collection(collection).find(localFilter).toArray().then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        logger(err);
                        errorLogger(err);
                    });
                }
            });
        });
    }
    findOne(collection, filter) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} finding one with filter`);
                logger(filter);
                db.collection(collection).find(filter).toArray().then((result) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    }
                    else {
                        resolve(undefined);
                    }
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    findByKey(collection, key) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} finding one with key`);
                logger(key);
                db.collection(collection).find({ _id: key }).toArray().then((result) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    }
                    else {
                        resolve(undefined);
                    }
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    insertMany(collection, objects) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} inserting many`);
                logger(objects);
                const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
                objects.forEach((obj) => {
                    obj[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
                    obj[DataSourceController_1.DataSourceController.FIELD_Created] = now;
                });
                db.collection(collection).insertMany(objects).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    insertOne(collection, object) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} inserting one`);
                logger(object);
                const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
                object[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
                object[DataSourceController_1.DataSourceController.FIELD_Created] = now;
                db.collection(collection).insertOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    replaceOne(collection, object) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} replacing one`);
                logger(object);
                const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
                object[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
                db.collection(collection).replaceOne({ _id: object._id }, object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    updateOne(collection, object) {
        return this.replaceOne(collection, object);
    }
    getDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, logger) => {
                if (mongo_access_jps_1.MongoDataSource.getInstance().isDatabaseReady()) {
                    mongo_access_jps_1.MongoDataSource.getInstance().getDatabase().then((db) => {
                        resolve(db);
                    });
                }
                let interval = setInterval(() => {
                    if (mongo_access_jps_1.MongoDataSource.getInstance().isDatabaseReady()) {
                        clearInterval(interval);
                        mongo_access_jps_1.MongoDataSource.getInstance().getDatabase().then((db) => {
                            resolve(db);
                        });
                    }
                }, 1000);
            });
        });
    }
    deleteAll(collection) {
        return this.deleteMany(collection, {});
    }
    collections() {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                db.collections().then((collections) => {
                    const results = [];
                    collections.forEach((collection) => {
                        results.push(collection.collectionName);
                    });
                    resolve(results);
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });
        });
    }
    createView(collection, name, fields, search, sort, derivedFields) {
        const foundIndex = this.views.findIndex((view) => view.name === name);
        if (foundIndex < 0) {
            const view = new MongoView_1.MongoView(this, collection, name, fields, search, sort, derivedFields);
            this.views.push({
                name,
                view
            });
        }
        return this.view(name);
    }
    view(name) {
        const foundIndex = this.views.findIndex((view) => view.name === name);
        return this.views[foundIndex].view;
    }
}
exports.MongoDBDataSourceImpl = MongoDBDataSourceImpl;
//# sourceMappingURL=MongoDBDataSourceImpl.js.map