const favoritesDb = require('../data/favorites.cjs');
/**
 * @type {import('express'.RequestHandler)} 
 */
exports.get = async function (req, res) {
    const id = req.params.id;
    const favorite = await favoritesDb.get(id);
    if (favorite === undefined) {
        res.status(404).send({
            error: "Favorite not found",
            id,
        });
        return;
    }
    res.send(favorite);
}

/**
 * @type {import('express'.RequestHandler)} 
 */
exports.getAll = async function (_, res) {
    const favorites = await favoritesDb.getAll();
    res.send(favorites);
}

/**
 * @type {import('express'.RequestHandler)} 
 */
exports.post = async function (req, res) {
    const favorite = req.body;
    const newFavorite = await favoritesDb.add(favorite)
    res.status(201).send(newFavorite)
}

/**
 * @type {import('express'.RequestHandler)} 
 */
exports.delete = async function (req, res) {
    const id = req.params.id;

    const found = await favoritesDb.remove(id);

    if (found) {
        res.status(204).send();
        return;
    }
    res.status(404).send({
        error: "Favorite not found",
        id,
    });
}
