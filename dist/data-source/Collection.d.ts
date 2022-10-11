import { DataSourceController } from "./DataSourceController";
export declare class Collection {
    private name;
    private controller;
    constructor(name: string, controller: DataSourceController);
    find(filter?: any, sort?: any): Promise<any[]>;
    findOne(filter: any): Promise<any>;
    insertOne(object: any): Promise<void>;
    insertMany(objects: any[]): Promise<void>;
    replaceOne(object: any): Promise<void>;
    updateOne(object: any): Promise<void>;
    deleteOne(object: any): Promise<void>;
    deleteMany(filter: any): Promise<void>;
    deleteAll(): Promise<void>;
    insertCompositeArrayElement(parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    replaceCompositeArrayElement(parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    deleteCompositeArrayElement(parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void>;
    replaceCompositeElement(parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
}
