import { NavLink } from "react-router-dom";

function Nav() {
  const baseLinkClass =
    "group flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm md:text-[15px] font-semibold transition-all duration-300 backdrop-blur-md";

  const links = [
    { to: "/", label: "About", icon: "✨" },
    { to: "/projects", label: "Projects", icon: "🚀" },
    { to: "/skills", label: "Skills", icon: "🛠️" },
    { to: "/games", label: "Games", icon: "🎮" },
    { to: "/specs", label: "Specs", icon: "💻" },
    { to: "/pinterest", label: "Anime", icon: "🌸" },
    { to: "/goal", label: "Goal", icon: "🎯" },
    { to: "/donate", label: "Donate", icon: "💖" },
    { to: "/hentai", label: "Hentai", icon: "🔞" },
    { to: "/my-gf", label: "My GF", icon: "❤️" },
  ];

  return (
    <div className="md:p-2 py-2 px-3 md:rounded-2xl glass-dark border border-white/70 shadow-sm animate-fadeIn">
      <div className="flex gap-2.5 text-slate-700 flex-wrap">
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive
                  ? "bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-300/35"
                  : "bg-white/55 text-slate-700 border-white/80 hover:bg-cyan-100 hover:text-sky-700 hover:scale-[1.03]"
              } animate-fadeInUp`
            }
            style={{ animationDelay: `${index * 45}ms`, animationFillMode: "both" }}
          >
            <span className="text-base">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Nav;
