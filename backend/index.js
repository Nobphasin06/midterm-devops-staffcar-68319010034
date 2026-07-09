const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Health Check Endpoint (โจทย์บังคับ)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', version: '1.0.0' });
});

// 2. GET /api/cars (ดึงข้อมูลรถทั้งหมด)
app.get('/api/cars', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM staff_cars ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. GET /api/cars/:id (ดึงข้อมูลรถรายคันตาม ID)
app.get('/api/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM staff_cars WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. POST /api/cars (เพิ่มข้อมูลรถใหม่)
app.post('/api/cars', async (req, res) => {
    try {
        const { plate_no, type, brand_model, color, owner, department, status } = req.body;
        const result = await pool.query(
            'INSERT INTO staff_cars (plate_no, type, brand_model, color, owner, department, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [plate_no, type, brand_model, color, owner, department, status || 'รอออก']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. PUT /api/cars/:id (แก้ไขข้อมูลรถ)
app.put('/api/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { plate_no, type, brand_model, color, owner, department, status } = req.body;
        const result = await pool.query(
            'UPDATE staff_cars SET plate_no=$1, type=$2, brand_model=$3, color=$4, owner=$5, department=$6, status=$7 WHERE id=$8 RETURNING *',
            [plate_no, type, brand_model, color, owner, department, status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. DELETE /api/cars/:id (ลบข้อมูลรถ)
app.delete('/api/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM staff_cars WHERE id = $1', [id]);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // สำหรับเอาไปเขียน Unit Test ในสัปดาห์ถัดไป