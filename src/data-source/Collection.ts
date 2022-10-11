import {DataSourceController} from "./DataSourceController";

export class Collection {
    private name: string;
    private controller: DataSourceController;
    constructor(name:string,controller:DataSourceController) {
        this.name = name;
        this.controller = controller;
    }

    find(filter?:any, sort?:any):Promise<any[]> {
        return this.controller.find(this.name, filter, sort);
    }

    findOne(filter:any):Promise<any>{
        return this.controller.findOne(this.name, filter);
    }

    insertOne(object:any):Promise<void>{
        return this.controller.insertOne(this.name,object);
    }

    insertMany(objects:any[]):Promise<void>{
        return this.controller.insertMany(this.name, objects);
    }

    replaceOne(object:any):Promise<void>{
        return this.controller.replaceOne(this.name, object);
    }

    updateOne(object:any):Promise<void>{
        return this.controller.updateOne(this.name, object);
    }

    deleteOne(object:any):Promise<void>{
        return this.controller.deleteOne(this.name, object);
    }

    deleteMany(filter:any):Promise<void>{
        return this.controller.deleteMany(this.name, filter);
    }

    deleteAll():Promise<void>{
        return this.controller.deleteAll(this.name);
    }




    insertCompositeArrayElement(parentObjectKey:any,propertyName:string, childObject:any):Promise<void>{
        return this.controller.insertCompositeArrayElement(this.name, parentObjectKey, propertyName, childObject);
    }

    replaceCompositeArrayElement(parentObjectKey:any,propertyName:string, childObject:any):Promise<void>{
        return this.controller.replaceCompositeArrayElement(this.name, parentObjectKey,propertyName,childObject);
    }

    deleteCompositeArrayElement(parentObjectKey:any,propertyName:string, childObjectKey:any):Promise<void>{
        return this.controller.deleteCompositeArrayElement(this.name, parentObjectKey,propertyName, childObjectKey);
    }


    replaceCompositeElement(parentObjectKey:any,propertyName:string, childObject:any):Promise<void>{
        return this.controller.replaceCompositeElement(this.name, parentObjectKey,propertyName, childObject);
    }



}
