import debug from 'debug';
import {DataSource} from "./DataSource";


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
                    config.source.deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    deleteOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().deleteOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteOne(collection, object);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    deleteMany(collection: string, filter: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteMany(collection, filter).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteMany(collection, filter);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    find(collection: string, filter?: any, sort?: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().find(collection, filter, sort).then((results) => {
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        })

    }

    findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().findOne(collection, filter).then((results) => {
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    insertMany(collection: string, objects: any[]): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().insertMany(collection, objects).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertMany(collection, objects);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    insertOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {


            this.getPrimaryDataSource().insertOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertOne(collection, object);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {


            this.getPrimaryDataSource().replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });
        ;
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().replaceCompositeElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeElement(collection, parentObjectKey, propertyName, childObject);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    replaceOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().replaceOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    updateOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.replaceOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    deleteAll(collection: string): Promise<void> {
        return new Promise((resolve, reject) => {

            this.getPrimaryDataSource().deleteAll(collection).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteAll(collection);
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

    collections(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().collections().then((results) => {
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });

        });

    }

}
