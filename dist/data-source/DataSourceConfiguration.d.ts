export declare class DataSourceConfiguration {
    private static _instance;
    private bUseMongoDB;
    private bUseFileSystemDB;
    private isReadingFromFileSystemDB;
    static getInstance(): DataSourceConfiguration;
    constructor();
    useMongoDB(): boolean;
    useFileSystemDB(): boolean;
    isProcessingDataFromFileSystemDB(): boolean;
}
