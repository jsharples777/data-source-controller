"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemView = void 0;
const View_1 = require("./View");
class FileSystemView extends View_1.View {
    constructor(name, view, derivedFields) {
        super(name, derivedFields);
        this.view = view;
    }
    getContent() {
        return new Promise((resolve, reject) => {
            resolve(this.view.content().toArray());
        });
    }
}
exports.FileSystemView = FileSystemView;
//# sourceMappingURL=FileSystemView.js.map