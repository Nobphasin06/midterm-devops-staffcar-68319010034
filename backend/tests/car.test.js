const request = require('supertest');
const app = require('../index'); // ดึงหน้าเว็บ Express มาทดสอบ

describe('Staff Car API Unit Tests', () => {

    // Test เคสที่ 1: ตรวจสอบว่าระบบ Health Check ทำงานได้ปกติ (โจทย์บังคับ)
    it('GET /health should return 200 and status OK', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'OK');
    });

    // Test เคสที่ 2: ตรวจสอบว่าเรียกดูรายการรถแล้วต้องตอบกลับเป็น Array ข้อมูล (แม้จะเป็นค่าว่าง)
    it('GET /api/cars should return 200 and an array', async () => {
        const res = await request(app).get('/api/cars');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test เคสที่ 3: ตรวจสอบระบบดักจับ Error เมื่อค้นหารถที่ไม่เคยมีอยู่จริงในระบบ
    it('GET /api/cars/999999 should return 404 for non-existing car', async () => {
        const res = await request(app).get('/api/cars/999999');
        expect(res.statusCode).toEqual(404);
    });
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500));
    });
});
