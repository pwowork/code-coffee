/*
    for (const child of document.getElementById("dogs-list").children){
        child.addEventListener('click',()=> {
            alert(child.textContent+ " 1");
        }) ;
    }
    */
    document.getElementById("dogs-list").childNodes.forEach((child) => {
        child.addEventListener('click',()=> {
            alert(child.textContent+ " 12");
        
    })
});