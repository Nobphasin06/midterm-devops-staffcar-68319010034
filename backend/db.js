const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const initDb = async () => {
    // เปลี่ยนชื่อตารางเป็นพหูพจน์ staffcars ตามกฎข้อกำหนดข้อ 4
    const queryText = `
    CREATE TABLE IF NOT EXISTS staffcars (
      id SERIAL PRIMARY KEY,
      plate_no VARCHAR(50) NOT NULL,
      type VARCHAR(50) NOT NULL,
      brand_model VARCHAR(100) NOT NULL,
      color VARCHAR(50) NOT NULL,
      owner VARCHAR(100) NOT NULL,
      department VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;
    try {
        await pool.query(queryText);
        console.log("Database table initialized.");
    } catch (err) {
        console.error("Error initializing database table:", err);
    }
};

initDb();

module.exports = pool;