
import {Dog} from "../shared/interfaces"

const dogs = new Array<Dog>();

function displayDogs(){
    dogs.forEach((dog)=>
    {
        displayDog(dog);
    } );
}

function displayDog(dog:Dog)
{
    const dogUI = document.createElement("a" );
    dogUI.href="#";
    dogUI.className="list-group-item list-group-item-action";
    dogUI.text = dog.name;
    dogUI.setAttribute("data-toggle", "modal");
    dogUI.setAttribute("data-target", "#register-modal");
    dogUI.addEventListener('click',()=> {
        (document.getElementById("dog-name") as HTMLInputElement).value=dog.name;
        (document.getElementById("dog-age") as HTMLInputElement).value=dog.age.toString();
        (document.getElementById("dog-description") as HTMLInputElement).value=dog.description??"";
        });
    document.getElementById("dogs-list").append(dogUI);

}
async function loadDogs() {
    const response = await fetch('/api/dogs');
    const json = await response.json();
    const items = json.dogs as Array<Dog>;

    items.forEach((dog) => {
        dogs.push(dog);
    });
}

async function main() {
    await loadDogs();
    displayDogs();
}
document.getElementById("dog-register").addEventListener("click",async  (e)=>{
    e.preventDefault();
    //if (!(e.target as HTMLFormElement).checkValidity()) return;
    const  name = (document.getElementById("dog-name") as HTMLInputElement).value;

    const foundDog = dogs.find(d=>d.name==name);
    if (foundDog)
    {
        foundDog.age=Number.parseInt((document.getElementById("dog-age") as HTMLInputElement).value);
        foundDog.description=(document.getElementById("dog-description") as HTMLInputElement).value;
        const serverResponse = await fetch("/api/dogs/"+foundDog.name, {
            method:"PUT",
            body:JSON.stringify(foundDog),
            headers: { 
                'Content-Type': 'application/json'
             }
            });
            const serverDog = await serverResponse.json() as Dog;
            displayDog(serverDog);
    }
    else
    {  
        const dog:Dog = {
            name:(document.getElementById("dog-name") as HTMLInputElement).value,
            age: Number.parseInt( (document.getElementById("dog-age") as HTMLInputElement).value),
            description:(document.getElementById("dog-description") as HTMLInputElement).value
        }

        const serverResponse = await fetch("/api/dogs", {
        method:"POST",
        body:JSON.stringify(dog),
        headers: { 
            'Content-Type': 'application/json'
         }
        });
        const serverDog = await serverResponse.json() as Dog;
        displayDog(serverDog);
    }
    (document.getElementById("dog-name") as HTMLInputElement).value="";
    (document.getElementById("dog-age") as HTMLInputElement).value="";
    (document.getElementById("dog-description") as HTMLInputElement).value="";

});
main();




