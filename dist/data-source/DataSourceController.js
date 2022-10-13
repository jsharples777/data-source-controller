"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceController = void 0;
const debug_1 = __importDefault(require("debug"));
const Collection_1 = require("./Collection");
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
    createView(collection, name, fields, search, sort, derivedFields) {
        return this.getPrimaryDataSource().createView(collection, name, fields, search, sort, derivedFields);
    }
    view(name) {
        return this.getPrimaryDataSource().view(name);
    }
    collection(name) {
        return new Collection_1.Collection(name, this);
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
    deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    deleteOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteOne(collection, object, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteOne(collection, object, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    deleteMany(collection, filter, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteMany(collection, filter, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteMany(collection, filter, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    find(collection, filter, sort) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().find(collection, filter, sort).then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    findOne(collection, filter) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().findOne(collection, filter).then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    findByKey(collection, key) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().findByKey(collection, key).then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    insertMany(collection, objects, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertMany(collection, objects, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertMany(collection, objects, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    insertOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertOne(collection, object, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertOne(collection, object, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
        ;
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().replaceCompositeElement(collection, parentObjectKey, propertyName, childObject, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeElement(collection, parentObjectKey, propertyName, childObject, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    replaceOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().replaceOne(collection, object, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    updateOne(collection, object, username) {
        return new Promise((resolve, reject) => {
            this.replaceOne(collection, object, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    deleteAll(collection, username) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteAll(collection, username).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteAll(collection, username).then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    collections() {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().collections().then((results) => {
                resolve(results);
            }).catch((err) => {
                logger(err);
            });
        });
    }
    shutdown() {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().shutdown().then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.shutdown().then((childResults) => {
                    }).catch((err) => {
                        logger(err);
                    });
                });
                resolve();
            }).catch((err) => {
                logger(err);
            });
        });
    }
}
exports.DataSourceController = DataSourceController;
DataSourceController.FIELD_Created = 'createdOn';
DataSourceController.FIELD_Modified = 'modifiedOn';
DataSourceController.FIELD_CreatedBy = 'createdBy';
DataSourceController.FIELD_ModifiedBy = 'modifiedBy';
//# sourceMappingURL=DataSourceController.js.map