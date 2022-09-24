import { DataSource } from "./DataSource";
export declare class FileSystemDBDataSourceImpl implements DataSource {
    deleteAll(collection: string): Promise<void>;
    deleteMany(collection: string, filter: any): Promise<void>;
    deleteOne(collection: string, object: any): Promise<void>;
    find(collection: string, filter?: any, sort?: any): Promise<any[]>;
    findOne(collection: string, filter: any): Promise<any>;
    insertMany(collection: string, objects: any[]): Promise<void>;
    insertOne(collection: string, object: any): Promise<void>;
    replaceOne(collection: string, object: any): Promise<void>;
    updateOne(collection: string, object: any): Promise<void>;
    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void>;
    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void>;
}
