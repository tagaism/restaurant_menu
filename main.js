const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";

const dishImage = document.querySelector("img");
const dishName = document.querySelector(".dish-name");
const dishPrice = document.querySelector(".dish-price");
const dishInfo = document.querySelector(".dish-info");
const mainMenu = document.querySelector("main");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");


const getData = fetch(API_URL)
    .then(resp => resp.json())
    .then(data => {
        /**
         * renderDataToMenu() function
         * renders data into main menu dynamically 
         * as a parameter it takes data that's coming from api
         */
        const renderDataToMenu = (data) => {
            data.forEach(dish => {
                // creating a div element for each dish into main container
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
                            <button class="add-to-button">ADD TO CART</button>
                        </div>
                    </div>
                `
            })
        }

        renderDataToMenu(data)

        /**
         * searchInfo function will get triggered once user clicks search button
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
            console.log(searchedItems)
            renderDataToMenu(searchedItems)
        }

        /**
         * Event listener is added for search functionality
         * as soon as user click Search button it will call searchInfo function
         */
        searchButton.addEventListener("click", searchInfo)
    })