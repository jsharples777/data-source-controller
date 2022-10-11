"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection {
    constructor(name, controller) {
        this.name = name;
        this.controller = controller;
    }
    find(filter, sort) {
        return this.controller.find(this.name, filter, sort);
    }
    findOne(filter) {
        return this.controller.findOne(this.name, filter);
    }
    insertOne(object) {
        return this.controller.insertOne(this.name, object);
    }
    insertMany(objects) {
        return this.controller.insertMany(this.name, objects);
    }
    replaceOne(object) {
        return this.controller.replaceOne(this.name, object);
    }
    updateOne(object) {
        return this.controller.updateOne(this.name, object);
    }
    deleteOne(object) {
        return this.controller.deleteOne(this.name, object);
    }
    deleteMany(filter) {
        return this.controller.deleteMany(this.name, filter);
    }
    deleteAll() {
        return this.controller.deleteAll(this.name);
    }
    insertCompositeArrayElement(parentObjectKey, propertyName, childObject) {
        return this.controller.insertCompositeArrayElement(this.name, parentObjectKey, propertyName, childObject);
    }
    replaceCompositeArrayElement(parentObjectKey, propertyName, childObject) {
        return this.controller.replaceCompositeArrayElement(this.name, parentObjectKey, propertyName, childObject);
    }
    deleteCompositeArrayElement(parentObjectKey, propertyName, childObjectKey) {
        return this.controller.deleteCompositeArrayElement(this.name, parentObjectKey, propertyName, childObjectKey);
    }
    replaceCompositeElement(parentObjectKey, propertyName, childObject) {
        return this.controller.replaceCompositeElement(this.name, parentObjectKey, propertyName, childObject);
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map