import {Util} from "./Util";

export type Views = {
    name:string,
    view:View
}

export type derivedField = (object:any) => void;

export abstract class View {
    protected name: string;
    protected derivedFields: derivedField[] | undefined;

    constructor(name:string,derivedFields?:derivedField[]) {
        this.name = name;
        this.derivedFields = derivedFields;
    }

    getName(): string {
        return this.name;
    }

    protected abstract getContent():Promise<any[]>;

    content(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results = this.getContent().then((results) => {
                if ((results.length > 0) && (this.derivedFields && this.derivedFields.length > 0)) {
                    results.forEach((result) => {
                        if (this.derivedFields) {
                            this.derivedFields.forEach((derivedField) => {
                                derivedField(result);
                            })
                        }
                    })
                }
                resolve(Util.copyObject(results));
            });
        });
    }}
