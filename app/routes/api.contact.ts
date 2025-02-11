import { json, ActionFunction } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Kiểm tra dữ liệu hợp lệ
    if (!name || !email || !message) {
      return json(
        { success: false, message: "Vui lòng nhập đầy đủ thông tin!" },
        { status: 400 }
      );
    }

    // 👉 Giả lập gửi email hoặc lưu vào database
    console.log("📩 Tin nhắn nhận được:", { name, email, message });

    return json({
      success: true,
      message: "Tin nhắn của bạn đã được gửi thành công!",
    });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý form:", error);
    return json(
      { success: false, message: "Có lỗi xảy ra, vui lòng thử lại!" },
      { status: 500 }
    );
  }
};
