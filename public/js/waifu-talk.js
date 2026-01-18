(async function () {
  if (screen.width < 768) return;

  // Đợi DOM + Live2D
  await new Promise(res => {
    if (document.readyState === "complete") return res();
    window.addEventListener("load", res, { once: true });
  });

  let tips;
  try {
    tips = await fetch("/waifu-tips.json").then(r => r.json());
  } catch (e) {
    console.error("❌ Cannot load waifu-tips.json", e);
    return;
  }

  /* ===== BUBBLE ===== */
  const bubble = document.createElement("div");
  bubble.id = "waifu-bubble";
  bubble.style.cssText = `
    position: fixed;
    left: 140px;          /* 👈 lệch sang phải để không đè Rem */
    bottom: 420px;        /* 👈 nằm trên đầu Rem */
    max-width: 260px;
    background: rgba(0,0,0,.8);
    color: #fff;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.4;
    z-index: 2147483647;  /* 👈 đè TẤT CẢ */
    pointer-events: none;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity .3s, transform .3s;
  `;
  document.body.appendChild(bubble);

  let hideTimer;

  function say(text, time = 4000) {
    if (!text) return;
    bubble.innerHTML = text;
    bubble.style.opacity = "1";
    bubble.style.transform = "translateY(0)";
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      bubble.style.opacity = "0";
      bubble.style.transform = "translateY(10px)";
    }, time);
  }

  const pick = arr =>
    Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr;

  /* ===== DEFAULT ===== */
  if (tips.message?.default?.length) {
    say(pick(tips.message.default), 5000);
  }

  /* ===== TIME ===== */
  if (Array.isArray(tips.time)) {
    const h = new Date().getHours();
    for (const t of tips.time) {
      const [from, to = from] = t.hour.split("-").map(Number);
      if (h >= from && h <= to) {
        say(pick(t.text), 6000);
        break;
      }
    }
  }

  /* ===== EVENTS (React-safe) ===== */
  document.addEventListener("mouseover", e => {
    for (const item of tips.mouseover || []) {
      if (e.target.closest(item.selector)) {
        say(pick(item.text));
        break;
      }
    }
  });

  document.addEventListener("click", e => {
    for (const item of tips.click || []) {
      if (e.target.closest(item.selector)) {
        say(pick(item.text));
        break;
      }
    }
  });

  /* ===== IDLE ===== */
  let idleTimer;
  const resetIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (tips.message?.default?.length) {
        say(pick(tips.message.default));
      }
    }, 20000);
  };

  ["mousemove", "keydown", "mousedown", "touchstart"].forEach(ev =>
    document.addEventListener(ev, resetIdle)
  );

  resetIdle();
})();
