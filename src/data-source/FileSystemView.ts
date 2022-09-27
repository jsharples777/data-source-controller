import {derivedField, View} from "./View";
import {View as FSView} from 'file-system-database';

export class FileSystemView extends View{
    private view: FSView;

    constructor(name:string,view:FSView, derivedFields?:derivedField[]) {
        super(name,derivedFields);
        this.view = view;
    }

    getContent(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            resolve(this.view.content().toArray());
        });
    }

}
