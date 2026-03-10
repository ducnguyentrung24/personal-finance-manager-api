# Personal Finance Manager API

Một REST API đơn giản để quản lý tài chính cá nhân: theo dõi thu/chi, quản lý danh mục, giao dịch và xem báo cáo.

Project này được xây dựng nhằm mục đích luyện tập backend với **Node.js, Express và MongoDB**.

## 1) Tech stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (`jsonwebtoken`)
- **Validation:** Joi
- **Password hashing:** bcrypt
- **Logging:** morgan
- **CORS:** cors
- **Environment config:** dotenv
- **Export Excel:** exceljs
- **Dev tool:** nodemon

## 2) Cấu trúc thư mục dự án

```text
personal-finance-api/
├── .env.example
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   └── db.js
    ├── constants/
    │   ├── categoryType.js
    │   └── userRoles.js
    ├── middlewares/
    │   ├── auth.middleware.js
    │   ├── authorize.middleware.js
    │   ├── error.middleware.js
    │   └── validate.middleware.js
    ├── modules/
    │   ├── auth/
    │   ├── user/
    │   ├── category/
    │   ├── transaction/
    │   └── report/
    └── utils/
        ├── ApiError.js
        ├── jwt.js
        └── response.js
```

### Mô tả nhanh

- `src/config`: cấu hình kết nối hệ thống (DB)
- `src/constants`: các hằng số dùng chung
- `src/middlewares`: middleware cho auth, RBAC, validation, error handling
- `src/modules`: chia theo domain nghiệp vụ
  - `auth`: đăng ký/đăng nhập/đổi mật khẩu/lấy profile
  - `user`: quản lý người dùng (admin)
  - `category`: quản lý danh mục thu/chi
  - `transaction`: CRUD giao dịch thu/chi
  - `report`: dashboard, báo cáo tháng, top danh mục chi tiêu, export Excel
- `src/utils`: các helper dùng chung

## 3) Yêu cầu môi trường

- Node.js >= 18 (khuyến nghị dùng bản LTS)
- MongoDB Atlas

## 4) Cài đặt project

```bash
npm install
```

### Cài đặt thủ công các thư viện đang sử dụng

```bash
npm install express mongoose jsonwebtoken bcrypt joi dotenv cors morgan exceljs
npm install -D nodemon
```

## 5) Cấu hình biến môi trường

Tạo file `.env` từ `.env.example`:

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

## 6) Chạy ứng dụng

### Chạy môi trường development

```bash
npm run dev
```

### Chạy môi trường production

```bash
npm start
```

Server sẽ chạy tại:

- `http://localhost:<PORT>` (mặc định `5000` nếu chưa set `PORT`)

## 7) Các nhóm API chính

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PATCH /auth/change-password`
- `GET /users` (admin)
- `GET /users/:id` (admin)
- `POST /users` (admin)
- `PATCH /users/:id` (admin)
- `DELETE /users/:id` (admin)
- `DELETE /users` (admin)
- `PATCH /users/:id/lock` (admin)
- `PATCH /users/:id/unlock` (admin)
- `POST /categories`
- `GET /categories`
- `PATCH /categories/:id`
- `DELETE /categories/:id`
- `GET /transactions`
- `POST /transactions`
- `PATCH /transactions/:id`
- `DELETE /transactions/:id`
- `GET /reports/dashboard`
- `GET /reports/monthly`
- `GET /reports/top-expense-categories`
- `GET /reports/export-excel`

> Hầu hết endpoint (trừ register/login) yêu cầu JWT token trong header `Authorization: Bearer <token>`.

## 8) Scripts npm

- `npm run dev`: chạy server với nodemon
- `npm start`: chạy server bằng node
