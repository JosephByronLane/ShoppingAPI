import request from 'supertest'
const serverUrl = 'http://localhost:3000'

describe('POST /equipo-2/purchases',()=>{

    let token: string;

    beforeAll(async () => {
        token = await loginUser();
    });
    
    test('should return a status of 409 (no stock)', async () => {
        const response = await request(serverUrl)
            .post('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                productoId: 4,
                cantidad:100000
            });
        expect(response.status).toBe(409);
    });
    test('should return a status of 400 (wrong datatayoe)', async () => {
        const response = await request(serverUrl)
            .post('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                productoId: 4,
                cantidad:"100000"
            });
        expect(response.status).toBe(400);
    });
    test('should return a status of 400 (wrong datatayoe)', async () => {
        const response = await request(serverUrl)
            .post('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                Id: 4,
                cantidad: 1
            });
        expect(response.status).toBe(400);
    });
    test('should return a status of 404 (not found)', async () => {
        const response = await request(serverUrl)
            .post('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                productoId: 4000,
                cantidad:10
            });
        expect(response.status).toBe(404);
    });
    test('should return a status of 200 (all ok)', async () => {
        const response = await request(serverUrl)
            .post('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                productoId: 4,
                cantidad:1
            });
        expect(response.status).toBe(200);
    });
})


let detalladoCompraId : number

describe('GET /equipo-2/purchases',()=>{
    let token: string;

    beforeAll(async () => {
        token = await loginUser();
    });
    
    test('should return a status of 200', async () => {
        const response = await request(serverUrl)
            .get('/equipo-2/purchases/1')
            .set('Authorization', `Bearer ${token}`) 
            .send();
        expect(response.status).toBe(200);
    });

    test('should return with a formattedCompra', async () => {        
        const response = await request(serverUrl)
            .get('/equipo-2/purchases/1')
            .set('Authorization', `Bearer ${token}`) 
            .send();
        expect(response.body.data).toHaveProperty('formattedCompra');
    });

    test('should return with a formattedCompra', async () => {
        
        const response = await request(serverUrl)
            .get('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send();
        expect(response.body.data).toHaveProperty('formattedCompra');

        detalladoCompraId = response.body.data.formattedCompra.detalladoCompras[0].id
    });
})

let stopgap: string;

describe('PUT /equipo-2/purchases',()=>{

    let token: string;

    beforeAll(async () => {
        token = await loginUser();
    });
    
    test('should return a status of 404 (purchase not found)', async () => {
        const response = await request(serverUrl)
            .put('/equipo-2/purchases/0')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                nuevaCantidad: 2
            });
        expect(response.status).toBe(404);
    });

    test('Should return a status of 200. (All ok) THIS ONE MIGHT FAIL', async () => {
        const response = await request(serverUrl)
            .put(`/equipo-2/purchases/${detalladoCompraId}`)
            .set('Authorization', `Bearer ${token}`) 
            .send({
                nuevaCantidad: 2
            });
        expect(response.status).toBe(200);
    });

    test('should return a status of 400 (cantidad not found) THIS ONE MIGHT FAIL', async () => {
        const response = await request(serverUrl)
            .put('/equipo-2/purchases/24')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                asdfasdfadsf: 2
            });
        expect(response.status).toBe(400);
    });
    
})

describe('DELETE /equipo-2/purchases',()=>{

    let token: string;

    beforeAll(async () => {
        token = await loginUser();
    });
    
    test('should return a status of 200 (all ok)', async () => {
        const response = await request(serverUrl)
            .delete('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                detalladoCompraId: detalladoCompraId
            });
        expect(response.status).toBe(200);
    }); 
        
    test('should return a status of 404 (purchase not found)', async () => {
        const response = await request(serverUrl)
            .delete('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                detalladoCompraId: 1
            });
        expect(response.status).toBe(404);
    });    

    test('should return a status of 403 (purchase not acrive)', async () => {
        const response = await request(serverUrl)
            .delete('/equipo-2/purchases')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                detalladoCompraId: 3
            });
        expect(response.status).toBe(403);
    });     
})


describe('GET /equipo-2/products',()=>{
    let token: string;

    beforeAll(async () => {
        token = await loginUser();
    });
    
    test('should return a status of 200', async () => {
        const response = await request(serverUrl)
            .get('/equipo-2/product?precio=1499.99')
            .set('Authorization', `Bearer ${token}`) 
            .send();
        expect(response.status).toBe(200);
    });

    test('should return with a status of 400', async () => {
        
        const response = await request(serverUrl)
            .get('/equipo-2/product?precasdfio=1499.99')
            .set('Authorization', `Bearer ${token}`) 
            .send();
            expect(response.status).toBe(400);
        });

    test('should return with a status of 200', async () => {
        const response = await request(serverUrl)
            .get('/equipo-2/product?categoria=Travel packages')
            .set('Authorization', `Bearer ${token}`) 
            .send();
            expect(response.status).toBe(200);
        });
    test('should return with a length of 0', async () => {
        const response = await request(serverUrl)
            .get('/equipo-2/product?precio=10')
            .set('Authorization', `Bearer ${token}`) 
            .send();
            console.log(response.body.data.products)
            expect(response.body.data.products).toHaveLength(0);
        });
})

async function loginUser(): Promise<string> {
    const loginResponse = await request(serverUrl)
      .post('/equipo-2/login')
      .send({
        nombre: "admin",
        contrasenia: "admin"
    });
    return loginResponse.body.token; 
}