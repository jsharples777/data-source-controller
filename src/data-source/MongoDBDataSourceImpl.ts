import {DataSource} from "./DataSource";
import {MongoDataSource} from "mongo-access-jps";
import debug from 'debug';
import {Db} from "mongodb";

const logger = debug('mongo-data-source');

export class MongoDBDataSourceImpl implements DataSource {

    constructor() {

    }


    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
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
                    reject(err);
                });

            })
        });
    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
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
                        reject(err);
                    });
                }).catch((err) => {
                    logger(err);
                    reject(err);
                });

            });
        });
    }

    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void> {
        return new Promise((resolve, reject) => {
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
                    reject(err);
                });
            });

        });
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
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
                    reject(err);
                });

            });
        });

    }

    deleteOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {

                db.collection(collection).deleteOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                })

            });
        });

    }

    deleteMany(collection: string, filter: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {

                db.collection(collection).deleteMany(filter).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                })

            });
        });

    }

    find(collection: string, filter?: any, sort?: any): Promise<any[]> {
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
                })


            });
        });

    }

    findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {

                db.collection(collection).find(filter).toArray().then((result) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve(undefined);
                    }
                }).catch((err) => {
                    logger(err);
                    reject(err);
                })
            });
        });

    }

    insertMany(collection: string, objects: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {

                db.collection(collection).insertMany(objects).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                })

            });
        });

    }

    insertOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {

                db.collection(collection).insertOne(object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                })

            });
        });

    }

    replaceOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {

                db.collection(collection).replaceOne({_id: object._id}, object).then((result) => {
                    resolve();
                }).catch((err) => {
                    logger(err);
                    reject(err);
                })

            });
        });
    }

    updateOne(collection: string, object: any): Promise<void> {
        return this.replaceOne(collection, object);
    }


    public async getDatabase(): Promise<Db> {
        return new Promise((resolve, reject) => {
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

}
