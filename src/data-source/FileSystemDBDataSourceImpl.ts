import {DataSource} from "./DataSource";
import {FileSystemDB, FileSystemDBHelper, SearchItem, SortOrderItem} from "file-system-database";
import {derivedField, View, Views} from "./View";
import {FileSystemView} from "./FileSystemView";
import moment from "moment";
import {DataSourceController} from "./DataSourceController";



export class FileSystemDBDataSourceImpl implements DataSource {
    private views:Views[] = [];

    constructor() {
        FileSystemDB.getInstance().initialise();
    }
    collections(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            resolve(FileSystemDB.getInstance().collections());
        });
    }

    deleteAll(collection: string, username?:string): Promise<void> {
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

    deleteMany(collection: string, filter: any, username?:string): Promise<void> {
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
    deleteOne(collection: string, object: any, username?:string): Promise<void> {
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
            let cursor = col.find(filter);
            const results = cursor.toArray();
            if (results.length > 0) {
                result = results[0];
            }
            resolve(result);
        });
    }

    findByKey(collection: string, key: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let result:any|undefined = undefined;
            const col = FileSystemDB.getInstance().collection(collection);
            result = col.findByKey(key);
            resolve(result);
        });
    }

    insertMany(collection: string, objects: any[], username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            if (objects) {
                objects.forEach((object) => {


                    object[DataSourceController.FIELD_Modified] = now;
                    object[DataSourceController.FIELD_Created] = now;
                    if (username) {
                        object[DataSourceController.FIELD_CreatedBy] = username;
                        object[DataSourceController.FIELD_ModifiedBy] = username;
                    }
                    col.insertObject(object[keyField],object);
                })
            }
            resolve();
        });
    }

    insertOne(collection: string, object: any, username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            object[DataSourceController.FIELD_Modified] = now;
            object[DataSourceController.FIELD_Created] = now;
            if (username) {
                object[DataSourceController.FIELD_CreatedBy] = username;
                object[DataSourceController.FIELD_ModifiedBy] = username;
            }
            col.insertObject(object[keyField],object);
            resolve();
        });
    }

    replaceOne(collection: string, object: any, username?:string): Promise<void> {
        return this.updateOne(collection,object, username);
    }

    updateOne(collection: string, object: any, username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            object[DataSourceController.FIELD_Modified] = now;
            if (username) {
                object[DataSourceController.FIELD_ModifiedBy] = username;
            }

            col.upsertObject(object[keyField],object);
            resolve();
        });
    }

    deleteCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObjectKey: any, username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const parentObj = FileSystemDB.getInstance().collection(collection).findByKey(parentObjectKey);
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController.FIELD_Modified] = now;
            if (username) {
                parentObj[DataSourceController.FIELD_ModifiedBy] = username;
            }
            FileSystemDB.getInstance().collection(collection).upsertObject(parentObjectKey,parentObj);
            FileSystemDBHelper.removeCompositeArrayElement(collection,propertyName,parentObjectKey,childObjectKey);
            resolve();
        });
    }

    insertCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const parentObj = FileSystemDB.getInstance().collection(collection).findByKey(parentObjectKey);
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController.FIELD_Modified] = now;
            childObject[DataSourceController.FIELD_Created] = now;
            childObject[DataSourceController.FIELD_Modified] = now;

            if (username) {
                childObject[DataSourceController.FIELD_CreatedBy] = username;
                childObject[DataSourceController.FIELD_ModifiedBy] = username;
                parentObj[DataSourceController.FIELD_ModifiedBy] = username;
            }

            FileSystemDB.getInstance().collection(collection).upsertObject(parentObjectKey,parentObj);
            FileSystemDBHelper.insertElementIntoCompositeArray(collection,propertyName,parentObjectKey,childObject);
            resolve();
        });
    }

    replaceCompositeArrayElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            const parentObj = col.findByKey(parentObjectKey);
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController.FIELD_Modified] = now;
            childObject[DataSourceController.FIELD_Modified] = now;
            if (username) {
                parentObj[DataSourceController.FIELD_ModifiedBy] = username;
                childObject[DataSourceController.FIELD_ModifiedBy] = username;
            }

            col.upsertObject(parentObjectKey,parentObj);
            FileSystemDBHelper.updateCompositeArrayElement(collection,propertyName,parentObjectKey,childObject[keyField],childObject);
            resolve();
        });
    }

    replaceCompositeElement(collection: string, parentObjectKey: any, propertyName: string, childObject: any, username?:string): Promise<void> {
        return new Promise((resolve, reject) => {
            const col = FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            const parentObj = col.findByKey(parentObjectKey);
            const now = parseInt(moment().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController.FIELD_Modified] = now;
            childObject[DataSourceController.FIELD_Modified] = now;
            if (username) {
                parentObj[DataSourceController.FIELD_ModifiedBy] = username;
                childObject[DataSourceController.FIELD_ModifiedBy] = username;
            }
            col.upsertObject(parentObjectKey,parentObj);
            FileSystemDBHelper.updateCompositeObject(collection,propertyName,parentObjectKey,childObject);
            resolve();
        });
    }

    shutdown(): Promise<void> {
        return new Promise((resolve, reject) => {
            FileSystemDB.getInstance().shutdown();
            resolve();

        })
    }

    createView(collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]): View {
        let fsView = FileSystemDB.getInstance().getView(name);
        if (!fsView) {
            let localSearch:SearchItem[]|undefined = undefined;
            if (search) {
                localSearch = FileSystemDBHelper.convertFilterIntoFind(search);
            }
            let localSort:SortOrderItem[]|undefined = undefined;
            if (sort) {
                localSort = FileSystemDBHelper.convertFilterIntoSort(sort);
            }
            fsView = FileSystemDB.getInstance().addView(collection,name,fields, localSearch, localSort);
            const view = new FileSystemView(name, fsView, derivedFields);
            this.views.push({
                name,
                view
            });
        }
        return this.view(name);
    }

    view(name: string): View {
       const foundIndex = this.views.findIndex((view) => view.name === name);
       return this.views[foundIndex].view;
    }

}
