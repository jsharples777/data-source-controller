import debug from 'debug';
import { Collection } from './Collection';
import {DataSource} from "./DataSource";
import { derivedField, View } from './View';


const logger = debug('data-source-controller');

type DataSourceItem = {
    source: DataSource,
    isPrimary: boolean
}

export class DataSourceController implements DataSource {
    private static _instance: DataSourceController;

    public static getInstance(): DataSourceController {
        if (!DataSourceController._instance) {
            DataSourceController._instance = new DataSourceController();
        }
        return DataSourceController._instance;
    }


    private controllerConfigs: DataSourceItem[] = [];
    private primarySource: DataSource | undefined = undefined;

    private constructor() {
    }

    createView(collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]): View {
        return this.getPrimaryDataSource().createView(collection,name, fields, search, sort, derivedFields);
    }

    view(name: string): View {
        return this.getPrimaryDataSource().view(name);
    }

    public collection(name:string):Collection {
        return new Collection(name);
    }


    public addDataSource(source: DataSource, isPrimary: boolean) {
        if (isPrimary) {
            this.primarySource = source;
        } else {
            this.controllerConfigs.push({
                source,
                isPrimary
            });
        }
    }

    protected getPrimaryDataSource(): DataSource {
        if (!this.primarySource) {
            this.primarySource = this.controllerConfigs[0].source;
        }
        return this.primarySource;
    }

    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    deleteOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().deleteOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteOne(collection, object).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    deleteMany(collection: string, filter: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteMany(collection, filter).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteMany(collection, filter).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    find(collection: string, filter?: any, sort?: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().find(collection, filter, sort).then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        })

    }

    findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().findOne(collection, filter).then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    findByKey(collection: string, key: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().findByKey(collection, key).then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    insertMany(collection: string, objects: any[]): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().insertMany(collection, objects).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertMany(collection, objects).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    insertOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {


            this.getPrimaryDataSource().insertOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertOne(collection, object).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {


            this.getPrimaryDataSource().replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });
        ;
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().replaceCompositeElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeElement(collection, parentObjectKey, propertyName, childObject).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    replaceOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().replaceOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    updateOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.replaceOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    deleteAll(collection: string): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().deleteAll(collection).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteAll(collection).then((childResults) => {

                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    collections(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().collections().then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });

        });

    }

    shutdown(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().shutdown().then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.shutdown().then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve();
            }).catch((err) => {
                logger(err);
            });

        });

    }



}
