"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Util_1 = require("./Util");
class View {
    constructor(name, derivedFields) {
        this.name = name;
        this.derivedFields = derivedFields;
    }
    getName() {
        return this.name;
    }
    content() {
        return new Promise((resolve, reject) => {
            const results = this.getContent().then((results) => {
                if ((results.length > 0) && (this.derivedFields && this.derivedFields.length > 0)) {
                    results.forEach((result) => {
                        if (this.derivedFields) {
                            this.derivedFields.forEach((derivedField) => {
                                derivedField(result);
                            });
                        }
                    });
                }
                resolve(Util_1.Util.copyObject(results));
            });
        });
    }
}
exports.View = View;
//# sourceMappingURL=View.js.map