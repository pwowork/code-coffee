
import {Dog} from "../shared/interfaces"

const dogs = new Array<Dog>();

function displayDogs(){
    dogs.forEach((dog)=>
    {
        const dogUI = document.createElement("a" );
        dogUI.href="#";
        dogUI.className="list-group-item list-group-item-action";
        dogUI.text = dog.name;
        dogUI.addEventListener('click',()=> {
            alert(dog.name+ " "+dog.age);
        
    });
        document.getElementById("dogs-list").append(dogUI);
    } );
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

main();




