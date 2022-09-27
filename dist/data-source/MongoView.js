"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoView = void 0;
const View_1 = require("./View");
const Util_1 = require("./Util");
class MongoView extends View_1.View {
    constructor(source, collection, name, fields, search, sort, derivedFields) {
        super(name, derivedFields);
        this.source = source;
        this.collection = collection;
        this.fields = fields;
        this.search = search;
        this.sort = sort;
    }
    constructViewItemFromItem(item) {
        let result = {};
        this.fields.forEach((field) => {
            const fieldValue = Util_1.Util.getFieldValue(item, field);
            Util_1.Util.setFieldValue(result, field, fieldValue);
        });
        return result;
    }
    getContent() {
        return new Promise((resolve, reject) => {
            this.source.find(this.collection, this.search, this.sort).then((results) => {
                const viewItems = [];
                results.forEach((result) => {
                    viewItems.push(this.constructViewItemFromItem(result));
                });
                resolve(viewItems);
            });
        });
    }
}
exports.MongoView = MongoView;
//# sourceMappingURL=MongoView.js.map