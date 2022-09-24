"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceConfiguration = void 0;
const DataSourceController_1 = require("./DataSourceController");
const MongoDBDataSourceImpl_1 = require("./MongoDBDataSourceImpl");
const FileSystemDBDataSourceImpl_1 = require("./FileSystemDBDataSourceImpl");
class DataSourceConfiguration {
    constructor() {
        this.bUseMongoDB = ((process.env.USE_MONGO_DB || 'Y') === 'Y');
        this.bUseFileSystemDB = ((process.env.USE_FILE_SYSTEM_DB || 'Y') === 'Y');
        this.isReadingFromFileSystemDB = ((process.env.PROCESS_DATA_FROM_DB || 'filesystem') === 'filesystem');
        if (this.bUseMongoDB) {
            DataSourceController_1.DataSourceController.getInstance().addDataSource(new MongoDBDataSourceImpl_1.MongoDBDataSourceImpl(), !this.isReadingFromFileSystemDB);
        }
        if (this.bUseFileSystemDB) {
            DataSourceController_1.DataSourceController.getInstance().addDataSource(new FileSystemDBDataSourceImpl_1.FileSystemDBDataSourceImpl(), this.isReadingFromFileSystemDB);
        }
    }
    static getInstance() {
        if (!DataSourceConfiguration._instance) {
            DataSourceConfiguration._instance = new DataSourceConfiguration();
        }
        return DataSourceConfiguration._instance;
    }
    useMongoDB() {
        return this.bUseMongoDB;
    }
    useFileSystemDB() {
        return this.bUseFileSystemDB;
    }
    isProcessingDataFromFileSystemDB() {
        return this.isReadingFromFileSystemDB;
    }
}
exports.DataSourceConfiguration = DataSourceConfiguration;
//# sourceMappingURL=DataSourceConfiguration.js.map