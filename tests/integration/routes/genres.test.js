const request = require('supertest');
const {Genre} = require('../../../models/genres');
const {User} = require('../../../models/users')

let server;

describe('/api/genres',()=>{
    beforeEach(() => {server = require('../../../index');})
    afterEach(async()=>{
        await Genre.remove({});

        await  server.close();
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
    describe('POST /', ()=>{
        it('should return 401 if client is not logged in', async ()=>{
            const res = await request(server).post('/api/genres').send({name: 'horrer1'});
            expect(res.status).toBe(401);
        });
        it('should return 400 if genre is innvalid', async ()=>{
            const token = new User().generateToken();

            const res = await request(server).post('/api/genres').set('x-auth-token',token).send({name: 'h'});
            expect(res.status).toBe(400);
        });
        it('should save the  if genre is innvalid', async ()=>{
            const token = new User().generateToken();
        
            const res = await request(server).post('/api/genres').set('x-auth-token',token).send({name: 'action1'});
          const genre = await Genre.findOne({name:'action1'});

            expect(genre).not.toBeNull();
        });
        it('should return the  if it is nvalid', async ()=>{
            const token = new User().generateToken();
        
            const res = await request(server).post('/api/genres').set('x-auth-token',token).send({name: 'action1'});

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','action1');

        });
    } );
});