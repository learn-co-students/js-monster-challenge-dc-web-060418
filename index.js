let currentPage = 1;

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    console.log("DOM");
    createForm()
    getData()
    formHandler()
    showNextMonsterPage()
    showPreviousMonsterPage()
});




/* ************* Form and Input Creation  ************* */

function createForm() {
  let form = document.createElement(`form`);
  form.id = `form`;
  document.getElementById(`create-monster`).appendChild(form);

  document.getElementById(`form`).appendChild(createInputAndPlaceholder(`input`,`Name`));
  document.getElementById(`form`).appendChild(createInputAndPlaceholder(`input`,`Age`));
  document.getElementById(`form`).appendChild(createInputAndPlaceholder(`input`,`Description`));

  let button = document.createElement('button');
  button.innerHTML = `Create`;
  document.getElementById(`form`).appendChild(button);


}

function createInputAndPlaceholder(element, placeholderValue) {
  let newElement = document.createElement(`${element}`);
  newElement.placeholder = placeholderValue;
  newElement.id =placeholderValue
  return newElement;
}




/* ************* Rendering Monster List on Page  ************* */

function populateMonsterList(json) {
  for (monster of json) {
    renderSingleMonster(monster);
  }
}

function renderSingleMonster(monster) {
  let liMonster = document.createElement(`div`);
  liMonster.innerHTML = `<h2>${monster.name}</h2>
                        <h4>Age: ${monster.age}</h4>
                        <p>Bio: ${monster.description}</p>`

  document.getElementById(`monster-container`).appendChild(liMonster);
}




/* ************* Event Handlers  ************* */

/* ******** Form Event Handlers  ******** */
function formHandler() {
  document.querySelector(`button`).addEventListener("click", event => {
    event.preventDefault();

    let name = document.getElementById(`Name`).value;
    let age = document.getElementById(`Age`).value;
    let description = document.getElementById(`Description`).value;

    console.log(name, age, description);

    createNewMonster(name, age, description);
    document.getElementById(`form`).reset()

  })

}

function createNewMonster(monsterName, monsterAge, monsterDescription) {
  let monsterObject = {name: monsterName, age: monsterAge, description: monsterDescription};
  console.log(`before the fetch`);

  fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(monsterObject)
    })

    console.log(`after the fetch`);

}

/* ******** Forwad/Back Event Handlers  ******** */

function showNextMonsterPage() {
  document.getElementById('forward').addEventListener("click", function functionName(event) {
    document.getElementById(`monster-container`).innerHTML = ""
    currentPage++;
    console.log(currentPage);
    getData();
  })
}

function showPreviousMonsterPage() {
  document.getElementById(`back`).addEventListener("click", (event) => {
    document.getElementById(`monster-container`).innerHTML = "";
    currentPage--;
    console.log(currentPage);
    getData();
  })
}



/* ************* Data Fetching  ************* */

function getData() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
.then(res => res.json())
.then(json => populateMonsterList(json));
}
