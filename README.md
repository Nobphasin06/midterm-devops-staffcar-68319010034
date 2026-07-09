>>﻿# 🚗 ระบบบันทึกข้อมูลรถของบุคลากรวิทยาลัยเทคนิคเลย (staffcar)

[![CI Pipeline](https://github.com/yourgithubusername/midterm-devops-staffcar-6xxxxxxxx/actions/workflows/ci.yml/badge.svg)](https://github.com/yourgithubusername/midterm-devops-staffcar-6xxxxxxxx/actions)

### ข้อมูลผู้พัฒนา
- **ชื่อ-นามสกุล:** นภสอนธุ์ ศรีจำปา
- **รหัสนักศึกษา:** 68319010034
- **ระดับชั้น:** ปวส.2 กลุ่ม 1

---

### ตาราง API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | ตรวจสอบสถานะการทำงานของระบบ |
| GET | `/api/staffcar` | ดึงข้อมูลรายการรถทั้งหมด |
| GET | `/api/staffcar/:id` | ดึงข้อมูลรถแบบระบุ ID |
| POST | `/api/staffcar` | บันทึกข้อมูลรถของบุคลากรเพิ่มใหม่ |
| PUT | `/api/staffcar/:id` | แก้ไขข้อมูลรถตาม ID |
| DELETE | `/api/staffcar/:id` | ลบข้อมูลรถออกจากระบบ |

---

### วิธีการสั่งรันระบบ

#### 1. สำหรับการพัฒนา (Development Mode - Local Build)
```bash
docker-compose up --build -d
