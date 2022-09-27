export declare type Views = {
    name: string;
    view: View;
};
export declare type derivedField = (object: any) => void;
export declare abstract class View {
    protected name: string;
    protected derivedFields: derivedField[] | undefined;
    constructor(name: string, derivedFields?: derivedField[]);
    getName(): string;
    protected abstract getContent(): Promise<any[]>;
    content(): Promise<any[]>;
}
