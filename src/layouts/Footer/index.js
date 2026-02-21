import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

function Footer() {
  return (
    <footer className="flex p-4 md:p-5 rounded-2xl glass-dark border border-white/10">
      <div className="sm:flex text-center justify-between text-sm w-full text-slate-100 font-medium gap-3">
        <p>
          2025 ©Puppy_z4nx • Made with{" "}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-200"
          >
            React
          </a>{" "}
          x{" "}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-200"
          >
            Tailwind
          </a>
        </p>
        <p>
          <Tippy animation="scale" content="Where i learning ? (click)">
            <a
              className="text-cyan-300 hover:text-cyan-100"
              href="https://www.w3schools.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About My Knowledge? <span className="text-slate-300">•</span> ✨
            </a>
          </Tippy>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

