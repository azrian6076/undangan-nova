import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVPgkqNyEVQaLON-kKraZf_AF0fE1HtiY",
  authDomain: "undangan-nova.firebaseapp.com",
  projectId: "undangan-nova",
  storageBucket: "undangan-nova.firebasestorage.app",
  messagingSenderId: "174305415349",
  appId: "1:174305415349:web:e7a01c7941b1242d37aefc"
};

const db = getFirestore(initializeApp(firebaseConfig));
const col = collection(db, "ucapan");

const to = new URLSearchParams(location.search).get("to");
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");
const wName = document.getElementById("wName");
const wMsg = document.getElementById("wMsg");
const wAttend = document.getElementById("wAttend");
const wHint = document.getElementById("wHint");
if (to) wName.value = to;

// Tampilkan ucapan secara langsung (real-time)
function render(items) {
  wishList.textContent = "";
  if (!items.length) return;
  const t = document.createElement("h3");
  t.textContent = `Ucapan & Doa (${items.length})`;
  wishList.appendChild(t);
  items.forEach(w => {
    const d = document.createElement("div"); d.className = "wish-item";
    const b = document.createElement("b"); b.textContent = w.name;
    const s = document.createElement("em"); s.textContent = w.attend;
    const p = document.createElement("p"); p.textContent = w.msg;
    d.append(b, s, p); wishList.appendChild(d);
  });
}

onSnapshot(
  query(col, orderBy("createdAt", "desc"), limit(100)),
  snap => render(snap.docs.map(d => d.data())),
  err => console.error("Gagal memuat ucapan (cek Firestore & Rules):", err)
);

// Kirim ucapan
wishForm.addEventListener("submit", async ev => {
  ev.preventDefault();
  const name = wName.value.trim().slice(0, 60);
  const attend = wAttend.value.slice(0, 30);
  const msg = wMsg.value.trim().slice(0, 500);
  if (!name || !msg) return;

  let last = 0;
  try { last = Number(localStorage.getItem("ucapanLast") || 0); } catch (e) {}
  if (Date.now() - last < 15000) {
    wHint.textContent = "Mohon tunggu sebentar sebelum mengirim lagi.";
    return;
  }

  const btn = wishForm.querySelector("button[type=submit], button:not([type])");
  if (btn) btn.disabled = true;
  try {
    await addDoc(col, { name, attend, msg, createdAt: serverTimestamp() });
    try { localStorage.setItem("ucapanLast", String(Date.now())); } catch (e) {}
    wMsg.value = "";
    wHint.textContent = "Terima kasih! Ucapan Anda sudah terkirim 🤍";
  } catch (e) {
    console.error(e);
    wHint.textContent = "Maaf, ucapan gagal terkirim. Coba lagi.";
  } finally {
    if (btn) btn.disabled = false;
  }
});