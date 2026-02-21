import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

function Footer() {
  return (
    <footer className="flex p-4 md:p-5 rounded-2xl glass-dark border border-white/70 shadow-lg shadow-slate-400/15">
      <div className="sm:flex text-center justify-between text-sm w-full text-slate-700 font-semibold gap-3">
        <p>
          2025 ©Puppy_z4nx • Made with{" "}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-600">
            React
          </a>{" "}
          x{" "}
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-600">
            Tailwind
          </a>
        </p>
        <p>
          <Tippy animation="scale" content="Where i learning ? (click)">
            <a className="text-sky-700 hover:text-sky-600" href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">
              About My Knowledge? <span className="text-slate-500">•</span> ✨
            </a>
          </Tippy>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
