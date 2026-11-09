/* ============ DATA UNDANGAN: EDIT DI SINI SAJA ============ */
const CFG = {
  bg: "foto-latar.jpg",   // foto latar (akan diburamkan). Jika tidak ada, tampil latar bokeh biru-emas
  groom: { short: "Dolli", full: "Dolli Ramadhan Sihombing", parents: "Putra dari Bapak Tunggal Sihombing<br>&amp; Ibu Kusmanila", photo: "foto-dolli.jpg" },
  bride: { short: "Nova", full: "Nova Yolanda Putri", parents: "Putri dari Bapak Amad<br>&amp; Ibu Neneng Tti Hastuti", photo: "foto-nova.jpg" },
  dateISO: "2026-11-20T08:00:00+07:00",
  dateText: "Jumat, 20 November 2026",
  dateShort: "20 · 11 · 2026",
  events: [
    { icon: "ring", title: "Akad Nikah", time: "07.00 – 08.00 WIB" },
    { icon: "heart", title: "Resepsi", time: "08.00 – 17.00 WIB" }
  ],
  venue: "Jl. Pakunegara Gg. Kelapa / Jl. Nurul Iman Gg. Kelapa",
  mapsUrl: "https://maps.app.goo.gl/LeHLETZgE6rohtQBA",
  // logo: isi nama file logo resmi bank (mis. "logo-bca.png") bila ada; dikosongkan = pakai lencana sederhana
  banks: [
    { bank: "Bank BCA", logo: "", number: "1234567890", name: "Dolli Ramadhan Sihombing" },
    { bank: "Bank Mandiri", logo: "", number: "0987654321", name: "Nova Yolanda Putri" }
  ],
  music: { file: "music.mp3", startAt: 100, volume: 0.6 }
};
/* ============================================================ */
const $ = id => document.getElementById(id);
if (CFG.bg) document.documentElement.style.setProperty("--photo", `url("${CFG.bg}")`);
$("mono").textContent = (CFG.groom.short[0] + CFG.bride.short[0]).split("").join(" & ");
const namesHTML = `${CFG.groom.short}<i>&amp;</i>${CFG.bride.short}`;
["coverNames","heroNames","closeNames"].forEach(i => $(i).innerHTML = namesHTML);
$("coverDate").textContent = CFG.dateShort; $("heroDate").textContent = CFG.dateText;
$("venue").textContent = CFG.venue; $("mapBtn").href = CFG.mapsUrl;
const to = new URLSearchParams(location.search).get("to");
if (to) $("guestName").textContent = to;

const person = p => `<div class="person"><div class="photo"><span>${p.short[0]}</span><img src="${p.photo}" alt="Foto ${p.short}" onerror="this.remove()"></div><h3>${p.full}</h3><p>${p.parents}</p></div>`;
$("pair").innerHTML = person(CFG.groom) + '<div class="amp">&amp;</div>' + person(CFG.bride);
const dt = new Date(CFG.dateISO), tz = { timeZone: "Asia/Jakarta" };
const dDay = dt.toLocaleDateString("id-ID", { ...tz, day: "numeric" });
const dWk = dt.toLocaleDateString("id-ID", { ...tz, weekday: "long" });
const dMo = dt.toLocaleDateString("id-ID", { ...tz, month: "long" });
const dYr = dt.toLocaleDateString("id-ID", { ...tz, year: "numeric" });
const IC = {
  ring: '<svg viewBox="0 0 48 48"><circle cx="18" cy="29" r="10"/><circle cx="30" cy="29" r="10"/><path d="M24 4l3.5 4.5L24 13l-3.5-4.5z"/></svg>',
  heart: '<svg viewBox="0 0 48 48"><path d="M24 41C10 31 6 23 6 17a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 6-4 14-18 24z"/></svg>'
};
const CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const PIN = '<svg viewBox="0 0 24 24"><path d="M12 2a6 6 0 0 0-6 6c0 5 6 12 6 12s6-7 6-12a6 6 0 0 0-6-6z"/><circle cx="12" cy="8" r="2"/></svg>';
$("events").innerHTML = CFG.events.map((e, i) => `<div class="card ev${i % 2 ? " r" : ""}"><div class="ev-side"><h3>${e.title}</h3></div><div class="ev-main"><div class="ev-top"><b>${dDay}</b><span>${dWk}<br>${dMo}<br>${dYr}</span></div><div class="ev-time2">${CLOCK}<span>${e.time}</span></div><div class="ev-lbl">Lokasi Acara</div><div class="ev-addr">${CFG.venue}</div><a class="ev-map" href="${CFG.mapsUrl}" target="_blank" rel="noopener noreferrer">${PIN}Google Maps</a></div></div>`).join("");
const BK = { bca: ["#0060AF", "BCA"], mandiri: ["#003D79", "mandiri"], bni: ["#F15A22", "BNI"], bri: ["#00529C", "BRI"] };
function bankLogo(b) {
  if (b.logo) return `<img class="bl" src="${b.logo}" alt="${b.bank}">`;
  const k = Object.keys(BK).find(x => b.bank.toLowerCase().includes(x)), m = k === "mandiri";
  const [c, t] = BK[k] || ["#1B2A4A", b.bank.replace(/^bank\s+/i, "").slice(0, 4)];
  return `<svg class="bl" viewBox="0 0 84 52" role="img" aria-label="${b.bank}"><rect width="84" height="52" rx="10" fill="${c}"/><text x="42" y="${m ? 29 : 33}" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-weight="700" font-size="${m ? 15 : 21}">${t}</text>${m ? '<path d="M17 38h50" stroke="#FDB913" stroke-width="3" stroke-linecap="round"/>' : ""}</svg>`;
}
$("banks").innerHTML = CFG.banks.map((b, i) => `<div class="card bk"><button class="bk-head" type="button" aria-expanded="false" aria-controls="bk${i}">${bankLogo(b)}<span class="bk-t"><b>${b.bank}</b><small>Ketuk untuk melihat nomor rekening</small></span><svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="bk-body" id="bk${i}"><div class="bk-in"><div class="bk-pad"><p class="acc">${b.number}</p><p class="an">a.n. ${b.name}</p><button class="btn line copy" type="button" data-n="${b.number}">Salin nomor rekening</button></div></div></div></div>`).join("");
document.querySelectorAll(".bk-head").forEach(h => h.addEventListener("click", () => {
  const open = h.closest(".bk").classList.toggle("open");
  h.setAttribute("aria-expanded", open);
  h.querySelector("small").textContent = open ? "Ketuk untuk menutup" : "Ketuk untuk melihat nomor rekening";
}));

/* Musik */
const bgm = $("bgm"), mb = $("musicBtn");
bgm.src = CFG.music.file; bgm.volume = CFG.music.volume;
const setP = on => mb.classList.toggle("playing", on);
function startMusic() {
  const go = () => { try { bgm.currentTime = CFG.music.startAt; } catch (e) {} bgm.play().then(() => setP(true)).catch(() => setP(false)); };
  bgm.readyState >= 1 ? go() : bgm.addEventListener("loadedmetadata", go, { once: true });
}
bgm.addEventListener("ended", () => { try { bgm.currentTime = CFG.music.startAt; } catch (e) {} bgm.play(); });
bgm.addEventListener("error", () => setP(false));
mb.addEventListener("click", () => bgm.paused ? bgm.play().then(() => setP(true)).catch(() => {}) : (bgm.pause(), setP(false)));

/* Animasi scroll halus: latar bergerak pelan + hero memudar, dengan interpolasi (lerp) */
const bgEl = $("bg"), heroIn = $("heroIn"), prog = $("prog");
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
let target = 0, cur = 0, raf = 0;
function apply(y) {
  bgEl.style.transform = `translate3d(0,${(-y * .07).toFixed(1)}px,0)`;
  heroIn.style.transform = `translate3d(0,${(y * .28).toFixed(1)}px,0)`;
  heroIn.style.opacity = Math.max(0, 1 - y / (innerHeight * .75)).toFixed(3);
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(4) : 0);
}
function loop() {
  cur += (target - cur) * .09;
  if (Math.abs(target - cur) < .2) cur = target;
  apply(cur);
  raf = cur === target ? 0 : requestAnimationFrame(loop);
}
const links = [...document.querySelectorAll(".nav a")];
function mark() {
  let on = null;
  links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s && s.getBoundingClientRect().top < innerHeight * .4) on = a; });
  links.forEach(a => a.classList.toggle("on", a === on));
}
addEventListener("scroll", () => { target = scrollY; mark(); if (!still && !raf) raf = requestAnimationFrame(loop); }, { passive: true });

/* Muncul berurutan */
function setupReveal() {
  const tag = (list) => list.forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--d", (i * .11).toFixed(2) + "s"); });
  document.querySelectorAll(".s .wrap").forEach(w => {
    const kids = [...w.children];
    const flat = kids.filter(k => !k.matches(".events,.pair,#banks,.cg"));
    tag(flat);
    w.querySelectorAll(".events,.pair,#banks,.cg").forEach(g => tag([...g.children]));
  });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
  setTimeout(() => document.querySelectorAll(".rv").forEach(el => el.classList.add("show")), 8000);
}

$("openBtn").addEventListener("click", () => {
  $("main").classList.remove("hidden"); mb.classList.remove("hidden");
  document.body.classList.remove("locked"); window.scrollTo(0, 0); target = cur = 0; apply(0);
  $("cover").classList.add("open"); setTimeout(() => $("cover").classList.add("hidden"), 1250);
  startMusic(); setupReveal();
});

/* Hitung mundur */
const tgt = new Date(CFG.dateISO).getTime(), pad = n => String(n).padStart(2, "0");
function tick() {
  const d = Math.max(0, tgt - Date.now());
  $("dd").textContent = pad(Math.floor(d / 864e5)); $("hh").textContent = pad(Math.floor(d % 864e5 / 36e5));
  $("mm").textContent = pad(Math.floor(d % 36e5 / 6e4)); $("ss").textContent = pad(Math.floor(d % 6e4 / 1e3));
}
tick(); setInterval(tick, 1000);

/* Salin rekening */
document.querySelectorAll(".copy").forEach(b => {
  const t0 = b.textContent;
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.n); }
    catch (e) { const t = document.createElement("textarea"); t.value = b.dataset.n; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (x) {} t.remove(); }
    b.textContent = "Tersalin ✓"; b.classList.add("done");
    setTimeout(() => { b.textContent = t0; b.classList.remove("done"); }, 2000);
  });
});