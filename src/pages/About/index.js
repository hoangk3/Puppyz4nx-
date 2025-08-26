import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrinBeamSweat,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faEarthAsia,
  faUserGraduate,
  faSchool,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-cards";

import ChillImg from "../../assets/imgs/images.jpg";
import Img from "../../components/img";

// ✅ Import ảnh chứng chỉ
import Cert1 from "../../assets/gallery/images1.jpg";
import Cert2 from "../../assets/gallery/images2.jpg";
import Cert3 from "../../assets/gallery/images3.jpg";
import Cert4 from "../../assets/gallery/images4.jpg";

function About() {
  useEffect(() => {
    document.title = "Puppyz - 📚";
  }, []);

  const [preview, setPreview] = useState(null);
  const [activeCert, setActiveCert] = useState(null);

  // ✅ Có cả tên chứng chỉ
  const certImages = [
    { src: Cert1, name: "Images 1" },
    { src: Cert2, name: "Images 2" },
    { src: Cert3, name: "Images 3" },
    { src: Cert4, name: "Images 4" },
  ];

  return (
    <div className="font-bold text-neutral-800 w-full pb-12">
      {/* ===== Title ===== */}
      <div className="mb-6 flex text-3xl gap-2 font-bold">
        <div className="bg-neutral-800 h-[36px] w-2"></div>
        <h2>About 💤</h2>
      </div>

      {/* ===== Grid Layout ===== */}
      <div className="mt-4 font-semibold md:grid grid-cols-2 gap-x-10">
        {/* ==== Left Side ==== */}
        <div>
          <h3 className="mb-2 text-xl mt-6">
            <span>⬤</span> Tôi học lập trình như thế nào? 🤔
          </h3>
          <p className="text-slate-800/90 text-pretty">
             Tôi luôn tò mò về cách các trang web, phần mềm và hệ thống bảo mật vận hành – từ những nguyên tắc cơ bản trong lập trình đến các cơ chế bảo mật nâng cao. 
             Chính vì vậy, mình đã theo đuổi Reverse Engineering & Security Research, khám phá cách phần mềm hoạt động từ bên trong, phân tích lỗ hổng và tìm ra những giải pháp tối ưu.
          </p>

          <h3 className="mb-2 text-xl mt-6">
            <span>⬤</span> Trang web này để làm gì? 🍜
          </h3>
          <Img
            className="drag-none size-40 sm:size-44 md:size-48 lg:size-60 float-right mb-1 ml-2 select-none rounded-md border-4 border-pink-600/50 bg-neutral-800"
            alt="img"
            src={ChillImg}
          />
          <p className="text-slate-800/90 text-pretty">
            Đây là trang cá nhân nơi mình chia sẻ về hành trình, kỹ năng và những dự án đã thực hiện trong lĩnh vực Reverse Engineering & Security Research, cũng như Data Analysis & Visualization. Tại đây, bạn có thể tìm hiểu về kinh nghiệm, chuyên môn của mình, cũng như cách mình tiếp cận và giải quyết các vấn đề kỹ thuật.
             Ngoài việc giới thiệu bản thân, mình cũng mong muốn tạo ra một không gian để kết nối, trao đổi ý tưởng và học hỏi từ cộng đồng. Nếu bạn quan tâm đến các chủ đề liên quan hoặc tìm kiếm cơ hội hợp tác, đừng ngần ngại liên hệ! 🚀
          </p>
        </div>

        {/* ==== Right Side ==== */}
        <div>
          <div className="md:pl-12 lg:pl-20 flex flex-col gap-4">
            {/* Work */}
            <div className="p-4 rounded-lg border-[2px] bg-slate-100 border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex gap-3 items-center">
                <div className="text-slate-700">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <p>Work</p>
              </div>
              <div className="flex mt-6 gap-3 items-center">
                <div className="size-10 rounded-full bg-slate-800 text-slate-100 text-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faEarthAsia} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm">Developer</h5>
                  <div className="flex justify-between text-xs text-slate-700">
                    <p>Dottie Community</p>
                    <p>2021 - now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="p-4 rounded-lg border-[2px] bg-slate-100 border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex gap-3 items-center">
                <div className="text-slate-700">
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <p>Education</p>
              </div>
              <div className="flex mt-6 gap-3 items-center">
                <div className="size-10 rounded-full bg-slate-800 text-slate-100 text-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faSchool} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm">THPT Tam Dương</h5>
                  <div className="flex justify-between text-xs text-slate-700">
                    <p>Normal student</p>
                    <p>2024 - 2027</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="https://thpttamduong.vinhphuc.edu.vn/home/thpttamduong.html?qi=83_86202472"
                  className="w-full py-2 flex text-sm hover:bg-slate-700 items-center gap-2 justify-center text-slate-100 bg-slate-800 rounded-lg transition"
                >
                  <FontAwesomeIcon icon={faFaceGrinBeamSweat} />
                  <span>Web trường</span>
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-4 rounded-lg border-[2px] bg-slate-100 border-slate-200 shadow-sm hover:shadow-md transition">
              <p className="text-lg font-bold text-neutral-700 mb-4">
                Images /{" "}
                <span className="text-pink-600">{activeCert}</span>
              </p>
              <Swiper
                effect={"cards"}
                grabCursor={true}
                initialSlide={Math.floor(certImages.length / 2)}
                modules={[EffectCards]}
                className="max-w-[320px] md:max-w-[360px]"
                onSlideChange={(swiper) =>
                  setActiveCert(certImages[swiper.activeIndex].name)
                }
                onInit={(swiper) =>
                  setActiveCert(certImages[swiper.activeIndex].name)
                }
              >
                {certImages.map((cert, i) => (
                  <SwiperSlide
                    key={i}
                    className="rounded-lg cursor-pointer flex flex-col items-center justify-center bg-transparent"
                    onClick={() => setPreview(cert)}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      src={cert.src}
                      alt={cert.name}
                      className="w-full h-[260px] object-cover object-center rounded-xl shadow-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Preview Modal with Animation ===== */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-3 text-white text-3xl hover:rotate-90 transition-transform"
                onClick={() => setPreview(null)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <p className="text-lg font-bold text-white mb-4 text-center">
                Certifications /{" "}
                <span className="text-pink-400">{preview.name}</span>
              </p>

              <img
                src={preview.src}
                alt={preview.name}
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default About;
