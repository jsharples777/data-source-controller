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
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteCompositeArrayElement(collection, parentObjectKey, propertyName, childObjectKey).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deleteOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteOne(collection, object).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deleteMany(collection, filter) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteMany(collection, filter).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteMany(collection, filter).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    find(collection, filter, sort) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().find(collection, filter, sort).then((results) => {
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    findOne(collection, filter) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().findOne(collection, filter).then((results) => {
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    insertMany(collection, objects) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertMany(collection, objects).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertMany(collection, objects).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    insertOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().insertOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.insertOne(collection, object).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeArrayElement(collection, parentObjectKey, propertyName, childObject).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
        ;
    }
    replaceCompositeElement(collection, parentObjectKey, propertyName, childObject) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().replaceCompositeElement(collection, parentObjectKey, propertyName, childObject).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceCompositeElement(collection, parentObjectKey, propertyName, childObject).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    replaceOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().replaceOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateOne(collection, object) {
        return new Promise((resolve, reject) => {
            this.replaceOne(collection, object).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.replaceOne(collection, object).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deleteAll(collection) {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().deleteAll(collection).then((results) => {
                this.controllerConfigs.forEach((config) => {
                    config.source.deleteAll(collection).then((childResults) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    collections() {
        return new Promise((resolve, reject) => {
            this.getPrimaryDataSource().collections().then((results) => {
                resolve(results);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}
exports.DataSourceController = DataSourceController;
//# sourceMappingURL=DataSourceController.js.map