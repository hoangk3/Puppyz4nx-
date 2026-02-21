import Discord from "../../api/userInfo";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faDiscord,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const socials = [
  { name: "Gmail", href: "mailto:phanduyhoang123456@gmail.com", icon: faEnvelope },
  { name: "Github", href: "https://github.com/hoangk3", icon: faGithub },
  { name: "Discord", href: "https://discord.com/users/789428736868876298", icon: faDiscord },
  { name: "Youtube", href: "https://www.youtube.com/channel/UC1dZ6CfgwYDWeopGkoCxKpA", icon: faYoutube },
  { name: "Facebook", href: "https://www.facebook.com/Puppyz4nx", icon: faFacebook },
];

function Header() {
  return (
    <header className="p-4 md:p-6 rounded-2xl glass-dark text-slate-800 animate-fadeIn border border-white/70 shadow-lg shadow-slate-400/20">
      <Discord />
      <div className="flex mt-5 gap-2 text-xl flex-wrap">
        {socials.map((item) => (
          <Tippy key={item.name} animation="scale" content={item.name}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white/70 size-10 items-center flex justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 hover-glow border border-white/80"
              href={item.href}
            >
              <FontAwesomeIcon icon={item.icon} />
            </a>
          </Tippy>
        ))}
      </div>
    </header>
  );
}

export default Header;
