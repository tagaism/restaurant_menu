// fetch data
const API_URL = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";

export const getData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

