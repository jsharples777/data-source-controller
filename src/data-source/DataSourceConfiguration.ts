import {DataSourceController} from "./DataSourceController";
import {MongoDBDataSourceImpl} from "./MongoDBDataSourceImpl";
import {FileSystemDBDataSourceImpl} from "./FileSystemDBDataSourceImpl";

export class DataSourceConfiguration {
    private static _instance: DataSourceConfiguration;
    private bUseMongoDB: boolean;
    private bUseFileSystemDB: boolean;
    private isReadingFromFileSystemDB: boolean;

    public static getInstance(): DataSourceConfiguration {
        if (!DataSourceConfiguration._instance) {
            DataSourceConfiguration._instance = new DataSourceConfiguration();
        }
        return DataSourceConfiguration._instance;
    }

    constructor(){
        this.bUseMongoDB = ((process.env.USE_MONGO_DB ||'Y') === 'Y');
        this.bUseFileSystemDB = ((process.env.USE_FILE_SYSTEM_DB ||'Y') === 'Y');
        this.isReadingFromFileSystemDB = ((process.env.PROCESS_DATA_FROM_DB ||'filesystem') === 'filesystem');
        if (this.bUseMongoDB) {
            DataSourceController.getInstance().addDataSource(new MongoDBDataSourceImpl(),!this.isReadingFromFileSystemDB);
        }
        if (this.bUseFileSystemDB) {
            DataSourceController.getInstance().addDataSource(new FileSystemDBDataSourceImpl(),this.isReadingFromFileSystemDB);
        }
    }

    useMongoDB():boolean {
        return this.bUseMongoDB;
    }

    useFileSystemDB():boolean {
        return this.bUseFileSystemDB;
    }

    isProcessingDataFromFileSystemDB():boolean {
        return this.isReadingFromFileSystemDB
    }

}
