// src/controllers/album.js
const getDb = require("../services/db");

exports.create = async (req, res) => {
  const { name, year } = req.body;
  const { artistId } = req.params;
  const db = await getDb();

  try {
    const [[dbArtist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [
      artistId,
    ]);

    if (!dbArtist) return res.sendStatus(404);

    await db.query(`INSERT INTO Album (name, year, artistId) 
        VALUES (?, ?, ?) `, [name, year, artistId,]
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  } finally {
    await db.end();
  }
};