# Kiểm tra bản giao — 02/11/2026

## Tự động

- 16/16 kiểm thử logic và API client đạt: nội dung chuyển đổi, số mục, URL, lọc tiếng Việt/nền tảng, yêu thích, lịch đúng mốc, UTC+7, chặn URL nguy hiểm, escape HTML, cấu trúc sao lưu, kiểm tra quyền sau login, gắn token đúng chỗ, refresh phiên, xử lý 401, xung đột revision, RPC nhập dữ liệu.
- 12/12 kiểm tra bằng Postgres nhúng PGlite 0.5.14 đạt, chạy chính `setup.sql`: script chạy lại được; anon không đọc allowlist/ghi/nhập; authenticated chưa được cấp quyền không ghi hoặc đọc audit; admin nhập 25 mục; revision/audit từ trigger; nhập lỗi rollback toàn bộ; công khai không thấy nháp/thùng rác/chưa đến lịch/hết hạn; admin xem/khôi phục; không hard-delete hoặc giả audit; cập nhật revision cũ không tác động.
- Các module JavaScript qua kiểm tra cú pháp.

Lệnh chạy lại:

```sh
npm test
npm install
npm run test:database
```

PGlite là môi trường Postgres kiểm thử. Script chuẩn bị hai role `anon`, `authenticated` và mô phỏng `auth.uid()` qua request claims. Đây không phải xác minh cấu hình Auth/Gateway trong project Supabase thật của bạn.

## Trình duyệt

Đã thử bằng Chrome và khung hiển thị rộng 390 px, không phải thiết bị iPhone/Safari vật lý:

- Trang công khai tải đúng 11 bản tải / 11 key; tách iOS/Android; lọc, tìm kiếm và điều hướng loại nội dung.
- Bố cục desktop không tràn ngang. Form admin ở 390 px có body và dialog cùng rộng 390 px; nút Lưu ở chân bảng trượt.
- Luồng admin dùng **transport giả lập trong fixture QA riêng**, chạy cùng mã giao diện và API client: thêm mục có ảnh preview, xem trước và lưu; tìm lại; mở preview từ trang công khai; sửa tên và chuyển bảo trì; xóa vào thùng rác; khôi phục; nhân bản có tên mới, ID mới và mặc định nháp.
- Lưu cấu hình: tắt preview toàn web; tạo nhóm key event; mở event ở trang công khai và sao chép một key thành công.
- Xem nhật ký trước/sau.
- Xuất JSON bằng nút tải xuống thật, chọn lại file trong file chooser và xác nhận nhập gộp (26 mục kiểm thử).
- Dữ liệu fixture và mã mock **không có trong ZIP phát hành**. Seed giao người dùng vẫn là 25 mục từ web cũ, không có “QA bản thử”.

## Giới hạn xác minh

Chưa tạo/kết nối Supabase của chủ web; chưa đăng nhập hoặc thực hiện giao dịch ghi trên tài khoản thật. Sau khi cấu hình theo README, chủ web cần kiểm tra: đăng nhập, nạp nội dung cũ, sửa thử một mục, mở trang từ thiết bị khác, và thử tài khoản không có quyền.

Không tải hay chạy APK/IPA, không xác minh chất lượng bản mod, key hoặc tình trạng dịch vụ tải ngoài. Ảnh/video bên ngoài phụ thuộc hosting và định dạng do admin nhập.

## Cập nhật nền & chuyển động — 02/11/2026

Thay đổi giới hạn ở trang công khai: nền slate đen pha xanh/rose, chấm mờ, ánh bạc, viền avatar, hover/chạm và nút hiệu ứng. Đã kiểm tra bằng trình duyệt ở khung rộng 390 px (vùng nội dung 375 px khi hiện scrollbar): body không tràn ngang; vẫn có 11 bản tải, lọc iOS còn 6 mục và link V7 giữ nguyên. Nút hiệu ứng tắt được animation nền/viền avatar, ghi nhớ qua tải lại; chế độ sáng hiển thị nền sáng và chữ tối. CSS giảm chuyển động và tạm dừng khi tab ẩn được khai báo riêng. Không chạy lại kiểm tra Postgres vì SQL và mã admin không thay đổi.

## Tăng độ sáng — 02/11/2026

Trang công khai mặc định dùng nền xanh băng sáng, thẻ trắng và chữ xanh đậm; vẫn giữ lựa chọn sáng/tối người dùng đã lưu. Chế độ tối cũng tăng độ sáng sang nền xanh xám. Kiểm tra trình duyệt: màu nền sáng rgb(232,239,248), chữ rgb(31,48,75); body/viewport cùng 375 px khi có thanh cuộn; 6 bản tải iOS hiển thị đúng. Hàm khởi tạo theme nhận tùy chọn mặc định, admin tiếp tục dùng mặc định dark như trước.

## Bản file rời cho iPhone — 02/11/2026

Đã chuyển ảnh, SQL và mã kiểm thử ra cùng cấp index.html. Chạy lại 16 kiểm thử logic/API client và 12 kiểm tra Postgres: tất cả đạt. Kiểm tra trình duyệt ở chiều rộng 390 px: 5 bản Android, ảnh nội bộ ./34dc08b18871.jpeg tải thành công, Adr V8 giữ đúng link MediaFire; không tràn ngang. Kiểm tra toàn bộ đường dẫn HTML/module/ảnh seed và xác nhận ZIP không có mục thư mục. Chưa cấu hình Supabase thật của chủ web.
