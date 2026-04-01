// ── Custom cursor ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ── Starry sky canvas ──
const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
let W, H, stars = [], nebulas = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    for (let i = 0; i < 220; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            alpha: Math.random(),
            speed: Math.random() * 0.008 + 0.003,
            phase: Math.random() * Math.PI * 2,
            color: ['#fff', '#ffe8f0', '#e8d5ff', '#d5f0ff'][Math.floor(Math.random() * 4)]
        });
    }
    nebulas = [];
    const colors = ['rgba(200,150,240,0.06)', 'rgba(240,150,180,0.05)', 'rgba(150,200,255,0.04)'];
    for (let i = 0; i < 5; i++) {
        nebulas.push({
            x: Math.random() * W, y: Math.random() * H,
            rx: 120 + Math.random() * 200, ry: 80 + Math.random() * 160,
            color: colors[i % colors.length]
        });
    }
}

let tick = 0;
function drawSky() {
    ctx.clearRect(0, 0, W, H);

    // Deep space gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#0d0a1a');
    grad.addColorStop(0.4, '#130e24');
    grad.addColorStop(1, '#1a0d20');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Nebulas
    nebulas.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx);
        g.addColorStop(0, n.color);
        g.addColorStop(1, 'transparent');
        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y * n.rx / n.ry, n.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    // Stars
    tick += 0.012;
    stars.forEach(s => {
        const a = 0.4 + 0.6 * Math.abs(Math.sin(tick * s.speed * 60 + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(drawSky);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize(); initStars(); drawSky();

// ── Floating petals ──
const petalSymbols = ['🌸', '🌷', '✿', '❀', '🌺'];
const container = document.getElementById('petals');

function spawnPetal() {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (10 + Math.random() * 12) + 'px';
    const dur = 8 + Math.random() * 10;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 5) * 1000);
}

for (let i = 0; i < 14; i++) spawnPetal();
setInterval(spawnPetal, 1800);

// ── Heart pop on click ──
const heartEmojis = ['💕', '💖', '🌸', '✨', '💗', '🩷'];
document.addEventListener('click', e => {
    for (let i = 0; i < 4; i++) {
        const h = document.createElement('div');
        h.className = 'heart-pop';
        h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        h.style.left = (e.clientX + (Math.random() - 0.5) * 60) + 'px';
        h.style.top = e.clientY + 'px';
        h.style.fontSize = (14 + Math.random() * 14) + 'px';
        h.style.animationDelay = (Math.random() * 0.3) + 's';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    }
});

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Reasons stagger ──
const listObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
            items.forEach((li, i) => {
                setTimeout(() => li.classList.add('visible'), i * 140);
            });
        }
    });
}, { threshold: 0.2 });

const list = document.getElementById('reasons-list');
if (list) listObserver.observe(list);