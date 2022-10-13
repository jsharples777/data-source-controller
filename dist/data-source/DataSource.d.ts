import { derivedField, View } from "./View";
export interface DataSource {
    find(collection: string, filter?: any, sort?: any): Promise<any[]>;
    findOne(collection: string, filter: any): Promise<any>;
    findByKey(collection: string, key: any): Promise<any>;
    insertOne(collection: string, object: any, username?: string): Promise<void>;
    insertMany(collection: string, objects: any[], username?: string): Promise<void>;
    replaceOne(collection: string, object: any, username?: string): Promise<void>;
    updateOne(collection: string, object: any, username?: string): Promise<void>;
    deleteOne(collection: string, object: any, username?: string): Promise<void>;
    deleteMany(collection: string, filter: any, username?: string): Promise<void>;
    deleteAll(collection: string, username?: string): Promise<void>;
    collections(): Promise<string[]>;
    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?: string): Promise<void>;
    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?: string): Promise<void>;
    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any, username?: string): Promise<void>;
    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?: string): Promise<void>;
    shutdown(): Promise<void>;
    createView(collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]): View;
    view(name: string): View;
}
