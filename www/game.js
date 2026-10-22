/* ============================================================================
 * SWORD TERRITORY: BLADE & BORDER - FULL MOBILE ENGINE
 * Low-res Uint8Array paint grid, 60 FPS cap, Web Audio synth, Canvas Recorder,
 * Watch & Play Modes, 16-128 Tournament, 16-24 League, Google AdMob Test Ads.
 * ============================================================================ */

const ADMOB_TEST_IDS = {
  APP_ID: "ca-app-pub-3940256099942544~3347511713",
  REWARDED_ID: "ca-app-pub-3940256099942544/5224354917"
};

// 32 Built-in Countries with Iconic Colors, Emojis & Special Abilities
const DEFAULT_COUNTRIES = [
  { id: "dz", name: "Algeria", flag: "🇩🇿", color: "#10b981", bands: ["#10b981", "#ffffff", "#ef4444"], trait: "speed", traitName: "Desert Blitz (+18% Speed)" },
  { id: "br", name: "Brazil", flag: "🇧🇷", color: "#22c55e", bands: ["#22c55e", "#facc15", "#1d4ed8"], trait: "regen", traitName: "Jungle Turf (2x Land Heal)" },
  { id: "jp", name: "Japan", flag: "🇯🇵", color: "#f43f5e", bands: ["#ffffff", "#e11d48", "#ffffff"], trait: "blade", traitName: "Katana Master (Long Blade)" },
  { id: "us", name: "USA", flag: "🇺🇸", color: "#3b82f6", bands: ["#1d4ed8", "#ffffff", "#ef4444"], trait: "shield", traitName: "Aegis Drop (Starts Shielded)" },
  { id: "de", name: "Germany", flag: "🇩🇪", color: "#eab308", bands: ["#171717", "#dc2626", "#facc15"], trait: "tank", traitName: "Iron Hull (+35 Max HP)" },
  { id: "fr", name: "France", flag: "🇫🇷", color: "#6366f1", bands: ["#1d4ed8", "#ffffff", "#ef4444"], trait: "dual", traitName: "Twin Rapier (2 Swords)" },
  { id: "gb", name: "UK", flag: "🇬🇧", color: "#ef4444", bands: ["#1e3a8a", "#ffffff", "#dc2626"], trait: "knock", traitName: "Royal Guard (Heavy Bash)" },
  { id: "tr", name: "Turkey", flag: "🇹🇷", color: "#dc2626", bands: ["#dc2626", "#ffffff", "#dc2626"], trait: "fury", traitName: "Janissary Fury (Low-HP Rage)" },
  { id: "it", name: "Italy", flag: "🇮🇹", color: "#14b8a6", bands: ["#16a34a", "#ffffff", "#dc2626"], trait: "speed", traitName: "Centurion Sprint" },
  { id: "es", name: "Spain", flag: "🇪🇸", color: "#f97316", bands: ["#dc2626", "#facc15", "#dc2626"], trait: "blade", traitName: "Toledo Steel" },
  { id: "ar", name: "Argentina", flag: "🇦🇷", color: "#38bdf8", bands: ["#38bdf8", "#ffffff", "#38bdf8"], trait: "speed", traitName: "Pampas Dash" },
  { id: "kr", name: "South Korea", flag: "🇰🇷", color: "#a855f7", bands: ["#ffffff", "#ef4444", "#2563eb"], trait: "dual", traitName: "Twin Hwarang" },
  { id: "mx", name: "Mexico", flag: "🇲🇽", color: "#84cc16", bands: ["#15803d", "#ffffff", "#b91c1c"], trait: "regen", traitName: "Eagle Spirit" },
  { id: "eg", name: "Egypt", flag: "🇪🇬", color: "#d97706", bands: ["#dc2626", "#ffffff", "#171717"], trait: "tank", traitName: "Pharaoh Armor" },
  { id: "ma", name: "Morocco", flag: "🇲🇦", color: "#e11d48", bands: ["#b91c1c", "#15803d", "#b91c1c"], trait: "speed", traitName: "Atlas Strider" },
  { id: "sa", name: "Saudi Arabia", flag: "🇸🇦", color: "#059669", bands: ["#15803d", "#ffffff", "#15803d"], trait: "blade", traitName: "Scimitar Reach" },
  { id: "ca", name: "Canada", flag: "🇨🇦", color: "#fb7185", bands: ["#dc2626", "#ffffff", "#dc2626"], trait: "tank", traitName: "Northern Shield" },
  { id: "in", name: "India", flag: "🇮🇳", color: "#fb923c", bands: ["#f97316", "#ffffff", "#16a34a"], trait: "regen", traitName: "Chakram Vitality" },
  { id: "cn", name: "China", flag: "🇨🇳", color: "#b91c1c", bands: ["#dc2626", "#facc15", "#dc2626"], trait: "fury", traitName: "Dragon Might" },
  { id: "au", name: "Australia", flag: "🇦🇺", color: "#0ea5e9", bands: ["#1e3a8a", "#ffffff", "#ef4444"], trait: "speed", traitName: "Outback Runner" },
  { id: "ng", name: "Nigeria", flag: "🇳🇬", color: "#4ade80", bands: ["#16a34a", "#ffffff", "#16a34a"], trait: "speed", traitName: "Super Falcon" },
  { id: "se", name: "Sweden", flag: "🇸🇪", color: "#facc15", bands: ["#0284c7", "#facc15", "#0284c7"], trait: "tank", traitName: "Viking Frost" },
  { id: "pl", name: "Poland", flag: "🇵🇱", color: "#f472b6", bands: ["#ffffff", "#dc2626", "#ffffff"], trait: "fury", traitName: "Winged Hussar" },
  { id: "nl", name: "Netherlands", flag: "🇳🇱", color: "#fb923c", bands: ["#dc2626", "#ffffff", "#1d4ed8"], trait: "regen", traitName: "Polder Expansion" },
  { id: "pt", name: "Portugal", flag: "🇵🇹", color: "#ef4444", bands: ["#15803d", "#dc2626", "#facc15"], trait: "blade", traitName: "Navigator Edge" },
  { id: "ZA", name: "South Africa", flag: "🇿🇦", color: "#10b981", bands: ["#dc2626", "#16a34a", "#1d4ed8"], trait: "tank", traitName: "Springbok Tough" },
  { id: "tn", name: "Tunisia", flag: "🇹🇳", color: "#f87171", bands: ["#dc2626", "#ffffff", "#dc2626"], trait: "speed", traitName: "Carthage Rush" },
  { id: "sn", name: "Senegal", flag: "🇸🇳", color: "#a3e635", bands: ["#16a34a", "#facc15", "#dc2626"], trait: "fury", traitName: "Teranga Lion" },
  { id: "id", name: "Indonesia", flag: "🇮🇩", color: "#fca5a5", bands: ["#dc2626", "#ffffff", "#dc2626"], trait: "speed", traitName: "Garuda Dash" },
  { id: "PK", name: "Pakistan", flag: "🇵🇰", color: "#34d399", bands: ["#065f46", "#ffffff", "#065f46"], trait: "blade", traitName: "Crescent Steel" },
  { id: "gr", name: "Greece", flag: "🇬🇷", color: "#60a5fa", bands: ["#0284c7", "#ffffff", "#0284c7"], trait: "shield", traitName: "Spartan Phalanx" },
  { id: "no", name: "Norway", flag: "🇳🇴", color: "#c084fc", bands: ["#dc2626", "#1e3a8a", "#ffffff"], trait: "knock", traitName: "Fjord Breaker" }
];

const ARENAS = [
  { id: "meadow", name: "Classic Meadow (4 Pillars)", unlocked: true, cost: 0 },
  { id: "labyrinth", name: "Labyrinth Ruins (Maze Walls)", unlocked: true, cost: 0 },
  { id: "volcano", name: "Volcanic Ring (Center Lava Hazard)", unlocked: false, cost: 150 },
  { id: "bridges", name: "Twin Bridges (Chokepoints)", unlocked: false, cost: 200 }
];

const SWORD_SKINS = [
  { id: "steel", name: "Classic Steel", color: "#e2e8f0", glow: "#94a3b8", unlocked: true, cost: 0 },
  { id: "crimson", name: "Crimson Katana", color: "#f43f5e", glow: "#e11d48", unlocked: false, cost: 100 },
  { id: "cyber", name: "Cyber Neon", color: "#00f5d4", glow: "#00bbf9", unlocked: false, cost: 150 },
  { id: "royal", name: "Royal Gold", color: "#fde047", glow: "#eab308", unlocked: false, cost: 200 }
];

/* --- PROCEDURAL WEB AUDIO SYNTHESIZER (NO COPYRIGHTED AUDIO) --- */
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
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.09);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === "break") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "hit") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "powerup") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === "siren") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.linearRampToValueAtTime(680, now + 0.25);
      osc.frequency.linearRampToValueAtTime(340, now + 0.5);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === "win") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + idx * 0.1);
        g.gain.setValueAtTime(0.18, now + idx * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + idx * 0.1);
        o.stop(now + idx * 0.1 + 0.25);
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
  unlockedArenas: ["meadow", "labyrinth"],
  unlockedSkins: ["steel"],
  customCountries: [],
  daily: [
    { id: "paint500", desc: "Paint 500 territory cells in matches", progress: 0, target: 500, reward: 80, claimed: false },
    { id: "break5", desc: "Break 5 enemy swords", progress: 0, target: 5, reward: 100, claimed: false },
    { id: "predict1", desc: "Win 1 Watch Mode prediction", progress: 0, target: 1, reward: 120, claimed: false }
  ],
  load() {
    try {
      const raw = localStorage.getItem("sword_territory_save_v1");
      if (raw) Object.assign(this, JSON.parse(raw));
    } catch (e) {}
  },
  save() {
    try {
      localStorage.setItem("sword_territory_save_v1", JSON.stringify({
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

// Preload custom flag images
const customFlagImages = {};
function cacheCustomImages() {
  SaveData.customCountries.forEach(c => {
    if (c.imgData && !customFlagImages[c.id]) {
      const img = new Image();
      img.src = c.imgData;
      customFlagImages[c.id] = img;
    }
  });
}
cacheCustomImages();

function getAllCountries() {
  return [...SaveData.customCountries, ...DEFAULT_COUNTRIES];
}

/* --- GOOGLE ADMOB CAPACITOR INTEGRATION (WITH TEST IDS) --- */
async function initAdMob() {
  try {
    const AdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
    if (AdMob) {
      await AdMob.initialize({ initializeForTesting: true });
    }
  } catch (err) {
    console.log("AdMob running in Web/Fallback mode:", err);
  }
}
initAdMob();

async function showRewardedAd(onReward) {
  try {
    const AdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
    if (AdMob) {
      await AdMob.prepareRewardVideoAd({
        adId: ADMOB_TEST_IDS.REWARDED_ID,
        isTesting: true
      });
      const rewardItem = await AdMob.showRewardVideoAd();
      if (rewardItem) {
        onReward();
        return;
      }
    }
  } catch (e) {
    console.log("Fallback test ad triggered:", e);
  }
  // Browser or offline fallback simulated 3-second test ad
  const banner = document.getElementById("hud-banner");
  banner.textContent = "🎬 Playing Google AdMob Test Rewarded Ad (3s)...";
  banner.classList.remove("hidden");
  setTimeout(() => {
    banner.classList.add("hidden");
    onReward();
  }, 2200);
}

/* --- CANVAS VIDEO RECORDER ("RECORD AND SHARE") --- */
let mediaRecorder = null;
let recordedChunks = [];
let lastRecordedBlob = null;

function toggleRecording() {
  const btn = document.getElementById("btn-record-toggle");
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    btn.classList.remove("recording");
    btn.textContent = "⏺ Rec";
    return;
  }
  try {
    const stream = canvas.captureStream(30);
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      lastRecordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      showBanner("📹 Match Video Ready! Tap Share at Match End.");
    };
    mediaRecorder.start();
    btn.classList.add("recording");
    btn.textContent = "⏹ Stop";
    showBanner("🔴 Recording Match Canvas...");
  } catch (e) {
    showBanner("⚠️ Recording not supported on this WebView.");
  }
}

async function shareRecordedVideo() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    await new Promise(r => setTimeout(r, 300));
  }
  if (!lastRecordedBlob) {
    alert("Tip: Tap '⏺ Rec' at the top during a match (or it auto-records when toggled) to capture video!");
    return;
  }
  const file = new File([lastRecordedBlob], "sword-territory-match.webm", { type: "video/webm" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Sword Territory Match",
        text: "Watch this crazy Country Paint War!",
        files: [file]
      });
      return;
    } catch (e) {}
  }
  // Fallback download link
  const url = URL.createObjectURL(lastRecordedBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sword-territory-match.webm";
  a.click();
}

/* --- CORE GAME ENGINE --- */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });

// Offscreen territory paint buffer for 60 FPS budget phone smoothness
const gridCanvas = document.createElement("canvas");
const gridCtx = gridCanvas.getContext("2d");

let GRID_W = 90;
let GRID_H = 135;
let territoryGrid = new Uint8Array(GRID_W * GRID_H);

let gameState = {
  running: false,
  mode: "watch", // 'watch' | 'play'
  contextMode: "quick", // 'quick' | 'tournament' | 'league'
  teamMode: "ffa", // 'ffa' | 'teams'
  arenaId: "meadow",
  simSpeed: 1,
  timeRemaining: 150,
  totalTime: 150,
  hitStopTimer: 0,
  shakeTimer: 0,
  shakeIntensity: 0,
  predictedId: null,
  safeZone: { x: 0, y: 0, r: 9999, maxR: 9999 },
  supplyDropTimer: 32,
  eliminationOrder: [],
  players: [],
  powerups: [],
  crates: [],
  obstacles: [],
  particles: [],
  underdogId: null
};

const joystick = { active: false, dx: 0, dy: 0 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function showBanner(msg) {
  const b = document.getElementById("hud-banner");
  b.textContent = msg;
  b.classList.remove("hidden");
  clearTimeout(b._t);
  b._t = setTimeout(() => b.classList.add("hidden"), 3200);
}

function buildArenaObstacles(arenaId, w, h) {
  const obs = [];
  if (arenaId === "meadow") {
    const padX = w * 0.25, padY = h * 0.28;
    obs.push({ x: padX, y: padY, w: 36, h: 36, type: "wall" });
    obs.push({ x: w - padX - 36, y: padY, w: 36, h: 36, type: "wall" });
    obs.push({ x: padX, y: h - padY - 36, w: 36, h: 36, type: "wall" });
    obs.push({ x: w - padX - 36, y: h - padY - 36, w: 36, h: 36, type: "wall" });
  } else if (arenaId === "labyrinth") {
    obs.push({ x: w * 0.2, y: h * 0.32, w: w * 0.6, h: 18, type: "wall" });
    obs.push({ x: w * 0.2, y: h * 0.68, w: w * 0.6, h: 18, type: "wall" });
    obs.push({ x: w * 0.18, y: h * 0.45, w: 18, h: h * 0.15, type: "wall" });
    obs.push({ x: w * 0.78, y: h * 0.45, w: 18, h: h * 0.15, type: "wall" });
  } else if (arenaId === "volcano") {
    obs.push({ x: w * 0.5 - 42, y: h * 0.54 - 42, w: 84, h: 84, type: "lava" });
  } else if (arenaId === "bridges") {
    obs.push({ x: 0, y: h * 0.52, w: w * 0.28, h: 22, type: "wall" });
    obs.push({ x: w * 0.42, y: h * 0.52, w: w * 0.16, h: 22, type: "wall" });
    obs.push({ x: w * 0.72, y: h * 0.52, w: w * 0.28, h: 22, type: "wall" });
  }
  return obs;
}

function setupMatch(participants, options = {}) {
  resizeCanvas();
  const lowRes = document.getElementById("chk-lowres").checked;
  const isMega = participants.length >= 16;
  GRID_W = lowRes ? 64 : (isMega ? 110 : 84);
  GRID_H = Math.round(GRID_W * (canvas.height / canvas.width));
  gridCanvas.width = GRID_W;
  gridCanvas.height = GRID_H;
  territoryGrid = new Uint8Array(GRID_W * GRID_H);

  gridCtx.fillStyle = "#111827";
  gridCtx.fillRect(0, 0, GRID_W, GRID_H);

  const arenaTop = 132;
  const arenaH = canvas.height - arenaTop;
  const centerX = canvas.width / 2;
  const centerY = arenaTop + arenaH / 2;
  const maxR = Math.hypot(canvas.width / 2, arenaH / 2) * 0.95;

  gameState.running = true;
  gameState.mode = options.mode || "watch";
  gameState.contextMode = options.contextMode || "quick";
  gameState.teamMode = options.teamMode || document.getElementById("sel-team-mode").value;
  gameState.arenaId = options.arenaId || document.getElementById("sel-arena").value;
  gameState.timeRemaining = isMega ? 165 : 135;
  gameState.totalTime = gameState.timeRemaining;
  gameState.safeZone = { x: centerX, y: centerY, r: maxR, maxR };
  gameState.supplyDropTimer = 30;
  gameState.eliminationOrder = [];
  gameState.powerups = [];
  gameState.crates = [];
  gameState.particles = [];
  gameState.obstacles = buildArenaObstacles(gameState.arenaId, canvas.width, canvas.height);

  const ballRadius = isMega ? 13 : 20;
  const teamColors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"];

  gameState.players = participants.map((c, idx) => {
    const angle = (idx / participants.length) * Math.PI * 2;
    const spawnDist = Math.min(canvas.width, arenaH) * 0.34;
    const x = centerX + Math.cos(angle) * spawnDist;
    const y = centerY + Math.sin(angle) * spawnDist;
    const maxHp = c.trait === "tank" ? 135 : 100;
    const baseSpeed = c.trait === "speed" ? 2.45 : 2.05;
    const swordCount = c.trait === "dual" ? 2 : 1;
    const swordLen = (c.trait === "blade" ? 1.32 : 1.0) * (isMega ? 26 : 38);
    const teamIdx = gameState.teamMode === "teams" ? (idx % 4) : idx;

    return {
      index: idx + 1,
      id: c.id,
      name: c.name,
      flag: c.flag || "🏳️",
      color: gameState.teamMode === "teams" ? teamColors[teamIdx] : c.color,
      ownColor: c.color,
      bands: c.bands || [c.color, "#ffffff", c.color],
      trait: c.trait,
      traitName: c.traitName || "Balanced",
      team: teamIdx,
      isHuman: gameState.mode === "play" && idx === 0,
      x,
      y,
      vx: Math.cos(angle + 1.2) * baseSpeed,
      vy: Math.sin(angle + 1.2) * baseSpeed,
      r: ballRadius,
      hp: maxHp,
      maxHp,
      baseSpeed,
      speedMult: 1,
      speedBoostTimer: 0,
      shieldTimer: c.trait === "shield" ? 6 : 0,
      swords: swordCount,
      swordTier: 1,
      swordDurability: 100,
      swordAngle: angle,
      swordSpinSpeed: 0.095,
      swordLength: swordLen,
      barracks: 0,
      barracksTimer: 8,
      areaPct: 0,
      alive: true,
      hitCooldown: 0,
      dashCooldown: 0
    };
  });

  // Initial crates & powerups
  for (let i = 0; i < 5; i++) spawnCrate();
  for (let i = 0; i < 4; i++) spawnPowerup();

  document.getElementById("menu-screen").classList.add("hidden");
  document.getElementById("hud").classList.remove("hidden");
  if (gameState.mode === "play") {
    document.getElementById("play-controls").classList.remove("hidden");
  } else {
    document.getElementById("play-controls").classList.add("hidden");
  }
  updateHudLeaderboard();
}

function spawnPowerup(x, y, forcedType) {
  const arenaTop = 140;
  const types = ["barracks", "speed", "shield", "sword"];
  const type = forcedType || types[Math.floor(Math.random() * types.length)];
  gameState.powerups.push({
    x: x || (40 + Math.random() * (canvas.width - 80)),
    y: y || (arenaTop + 30 + Math.random() * (canvas.height - arenaTop - 70)),
    r: 14,
    type
  });
}

function spawnCrate(isSupplyDrop = false) {
  const arenaTop = 140;
  const x = isSupplyDrop ? canvas.width / 2 : (50 + Math.random() * (canvas.width - 100));
  const y = isSupplyDrop ? (arenaTop + (canvas.height - arenaTop) / 2) : (arenaTop + 40 + Math.random() * (canvas.height - arenaTop - 80));
  gameState.crates.push({
    x,
    y,
    r: isSupplyDrop ? 24 : 17,
    hp: isSupplyDrop ? 60 : 25,
    maxHp: isSupplyDrop ? 60 : 25,
    isSupplyDrop
  });
}

function paintTerritoryCircle(player, radiusPx) {
  const gx = Math.floor((player.x / canvas.width) * GRID_W);
  const gy = Math.floor((player.y / canvas.height) * GRID_H);
  const gr = Math.max(1, Math.ceil((radiusPx / canvas.width) * GRID_W));
  let paintedNew = 0;

  gridCtx.fillStyle = player.color;
  for (let dy = -gr; dy <= gr; dy++) {
    for (let dx = -gr; dx <= gr; dx++) {
      if (dx * dx + dy * dy <= gr * gr) {
        const nx = gx + dx;
        const ny = gy + dy;
        if (nx >= 0 && nx < GRID_W && ny >= 0 && ny < GRID_H) {
          const idx = ny * GRID_W + nx;
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
      const score = p.areaPct * 2 + p.hp;
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
    const s = 1.5 + Math.random() * 4;
    gameState.particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      color,
      life: 0.35 + Math.random() * 0.25
    });
  }
}

function triggerShake(intensity = 5, hitStop = 0.045) {
  if (!document.getElementById("chk-shake").checked) return;
  gameState.shakeTimer = 0.14;
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

  const arenaTop = 132;
  gameState.timeRemaining = Math.max(0, gameState.timeRemaining - dt);

  // Shrinking Burn Zone after 20 seconds
  const elapsed = gameState.totalTime - gameState.timeRemaining;
  if (elapsed > 20) {
    const shrinkFactor = Math.max(0.24, 1 - ((elapsed - 20) / (gameState.totalTime - 20)) * 0.76);
    gameState.safeZone.r = gameState.safeZone.maxR * shrinkFactor;
    document.getElementById("hud-zone-status").textContent = "🔥 Zone Shrinking!";
  } else {
    document.getElementById("hud-zone-status").textContent = "Zone: Safe";
  }

  // Center Rare Supply Drop
  gameState.supplyDropTimer -= dt;
  if (gameState.supplyDropTimer <= 0) {
    gameState.supplyDropTimer = 35;
    spawnCrate(true);
    sfx.play("siren");
    showBanner("📦 MYTHIC SUPPLY DROP IN THE CENTER!");
  }

  // Random powerup & crate replenish
  if (Math.random() < dt * 0.35 && gameState.powerups.length < 7) spawnPowerup();
  if (Math.random() < dt * 0.2 && gameState.crates.length < 5) spawnCrate(false);

  // Update each country ball
  gameState.players.forEach(p => {
    if (!p.alive) return;

    if (p.hitCooldown > 0) p.hitCooldown -= dt;
    if (p.dashCooldown > 0) p.dashCooldown -= dt;
    if (p.speedBoostTimer > 0) p.speedBoostTimer -= dt;
    if (p.shieldTimer > 0) p.shieldTimer -= dt;

    // Land = Power: Area % boosts HP regen & speed!
    const regenRate = (0.35 + p.areaPct * 0.085) * (p.trait === "regen" ? 1.8 : 1);
    p.hp = Math.min(p.maxHp, p.hp + regenRate * dt);

    // Barracks passive generation
    if (p.barracks > 0) {
      p.barracksTimer -= dt * p.barracks;
      if (p.barracksTimer <= 0) {
        p.barracksTimer = 9;
        p.hp = Math.min(p.maxHp, p.hp + 8);
        if (p.swords < 4) p.swords++;
        paintTerritoryCircle(p, p.r * 2.4);
      }
    }

    // Comeback mechanic for weakest player
    const isUnderdog = gameState.underdogId === p.id;
    const territorySpeedBonus = 1 + Math.min(0.35, p.areaPct * 0.01);
    const boostMult = (p.speedBoostTimer > 0 ? 1.45 : 1) * (isUnderdog ? 1.22 : 1) * territorySpeedBonus;

    // Human Joystick or AI steering
    if (p.isHuman && (joystick.dx !== 0 || joystick.dy !== 0)) {
      const targetSpeed = p.baseSpeed * boostMult;
      p.vx = joystick.dx * targetSpeed;
      p.vy = joystick.dy * targetSpeed;
    } else if (!p.isHuman) {
      // Smart AI: pull toward safe zone center or supply drop if outside
      const distCenter = Math.hypot(p.x - gameState.safeZone.x, p.y - gameState.safeZone.y);
      if (distCenter > gameState.safeZone.r * 0.82) {
        const ang = Math.atan2(gameState.safeZone.y - p.y, gameState.safeZone.x - p.x);
        p.vx += Math.cos(ang) * 0.25;
        p.vy += Math.sin(ang) * 0.25;
      }
      // Maintain steady speed
      const curSpd = Math.hypot(p.vx, p.vy) || 1;
      const targetSpeed = p.baseSpeed * boostMult;
      p.vx = (p.vx / curSpd) * targetSpeed;
      p.vy = (p.vy / curSpd) * targetSpeed;
    }

    p.x += p.vx;
    p.y += p.vy;

    // Wall bounces
    if (p.x - p.r < 0) { p.x = p.r; p.vx = Math.abs(p.vx); }
    if (p.x + p.r > canvas.width) { p.x = canvas.width - p.r; p.vx = -Math.abs(p.vx); }
    if (p.y - p.r < arenaTop) { p.y = arenaTop + p.r; p.vy = Math.abs(p.vy); }
    if (p.y + p.r > canvas.height) { p.y = canvas.height - p.r; p.vy = -Math.abs(p.vy); }

    // Arena obstacles collision
    gameState.obstacles.forEach(ob => {
      if (p.x + p.r > ob.x && p.x - p.r < ob.x + ob.w && p.y + p.r > ob.y && p.y - p.r < ob.y + ob.h) {
        if (ob.type === "lava") {
          p.hp -= 18 * dt;
        } else {
          p.vx = -p.vx;
          p.vy = -p.vy;
          p.x += p.vx * 2;
          p.y += p.vy * 2;
        }
      }
    });

    // Shrinking zone burn damage
    const distFromSafe = Math.hypot(p.x - gameState.safeZone.x, p.y - gameState.safeZone.y);
    if (distFromSafe > gameState.safeZone.r) {
      p.hp -= 11 * dt;
      if (Math.random() < 0.2) addParticles(p.x, p.y, "#f97316", 2);
    }

    // Rotate orbiting swords
    p.swordAngle += p.swordSpinSpeed * (isUnderdog ? 1.25 : 1) * (p.speedBoostTimer > 0 ? 1.25 : 1);

    // Paint territory under ball
    paintTerritoryCircle(p, p.r * (isUnderdog ? 1.55 : 1.15));

    // Pick up map powerups
    for (let i = gameState.powerups.length - 1; i >= 0; i--) {
      const pw = gameState.powerups[i];
      if (Math.hypot(p.x - pw.x, p.y - pw.y) < p.r + pw.r) {
        sfx.play("powerup");
        if (pw.type === "barracks") p.barracks++;
        if (pw.type === "speed") p.speedBoostTimer = 6;
        if (pw.type === "shield") p.shieldTimer = 6;
        if (pw.type === "sword") {
          p.swords = Math.min(4, p.swords + 1);
          p.swordTier = Math.min(4, p.swordTier + 1);
          p.swordDurability = 100;
        }
        addParticles(pw.x, pw.y, "#fde047", 10);
        gameState.powerups.splice(i, 1);
      }
    }

    // Smash loot crates with swords or body
    for (let i = gameState.crates.length - 1; i >= 0; i--) {
      const cr = gameState.crates[i];
      if (Math.hypot(p.x - cr.x, p.y - cr.y) < p.r + cr.r + p.swordLength * 0.7) {
        cr.hp -= 35 * dt * p.swords;
        if (cr.hp <= 0) {
          sfx.play("break");
          addParticles(cr.x, cr.y, "#f59e0b", 14);
          if (cr.isSupplyDrop) {
            p.swords = Math.min(4, p.swords + 2);
            p.swordTier = 4;
            p.hp = p.maxHp;
            p.shieldTimer = 8;
            paintTerritoryCircle(p, p.r * 4.2);
            showBanner(`🏆 ${p.name} claimed the Mythic Supply Drop!`);
          } else {
            spawnPowerup(cr.x, cr.y);
          }
          gameState.crates.splice(i, 1);
        }
      }
    }
  });

  // Ball-vs-Ball & Sword-vs-Sword Combat
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

      // Body bounce
      if (dist < a.r + b.r) {
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = (a.r + b.r - dist) * 0.5;
        a.x -= nx * overlap;
        a.y -= ny * overlap;
        b.x += nx * overlap;
        b.y += ny * overlap;
        a.vx = -nx * a.baseSpeed;
        a.vy = -ny * a.baseSpeed;
        b.vx = nx * b.baseSpeed;
        b.vy = ny * b.baseSpeed;
      }

      // Skip friendly fire in Team Mode
      if (gameState.teamMode === "teams" && a.team === b.team) continue;

      // Check sword reach
      const reachA = a.r + (a.swords > 0 ? a.swordLength : 0);
      const reachB = b.r + (b.swords > 0 ? b.swordLength : 0);

      if (dist < Math.max(reachA + b.r, reachB + a.r) && a.hitCooldown <= 0 && b.hitCooldown <= 0) {
        // Sword Clash vs Direct Hit
        if (a.swords > 0 && b.swords > 0 && Math.random() < 0.48) {
          // Sword-on-Sword Clash!
          sfx.play("clash");
          triggerShake(4, 0.03);
          addParticles((a.x + b.x) / 2, (a.y + b.y) / 2, "#fde047", 10);
          a.swordDurability -= 26 / a.swordTier;
          b.swordDurability -= 26 / b.swordTier;

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
          // Regrow basic sword after 4s if disarmed
          if (a.swords === 0) setTimeout(() => { if (a.alive && a.swords === 0) a.swords = 1; }, 3800);
          if (b.swords === 0) setTimeout(() => { if (b.alive && b.swords === 0) b.swords = 1; }, 3800);
        } else {
          // Sword cuts enemy country ball!
          sfx.play("hit");
          triggerShake(6, 0.045);

          if (a.swords > 0 && dist < reachA + b.r) {
            const furyMult = (a.trait === "fury" && a.hp < a.maxHp * 0.5) ? 1.35 : 1;
            const dmg = (14 + a.swords * 4 + a.swordTier * 3) * furyMult;
            if (b.shieldTimer <= 0) {
              b.hp -= dmg;
              addParticles(b.x, b.y, b.color, 12);
            }
          }
          if (b.swords > 0 && dist < reachB + a.r) {
            const furyMult = (b.trait === "fury" && b.hp < b.maxHp * 0.5) ? 1.35 : 1;
            const dmg = (14 + b.swords * 4 + b.swordTier * 3) * furyMult;
            if (a.shieldTimer <= 0) {
              a.hp -= dmg;
              addParticles(a.x, a.y, a.color, 12);
            }
          }
        }
        // Knockback
        const nx = dx / dist;
        const ny = dy / dist;
        const kb = 3.2;
        a.vx = -nx * kb;
        a.vy = -ny * kb;
        b.vx = nx * kb;
        b.vy = ny * kb;
        a.hitCooldown = 0.22;
        b.hitCooldown = 0.22;
      }
    }
  }

  // Check eliminations
  gameState.players.forEach(p => {
    if (p.alive && p.hp <= 0) {
      p.alive = false;
      p.hp = 0;
      gameState.eliminationOrder.push(p);
      sfx.play("break");
      addParticles(p.x, p.y, p.color, 22);
      showBanner(`💀 ${p.flag} ${p.name} Eliminated!`);
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

  // Check match end condition
  const alive = gameState.players.filter(p => p.alive);
  const aliveTeams = new Set(alive.map(p => p.team));
  if (alive.length <= 1 || (gameState.teamMode === "teams" && aliveTeams.size <= 1) || gameState.timeRemaining <= 0) {
    finishMatch();
  }
}

function renderGame() {
  ctx.save();
  if (gameState.shakeTimer > 0) {
    const sx = (Math.random() - 0.5) * gameState.shakeIntensity * 2;
    const sy = (Math.random() - 0.5) * gameState.shakeIntensity * 2;
    ctx.translate(sx, sy);
  }

  // 1. Draw low-res territory grid scaled smoothly to screen
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(gridCanvas, 0, 0, canvas.width, canvas.height);

  // Subtle grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  const step = 28;
  for (let x = 0; x < canvas.width; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 132); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 132; y < canvas.height; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // 2. Obstacles
  gameState.obstacles.forEach(ob => {
    ctx.fillStyle = ob.type === "lava" ? "#dc2626" : "#334155";
    ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
    ctx.strokeStyle = ob.type === "lava" ? "#f97316" : "#64748b";
    ctx.lineWidth = 2;
    ctx.strokeRect(ob.x, ob.y, ob.w, ob.h);
  });

  // 3. Power-ups
  const icons = { barracks: "🏰", speed: "⚡", shield: "🛡️", sword: "🗡️" };
  ctx.font = "16px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  gameState.powerups.forEach(pw => {
    ctx.beginPath();
    ctx.arc(pw.x, pw.y, pw.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fill();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillText(icons[pw.type] || "⭐", pw.x, pw.y);
  });

  // 4. Loot Crates & Center Supply Drop
  gameState.crates.forEach(cr => {
    ctx.fillStyle = cr.isSupplyDrop ? "#eab308" : "#92400e";
    ctx.fillRect(cr.x - cr.r, cr.y - cr.r, cr.r * 2, cr.r * 2);
    ctx.strokeStyle = cr.isSupplyDrop ? "#fef08a" : "#fbbf24";
    ctx.lineWidth = 2;
    ctx.strokeRect(cr.x - cr.r, cr.y - cr.r, cr.r * 2, cr.r * 2);
    ctx.fillText(cr.isSupplyDrop ? "🪂" : "📦", cr.x, cr.y);
  });

  // 5. Country Balls & Orbiting Swords
  const skin = SWORD_SKINS.find(s => s.id === SaveData.equippedSkin) || SWORD_SKINS[0];

  gameState.players.forEach(p => {
    if (!p.alive) return;

    // Underdog comeback aura
    if (gameState.underdogId === p.id) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + 7, 0, Math.PI * 2);
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Orbiting Swords
    for (let s = 0; s < p.swords; s++) {
      const ang = p.swordAngle + (s * Math.PI * 2) / p.swords;
      const sx = p.x + Math.cos(ang) * p.r;
      const sy = p.y + Math.sin(ang) * p.r;
      const ex = p.x + Math.cos(ang) * (p.r + p.swordLength);
      const ey = p.y + Math.sin(ang) * (p.r + p.swordLength);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = p.isHuman ? skin.color : "#f8fafc";
      ctx.lineWidth = 5 + p.swordTier;
      ctx.lineCap = "round";
      ctx.shadowColor = p.isHuman ? skin.glow : p.color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    }

    // Country Flag Ball (Custom uploaded image or tri-band + flag emoji)
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.clip();

    const customImg = customFlagImages[p.id];
    if (customImg && customImg.complete) {
      ctx.drawImage(customImg, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    } else {
      const bandH = (p.r * 2) / 3;
      p.bands.forEach((bCol, idx) => {
        ctx.fillStyle = bCol;
        ctx.fillRect(p.x - p.r, p.y - p.r + idx * bandH, p.r * 2, bandH + 1);
      });
    }
    ctx.restore();

    // Rim & Shield
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.strokeStyle = p.shieldTimer > 0 ? "#38bdf8" : "#ffffff";
    ctx.lineWidth = p.shieldTimer > 0 ? 4 : 2.5;
    ctx.stroke();

    // Flag Emoji & Name Label
    ctx.font = `${Math.max(11, p.r * 0.78)}px sans-serif`;
    ctx.fillText(p.flag, p.x, p.y);

    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.strokeText(p.name, p.x, p.y - p.r - 10);
    ctx.fillText(p.name, p.x, p.y - p.r - 10);

    // Mini HP bar above ball
    const bw = p.r * 2;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(p.x - p.r, p.y - p.r - 6, bw, 4);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(p.x - p.r, p.y - p.r - 6, bw * (p.hp / p.maxHp), 4);
  });

  // 6. Particles
  gameState.particles.forEach(pt => {
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // 7. Shrinking Burn Zone Ring
  ctx.beginPath();
  ctx.arc(gameState.safeZone.x, gameState.safeZone.y, gameState.safeZone.r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

function updateHudLeaderboard() {
  const timerEl = document.getElementById("hud-timer");
  const mins = Math.floor(gameState.timeRemaining / 60);
  const secs = Math.floor(gameState.timeRemaining % 60);
  timerEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const sorted = [...gameState.players].sort((a, b) => {
    if (a.alive !== b.alive) return a.alive ? -1 : 1;
    return b.areaPct - a.areaPct || b.hp - a.hp;
  });

  const container = document.getElementById("hud-leaderboard");
  container.innerHTML = sorted.slice(0, 12).map(p => `
    <div class="hud-card ${p.alive ? "" : "eliminated"}" style="border-left-color:${p.color}">
      <div class="hud-card-header">
        <span>${p.flag} ${p.name}</span>
        <span>${p.areaPct}%</span>
      </div>
      <div class="hud-hp-bar">
        <div class="hud-hp-fill" style="width:${Math.round((p.hp / p.maxHp) * 100)}%"></div>
      </div>
      <div class="hud-stats-line">
        <span>❤️${Math.ceil(p.hp)}</span>
        <span>🗡️${p.swords}</span>
        <span>⚡${p.baseSpeed.toFixed(1)}</span>
        <span>🏰${p.barracks}</span>
      </div>
    </div>
  `).join("");
}

/* --- 60 FPS GAME LOOP --- */
let lastFrameTime = performance.now();
let hudTick = 0;

function gameLoop(now) {
  requestAnimationFrame(gameLoop);
  const elapsed = (now - lastFrameTime) / 1000;
  if (elapsed < 1 / 62) return; // 60 FPS cap
  const dt = Math.min(0.05, elapsed);
  lastFrameTime = now;

  if (gameState.running) {
    for (let s = 0; s < gameState.simSpeed; s++) {
      stepSimulation(dt);
    }
    renderGame();
    hudTick += dt;
    if (hudTick > 0.25) {
      hudTick = 0;
      updateHudLeaderboard();
    }
  }
}
requestAnimationFrame(gameLoop);

/* --- MATCH FINISH & MODES ROUTING --- */
function finishMatch() {
  gameState.running = false;
  sfx.play("win");

  const sortedAlive = gameState.players
    .filter(p => p.alive)
    .sort((a, b) => b.areaPct - a.areaPct || b.hp - a.hp);

  const winner = sortedAlive[0] || gameState.eliminationOrder[gameState.eliminationOrder.length - 1] || gameState.players[0];

  // Ranked order for Tournament / League points
  const remainingAlive = sortedAlive.slice().reverse();
  const fullFinishOrder = [...gameState.eliminationOrder, ...remainingAlive]; // 1st eliminated -> Winner last

  SaveData.coins += 35;

  let predText = `Territory Controlled: ${winner.areaPct}% • Remaining HP: ${Math.ceil(winner.hp)}`;
  if (gameState.mode === "watch" && gameState.predictedId) {
    if (winner.id === gameState.predictedId) {
      SaveData.streak++;
      SaveData.coins += 60;
      SaveData.daily[2].progress = 1;
      predText = `🎯 Spot On! You predicted ${winner.name}! Streak: 🔥 ${SaveData.streak} (+60 Coins)`;
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
  document.getElementById("res-winner-badge").innerHTML = `${winner.flag} ${winner.name} <br><small style="font-size:12px;color:#fde047">${winner.traitName}</small>`;
  document.getElementById("res-prediction-text").textContent = predText;
  document.getElementById("res-stats").innerHTML = `<p class="small-note">Earned +35 Match Coins • Swords: ${winner.swords} • Barracks: ${winner.barracks}</p>`;
  document.getElementById("modal-result").classList.remove("hidden");
}

/* --- GROUP STAGE & KNOCKOUT TOURNAMENT (16 / 32 / 64 / 128) --- */
let tourneyState = null;

function generateTournamentRoster(size) {
  const base = getAllCountries();
  const roster = [];
  for (let i = 0; i < size; i++) {
    const template = base[i % base.length];
    roster.push({
      ...template,
      id: i < base.length ? template.id : `${template.id}_${i}`,
      name: i < base.length ? template.name : `${template.name} ${Math.floor(i / base.length) + 1}`
    });
  }
  return roster.sort(() => Math.random() - 0.5);
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
    info.innerHTML = `<h3 style="color:#fde047">👑 World Champion: ${tourneyState.champion.flag} ${tourneyState.champion.name}!</h3>`;
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
      ${g.teams.map(t => `<div style="${g.winner && g.winner.id === t.id ? "color:#22c55e;font-weight:800" : ""}">${t.flag} ${t.name}</div>`).join("")}
      ${g.winner ? `<div style="margin-top:4px;color:#fde047;font-size:11px">✔ Winner: ${g.winner.name}</div>` : ""}
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
  // If 2 winners remain, play Final; otherwise group in 4s (or 2s)
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

/* --- LEAGUE MODE (16 / 20 / 24 COUNTRIES, 4-AT-A-TIME, 1-2-3-4 PTS) --- */
let leagueState = null;

function startNewLeague() {
  const size = parseInt(document.getElementById("sel-league-size").value, 10);
  const roster = generateTournamentRoster(size).map(c => ({
    ...c, mp: 0, wins: 0, pts: 0
  }));
  // Generate 5 rounds of 4-country matches
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
  // 1st eliminated = 1 pt, 2nd eliminated = 2 pts, runner-up = 3 pts, winner = 4 pts
  const ptsMap = [1, 2, 3, 4];
  orderedFour.forEach((team, idx) => {
    const row = leagueState.table.find(r => r.id === team.id);
    if (row) {
      row.mp++;
      const earned = ptsMap[Math.min(3, idx)];
      row.pts += earned;
      if (earned === 4) row.wins++;
    }
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
  const sorted = [...leagueState.table].sort((a, b) => b.pts - a.pts || b.wins - a.wins);
  document.getElementById("league-tbody").innerHTML = sorted.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.flag} <strong>${r.name}</strong></td>
      <td>${r.mp}</td>
      <td>${r.wins}</td>
      <td style="color:#fde047;font-weight:800">${r.pts}</td>
    </tr>
  `).join("");

  const info = document.getElementById("league-fixture-info");
  const btnPlay = document.getElementById("btn-play-league-match");
  const btnSim = document.getElementById("btn-sim-league-round");

  if (leagueState.currentFixtureIdx >= leagueState.fixtures.length) {
    info.innerHTML = `<h3 style="color:#fde047">🏆 League Champion: ${sorted[0].flag} ${sorted[0].name} (${sorted[0].pts} pts)!</h3>`;
    btnPlay.classList.add("hidden");
    btnSim.classList.add("hidden");
  } else {
    const fx = leagueState.fixtures[leagueState.currentFixtureIdx];
    info.innerHTML = `Match ${leagueState.currentFixtureIdx + 1}/${leagueState.fixtures.length}: ` +
      fx.teams.map(t => `${t.flag} ${t.name}`).join(" vs ");
    btnPlay.classList.remove("hidden");
    btnSim.classList.remove("hidden");
  }
}

/* --- UI & MENU WIRING --- */
function updateMenuMeta() {
  document.getElementById("streak-badge").textContent = `🔥 Prediction Streak: ${SaveData.streak}`;
  document.getElementById("coins-badge").textContent = `🪙 Coins: ${SaveData.coins}`;

  const arenaSel = document.getElementById("sel-arena");
  arenaSel.innerHTML = ARENAS.map(a => {
    const unlocked = SaveData.unlockedArenas.includes(a.id);
    return `<option value="${a.id}" ${unlocked ? "" : "disabled"}>${a.name} ${unlocked ? "" : "🔒 (Shop)"}</option>`;
  }).join("");

  const countrySel = document.getElementById("sel-user-country");
  countrySel.innerHTML = getAllCountries().map(c => `<option value="${c.id}">${c.flag} ${c.name} — ${c.traitName}</option>`).join("");
}
updateMenuMeta();

function pickMatchParticipants() {
  const count = parseInt(document.getElementById("sel-player-count").value, 10);
  const userCountryId = document.getElementById("sel-user-country").value;
  const all = getAllCountries();
  const chosen = all.find(c => c.id === userCountryId) || all[0];
  const others = all.filter(c => c.id !== chosen.id).sort(() => Math.random() - 0.5);
  return [chosen, ...others.slice(0, count - 1)];
}

// Watch Mode (Prediction Modal first)
document.getElementById("btn-watch-mode").addEventListener("click", () => {
  const lineup = pickMatchParticipants();
  const grid = document.getElementById("predict-grid");
  grid.innerHTML = lineup.map(c => `
    <button class="predict-item" data-id="${c.id}">
      <span style="font-size:22px">${c.flag}</span>
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

// Play Mode (Joystick)
document.getElementById("btn-play-mode").addEventListener("click", () => {
  const lineup = pickMatchParticipants();
  gameState.predictedId = null;
  setupMatch(lineup, { mode: "play", contextMode: "quick" });
});

// Top HUD buttons
document.getElementById("btn-exit-match").addEventListener("click", () => {
  gameState.running = false;
  document.getElementById("hud").classList.add("hidden");
  document.getElementById("play-controls").classList.add("hidden");
  document.getElementById("menu-screen").classList.remove("hidden");
});

document.getElementById("btn-speed-toggle").addEventListener("click", e => {
  gameState.simSpeed = gameState.simSpeed === 1 ? 2 : 1;
  e.target.textContent = `${gameState.simSpeed}x`;
});

document.getElementById("btn-record-toggle").addEventListener("click", toggleRecording);

// Result modal buttons
document.getElementById("btn-share-video").addEventListener("click", shareRecordedVideo);

document.getElementById("btn-watch-ad-bonus").addEventListener("click", () => {
  showRewardedAd(() => {
    SaveData.coins += 100;
    SaveData.save();
    alert("🎉 +100 Coins Added from Rewarded Ad!");
  });
});

document.getElementById("btn-result-continue").addEventListener("click", () => {
  document.getElementById("modal-result").classList.add("hidden");
  document.getElementById("hud").classList.add("hidden");
  document.getElementById("play-controls").classList.add("hidden");
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

// Daily Challenges Modal
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

// Shop & Rewarded Ad Unlocks Modal
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
        ${owned ? `<span style="color:#22c55e;font-weight:800">✔ Owned</span>` : `<button class="action-btn ad-btn" data-unlock-arena="${a.id}">🎬 Watch Ad / Unlock</button>`}
      </div>
    `;
  });

  const skinItems = SWORD_SKINS.map(s => {
    const owned = SaveData.unlockedSkins.includes(s.id);
    const active = SaveData.equippedSkin === s.id;
    return `
      <div class="list-card">
        <div>
          <strong style="color:${s.color}">🗡️ Sword Skin: ${s.name}</strong>
          <div class="small-note">${owned ? "Unlocked" : `Cost: 🪙 ${s.cost} or Watch Ad`}</div>
        </div>
        ${owned
          ? `<button class="action-btn ${active ? "secondary" : ""}" data-equip-skin="${s.id}">${active ? "Equipped" : "Equip"}</button>`
          : `<button class="action-btn ad-btn" data-unlock-skin="${s.id}">🎬 Watch Ad / Unlock</button>`}
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

// Custom Country Uploader
let pendingCustomImage = null;
document.getElementById("inp-custom-flag").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 64; c.height = 64;
      c.getContext("2d").drawImage(img, 0, 0, 64, 64);
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
    flag: "🏳️",
    color,
    bands: [color, "#ffffff", color],
    trait,
    traitName: `Custom (${trait.toUpperCase()})`,
    imgData: pendingCustomImage
  };
  SaveData.customCountries.unshift(newCountry);
  cacheCustomImages();
  SaveData.save();
  pendingCustomImage = null;
  document.getElementById("inp-custom-name").value = "";
  alert(`✅ Added "${name}" to the country roster!`);
  document.getElementById("modal-custom").classList.add("hidden");
});

// Settings Modal
document.getElementById("btn-settings-modal").addEventListener("click", () => {
  document.getElementById("modal-settings").classList.remove("hidden");
});
document.getElementById("chk-sound").addEventListener("change", e => {
  sfx.enabled = e.target.checked;
});

// Close buttons for all modals
document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).classList.add("hidden");
  });
});

/* --- VIRTUAL JOYSTICK TOUCH HANDLERS --- */
const joyZone = document.getElementById("joystick-zone");
const joyKnob = document.getElementById("joystick-knob");

function handleJoyMove(clientX, clientY) {
  const rect = joyZone.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const maxDist = 42;
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
    human.speedBoostTimer = 2.2;
    human.dashCooldown = 5;
    sfx.play("powerup");
  }
});
