// เปลี่ยนโค้ดในจุดที่ดึงข้อมูล (SQL Query) ให้เป็น staffcars ทั้งหมด
// ตัวอย่างจุดสำคัญๆ ใน index.js:

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