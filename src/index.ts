
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
    dogUI.addEventListener('click',()=> {
        alert(dog.name+ " "+dog.age);
    
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
document.getElementById("dog-register").addEventListener("click",async  ()=>{
    const dog = {
        name:(document.getElementById("dog-name") as HTMLInputElement).value,
        age:(document.getElementById("dog-age") as HTMLInputElement).value,
    }
    const serverResponse = await fetch("/api/dogs", {
        method:"POST",
        body:JSON.stringify(dog),
        headers: { 
            'Content-Type': 'application/json'
         }
    }

    );
    const serverDog = await serverResponse.json() as Dog;
    (document.getElementById("dog-name") as HTMLInputElement).value="";
    (document.getElementById("dog-age") as HTMLInputElement).value="";
displayDog(serverDog);
});
main();




