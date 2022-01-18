// fetch data
const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";

const dishImage = document.querySelector("img");
const dishName = document.querySelector(".dish-name");
const dishPrice = document.querySelector(".dish-price");
const dishInfo = document.querySelector(".dish-info");
const mainMenu = document.querySelector("main");


const renderDataToMenu = () => {
    fetch(API_URL).then(resp => resp.json()).then(data => {
        data.forEach(dish => {
            // creating a div element for each dish into main container
            let cardDiv = document.createElement("div");
            // appending each div to main container
            mainMenu.appendChild(cardDiv);
            // adding the class name for div
            cardDiv.className = "card flex-with-direction";
            // rendering the data into each div
            cardDiv.innerHTML =`
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
                </div>
            `
        })
    })
}
renderDataToMenu();
