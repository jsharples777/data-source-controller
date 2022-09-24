"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceController = void 0;
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('data-source-controller');
class DataSourceController {
    constructor() {
        this.controllerConfigs = [];
        this.primarySource = undefined;
    }
    static getInstance() {
        if (!DataSourceController._instance) {
            DataSourceController._instance = new DataSourceController();
        }
        return DataSourceController._instance;
    }
    addDataSource(source, isPrimary) {
        if (isPrimary) {
            this.primarySource = source;
        }
        else {
            this.controllerConfigs.push({
                source,
                isPrimary
            });
        }
    }
    getPrimaryDataSource() {
        if (!this.primarySource) {
            this.primarySource = this.controllerConfigs[0].source;
        }
        return this.primarySource;
    }
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey) {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey);
        });
        return this.getPrimaryDataSource().deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey);
    }
    deleteOne(collection, object) {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteOne(collection, object);
        });
        return this.getPrimaryDataSource().deleteOne(collection, object);
    }
    deleteMany(collection, filter) {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteMany(collection, filter);
        });
        return this.getPrimaryDataSource().deleteMany(collection, filter);
    }
    find(collection, filter, sort) {
        return this.getPrimaryDataSource().find(collection, filter, sort);
    }
    findOne(collection, filter) {
        return this.getPrimaryDataSource().findOne(collection, filter);
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        this.controllerConfigs.forEach((config) => {
            config.source.insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject);
        });
        return this.getPrimaryDataSource().insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject);
    }
    insertMany(collection, objects) {
        this.controllerConfigs.forEach((config) => {
            config.source.insertMany(collection, objects);
        });
        return this.getPrimaryDataSource().insertMany(collection, objects);
    }
    insertOne(collection, object) {
        this.controllerConfigs.forEach((config) => {
            config.source.insertOne(collection, object);
        });
        return this.getPrimaryDataSource().insertOne(collection, object);
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        this.controllerConfigs.forEach((config) => {
            config.source.replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject);
        });
        return this.getPrimaryDataSource().replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject);
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject) {
        this.controllerConfigs.forEach((config) => {
            config.source.replaceCompositeElement(collection, parentObjectKey, propertyName, childObject);
        });
        return this.getPrimaryDataSource().replaceCompositeElement(collection, parentObjectKey, propertyName, childObject);
    }
    replaceOne(collection, object) {
        this.controllerConfigs.forEach((config) => {
            config.source.replaceOne(collection, object);
        });
        return this.getPrimaryDataSource().replaceOne(collection, object);
    }
    updateOne(collection, object) {
        return this.replaceOne(collection, object);
    }
    deleteAll(collection) {
        this.controllerConfigs.forEach((config) => {
            config.source.deleteAll(collection);
        });
        return this.getPrimaryDataSource().deleteAll(collection);
    }
}
exports.DataSourceController = DataSourceController;
//# sourceMappingURL=DataSourceController.js.map