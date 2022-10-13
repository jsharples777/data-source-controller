import { DataSource } from "./DataSource";
import { derivedField, View } from "./View";
export declare class FileSystemDBDataSourceImpl implements DataSource {
    private views;
    constructor();
    collections(): Promise<string[]>;
    deleteAll(collection: string, username?: string): Promise<void>;
    deleteMany(collection: string, filter: any, username?: string): Promise<void>;
    deleteOne(collection: string, object: any, username?: string): Promise<void>;
    find(collection: string, filter?: any, sort?: any): Promise<any[]>;
    findOne(collection: string, filter: any): Promise<any>;
    findByKey(collection: string, key: any): Promise<any>;
    insertMany(collection: string, objects: any[], username?: string): Promise<void>;
    insertOne(collection: string, object: any, username?: string): Promise<void>;
    replaceOne(collection: string, object: any, username?: string): Promise<void>;
    updateOne(collection: string, object: any, username?: string): Promise<void>;
    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any, username?: string): Promise<void>;
    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?: string): Promise<void>;
    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?: string): Promise<void>;
    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?: string): Promise<void>;
    shutdown(): Promise<void>;
    createView(collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]): View;
    view(name: string): View;
}
