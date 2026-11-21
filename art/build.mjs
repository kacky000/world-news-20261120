// Builds art/front-page.html: a 1024x1024 SVG front page for Friday 20 November 2026.
// 41 stories, every one of them from that Friday: 3 drawn leads, 10 drawn cards, 28 numbered briefs,
// a key-figures strip, a region bar, a pin map and a date check.
// Run from the repository root:  node art/build.mjs && bash art/render.sh
import { writeFileSync } from 'node:fs';

const INK = '#14110f';
const PAPER = '#f4ecd8';
const GREY = '#4a433b';
const RED = '#8a1c1c';
const GOLD = '#ffd23f';
const SANS = 'Arial, Helvetica, sans-serif';
const SERIF = "Georgia, 'Times New Roman', serif";
const REGION = {
  EUROPE: '#1d4e9e',
  ASIA: '#b3541e',
  'MIDDLE EAST': '#a0760b',
  AFRICA: '#1f7a4d',
  AMERICAS: '#8a1c1c',
  OCEANIA: '#0f7d86',
  GLOBAL: '#5a3d8a',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** One line of text. */
function text(x, y, s, size, o = {}) {
  const attrs = [
    `x="${x}"`, `y="${y}"`, `font-family="${o.serif ? SERIF : SANS}"`, `font-size="${size}"`,
    o.bold ? 'font-weight="700"' : '', o.italic ? 'font-style="italic"' : '',
    o.ls ? `letter-spacing="${o.ls}"` : '', `fill="${o.fill ?? INK}"`,
    o.anchor ? `text-anchor="${o.anchor}"` : '',
    o.fit ? `textLength="${o.fit}" lengthAdjust="spacingAndGlyphs"` : '',
  ].filter(Boolean).join(' ');
  return `<text ${attrs}>${esc(s)}</text>`;
}

/** The numbered disc that ties a story to its pin on the map. */
function disc(cx, cy, n, color, r = 9) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="1.200"/>` +
    text(cx, cy + r * 0.380, n, r * 1.100, { bold: true, fill: '#ffffff', anchor: 'middle' });
}

/** The name plate on a drawing: says in two or three words which story the picture is. */
function tag(x, y, label, size = 11.500) {
  const w = Math.round(label.length * size * 0.660) + 12;
  const h = size + 7;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${INK}" stroke="${GOLD}" stroke-width="1"/>` +
    text(x + 6, y + h - 5, label, size, { bold: true, fill: GOLD, fit: w - 12 });
}

// ---------------------------------------------------------------- lead drawings (320 x 104)

const kyiv = () => `
  <rect width="320" height="104" fill="#151f47"/>
  <rect y="40" width="320" height="30" fill="#2c2f5c"/>
  <g fill="#ffffff" opacity="0.8"><circle cx="84" cy="12" r="1"/><circle cx="120" cy="24" r="1"/><circle cx="150" cy="9" r="1"/><circle cx="204" cy="34" r="1"/></g>
  <path d="M0 70 V56 H18 V48 H36 V58 H56 V44 H72 V60 H212 V50 H232 V42 H250 V56 H280 V46 H300 V58 H320 V70 Z" fill="#070c1f"/>
  <g fill="#f2c94c"><rect x="22" y="52" width="3" height="3"/><rect x="60" y="48" width="3" height="3"/><rect x="238" y="46" width="3" height="3"/><rect x="286" y="50" width="3" height="3"/><rect x="304" y="62" width="3" height="3"/></g>
  <rect x="88" y="44" width="24" height="18" fill="#070c1f"/>
  <path d="M88 45 Q100 22 112 45 Z" fill="#e2b33c"/>
  <rect x="99" y="18" width="2" height="9" fill="#e2b33c"/><rect x="96.500" y="21" width="7" height="2" fill="#e2b33c"/>
  <rect y="70" width="320" height="34" fill="#1b3a5f"/>
  <g fill="#bdb6a4"><rect x="30" y="68" width="8" height="28"/><rect x="96" y="68" width="8" height="28"/><rect x="228" y="68" width="8" height="28"/><rect x="290" y="68" width="8" height="28"/></g>
  <g fill="none" stroke="#bdb6a4" stroke-width="3"><path d="M34 76 Q67 58 100 76"/><path d="M232 76 Q263 58 294 76"/></g>
  <rect y="61" width="146" height="7" fill="#d8d1bf"/><rect x="196" y="61" width="124" height="7" fill="#d8d1bf"/>
  <polygon points="146,61 162,76 158,81 143,68" fill="#d8d1bf"/><polygon points="196,61 182,78 186,82 200,68" fill="#d8d1bf"/>
  <g fill="#8d8a93" opacity="0.85"><circle cx="168" cy="30" r="15"/><circle cx="184" cy="17" r="12"/><circle cx="158" cy="14" r="10"/></g>
  <polygon points="172,28 179,45 196,39 187,54 204,63 186,66 189,84 174,73 162,86 162,68 144,67 158,56 146,41 163,45" fill="#f08a1c"/>
  <polygon points="172,42 176,52 186,50 181,58 190,63 180,65 181,75 173,68 166,75 166,66 156,65 164,58 158,50 167,51" fill="#ffe066"/>
  <g stroke="#ffffff" stroke-width="2" stroke-dasharray="6 4"><line x1="316" y1="34" x2="200" y2="52"/><line x1="262" y1="34" x2="190" y2="44"/></g>
  ${tag(6, 6, 'KYIV', 17)}
  <rect x="204" y="6" width="110" height="24" rx="3" fill="${GOLD}"/>${text(259, 23, '3 BRIDGES HIT', 13.500, { bold: true, anchor: 'middle' })}
  ${text(8, 99, 'DNIPRO RIVER · BEFORE DAWN', 9, { bold: true, fill: '#cfe0f2', ls: 1 })}`;

const cyclone = () => `
  <rect width="320" height="104" fill="#2f6f9f"/>
  <polygon points="0,0 150,0 128,30 98,66 70,104 0,104" fill="#86b06c"/>
  <polygon points="150,0 128,30 98,66 70,104 62,104 90,66 120,30 142,0" fill="#e9dca6"/>
  <g fill="none" stroke="#ffffff" stroke-linecap="round" transform="rotate(-20 214 60)">
    <circle cx="214" cy="60" r="42" stroke-width="8" stroke-dasharray="96 168" opacity="0.75"/>
    <circle cx="214" cy="60" r="42" stroke-width="8" stroke-dasharray="68 196" stroke-dashoffset="-138" opacity="0.75"/>
    <circle cx="214" cy="60" r="29" stroke-width="8" stroke-dasharray="72 110" stroke-dashoffset="-33" opacity="0.9"/>
    <circle cx="214" cy="60" r="29" stroke-width="8" stroke-dasharray="45 137" stroke-dashoffset="-128" opacity="0.9"/>
    <circle cx="214" cy="60" r="16" stroke-width="8" stroke-dasharray="64 36"/>
  </g>
  <circle cx="214" cy="60" r="6" fill="#17456b"/>
  <line x1="197" y1="58" x2="124" y2="55" stroke="#d62828" stroke-width="3.500"/>
  <polygon points="112,55 127,48 126,62" fill="#d62828"/>
  <circle cx="104" cy="55" r="5" fill="#d62828" stroke="#ffffff" stroke-width="1.500"/>
  ${text(8, 52, 'GOPALPUR', 12.500, { bold: true })}
  ${text(8, 88, 'ODISHA, INDIA', 10, { bold: true, fill: '#2f5a22', ls: 1 })}
  ${text(312, 98, 'Bay of Bengal', 10, { italic: true, fill: '#d7e8f5', anchor: 'end' })}
  ${tag(6, 6, 'CYCLONE AKVAN', 17)}
  <rect x="216" y="6" width="98" height="24" rx="3" fill="${GOLD}"/>${text(265, 23, 'LANDFALL', 13.500, { bold: true, anchor: 'middle' })}`;

const cop = () => `
  <rect width="320" height="104" fill="#dff0e4"/>
  <circle cx="54" cy="64" r="32" fill="#3d86c6"/>
  <path d="M34 48 q11 -13 24 -6 q4 8 -5 14 q-3 11 -13 8 q-9 -6 -6 -16 Z" fill="#5fa457"/>
  <path d="M60 68 q13 -4 19 5 q-2 12 -13 15 q-9 -4 -6 -20 Z" fill="#5fa457"/>
  <g transform="rotate(3 214 56)">
    <rect x="124" y="12" width="180" height="84" fill="#ffffff" stroke="${INK}" stroke-width="1.500"/>
    ${text(134, 30, 'DRAFT TEXT · LAST DAY', 12, { bold: true })}
    <line x1="134" y1="39" x2="292" y2="39" stroke="#9a948a" stroke-width="2.500"/>
    ${text(134, 61, 'fossil-fuel phase-out', 15, { bold: true })}
    <line x1="130" y1="56" x2="294" y2="56" stroke="#d62828" stroke-width="3.500"/>
    <line x1="134" y1="74" x2="292" y2="74" stroke="#9a948a" stroke-width="2.500"/>
    <line x1="134" y1="84" x2="244" y2="84" stroke="#9a948a" stroke-width="2.500"/>
  </g>
  ${tag(6, 6, 'COP31', 17)}`;

// ---------------------------------------------------------------- card drawings (190 x 62)

const markets = () => `
  <rect width="190" height="62" fill="#151a24"/>
  <g stroke="#2c3546" stroke-width="1"><line x1="0" y1="28" x2="190" y2="28"/><line x1="0" y1="44" x2="190" y2="44"/></g>
  <polyline points="6,26 28,24 46,31 64,29 84,40 102,38 124,52 150,55" fill="none" stroke="#ff4d4d" stroke-width="4" stroke-linejoin="round"/>
  <polygon points="168,61 148,60 160,46" fill="#ff4d4d"/>
  ${tag(4, 4, 'AI SELL-OFF')}
  ${text(186, 17, 'TAIEX −6.2%', 11.500, { bold: true, fill: '#ff9c9c', anchor: 'end' })}
  ${text(186, 32, 'KOSPI −5.2%', 10, { bold: true, fill: '#ff9c9c', anchor: 'end' })}`;

const ukEu = () => `
  <rect width="190" height="62" fill="#e3eaf6"/>
  <svg x="12" y="24" width="56" height="34" viewBox="0 0 60 40" preserveAspectRatio="none">
    <rect width="60" height="40" fill="#012169"/>
    <g stroke="#ffffff" stroke-width="8"><line x1="0" y1="0" x2="60" y2="40"/><line x1="60" y1="0" x2="0" y2="40"/></g>
    <g stroke="#c8102e" stroke-width="3"><line x1="0" y1="0" x2="60" y2="40"/><line x1="60" y1="0" x2="0" y2="40"/></g>
    <g stroke="#ffffff" stroke-width="12"><line x1="30" y1="0" x2="30" y2="40"/><line x1="0" y1="20" x2="60" y2="20"/></g>
    <g stroke="#c8102e" stroke-width="7"><line x1="30" y1="0" x2="30" y2="40"/><line x1="0" y1="20" x2="60" y2="20"/></g>
  </svg>
  <rect x="122" y="24" width="56" height="34" fill="#003399"/>
  <g fill="#ffcc00">${Array.from({ length: 12 }, (_, k) => {
    const a = (k * Math.PI) / 6;
    return `<circle cx="${(150 + 11 * Math.sin(a)).toFixed(1)}" cy="${(41 - 11 * Math.cos(a)).toFixed(1)}" r="1.800"/>`;
  }).join('')}</g>
  <circle cx="95" cy="41" r="13" fill="#1f7a4d" stroke="#ffffff" stroke-width="2"/>
  <polyline points="88,41 93.500,46.500 102,35.500" fill="none" stroke="#ffffff" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/>
  ${tag(4, 4, 'UK–EU DEAL')}`;

const poland = () => `
  <rect width="190" height="62" fill="#b9d3ea"/>
  <rect y="42" width="190" height="20" fill="#8fae5d"/>
  <g stroke="#7d9a4f" stroke-width="2"><line x1="0" y1="49" x2="190" y2="49"/><line x1="0" y1="56" x2="190" y2="56"/></g>
  <rect x="152" y="5" width="32" height="10" fill="#ffffff" stroke="#9aa7b5" stroke-width="0.500"/><rect x="152" y="15" width="32" height="10" fill="#dc143c"/>
  <g transform="rotate(28 104 42)">
    <rect x="72" y="37" width="62" height="9" rx="4" fill="#6c737c"/>
    <polygon points="134,37 148,41.500 134,46" fill="#4d535b"/>
    <polygon points="78,37 70,28 86,37" fill="#4d535b"/><polygon points="78,46 70,55 86,46" fill="#4d535b"/>
  </g>
  <g fill="#6b5a45" opacity="0.8"><circle cx="146" cy="52" r="7"/><circle cx="158" cy="48" r="5"/><circle cx="136" cy="49" r="4"/></g>
  ${tag(4, 4, 'MISSILE IN POLAND')}`;

const iraq = () => `
  <rect width="190" height="62" fill="#f3dfae"/>
  <circle cx="150" cy="30" r="9" fill="#f7b733"/>
  <rect y="42" width="190" height="20" fill="#d2a85f"/>
  <line x1="0" y1="55" x2="190" y2="55" stroke="#b08a48" stroke-width="2" stroke-dasharray="10 6"/>
  <rect x="162" y="5" width="22" height="5" fill="#ce1126"/><rect x="162" y="10" width="22" height="5" fill="#ffffff"/><rect x="162" y="15" width="22" height="5" fill="#111111"/>
  <g stroke="#5b4a2a" stroke-width="3" fill="none"><path d="M176 46 Q172 36 176 28"/></g>
  <g fill="#3f7a3a"><path d="M176 28 q-12 -4 -16 4 q9 -4 16 -4 Z"/><path d="M176 28 q12 -4 14 6 q-7 -6 -14 -6 Z"/><path d="M176 28 q-4 -10 -12 -8 q8 2 12 8 Z"/></g>
  ${[14, 66, 118].map((x) => `<g transform="translate(${x} 0)">
    <rect x="0" y="30" width="26" height="15" fill="#5c6b3c"/><rect x="26" y="35" width="12" height="10" fill="#4a5730"/>
    <rect x="29" y="37" width="6" height="4" fill="#cfe0f2"/>
    <circle cx="8" cy="47" r="4.500" fill="#2a2a2a"/><circle cx="30" cy="47" r="4.500" fill="#2a2a2a"/>
  </g>`).join('')}
  ${tag(4, 4, 'IRAQ: ARMY DEPLOYS')}`;

const italy = () => `
  <rect width="190" height="62" fill="#efe6d2"/>
  <rect x="154" y="5" width="10" height="18" fill="#009246"/><rect x="164" y="5" width="10" height="18" fill="#ffffff"/><rect x="174" y="5" width="10" height="18" fill="#ce2b37"/>
  <rect x="40" y="26" width="110" height="15" fill="#ce2b37"/>${text(95, 37.500, 'SCIOPERO', 11.500, { bold: true, fill: '#ffffff', anchor: 'middle', ls: 1 })}
  <g stroke="${INK}" stroke-width="2"><line x1="48" y1="41" x2="48" y2="52"/><line x1="142" y1="41" x2="142" y2="52"/></g>
  <g fill="#3a332c">${[26, 48, 70, 95, 120, 142, 164].map((x) => `<circle cx="${x}" cy="50" r="4.500"/><rect x="${x - 6}" y="54" width="12" height="8" rx="3"/>`).join('')}</g>
  ${tag(4, 4, 'ITALY ON STRIKE')}`;

const japan = () => `
  <rect width="190" height="62" fill="#ffffff"/>
  <circle cx="30" cy="42" r="14" fill="#bc002d"/>
  <g fill="#3b5b8c"><rect x="64" y="44" width="13" height="12"/><rect x="82" y="40" width="13" height="16"/><rect x="100" y="42" width="13" height="14"/></g>
  <rect x="118" y="32" width="13" height="24" fill="#bc002d"/>
  <line x1="58" y1="56" x2="138" y2="56" stroke="${INK}" stroke-width="1.500"/>
  ${text(186, 50, '2.3%', 19, { bold: true, fill: '#bc002d', anchor: 'end' })}
  ${tag(4, 4, 'JAPAN: PRICES UP')}`;

const bukele = () => `
  <rect width="190" height="62" fill="#ffffff"/>
  <rect width="190" height="21" fill="#0f47af"/><rect y="41" width="190" height="21" fill="#0f47af"/>
  <g transform="rotate(-8 152 34)">
    <rect x="141" y="24" width="22" height="22" fill="#fffdf5" stroke="${INK}" stroke-width="1"/>
    <polyline points="145,34 150,39 159,28" fill="none" stroke="#1f7a4d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <rect x="124" y="43" width="56" height="17" fill="#2a2f3a" stroke="#ffffff" stroke-width="1.500"/>
  <rect x="138" y="42" width="28" height="3" fill="#0b0d12"/>
  <rect x="6" y="27" width="96" height="16" fill="#ffffff" stroke="${INK}" stroke-width="1"/>${text(54, 39, 'VOTE: 28 FEB 2027', 9.500, { bold: true, anchor: 'middle' })}
  ${tag(4, 4, 'BUKELE: 3RD-TERM BID')}`;

const kenya = () => `
  <rect width="190" height="62" fill="#f6cf94"/>
  <circle cx="40" cy="40" r="11" fill="#f08a1c"/>
  <rect y="46" width="190" height="16" fill="#a9772f"/>
  <rect x="150" y="5" width="34" height="5" fill="#111111"/><rect x="150" y="10" width="34" height="2" fill="#ffffff"/><rect x="150" y="12" width="34" height="5" fill="#bb1e10"/><rect x="150" y="17" width="34" height="2" fill="#ffffff"/><rect x="150" y="19" width="34" height="5" fill="#0b6e2f"/>
  <g stroke="#2b2622" stroke-width="2.200" fill="none" stroke-linecap="round">
    <line x1="96" y1="50" x2="110" y2="14"/><line x1="124" y1="50" x2="110" y2="14"/>
    <line x1="99" y1="42" x2="121" y2="42"/><line x1="102" y1="34" x2="118" y2="34"/><line x1="105" y1="26" x2="115" y2="26"/>
    <line x1="99" y1="42" x2="118" y2="34"/><line x1="102" y1="34" x2="115" y2="26"/>
    <line x1="110" y1="14" x2="110" y2="52"/>
  </g>
  <rect x="88" y="50" width="44" height="5" fill="#2b2622"/>
  <rect x="136" y="42" width="16" height="12" rx="2" fill="#6c737c"/><rect x="60" y="44" width="20" height="10" rx="2" fill="#6c737c"/>
  ${tag(4, 4, 'KENYA: OIL WELL')}`;

const cricket = () => `
  <rect width="190" height="62" fill="#4e9a52"/>
  <rect x="66" y="0" width="64" height="62" fill="#d9c58b"/>
  <g transform="rotate(-35 80 40)"><rect x="72" y="18" width="14" height="32" rx="3" fill="#c79a55" stroke="#7a5a2b" stroke-width="1"/><rect x="76" y="48" width="6" height="12" fill="#3a332c"/></g>
  <circle cx="116" cy="30" r="6" fill="#b3202a" stroke="#ffffff" stroke-width="1"/>
  <g stroke="#ffffff" stroke-width="2"><line x1="144" y1="24" x2="144" y2="54"/><line x1="150" y1="24" x2="150" y2="54"/><line x1="156" y1="24" x2="156" y2="54"/></g>
  ${text(34, 52, '118', 22, { bold: true, fill: '#ffffff', anchor: 'middle' })}
  ${tag(4, 4, 'PHILLIPS: CENTURY')}`;

const senegal = () => `
  <rect width="190" height="62" fill="#9ec9e6"/>
  <rect y="34" width="190" height="28" fill="#1f5f8b"/>
  <g fill="none" stroke="#7fb4d6" stroke-width="2"><path d="M0 44 q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/><path d="M0 56 q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/></g>
  <path d="M58 40 Q95 16 132 40 Z" fill="#b5652a" stroke="#6e3a14" stroke-width="1.500"/>
  <line x1="62" y1="39" x2="128" y2="39" stroke="#e7c84a" stroke-width="2"/>
  <rect x="151" y="5" width="11" height="16" fill="#00853f"/><rect x="162" y="5" width="11" height="16" fill="#fdef42"/><rect x="173" y="5" width="11" height="16" fill="#e31b23"/>
  ${tag(4, 4, 'MIGRANT BOAT LOST')}`;

// ---------------------------------------------------------------- the day's stories

const leads = [
  { n: 1, region: 'EUROPE', field: 'UKRAINE WAR', src: 'Reuters, RFE/RL', art: kyiv, lon: 30.5, lat: 50.4,
    head: ['Russian missiles hit three', 'Dnipro bridges in Kyiv'],
    sub: ['Eight killed across Ukraine, officials say. Biggest', 'strike yet on the capital’s crossings; power cut.'] },
  { n: 2, region: 'ASIA', field: 'CYCLONE', src: 'The Quint', art: cyclone, lon: 84.9, lat: 19.3,
    head: ['Cyclone Akvan makes', 'landfall in eastern India'],
    sub: ['Storm crosses the Odisha coast near Gopalpur;', 'shelters open, trains and flights disrupted.'] },
  { n: 3, region: 'GLOBAL', field: 'CLIMATE', src: 'CNN', art: cop, lon: 30.7, lat: 36.9,
    head: ['COP31 deadlocked on', 'its final day in Antalya'],
    sub: ['New draft drops the fossil-fuel phase-out; finance', 'text weakened. Talks may run into the weekend.'] },
];

const cards = [
  { n: 4, region: 'ASIA', place: 'TAIPEI · MARKETS', src: 'closing prices', art: markets, lon: 121.5, lat: 25.0,
    head: ['AI sell-off sinks', 'Asian stock markets'], sub: 'Taiex has worst week since 1991.' },
  { n: 5, region: 'EUROPE', place: 'BRUSSELS · DIPLOMACY', src: 'No 10', art: ukEu, lon: 4.4, lat: 50.8,
    head: ['UK and EU agree a', 'post-Brexit reset deal'], sub: 'Youth visas, food trade, carbon link.' },
  { n: 6, region: 'EUROPE', place: 'POLAND · SECURITY', src: 'TVP World', art: poland, lon: 22.6, lat: 51.2,
    head: ['Russian cruise missile', 'falls inside Poland'], sub: 'Kh-101 near Nowy Lipowiec; none hurt.' },
  { n: 7, region: 'MIDDLE EAST', place: 'IRAQ · SECURITY', src: 'Al Jazeera', art: iraq, lon: 44.3, lat: 32.9,
    head: ['Iraqi forces enter a', 'militia stronghold'], sub: 'Troops deploy in Jurf al-Sakhar.' },
  { n: 8, region: 'EUROPE', place: 'ITALY · LABOUR', src: 'Reuters', art: italy, lon: 12.5, lat: 41.9,
    head: ['General strike across', 'Italy over 2027 budget'], sub: 'Thousands march in dozens of cities.' },
  { n: 9, region: 'ASIA', place: 'TOKYO · ECONOMY', src: 'official data', art: japan, lon: 139.7, lat: 35.7,
    head: ['Japan inflation rises', 'to 2.3% in October'], sub: 'Fastest pace this year; core CPI 2.2%.' },
  { n: 10, region: 'AMERICAS', place: 'EL SALVADOR · POLITICS', src: 'UPI', art: bukele, lon: -89.2, lat: 13.7,
    head: ['Bukele files to run', 'for a third term'], sub: 'Could stay in power until 2033.' },
  { n: 11, region: 'AFRICA', place: 'TURKANA · ENERGY', src: 'KBC', art: kenya, lon: 35.6, lat: 3.1,
    head: ['Kenya starts drilling', 'for its first crude oil'], sub: 'First oil is targeted for 1 December.' },
  { n: 12, region: 'OCEANIA', place: 'WELLINGTON · CRICKET', src: 'AFP', art: cricket, lon: 174.8, lat: -41.3,
    head: ['Phillips hits 118 as', 'NZ make 368 v India'], sub: 'Day 2: India reply 159-1 at stumps.' },
  { n: 13, region: 'AFRICA', place: 'SENEGAL · MIGRATION', src: 'Al Jazeera', art: senegal, lon: -17.4, lat: 14.7,
    head: ['Four bodies found after', 'migrant boat capsizes'], sub: 'Search goes on off Yenne, near Dakar.' },
];

const briefs = [
  ['ASIA', 'Seoul', 'ruling party adopts plan to impeach the chief justice'],
  ['ASIA', 'Beijing', 'loan prime rates held for an 18th straight month'],
  ['ASIA', 'Shenzhen', 'Xi hails a ‘turnaround’ with Australia’s Albanese'],
  ['ASIA', 'Shenzhen', 'Indonesia’s Prabowo, Xi discuss South China Sea'],
  ['ASIA', 'Tokyo', 'SoftBank shares plunge 15% in morning trade'],
  ['ASIA', 'Jakarta', 'Google asked to explain 19,000 YouTube removals'],
  ['MIDDLE EAST', 'Hormuz', 'tanker hit by a projectile off Khasab, UKMTO says'],
  ['MIDDLE EAST', 'Gaza', 'civil defence says Israeli strikes killed six'],
  ['MIDDLE EAST', 'Lebanon', 'Israel says it hit a Hezbollah site in the Bekaa'],
  ['MIDDLE EAST', 'Saudi Arabia', 'coalition says it downed a missile in the south'],
  ['AFRICA', 'Malawi', 'fuel crisis brings overnight queues at the pumps'],
  ['AFRICA', 'South Africa', 'police data: murders down 3.5%, still 60 a day'],
  ['AFRICA', 'Abuja', 'court bars Atiku’s new evidence against Tinubu'],
  ['AFRICA', 'Uganda', 'police told to enforce Ebola ban on rallies'],
  ['AMERICAS', 'Washington', 'Trump accuses Iran of bad-faith peace talks'],
  ['AMERICAS', 'New York', 'Anthropic slides about 9% in early trading'],
  ['AMERICAS', 'Port-au-Prince', 'police say a raid killed 34 gang suspects'],
  ['AMERICAS', 'Las Vegas', 'Russell fastest in final Grand Prix practice'],
  ['AMERICAS', 'Los Angeles', 'magnitude 4.4 quake near downtown'],
  ['EUROPE', 'Germany', 'pupils walk out over the military service law'],
  ['EUROPE', 'London', 'retail sales up 0.7%; borrowing £17.0bn in October'],
  ['EUROPE', 'Turin', 'Alcaraz beats Cobolli 6-4 6-1, into ATP Finals semis'],
  ['EUROPE', 'Barcelona', 'pancreatic cancer pill trial: 60.7% respond'],
  ['OCEANIA', 'Sydney', 'man, 35, charged with terrorism offences'],
  ['OCEANIA', 'Bougainville', 'Rio Tinto pledges US$250m for Panguna clean-up'],
  ['GLOBAL', 'Antalya', '75 nations back a ‘35 by 35’ electricity goal'],
  ['GLOBAL', 'UN', 'World Children’s Day marked around the globe'],
  ['GLOBAL', 'Space', 'BepiColombo on final approach to Mercury'],
].map(([region, place, line], i) => ({ n: 14 + i, region, place, line }));

const stories = [...leads, ...cards, ...briefs];
const total = stories.length;

// The day in six figures, each one taken from a story on the page.
const figures = [
  ['3', 'Dnipro bridges hit in Kyiv'],
  ['8', 'killed across Ukraine'],
  ['−6.2%', 'Taiwan’s Taiex at the close'],
  ['2.3%', 'Japan’s inflation, October'],
  ['18', 'months China has held rates'],
  ['118', 'Glenn Phillips v India'],
];

// ---------------------------------------------------------------- page pieces

function masthead() {
  return [
    text(16, 30, 'THE WORLD IN ONE DAY', 14, { bold: true, ls: 2.500 }),
    text(1008, 30, `${total} STORIES · 7 REGIONS · EVERY ONE FROM THIS FRIDAY`, 12.500, { bold: true, ls: 1, fill: GREY, anchor: 'end' }),
    `<rect x="16" y="38" width="992" height="74" fill="${INK}"/>`,
    text(512, 94, 'FRIDAY 20 NOVEMBER 2026', 58, { serif: true, bold: true, fill: '#ffffff', anchor: 'middle' }),
    text(512, 131, 'Missiles on Kyiv’s bridges  ·  Cyclone Akvan ashore in India  ·  COP31 stuck on its last day  ·  AI sell-off  ·  UK–EU reset',
      13.500, { serif: true, italic: true, fill: RED, anchor: 'middle' }),
    `<line x1="16" y1="140" x2="1008" y2="140" stroke="${INK}" stroke-width="2"/>`,
  ].join('\n');
}

function figureStrip() {
  const y = 146;
  const w = 992 / figures.length;
  return figures.map(([n, label], i) => {
    const x = 16 + i * w;
    return `<rect x="${x.toFixed(1)}" y="${y}" width="3" height="38" fill="${RED}"/>` +
      text((x + 10).toFixed(1), y + 21, n, 24, { serif: true, bold: true }) +
      text((x + 10).toFixed(1), y + 35, label, 10.500, { fill: GREY });
  }).join('\n');
}

function regionBar() {
  const y = 190;
  const gap = 3;
  const names = Object.keys(REGION);
  const unit = (992 - gap * (names.length - 1)) / total;
  let x = 16;
  return names.map((name) => {
    const count = stories.filter((s) => s.region === name).length;
    const w = count * unit;
    const piece = `<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="15" fill="${REGION[name]}"/>` +
      text((x + w / 2).toFixed(1), y + 11, `${name} ${count}`, 9.500, { bold: true, fill: '#ffffff', anchor: 'middle', ls: 0.500 });
    x += w + gap;
    return piece;
  }).join('\n');
}

function leadTile(s, i) {
  const x = 16 + i * 336;
  const y = 212;
  const color = REGION[s.region];
  return `<g transform="translate(${x} ${y})">
    <svg width="320" height="104" viewBox="0 0 320 104">${s.art()}</svg>
    <rect width="320" height="104" fill="none" stroke="${INK}" stroke-width="1.500"/>
    ${disc(10, 120, s.n, color)}
    ${text(24, 124, `${s.region} · ${s.field}`, 11, { bold: true, ls: 1, fill: color })}
    ${text(320, 124, s.src, 10, { italic: true, fill: GREY, anchor: 'end' })}
    ${text(0, 148, s.head[0], 21.500, { serif: true, bold: true })}
    ${text(0, 172, s.head[1], 21.500, { serif: true, bold: true })}
    ${text(0, 191, s.sub[0], 12.500, { fill: GREY })}
    ${text(0, 206, s.sub[1], 12.500, { fill: GREY })}
  </g>`;
}

function card(s, i) {
  const x = 16 + (i % 5) * 200.500;
  const y = 434 + Math.floor(i / 5) * 140;
  const color = REGION[s.region];
  return `<g transform="translate(${x} ${y})">
    <svg width="190" height="62" viewBox="0 0 190 62">${s.art()}</svg>
    <rect width="190" height="62" fill="none" stroke="${INK}" stroke-width="1.200"/>
    ${disc(8, 76, s.n, color, 7.500)}
    ${text(20, 79.500, s.place, 9, { bold: true, ls: 0.400, fill: color })}
    ${text(190, 79.500, s.src, 8.500, { italic: true, fill: GREY, anchor: 'end' })}
    ${text(0, 99, s.head[0], 15.500, { serif: true, bold: true })}
    ${text(0, 117, s.head[1], 15.500, { serif: true, bold: true })}
    ${text(0, 132, s.sub, 11, { fill: GREY })}
  </g>`;
}

// A plain equirectangular map: rough continent outlines, one numbered pin per drawn story.
const LAND = [
  [[-165, 65], [-140, 70], [-95, 72], [-60, 60], [-55, 48], [-80, 25], [-97, 18], [-105, 22], [-120, 34], [-125, 48], [-150, 60]],
  [[-97, 18], [-80, 8], [-70, 12], [-50, 0], [-35, -8], [-40, -22], [-58, -38], [-68, -55], [-75, -45], [-70, -18], [-80, -5], [-78, 8]],
  [[-10, 36], [-10, 44], [-2, 50], [5, 60], [20, 70], [40, 68], [40, 45], [28, 36], [10, 38]],
  [[-17, 15], [-10, 30], [10, 36], [32, 31], [43, 11], [51, 11], [40, -15], [33, -27], [20, -35], [12, -17], [9, 4], [-8, 5]],
  [[40, 68], [70, 75], [110, 75], [170, 68], [180, 65], [140, 50], [130, 40], [120, 23], [108, 10], [100, 5], [95, 16], [80, 8], [72, 20], [60, 25], [48, 13], [43, 11], [35, 31], [28, 36], [40, 45]],
  [[114, -22], [130, -12], [142, -11], [153, -26], [147, -38], [132, -33], [116, -34]],
  [[172, -35], [178, -38], [174, -46], [167, -45]],
  [[-6, 50], [-3, 58], [1, 52]],
  [[130, 32], [140, 36], [142, 44], [136, 36]],
];

function map(x, y, w, h) {
  const px = (lon) => x + ((lon + 180) / 360) * w;
  const py = (lat) => y + ((80 - lat) / 140) * h;
  const land = LAND.map((poly) =>
    `<polygon points="${poly.map(([lon, lat]) => `${px(lon).toFixed(1)},${py(lat).toFixed(1)}`).join(' ')}" fill="#e3d3a4" stroke="#b8a777" stroke-width="0.800"/>`).join('');
  // nudges keep the crowded pins of Europe and the Middle East apart
  const nudge = { 1: [14, -7], 3: [-3, 9], 5: [-14, -9], 6: [0, -21], 7: [11, 3], 8: [-9, 9] };
  const pins = [...leads, ...cards].map((s) => {
    const [dx, dy] = nudge[s.n] ?? [0, 0];
    return disc(px(s.lon) + dx, py(s.lat) + dy, s.n, REGION[s.region], 6.500);
  }).join('');
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#cfe2ee" stroke="${INK}" stroke-width="1.200"/>${land}${pins}`;
}

function lower() {
  const top = 722;
  const out = [
    `<line x1="16" y1="${top - 6}" x2="1008" y2="${top - 6}" stroke="${INK}" stroke-width="2"/>`,
    text(16, top + 12, 'WHERE IT HAPPENED', 12, { bold: true, ls: 1.500, fill: RED }),
    map(16, top + 20, 248, 176),
    text(16, top + 210, 'Pins 1–13 are the drawn stories; colours are the', 9.500, { fill: GREY }),
    text(16, top + 222, 'regions in the bar under the date.', 9.500, { fill: GREY }),
    text(278, top + 12, `ALSO ON FRIDAY 20 NOVEMBER 2026 — ${briefs.length} MORE STORIES`, 12, { bold: true, ls: 1.500, fill: RED }),
  ];
  const rows = Math.ceil(briefs.length / 2);
  briefs.forEach((b, i) => {
    const col = Math.floor(i / rows);
    const bx = 278 + col * 368; // two columns to the right of the map
    const by = top + 32 + (i % rows) * 14.900;
    out.push(disc(bx + 7, by - 4, b.n, REGION[b.region], 6.800));
    out.push(`<text x="${bx + 19}" y="${by}" font-family="${SANS}" font-size="11.800" fill="${INK}"><tspan font-weight="700">${esc(b.place)}:</tspan> ${esc(b.line)}</text>`);
  });
  return out.join('\n');
}

function dateCheck() {
  const y = 953;
  return [
    `<rect x="16" y="${y}" width="992" height="48" fill="#fbf3e1" stroke="${RED}" stroke-width="1.500"/>`,
    `<rect x="24" y="${y + 6}" width="92" height="17" fill="${RED}"/>`,
    text(70, y + 18.500, 'DATE CHECK', 11, { bold: true, fill: '#ffffff', anchor: 'middle', ls: 1 }),
    text(126, y + 18.500, 'Left out on purpose because they broke on Thursday 19 November: the Trump–Xi–Putin declaration in Shenzhen, the ICJ’s Myanmar', 11.300),
    text(24, y + 31.500, 'genocide ruling, Anthropic’s stock-market debut, Denmark’s Greenland vote and the missile strike on Riyadh’s tallest tower. Not yet happened:', 11.300),
    text(24, y + 43.500, 'BepiColombo enters Mercury orbit on Saturday 21 November; the Copa Sudamericana final and any final COP31 text also come later.', 11.300),
    text(16, 1013, 'Every story here happened or was first reported on Friday 20 November 2026. Counts and claims are attributed; figures as reported that day.', 10, { fill: GREY }),
    text(1008, 1013, 'Sources named on the drawn stories. Original drawings.', 10, { fill: GREY, anchor: 'end' }),
  ].join('\n');
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<rect width="1024" height="1024" fill="${PAPER}"/>
<rect x="5" y="5" width="1014" height="1014" fill="none" stroke="${INK}" stroke-width="2"/>
${masthead()}
${figureStrip()}
${regionBar()}
${leads.map(leadTile).join('\n')}
<line x1="16" y1="427" x2="1008" y2="427" stroke="${INK}" stroke-width="1"/>
${cards.map(card).join('\n')}
${lower()}
${dateCheck()}
</svg>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Friday 20 November 2026: the day's world news</title>
<style>html, body { margin: 0; padding: 0; background: ${PAPER}; } svg { display: block; }</style>
</head>
<body>
${svg}
</body>
</html>
`;

writeFileSync(new URL('./front-page.html', import.meta.url), html);
console.log(`front-page.html: ${total} stories (${leads.length} leads, ${cards.length} cards, ${briefs.length} briefs)`);
