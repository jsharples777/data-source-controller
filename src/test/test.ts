import * as dotenv from 'dotenv';
import debug from "debug";
import {MongoDBDataSourceImpl} from "../data-source/MongoDBDataSourceImpl";
import {DataSourceController} from "../data-source/DataSourceController";
import {FileSystemDBDataSourceImpl} from "../data-source/FileSystemDBDataSourceImpl";

dotenv.config();

const logger = debug('test');

export class test {
    public constructor() {
        debug.enable('life-cycle-manager object-view config-manager collection-manager file-manager abstract-partial-buffer collection-implementation index-file-manager index-implementation index-manager');
        const useMongoDB = ((process.env.USE_MONGO_DB ||'Y') === 'Y');
        const useFileSystemDB = ((process.env.USE_FILE_SYSTEM_DB ||'Y') === 'Y');
        const isReadingFromFileSystemDB = ((process.env.PROCESS_DATA_FROM_DB ||'filesystem') === 'filesystem');
        if (useMongoDB) {
            DataSourceController.getInstance().addDataSource(new MongoDBDataSourceImpl(),!isReadingFromFileSystemDB);
        }
        if (useFileSystemDB) {
            DataSourceController.getInstance().addDataSource(new FileSystemDBDataSourceImpl(),isReadingFromFileSystemDB);
        }

        const collection = DataSourceController.getInstance().collection('pms-appts');
        const results = collection.find({
            provider:'Dr Jim Sharples',
            start:20220901,
            time:'092000',
            isCancelled:false
        }).then((results) => {
            console.log(results);

        })

        // const collection = process.env.DB_COLLECTION_USERS || 'pms-users';
        // DataSourceController.getInstance().find(collection, {isCurrent:true,providerNo: {$ne: ''}}).then((results) => {
        //     const providers: any[] = [];
        //     results.forEach((user) => {
        //         const provider: any = {
        //             _id: user._id,
        //             name: user.username,
        //             providerNo: user.providerNo,
        //             isCurrent: true,
        //             isProvider: true
        //         }
        //         console.log(provider);
        //         providers.push(provider);
        //     });
        //     console.log(providers.length);
        //
        //
        //
        // });
    }

}

new test();
