# Kong Mod — website + trang quản trị

Cập nhật độ sáng 02/11/2026: trang công khai mặc định dùng nền sáng dịu xanh băng, thẻ trắng và ánh hồng nhẹ. Chế độ tối cũng được nâng sáng sang xanh xám. Nếu trước đây bạn đã chủ động lưu chế độ tối, bấm nút ◐ để chuyển sáng; lựa chọn cá nhân vẫn được ghi nhớ.

Cập nhật giao diện 02/11/2026: nền slate đen pha xanh/rose, lớp chấm mờ, chữ ánh bạc, viền avatar và chuyển động nhẹ. Nút ✦ cạnh nút sáng/tối bật hoặc tắt chuyển động và ghi nhớ trên thiết bị. Tự giảm chuyển động theo hệ thống; dừng animation khi tab ẩn.

Gói này dành cho việc upload toàn bộ file rời bằng iPhone. Nếu web đang chạy bản cũ chỉ có index.html, hãy upload toàn bộ các file của gói này vào cùng chỗ với index.html. Giữ cấu hình riêng nếu bạn đã thiết lập Supabase.

Bản giao ngày 02/11/2026. Dành cho GitHub Pages, dùng được ở `username.github.io/ten-repo/`. Không cần build, không cần cài Node để đưa web lên mạng. Bản file rời cập nhật ngày 02/11/2026.

**Trang công khai chạy ngay bằng dữ liệu web cũ. Đăng nhập admin và lưu thay đổi giữa các thiết bị cần cấu hình Supabase một lần. GitHub Pages không tự cung cấp máy chủ đăng nhập hoặc cơ sở dữ liệu.** Gói này có đầy đủ mã giao diện, API client và SQL phân quyền; chưa có dự án Supabase hay tài khoản thật của bạn.

## Có gì trong bản này?

Giữ nội dung riêng của Kong: 11 bản tải, 11 link lấy key, 1 file mod, 2 hướng dẫn, shop key, TikTok và 2 Discord. Giữ iOS V7, Adr V8 và các URL bạn đã gửi. Không lấy danh sách game hoặc số lượt tải từ website tham khảo. Ngày cập nhật bản tải được giữ theo file cũ; ngày của key/file/hướng dẫn là mốc chuyển dữ liệu 28/10/2026. Sự kiện key 24/10 đã hết hạn không được bật lại.

Thiết kế tham khảo cách chia mục và thẻ preview của Thần Đèn AOV, sử dụng nhận diện Kong Mod, nền tối tím/mint và chế độ sáng. Bố cục thích nghi điện thoại/laptop. Video không tự phát, hỗ trợ giảm chuyển động.

Admin có thêm/sửa/xóa bản tải, key, file mod, hướng dẫn; đổi thumbnail; nhiều ảnh/video preview; bật/tắt preview theo từng mục và toàn web; xem trước trước khi lưu. Không có mật khẩu mặc định trong mã nguồn.

**10 tính năng bổ sung đã làm:**

1. Tìm kiếm tiếng Việt có/không dấu, lọc nền tảng và loại nội dung.
2. Ghim mục nổi bật, tùy chỉnh thứ tự bằng số, sắp theo mới cập nhật.
3. Lưu nháp, ẩn hoặc xuất bản từng mục.
4. Hẹn giờ xuất bản và tự ẩn theo giờ Việt Nam.
5. Trạng thái sẵn sàng/bảo trì/tạm ngưng cho từng mục và bảo trì toàn web.
6. Nhân bản mục thành bản nháp để tạo phiên bản mới nhanh.
7. Thùng rác và khôi phục, không xóa vĩnh viễn qua giao diện.
8. Thông báo có lịch và sự kiện tặng key có nhóm, sao chép từng key, tự hết hạn.
9. Xuất/nhập JSON có kiểm tra và xác nhận; nhập gộp nguyên tử ở máy chủ.
10. Nhật ký thay đổi từ máy chủ, xem dữ liệu trước/sau và khôi phục phiên bản trước.

Ngoài ra có lưu yêu thích trên thiết bị, sửa thương hiệu/liên kết cộng đồng, xuất seed công khai và kiểm tra xung đột khi hai nơi cùng sửa.

## 1. Upload trên iPhone — toàn bộ là file rời

Bản này đã bỏ các thư mục assets, supabase và tests. Ảnh, SQL và mã nguồn nằm ngang hàng với index.html. Không cần tạo thư mục xanh trên GitHub.

1. Tải ZIP mới, vào Tệp rồi chạm ZIP để giải nén. Mở thư mục được tạo sau giải nén; bên trong chỉ có các file rời.
2. Mở repository web cũ của bạn bằng Safari. Giữ repository và tên miền đang dùng.
3. Chọn Add file → Upload files → Choose your files. Trong Tệp, mở bản vừa giải nén và chọn tất cả file bên trong (có thể chọn nhiều file). Không chọn nguyên ZIP hoặc thư mục chứa chúng.
4. Upload cùng cấp với index.html cũ rồi Commit changes. index.html mới thay index.html cũ. Giữ nguyên tên và đuôi file. Nếu đã cấu hình Supabase trước đó, giữ giá trị config.js riêng của bạn.
5. Đợi Pages cập nhật rồi mở lại link web đang có. Nếu còn trang cũ, tải lại hoặc mở tab riêng tư.
6. Nếu chưa bật Pages: Settings → Pages → Deploy from a branch → main → /(root) → Save.

Tất cả file trong gói có thể được upload cùng một lượt. File .nojekyll có thể bị ứng dụng Tệp ẩn; không chọn được cũng không ảnh hưởng vì web không dùng đường dẫn bắt đầu bằng dấu gạch dưới.

Trang công khai chạy ngay từ seed.json. Phần admin cần cấu hình Supabase bên dưới. Chỉ upload SQL lên GitHub không tự tạo database.

Có thể dùng hosting riêng: đưa các file ngang hàng vào thư mục website mà hosting chỉ định, thường là public_html. Hosting phải phục vụ được HTML/CSS/JS/JSON qua HTTPS và đặt index.html làm trang mặc định. Tên miền chỉ là địa chỉ; GitHub Pages cũng hỗ trợ gắn tên miền bạn sở hữu. Cấu hình DNS cụ thể phụ thuộc dịch vụ bạn đang dùng.

## 2. Bật đăng nhập và lưu dữ liệu thật bằng Supabase

Bạn tự tạo tài khoản/dự án bằng tài khoản của bạn; mã nguồn không phụ thuộc tài khoản của người viết.

1. Mở [Supabase Dashboard](https://supabase.com/dashboard), tạo project mới. Lưu mật khẩu database riêng, **không điền mật khẩu database vào website**.
2. Trong project → **SQL Editor → New query**, dán toàn bộ `setup.sql`, nhấn Run. Script tạo bảng, RLS, danh sách admin riêng, hàm nhập dữ liệu và nhật ký. Chạy lại không làm mất nội dung đang có.
3. **Authentication → Users → Add user → Create new user**. Tự chọn email/mật khẩu mạnh. Khi tạo thủ công, bật Auto Confirm User nếu dashboard có lựa chọn này.
4. Mở `grant-admin.sql`, thay `EMAIL_ADMIN` bằng đúng email vừa tạo, rồi chạy trong SQL Editor. Dòng SELECT cuối phải trả về tài khoản của bạn. Không cấp quyền admin dựa vào thông tin tự khai của người đăng ký.
5. Trong **Authentication → Sign In / Providers → Email**, tắt cho người mới đăng ký nếu không cần. Kể cả tài khoản Auth khác được tạo, họ vẫn không có quyền sửa khi chưa nằm trong `kong_private.admins`.
6. Lấy **Project URL** trong Connect hoặc Project Settings và **Publishable key** trong Settings → API Keys. Legacy `anon` key cũng được hỗ trợ. Chỉ dùng URL dạng `https://xxx.supabase.co`.
7. Mở `config.js` trên GitHub → Edit, điền hai giá trị, Commit:

```js
export const CONFIG = Object.freeze({
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  publishableKey: 'sb_publishable_...'
});
```

**Tuyệt đối không dùng `sb_secret_...`, `service_role`, mật khẩu admin hoặc mật khẩu database trong config.js.** Publishable/anon key được thiết kế để xuất hiện ở trình duyệt; quyền ghi được máy chủ kiểm tra bằng Auth + RLS.

8. Khi Pages cập nhật, mở `admin.html`, đăng nhập email/mật khẩu vừa tạo.
9. Vào **Sao lưu & khôi phục → Nạp nội dung web cũ**, đọc xác nhận rồi nhập. Đây là bước chuyển 25 mục và cấu hình lên Supabase. Trước bước này, backend mới chỉ có cấu hình rỗng.
10. Mở trang công khai bằng tab khác. Từ nay thay link/thêm bản/bật preview trong admin là đủ; không phải commit lại mỗi lần. Trang công khai tải dữ liệu máy chủ và kiểm tra lịch định kỳ khi đang mở.

Bạn chỉ phải upload lại GitHub khi sửa code hoặc config, không phải khi chỉnh nội dung trong admin.

## 3. Cách dùng nhanh

### Thêm bản hack / mod mới

Admin → Bản tải → Thêm mục. Điền tên, iOS/Android, link tải HTTPS, ảnh đại diện. Chọn Sẵn sàng, bật Xuất bản, Lưu. Không bật Xuất bản thì mục là nháp. Thêm link lấy key ở mục Link lấy key theo cách tương tự.

### Preview

Sửa mục → Preview → Thêm ảnh/video → điền link HTTPS. Ảnh dùng URL ảnh trực tiếp, video dùng URL MP4/WebM trực tiếp (hosting phải cho phép phát). TikTok/YouTube dùng loại Hướng dẫn để mở trang ngoài, không điền làm URL video trực tiếp. Tối đa 8 media. Bật preview mục; công tắc toàn web trong Giao diện cũng phải bật. Nút Preview chỉ xuất hiện khi có media. Xem trước trong editor để kiểm tra rồi Lưu.

### Bảo trì và xóa

Chọn Đang cập nhật/Tạm ngưng và nhập lời nhắn: người dùng thấy thẻ nhưng không bấm tải được. Bảo trì toàn web ẩn kho trên giao diện, không phải khóa quyền truy cập các URL đã được người khác biết. Nút Xóa chuyển mục vào Thùng rác, có thể khôi phục. Khôi phục giữ lịch và trạng thái xuất bản cũ.

### Hẹn giờ

Mọi ô ngày giờ trong admin được hiểu là **giờ Việt Nam (UTC+7)**, kể cả khi điện thoại của bạn ở múi giờ khác. Giờ bắt đầu được tính bao gồm; đúng giờ kết thúc thì mục tự ẩn. Phải bật Xuất bản. Máy chủ cũng lọc các bản nháp/chưa đến lịch/hết hạn khỏi API công khai. Tab đang mở kiểm tra lại khoảng 30 giây, trở lại tab cũng làm mới.

### Tặng key

Giao diện & sự kiện → bật sự kiện → nhập ngày bắt đầu/kết thúc → thêm nhóm. Mỗi dòng một key. Ví dụ tên nhóm “iOS V7”, “Adr V8”. Lưu. Dữ liệu key là **nội dung công khai**, phù hợp event phát miễn phí; không phải kho mã trả phí hay mã chỉ dùng một lần. Sao chép key không tự đánh dấu đã dùng và không đảm bảo key còn hiệu lực.

### Sao lưu / chuyển sang project khác

Xuất JSON trước khi thay nhiều mục. File gồm nháp, thùng rác và cài đặt, không chứa tài khoản/mật khẩu/cấu hình kết nối. Nhập gộp cập nhật theo ID, thêm ID mới, giữ mục ngoài file; toàn bộ cài đặt được thay theo bản sao lưu. Cần xác nhận, có đếm mục mới/mục trùng. Nếu một mục lỗi, máy chủ hủy toàn bộ lần nhập. Nhật ký không nằm trong bản JSON và vẫn thuộc database cũ.

**Xuất seed công khai** tạo file seed.json chỉ gồm mục đang hiển thị. Dùng nếu muốn phát hành bản chỉ đọc chưa kết nối Supabase. Khi đã cấu hình Supabase mà server lỗi, website báo lỗi và không lôi nội dung cũ từ seed lên để tránh hiện lại link đã gỡ.

### Khôi phục lần sửa nhầm

Nhật ký → Chi tiết → Khôi phục bản trước. Đọc xác nhận: thao tác thay toàn bộ nội dung mục/cài đặt về bản trước mốc đó. Mỗi lần khôi phục lại tạo nhật ký mới. Lịch sử xem 100 thay đổi gần nhất; bản ghi cũ hơn vẫn ở database. Cần tự quản lý dung lượng theo dự án của bạn.

## 4. Quyền truy cập và giới hạn thực tế

- GitHub Pages là frontend tĩnh. Supabase xử lý Auth/Postgres và phân quyền ghi thực.
- Không giấu mật khẩu trong HTML, không dùng localStorage để giả lập quyền admin. Phiên đăng nhập nằm trong sessionStorage của tab; không lưu mật khẩu.
- RLS chỉ cho tài khoản trong bảng admin riêng ghi dữ liệu; không ai tự thêm mình vào bảng này qua API công khai. API công khai không đọc được nháp, mục xóa hoặc nhật ký. Những người đang cầm phiên admin hợp lệ có quyền sửa toàn web.
- Mật khẩu/khôi phục tài khoản/cấu hình bảo mật Auth quản lý tại Supabase Dashboard. Giao diện không cung cấp đăng ký hay đổi mật khẩu công khai.
- HTTPS bắt buộc cho URL ngoài. Nội dung hiển thị bằng text/HTML escaping; không cho nhúng HTML tùy ý, iframe hoặc script vào preview.
- Sửa nội dung/cài đặt có revision chống ghi đè khi cùng sửa. Nhập sao lưu là thao tác thay thế có xác nhận nên cố ý cập nhật mục trùng ID.
- Không có số lượt tải giả. Các số trên trang là số mục thực đang hiển thị; không đo lượt tải file trên MediaFire/ipas.
- Favorite và theme chỉ lưu trên trình duyệt hiện tại; nội dung admin dùng chung trên Supabase.
- Ảnh thumbnail cũ được giữ: một số dùng link hosting ảnh ngoài, có ảnh fallback nội bộ nếu ảnh lỗi. Link tải/get key mở sang bên cung cấp, không xác minh nội dung file APK/IPA, độ an toàn, key, trạng thái tải hoặc chính sách của game.
- Không cần quyền truy cập GitHub của bạn trong admin. Không đặt GitHub token hay secret vào repository.
- Dự án Supabase chưa được tạo/kết nối trong lần bàn giao này, nên chưa thể xác minh đăng nhập trên tài khoản thật hoặc lưu từ xa trong môi trường của bạn. Có kiểm thử logic, API client giả lập, quyền Postgres trong môi trường kiểm thử và giao diện trình duyệt; xem TEST-RESULTS.md.

## 5. Cấu trúc & kiểm thử

- `index.html`, `public.js`, `styles.css`: trang công khai.
- `admin.html`, `admin.js`, `admin.css`: quản trị.
- `config.js`, `api.js`: cấu hình công khai, REST/Auth client.
- `core.js`, `ui.js`: xác thực dữ liệu, lọc/lịch, component dùng chung.
- `seed.json`, `34dc08b18871.jpeg`, `fallback.svg`: nội dung và ảnh, tất cả nằm ở gốc.
- `setup.sql`, `grant-admin.sql`: backend và cấp quyền ban đầu.
- `core.test.mjs`, `api.test.mjs`, `database.mjs`, `package.json`: kiểm thử logic/API client; chạy `npm test` nếu có Node 22+. Để kiểm thử SQL và quyền bằng Postgres nhúng: `npm install` rồi `npm run test:database` (PGlite chỉ là dependency phục vụ kiểm thử, không được tải bởi website).

Không cần chạy npm install để dùng hoặc deploy website. Bản phát hành không chứa mock backend, tài khoản test hoặc token thật.

Nguồn kỹ thuật chính thức:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/database/functions
- https://supabase.com/docs/guides/auth/passwords
