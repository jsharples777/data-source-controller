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
        mongo_access_jps_1.MongoDataSource.getInstance().initialise();
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, logger) => {
            let obj = {};
            obj[propertyName] = childObject;
            console.log(`Inserting into collection ${collection} with new array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $push: obj }).then((result) => {
                    console.log(result);
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, logger) => {
            let pullObj = {};
            pullObj[propertyName] = { _id: childObject._id };
            console.log(`Updating collection ${collection} with updated array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $pull: pullObj }).then((result) => {
                    console.log(result);
                    let obj = {};
                    obj[propertyName] = childObject;
                    db.collection(collection).updateOne({ _id: parentObjectKey }, { $push: obj }).then((result) => {
                        console.log(result);
                        resolve();
                    }).catch((err) => {
                        console.log(err);
                        logger(err);
                    });
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey) {
        return new Promise((resolve, logger) => {
            console.log(`Updating collection ${collection} removing array element for field ${propertyName} with id ${childObjectKey}`);
            let obj = {};
            obj[propertyName] = { _id: childObjectKey };
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $pull: obj }).then((result) => {
                    console.log(result);
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, logger) => {
            console.log(`Updating collection ${collection}  with updated field ${propertyName} with id ${childObject._id}`);
            let obj = {};
            obj[propertyName] = childObject;
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne({ _id: parentObjectKey }, { $set: obj }).then((result) => {
                    console.log(result);
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    deleteOne(collection, object) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                console.log(`Collection ${collection} removing id ${object._id}`);
                db.collection(collection).deleteOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    deleteMany(collection, filter) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                console.log(`Collection ${collection} removing many with filter`);
                console.log(filter);
                db.collection(collection).deleteMany(filter).then((result) => {
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
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
            console.log(`Collection ${collection} finding with filter`);
            console.log(filter);
            this.getDatabase().then((db) => {
                if (sort) {
                    console.log(`Collection ${collection} finding with filter and sorting`);
                    console.log(sort);
                    db.collection(collection).find(localFilter).sort(sort).toArray().then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        console.log(err);
                        logger(err);
                    });
                }
                else {
                    db.collection(collection).find(localFilter).toArray().then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        console.log(err);
                        logger(err);
                    });
                }
            });
        });
    }
    findOne(collection, filter) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                console.log(`Collection ${collection} finding one with filter`);
                console.log(filter);
                db.collection(collection).find(filter).toArray().then((result) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    }
                    else {
                        resolve(undefined);
                    }
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    insertMany(collection, objects) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                console.log(`Collection ${collection} inserting many`);
                console.log(objects);
                db.collection(collection).insertMany(objects).then((result) => {
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    insertOne(collection, object) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                console.log(`Collection ${collection} inserting one`);
                console.log(object);
                db.collection(collection).insertOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
    replaceOne(collection, object) {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                console.log(`Collection ${collection} replacing one`);
                console.log(object);
                db.collection(collection).replaceOne({ _id: object._id }, object).then((result) => {
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    logger(err);
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
                    console.log(err);
                    logger(err);
                });
            });
        });
    }
}
exports.MongoDBDataSourceImpl = MongoDBDataSourceImpl;
//# sourceMappingURL=MongoDBDataSourceImpl.js.map