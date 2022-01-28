const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";
import {
    getImages
} from "./images_data.js";

const mainMenu = document.querySelector("main");
const searchInput = document.querySelector(".search-input");
const list = document.querySelector(".search-list");
const cartArea = document.querySelector(".cart-area");
const dishNameInCart = document.querySelector(".name-in-cart");
const dishQuantityInCart = document.querySelector(".quantity-in-cart");
const dishPriceInCart = document.querySelector(".price-in-cart");
const showCartButton = document.querySelector(".checkout-button");

/**
 * renderDataToMenu() function
 * renders data into main menu dynamically 
 * as a parameter it takes array of objects as data
 */
const renderDataToMenu = (data) => {
        // cleaning the main menu before rendering search results
        mainMenu.innerHTML = "";

        data.forEach(dish => {
                    //  creating a div element for each dish into main container
                    let cardDiv = document.createElement("div");
                    // appending each div to main container
                    mainMenu.appendChild(cardDiv);
                    // adding the class name for div
                    cardDiv.className = "card flex-with-direction";
                    // rendering the data into each div
                    const dishImg = getImages().find(obj => obj[dish.title])[dish.title];
                    cardDiv.innerHTML = `
                        <div class="img">
                            <img src="${dishImg}" alt="${dish.title}">
                        </div>
                        <div class="description">
                            <div class="name-and-price flex-with-direction white-opacity">
                                <h3 class="dish-name">${dish.title}</h3>
                                <h3 class="dish-price">$${dish.price}</h3>
                            </div>
                            <div class="dish-info">
                                <p>${dish.desc.replace(/`/g, "")}</p>
                            </div>
                            <div class="add-to-cart">
                                <button id="${dish.title}" data-price="${dish.price}" class="add-to-cart-button">ADD TO CART</button>
                            </div>
                        </div>
                    `
        });
}


/*
 * renderFilter() takes all categories from API.
 * Checks for uniqueness and rendering all uniq categories as filter items.
*/
const renderFilter = (data) => {
    const titles = [];
    data.forEach(obj => {
        const category = obj.category;
        if(titles.indexOf(category) === -1) { 
            // This means there is no filter with such title
            // creating a div element for each dish into main container
            const menuLi = document.createElement("li");
            menuLi.className = "search-item";
            menuLi.id = category;
            menuLi.innerText = category;
            list.appendChild(menuLi);
            titles.push(category);
        }
    });
}

/*
 * Here we use IIFE function on initial page load
*/
(() => {
    fetch(API_URL)
        .then(resp => resp.json())
        .then(data => {
            renderDataToMenu(data);
            renderFilter(data);
        });
    }
)();

/**
 * searchInfo function will get triggered once user starts to input dish
 * name or descriptions to search field.
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
            let searchedWord = searchInput.value.toLowerCase();

            let searchedItems = data.filter(dish =>
                dish.title.includes(searchedWord) ||
                dish.desc.includes(searchedWord)
            );

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
            let categoryItems = category === "all" ? 
            data : data.filter(item => item.category === category);

            renderDataToMenu(categoryItems);
        })
}
list.addEventListener("click", (e) => showCategoryMenu(e.target.id));

/**
 * Cart functionality
 */

// array to store added items to cart
let itemsOnCart = [];

const addItemsToCart = (targetItem) => {

    if (targetItem.innerText !== "ADDED") targetItem.innerText = 'ADDED';

    let itemToAdd = {};

    let dishName = targetItem.id;
    
    let dishPrice = targetItem.getAttribute("data-price");

    if (itemsOnCart.length > 0) {
        itemsOnCart.forEach(dish => {
            
            if (dish.dishName === dishName) {
                
                dish.dishQuantity++;
                dish.dishPrice = dishPrice * dish.dishQuantity;
            } else {
                itemToAdd.dishName = dishName;
                itemToAdd.dishPrice = Number(dishPrice);
                itemToAdd.dishQuantity = 1;
            }
        
        })
    } else {
        itemToAdd.dishName = dishName;
        itemToAdd.dishPrice = Number(dishPrice);
        itemToAdd.dishQuantity = 1;
    }

    itemsOnCart.push(itemToAdd);
}

document.addEventListener("click", e => {
    // adding eventListener to document can be challenging
    // because anywhere you click it's going to trigger
    // a click event, that's why verifying if the clicked element
    // has "ADD TO CART" text in it
    
    if (e.target.innerText === "ADD TO CART" || e.target.innerText === "ADDED") addItemsToCart(e.target);
});

const clearCartItems = (itemToClear) => {
    itemToClear.innerHTML = "";
}

const displayCartItems = () => {
    document.querySelector(".wrapper").style.display = "none";
    cartArea.style.display = "block";
    showCartButton.innerHTML = "CHECKOUT";
    // using this set collection to store unqiue names of the dishes
    let finalCartDishToDisplaySet = new Set();
    // looping over the itemsOnCart array and adding dishe names to set
    for (let item of itemsOnCart) {
        finalCartDishToDisplaySet.add(item.dishName);
    }
    // array to store dish names only with same order index they are in items on car array
    let dishNameArray = [];
    itemsOnCart.forEach(item => dishNameArray.push(item.dishName));
    // final array to store the dish objects to display
    let dishToDisplayFinalArray = [];
    for (let i of finalCartDishToDisplaySet) {
        let index = dishNameArray.indexOf(i);
        if (itemsOnCart[index].dishName !== '' && itemsOnCart[index].dishName !== undefined) dishToDisplayFinalArray.push(itemsOnCart[index]);
    }

    dishToDisplayFinalArray.forEach(itemOnCart => {
        
        // dish name display in cart
        let dishNameToDisplay = document.createElement("p");
        clearCartItems(dishNameToDisplay);
        dishNameInCart.appendChild(dishNameToDisplay);
        dishNameToDisplay.innerHTML = `${itemOnCart.dishName}`;

        // dish quantity display in cart
        let dishQuantityToDisplay = document.createElement("p");
        clearCartItems(dishQuantityToDisplay);
        dishQuantityInCart.appendChild(dishQuantityToDisplay);
        dishQuantityToDisplay.innerHTML = `${itemOnCart.dishQuantity}`;
        
        // dish price display in cart
        let dishPriceToDisplay = document.createElement("p");
        clearCartItems(dishPriceToDisplay);
        dishPriceInCart.appendChild(dishPriceToDisplay);
        dishPriceToDisplay.innerHTML = `${itemOnCart.dishPrice.toFixed(2)}`;
    })
}

showCartButton.addEventListener("click", displayCartItems);

/*
 * control buttons activation
*/
function makeActive(selectedId) {
    document.querySelectorAll(".search-item").forEach(el => {
        if (selectedId === el.id) {
            el.classList.add('activeButton');
        } else {
            el.classList.remove('activeButton');
        }
    })
}

list.addEventListener("click", (e) => makeActive(e.target.id))
