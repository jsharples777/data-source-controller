import {derivedField, View} from "./View";
import {MongoDataSource} from "mongo-access-jps";
import {DataSource} from "./DataSource";
import {Util} from "./Util";

export class MongoView extends View{
    private collection: string;
    private fields: string[];
    private search: any;
    private sort: any;
    private source: DataSource;


    constructor(source:DataSource,collection: string, name: string, fields: string[], search?: any, sort?: any, derivedFields?: derivedField[]) {
        super(name,derivedFields);
        this.source = source;
        this.collection = collection;
        this.fields = fields;
        this.search = search;
        this.sort = sort;

    }

    protected constructViewItemFromItem(item: any): any {
        let result: any = {}
        this.fields.forEach((field) => {
            const fieldValue = Util.getFieldValue(item, field);
            Util.setFieldValue(result, field, fieldValue);
        });
        return result;
    }


    getContent(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.source.find(this.collection, this.search,this.sort).then((results) => {
                const viewItems:any [] = [];
                results.forEach((result) => {
                    viewItems.push(this.constructViewItemFromItem(result));
                });
                resolve(viewItems);
            })
        })
    }

}
