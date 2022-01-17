import { data, getData } from "./helpers.js";

const data = getData;

const dishImage = document.querySelector("img")
const dishName = document.querySelector(".dish-name")
const dishPrice = document.querySelector(".dish-price")
const dishInfo = document.querySelector(".dish-info")
const mainMenu = document.querySelector("main")

console.log(data)

// method for rendering dishes into main menu
const renderDataToMenu = (data) => {

    // can be refactored by using object destructuring
    // const [title, price, img, desc] = data;

    // looping over the objects of array and rendering dishes
    data.forEach(dish => {

        // creating a div element for each dish into main container
        let cardDiv = document.createElement("div");
        // appending each div to main container
        mainMenu.appendChild(cardDiv);
        // adding the class name for div
        cardDiv.className = "card flex-with-direction";
        // rendering the data into each div
        cardDiv.innerHTML =
            `<div class="img">
                    <img src="${dish.img}
                    " alt="${dish.title}">
                </div>
                <div class="description">
                    <div class="name-and-price flex-with-direction white-opacity">
                        <h3 class="dish-name">${dish.title}</h3>
                        <h3 class="dish-price">${dish.price}</h3>
                    </div>
                    <div class="dish-info">
                        <p>${dish.desc}</p>
                    </div>
                </div>
            `
    })

}

renderDataToMenu(data)