"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDBDataSourceImpl = void 0;
const file_system_database_1 = require("file-system-database");
const FileSystemView_1 = require("./FileSystemView");
const moment_1 = __importDefault(require("moment"));
const DataSourceController_1 = require("./DataSourceController");
class FileSystemDBDataSourceImpl {
    constructor() {
        this.views = [];
        file_system_database_1.FileSystemDB.getInstance().initialise();
    }
    collections() {
        return new Promise((resolve, reject) => {
            resolve(file_system_database_1.FileSystemDB.getInstance().collections());
        });
    }
    deleteAll(collection, username) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const results = col.find().toArray();
            const keyField = col.getKeyFieldName();
            results.forEach((object) => {
                col.removeObject(object[keyField]);
            });
            resolve();
        });
    }
    deleteMany(collection, filter, username) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const results = col.find(filter).toArray();
            const keyField = col.getKeyFieldName();
            results.forEach((object) => {
                col.removeObject(object[keyField]);
            });
            resolve();
        });
    }
    deleteOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            col.removeObject(object[keyField]);
            resolve();
        });
    }
    find(collection, filter, sort) {
        return new Promise((resolve, reject) => {
            let result = [];
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            let cursor = col.find(filter);
            if (sort) {
                cursor = cursor.sortByFilter(sort);
            }
            result = cursor.toArray();
            resolve(result);
        });
    }
    findOne(collection, filter) {
        return new Promise((resolve, reject) => {
            let result = undefined;
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            let cursor = col.find(filter);
            const results = cursor.toArray();
            if (results.length > 0) {
                result = results[0];
            }
            resolve(result);
        });
    }
    findByKey(collection, key) {
        return new Promise((resolve, reject) => {
            let result = undefined;
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            result = col.findByKey(key);
            resolve(result);
        });
    }
    insertMany(collection, objects, username) {
        return new Promise((resolve, reject) => {
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            if (objects) {
                objects.forEach((object) => {
                    object[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
                    object[DataSourceController_1.DataSourceController.FIELD_Created] = now;
                    if (username) {
                        object[DataSourceController_1.DataSourceController.FIELD_CreatedBy] = username;
                        object[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
                    }
                    col.insertObject(object[keyField], object);
                });
            }
            resolve();
        });
    }
    insertOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            object[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            object[DataSourceController_1.DataSourceController.FIELD_Created] = now;
            if (username) {
                object[DataSourceController_1.DataSourceController.FIELD_CreatedBy] = username;
                object[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
            }
            col.insertObject(object[keyField], object);
            resolve();
        });
    }
    replaceOne(collection, object, username) {
        return this.updateOne(collection, object, username);
    }
    updateOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            object[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            if (username) {
                object[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
            }
            col.upsertObject(object[keyField], object);
            resolve();
        });
    }
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey, username) {
        return new Promise((resolve, reject) => {
            const parentObj = file_system_database_1.FileSystemDB.getInstance().collection(collection).findByKey(parentObjectKey);
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            if (username) {
                parentObj[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
            }
            file_system_database_1.FileSystemDB.getInstance().collection(collection).upsertObject(parentObjectKey, parentObj);
            file_system_database_1.FileSystemDBHelper.removeCompositeArrayElement(collection, propertyName, parentObjectKey, childObjectKey);
            resolve();
        });
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username) {
        return new Promise((resolve, reject) => {
            const parentObj = file_system_database_1.FileSystemDB.getInstance().collection(collection).findByKey(parentObjectKey);
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            childObject[DataSourceController_1.DataSourceController.FIELD_Created] = now;
            childObject[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            if (username) {
                childObject[DataSourceController_1.DataSourceController.FIELD_CreatedBy] = username;
                childObject[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
                parentObj[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
            }
            file_system_database_1.FileSystemDB.getInstance().collection(collection).upsertObject(parentObjectKey, parentObj);
            file_system_database_1.FileSystemDBHelper.insertElementIntoCompositeArray(collection, propertyName, parentObjectKey, childObject);
            resolve();
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            const parentObj = col.findByKey(parentObjectKey);
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            childObject[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            if (username) {
                parentObj[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
                childObject[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
            }
            col.upsertObject(parentObjectKey, parentObj);
            file_system_database_1.FileSystemDBHelper.updateCompositeArrayElement(collection, propertyName, parentObjectKey, childObject[keyField], childObject);
            resolve();
        });
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject, username) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            const parentObj = col.findByKey(parentObjectKey);
            const now = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
            parentObj[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            childObject[DataSourceController_1.DataSourceController.FIELD_Modified] = now;
            if (username) {
                parentObj[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
                childObject[DataSourceController_1.DataSourceController.FIELD_ModifiedBy] = username;
            }
            col.upsertObject(parentObjectKey, parentObj);
            file_system_database_1.FileSystemDBHelper.updateCompositeObject(collection, propertyName, parentObjectKey, childObject);
            resolve();
        });
    }
    shutdown() {
        return new Promise((resolve, reject) => {
            file_system_database_1.FileSystemDB.getInstance().shutdown();
            resolve();
        });
    }
    createView(collection, name, fields, search, sort, derivedFields) {
        let fsView = file_system_database_1.FileSystemDB.getInstance().getView(name);
        if (!fsView) {
            let localSearch = undefined;
            if (search) {
                localSearch = file_system_database_1.FileSystemDBHelper.convertFilterIntoFind(search);
            }
            let localSort = undefined;
            if (sort) {
                localSort = file_system_database_1.FileSystemDBHelper.convertFilterIntoSort(sort);
            }
            fsView = file_system_database_1.FileSystemDB.getInstance().addView(collection, name, fields, localSearch, localSort);
            const view = new FileSystemView_1.FileSystemView(name, fsView, derivedFields);
            this.views.push({
                name,
                view
            });
        }
        return this.view(name);
    }
    view(name) {
        const foundIndex = this.views.findIndex((view) => view.name === name);
        return this.views[foundIndex].view;
    }
}
exports.FileSystemDBDataSourceImpl = FileSystemDBDataSourceImpl;
//# sourceMappingURL=FileSystemDBDataSourceImpl.js.map