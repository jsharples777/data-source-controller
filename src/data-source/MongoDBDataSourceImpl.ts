import {DataSource} from "./DataSource";
import {MongoDataSource} from "mongo-access-jps";
import debug from 'debug';
import {Db} from "mongodb";

const logger = debug('mongo-data-source-impl');
const errorLogger = debug('mongo-data-source-impl-error');

export class MongoDBDataSourceImpl implements DataSource {

    constructor() {
        MongoDataSource.getInstance().initialise();
    }

    shutdown(): Promise<void> {
        return new Promise((resolve,reject) => {
            resolve();
        })
    }


    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, logger) => {
            let obj: any = {};
            obj[propertyName] = childObject;
            logger(`Inserting into collection ${collection} with new array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne(
                    {_id: parentObjectKey},
                    {$push: obj}).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });

            })
        });
    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, logger) => {
            let pullObj: any = {};
            pullObj[propertyName] = {_id: childObject._id};
            logger(`Updating collection ${collection} with updated array element for field ${propertyName} with id ${childObject._id}`);
            this.getDatabase().then((db) => {
                db.collection(collection).updateOne(
                    {_id: parentObjectKey},
                    {$pull: pullObj}).then((result) => {
                    logger(result);
                    let obj: any = {};
                    obj[propertyName] = childObject;
                    db.collection(collection).updateOne(
                        {_id: parentObjectKey},
                        {$push: obj}).then((result) => {
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

    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void> {
        return new Promise((resolve, logger) => {
            logger(`Updating collection ${collection} removing array element for field ${propertyName} with id ${childObjectKey}`);
            let obj: any = {};
            obj[propertyName] = {_id: childObjectKey};
            this.getDatabase().then((db) => {

                db.collection(collection).updateOne(
                    {_id: parentObjectKey},
                    {$pull: obj}).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });
            });

        });
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, logger) => {
            logger(`Updating collection ${collection}  with updated field ${propertyName} with id ${childObject._id}`);
            let obj: any = {};
            obj[propertyName] = childObject;
            this.getDatabase().then((db) => {

                db.collection(collection).updateOne(
                    {_id: parentObjectKey},
                    {$set: obj}).then((result) => {
                    logger(result);
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                });

            });
        });

    }

    deleteOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} removing id ${object._id}`);

                db.collection(collection).deleteOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })

            });
        });

    }

    deleteMany(collection: string, filter: any): Promise<void> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} removing many with filter`);
                logger(filter);

                db.collection(collection).deleteMany(filter).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })

            });
        });

    }

    find(collection: string, filter?: any, sort?: any): Promise<any[]> {
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
                    })
                }
                else {
                    db.collection(collection).find(localFilter).toArray().then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        logger(err);
                        errorLogger(err);
                    })

                }



            });
        });

    }

    findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} finding one with filter`);
                logger(filter);

                db.collection(collection).find(filter).toArray().then((result) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve(undefined);
                    }
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })
            });
        });

    }

    insertMany(collection: string, objects: any[]): Promise<void> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} inserting many`);
                logger(objects);

                db.collection(collection).insertMany(objects).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })

            });
        });

    }

    insertOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} inserting one`);
                logger(object);

                db.collection(collection).insertOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })

            });
        });

    }

    replaceOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                logger(`Collection ${collection} replacing one`);
                logger(object);

                db.collection(collection).replaceOne({_id: object._id}, object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })

            });
        });
    }

    updateOne(collection: string, object: any): Promise<void> {
        return this.replaceOne(collection, object);
    }


    public async getDatabase(): Promise<Db> {
        return new Promise((resolve, logger) => {
            if (MongoDataSource.getInstance().isDatabaseReady()) {
                MongoDataSource.getInstance().getDatabase().then((db) => {
                    resolve(db);
                })

            }
            let interval = setInterval(() => {
                if (MongoDataSource.getInstance().isDatabaseReady()) {
                    clearInterval(interval);
                    MongoDataSource.getInstance().getDatabase().then((db) => {
                        resolve(db);
                    })
                }
            }, 1000);

        });
    }

    deleteAll(collection: string): Promise<void> {
        return this.deleteMany(collection,{});
    }

    collections(): Promise<string[]> {
        return new Promise((resolve, logger) => {
            this.getDatabase().then((db) => {
                db.collections().then((collections) => {
                    const results:string[] = [];
                    collections.forEach((collection) => {
                        results.push(collection.collectionName);
                    });
                    resolve(results);

                }).catch((err) => {
                    logger(err);
                    errorLogger(err);
                })
            });
        });
    }

}
