import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Dog} from "../shared/interfaces"
/*
export interface Dog{
    name:string;
    age:number;
}
*/

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Returned list of dogs.');
    const dogs : Array<Dog> = [
        {name:"Sammy", age: 2},
        {name:"Doggy", age:5},
        {name:"Roscoe", age: 7},
        {name:"Butch", age: 4},
        {name:"Azuros", age: 9}
    ];
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {dogs},
        header: {'Content-Type': 'application/json'}
    };

};

export default httpTrigger;