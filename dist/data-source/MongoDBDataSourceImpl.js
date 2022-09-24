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
const logger = debug_1.default('mongo-data-source');
class MongoDBDataSourceImpl {
    constructor() {
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            let obj = {};
            obj[propertyName] = childObject;
            logger(`Inserting into collection ${collection} with new array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $push: obj }).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            let pullObj = {};
            pullObj[propertyName] = { _id: childObject._id };
            logger(`Updating collection ${collection} with updated array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $pull: pullObj }).then((result) => {
                    logger(result);
                    let obj = {};
                    obj[propertyName] = childObject;
                    db.collection(collection).updateOne({ _id: parentObjectKey }, { $push: obj }).then((result) => {
                        logger(result);
                        resolve();
                    }).catch((err) => {
                        logger(err);
                        reject(err);
                    });
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey) {
        return new Promise((resolve, reject) => {
            let obj = {};
            obj[propertyName] = { _id: childObjectKey };
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $pull: obj }).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            logger(`Updating collection ${collection}  with updated field ${propertyName} with id ${childObject._id}`);
            let obj = {};
            obj[propertyName] = childObject;
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $set: obj }).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    deleteOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collection(collection).deleteOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    deleteMany(collection, filter) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collection(collection).deleteMany(filter).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    find(collection, filter, sort) {
        return new Promise((resolve, reject) => {
            let localFilter = {};
            if (filter) {
                localFilter = filter;
            }
            let localSort = {};
            if (sort) {
                localSort = sort;
            }
            this.getDatabase().then((db) => {
                db.collection(collection).find(localFilter).sort(localSort).toArray().then((result) => {
                    resolve(result);
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    findOne(collection, filter) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collection(collection).find(filter).toArray().then((result) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    }
                    else {
                        resolve(undefined);
                    }
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    insertMany(collection, objects) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collection(collection).insertMany(objects).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    insertOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collection(collection).insertOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    replaceOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collection(collection).replaceOne({ _id: object._id }, object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
    updateOne(collection, object) {
        return this.replaceOne(collection, object);
    }
    getDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
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
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                db.collections().then((collections) => {
                    const results = [];
                    collections.forEach((collection) => {
                        results.push(collection.collectionName);
                    });
                    resolve(results);
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });
            });
        });
    }
}
exports.MongoDBDataSourceImpl = MongoDBDataSourceImpl;
//# sourceMappingURL=MongoDBDataSourceImpl.js.map