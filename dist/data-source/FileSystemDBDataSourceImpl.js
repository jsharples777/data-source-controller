"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDBDataSourceImpl = void 0;
const file_system_database_1 = require("file-system-database");
class FileSystemDBDataSourceImpl {
    deleteMany(collection, filter) {
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
    deleteOne(collection, object) {
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
    insertMany(collection, objects) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            if (objects) {
                objects.forEach((object) => {
                    col.insertObject(object[keyField], object);
                });
            }
            resolve();
        });
    }
    insertOne(collection, object) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            col.insertObject(object[keyField], object);
            resolve();
        });
    }
    replaceOne(collection, object) {
        return this.updateOne(collection, object);
    }
    updateOne(collection, object) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            col.upsertObject(object[keyField], object);
            resolve();
        });
    }
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey) {
        return new Promise((resolve, reject) => {
            file_system_database_1.FileSystemDBHelper.removeCompositeArrayElement(collection, propertyName, parentObjectKey, childObjectKey);
            resolve();
        });
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            file_system_database_1.FileSystemDBHelper.insertElementIntoCompositeArray(collection, propertyName, parentObjectKey, childObject);
            resolve();
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            const col = file_system_database_1.FileSystemDB.getInstance().collection(collection);
            const keyField = col.getKeyFieldName();
            file_system_database_1.FileSystemDBHelper.updateCompositeArrayElement(collection, propertyName, parentObjectKey, childObject[keyField], childObject);
            resolve();
        });
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            file_system_database_1.FileSystemDBHelper.updateCompositeObject(collection, propertyName, parentObjectKey, childObject);
            resolve();
        });
    }
}
exports.FileSystemDBDataSourceImpl = FileSystemDBDataSourceImpl;
//# sourceMappingURL=FileSystemDBDataSourceImpl.js.map