"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const DataSourceController_1 = require("./DataSourceController");
class Collection {
    constructor(name) {
        this.name = name;
    }
    find(filter, sort) {
        return DataSourceController_1.DataSourceController.getInstance().find(this.name, filter, sort);
    }
    findOne(filter) {
        return DataSourceController_1.DataSourceController.getInstance().findOne(this.name, filter);
    }
    insertOne(object) {
        return DataSourceController_1.DataSourceController.getInstance().insertOne(this.name, object);
    }
    insertMany(objects) {
        return DataSourceController_1.DataSourceController.getInstance().insertMany(this.name, objects);
    }
    replaceOne(object) {
        return DataSourceController_1.DataSourceController.getInstance().replaceOne(this.name, object);
    }
    updateOne(object) {
        return DataSourceController_1.DataSourceController.getInstance().updateOne(this.name, object);
    }
    deleteOne(object) {
        return DataSourceController_1.DataSourceController.getInstance().deleteOne(this.name, object);
    }
    deleteMany(filter) {
        return DataSourceController_1.DataSourceController.getInstance().deleteMany(this.name, filter);
    }
    deleteAll() {
        return DataSourceController_1.DataSourceController.getInstance().deleteAll(this.name);
    }
    insertCompositeArrayElement(parentObjectKey, propertyName, childObject) {
        return DataSourceController_1.DataSourceController.getInstance().insertCompositeArrayElement(this.name, parentObjectKey, propertyName, childObject);
    }
    replaceCompositeArrayElement(parentObjectKey, propertyName, childObject) {
        return DataSourceController_1.DataSourceController.getInstance().replaceCompositeArrayElement(this.name, parentObjectKey, propertyName, childObject);
    }
    deleteCompositeArrayElement(parentObjectKey, propertyName, childObjectKey) {
        return DataSourceController_1.DataSourceController.getInstance().deleteCompositeArrayElement(this.name, parentObjectKey, propertyName, childObjectKey);
    }
    replaceCompositeElement(parentObjectKey, propertyName, childObject) {
        return DataSourceController_1.DataSourceController.getInstance().replaceCompositeElement(this.name, parentObjectKey, propertyName, childObject);
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map