// import {
//     data,
//     getData
// } from "./helpers.js";

// const data = getData;

const data = [{
        "id": 1,
        "title": "buttermilk pancakes",
        "category": "breakfast",
        "price": 15.99,
        "img": "https://i.etsystatic.com/24305988/r/il/274a22/2462601398/il_794xN.2462601398_lsge.jpg",
        "desc": "`I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `"
    },
    {
        "id": 2,
        "title": "diner double",
        "category": "lunch",
        "price": 13.99,
        "img": "https://i.etsystatic.com/24305988/r/il/274a22/2462601398/il_794xN.2462601398_lsge.jpg",
        "desc": "`vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `"
    },
    {
        "id": 3,
        "title": "godzilla milkshake",
        "category": "shakes",
        "price": 6.99,
        "img": "https://www.sugarandsoul.co/wp-content/uploads/2021/04/chocolate-milkshake-8.jpg",
        "desc": "`ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`"
    },
    {
        "id": 4,
        "title": "country delight",
        "category": "breakfast",
        "price": 20.99,
        "img": "https://i.etsystatic.com/24305988/r/il/274a22/2462601398/il_794xN.2462601398_lsge.jpg",
        "desc": "`Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `"
    },
    {
        "id": 8,
        "title": "vanilla milkshake",
        "category": "shakes",
        "price": 6.99,
        "img": "https://goodiegodmother.com/wp-content/uploads/2019/08/creamy-cookies-and-cream-milkshake-1.jpg",
        "desc": "`ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`"
    },
]

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