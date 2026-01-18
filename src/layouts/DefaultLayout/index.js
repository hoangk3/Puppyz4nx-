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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sakura"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 8}px`,
              height: `${Math.random() * 8 + 8}px`,
              animationDuration: `${Math.random() * 7 + 8}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.4 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Nội dung */}
      <div className="relative z-10 max-w-6xl mx-auto md:p-5 animate-fadeInUp">
        <Header />
        <Navbar />
        <div className="flex flex-col p-5 md:mt-3 glass-panel shadow-lg">
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
