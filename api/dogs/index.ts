import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Dog} from "../../shared/interfaces.d"
import * as mongoose from 'mongoose';

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,{useNewUrlParser:true});

// mongodb schema
const dogSchema = new mongoose.Schema({
    name:String,
    age:Number
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
        body: {dogs},
        header: {'Content-Type': 'application/json'}
    };

};

export default httpTrigger;