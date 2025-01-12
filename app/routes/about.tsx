import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { json, LoaderFunction } from "@remix-run/node";

export let loader: LoaderFunction = async () => {
  return json({});
};

const About: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Include Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Section: Đôi nét về chúng tôi */}
        <section className="mb-12 flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Đôi nét về chúng tôi
            </h2>
            <p className="text-lg leading-relaxed text-justify">
              Khách hàng khi sở hữu sản phẩm của Yan Trang Sức sẽ không chỉ đơn
              giản là sở hữu giá trị cơ bản mà còn cảm nhận được câu chuyện mà
              sản phẩm mang lại. Chúng tôi luôn ưu tiên sử dụng vật liệu tái sử
              dụng, thân thiện với môi trường, mang màu sắc độc đáo và mới lạ
              trong mỗi sản phẩm.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-justify">
              Không chỉ là một cửa hàng trực tuyến, chúng tôi còn tạo ra trải
              nghiệm mua sắm trực quan và thú vị thông qua giao diện dễ sử dụng
              và hình ảnh chất lượng cao. Chúng tôi cam kết mang đến cho bạn
              trải nghiệm mua sắm trực tuyến tuyệt vời.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/images/path-to-image-1.jpg"
              alt="Phụ kiện handmade"
              className="rounded shadow-lg mx-auto hover:scale-105"
            />
          </div>
        </section>

        {/* Section: Tầm nhìn & Giá trị thương hiệu */}
        <section className="mb-12 flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2">
            <img
              src="/images/path-to-image-2.jpg"
              alt="Tầm nhìn thương hiệu"
              className="rounded shadow-lg mx-auto hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Tầm nhìn & Giá trị thương hiệu
            </h2>
            <p className="text-lg leading-relaxed text-justify">
              Chúng tôi hướng đến việc trở thành nhà sáng tạo hàng đầu với các
              sản phẩm phụ kiện thủ công độc đáo, truyền cảm hứng và đem lại
              niềm vui, sự tự tin cho khách hàng.
              <br />
              Mỗi sản phẩm của Yan Trang Sức đều mang một giá trị riêng, được
              thiết kế và tạo ra bằng cách tái sử dụng các vật liệu cũ, kết nối
              khách hàng với những câu chuyện đặc biệt qua từng món đồ.
            </p>
          </div>
        </section>

        {/* Section: Giá trị cốt lõi */}
        <section className="mb-12 flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center md:text-left">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg leading-relaxed text-justify">
              Các sản phẩm của Yan Trang Sức luôn tập trung truyền tải thông
              điệp chính:{" "}
              <strong>Sản phẩm Handmade – Độc đáo trong từng đường nét.</strong>
            </p>
            <p className="text-lg leading-relaxed mt-4 text-justify">
              Khách hàng khi sở hữu sản phẩm sẽ không chỉ đơn giản là sở hữu giá
              trị cơ bản mà còn cảm nhận được câu chuyện mà nó mang lại. Mỗi sản
              phẩm – một câu chuyện – mang chất riêng là những gì chúng tôi luôn
              nỗ lực đem đến cho bạn.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/images/path-to-image-3.jpg"
              alt="Giá trị thương hiệu"
              className="rounded shadow-lg mx-auto hover:scale-105"
            />
          </div>
        </section>
      </main>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default About;
