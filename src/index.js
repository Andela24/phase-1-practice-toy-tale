let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')


function collection(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    //take my toys array make HTML with them in order to add them to the DOM 
    let toysHTML = toys.map(function(toy) {
      return `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button data-id="${toy.id}" class="like-btn" id="[toy_id]">Like ❤️</button>
      <button data-id="${toy.id}" class="delete-btn" id="[toy_id]">Dislike ❤️</button>
    </div>`
    })
    
    //grabing and element to add an array above to the DOM(Page)
   toyCollection.innerHTML = toysHTML.join('')
  })

    toyForm.addEventListener("submit", function(e){
      e.preventDefault()
      console.log(e.target.name)
      //grab the inputs form
      const toyName = e.target.name.value
      const toyImage = e.target.image.value
     
      fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 99
      })
    
    })
    .then(resp => resp.json())
    .then(newToy => {
      //fetch updated database
      //now I need to update that DOM
      //convert newToy from json object to html in order to add to DOM
      
      newToyHTML = `
      <div class="card">
      <h2>${newToy.name}</h2>
      <img src="${newToy.image}" class="toy-avatar" />
      <p>${newToy.likes} Likes</p>
      <button data-id="${newToy.id}" class="like-btn" id="[toy_id]">Like ❤️</button>
      <button data-id="${newToy.id}" class="delete-btn" id="[toy_id]">dislike ❤️</button>
    </div>`
      //adding to the form
      toyCollection.innerHTML += newToyHTML
    })
})
}

collection()


//this update the DOM
toyCollection.addEventListener('click', (e) => {
  e.preventDefault()
  if(e.target.className === "like-btn") {
    
    let currentLikes = parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + " likes"
    
    //this updates data base
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      
      body: JSON.stringify({
        likes: newLikes
      })
    })
  }

  if(e.target.className === "delete-btn") {

  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
    method: "DELETE"
    
  })
  .then(r => {
    e.target.parentElement.remove()
  })
}

})




document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});