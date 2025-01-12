export default function Contact() {
  return (
    <>
      <main className="container mx-auto py-8 px-4">
        {/* <!-- Section: Đôi nét về chúng tôi --> */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Đôi nét về chúng tôi
          </h2>
          <p className="text-lg leading-relaxed">
            Tại <strong>Lumos Accessories</strong>, chúng tôi không chỉ mang đến
            các sản phẩm phụ kiện thủ công mà còn gửi gắm câu chuyện đầy cảm
            hứng trong từng món đồ. Với cam kết sử dụng vật liệu tái chế và thân
            thiện với môi trường, mỗi sản phẩm đều mang giá trị bền vững và độc
            đáo.
          </p>
          <img
            src="path-to-image-1.jpg"
            alt="Phụ kiện handmade"
            className="mt-6 rounded shadow-lg mx-auto"
          />
        </section>

        {/* <!-- Section: Tầm nhìn & Giá trị thương hiệu --> */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Tầm nhìn & Giá trị thương hiệu
          </h2>
          <p className="text-lg leading-relaxed">
            Lumos Accessories hướng tới trở thành thương hiệu hàng đầu trong
            lĩnh vực phụ kiện thủ công, mang lại nguồn cảm hứng, sự tự tin và
            niềm vui cho khách hàng. Chúng tôi không ngừng sáng tạo, tái sử dụng
            nguyên liệu cũ để mang đến những sản phẩm mang đậm dấu ấn cá nhân,
            bền vững và tinh tế.
          </p>
          <img
            src="path-to-image-2.jpg"
            alt="Tầm nhìn thương hiệu"
            className="mt-6 rounded shadow-lg mx-auto"
          />
        </section>

        {/* <!-- Section: Giá trị cốt lõi --> */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Giá trị cốt lõi
          </h2>
          <p className="text-lg leading-relaxed">
            Tại <strong>Lumos Accessories</strong>, mỗi sản phẩm đều truyền tải
            thông điệp đặc biệt:{" "}
            <strong>PHỤ KIỆN HANDMADE – KHÁC BIỆT TRONG TỪNG CHI TIẾT.</strong>
            <br />
            Khách hàng khi sở hữu sản phẩm sẽ không chỉ nhận được một món đồ mà
            còn cảm nhận được tâm huyết, câu chuyện và sự sáng tạo mà chúng tôi
            đặt vào từng sản phẩm.
          </p>
          <img
            src="path-to-image-3.jpg"
            alt="Giá trị thương hiệu"
            className="mt-6 rounded shadow-lg mx-auto"
          />
        </section>
      </main>
    </>
  );
}
