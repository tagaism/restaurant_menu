// fetch data
const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";

// export const getData = async () => {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     return data;
// }

// export const getData = fetch(API_URL)
//     .then(response => response.json())
//     .then(data => data)

export const data = [
    {
    "id": 1,
    "title": "buttermilk pancakes",
    "category": "breakfast",
    "price": 15.99,
    "img": "./images/item-1.jpeg",
    "desc": "`I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `"
    },
    {
    "id": 2,
    "title": "diner double",
    "category": "lunch",
    "price": 13.99,
    "img": "./images/item-2.jpeg",
    "desc": "`vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `"
    },
    {
    "id": 3,
    "title": "godzilla milkshake",
    "category": "shakes",
    "price": 6.99,
    "img": "./images/item-3.jpeg",
    "desc": "`ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`"
    }
]