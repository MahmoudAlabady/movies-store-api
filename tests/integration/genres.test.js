const request = require('supertest');
const {Genre} = require('../../models/genres')
let server;

describe('/api/genres',()=>{
    beforeEach(() => {server = require('../../index');})
    afterEach(async()=>{
        server.close();
        await Genre.remove({});
    });
     
    describe('GET /',()=>{
        it('should return all genres', async ()=>{
            await Genre.collection.insertMany([
                { name: 'horrer'},
                {name: 'action'},
                { name: 'horrer2'},
                {name: 'action2'},
            ])
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(4);
            expect(res.body.some(g => g.name === 'horrer')).toBeTruthy();
            expect(res.body.some(g => g.name === 'horrer2')).toBeTruthy();
            expect(res.body.some(g => g.name === 'action')).toBeTruthy();
            expect(res.body.some(g => g.name === 'action2')).toBeTruthy();

        });
       
    });
    describe('GET /:id',()=>{
        it('should return one genres if valid id is passed',async ()=>{
        const genre = new Genre({name: 'horrer'})   
        await genre.save();

         const res = await request(server).get('/api/genres/'+genre._id);
         expect(res.status).toBe(200);
         expect(res.body).toHaveProperty('name',genre.name);




        });
        it('should return 404 if invalid id is passed',async ()=>{
            const genre = new Genre({name: 'horrer'})   
            await genre.save();
    
             const res = await request(server).get('/api/genres/5');
             expect(res.status).toBe(404);
    
    
    
    
            });
    });
});