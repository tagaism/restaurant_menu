const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";

const dishImage = document.querySelector("img");
const dishName = document.querySelector(".dish-name");
const dishPrice = document.querySelector(".dish-price");
const dishInfo = document.querySelector(".dish-info");
const mainMenu = document.querySelector("main");
const searchInput = document.querySelector(".search-input");
const addToCartDiv = document.querySelector(".add-to-cart");
const addToCartButton = document.querySelector(".add-to-cart-button");
const list = document.querySelector(".search-list");

/**
 * renderDataToMenu() function
 * renders data into main menu dynamically 
 * as a parameter it takes array of objects as data
 */
const renderDataToMenu = (data) => {
    data.forEach(dish => {
        // // creating a div element for each dish into main container
        let cardDiv = document.createElement("div");
        // appending each div to main container
        mainMenu.appendChild(cardDiv);
        // adding the class name for div
        cardDiv.className = "card flex-with-direction";
        // rendering the data into each div
        cardDiv.innerHTML = `
            <div class="img">
                <img src="${dish.img}" alt="${dish.title}">
            </div>
            <div class="description">
                <div class="name-and-price flex-with-direction white-opacity">
                    <h3 class="dish-name">${dish.title}</h3>
                    <h3 class="dish-price">${dish.price}</h3>
                </div>
                <div class="dish-info">
                    <p>${dish.desc}</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-button">ADD TO CART</button>
                </div>
            </div>
        `
    });
}

/*
 * Here we use IIFE function on initial page load
*/
(
    () => {
        fetch(API_URL)
            .then(resp => resp.json())
            .then(data => renderDataToMenu(data));
    }
)();

/**
 * searchInfo function will get triggered once user clicks search button
 * users input will be read and function will seach thru the data
 * if word matches the title or the description of the dish then
 * it will return the item to and searchedItems. By using this temp
 * searchedItems as argument, renderDataToMenu(searchedItems) will be called 
 * and the data found by search result will be displayed on the main menu.
 */
const searchInfo = () => {
    fetch(API_URL)
        .then(resp => resp.json())
        .then(data => {
            let searchedWord = searchInput.value;

            let searchedItems = [];
            searchedItems = data.filter(dish =>
                dish.title.includes(searchedWord) ||
                dish.desc.includes(searchedWord)
            );

            // cleaning the main menu before rendering search results
            mainMenu.innerHTML = "";

            renderDataToMenu(searchedItems);
        });
}

searchInput.addEventListener("input", searchInfo);


/**
 * showCategoryMenu() function takes category as parameter and filters data 
 * for clicked category and updates the main menu to show related items 
 * for that category only
 */
function showCategoryMenu(category) {
    fetch(API_URL)
        .then(resp => resp.json())
        .then(data => {
            let categoryItems = data.filter(item => item.category === category)
            mainMenu.innerHTML = "";

            renderDataToMenu(categoryItems);
        })
}

list.addEventListener("click", (e) => {
    // capturing the id of event target
    let categoryClicked = e.target.id;

    // clicked category
    let category;
    switch (categoryClicked) {
        case "breakfast":
            category = "breakfast";
            break;
        case "lunch":
            category = "lunch";
            break;
        case "shakes":
            category = "shakes";
            break;
        case "dinner":
            category = "dinner";
            break;
        default:
            location.reload(); // reloads the page
            break;
    }
    showCategoryMenu(category);
})
