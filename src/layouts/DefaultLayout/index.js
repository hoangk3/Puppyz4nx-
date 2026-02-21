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
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/40 to-indigo-950/55" />

      <div className="ambient-blob ambient-blob--one" />
      <div className="ambient-blob ambient-blob--two" />

      <div className="sakura-container">
        {[...Array(12)].map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 animate-fadeInUp space-y-4">
        <Header />
        <Navbar />
        <main className="flex flex-col p-4 md:p-7 glass-panel shadow-2xl shadow-black/20 border border-white/15">
          {children}
        </main>
        <Footer />
      </div>

      <MusicPlayer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
