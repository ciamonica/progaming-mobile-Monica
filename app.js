// Data 10 Bagian Cerita Roro Jonggrang
const storyData = [
  {
    title: "📖 1. Kerajaan Pengging & Prambanan",
    text: "Dahulu kala, terdapat dua kerajaan tetangga: Kerajaan Pengging yang subur dan Kerajaan Prambanan. Prabu Damar Moyo dari Pengging memiliki putra sakti bernama Bandung Bandawasa yang berhasil mengalahkan Prabu Baka, raja Prambanan."
  },
  {
    title: "📖 2. Pertemuan dengan Roro Jonggrang",
    text: "Setibanya di istana Prambanan, Bandung Bandawasa terpesona oleh kecantikan putri Prabu Baka yang bernama Roro Jonggrang. Tanpa ragu, Bandung Bandawasa melamar Roro Jonggrang untuk menjadi istrinya."
  },
  {
    title: "📖 3. Syarat yang Mustahil",
    text: "Roro Jonggrang tidak ingin menikahi pembunuh ayahnya. Namun, ia tidak berani menolak secara langsung. Ia mengajukan syarat: membangun 1.000 candi dan dua sumur dalam waktu satu malam sebelum fajar."
  },
  {
    title: "📖 4. Bantuan Pasukan Jin",
    text: "Bandung Bandawasa menyetujui syarat tersebut. Pada malam hari, ia memanggil kekuatan gaib dan pasukan jin untuk membantunya membangun seribu candi dengan sangat cepat."
  },
  {
    title: "📖 5. Kekhawatiran Sang Putri",
    text: "Menjelang tengah malam, Roro Jonggrang terkejut melihat ratusan candi sudah hampir selesai. Ia khawatir syaratnya akan terpenuhi sebelum fajar tiba."
  },
  {
    title: "📖 6. Siasat Memalsukan Fajar",
    text: "Roro Jonggrang mengumpulkan para dayang istana untuk menumbuk padi di lesung dan membakar jerami di sebelah timur. Suara lesung dan cahaya merah membuat suasana seolah-olah fajar telah menyingsing."
  },
  {
    title: "📖 7. Pasukan Jin Melarikan Diri",
    text: "Mendengar suara ayam berkokok dan melihat warna merah di langit timur, pasukan jin mengira fajar telah tiba. Mereka ketakutan dan langsung melarikan diri, meninggalkan pekerjaan yang belum selesai."
  },
  {
    title: "📖 8. Candi yang Kurang Satu",
    text: "Bandung Bandawasa terkejut saat menghitung jumlah candi yang telah diselesaikan. Ternyata, jumlahnya baru mencapai 999 candi, kurang satu candi untuk memenuhi syarat."
  },
  {
    title: "📖 9. Kemarahan Bandung Bandawasa",
    text: "Mengetahui bahwa fajar tersebut adalah hasil tipu daya Roro Jonggrang, Bandung Bandawasa sangat murka. Ia merasa dipermainkan dan dikhianati oleh sang putri."
  },
  {
    title: "📖 10. Kutukan Candi Terakhir",
    text: "Dalam kemarahannya, Bandung Bandawasa mengutuk Roro Jonggrang menjadi patung batu untuk melengkapi candi ke-1000. Hingga kini, patung tersebut diyakini sebagai arca di dalam Candi Prambanan."
  }
];

let currentIndex = 0;
let isPlayingVoice = false;

// Variable untuk Web Audio Synthesizer (Gamelan BGM)
let audioCtx = null;
let isBgmPlaying = false;
let bgmInterval = null;

// Nada Gamelan Pentatonis dalam Frekuensi Hz (Pelog/Slendro)
const gamelanNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

// Membunyikan Satu Nada Gamelan Sintetis
function playGamelanNote(freq, duration = 1.2) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Gelombang 'sine' untuk efek dentingan perunggu gamelan
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  // Envelope suara (Attack cepat, Decay perlahan khas pukulan gamelan)
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// Melodi Latar Alunan Gamelan
function playGamelanMelody() {
  let noteIndex = 0;
  bgmInterval = setInterval(() => {
    if (!isBgmPlaying) return;
    
    const note = gamelanNotes[noteIndex % gamelanNotes.length];
    playGamelanNote(note, 1.5);
    
    noteIndex = (noteIndex + Math.floor(Math.random() * 2) + 1);
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  renderDots();
  updateContent();
});

function renderDots() {
  const container = document.getElementById("dots-container");
  container.innerHTML = "";
  storyData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === currentIndex ? "active" : ""}`;
    container.appendChild(dot);
  });
}

function updateContent() {
  document.getElementById("story-image").src = `img/${currentIndex + 1}.jpg`;
  document.getElementById("story-title").innerText = storyData[currentIndex].title;
  document.getElementById("story-text").innerText = storyData[currentIndex].text;
  document.getElementById("page-subtitle").innerText = `Halaman ${currentIndex + 1} dari ${storyData.length}`;

  document.getElementById("btn-prev").disabled = currentIndex === 0;
  document.getElementById("btn-next").disabled = currentIndex === storyData.length - 1;

  renderDots();

  if (isPlayingVoice) {
    stopVoice();
  }
}

function changeSlide(direction) {
  currentIndex += direction;
  updateContent();
}

// Fitur 1: Toggle Musik Latar (Gamelan Audio Synthesizer)
function toggleBGM() {
  const btn = document.getElementById("btn-bgm");

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (!isBgmPlaying) {
    isBgmPlaying = true;
    btn.classList.add("active");
    btn.innerText = "⏸️ Musik";
    playGamelanMelody();
  } else {
    isBgmPlaying = false;
    btn.classList.remove("active");
    btn.innerText = "🎵 Musik";
    clearInterval(bgmInterval);
  }
}

// Fitur 2: Toggle Narasi Suara (Text-to-Speech)
function toggleVoice() {
  if (isPlayingVoice) {
    stopVoice();
  } else {
    startVoice();
  }
}

function startVoice() {
  isPlayingVoice = true;
  const btn = document.getElementById("btn-voice");
  btn.innerText = "⏸️ Hentikan";

  const textToSpeak = storyData[currentIndex].text;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = "id-ID";
  utterance.rate = 0.9;

  utterance.onend = function () {
    stopVoice();
  };

  window.speechSynthesis.speak(utterance);
}

function stopVoice() {
  isPlayingVoice = false;
  window.speechSynthesis.cancel();
  const btn = document.getElementById("btn-voice");
  btn.innerText = "🔊 Suara";
}