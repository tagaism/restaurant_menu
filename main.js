import {
    data,
    getData
} from "./helpers.js";

const data = getData;

const dishImage = document.querySelector("img");
const dishName = document.querySelector(".dish-name");
const dishPrice = document.querySelector(".dish-price");
const dishInfo = document.querySelector(".dish-info");
const mainMenu = document.querySelector("main");
const searchInput = document.querySelector(".search-input");
const search = document.querySelector(".search");


/**
 * 
 * @param {*} data
 * render data into main menu dynamically 
 */
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
                        <h3 class="dish-price">$${dish.price}</h3>
                    </div>
                    <div class="dish-info">
                        <p>${dish.desc}</p>
                    </div>
                </div>
            `
    })
}

renderDataToMenu(data);

/**
 * searchInfo function will get triggered once user slicks search button
 * users input will be read and function will seach thru the data
 * if word matches the title or the description of the dish then
 * it will return the item to and searchedItems. By using this temp
 * searchedItems as argument, renderDataToMenu(searchedItems) will be called 
 * and the data found by search result will be displayed on the main menu.
 */
const searchInfo = () => {

    let searchedWord = searchInput.value;

    let searchedItems = [];
    data.forEach(dish => {
        if (dish.title.includes(searchedWord) ||
            dish.desc.includes(searchedWord)) {
            searchedItems.push(dish)
        }
    })

    // cleaning the main menu before rendering search results
    mainMenu.innerHTML = "";

    renderDataToMenu(searchedItems)
}

/**
 * Event listener is added for search functionality
 * as soon as user click Search button it will call searchInfo function
 */
search.addEventListener("click", searchInfo)