import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import {
  MdLocationOn,
  MdOutlinePrivacyTip,
  MdOutlineContactSupport,
} from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 py-10 border-t shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
        {/* Cột 1: Logo và thông tin */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
            <MdLocationOn className="text-red-500" /> Janner JEWELRY
          </h2>
          <p className="mt-2 text-gray-700">© 2025 JANNER</p>
          <p className="text-sm">
            Số 3, Tân Hưng Thuận, Quận 12, TP. Hồ Chí Minh, Việt Nam
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a
              href="#"
              className="text-blue-600 text-2xl transition-transform transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-pink-600 text-2xl transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-black text-2xl transition-transform transform hover:scale-110"
            >
              <FaTiktok />
            </a>
          </div>
          <img
            src="/images/dmca-protected.webp"
            alt="DMCA"
            className="mt-4 w-36 mx-auto md:mx-0 rounded-lg shadow-md"
          />
        </div>

        {/* Cột 2: Chính sách & hỗ trợ */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MdOutlinePrivacyTip className="text-blue-500" /> Về chúng tôi
          </h3>
          <ul className="space-y-2 mt-2">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                📜 Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                🔒 Chính sách bảo mật
              </a>
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mt-4 flex items-center gap-2">
            <RiExchangeDollarLine className="text-green-500" /> Hỗ trợ khách
            hàng
          </h3>
          <ul className="space-y-2 mt-2">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                🔄 Chính sách đổi/trả
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                🛡️ Chính sách bảo hành
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MdOutlineContactSupport className="text-orange-500" /> Dịch vụ
            khách hàng
          </h3>
          <p className="text-sm">
            📞 Mua hàng online:{" "}
            <strong className="text-blue-600">0948.286.424</strong>
          </p>
          <p className="text-sm">
            📩 Góp ý khiếu nại:{" "}
            <strong className="text-blue-600">081.232.1738</strong>
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-4">
            ⭐ Đối tác chính
          </h3>
          <p className="text-sm">Cung cấp bởi Janner Handmade</p>
        </div>

        {/* Cột 4: Google Map */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🌍 Địa chỉ cửa hàng
          </h3>
          <div className="mt-4 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              className="w-full h-40"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6107742044196!2d106.62610147461705!3d10.841742189306107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752930aa0f7e65%3A0x23b2d158aecd9f9f!2sQTSC%209%20Building!5e0!3m2!1sen!2s!4v1707654321000!5m2!1sen!2s"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
}
