const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

// ⚠️ เพิ่มบรรทัดนี้เข้าไป เพื่อดึงค่าพอกจากไฟล์ .env หรือถ้าไม่มีให้ใช้พอร์ต 5000 เป็นตัวสำรอง
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ... โค้ดส่วนอื่นๆ ที่เหลือของคุณนภสินธุ์ยิงยาวลงไปเหมือนเดิมเลยครับ ...

// 🟢 GET /health
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', version: '1.0.0' });
});

// ... โค้ดส่วน GET /api/staffcar , POST, PUT, DELETE ตัวเดิมของคุณนภสินธุ์ยิงยาวลงไปได้เลยครับ ...
// GET /api/staffcar
app.get('/api/staffcar', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM staffcars ORDER BY id DESC'); // เปลี่ยนเป็น staffcars
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/staffcar/:id
app.get('/api/staffcar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM staffcars WHERE id = $1', [id]); // เปลี่ยนเป็น staffcars
        if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/staffcar
app.post('/api/staffcar', async (req, res) => {
    try {
        const { plate_no, type, brand_model, color, owner, department, status } = req.body;
        const result = await pool.query(
            'INSERT INTO staffcars (plate_no, type, brand_model, color, owner, department, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', // เปลี่ยนเป็น staffcars
            [plate_no, type, brand_model, color, owner, department, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/staffcar/:id
app.put('/api/staffcar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { plate_no, type, brand_model, color, owner, department, status } = req.body;
        const result = await pool.query(
            'UPDATE staffcars SET plate_no=$1, type=$2, brand_model=$3, color=$4, owner=$5, department=$6, status=$7 WHERE id=$8 RETURNING *', // เปลี่ยนเป็น staffcars
            [plate_no, type, brand_model, color, owner, department, status, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/staffcar/:id
app.delete('/api/staffcar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM staffcars WHERE id = $1 RETURNING *', [id]); // เปลี่ยนเป็น staffcars
        if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ... โค้ดส่วนอื่นๆ ด้านบน ...

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

// ⚠️ บังคับเติมบรรทัดนี้ไว้ล่างสุดของไฟล์เด็ดขาด เพื่อให้ไฟล์เทสเรียกใช้ได้!
module.exports = app;