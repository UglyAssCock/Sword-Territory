/* ============================================================================
 * SWORD TERRITORY — VIRAL SQUARE ARENA EDITION
 * - Full-bleed circular vector flag textures for every country
 * - 4-Quadrant Pre-Painted Square Arena (Turkey, USA, Brazil, Germany)
 * - Live Colored HUD Cards (HP 5, AREA 25.0%, SWORDS 1 L 0.8, SPD 125, BARRACKS NO)
 * - Tournament Country Picker + Full League Standings + Composite Video Recorder
 * ============================================================================ */

const ADMOB_TEST_IDS = {
  APP_ID: "ca-app-pub-3940256099942544~3347511713",
  REWARDED_ID: "ca-app-pub-3940256099942544/5224354917"
};

// First 4 countries match the exact reference quadrants & pastel colors:
// Top-Left: Turkey (#E05A5A), Top-Right: USA (#6A85D6), Bottom-Left: Brazil (#72BB7E), Bottom-Right: Germany (#8E8A8F)
const DEFAULT_COUNTRIES = [
  { id: "tr", name: "Turkey", color: "#E05A5A", trait: "fury", traitName: "Crimson Edge" },
  { id: "us", name: "USA", color: "#6A85D6", trait: "speed", traitName: "Liberty Blitz" },
  { id: "br", name: "Brazil", color: "#72BB7E", trait: "regen", traitName: "Amazon Turf" },
  { id: "de", name: "Germany", color: "#8E8A8F", trait: "tank", traitName: "Iron Guard" },
  { id: "dz", name: "Algeria", color: "#58B388", trait: "speed", traitName: "Desert Fox" },
  { id: "jp", name: "Japan", color: "#E57388", trait: "blade", traitName: "Katana Reach" },
  { id: "fr", name: "France", color: "#6E85D8", trait: "dual", traitName: "Twin Rapier" },
  { id: "gb", name: "UK", color: "#D66874", trait: "tank", traitName: "Royal Shield" },
  { id: "it", name: "Italy", color: "#5CB895", trait: "speed", traitName: "Centurion" },
  { id: "es", name: "Spain", color: "#E29058", trait: "blade", traitName: "Toledo Blade" },
  { id: "ar", name: "Argentina", color: "#6CB8E6", trait: "speed", traitName: "Albiceleste" },
  { id: "kr", name: "South Korea", color: "#9C78D8", trait: "dual", traitName: "Hwarang" },
  { id: "mx", name: "Mexico", color: "#6AB065", trait: "regen", traitName: "Aztec Vitality" },
  { id: "eg", name: "Egypt", color: "#CFA058", trait: "tank", traitName: "Pharaoh Guard" },
  { id: "ma", name: "Morocco", color: "#D45D6E", trait: "speed", traitName: "Atlas Lion" },
  { id: "sa", name: "Saudi Arabia", color: "#54A878", trait: "blade", traitName: "Scimitar" },
  { id: "ca", name: "Canada", color: "#E07582", trait: "tank", traitName: "Maple Fortress" },
  { id: "in", name: "India", color: "#E29A5C", trait: "regen", traitName: "Chakram" },
  { id: "cn", name: "China", color: "#D85C5C", trait: "fury", traitName: "Dragon Might" },
  { id: "au", name: "Australia", color: "#589CD6", trait: "speed", traitName: "Outback Dash" },
  { id: "ng", name: "Nigeria", color: "#62B87A", trait: "speed", traitName: "Super Eagle" },
  { id: "se", name: "Sweden", color: "#D9BD58", trait: "tank", traitName: "Nordic Armor" },
  { id: "pl", name: "Poland", color: "#DF789A", trait: "fury", traitName: "Winged Hussar" },
  { id: "nl", name: "Netherlands", color: "#E28A58", trait: "regen", traitName: "Oranje Surge" },
  { id: "pt", name: "Portugal", color: "#D66464", trait: "blade", traitName: "Navigator" },
  { id: "za", name: "South Africa", color: "#5EB58C", trait: "tank", traitName: "Springbok" },
  { id: "tn", name: "Tunisia", color: "#E26C6C", trait: "speed", traitName: "Carthage" },
  { id: "sn", name: "Senegal", color: "#92C458", trait: "fury", traitName: "Teranga" },
  { id: "id", name: "Indonesia", color: "#E07E7E", trait: "speed", traitName: "Garuda" },
  { id: "pk", name: "Pakistan", color: "#529E76", trait: "blade", traitName: "Crescent Blade" },
  { id: "gr", name: "Greece", color: "#68A4E0", trait: "tank", traitName: "Spartan" },
  { id: "no", name: "Norway", color: "#A67CD8", trait: "blade", traitName: "Viking Axe" }
];

const ARENAS = [
  { id: "classic", name: "Reference Square (Clean Open)", unlocked: true, cost: 0 },
  { id: "pillars", name: "Four Corner Pillars", unlocked: true, cost: 0 },
  { id: "volcano", name: "Center Lava Core", unlocked: false, cost: 150 },
  { id: "labyrinth", name: "Twin Walls Arena", unlocked: false, cost: 200 }
];

const SWORD_SKINS = [
  { id: "steel", name: "Classic White Steel", color: "#ffffff", edge: "#cbd5e1", unlocked: true, cost: 0 },
  { id: "crimson", name: "Crimson Katana", color: "#ff4d6d", edge: "#fde047", unlocked: false, cost: 100 },
  { id: "cyber", name: "Cyber Neon Blade", color: "#00f5d4", edge: "#ffffff", unlocked: false, cost: 150 },
  { id: "gold", name: "Golden Excalibur", color: "#fde047", edge: "#f59e0b", unlocked: false, cost: 200 }
];

/* ============================================================================
 * FULL-CIRCLE FLAG TEXTURE GENERATOR (100% Full Circle Flag Art, No Tiny Emoji)
 * ============================================================================ */
const flagCanvasCache = {};
const flagDataUrlCache = {};

function drawStar(g, cx, cy, spikes, outerR, innerR, color) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  g.beginPath();
  g.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    g.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    g.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  g.closePath();
  g.fillStyle = color;
  g.fill();
}

function drawHorizontalStripes(g, s, colors) {
  const h = s / colors.length;
  colors.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect(0, i * h, s, h + 1);
  });
}

function drawVerticalStripes(g, s, colors) {
  const w = s / colors.length;
  colors.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect(i * w, 0, w + 1, s);
  });
}

function generateCountryFlagCanvas(country) {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  const id = country.id;

  // Fill base
  g.fillStyle = country.color || "#E05A5A";
  g.fillRect(0, 0, s, s);

  if (id === "tr") {
    // Turkey: Full crimson red + white crescent & star
    g.fillStyle = "#E30A17";
    g.fillRect(0, 0, s, s);
    g.fillStyle = "#ffffff";
    g.beginPath(); g.arc(s * 0.43, s * 0.5, s * 0.25, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#E30A17";
    g.beginPath(); g.arc(s * 0.49, s * 0.5, s * 0.20, 0, Math.PI * 2); g.fill();
    drawStar(g, s * 0.70, s * 0.5, 5, s * 0.11, s * 0.045, "#ffffff");
  } else if (id === "us") {
    // USA: 13 red & white stripes + blue star canton
    for (let i = 0; i < 13; i++) {
      g.fillStyle = i % 2 === 0 ? "#B22234" : "#ffffff";
      g.fillRect(0, (i * s) / 13, s, s / 13 + 1);
    }
    g.fillStyle = "#3C3B6E";
    g.fillRect(0, 0, s * 0.52, s * 0.54);
    for (let r = 0; r < 4; r++) {
      for (let col = 0; col < 4; col++) {
        drawStar(g, 10 + col * 15, 10 + r * 15, 5, 4.5, 2, "#ffffff");
      }
    }
  } else if (id === "br") {
    // Brazil: Full green + yellow diamond + blue globe & white band
    g.fillStyle = "#009B3A";
    g.fillRect(0, 0, s, s);
    g.fillStyle = "#FEDF00";
    g.beginPath();
    g.moveTo(s * 0.5, s * 0.12);
    g.lineTo(s * 0.88, s * 0.5);
    g.lineTo(s * 0.5, s * 0.88);
    g.lineTo(s * 0.12, s * 0.5);
    g.closePath();
    g.fill();
    g.fillStyle = "#002776";
    g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.21, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "#ffffff";
    g.lineWidth = 5;
    g.beginPath();
    g.arc(s * 0.48, s * 0.68, s * 0.26, -Math.PI * 0.78, -Math.PI * 0.22);
    g.stroke();
  } else if (id === "de") {
    // Germany: Black, Red, Gold horizontal tricolor
    drawHorizontalStripes(g, s, ["#111111", "#DD0000", "#FFCE00"]);
  } else if (id === "dz") {
    // Algeria: Vertical Green/White + Red Crescent & Star
    drawVerticalStripes(g, s, ["#006233", "#ffffff"]);
    g.fillStyle = "#D21034";
    g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.25, 0, Math.PI * 2); g.fill();
    g.save();
    g.beginPath(); g.arc(s * 0.56, s * 0.5, s * 0.20, 0, Math.PI * 2); g.clip();
    drawVerticalStripes(g, s, ["#006233", "#ffffff"]);
    g.restore();
    drawStar(g, s * 0.58, s * 0.5, 5, s * 0.11, s * 0.045, "#D21034");
  } else if (id === "jp") {
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#BC002D"; g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.28, 0, Math.PI * 2); g.fill();
  } else if (id === "fr") {
    drawVerticalStripes(g, s, ["#002395", "#ffffff", "#ED2939"]);
  } else if (id === "gb") {
    g.fillStyle = "#012169"; g.fillRect(0, 0, s, s);
    g.strokeStyle = "#ffffff"; g.lineWidth = 18;
    g.beginPath(); g.moveTo(0, 0); g.lineTo(s, s); g.moveTo(s, 0); g.lineTo(0, s); g.stroke();
    g.strokeStyle = "#C8102E"; g.lineWidth = 8;
    g.beginPath(); g.moveTo(0, 0); g.lineTo(s, s); g.moveTo(s, 0); g.lineTo(0, s); g.stroke();
    g.fillStyle = "#ffffff"; g.fillRect(s * 0.38, 0, s * 0.24, s); g.fillRect(0, s * 0.38, s, s * 0.24);
    g.fillStyle = "#C8102E"; g.fillRect(s * 0.43, 0, s * 0.14, s); g.fillRect(0, s * 0.43, s, s * 0.14);
  } else if (id === "it") {
    drawVerticalStripes(g, s, ["#009246", "#ffffff", "#CE2B37"]);
  } else if (id === "es") {
    drawHorizontalStripes(g, s, ["#AA151B", "#F1BF00", "#F1BF00", "#AA151B"]);
  } else if (id === "ar") {
    drawHorizontalStripes(g, s, ["#74ACDF", "#ffffff", "#74ACDF"]);
    drawStar(g, s * 0.5, s * 0.5, 8, s * 0.12, s * 0.06, "#F6B40E");
  } else if (id === "kr") {
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#CD2E3A"; g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.24, Math.PI, 0); g.fill();
    g.fillStyle = "#0047A0"; g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.24, 0, Math.PI); g.fill();
  } else if (id === "mx") {
    drawVerticalStripes(g, s, ["#006847", "#ffffff", "#CE1126"]);
    g.fillStyle = "#8B5A2B"; g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.1, 0, Math.PI * 2); g.fill();
  } else if (id === "eg") {
    drawHorizontalStripes(g, s, ["#CE1126", "#ffffff", "#000000"]);
    drawStar(g, s * 0.5, s * 0.5, 5, s * 0.1, s * 0.05, "#C09300");
  } else if (id === "ma") {
    g.fillStyle = "#C1272D"; g.fillRect(0, 0, s, s);
    drawStar(g, s * 0.5, s * 0.5, 5, s * 0.22, s * 0.09, "#006233");
  } else if (id === "sa") {
    g.fillStyle = "#006C35"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#ffffff"; g.fillRect(s * 0.22, s * 0.62, s * 0.56, 7);
  } else if (id === "ca") {
    drawVerticalStripes(g, s, ["#FF0000", "#ffffff", "#ffffff", "#FF0000"]);
    drawStar(g, s * 0.5, s * 0.5, 5, s * 0.20, s * 0.09, "#FF0000");
  } else if (id === "in") {
    drawHorizontalStripes(g, s, ["#FF9933", "#ffffff", "#138808"]);
    g.strokeStyle = "#000080"; g.lineWidth = 4;
    g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.11, 0, Math.PI * 2); g.stroke();
  } else if (id === "cn") {
    g.fillStyle = "#EE1C25"; g.fillRect(0, 0, s, s);
    drawStar(g, s * 0.32, s * 0.38, 5, s * 0.15, s * 0.06, "#FFFF00");
  } else if (id === "ng") {
    drawVerticalStripes(g, s, ["#008751", "#ffffff", "#008751"]);
  } else if (id === "se") {
    g.fillStyle = "#006AA7"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#FECC02"; g.fillRect(s * 0.32, 0, s * 0.16, s); g.fillRect(0, s * 0.42, s, s * 0.16);
  } else if (id === "pl") {
    drawHorizontalStripes(g, s, ["#ffffff", "#DC143C"]);
  } else if (id === "nl") {
    drawHorizontalStripes(g, s, ["#AE1C28", "#ffffff", "#21468B"]);
  } else if (id === "pt") {
    drawVerticalStripes(g, s, ["#006600", "#FF0000", "#FF0000"]);
    g.fillStyle = "#FFFF00"; g.beginPath(); g.arc(s * 0.35, s * 0.5, s * 0.13, 0, Math.PI * 2); g.fill();
  } else if (id === "tn") {
    g.fillStyle = "#E70013"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#ffffff"; g.beginPath(); g.arc(s * 0.5, s * 0.5, s * 0.25, 0, Math.PI * 2); g.fill();
    drawStar(g, s * 0.53, s * 0.5, 5, s * 0.12, s * 0.05, "#E70013");
  } else if (id === "sn") {
    drawVerticalStripes(g, s, ["#00853F", "#FDEF42", "#E31B23"]);
    drawStar(g, s * 0.5, s * 0.5, 5, s * 0.12, s * 0.05, "#00853F");
  } else if (id === "id") {
    drawHorizontalStripes(g, s, ["#FF0000", "#ffffff"]);
  } else if (id === "pk") {
    g.fillStyle = "#01411C"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, s * 0.24, s);
    g.beginPath(); g.arc(s * 0.6, s * 0.5, s * 0.22, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#01411C"; g.beginPath(); g.arc(s * 0.65, s * 0.46, s * 0.18, 0, Math.PI * 2); g.fill();
  } else if (id === "gr") {
    for (let i = 0; i < 9; i++) {
      g.fillStyle = i % 2 === 0 ? "#0D5EAF" : "#ffffff";
      g.fillRect(0, (i * s) / 9, s, s / 9 + 1);
    }
    g.fillStyle = "#0D5EAF"; g.fillRect(0, 0, s * 0.45, s * 0.55);
    g.fillStyle = "#ffffff"; g.fillRect(s * 0.18, 0, s * 0.09, s * 0.55); g.fillRect(0, s * 0.22, s * 0.45, s * 0.1);
  } else if (id === "no") {
    g.fillStyle = "#BA0C2F"; g.fillRect(0, 0, s, s);
    g.fillStyle = "#ffffff"; g.fillRect(s * 0.3, 0, s * 0.2, s); g.fillRect(0, s * 0.4, s, s * 0.2);
    g.fillStyle = "#00205B"; g.fillRect(s * 0.34, 0, s * 0.12, s); g.fillRect(0, s * 0.44, s, s * 0.12);
  } else {
    drawHorizontalStripes(g, s, [country.color, "#ffffff", country.color]);
  }

  return c;
}

function buildAllFlagCaches() {
  getAllCountries().forEach(c => {
    if (c.imgData) {
      const can = document.createElement("canvas");
      can.width = 128; can.height = 128;
      const g = can.getContext("2d");
      const img = new Image();
      img.onload = () => {
        g.drawImage(img, 0, 0, 128, 128);
        flagDataUrlCache[c.id] = can.toDataURL();
      };
      img.src = c.imgData;
      flagCanvasCache[c.id] = can;
      flagDataUrlCache[c.id] = c.imgData;
    } else if (!flagCanvasCache[c.id]) {
      const can = generateCountryFlagCanvas(c);
      flagCanvasCache[c.id] = can;
      flagDataUrlCache[c.id] = can.toDataURL();
    }
  });
}

/* --- WEB AUDIO SYNTHESIZER --- */
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }
  play(type) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === "clash") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now); osc.stop(now + 0.08);
    } else if (type === "break") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(85, now + 0.2);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now); osc.stop(now + 0.2);
    } else if (type === "hit") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(210, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.11);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.start(now); osc.stop(now + 0.11);
    } else if (type === "powerup") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } else if (type === "win") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + idx * 0.09);
        g.gain.setValueAtTime(0.16, now + idx * 0.09);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.22);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(now + idx * 0.09); o.stop(now + idx * 0.09 + 0.22);
      });
    }
  }
}
const sfx = new SoundFX();

/* --- PERSISTENT SAVE STATE --- */
const SaveData = {
  coins: 100,
  streak: 0,
  equippedSkin: "steel",
  unlockedArenas: ["classic", "pillars"],
  unlockedSkins: ["steel"],
  customCountries: [],
  daily: [
    { id: "paint500", desc: "Paint 500 territory cells in matches", progress: 0, target: 500, reward: 80, claimed: false },
    { id: "break5", desc: "Break 5 enemy swords", progress: 0, target: 5, reward: 100, claimed: false },
    { id: "predict1", desc: "Win 1 Watch Mode prediction", progress: 0, target: 1, reward: 120, claimed: false }
  ],
  load() {
    try {
      const raw = localStorage.getItem("sword_territory_save_v2");
      if (raw) Object.assign(this, JSON.parse(raw));
    } catch (e) {}
  },
  save() {
    try {
      localStorage.setItem("sword_territory_save_v2", JSON.stringify({
        coins: this.coins,
        streak: this.streak,
        equippedSkin: this.equippedSkin,
        unlockedArenas: this.unlockedArenas,
        unlockedSkins: this.unlockedSkins,
        customCountries: this.customCountries,
        daily: this.daily
      }));
    } catch (e) {}
    updateMenuMeta();
  }
};
SaveData.load();

function getAllCountries() {
  return [...SaveData.customCountries, ...DEFAULT_COUNTRIES];
}
buildAllFlagCaches();

/* --- GOOGLE ADMOB CAPACITOR INTEGRATION --- */
async function initAdMob() {
  try {
    const AdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
    if (AdMob) await AdMob.initialize({ initializeForTesting: true });
  } catch (e) {}
}
initAdMob();

async function showRewardedAd(onReward) {
  try {
    const AdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
    if (AdMob) {
      await AdMob.prepareRewardVideoAd({ adId: ADMOB_TEST_IDS.REWARDED_ID, isTesting: true });
      const rewardItem = await AdMob.showRewardVideoAd();
      if (rewardItem) { onReward(); return; }
    }
  } catch (e) {}
  showBanner("🎬 Playing Google AdMob Test Ad (2s)...");
  setTimeout(() => onReward(), 2000);
}

/* ============================================================================
 * COMPOSITE VIDEO RECORDER (Captures Title + 4 HUD Cards + Square Arena!)
 * ============================================================================ */
const recCanvas = document.createElement("canvas");
recCanvas.width = 540;
recCanvas.height = 840;
const recCtx = recCanvas.getContext("2d");

let mediaRecorder = null;
let recordedChunks = [];
let lastRecordedBlob = null;
let lastRecordedMime = "video/webm";
let isRecordingActive = false;

function getSupportedMimeType() {
  if (typeof MediaRecorder === "undefined") return null;
  const types = [
    "video/mp4",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm"
  ];
  for (const t of types) {
    if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) return t;
  }
  return "";
}

function renderCompositeRecordingFrame() {
  if (!isRecordingActive) return;
  const w = recCanvas.width;
  const h = recCanvas.height;

  // 1. Dark background
  recCtx.fillStyle = "#07080c";
  recCtx.fillRect(0, 0, w, h);

  // 2. Title & Subtitle
  recCtx.fillStyle = "#ffffff";
  recCtx.font = "900 28px sans-serif";
  recCtx.textAlign = "center";
  recCtx.fillText("SWORD TERRITORY", w / 2, 46);

  recCtx.fillStyle = "#d1d5db";
  recCtx.font = "800 13px sans-serif";
  recCtx.fillText("PAINT LAND • BREAK SWORDS • BE THE LAST", w / 2, 68);

  // 3. Draw top 4 HUD cards on recording canvas
  const cards = gameState.players.slice(0, 4);
  const cardW = (w - 36 - 18) / 4;
  const cardH = 88;
  cards.forEach((p, idx) => {
    const cx = 18 + idx * (cardW + 6);
    const cy = 84;
    recCtx.save();
    if (!p.alive) recCtx.globalAlpha = 0.35;
    recCtx.fillStyle = p.color;
    recCtx.fillRect(cx, cy, cardW, cardH);
    recCtx.strokeStyle = "rgba(255,255,255,0.4)";
    recCtx.lineWidth = 1.5;
    recCtx.strokeRect(cx, cy, cardW, cardH);

    // Circular flag
    const flagCan = flagCanvasCache[p.id];
    if (flagCan) {
      recCtx.save();
      recCtx.beginPath();
      recCtx.arc(cx + 14, cy + 15, 9, 0, Math.PI * 2);
      recCtx.clip();
      recCtx.drawImage(flagCan, cx + 5, cy + 6, 18, 18);
      recCtx.restore();
    }

    recCtx.fillStyle = "#ffffff";
    recCtx.textAlign = "left";
    recCtx.font = "900 12px sans-serif";
    recCtx.fillText(p.name.slice(0, 9), cx + 27, cy + 19);

    recCtx.font = "800 10px sans-serif";
    recCtx.fillText(`HP ${Math.ceil(p.hp)}  AREA ${p.areaPct.toFixed(1)}%`, cx + 6, cy + 38);
    recCtx.fillText(`SWORDS ${p.swords}  L ${p.swordL.toFixed(1)}`, cx + 6, cy + 53);
    recCtx.fillText(`SPD ${Math.round(p.spdStat)}`, cx + 6, cy + 68);
    recCtx.fillText(`BARRACKS ${p.barracks > 0 ? "YES" : "NO"}`, cx + 6, cy + 82);
    recCtx.restore();
  });

  // 4. Draw Square Arena with golden border
  const arenaSize = 504;
  const ax = (w - arenaSize) / 2;
  const ay = 192;
  recCtx.drawImage(canvas, ax, ay, arenaSize, arenaSize);
  recCtx.strokeStyle = "#f59e0b";
  recCtx.lineWidth = 4;
  recCtx.strokeRect(ax, ay, arenaSize, arenaSize);
}

function startRecording() {
  if (isRecordingActive) return;
  const btn = document.getElementById("btn-record-toggle");
  try {
    const stream = recCanvas.captureStream ? recCanvas.captureStream(30) : canvas.captureStream(30);
    recordedChunks = [];
    const mime = getSupportedMimeType();
    lastRecordedMime = mime || "video/webm";
    mediaRecorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      if (recordedChunks.length > 0) {
        lastRecordedBlob = new Blob(recordedChunks, { type: lastRecordedMime });
        const previewBox = document.getElementById("video-preview-box");
        const videoEl = document.getElementById("recorded-video-preview");
        videoEl.src = URL.createObjectURL(lastRecordedBlob);
        previewBox.classList.remove("hidden");
      }
    };

    isRecordingActive = true;
    renderCompositeRecordingFrame();
    mediaRecorder.start(250); // Flush chunks every 250ms so data is never empty!
    btn.classList.add("recording");
    btn.textContent = "⏹ Stop Rec";
  } catch (err) {
    console.log("Recorder error:", err);
    isRecordingActive = false;
  }
}

function stopRecording() {
  const btn = document.getElementById("btn-record-toggle");
  isRecordingActive = false;
  btn.classList.remove("recording");
  btn.textContent = "⏺ Rec";
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    try { mediaRecorder.stop(); } catch (e) {}
  }
}

function toggleRecording() {
  if (isRecordingActive) {
    stopRecording();
    showBanner("📹 Recording Saved! Ready to share at Match End.");
  } else {
    startRecording();
    showBanner("🔴 Recording Full Viral Match Layout...");
  }
}

async function shareOrDownloadVideo() {
  if (isRecordingActive) {
    stopRecording();
    await new Promise(r => setTimeout(r, 350));
  }
  if (!lastRecordedBlob || lastRecordedBlob.size === 0) {
    alert("No video recorded yet! Keep 'Auto-Record Match Video' checked on the Main Menu or tap '⏺ Rec' during a match.");
    return;
  }
  const ext = lastRecordedMime.includes("mp4") ? "mp4" : "webm";
  const fileName = `sword-territory-${Date.now()}.${ext}`;
  const file = new File([lastRecordedBlob], fileName, { type: lastRecordedMime });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Sword Territory",
        text: "Watch this Sword Territory Country Paint War!",
        files: [file]
      });
      return;
    } catch (e) {}
  }

  // Fallback direct download for Android browser / WebView
  const url = URL.createObjectURL(lastRecordedBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ============================================================================
 * SQUARE ARENA & PRE-PAINTED QUADRANT ENGINE
 * ============================================================================ */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });

// Crisp pixelated low-res territory grid (120x120 gives blocky edges & exact 25.0% quadrants)
const GRID_SIZE = 120;
const gridCanvas = document.createElement("canvas");
gridCanvas.width = GRID_SIZE;
gridCanvas.height = GRID_SIZE;
const gridCtx = gridCanvas.getContext("2d");
let territoryGrid = new Uint8Array(GRID_SIZE * GRID_SIZE);

let gameState = {
  running: false,
  mode: "watch",
  contextMode: "quick",
  teamMode: "ffa",
  arenaId: "classic",
  simSpeed: 1,
  timeRemaining: 150,
  totalTime: 150,
  hitStopTimer: 0,
  shakeTimer: 0,
  shakeIntensity: 0,
  predictedId: null,
  safeZone: { x: 200, y: 200, r: 999, maxR: 999 },
  supplyDropTimer: 28,
  eliminationOrder: [],
  players: [],
  powerups: [],
  crates: [],
  obstacles: [],
  particles: [],
  underdogId: null,
  gridCols: 2,
  gridRows: 2
};

const joystick = { active: false, dx: 0, dy: 0 };

function resizeSquareCanvas() {
  const wrapper = document.getElementById("arena-wrapper");
  const rect = wrapper.getBoundingClientRect();
  const availW = window.innerWidth - 16;
  const availH = rect.height > 100 ? rect.height - 8 : window.innerHeight - 210;
  const squareSide = Math.max(240, Math.floor(Math.min(availW, availH, 500)));
  canvas.width = squareSide;
  canvas.height = squareSide;
  canvas.style.width = `${squareSide}px`;
  canvas.style.height = `${squareSide}px`;
}
window.addEventListener("resize", () => {
  if (gameState.running) resizeSquareCanvas();
});

function showBanner(msg) {
  const b = document.getElementById("hud-banner");
  b.textContent = msg;
  b.classList.remove("hidden");
  clearTimeout(b._t);
  b._t = setTimeout(() => b.classList.add("hidden"), 2800);
}

function getZoneSplitForCount(n) {
  if (n <= 4) return { cols: 2, rows: 2 };
  if (n <= 6) return { cols: 3, rows: 2 };
  if (n <= 8) return { cols: 4, rows: 2 };
  if (n <= 16) return { cols: 4, rows: 4 };
  return { cols: 8, rows: 4 };
}

function prePaintEqualZones(players) {
  const n = players.length;
  const { cols, rows } = getZoneSplitForCount(n);
  gameState.gridCols = cols;
  gameState.gridRows = rows;

  for (let gy = 0; gy < GRID_SIZE; gy++) {
    for (let gx = 0; gx < GRID_SIZE; gx++) {
      const col = Math.min(cols - 1, Math.floor((gx / GRID_SIZE) * cols));
      const row = Math.min(rows - 1, Math.floor((gy / GRID_SIZE) * rows));
      const zoneIdx = (row * cols + col) % n;
      const owner = players[zoneIdx];
      territoryGrid[gy * GRID_SIZE + gx] = owner.index;
      gridCtx.fillStyle = owner.color;
      gridCtx.fillRect(gx, gy, 1, 1);
    }
  }
}

function buildSquareObstacles(arenaId, side) {
  const obs = [];
  if (arenaId === "pillars") {
    const p = side * 0.27;
    const s = side * 0.08;
    obs.push({ x: p, y: p, w: s, h: s, type: "wall" });
    obs.push({ x: side - p - s, y: p, w: s, h: s, type: "wall" });
    obs.push({ x: p, y: side - p - s, w: s, h: s, type: "wall" });
    obs.push({ x: side - p - s, y: side - p - s, w: s, h: s, type: "wall" });
  } else if (arenaId === "volcano") {
    const s = side * 0.16;
    obs.push({ x: side / 2 - s / 2, y: side / 2 - s / 2, w: s, h: s, type: "lava" });
  } else if (arenaId === "labyrinth") {
    obs.push({ x: side * 0.22, y: side * 0.33, w: side * 0.56, h: 12, type: "wall" });
    obs.push({ x: side * 0.22, y: side * 0.65, w: side * 0.56, h: 12, type: "wall" });
  }
  return obs;
}

function setupMatch(participants, options = {}) {
  document.getElementById("menu-screen").classList.add("hidden");
  document.getElementById("match-screen").classList.remove("hidden");
  resizeSquareCanvas();
  buildAllFlagCaches();

  const side = canvas.width;
  const isMega = participants.length >= 16;
  const { cols, rows } = getZoneSplitForCount(participants.length);

  gameState.running = true;
  gameState.mode = options.mode || "watch";
  gameState.contextMode = options.contextMode || "quick";
  gameState.teamMode = options.teamMode || document.getElementById("sel-team-mode").value;
  gameState.arenaId = options.arenaId || document.getElementById("sel-arena").value;
  gameState.timeRemaining = 150;
  gameState.totalTime = 150;
  gameState.safeZone = { x: side / 2, y: side / 2, r: side * 0.72, maxR: side * 0.72 };
  gameState.supplyDropTimer = 28;
  gameState.eliminationOrder = [];
  gameState.powerups = [];
  gameState.crates = [];
  gameState.particles = [];
  gameState.obstacles = buildSquareObstacles(gameState.arenaId, side);

  const ballRadius = isMega ? Math.max(10, side * 0.032) : Math.max(17, side * 0.056);
  const teamPastels = ["#E05A5A", "#6A85D6", "#72BB7E", "#8E8A8F"];

  // Exact starting positions for 4-player reference layout:
  // Top-left (Turkey), Top-right (USA), Bottom-left (Brazil), Bottom-right near right edge (Germany)
  const fourPos = [
    { x: side * 0.18, y: side * 0.18, vx: 1, vy: 0.75 },
    { x: side * 0.82, y: side * 0.18, vx: -0.8, vy: 0.9 },
    { x: side * 0.18, y: side * 0.82, vx: 0.9, vy: -0.8 },
    { x: side * 0.84, y: side * 0.72, vx: -0.95, vy: -0.7 }
  ];

  gameState.players = participants.map((c, idx) => {
    let sx, sy, dirX, dirY;
    if (participants.length === 4) {
      sx = fourPos[idx].x;
      sy = fourPos[idx].y;
      dirX = fourPos[idx].vx;
      dirY = fourPos[idx].vy;
    } else {
      const col = idx % cols;
      const row = Math.floor(idx / cols) % rows;
      const zoneW = side / cols;
      const zoneH = side / rows;
      sx = col * zoneW + zoneW * (col < cols / 2 ? 0.32 : 0.68);
      sy = row * zoneH + zoneH * (row < rows / 2 ? 0.32 : 0.68);
      const ang = Math.atan2(side / 2 - sy, side / 2 - sx) + 0.4;
      dirX = Math.cos(ang);
      dirY = Math.sin(ang);
    }

    const spdStat = 125; // Matches "SPD 125" in reference HUD
    const basePxSpeed = (spdStat / 125) * (side * 0.0062);
    const lenNorm = Math.hypot(dirX, dirY) || 1;
    const maxHp = 5; // Matches "HP 5" in reference HUD
    const swordL = 0.8; // Matches "L 0.8" in reference HUD
    const teamIdx = gameState.teamMode === "teams" ? (idx % 4) : idx;

    return {
      index: idx + 1,
      id: c.id,
      name: c.name,
      color: gameState.teamMode === "teams" ? teamPastels[teamIdx] : c.color,
      trait: c.trait,
      traitName: c.traitName || "Balanced",
      team: teamIdx,
      isHuman: gameState.mode === "play" && idx === 0,
      x: sx,
      y: sy,
      vx: (dirX / lenNorm) * basePxSpeed,
      vy: (dirY / lenNorm) * basePxSpeed,
      r: ballRadius,
      hp: maxHp,
      maxHp,
      spdStat,
      baseSpeed: basePxSpeed,
      speedBoostTimer: 0,
      shieldTimer: 0,
      swords: 1,
      swordL,
      swordLength: ballRadius * 1.45 * (swordL / 0.8),
      swordDurability: 100,
      swordAngle: idx * 1.3,
      swordSpinSpeed: 0.095,
      barracks: 0,
      barracksTimer: 8,
      areaPct: +(100 / participants.length).toFixed(1),
      alive: true,
      hitCooldown: 0,
      dashCooldown: 0
    };
  });

  // Pre-paint quadrants/zones with zero gaps!
  prePaintEqualZones(gameState.players);
  recalculateTerritoryPercentages();
  updateHudLeaderboard();

  for (let i = 0; i < 3; i++) spawnPowerup();
  for (let i = 0; i < 2; i++) spawnCrate(false);

  if (gameState.mode === "play") {
    document.getElementById("play-controls").classList.remove("hidden");
  } else {
    document.getElementById("play-controls").classList.add("hidden");
  }

  // Auto-record if enabled
  lastRecordedBlob = null;
  document.getElementById("video-preview-box").classList.add("hidden");
  if (document.getElementById("chk-autorecord").checked) {
    startRecording();
  }
}

function spawnPowerup(x, y, forcedType) {
  const side = canvas.width;
  const types = ["barracks", "speed", "shield", "sword"];
  const type = forcedType || types[Math.floor(Math.random() * types.length)];
  gameState.powerups.push({
    x: x || (30 + Math.random() * (side - 60)),
    y: y || (30 + Math.random() * (side - 60)),
    r: 12,
    type
  });
}

function spawnCrate(isSupplyDrop = false) {
  const side = canvas.width;
  const x = isSupplyDrop ? side / 2 : (40 + Math.random() * (side - 80));
  const y = isSupplyDrop ? side / 2 : (40 + Math.random() * (side - 80));
  gameState.crates.push({
    x, y,
    r: isSupplyDrop ? 20 : 14,
    hp: isSupplyDrop ? 3 : 1.5,
    isSupplyDrop
  });
}

function paintTerritoryAt(player, pxX, pxY, radiusPx) {
  const side = canvas.width;
  const gx = Math.floor((pxX / side) * GRID_SIZE);
  const gy = Math.floor((pxY / side) * GRID_SIZE);
  const gr = Math.max(1, Math.ceil((radiusPx / side) * GRID_SIZE));
  let paintedNew = 0;

  gridCtx.fillStyle = player.color;
  for (let dy = -gr; dy <= gr; dy++) {
    for (let dx = -gr; dx <= gr; dx++) {
      // Blocky pixelated circle edge
      if (dx * dx + dy * dy <= gr * gr + 1) {
        const nx = gx + dx;
        const ny = gy + dy;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
          const idx = ny * GRID_SIZE + nx;
          if (territoryGrid[idx] !== player.index) {
            territoryGrid[idx] = player.index;
            gridCtx.fillRect(nx, ny, 1, 1);
            paintedNew++;
          }
        }
      }
    }
  }
  if (paintedNew > 0 && player.isHuman) {
    SaveData.daily[0].progress = Math.min(SaveData.daily[0].target, SaveData.daily[0].progress + paintedNew);
  }
}

function recalculateTerritoryPercentages() {
  const counts = new Uint32Array(gameState.players.length + 1);
  const total = territoryGrid.length;
  for (let i = 0; i < total; i++) {
    counts[territoryGrid[i]]++;
  }
  let lowestScore = Infinity;
  let underdog = null;
  const alivePlayers = gameState.players.filter(p => p.alive);

  gameState.players.forEach(p => {
    p.areaPct = +((counts[p.index] / total) * 100).toFixed(1);
    if (p.alive) {
      const score = p.areaPct + p.hp * 5;
      if (score < lowestScore) {
        lowestScore = score;
        underdog = p.id;
      }
    }
  });
  gameState.underdogId = alivePlayers.length > 2 ? underdog : null;
}

function addParticles(x, y, color, count = 8) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 1.5 + Math.random() * 3.5;
    gameState.particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      color,
      life: 0.3 + Math.random() * 0.2
    });
  }
}

function triggerShake(intensity = 4, hitStop = 0.04) {
  if (!document.getElementById("chk-shake").checked) return;
  gameState.shakeTimer = 0.12;
  gameState.shakeIntensity = intensity;
  gameState.hitStopTimer = hitStop;
}

function stepSimulation(dt) {
  if (!gameState.running) return;
  if (gameState.hitStopTimer > 0) {
    gameState.hitStopTimer -= dt;
    return;
  }
  if (gameState.shakeTimer > 0) gameState.shakeTimer -= dt;

  const side = canvas.width;
  gameState.timeRemaining = Math.max(0, gameState.timeRemaining - dt);

  // Shrinking Burn Zone (if enabled)
  const elapsed = gameState.totalTime - gameState.timeRemaining;
  if (document.getElementById("chk-shrinkzone").checked && elapsed > 30) {
    const shrinkFactor = Math.max(0.28, 1 - ((elapsed - 30) / (gameState.totalTime - 30)) * 0.72);
    gameState.safeZone.r = gameState.safeZone.maxR * shrinkFactor;
    document.getElementById("hud-zone-status").textContent = "🔥 Zone Shrinking";
  } else {
    gameState.safeZone.r = gameState.safeZone.maxR;
    document.getElementById("hud-zone-status").textContent = "Zone: Safe";
  }

  // Supply Drop in Center
  gameState.supplyDropTimer -= dt;
  if (gameState.supplyDropTimer <= 0) {
    gameState.supplyDropTimer = 32;
    spawnCrate(true);
    showBanner("📦 CENTER SUPPLY DROP SPAWNED!");
  }

  if (Math.random() < dt * 0.3 && gameState.powerups.length < 5) spawnPowerup();
  if (Math.random() < dt * 0.18 && gameState.crates.length < 4) spawnCrate(false);

  gameState.players.forEach(p => {
    if (!p.alive) return;

    if (p.hitCooldown > 0) p.hitCooldown -= dt;
    if (p.dashCooldown > 0) p.dashCooldown -= dt;
    if (p.speedBoostTimer > 0) p.speedBoostTimer -= dt;
    if (p.shieldTimer > 0) p.shieldTimer -= dt;

    // Land = Power: More territory % gives gradual HP regen & higher SPD stat
    const regenRate = (0.04 + (p.areaPct / 100) * 0.18) * (p.trait === "regen" ? 1.5 : 1);
    p.hp = Math.min(p.maxHp, p.hp + regenRate * dt);

    // Barracks bonus
    if (p.barracks > 0) {
      p.barracksTimer -= dt;
      if (p.barracksTimer <= 0) {
        p.barracksTimer = 8;
        p.hp = Math.min(p.maxHp, p.hp + 1);
        paintTerritoryAt(p, p.x, p.y, p.r * 2.2);
      }
    }

    const isUnderdog = gameState.underdogId === p.id;
    const areaSpdBonus = Math.round(p.areaPct * 0.4);
    p.spdStat = 125 + areaSpdBonus + (p.speedBoostTimer > 0 ? 35 : 0) + (isUnderdog ? 15 : 0);
    const currentSpeed = (p.spdStat / 125) * p.baseSpeed;

    if (p.isHuman && (joystick.dx !== 0 || joystick.dy !== 0)) {
      p.vx = joystick.dx * currentSpeed;
      p.vy = joystick.dy * currentSpeed;
    } else {
      const curMag = Math.hypot(p.vx, p.vy) || 1;
      p.vx = (p.vx / curMag) * currentSpeed;
      p.vy = (p.vy / curMag) * currentSpeed;
    }

    p.x += p.vx;
    p.y += p.vy;

    // Crisp wall bounces inside the square arena
    if (p.x - p.r < 0) { p.x = p.r; p.vx = Math.abs(p.vx); }
    if (p.x + p.r > side) { p.x = side - p.r; p.vx = -Math.abs(p.vx); }
    if (p.y - p.r < 0) { p.y = p.r; p.vy = Math.abs(p.vy); }
    if (p.y + p.r > side) { p.y = side - p.r; p.vy = -Math.abs(p.vy); }

    // Obstacles
    gameState.obstacles.forEach(ob => {
      if (p.x + p.r > ob.x && p.x - p.r < ob.x + ob.w && p.y + p.r > ob.y && p.y - p.r < ob.y + ob.h) {
        if (ob.type === "lava") {
          p.hp -= 0.8 * dt;
        } else {
          p.vx = -p.vx;
          p.vy = -p.vy;
          p.x += p.vx * 2;
          p.y += p.vy * 2;
        }
      }
    });

    // Burn zone damage
    const distFromCenter = Math.hypot(p.x - gameState.safeZone.x, p.y - gameState.safeZone.y);
    if (distFromCenter > gameState.safeZone.r) {
      p.hp -= 0.45 * dt;
    }

    // Rotate swords and paint land under both ball AND sword blade!
    p.swordAngle += p.swordSpinSpeed * (p.speedBoostTimer > 0 ? 1.25 : 1);
    paintTerritoryAt(p, p.x, p.y, p.r * 1.18);

    for (let s = 0; s < p.swords; s++) {
      const ang = p.swordAngle + (s * Math.PI * 2) / p.swords;
      const tipX = p.x + Math.cos(ang) * (p.r + p.swordLength * 0.75);
      const tipY = p.y + Math.sin(ang) * (p.r + p.swordLength * 0.75);
      paintTerritoryAt(p, tipX, tipY, p.r * 0.42);
    }

    // Pick up map powerups
    for (let i = gameState.powerups.length - 1; i >= 0; i--) {
      const pw = gameState.powerups[i];
      if (Math.hypot(p.x - pw.x, p.y - pw.y) < p.r + pw.r) {
        sfx.play("powerup");
        if (pw.type === "barracks") p.barracks = 1;
        if (pw.type === "speed") p.speedBoostTimer = 6;
        if (pw.type === "shield") p.shieldTimer = 6;
        if (pw.type === "sword") {
          p.swords = Math.min(3, p.swords + 1);
          p.swordL = +(Math.min(1.6, p.swordL + 0.2)).toFixed(1);
          p.swordLength = p.r * 1.45 * (p.swordL / 0.8);
          p.swordDurability = 100;
        }
        addParticles(pw.x, pw.y, "#fde047", 8);
        gameState.powerups.splice(i, 1);
      }
    }

    // Smash crates
    for (let i = gameState.crates.length - 1; i >= 0; i--) {
      const cr = gameState.crates[i];
      if (Math.hypot(p.x - cr.x, p.y - cr.y) < p.r + cr.r + p.swordLength * 0.7) {
        cr.hp -= 2 * dt * Math.max(1, p.swords);
        if (cr.hp <= 0) {
          sfx.play("break");
          addParticles(cr.x, cr.y, "#f59e0b", 12);
          if (cr.isSupplyDrop) {
            p.swords = Math.min(3, p.swords + 1);
            p.swordL = +(Math.min(1.6, p.swordL + 0.2)).toFixed(1);
            p.swordLength = p.r * 1.45 * (p.swordL / 0.8);
            p.hp = p.maxHp;
            p.barracks = 1;
            paintTerritoryAt(p, p.x, p.y, p.r * 3.2);
          } else {
            spawnPowerup(cr.x, cr.y);
          }
          gameState.crates.splice(i, 1);
        }
      }
    }
  });

  // Ball & Sword Collisions
  const n = gameState.players.length;
  for (let i = 0; i < n; i++) {
    const a = gameState.players[i];
    if (!a.alive) continue;
    for (let j = i + 1; j < n; j++) {
      const b = gameState.players[j];
      if (!b.alive) continue;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;

      // Elastic body bounce
      if (dist < a.r + b.r) {
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = (a.r + b.r - dist) * 0.5;
        a.x -= nx * overlap; a.y -= ny * overlap;
        b.x += nx * overlap; b.y += ny * overlap;
        a.vx = -nx * a.baseSpeed; a.vy = -ny * a.baseSpeed;
        b.vx = nx * b.baseSpeed; b.vy = ny * b.baseSpeed;
      }

      if (gameState.teamMode === "teams" && a.team === b.team) continue;

      const reachA = a.r + (a.swords > 0 ? a.swordLength : 0);
      const reachB = b.r + (b.swords > 0 ? b.swordLength : 0);

      if (dist < Math.max(reachA + b.r, reachB + a.r) && a.hitCooldown <= 0 && b.hitCooldown <= 0) {
        if (a.swords > 0 && b.swords > 0 && Math.random() < 0.42) {
          // Sword Clash!
          sfx.play("clash");
          triggerShake(3.5, 0.03);
          addParticles((a.x + b.x) / 2, (a.y + b.y) / 2, "#fde047", 9);
          a.swordDurability -= 34;
          b.swordDurability -= 34;

          if (a.swordDurability <= 0) {
            a.swords = Math.max(0, a.swords - 1);
            a.swordDurability = 100;
            sfx.play("break");
            if (b.isHuman) SaveData.daily[1].progress = Math.min(SaveData.daily[1].target, SaveData.daily[1].progress + 1);
          }
          if (b.swordDurability <= 0) {
            b.swords = Math.max(0, b.swords - 1);
            b.swordDurability = 100;
            sfx.play("break");
            if (a.isHuman) SaveData.daily[1].progress = Math.min(SaveData.daily[1].target, SaveData.daily[1].progress + 1);
          }
          if (a.swords === 0) setTimeout(() => { if (a.alive && a.swords === 0) a.swords = 1; }, 3200);
          if (b.swords === 0) setTimeout(() => { if (b.alive && b.swords === 0) b.swords = 1; }, 3200);
        } else {
          // Sword Hit on Enemy Ball (-1 HP on the 5 HP scale)
          sfx.play("hit");
          triggerShake(5, 0.04);
          if (a.swords > 0 && dist < reachA + b.r && b.shieldTimer <= 0) {
            b.hp = Math.max(0, b.hp - 1);
            addParticles(b.x, b.y, b.color, 10);
          }
          if (b.swords > 0 && dist < reachB + a.r && a.shieldTimer <= 0) {
            a.hp = Math.max(0, a.hp - 1);
            addParticles(a.x, a.y, a.color, 10);
          }
        }

        const nx = dx / dist;
        const ny = dy / dist;
        a.vx = -nx * a.baseSpeed * 1.35;
        a.vy = -ny * a.baseSpeed * 1.35;
        b.vx = nx * b.baseSpeed * 1.35;
        b.vy = ny * b.baseSpeed * 1.35;
        a.hitCooldown = 0.26;
        b.hitCooldown = 0.26;
      }
    }
  }

  // Eliminations
  gameState.players.forEach(p => {
    if (p.alive && p.hp <= 0.05) {
      p.alive = false;
      p.hp = 0;
      gameState.eliminationOrder.push(p);
      sfx.play("break");
      addParticles(p.x, p.y, p.color, 20);
      showBanner(`💀 ${p.name} Eliminated!`);
    }
  });

  // Update particles
  for (let i = gameState.particles.length - 1; i >= 0; i--) {
    const pt = gameState.particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life -= dt;
    if (pt.life <= 0) gameState.particles.splice(i, 1);
  }

  recalculateTerritoryPercentages();

  const alive = gameState.players.filter(p => p.alive);
  const aliveTeams = new Set(alive.map(p => p.team));
  if (alive.length <= 1 || (gameState.teamMode === "teams" && aliveTeams.size <= 1) || gameState.timeRemaining <= 0) {
    finishMatch();
  }
}

function renderGame() {
  const side = canvas.width;
  ctx.save();

  if (gameState.shakeTimer > 0) {
    const sx = (Math.random() - 0.5) * gameState.shakeIntensity * 2;
    const sy = (Math.random() - 0.5) * gameState.shakeIntensity * 2;
    ctx.translate(sx, sy);
  }

  // 1. Draw blocky pixelated territory grid
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(gridCanvas, 0, 0, side, side);

  // 2. Optional thin white center crosshair (shows original quadrant split)
  if (document.getElementById("chk-crosshair").checked) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
    ctx.lineWidth = 1;
    for (let c = 1; c < gameState.gridCols; c++) {
      const x = (side / gameState.gridCols) * c;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, side); ctx.stroke();
    }
    for (let r = 1; r < gameState.gridRows; r++) {
      const y = (side / gameState.gridRows) * r;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(side, y); ctx.stroke();
    }
  }

  // 3. Obstacles
  gameState.obstacles.forEach(ob => {
    ctx.fillStyle = ob.type === "lava" ? "#dc2626" : "#1e293b";
    ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
    ctx.strokeStyle = ob.type === "lava" ? "#f97316" : "#94a3b8";
    ctx.lineWidth = 2;
    ctx.strokeRect(ob.x, ob.y, ob.w, ob.h);
  });

  // 4. Powerups & Crates
  const icons = { barracks: "🏰", speed: "⚡", shield: "🛡️", sword: "🗡️" };
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  gameState.powerups.forEach(pw => {
    ctx.beginPath();
    ctx.arc(pw.x, pw.y, pw.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillText(icons[pw.type] || "⭐", pw.x, pw.y);
  });

  gameState.crates.forEach(cr => {
    ctx.fillStyle = cr.isSupplyDrop ? "#eab308" : "#78350f";
    ctx.fillRect(cr.x - cr.r, cr.y - cr.r, cr.r * 2, cr.r * 2);
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 2;
    ctx.strokeRect(cr.x - cr.r, cr.y - cr.r, cr.r * 2, cr.r * 2);
    ctx.fillText(cr.isSupplyDrop ? "🪂" : "📦", cr.x, cr.y);
  });

  // 5. Country Balls with FULL-BLEED Flag Inside + White Outline + Thin Sword + Green HP Bar
  const skin = SWORD_SKINS.find(s => s.id === SaveData.equippedSkin) || SWORD_SKINS[0];

  gameState.players.forEach(p => {
    if (!p.alive) return;

    // Thin attached sword(s) with guard & blade
    for (let s = 0; s < p.swords; s++) {
      const ang = p.swordAngle + (s * Math.PI * 2) / p.swords;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(ang);

      // Hilt / Guard
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(p.r - 2, -5, 4, 10);

      // Thin pointed sword blade
      ctx.beginPath();
      ctx.moveTo(p.r + 2, -2.6);
      ctx.lineTo(p.r + p.swordLength - 5, -2.2);
      ctx.lineTo(p.r + p.swordLength + 2, 0);
      ctx.lineTo(p.r + p.swordLength - 5, 2.2);
      ctx.lineTo(p.r + 2, 2.6);
      ctx.closePath();
      ctx.fillStyle = p.isHuman ? skin.color : "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // Full-Bleed Circular Flag Inside Ball
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.clip();

    const flagCan = flagCanvasCache[p.id];
    if (flagCan) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(flagCan, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    ctx.restore();

    // Crisp White Outline Around Ball
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.strokeStyle = p.shieldTimer > 0 ? "#38bdf8" : "#ffffff";
    ctx.lineWidth = p.shieldTimer > 0 ? 3.5 : 2.2;
    ctx.stroke();

    // Small Green HP Bar Directly Above Ball
    const barW = p.r * 1.75;
    const barH = 4.5;
    const barX = p.x - barW / 2;
    const barY = p.y - p.r - 9;
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(barX, barY, barW * Math.max(0, p.hp / p.maxHp), barH);
  });

  // 6. Particles
  gameState.particles.forEach(pt => {
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 7. Shrinking Zone Ring (only when shrinking)
  if (gameState.safeZone.r < gameState.safeZone.maxR * 0.98) {
    ctx.beginPath();
    ctx.arc(gameState.safeZone.x, gameState.safeZone.y, gameState.safeZone.r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();

  // Also update composite recording frame if recording is active
  if (isRecordingActive) {
    renderCompositeRecordingFrame();
  }
}

/* --- LIVE COLORED HUD CARDS ABOVE ARENA --- */
function updateHudLeaderboard() {
  const timerEl = document.getElementById("hud-timer");
  const mins = Math.floor(gameState.timeRemaining / 60);
  const secs = Math.floor(gameState.timeRemaining % 60);
  timerEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  // For 4 players, keep them in their fixed quadrant order (Turkey, USA, Brazil, Germany)
  const displayList = gameState.players.length <= 4
    ? gameState.players
    : [...gameState.players].sort((a, b) => (b.alive - a.alive) || (b.areaPct - a.areaPct)).slice(0, 4);

  const container = document.getElementById("hud-leaderboard");
  container.innerHTML = displayList.map(p => `
    <div class="hud-country-card ${p.alive ? "" : "eliminated"}" style="background:${p.color}">
      <div class="hud-card-top">
        <img class="hud-flag-circle" src="${flagDataUrlCache[p.id] || ""}" alt="${p.name}" />
        <span class="hud-country-name">${p.name}</span>
      </div>
      <div class="hud-stat-line">HP ${Math.ceil(p.hp)} &nbsp;AREA ${p.areaPct.toFixed(1)}%</div>
      <div class="hud-stat-line">SWORDS ${p.swords} &nbsp;L ${p.swordL.toFixed(1)}</div>
      <div class="hud-stat-line">SPD ${Math.round(p.spdStat)}</div>
      <div class="hud-stat-line">BARRACKS ${p.barracks > 0 ? "YES" : "NO"}</div>
    </div>
  `).join("");
}

/* --- 60 FPS GAME LOOP --- */
let lastFrameTime = performance.now();
let hudTick = 0;

function gameLoop(now) {
  requestAnimationFrame(gameLoop);
  const elapsed = (now - lastFrameTime) / 1000;
  if (elapsed < 1 / 62) return;
  const dt = Math.min(0.05, elapsed);
  lastFrameTime = now;

  if (gameState.running) {
    for (let s = 0; s < gameState.simSpeed; s++) {
      stepSimulation(dt);
    }
    renderGame();
    hudTick += dt;
    if (hudTick > 0.18) {
      hudTick = 0;
      updateHudLeaderboard();
    }
  }
}
requestAnimationFrame(gameLoop);

/* --- MATCH FINISH --- */
function finishMatch() {
  gameState.running = false;
  if (isRecordingActive) stopRecording();
  sfx.play("win");

  const sortedAlive = gameState.players
    .filter(p => p.alive)
    .sort((a, b) => b.areaPct - a.areaPct || b.hp - a.hp);

  const winner = sortedAlive[0] || gameState.eliminationOrder[gameState.eliminationOrder.length - 1] || gameState.players[0];
  const remainingAlive = sortedAlive.slice().reverse();
  const fullFinishOrder = [...gameState.eliminationOrder, ...remainingAlive]; // [1st Elim, 2nd Elim, Runner-Up, Winner]

  SaveData.coins += 35;

  let predText = `Territory Controlled: ${winner.areaPct.toFixed(1)}% • HP: ${Math.ceil(winner.hp)}`;
  if (gameState.mode === "watch" && gameState.predictedId) {
    if (winner.id === gameState.predictedId) {
      SaveData.streak++;
      SaveData.coins += 60;
      SaveData.daily[2].progress = 1;
      predText = `🎯 Correct Prediction! Streak: 🔥 ${SaveData.streak} (+60 Coins)`;
    } else {
      SaveData.streak = 0;
      predText = `❌ Prediction Missed! Streak reset to 0.`;
    }
  }
  SaveData.save();

  if (gameState.contextMode === "tournament") {
    handleTournamentMatchResult(winner);
  } else if (gameState.contextMode === "league") {
    handleLeagueMatchResult(fullFinishOrder);
  }

  document.getElementById("res-title").textContent = "🏆 Match Champion!";
  document.getElementById("res-winner-badge").innerHTML = `
    <img class="hud-flag-circle" style="width:32px;height:32px" src="${flagDataUrlCache[winner.id] || ""}" />
    <span>${winner.name}</span>
  `;
  document.getElementById("res-prediction-text").textContent = predText;
  document.getElementById("modal-result").classList.remove("hidden");
}

/* ============================================================================
 * TOURNAMENT MODE WITH PARTICIPATING COUNTRY SELECTOR
 * ============================================================================ */
let tourneyState = null;
let selectedTourneyCountryIds = new Set(DEFAULT_COUNTRIES.slice(0, 16).map(c => c.id));

function renderTourneyCountryPicker() {
  const targetSize = parseInt(document.getElementById("sel-tourney-size").value, 10);
  const all = getAllCountries();
  document.getElementById("picker-count-label").textContent =
    `Selected: ${selectedTourneyCountryIds.size} Countries (Bracket Size: ${targetSize})`;

  const grid = document.getElementById("tourney-country-grid");
  grid.innerHTML = all.map(c => {
    const isSel = selectedTourneyCountryIds.has(c.id);
    return `
      <button class="picker-chip ${isSel ? "selected" : ""}" data-cid="${c.id}">
        <img class="hud-flag-circle" src="${flagDataUrlCache[c.id] || ""}" />
        <span>${c.name}</span>
      </button>
    `;
  }).join("");

  grid.querySelectorAll(".picker-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const cid = btn.dataset.cid;
      if (selectedTourneyCountryIds.has(cid)) {
        selectedTourneyCountryIds.delete(cid);
      } else {
        selectedTourneyCountryIds.add(cid);
      }
      renderTourneyCountryPicker();
    });
  });
}

document.getElementById("btn-toggle-picker").addEventListener("click", () => {
  const box = document.getElementById("tourney-picker-box");
  box.classList.toggle("hidden");
  renderTourneyCountryPicker();
});

document.getElementById("btn-picker-all").addEventListener("click", () => {
  getAllCountries().forEach(c => selectedTourneyCountryIds.add(c.id));
  renderTourneyCountryPicker();
});

document.getElementById("btn-picker-clear").addEventListener("click", () => {
  selectedTourneyCountryIds.clear();
  renderTourneyCountryPicker();
});

document.getElementById("btn-picker-random").addEventListener("click", () => {
  const size = parseInt(document.getElementById("sel-tourney-size").value, 10);
  const shuffled = [...getAllCountries()].sort(() => Math.random() - 0.5);
  selectedTourneyCountryIds = new Set(shuffled.slice(0, Math.min(size, shuffled.length)).map(c => c.id));
  renderTourneyCountryPicker();
});

function generateTournamentRoster(size) {
  const all = getAllCountries();
  let chosenPool = all.filter(c => selectedTourneyCountryIds.has(c.id));
  if (chosenPool.length === 0) chosenPool = all;

  const roster = [];
  for (let i = 0; i < size; i++) {
    const template = chosenPool[i % chosenPool.length];
    const cloneId = i < chosenPool.length ? template.id : `${template.id}_${i}`;
    if (!flagCanvasCache[cloneId]) {
      flagCanvasCache[cloneId] = flagCanvasCache[template.id];
      flagDataUrlCache[cloneId] = flagDataUrlCache[template.id];
    }
    roster.push({
      ...template,
      id: cloneId,
      name: i < chosenPool.length ? template.name : `${template.name} #${Math.floor(i / chosenPool.length) + 1}`
    });
  }
  return roster;
}

function startNewTournament() {
  const size = parseInt(document.getElementById("sel-tourney-size").value, 10);
  const roster = generateTournamentRoster(size);
  const groups = [];
  for (let i = 0; i < roster.length; i += 4) {
    groups.push({
      name: `Group ${String.fromCharCode(65 + (i / 4) % 26)}${i >= 104 ? Math.floor(i / 104) : ""}`,
      teams: roster.slice(i, i + 4),
      winner: null
    });
  }
  tourneyState = {
    size,
    roundName: `Group Stage (${groups.length} Groups of 4)`,
    groups,
    currentGroupIdx: 0,
    champion: null
  };
  renderTournamentUI();
}

function renderTournamentUI() {
  if (!tourneyState) return;
  const info = document.getElementById("tourney-stage-info");
  const container = document.getElementById("tourney-brackets");
  const btnPlay = document.getElementById("btn-play-next-tourney");
  const btnSim = document.getElementById("btn-sim-tourney-round");

  if (tourneyState.champion) {
    info.innerHTML = `<h3 style="color:#fde047">👑 Tournament Champion: ${tourneyState.champion.name}!</h3>`;
    btnPlay.classList.add("hidden");
    btnSim.classList.add("hidden");
  } else {
    info.innerHTML = `<strong>${tourneyState.roundName}</strong> — Match ${tourneyState.currentGroupIdx + 1} of ${tourneyState.groups.length}`;
    btnPlay.classList.remove("hidden");
    btnSim.classList.remove("hidden");
  }

  container.innerHTML = tourneyState.groups.map((g, idx) => `
    <div class="group-box" style="${idx === tourneyState.currentGroupIdx && !tourneyState.champion ? "border-color:#38bdf8" : ""}">
      <h4>${g.name}</h4>
      ${g.teams.map(t => `
        <div class="group-team-row" style="${g.winner && g.winner.id === t.id ? "color:#22c55e;font-weight:800" : ""}">
          <img class="hud-flag-circle" style="width:14px;height:14px" src="${flagDataUrlCache[t.id] || ""}" />
          <span>${t.name}</span>
        </div>
      `).join("")}
      ${g.winner ? `<div style="margin-top:4px;color:#fde047;font-size:10.5px">✔ Advancing: ${g.winner.name}</div>` : ""}
    </div>
  `).join("");
}

function advanceTournamentRoundIfReady() {
  if (tourneyState.currentGroupIdx < tourneyState.groups.length) return;
  const winners = tourneyState.groups.map(g => g.winner);
  if (winners.length === 1) {
    tourneyState.champion = winners[0];
    SaveData.coins += 250;
    SaveData.save();
    return;
  }
  const step = winners.length >= 4 ? 4 : 2;
  const nextGroups = [];
  for (let i = 0; i < winners.length; i += step) {
    nextGroups.push({
      name: winners.length <= 4 ? "Grand Final" : `Knockout ${i / step + 1}`,
      teams: winners.slice(i, i + step),
      winner: null
    });
  }
  tourneyState.groups = nextGroups;
  tourneyState.currentGroupIdx = 0;
  tourneyState.roundName = winners.length <= 4 ? "Grand Final" : `Knockout Stage (${winners.length} Left)`;
}

function handleTournamentMatchResult(winner) {
  if (!tourneyState) return;
  const grp = tourneyState.groups[tourneyState.currentGroupIdx];
  if (grp) grp.winner = winner;
  tourneyState.currentGroupIdx++;
  advanceTournamentRoundIfReady();
  renderTournamentUI();
}

/* ============================================================================
 * LEAGUE MODE WITH FULL STANDINGS (Points, Wins, Runner-Up, 2nd Elim, 1st Elim)
 * ============================================================================ */
let leagueState = null;

function startNewLeague() {
  const size = parseInt(document.getElementById("sel-league-size").value, 10);
  const all = getAllCountries();
  const roster = all.slice(0, size).map(c => ({
    ...c,
    mp: 0,
    wins: 0,
    runnerUp: 0,
    secondElim: 0,
    firstElim: 0,
    pts: 0
  }));

  const fixtures = [];
  for (let round = 1; round <= 5; round++) {
    const shuffled = [...roster].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffled.length; i += 4) {
      fixtures.push({ round, teams: shuffled.slice(i, i + 4), played: false });
    }
  }
  leagueState = { size, table: roster, fixtures, currentFixtureIdx: 0 };
  renderLeagueUI();
}

function applyLeaguePoints(orderedFour) {
  // orderedFour = [1st Eliminated (1pt), 2nd Eliminated (2pt), Runner-Up (3pt), Winner (4pt)]
  orderedFour.forEach((team, idx) => {
    const row = leagueState.table.find(r => r.id === team.id);
    if (!row) return;
    row.mp++;
    if (idx === 0) { row.firstElim++; row.pts += 1; }
    else if (idx === 1) { row.secondElim++; row.pts += 2; }
    else if (idx === 2) { row.runnerUp++; row.pts += 3; }
    else { row.wins++; row.pts += 4; }
  });
}

function handleLeagueMatchResult(fullFinishOrder) {
  if (!leagueState) return;
  applyLeaguePoints(fullFinishOrder);
  leagueState.fixtures[leagueState.currentFixtureIdx].played = true;
  leagueState.currentFixtureIdx++;
  renderLeagueUI();
}

function renderLeagueUI() {
  if (!leagueState) return;
  const sorted = [...leagueState.table].sort((a, b) => b.pts - a.pts || b.wins - a.wins || b.runnerUp - a.runnerUp);

  document.getElementById("league-tbody").innerHTML = sorted.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>
        <div style="display:flex;align-items:center;gap:5px">
          <img class="hud-flag-circle" style="width:15px;height:15px" src="${flagDataUrlCache[r.id] || ""}" />
          <strong>${r.name}</strong>
        </div>
      </td>
      <td>${r.mp}</td>
      <td style="color:#4ade80;font-weight:700">${r.wins}</td>
      <td style="color:#60a5fa">${r.runnerUp}</td>
      <td style="color:#cbd5e1">${r.secondElim}</td>
      <td style="color:#f87171">${r.firstElim}</td>
      <td style="color:#fde047;font-weight:900">${r.pts}</td>
    </tr>
  `).join("");

  const info = document.getElementById("league-fixture-info");
  const btnPlay = document.getElementById("btn-play-league-match");
  const btnSim = document.getElementById("btn-sim-league-round");

  if (leagueState.currentFixtureIdx >= leagueState.fixtures.length) {
    info.innerHTML = `<h3 style="color:#fde047">🏆 League Champion: ${sorted[0].name} (${sorted[0].pts} pts)!</h3>`;
    btnPlay.classList.add("hidden");
    btnSim.classList.add("hidden");
  } else {
    const fx = leagueState.fixtures[leagueState.currentFixtureIdx];
    info.innerHTML = `Match ${leagueState.currentFixtureIdx + 1}/${leagueState.fixtures.length}: ` +
      fx.teams.map(t => t.name).join(" vs ");
    btnPlay.classList.remove("hidden");
    btnSim.classList.remove("hidden");
  }
}

/* ============================================================================
 * MENU & UI EVENT WIRING
 * ============================================================================ */
function updateMenuMeta() {
  buildAllFlagCaches();
  document.getElementById("streak-badge").textContent = `🔥 Streak: ${SaveData.streak}`;
  document.getElementById("coins-badge").textContent = `🪙 Coins: ${SaveData.coins}`;

  const arenaSel = document.getElementById("sel-arena");
  arenaSel.innerHTML = ARENAS.map(a => {
    const unlocked = SaveData.unlockedArenas.includes(a.id);
    return `<option value="${a.id}" ${unlocked ? "" : "disabled"}>${a.name} ${unlocked ? "" : "🔒"}</option>`;
  }).join("");

  const countrySel = document.getElementById("sel-user-country");
  countrySel.innerHTML = getAllCountries().map(c => `<option value="${c.id}">${c.name} (${c.traitName})</option>`).join("");
}
updateMenuMeta();

function pickMatchParticipants() {
  const count = parseInt(document.getElementById("sel-player-count").value, 10);
  const all = getAllCountries();

  // For 4 players, default to the exact reference quartet (Turkey, USA, Brazil, Germany)
  // unless the user specifically selected a different country for Play Mode
  if (count === 4) {
    const userChoice = document.getElementById("sel-user-country").value;
    const refFour = [all[0], all[1], all[2], all[3]]; // Turkey, USA, Brazil, Germany
    if (refFour.some(c => c.id === userChoice)) {
      return refFour;
    }
    const chosen = all.find(c => c.id === userChoice) || all[0];
    return [chosen, all[1], all[2], all[3]];
  }

  const userChoice = document.getElementById("sel-user-country").value;
  const chosen = all.find(c => c.id === userChoice) || all[0];
  const others = all.filter(c => c.id !== chosen.id);
  return [chosen, ...others.slice(0, count - 1)];
}

// Watch Mode
document.getElementById("btn-watch-mode").addEventListener("click", () => {
  const lineup = pickMatchParticipants();
  const grid = document.getElementById("predict-grid");
  grid.innerHTML = lineup.map(c => `
    <button class="predict-item" data-id="${c.id}">
      <img class="hud-flag-circle" style="width:28px;height:28px" src="${flagDataUrlCache[c.id] || ""}" />
      <div>
        <strong>${c.name}</strong>
        <small style="display:block;color:#94a3b8;font-size:10px">${c.traitName}</small>
      </div>
    </button>
  `).join("");

  grid.querySelectorAll(".predict-item").forEach(btn => {
    btn.addEventListener("click", () => {
      gameState.predictedId = btn.dataset.id;
      document.getElementById("modal-predict").classList.add("hidden");
      setupMatch(lineup, { mode: "watch", contextMode: "quick" });
    });
  });
  document.getElementById("modal-predict").classList.remove("hidden");
});

// Play Mode
document.getElementById("btn-play-mode").addEventListener("click", () => {
  const lineup = pickMatchParticipants();
  gameState.predictedId = null;
  setupMatch(lineup, { mode: "play", contextMode: "quick" });
});

// Match Utility Buttons
document.getElementById("btn-exit-match").addEventListener("click", () => {
  gameState.running = false;
  if (isRecordingActive) stopRecording();
  document.getElementById("match-screen").classList.add("hidden");
  document.getElementById("menu-screen").classList.remove("hidden");
});

document.getElementById("btn-speed-toggle").addEventListener("click", e => {
  gameState.simSpeed = gameState.simSpeed === 1 ? 2 : 1;
  e.target.textContent = `${gameState.simSpeed}x`;
});

document.getElementById("btn-record-toggle").addEventListener("click", toggleRecording);

// Result Modal Buttons
document.getElementById("btn-share-video").addEventListener("click", shareOrDownloadVideo);

document.getElementById("btn-watch-ad-bonus").addEventListener("click", () => {
  showRewardedAd(() => {
    SaveData.coins += 100;
    SaveData.save();
    alert("🎉 +100 Coins Added!");
  });
});

document.getElementById("btn-result-continue").addEventListener("click", () => {
  document.getElementById("modal-result").classList.add("hidden");
  document.getElementById("match-screen").classList.add("hidden");
  document.getElementById("menu-screen").classList.remove("hidden");
  if (gameState.contextMode === "tournament") {
    document.getElementById("modal-tournament").classList.remove("hidden");
  } else if (gameState.contextMode === "league") {
    document.getElementById("modal-league").classList.remove("hidden");
  }
});

// Tournament Modal
document.getElementById("btn-tournament-mode").addEventListener("click", () => {
  if (!tourneyState) startNewTournament();
  renderTourneyCountryPicker();
  document.getElementById("modal-tournament").classList.remove("hidden");
});
document.getElementById("btn-start-tourney").addEventListener("click", startNewTournament);
document.getElementById("btn-play-next-tourney").addEventListener("click", () => {
  if (!tourneyState || tourneyState.champion) return;
  const grp = tourneyState.groups[tourneyState.currentGroupIdx];
  document.getElementById("modal-tournament").classList.add("hidden");
  setupMatch(grp.teams, { mode: "watch", contextMode: "tournament", teamMode: "ffa" });
});
document.getElementById("btn-sim-tourney-round").addEventListener("click", () => {
  if (!tourneyState || tourneyState.champion) return;
  while (tourneyState.currentGroupIdx < tourneyState.groups.length) {
    const grp = tourneyState.groups[tourneyState.currentGroupIdx];
    grp.winner = grp.teams[Math.floor(Math.random() * grp.teams.length)];
    tourneyState.currentGroupIdx++;
  }
  advanceTournamentRoundIfReady();
  renderTournamentUI();
});

// League Modal
document.getElementById("btn-league-mode").addEventListener("click", () => {
  if (!leagueState) startNewLeague();
  document.getElementById("modal-league").classList.remove("hidden");
});
document.getElementById("btn-start-league").addEventListener("click", startNewLeague);
document.getElementById("btn-play-league-match").addEventListener("click", () => {
  if (!leagueState || leagueState.currentFixtureIdx >= leagueState.fixtures.length) return;
  const fx = leagueState.fixtures[leagueState.currentFixtureIdx];
  document.getElementById("modal-league").classList.add("hidden");
  setupMatch(fx.teams, { mode: "watch", contextMode: "league", teamMode: "ffa" });
});
document.getElementById("btn-sim-league-round").addEventListener("click", () => {
  if (!leagueState) return;
  let count = 0;
  while (leagueState.currentFixtureIdx < leagueState.fixtures.length && count < 4) {
    const fx = leagueState.fixtures[leagueState.currentFixtureIdx];
    const shuffled = [...fx.teams].sort(() => Math.random() - 0.5);
    applyLeaguePoints(shuffled);
    fx.played = true;
    leagueState.currentFixtureIdx++;
    count++;
  }
  renderLeagueUI();
});

// Daily Challenges
document.getElementById("btn-daily-modal").addEventListener("click", () => {
  const list = document.getElementById("daily-list");
  list.innerHTML = SaveData.daily.map(d => `
    <div class="list-card">
      <div>
        <strong>${d.desc}</strong>
        <div class="small-note">Progress: ${d.progress} / ${d.target} • Reward: 🪙 ${d.reward}</div>
      </div>
      <button class="action-btn" data-claim="${d.id}" ${d.progress >= d.target && !d.claimed ? "" : "disabled"}>
        ${d.claimed ? "Claimed" : "Claim"}
      </button>
    </div>
  `).join("");
  list.querySelectorAll("[data-claim]").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = SaveData.daily.find(x => x.id === btn.dataset.claim);
      if (item && !item.claimed) {
        item.claimed = true;
        SaveData.coins += item.reward;
        SaveData.save();
        document.getElementById("btn-daily-modal").click();
      }
    });
  });
  document.getElementById("modal-daily").classList.remove("hidden");
});

// Shop Modal
function renderShop() {
  const list = document.getElementById("shop-list");
  const arenaItems = ARENAS.filter(a => a.cost > 0).map(a => {
    const owned = SaveData.unlockedArenas.includes(a.id);
    return `
      <div class="list-card">
        <div>
          <strong>🏟️ Arena: ${a.name}</strong>
          <div class="small-note">${owned ? "Unlocked" : `Cost: 🪙 ${a.cost} or Watch Ad`}</div>
        </div>
        ${owned ? `<span style="color:#22c55e;font-weight:800">✔ Owned</span>` : `<button class="action-btn ad-btn" data-unlock-arena="${a.id}">🎬 Unlock</button>`}
      </div>
    `;
  });

  const skinItems = SWORD_SKINS.map(s => {
    const owned = SaveData.unlockedSkins.includes(s.id);
    const active = SaveData.equippedSkin === s.id;
    return `
      <div class="list-card">
        <div>
          <strong style="color:${s.color}">🗡️ Sword: ${s.name}</strong>
          <div class="small-note">${owned ? "Unlocked" : `Cost: 🪙 ${s.cost} or Watch Ad`}</div>
        </div>
        ${owned
          ? `<button class="action-btn ${active ? "secondary" : ""}" data-equip-skin="${s.id}">${active ? "Equipped" : "Equip"}</button>`
          : `<button class="action-btn ad-btn" data-unlock-skin="${s.id}">🎬 Unlock</button>`}
      </div>
    `;
  });

  list.innerHTML = [...arenaItems, ...skinItems].join("");

  list.querySelectorAll("[data-unlock-arena]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.unlockArena;
      showRewardedAd(() => {
        if (!SaveData.unlockedArenas.includes(id)) SaveData.unlockedArenas.push(id);
        SaveData.save();
        renderShop();
      });
    });
  });

  list.querySelectorAll("[data-unlock-skin]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.unlockSkin;
      showRewardedAd(() => {
        if (!SaveData.unlockedSkins.includes(id)) SaveData.unlockedSkins.push(id);
        SaveData.equippedSkin = id;
        SaveData.save();
        renderShop();
      });
    });
  });

  list.querySelectorAll("[data-equip-skin]").forEach(btn => {
    btn.addEventListener("click", () => {
      SaveData.equippedSkin = btn.dataset.equipSkin;
      SaveData.save();
      renderShop();
    });
  });
}

document.getElementById("btn-shop-modal").addEventListener("click", () => {
  renderShop();
  document.getElementById("modal-shop").classList.remove("hidden");
});

// Custom Country Creator
let pendingCustomImage = null;
document.getElementById("inp-custom-flag").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 128; c.height = 128;
      c.getContext("2d").drawImage(img, 0, 0, 128, 128);
      pendingCustomImage = c.toDataURL("image/png");
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById("btn-custom-modal").addEventListener("click", () => {
  document.getElementById("modal-custom").classList.remove("hidden");
});

document.getElementById("btn-save-custom").addEventListener("click", () => {
  const name = document.getElementById("inp-custom-name").value.trim() || "Custom Squad";
  const color = document.getElementById("inp-custom-color").value;
  const trait = document.getElementById("inp-custom-trait").value;
  const newCountry = {
    id: "cust_" + Date.now(),
    name,
    color,
    trait,
    traitName: `Custom (${trait.toUpperCase()})`,
    imgData: pendingCustomImage
  };
  SaveData.customCountries.unshift(newCountry);
  selectedTourneyCountryIds.add(newCountry.id);
  SaveData.save();
  pendingCustomImage = null;
  document.getElementById("inp-custom-name").value = "";
  alert(`✅ Added "${name}" with full circular flag!`);
  document.getElementById("modal-custom").classList.add("hidden");
});

// Settings
document.getElementById("btn-settings-modal").addEventListener("click", () => {
  document.getElementById("modal-settings").classList.remove("hidden");
});
document.getElementById("chk-sound").addEventListener("change", e => {
  sfx.enabled = e.target.checked;
});

document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).classList.add("hidden");
  });
});

/* --- VIRTUAL JOYSTICK --- */
const joyZone = document.getElementById("joystick-zone");
const joyKnob = document.getElementById("joystick-knob");

function handleJoyMove(clientX, clientY) {
  const rect = joyZone.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const maxDist = 38;
  let dx = clientX - cx;
  let dy = clientY - cy;
  const dist = Math.hypot(dx, dy) || 1;
  if (dist > maxDist) {
    dx = (dx / dist) * maxDist;
    dy = (dy / dist) * maxDist;
  }
  joyKnob.style.transform = `translate(${dx}px, ${dy}px)`;
  joystick.dx = dx / maxDist;
  joystick.dy = dy / maxDist;
}

joyZone.addEventListener("touchstart", e => {
  e.preventDefault();
  joystick.active = true;
  handleJoyMove(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

joyZone.addEventListener("touchmove", e => {
  e.preventDefault();
  if (joystick.active) handleJoyMove(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: false });

joyZone.addEventListener("touchend", () => {
  joystick.active = false;
  joystick.dx = 0;
  joystick.dy = 0;
  joyKnob.style.transform = "translate(0px, 0px)";
});

document.getElementById("btn-dash-ability").addEventListener("click", () => {
  const human = gameState.players.find(p => p.isHuman && p.alive);
  if (human && human.dashCooldown <= 0) {
    human.speedBoostTimer = 2.5;
    human.dashCooldown = 5;
    sfx.play("powerup");
  }
});
