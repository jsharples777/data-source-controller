import { derivedField, View } from "./View";
import { View as FSView } from 'file-system-database';
export declare class FileSystemView extends View {
    private view;
    constructor(name: string, view: FSView, derivedFields?: derivedField[]);
    getContent(): Promise<any[]>;
}
