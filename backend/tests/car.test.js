const request = require('supertest');
const app = require('../index');

// Mocking ตัว pg pool เพื่อไม่ต้องต่อฐานข้อมูลจริงเวลารันเทสบน GitHub Actions
jest.mock('../db', () => {
    return {
        query: jest.fn().mockImplementation((queryText, values) => {
            if (queryText.includes('SELECT * FROM staffcar ORDER')) {
                return { rows: [{ id: 1, plate_no: 'กข 1234', type: 'รถยนต์', brand_model: 'Toyota Civic', color: 'ดำ', owner: 'สมชาย', department: 'ช่างยนต์', status: 'ออกแล้ว' }] };
            }
            if (queryText.includes('INSERT INTO')) {
                return { rows: [{ id: 2, plate_no: 'คฆ 5678', type: 'รถจักรยานยนต์', brand_model: 'Honda Wave', color: 'แดง', owner: 'สมหญิง', department: 'คอมพิวเตอร์', status: 'รอออก' }] };
            }
            return { rows: [] };
        })
    };
});

describe('Staff Car API Tests', () => {
    // Test Case 1: เช็ค Health Endpoint
    it('GET /health should return 200 and status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });

    // Test Case 2: ดึงข้อมูลรถทั้งหมด
    it('GET /api/staffcar should return list of cars', async () => {
        const res = await request(app).get('/api/staffcar');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test Case 3: เพิ่มข้อมูลรถใหม่
    it('POST /api/staffcar should create a new car record', async () => {
        const res = await request(app).post('/api/staffcar').send({
            plate_no: 'คฆ 5678',
            type: 'รถจักรยานยนต์',
            brand_model: 'Honda Wave',
            color: 'แดง',
            owner: 'สมหญิง',
            department: 'คอมพิวเตอร์',
            status: 'รอออก'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('plate_no', 'คฆ 5678');
    });
});