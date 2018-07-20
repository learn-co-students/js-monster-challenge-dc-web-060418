let page = 1;

function clearMonsters() {
    document.getElementById("monster-container").innerHTML = ""
}

function handleShowMoreMonsters() {
    document.getElementById("forward").addEventListener("click", function() {
        console.log("Getting ready to show page ", page+1)
        clearMonsters();
        page++;
        fetchMonsters()
    })
}

function handleShowLessMonsters() {
    document.getElementById("back").addEventListener("click", function() {
        if (page > 1) {
            console.log("Getting ready to go back to page ", page-1)
            clearMonsters();
            page--;
            fetchMonsters()
        } else {
            console.log("No more monsters to show!")
        }
    })
}

function createMonsterForm() {
    let myform = document.createElement("form")
    document.getElementById("create-monster").appendChild(myform)
    myform.outerHTML = '<form id="monster-form"><input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create</button></form>'

}

function formHandler() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        let monsterName = document.getElementById("name").value
        let monsterAge = document.getElementById("age").value
        let monsterDesc = document.getElementById("description").value
        createNewMonster(monsterName, monsterAge, monsterDesc)
        document.querySelector("form").reset()
    })
}

function createNewMonster(monsterName, monsterAge, monsterDesc) {
    let data = {"name": monsterName, "age": monsterAge, "description": monsterDesc}
    console.log("trying to create new monster: ", data)
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    })
    singleMonsterMaker(data)
    console.log("created!")
}

function singleMonsterMaker(monsterObject) {
    let monsterDiv = document.createElement("div")
    monsterDiv.innerHTML = `<h2>${monsterObject.name}</h2><h4>Age: ${monsterObject.age}</h4><p>Bio: ${monsterObject.description}`
    document.querySelector("#monster-container").appendChild(monsterDiv)
}

function createAndAppendMonsters(jsonObject) {
    //console.log("I got this: ",  jsonObject)
    for (let monster of jsonObject) {
        singleMonsterMaker(monster)
    }
}

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => {
        //function to iterate over each monster and create new monster elements
        createAndAppendMonsters(json)
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("connected");
    fetchMonsters("1")
    
    createMonsterForm();
    formHandler();
    handleShowMoreMonsters();
    handleShowLessMonsters();
  });
