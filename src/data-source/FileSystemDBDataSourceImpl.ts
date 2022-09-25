import {DataSource} from "./DataSource";
import {FileSystemDB, FileSystemDBHelper} from "file-system-database";

export class FileSystemDBDataSourceImpl implements DataSource {
    constructor() {
        FileSystemDB.getInstance().initialise();
    }
    collections(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            resolve(FileSystemDB.getInstance().collections());
        });
    }

    deleteAll(collection: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const results = col.find().toArray();
            const keyField = col.getKeyFieldName();
            results.forEach((object) => {
                col.removeObject(object[keyField]);
            })
            resolve();
        });
    }

    deleteMany(collection: string, filter: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const results = col.find(filter).toArray();
            const keyField = col.getKeyFieldName();
            results.forEach((object) => {
                col.removeObject(object[keyField]);
            })
            resolve();
        });
    }
    deleteOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            col.removeObject(object[keyField]);
            resolve();
        });
    }

    find(collection: string, filter?: any, sort?: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let result:any[] = [];
            const col = FileSystemDB.getInstance().collection(collection);
            let cursor = col.find(filter);
            if (sort) {
                cursor = cursor.sortByFilter(sort);
            }
            result = cursor.toArray();
            resolve(result);
        });
    }

    findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let result:any|undefined = undefined;
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            // assume filter in format { keyField: keyValue }
            const key = filter[keyField];
            if (key) {
                result = col.findByKey(key);
                resolve(result);
            }
            else {
                reject(`No key supplied in filter ${filter}`);
            }

        });
    }

    insertMany(collection: string, objects: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            if (objects) {
                objects.forEach((object) => {
                    col.insertObject(object[keyField],object);
                })
            }
            resolve();
        });
    }

    insertOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            col.insertObject(object[keyField],object);
            resolve();
        });
    }

    replaceOne(collection: string, object: any): Promise<void> {
        return this.updateOne(collection,object);
    }

    updateOne(collection: string, object: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            col.upsertObject(object[keyField],object);
            resolve();
        });
    }

    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any): Promise<void> {
        return new Promise((resolve, reject) => {
            FileSystemDBHelper.removeCompositeArrayElement(collection,propertyName,parentObjectKey,childObjectKey);
            resolve();
        });
    }

    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
            FileSystemDBHelper.insertElementIntoCompositeArray(collection,propertyName,parentObjectKey,childObject);
            resolve();
        });
    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            FileSystemDBHelper.updateCompositeArrayElement(collection,propertyName,parentObjectKey,childObject[keyField],childObject);
            resolve();
        });
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any): Promise<void> {
        return new Promise((resolve, reject) => {
            FileSystemDBHelper.updateCompositeObject(collection,propertyName,parentObjectKey,childObject);
            resolve();
        });
    }

}
