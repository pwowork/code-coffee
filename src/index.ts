interface Dog{
    name:string;
    age:number;
}

const dogs : Array<Dog> = [];
dogs.push({name:"Sammy", age: 2});
dogs.push({name:"Doggy", age:5});
dogs.push({name:"Roscoe", age: 7});

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

