// tests/album-create.js
const { expect } = require('chai');
 const request = require('supertest');
 const getDb = require('../src/services/db');
 const app = require('../src/app');

 describe('create album', () => {
    let db;
    let dbArtist;
    
    beforeEach(async () => {
        db = await getDb();

        await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', ['Oasis', 'Rock']);
          [[dbArtist]] = await db.query(`SELECT * FROM Artist`);
    });
 
    afterEach(async () => {
      await db.query('DELETE FROM Artist');
      await db.query('DELETE FROM Album');
      await db.end();
    });
 
    describe('/artist/:artistId/album', () => {
      describe('POST', () => {
        it("returns 404 if artist id does not exist", async () => {
            const res = await request(app).post("/artist/999999/album");
    
            expect(res.status).to.equal(404);
          });
    
          it("creates an album in the database", async () => {
            const testAlbum = {
              name: "Be Here Now",
              year: 1997,
            };
    
            const res = await request(app)
              .post(`/artist/${dbArtist.id}/album`)
              .send(testAlbum);
    
            const [[dBAlbum]] = await db.query("SELECT * FROM Album");
            
            expect(res.status).to.equal(201);
            expect(dBAlbum.name).to.equal(testAlbum.name);
            expect(dBAlbum.year).to.equal(testAlbum.year);
            expect(dBAlbum.artistId).to.equal(dbArtist.id);
        });
      });
    });
  });