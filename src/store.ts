import {Dog} from "../shared/interfaces";
export default{
    getAll: async()=>{
        const response = await fetch('/api/dogs'); 
        const json = await response.json();
        return json.dogs as Array<Dog>;
    },
    update: async (dog:Dog, name:string)=>{
        const serverResponse = await fetch("/api/dogs/"+name, {
            method:"PUT",
            body:JSON.stringify(dog),
            headers: { 
                'Content-Type': 'application/json'
             }
            });
            // const serverDog = await serverResponse.json() as Dog;
            // displayDog(serverDog);
  
    }
};