/* ==========================================================================
   spin.js — Orbit + expand system for Rastriya Jeevan Beema
   ========================================================================== */

const NODES = [
  {
    icon: 'payments',
    label: 'Premium Payment',
    desc: 'Seamlessly settle your insurance premiums through our secure, high-speed gateway.',
    category: 'Financial Operations',
    cta: 'Pay Now',
    features: [
      { icon: 'account_balance',  title: 'ConnectIPS',     desc: 'Direct bank transfer via Nepal Clearing House.' },
      { icon: 'wallet',           title: 'eSewa',           desc: 'Pay instantly with your eSewa digital wallet.' },
      { icon: 'payments',         title: 'Khalti',          desc: 'Smart wallet integration for quick checkout.' },
      { icon: 'currency_exchange',title: 'IME Pay',         desc: 'Trusted financial gateway across Nepal.' },
    ]
  },
  {
    icon: 'currency_exchange',
    label: 'Loan Repayment',
    desc: 'Manage and repay your policy-backed credit facilities with ease and transparency.',
    category: 'Credit Management',
    cta: 'Repay Now',
    features: [
      { icon: 'schedule',         title: 'EMI Schedule',    desc: 'View your full repayment timeline at a glance.' },
      { icon: 'receipt_long',     title: 'Statement',       desc: 'Download detailed loan statements anytime.' },
      { icon: 'savings',          title: 'Prepayment',      desc: 'Clear your loan early with zero penalties.' },
      { icon: 'notifications',    title: 'Due Alerts',      desc: 'Get reminders before every payment due date.' },
    ]
  },
  {
    icon: 'assignment_turned_in',
    label: 'Claim Services',
    desc: 'Submit and process insurance claims quickly through our streamlined digital pipeline.',
    category: 'Claims',
    cta: 'File a Claim',
    features: [
      { icon: 'upload_file',      title: 'Submit Claim',    desc: 'Upload documents and initiate your claim online.' },
      { icon: 'manage_search',    title: 'Track Progress',  desc: 'Real-time updates at every processing stage.' },
      { icon: 'support_agent',    title: 'Claim Support',   desc: 'Dedicated agents to guide you through the process.' },
      { icon: 'history',          title: 'Claim History',   desc: 'Access all past and active claims in one place.' },
    ]
  },
  {
    icon: 'location_searching',
    label: 'Claim Tracking',
    desc: 'Monitor the live status of all your submitted claims with full transparency.',
    category: 'Claims',
    cta: 'Track Claims',
    features: [
      { icon: 'radar',            title: 'Live Status',     desc: 'See exactly where your claim stands right now.' },
      { icon: 'timeline',         title: 'Stage Timeline',  desc: 'Visual breakdown of each processing milestone.' },
      { icon: 'mark_email_read',  title: 'Notifications',   desc: 'Instant alerts on every status change.' },
      { icon: 'verified',         title: 'Settlement View', desc: 'Review final settlement details and approvals.' },
    ]
  },
  {
    icon: 'badge',
    label: 'Self-Service',
    desc: 'Update your KYC details, download policy documents, and manage your profile independently.',
    category: 'Account Management',
    cta: 'Open Portal',
    features: [
      { icon: 'person_edit',      title: 'KYC Update',      desc: 'Submit updated identity and contact details.' },
      { icon: 'download',         title: 'Documents',       desc: 'Download policy certificates and receipts.' },
      { icon: 'lock_reset',       title: 'Password Reset',  desc: 'Securely update your login credentials.' },
      { icon: 'photo_camera',     title: 'Photo Update',    desc: 'Upload a new profile or nominee photo.' },
    ]
  },
  {
    icon: 'account_balance',
    label: 'Mobile Banking',
    desc: 'Access your policy account directly through Nepal\'s leading mobile banking platforms.',
    category: 'Banking Integration',
    cta: 'Connect Bank',
    features: [
      { icon: 'phone_android',    title: 'Mobile Apps',     desc: 'Integrated with major Nepali banking apps.' },
      { icon: 'sync_alt',         title: 'Auto Debit',      desc: 'Set up automatic premium deductions.' },
      { icon: 'receipt',          title: 'Statements',      desc: 'View consolidated policy + bank statements.' },
      { icon: 'security',         title: 'Secure Auth',     desc: 'Two-factor authentication on every transaction.' },
    ]
  },
];

/* ── Orbit config ─────────────────────────────────────────────────────────── */
const SPEED = 0.0009;

function getRadius() {
  const vmin = Math.min(window.innerWidth, window.innerHeight);
  const sceneSize = expanded ? vmin * 0.75 : vmin * 0.90;
  return sceneSize * 0.42;
}

let angle  = 0;
let paused = false;
let expanded = false;
let activeIndex = null;

/* ── Build nodes ──────────────────────────────────────────────────────────── */
const ring = document.getElementById('orbitRing');

NODES.forEach((node, i) => {
  const el = document.createElement('div');
  el.className = 'service-node';
  el.dataset.index = i;

  el.innerHTML = `
    <div class="node-icon-bg">
      <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">${node.icon}</span>
    </div>
    <div class="node-label">
      <div class="node-title">${node.label}</div>
      <p class="node-desc">${node.desc.substring(0, 40)}…</p>
    </div>
  `;

  el.addEventListener('mouseenter', () => { if (!expanded) paused = true; });
  el.addEventListener('mouseleave', () => { if (!expanded) paused = false; });
  el.addEventListener('click', () => selectNode(i));

  ring.appendChild(el);
});

const nodeEls = ring.querySelectorAll('.service-node');

/* ── Position nodes ───────────────────────────────────────────────────────── */
function positionNodes(currentAngle) {
  const count = NODES.length;
  const RADIUS = getRadius();
  nodeEls.forEach((el, i) => {
    const theta = currentAngle + (i / count) * (Math.PI * 2);
    const x = Math.cos(theta) * RADIUS;
    const y = Math.sin(theta) * RADIUS;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ── Animation loop ───────────────────────────────────────────────────────── */
function tick() {
  if (!paused && !tweening) angle += SPEED;
  if (!tweening) positionNodes(angle);
  requestAnimationFrame(tick);
}

/* ── Tween helper ─────────────────────────────────────────────────────────── */
let tweening = false;

function tweenAngleTo(targetAngle, duration, onComplete) {
  tweening = true;
  paused = true;
  const startAngle = angle;
  const startTime  = performance.now();

  // Pick the shortest arc direction
  let delta = targetAngle - startAngle;
  // Normalise delta to [-PI, PI] so it always takes the short way round
  delta = ((delta + Math.PI) % (Math.PI * 2)) - Math.PI;
  const endAngle = startAngle + delta;

  function step(now) {
    const t = Math.min((now - startTime) / duration, 1);
    // ease-out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    angle = startAngle + delta * ease;
    positionNodes(angle);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      angle = endAngle;
      tweening = false;
      onComplete();
    }
  }

  requestAnimationFrame(step);
}

/* ── Select node / expand ─────────────────────────────────────────────────── */
function selectNode(index) {
  if (tweening) return; // ignore clicks during tween
  activeIndex = index;
  const node = NODES[index];

  // Target angle: shift orbit so node[index] lands at theta = 0 (3 o'clock)
  const count = NODES.length;
  const nodeBaseAngle = (index / count) * (Math.PI * 2);
  const targetAngle = -nodeBaseAngle;

  // Active highlight immediately so user gets feedback
  nodeEls.forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  // Populate content panel
  document.getElementById('contentCategory').textContent = node.category;
  document.getElementById('contentTitle').innerHTML =
    node.label.split(' ').map((w, i) => i === 0 ? w : `<span>${w}</span>`).join(' ');
  document.getElementById('contentDesc').textContent = node.desc;
  document.getElementById('contentCta').textContent = node.cta;

  const grid = document.getElementById('featureGrid');
  grid.innerHTML = node.features.map(f => `
    <div class="feature-card">
      <div class="feature-card-icon">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">${f.icon}</span>
      </div>
      <div>
        <div class="feature-card-title">${f.title}</div>
        <div class="feature-card-desc">${f.desc}</div>
      </div>
    </div>
  `).join('');

  // Spin to position, then expand
  tweenAngleTo(targetAngle, 700, () => {
    paused = true; // stay frozen after tween
    expand();
  });
}

function expand() {
  expanded = true;
  document.getElementById('appLayout').classList.add('expanded');
}

function collapse() {
  if (!expanded) return;
  expanded = false;
  activeIndex = null;
  paused = false; // resume orbit
  document.getElementById('appLayout').classList.remove('expanded');
  nodeEls.forEach(el => el.classList.remove('active'));
}

/* ── Scroll to expand ─────────────────────────────────────────────────────── */
let scrollCooldown = false;
window.addEventListener('wheel', (e) => {
  if (scrollCooldown) return;
  if (e.deltaY > 30 && !expanded) {
    // default to first node on scroll
    selectNode(0);
    scrollCooldown = true;
    setTimeout(() => { scrollCooldown = false; }, 1000);
  } else if (e.deltaY < -30 && expanded) {
    collapse();
    scrollCooldown = true;
    setTimeout(() => { scrollCooldown = false; }, 1000);
  }
}, { passive: true });

/* ── Back button ──────────────────────────────────────────────────────────── */
document.getElementById('backBtn').addEventListener('click', collapse);

/* ── Hub hover pause ──────────────────────────────────────────────────────── */
const hub = document.getElementById('centerHub');
hub.addEventListener('mouseenter', () => { paused = true; });
hub.addEventListener('mouseleave', () => { paused = false; });

/* ── Kick off ─────────────────────────────────────────────────────────────── */
positionNodes(angle);
tick();