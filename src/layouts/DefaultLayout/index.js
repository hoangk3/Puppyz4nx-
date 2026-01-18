import PropTypes from "prop-types";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import MusicPlayer from "../../components/MusicPlayer";
import background from "../../assets/imgs/dreamy_bg.png";

function DefaultLayout({ children }) {
  return (
    <div
      className="min-h-dvh overflow-hidden relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // giữ nền cố định khi scroll
        transition: "background-image 0.8s ease-in-out", // mượt khi đổi ảnh
      }}
    >
      {/* Overlay - Dreamy white effect */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      {/* Sakura Petals */}
      <div className="sakura-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="sakura"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Nội dung */}
      <div className="relative z-10 max-w-6xl mx-auto md:p-5 animate-fadeIn">
        <Header />
        <Navbar />
        <div className="flex p-5 md:rounded-xl bg-white/40 shadow-sm md:mt-3">
          {children}
        </div>
        <Footer />
      </div>

      {/* Global Music Player */}
      <MusicPlayer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
