# TX Insight AI — bản sửa cho cổng 9898

## Quan trọng
Nếu bạn mở `public/index.html` qua một trình xem file/local file server (ví dụ URL có `/Local/...`), điều đó **không tự chạy API Node.js**. Để kết nối API, cần chạy server Node.js bên dưới.

## Chạy
1. Cài Node.js trên máy có thể chạy server.
2. Trong thư mục dự án, chạy `npm install`
3. Chạy `npm start`
4. Mở `http://localhost:9898`

Server phục vụ giao diện và endpoint `/api/lcmd5` cùng một origin, tránh gọi nhầm `localhost:3009`.
Nếu môi trường của bạn đã có web server riêng trên cổng 9898 thì không thể chỉ chép đè file HTML để tự tạo endpoint API; cần cấu hình proxy/backend hoặc chạy server này trên cổng khác.
