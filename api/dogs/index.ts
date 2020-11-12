import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Dog} from "../../shared/interfaces.d"
import * as mongoose from 'mongoose';
import { createDocumentRegistry } from "typescript";

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,{useNewUrlParser:true});

// mongodb schema
const dogSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:16,
        trim:true,
        match:/[A-Za-z]*/,
        required:true,
        index:true,
        unique:true
    },
    age:{
        type:Number,
        min:0,
        max:20
    },
    description:{
        type:String,
        maxlength:1000,
        minlength:50,
        required:true,
        trim:true
    }
})

// local document data type
interface DogElement extends Dog, mongoose.Document{};

// Interface between code and database
const DogModel = mongoose.model<DogElement>('Dog', dogSchema);
// const dogs = await DogModel.find();
// for(const dog of dogs as Dog[])
// {
//     dog.
// }
// temporary intialization code

//fillData();

 async function fillData()
{
     await DogModel.insertMany( [
        {name:"Mongoose", age: 12},
        {name:"Sammy", age: 2},
        {name:"Doggy", age:5},
        {name:"Roscoe", age: 7},
        {name:"Butch", age: 4},
        {name:"Azuros", age: 9}
    ]);
    
}
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Returned list of dogs.');
    switch(req.method)
    {
        case 'POST':
            await createDog(context);
            break;
        case 'GET':
            await getAllDogs(context);
            break;
    }
};
async function createDog(context: Context) {
    const newDog = context.req.body as Dog; //get data from user
    const dataDog=await DogModel.create(newDog); // save to database
    context.res={
        body:dataDog,
        status:201,
        header: { 'Content-Type': 'application/json' }
    };
}

async function getAllDogs(context: Context) {
    const dogs = await DogModel.find();
    //     const dogs : Array<Dog> = [
    //     {name:"Sammy", age: 2},
    //     {name:"Doggy", age:5},
    //     {name:"Roscoe", age: 7},
    //     {name:"Butch", age: 4},
    //     {name:"Azuros", age: 9}
    // ];
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { dogs },
        header: { 'Content-Type': 'application/json' }
    };
}

export default httpTrigger;

