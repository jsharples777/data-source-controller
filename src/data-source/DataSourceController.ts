import debug from 'debug';
import {DataSource} from "./DataSource";


const logger = debug('data-source-controller');

type DataSourceItem = {
    source:DataSource,
    isPrimary:boolean
}

export class DataSourceController implements DataSource{
    private static _instance: DataSourceController;

    public static getInstance(): DataSourceController {
        if (!DataSourceController._instance) {
            DataSourceController._instance = new DataSourceController();
        }
        return DataSourceController._instance;
    }


    private controllerConfigs:DataSourceItem[] = [];
    private primarySource:DataSource|undefined = undefined;

    private constructor() {
    }


    public addDataSource(source:DataSource, isPrimary:boolean) {
        if (isPrimary) {
            this.primarySource = source;
        }
        else {
            this.controllerConfigs.push({
                source,
                isPrimary
            });
        }
    }

    protected getPrimaryDataSource():DataSource {
        if (!this.primarySource) {
            this.primarySource = this.controllerConfigs[0].source;
        }
        return this.primarySource;
    }

    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteCompositeArrayElement(collection, parentObjectKey,propertyName,childObjectKey);
        });
        return this.getPrimaryDataSource().deleteCompositeArrayElement(collection,parentObjectKey,propertyName,childObjectKey);
    }

    deleteOne(collection: string, object: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteOne(collection, object);
        });
        return this.getPrimaryDataSource().deleteOne(collection, object);
    }
    deleteMany(collection: string, filter: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteMany(collection, filter);
        });
        return this.getPrimaryDataSource().deleteMany(collection, filter);
    }

    find(collection: string, filter?: any, sort?: any): Promise<any[]> {
        return this.getPrimaryDataSource().find(collection,filter,sort);
    }

    findOne(collection: string, filter: any): Promise<any> {
       return this.getPrimaryDataSource().findOne(collection,filter);
    }

    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.insertCompositeArrayElement(collection, parentObjectKey,propertyName,childObject);
        });
        return this.getPrimaryDataSource().insertCompositeArrayElement(collection,parentObjectKey,propertyName,childObject);
    }

    insertMany(collection: string, objects: any[]): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.insertMany(collection, objects);
        });
        return this.getPrimaryDataSource().insertMany(collection, objects);
    }

    insertOne(collection: string, object: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.insertOne(collection, object);
        });
        return this.getPrimaryDataSource().insertOne(collection, object);
    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.replaceCompositeArrayElement(collection, parentObjectKey,propertyName,childObject);
        });
        return this.getPrimaryDataSource().replaceCompositeArrayElement(collection,parentObjectKey,propertyName,childObject);
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.replaceCompositeElement(collection, parentObjectKey,propertyName,childObject);
        });
        return this.getPrimaryDataSource().replaceCompositeElement(collection,parentObjectKey,propertyName,childObject);
    }

    replaceOne(collection: string, object: any): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.replaceOne(collection, object);
        });
        return this.getPrimaryDataSource().replaceOne(collection, object);
    }

    updateOne(collection: string, object: any): Promise<void> {
        return this.replaceOne(collection,object);
    }

    deleteAll(collection: string): Promise<void> {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteAll(collection);
        });
        return this.getPrimaryDataSource().deleteAll(collection);
    }

    collections(): Promise<string[]> {
        return this.getPrimaryDataSource().collections();
    }

}
