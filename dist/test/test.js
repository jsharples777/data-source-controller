"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const dotenv = __importStar(require("dotenv"));
const debug_1 = __importDefault(require("debug"));
const MongoDBDataSourceImpl_1 = require("../data-source/MongoDBDataSourceImpl");
const DataSourceController_1 = require("../data-source/DataSourceController");
const FileSystemDBDataSourceImpl_1 = require("../data-source/FileSystemDBDataSourceImpl");
dotenv.config();
const logger = debug_1.default('test');
class test {
    constructor() {
        debug_1.default.enable('life-cycle-manager object-view config-manager collection-manager file-manager abstract-partial-buffer collection-implementation index-file-manager index-implementation index-manager');
        const useMongoDB = ((process.env.USE_MONGO_DB || 'Y') === 'Y');
        const useFileSystemDB = ((process.env.USE_FILE_SYSTEM_DB || 'Y') === 'Y');
        const isReadingFromFileSystemDB = ((process.env.PROCESS_DATA_FROM_DB || 'filesystem') === 'filesystem');
        if (useMongoDB) {
            DataSourceController_1.DataSourceController.getInstance().addDataSource(new MongoDBDataSourceImpl_1.MongoDBDataSourceImpl(), !isReadingFromFileSystemDB);
        }
        if (useFileSystemDB) {
            DataSourceController_1.DataSourceController.getInstance().addDataSource(new FileSystemDBDataSourceImpl_1.FileSystemDBDataSourceImpl(), isReadingFromFileSystemDB);
        }
        const collection = DataSourceController_1.DataSourceController.getInstance().collection('pms-appts');
        const results = collection.find({
            provider: 'Dr Jim Sharples',
            start: 20220901,
            time: '092000',
            isCancelled: false
        }).then((results) => {
            console.log(results);
        });
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
exports.test = test;
new test();
//# sourceMappingURL=test.js.map