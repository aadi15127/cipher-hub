// --- INITIALIZATION ---
(function(){
    emailjs.init("F6_n12Iry0aRYGpvx"); // Public Key from
})();

// --- UTILS ---
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function closeSecurityPopup() { document.getElementById('securityPopup').classList.remove('show'); }
function switchTab(id, btn) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// --- PASSWORD LOGIC ---
const input = document.getElementById('userInput');
const scoreCirc = document.getElementById('scoreCirc');
const crackTimeDisplay = document.getElementById('crackTime');
const kbGrid = document.getElementById('kbGrid');
const typingSpeedDisplay = document.getElementById('typingSpeed');
const betterPass = document.getElementById('betterPass');
const useThisBtn = document.getElementById('useThisBtn');

let startTime;
"qwertyuiopasdfghjklzxcvbnm1234567890".split('').forEach(k => {
    const d = document.createElement('div'); d.className = 'dot'; d.id = `k-${k}`;
    kbGrid.appendChild(d);
});

input.addEventListener('input', () => {
    let val = input.value;
    if(val.length === 1) startTime = new Date();
    if(val.length > 1 && startTime) {
        const timeDiff = (new Date() - startTime) / 1000 / 60;
        typingSpeedDisplay.innerText = Math.round(val.length / timeDiff) + " CPM";
    }

    let score = 0;
    if (val.length >= 8) score += 20;
    if (/[A-Z]/.test(val)) score += 20;
    if (/[0-9]/.test(val)) score += 20;
    if (/[^A-Za-z0-9]/.test(val)) score += 20;
    if (val.length >= 12) score += 20;

    scoreCirc.innerText = score + "%";
    scoreCirc.style.borderColor = score < 40 ? 'var(--danger)' : (score < 80 ? 'var(--warning)' : 'var(--success)');
    crackTimeDisplay.innerText = val.length < 5 ? "Instantly" : (val.length < 9 ? "Minutes" : "Centuries 🛡️");
    
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('on'));
    val.toLowerCase().split('').forEach(char => {
        const el = document.getElementById(`k-${char}`); if(el) el.classList.add('on');
    });

    if(val.length > 0) {
        betterPass.innerText = val + "@" + (val.length * 7);
        useThisBtn.style.display = "block";
    }
});
function applySuggestion() { input.value = betterPass.innerText; input.dispatchEvent(new Event('input')); }

// --- PATTERN LOGIC ---
let pattern = [];
for(let i=1; i<=9; i++) {
    const dot = document.createElement('div'); dot.className = 'dot-node';
    dot.onclick = () => {
        if(!pattern.includes(i.toString())) {
            pattern.push(i.toString()); dot.classList.add('active');
            updatePatternAnalysis();
        }
    };
    document.getElementById('grid').appendChild(dot);
}
function updatePatternAnalysis() {
    document.getElementById('pattern-path').innerText = pattern.join(' → ');
    let score = (pattern.length / 9) * 100;
    document.getElementById('meterFill').style.width = score + "%";
    document.getElementById('strength-label').innerText = score < 40 ? "Weak" : (score < 70 ? "Medium" : "Strong");
    if(pattern.length > 0) {
        document.getElementById('betterPattern').innerText = "1 → 5 → 9 → 6 → 3";
        document.getElementById('usePatternBtn').style.display = "block";
    }
}
function applyPatternSuggestion() {
    resetPattern();
    ["1","5","9","6","3"].forEach(idx => {
        pattern.push(idx); document.querySelector(`#grid div:nth-child(${idx})`).classList.add('active');
    });
    updatePatternAnalysis();
}
function resetPattern() { pattern = []; document.querySelectorAll('.dot-node').forEach(d => d.classList.remove('active')); updatePatternAnalysis(); }

// --- PASSPHRASE ---
document.getElementById('phraseInput').addEventListener('input', function() {
    const count = this.value.trim().split(/\s+/).filter(w => w.length > 0).length;
    document.getElementById('phraseStats').innerText = `Words: ${count} | ${count > 4 ? 'Secure' : 'Needs more words'}`;
});

// --- EMOJI ---
let emojiSeq = [];
function addEmoji(e) { emojiSeq.push(e); document.getElementById('emojiDisplay').innerText = emojiSeq.join(''); }
function clearEmoji() { emojiSeq = []; document.getElementById('emojiDisplay').innerText = ''; }

// --- TOTP ---
setInterval(() => {
    const sec = new Date().getSeconds();
    const remain = 30 - (sec % 30);
    if(document.getElementById('totpFill')) document.getElementById('totpFill').style.width = (remain / 30 * 100) + "%";
    if(remain === 30 && document.getElementById('totpCode')) document.getElementById('totpCode').innerText = Math.floor(100000 + Math.random() * 900000);
}, 1000);

// --- RHYTHM ---
let rhythmTimes = [];
function recordRhythm() {
    rhythmTimes.push(Date.now());
    const pad = document.getElementById('rhythmPad'); pad.style.background = "var(--primary)";
    setTimeout(() => pad.style.background = "transparent", 100);
    document.getElementById('rhythmStatus').innerText = `Beats: ${rhythmTimes.length}`;
}

// --- HOTSPOT ---
const canvas = document.getElementById('hotspot-canvas'); 
if (canvas) {
    const ctx = canvas.getContext('2d');
    let spots = [];
    document.getElementById('imgUpload').onchange = (e) => {
        const img = new Image(); img.onload = () => { canvas.width = img.width; canvas.height = img.height; ctx.drawImage(img,0,0); };
        img.src = URL.createObjectURL(e.target.files[0]);
    };
    canvas.onclick = (e) => {
        if(spots.length < 3) {
            const rect = canvas.getBoundingClientRect();
            spots.push({ x: e.clientX-rect.left, y: e.clientY-rect.top });
            ctx.fillStyle = "red"; ctx.beginPath(); ctx.arc(e.clientX-rect.left, e.clientY-rect.top, 5, 0, Math.PI*2); ctx.fill();
            document.getElementById('hotspotPoints').innerText = `Points: ${spots.length}/3`;
        }
    };
}

// --- ENHANCED HISTORY SYSTEM ---
function saveToHistory(type, val, email, metadata = "") {
    if(!validateEmail(email)) return alert("Valid Email Required for Security Backup");
    if(!val || val.length === 0) return alert("Nothing to save!");

    let history = JSON.parse(localStorage.getItem('sentinel_history') || '[]');
    history.push({ 
        type, 
        val, 
        email, 
        metadata,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    localStorage.setItem('sentinel_history', JSON.stringify(history));
    displayHistory(); 
    alert(`${type} log entry created successfully!`);
}

function displayHistory() {
    const list = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('sentinel_history') || '[]');
    
    if (history.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:#94a3b8; font-size:0.8rem;">No activity logs found.</p>`;
        return;
    }

    list.innerHTML = "";
    history.reverse().forEach(item => {
        list.innerHTML += `
            <div class="history-item">
                <span class="timestamp">${item.date} ${item.time}</span>
                <span class="type-tag">${item.type}</span>
                <div style="font-weight:700; margin-bottom:4px; font-size:0.75rem;">Email: ${item.email}</div>
                ${item.metadata ? `<div style="font-size:0.7rem; color:#64748b; margin-bottom:5px;">Note: ${item.metadata}</div>` : ''}
                <div class="content-box">${item.val}</div>
            </div>`;
    });
}

// --- LOG TRIGGER FUNCTIONS ---
function savePassword() { 
    saveToHistory("Password", input.value, document.getElementById('userEmail').value, document.getElementById('userNote').value); 
}
function savePattern() { 
    saveToHistory("Pattern", `Sequence: ${pattern.join(' → ')}`, document.getElementById('patternEmail').value); 
}
function savePhrase() { 
    saveToHistory("Phrase", document.getElementById('phraseInput').value, document.getElementById('phraseEmail').value); 
}
function saveEmoji() { 
    saveToHistory("Emoji", emojiSeq.join(' '), document.getElementById('emojiEmail').value); 
}
function saveRhythm() { 
    saveToHistory("Rhythm", `${rhythmTimes.length} rhythm beats`, document.getElementById('rhythmEmail').value); 
}
function saveHotspot() { 
    const coords = spots.map(s => `(${Math.round(s.x)}, ${Math.round(s.y)})`).join(', ');
    saveToHistory("Hotspot", coords, document.getElementById('hotspotEmail').value); 
}

function toggleHistory() { document.getElementById('historyPanel').classList.toggle('open'); }
function clearHistory() { if(confirm("Permanently wipe all security logs?")) { localStorage.removeItem('sentinel_history'); displayHistory(); } }

window.onload = () => {
    displayHistory();
    document.getElementById('securityPopup').classList.add('show');
};