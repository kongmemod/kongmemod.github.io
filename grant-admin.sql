-- 1. Authentication → Users → Add user → Create new user.
-- 2. Chọn email riêng + mật khẩu mạnh; bật Auto Confirm User khi tạo thủ công.
-- 3. Thay EMAIL_ADMIN bằng đúng email vừa tạo; chạy trong SQL Editor.
insert into kong_private.admins(user_id)
select id from auth.users where lower(email)=lower('EMAIL_ADMIN')
on conflict do nothing;
-- Kết quả phải có đúng tài khoản của bạn:
select u.id,u.email from kong_private.admins a join auth.users u on u.id=a.user_id;
-- Thu hồi nếu cần (chỉ chạy riêng khi bạn muốn):
-- delete from kong_private.admins where user_id='UUID_TAI_KHOAN';
