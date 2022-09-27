import { derivedField, View } from "./View";
import { DataSource } from "./DataSource";
export declare class MongoView extends View {
    private collection;
    private fields;
    private search;
    private sort;
    private source;
    constructor(source: DataSource, collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]);
    protected constructViewItemFromItem(item: any): any;
    getContent(): Promise<any[]>;
}
