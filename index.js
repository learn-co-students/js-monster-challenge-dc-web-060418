
document.addEventListener("DOMContentLoaded", function(){
  fetchMonsters()
  createAndAppendMonsterForm()
  addFormHandler()

  getForwardButton().addEventListener("click", function(){
    pageNumber++
    clearMonsters()
    fetchMonsters(pageNumber)
    })

  getBackButton().addEventListener("click", function(){
    pageNumber--
    clearMonsters()
    fetchMonsters(pageNumber)
  })
});


function render(monster){
    let monsterCard = document.createElement('div')
    monsterCard.classList.add('monster-cards')
    monsterCard.id = monster.id
    monsterCard.innerHTML +=
    `<h2>${monster.name}</h2>
    <p>"${monster.age}"</p>
    <p>"${monster.description}"</p>
    <p>"${monster.id}"</p>`
    getMonsterContainer().appendChild(monsterCard)
  }

  function addFormHandler(){
    document.querySelector('form').addEventListener('submit',
    function(event){
      event.preventDefault()
      let monsterName = document.getElementById('name').value
      let monsterAge = document.getElementById('age').value
      let monsterDescription = document.getElementById('description').value
      console.log(monsterName, monsterAge, monsterDescription)
      postNewMonster(monsterName, monsterAge, monsterDescription)
      document.querySelector('form').reset()
    })
  }

  function postNewMonster(monsterName, monsterAge, monsterDescription){
    let data = {
      "name": monsterName,
      "age": monsterAge,
      "description": monsterDescription
    }
    fetch(`http://localhost:3000/monsters`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(monster => {
      render(monster)
      console.log(monster)
    })

  }



let pageNumber = 1
function fetchMonsters(pageNumber){
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.forEach((monster) => render(monster))
    })
  }

  function getMonsterContainer(){
    return document.getElementById('monster-container')
  }

  function getForwardButton(){
    return document.getElementById('forward')
  }

  function getBackButton(){
    return document.getElementById('back')
  }

  function getCreateMonsterForm(){
    return document.getElementById('create-monster')
  }

  function createAndAppendMonsterForm(){
    let form = document.createElement("form")
    form.innerHTML = `<form>
  Name:<br>
  <input type="text" id="name"><br>
  Age:<br>
  <input type="text" id="age"><br>
  Description:<br>
  <textarea id="description" rows="10" cols="30">

</textarea><br>
  <input type="submit" id ="submit" value="Submit">
</form>`
    getCreateMonsterForm().appendChild(form)
  }

  function clearMonsters(){
    getMonsterContainer().innerHTML = ''
  }
