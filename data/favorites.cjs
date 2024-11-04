const fs = require('fs/promises')
const path = require('path');
let favorites = require('./favorites.json')

async function get(id) {
    return favorites.find(f => f.id === id);
}

async function getAll() {
    return favorites;
}

async function add(data) {
    const favorite = {
        id: +(new Date()) + Math.random().toString(36).slice(2),
        ...data,
    }

    favorites = [...favorites, favorite]

    await saveFavorites(favorites);

    return favorite;
}

async function saveFavorites(data) {
    const jsonData = JSON.stringify(data);

    await fs.writeFile(path.join(__dirname, 'favorites.json'), jsonData);
}

async function remove(id) {
    if (!favorites.some(f => f.id === id)) return false;

    const c = favorites.length;
    favorites = favorites.filter(f => f.id !== id);

    if (favorites.length === c) throw "Nothing done"
    await saveFavorites(favorites);

    return true;
}

module.exports = {
    get,
    getAll,
    add,
    remove,
}