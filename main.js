const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";

const dishImage = document.querySelector("img");
const dishName = document.querySelector(".dish-name");
const dishPrice = document.querySelector(".dish-price");
const dishInfo = document.querySelector(".dish-info");
const mainMenu = document.querySelector("main");
const searchInput = document.querySelector(".search-input");
const breakfast = document.querySelector("#breakfast");
const lunch = document.querySelector("#lunch");
const shakes = document.querySelector("#shakes");
const dinner = document.querySelector("#dinner");

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
            });
        }

        renderDataToMenu(data);

        /**
         * function clearMainMenu() clears the main page dishes
         */
        function clearMainMenu(){

            mainMenu.innerHTML = "";
        }

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
            searchedItems = data.filter(dish =>
                dish.title.includes(searchedWord) ||
                dish.desc.includes(searchedWord)
            );

            // cleaning the main menu before rendering search results
            clearMainMenu();

            renderDataToMenu(searchedItems);
        }

        /**
         * Event listener is added for search functionality
         * as soon as user click Search button it will call searchInfo function
         */
        searchInput.addEventListener("input", searchInfo);

        /**
         * showBreakfast() function filters through data [objects]
         * and checks if the object category is breakfast
         */
        function showBreakfast() {
            // filtering object categories where it is breakfast
            let breakfastItems = data.filter(item => item.category === 'breakfast')

            clearMainMenu();

            renderDataToMenu(breakfastItems);
        }
        breakfast.addEventListener("click", showBreakfast());

        /**
         * showLunch() function filters through data [objects]
         * and checks if the object category is lunch
         */
         function showLunch() {
            // filtering object categories where it is lunch
            let lunchItems = data.filter(item => item.category === 'lunch')

            clearMainMenu();

            renderDataToMenu(lunchItems);
        }
        lunch.addEventListener("click", showLunch());

        /**
         * showShakes() function filters through data [objects]
         * and checks if the object category is shakes
         */
         function showShakes() {
            // filtering object categories where it is shakes
            let shakeItems = data.filter(item => item.category === 'shakes')

            clearMainMenu();

            renderDataToMenu(shakeItems);
        }
        shakes.addEventListener("click", showShakes());

        /**
         * showDinner() function filters through data [objects]
         * and checks if the object category is dinner
         */
         function showDinner() {
            // filtering object categories where it is dinner
            let dinnerItems = data.filter(item => item.category === 'dinner')

            clearMainMenu();

            renderDataToMenu(dinnerItems);
        }
        dinner.addEventListener("click", showDinner());
    });