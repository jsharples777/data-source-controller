import {DataSourceController} from "./DataSourceController";

export class Collection {
    private name: string;
    constructor(name:string) {
        this.name = name;
    }

    find(filter?:any, sort?:any):Promise<any[]> {
        return DataSourceController.getInstance().find(this.name, filter, sort);
    }

    findOne(filter:any):Promise<any>{
        return DataSourceController.getInstance().findOne(this.name, filter);
    }

    insertOne(object:any):Promise<void>{
        return DataSourceController.getInstance().insertOne(this.name,object);
    }

    insertMany(objects:any[]):Promise<void>{
        return DataSourceController.getInstance().insertMany(this.name, objects);
    }

    replaceOne(object:any):Promise<void>{
        return DataSourceController.getInstance().replaceOne(this.name, object);
    }

    updateOne(object:any):Promise<void>{
        return DataSourceController.getInstance().updateOne(this.name, object);
    }

    deleteOne(object:any):Promise<void>{
        return DataSourceController.getInstance().deleteOne(this.name, object);
    }

    deleteMany(filter:any):Promise<void>{
        return DataSourceController.getInstance().deleteMany(this.name, filter);
    }

    deleteAll():Promise<void>{
        return DataSourceController.getInstance().deleteAll(this.name);
    }




    insertCompositeArrayElement(parentObjectKey:any,propertyName:string, childObject:any):Promise<void>{
        return DataSourceController.getInstance().insertCompositeArrayElement(this.name, parentObjectKey, propertyName, childObject);
    }

    replaceCompositeArrayElement(parentObjectKey:any,propertyName:string, childObject:any):Promise<void>{
        return DataSourceController.getInstance().replaceCompositeArrayElement(this.name, parentObjectKey,propertyName,childObject);
    }

    deleteCompositeArrayElement(parentObjectKey:any,propertyName:string, childObjectKey:any):Promise<void>{
        return DataSourceController.getInstance().deleteCompositeArrayElement(this.name, parentObjectKey,propertyName, childObjectKey);
    }


    replaceCompositeElement(parentObjectKey:any,propertyName:string, childObject:any):Promise<void>{
        return DataSourceController.getInstance().replaceCompositeElement(this.name, parentObjectKey,propertyName, childObject);
    }



}
