import { DataSource } from "./DataSource";
import { Db } from "mongodb";
import { derivedField, View } from "./View";
export declare class MongoDBDataSourceImpl implements DataSource {
    private views;
    constructor();
    shutdown(): Promise<void>;
    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void>;
    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    deleteOne(collection: string, object: any): Promise<void>;
    deleteMany(collection: string, filter: any): Promise<void>;
    find(collection: string, filter?: any, sort?: any): Promise<any[]>;
    findOne(collection: string, filter: any): Promise<any>;
    findByKey(collection: string, key: any): Promise<any>;
    insertMany(collection: string, objects: any[]): Promise<void>;
    insertOne(collection: string, object: any): Promise<void>;
    replaceOne(collection: string, object: any): Promise<void>;
    updateOne(collection: string, object: any): Promise<void>;
    getDatabase(): Promise<Db>;
    deleteAll(collection: string): Promise<void>;
    collections(): Promise<string[]>;
    createView(collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]): View;
    view(name: string): View;
}
