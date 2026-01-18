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

// ✅ Import certificate images
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
            <span>⬤</span> How did I start learning programming?
          </h3>
          <p className="text-slate-800/90 text-pretty">
            I’ve always been fascinated by how systems, software, and security layers actually work — from low-level instructions to complex defense mechanisms.
            That curiosity gradually led me to Reverse Engineering and Security Research: analyzing software from the inside, uncovering hidden weaknesses, and finding practical, efficient solutions.
          </p>

          <h3 className="mb-2 text-xl mt-6">
            <span>⬤</span> What is this website for? 🍜
          </h3>
          <Img
            className="drag-none size-40 sm:size-44 md:size-48 lg:size-60 float-right mb-1 ml-2 select-none rounded-md border-4 border-pink-600/50 bg-neutral-800"
            alt="img"
            src={ChillImg}
          />
          <p className="text-slate-800/90 text-pretty">
            This website is where I document my learning journey and hands-on practice in programming, data structures and algorithms, Reverse Engineering, and Security Research, as well as system analysis and data visualization.
            <br /><br />
            Everything here is simply a collection of personal notes along my path — nothing more.
            If you share similar interests, feel free to connect. If not, you’re still welcome to take a look and move on.
          </p>
        </div>

        {/* ==== Right Side ==== */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <div className="md:pl-12 lg:pl-20 flex flex-col gap-6">
            {/* Work */}
            <div className="p-5 glass-card shadow-lg">
              <div className="flex gap-3 items-center mb-6">
                <div className="bg-pink-100 text-pink-600 size-10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <p className="text-xl font-bold">Work</p>
              </div>
              <div className="flex gap-4 items-center p-3 rounded-xl bg-white/30">
                <div className="size-12 rounded-full bg-slate-800 text-slate-100 text-lg flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faEarthAsia} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold">Developer</h5>
                  <div className="flex justify-between text-xs text-slate-600">
                    <p>Dottie Community</p>
                    <p>2021 - now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="p-5 glass-card shadow-lg">
              <div className="flex gap-3 items-center mb-6">
                <div className="bg-blue-100 text-blue-600 size-10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <p className="text-xl font-bold">Education</p>
              </div>
              <div className="flex gap-4 items-center p-3 rounded-xl bg-white/30">
                <div className="size-12 rounded-full bg-slate-800 text-slate-100 text-lg flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faSchool} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold">THPT Tam Dương</h5>
                  <div className="flex justify-between text-xs text-slate-600">
                    <p>Student</p>
                    <p>2024 - 2027</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="https://thpttamduong.vinhphuc.edu.vn/home/thpttamduong.html?qi=83_86202472"
                  className="w-full py-3 flex text-sm hover:bg-slate-700 items-center gap-2 justify-center text-slate-100 bg-slate-800 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <FontAwesomeIcon icon={faFaceGrinBeamSweat} />
                  <span>Explore School Website</span>
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-5 glass-card shadow-lg overflow-hidden">
              <p className="text-xl font-bold text-neutral-700 mb-6">
                Gallery / <span className="text-pink-600">{activeCert}</span>
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

      {/* ===== Preview Modal ===== */}
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
