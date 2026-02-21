import { NavLink } from "react-router-dom";

function Nav() {
  const baseLinkClass =
    "group flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm md:text-base transition-all duration-300 backdrop-blur-md";

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
    <div className="md:p-2 py-2 px-3 md:rounded-2xl bg-black/20 border border-white/15 shadow-sm animate-fadeIn">
      <div className="flex gap-2.5 text-white font-semibold flex-wrap">
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive
                  ? "bg-cyan-400/90 text-slate-900 border-cyan-200 shadow-lg shadow-cyan-500/30"
                  : "bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:scale-[1.03] hover:border-cyan-200/70"
              } animate-fadeInUp`
            }
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
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
