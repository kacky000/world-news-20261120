// Builds art/front-page.html: a 1024x1024 SVG front page for Friday 20 November 2026.
// 36 stories, every one of them from that Friday: 3 drawn leads, 10 drawn cards, 23 numbered briefs,
// a pin map and a date check. Run from the repository root:  node art/build.mjs && bash art/render.sh
import { writeFileSync } from 'node:fs';

const INK = '#14110f';
const PAPER = '#f4ecd8';
const GREY = '#4a433b';
const SANS = 'Arial, Helvetica, sans-serif';
const SERIF = "Georgia, 'Times New Roman', serif";
const REGION = {
  EUROPE: '#1d4e9e',
  ASIA: '#b3541e',
  OCEANIA: '#0f7d86',
  AFRICA: '#1f7a4d',
  AMERICAS: '#8a1c1c',
  'MIDDLE EAST': '#a0760b',
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
  ].filter(Boolean).join(' ');
  return `<text ${attrs}>${esc(s)}</text>`;
}

/** The numbered disc that ties a story to its pin on the map. */
function disc(cx, cy, n, color, r = 9) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="1.2"/>` +
    text(cx, cy + r * 0.38, n, r * 1.1, { bold: true, fill: '#ffffff', anchor: 'middle' });
}

// ---------------------------------------------------------------- lead drawings (320 x 104)

const kyiv = () => `
  <rect width="320" height="104" fill="#151f47"/>
  <rect y="40" width="320" height="30" fill="#2c2f5c"/>
  <g fill="#ffffff" opacity="0.8"><circle cx="24" cy="12" r="1"/><circle cx="96" cy="20" r="1"/><circle cx="150" cy="9" r="1"/><circle cx="300" cy="14" r="1"/></g>
  <path d="M0 70 V56 H18 V48 H36 V58 H56 V44 H72 V60 H212 V50 H232 V42 H250 V56 H280 V46 H300 V58 H320 V70 Z" fill="#070c1f"/>
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
  <g stroke="#ffffff" stroke-width="2" stroke-dasharray="6 4"><line x1="316" y1="2" x2="198" y2="46"/><line x1="250" y1="0" x2="186" y2="40"/></g>
  <rect x="216" y="8" width="98" height="22" rx="3" fill="#ffd23f"/>${text(265, 24, '3 BRIDGES HIT', 12.5, { bold: true, anchor: 'middle' })}
  ${text(8, 99, 'DNIPRO RIVER · KYIV', 9, { bold: true, fill: '#cfe0f2', ls: 1 })}`;

const cyclone = () => `
  <rect width="320" height="104" fill="#2f6f9f"/>
  <polygon points="0,0 150,0 128,30 98,66 70,104 0,104" fill="#86b06c"/>
  <polygon points="150,0 128,30 98,66 70,104 62,104 90,66 120,30 142,0" fill="#e9dca6"/>
  <g fill="none" stroke="#ffffff" stroke-linecap="round" transform="rotate(-20 214 54)">
    <circle cx="214" cy="54" r="46" stroke-width="9" stroke-dasharray="105 184" opacity="0.75"/>
    <circle cx="214" cy="54" r="46" stroke-width="9" stroke-dasharray="75 214" stroke-dashoffset="-150" opacity="0.75"/>
    <circle cx="214" cy="54" r="32" stroke-width="9" stroke-dasharray="80 121" stroke-dashoffset="-36" opacity="0.9"/>
    <circle cx="214" cy="54" r="32" stroke-width="9" stroke-dasharray="50 151" stroke-dashoffset="-142" opacity="0.9"/>
    <circle cx="214" cy="54" r="18" stroke-width="9" stroke-dasharray="72 41"/>
  </g>
  <circle cx="214" cy="54" r="6" fill="#17456b"/>
  <line x1="196" y1="51" x2="128" y2="46" stroke="#d62828" stroke-width="3.500"/>
  <polygon points="116,45 131,39 130,53" fill="#d62828"/>
  <circle cx="108" cy="46" r="5" fill="#d62828" stroke="#ffffff" stroke-width="1.500"/>
  ${text(8, 42, 'GOPALPUR', 12, { bold: true })}
  ${text(10, 82, 'ODISHA, INDIA', 10, { bold: true, fill: '#2f5a22', ls: 1 })}
  ${text(312, 98, 'Bay of Bengal', 10, { italic: true, fill: '#d7e8f5', anchor: 'end' })}
  <rect x="216" y="6" width="98" height="20" rx="3" fill="#14110f"/>${text(265, 20, 'LANDFALL 20 NOV', 10.5, { bold: true, fill: '#ffffff', anchor: 'middle' })}`;

const cop = () => `
  <rect width="320" height="104" fill="#dff0e4"/>
  <circle cx="58" cy="54" r="36" fill="#3d86c6"/>
  <path d="M36 36 q12 -14 26 -7 q5 9 -5 16 q-4 12 -14 9 q-10 -7 -7 -18 Z" fill="#5fa457"/>
  <path d="M65 60 q14 -5 21 5 q-2 14 -14 17 q-10 -5 -7 -22 Z" fill="#5fa457"/>
  <g transform="rotate(3 210 54)">
    <rect x="124" y="10" width="172" height="84" fill="#ffffff" stroke="${INK}" stroke-width="1.500"/>
    ${text(134, 28, 'COP31 · DRAFT TEXT', 11.5, { bold: true })}
    <line x1="134" y1="38" x2="284" y2="38" stroke="#9a948a" stroke-width="2.500"/>
    ${text(134, 59, 'fossil-fuel phase-out', 14, { bold: true })}
    <line x1="130" y1="54" x2="282" y2="54" stroke="#d62828" stroke-width="3.500"/>
    <line x1="134" y1="72" x2="284" y2="72" stroke="#9a948a" stroke-width="2.500"/>
    <line x1="134" y1="82" x2="240" y2="82" stroke="#9a948a" stroke-width="2.500"/>
  </g>`;

// ---------------------------------------------------------------- card drawings (190 x 62)

const markets = () => `
  <rect width="190" height="62" fill="#151a24"/>
  <g stroke="#2c3546" stroke-width="1"><line x1="0" y1="20" x2="190" y2="20"/><line x1="0" y1="40" x2="190" y2="40"/></g>
  <polyline points="6,14 30,11 50,20 70,17 92,34 112,31 136,50 160,54" fill="none" stroke="#ff4d4d" stroke-width="4" stroke-linejoin="round"/>
  <polygon points="176,60 158,58 170,44" fill="#ff4d4d"/>
  ${text(184, 18, 'TAIEX −6.2%', 11, { bold: true, fill: '#ff9c9c', anchor: 'end' })}`;

const ukEu = () => `
  <rect width="190" height="62" fill="#e3eaf6"/>
  <svg x="14" y="9" width="66" height="44" viewBox="0 0 60 40" preserveAspectRatio="none">
    <rect width="60" height="40" fill="#012169"/>
    <g stroke="#ffffff" stroke-width="8"><line x1="0" y1="0" x2="60" y2="40"/><line x1="60" y1="0" x2="0" y2="40"/></g>
    <g stroke="#c8102e" stroke-width="3"><line x1="0" y1="0" x2="60" y2="40"/><line x1="60" y1="0" x2="0" y2="40"/></g>
    <g stroke="#ffffff" stroke-width="12"><line x1="30" y1="0" x2="30" y2="40"/><line x1="0" y1="20" x2="60" y2="20"/></g>
    <g stroke="#c8102e" stroke-width="7"><line x1="30" y1="0" x2="30" y2="40"/><line x1="0" y1="20" x2="60" y2="20"/></g>
  </svg>
  <rect x="110" y="9" width="66" height="44" fill="#003399"/>
  <g fill="#ffcc00">${Array.from({ length: 12 }, (_, k) => {
    const a = (k * Math.PI) / 6;
    return `<circle cx="${(143 + 14 * Math.sin(a)).toFixed(1)}" cy="${(31 - 14 * Math.cos(a)).toFixed(1)}" r="2"/>`;
  }).join('')}</g>
  <circle cx="95" cy="31" r="12" fill="#1f7a4d" stroke="#ffffff" stroke-width="2"/>
  <polyline points="89,31 94,36 102,26" fill="none" stroke="#ffffff" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/>`;

const poland = () => `
  <rect width="190" height="62" fill="#b9d3ea"/>
  <rect y="40" width="190" height="22" fill="#8fae5d"/>
  <g stroke="#7d9a4f" stroke-width="2"><line x1="0" y1="48" x2="190" y2="48"/><line x1="0" y1="56" x2="190" y2="56"/></g>
  <rect x="10" y="8" width="34" height="11" fill="#ffffff" stroke="#9aa7b5" stroke-width="0.500"/><rect x="10" y="19" width="34" height="11" fill="#dc143c"/>
  <g transform="rotate(28 110 40)">
    <rect x="78" y="35" width="62" height="9" rx="4" fill="#6c737c"/>
    <polygon points="140,35 154,39.500 140,44" fill="#4d535b"/>
    <polygon points="84,35 76,26 92,35" fill="#4d535b"/><polygon points="84,44 76,53 92,44" fill="#4d535b"/>
  </g>
  <g fill="#6b5a45" opacity="0.8"><circle cx="150" cy="50" r="7"/><circle cx="162" cy="46" r="5"/><circle cx="140" cy="47" r="4"/></g>
  ${text(184, 16, 'KH-101', 11, { bold: true, fill: '#14110f', anchor: 'end' })}`;

const italy = () => `
  <rect width="190" height="62" fill="#efe6d2"/>
  <rect x="8" y="8" width="16" height="30" fill="#009246"/><rect x="24" y="8" width="16" height="30" fill="#ffffff"/><rect x="40" y="8" width="16" height="30" fill="#ce2b37"/>
  <rect x="70" y="8" width="112" height="20" fill="#ce2b37"/>${text(126, 23, 'SCIOPERO', 13, { bold: true, fill: '#ffffff', anchor: 'middle', ls: 1 })}
  <g stroke="${INK}" stroke-width="2"><line x1="82" y1="28" x2="82" y2="46"/><line x1="170" y1="28" x2="170" y2="46"/></g>
  <g fill="#3a332c">${[72, 92, 112, 132, 152, 172].map((x) => `<circle cx="${x}" cy="44" r="5"/><rect x="${x - 6}" y="49" width="12" height="13" rx="3"/>`).join('')}</g>`;

const japan = () => `
  <rect width="190" height="62" fill="#ffffff"/>
  <circle cx="34" cy="31" r="17" fill="#bc002d"/>
  <g fill="#3b5b8c"><rect x="74" y="40" width="14" height="16"/><rect x="94" y="34" width="14" height="22"/><rect x="114" y="36" width="14" height="20"/><rect x="134" y="24" width="14" height="32"/></g>
  <line x1="68" y1="56" x2="156" y2="56" stroke="${INK}" stroke-width="1.500"/>
  ${text(184, 20, 'CPI 2.3%', 13, { bold: true, fill: '#bc002d', anchor: 'end' })}`;

const china = () => `
  <rect width="190" height="62" fill="#c8102e"/>
  <polygon points="22,10 25,19 34,19 27,24 30,33 22,28 14,33 17,24 10,19 19,19" fill="#ffde00"/>
  <line x1="48" y1="30" x2="182" y2="30" stroke="#ffde00" stroke-width="3"/>
  <line x1="48" y1="46" x2="182" y2="46" stroke="#ffffff" stroke-width="3"/>
  ${text(182, 24, '5-YEAR 3.5%', 11, { bold: true, fill: '#ffde00', anchor: 'end' })}
  ${text(182, 58, '1-YEAR 3.0%', 11, { bold: true, fill: '#ffffff', anchor: 'end' })}
  ${text(50, 42, 'UNCHANGED', 9, { bold: true, fill: '#ffffff', ls: 1 })}`;

const cricket = () => `
  <rect width="190" height="62" fill="#4e9a52"/>
  <rect x="60" y="0" width="70" height="62" fill="#d9c58b"/>
  <g transform="rotate(-35 70 34)"><rect x="62" y="10" width="14" height="36" rx="3" fill="#c79a55" stroke="#7a5a2b" stroke-width="1"/><rect x="66" y="44" width="6" height="14" fill="#3a332c"/></g>
  <circle cx="112" cy="20" r="6" fill="#b3202a" stroke="#ffffff" stroke-width="1"/>
  <g stroke="#ffffff" stroke-width="2"><line x1="140" y1="18" x2="140" y2="52"/><line x1="146" y1="18" x2="146" y2="52"/><line x1="152" y1="18" x2="152" y2="52"/></g>
  <rect x="6" y="6" width="46" height="24" rx="3" fill="${INK}"/>${text(29, 24, '118', 16, { bold: true, fill: '#ffffff', anchor: 'middle' })}`;

const tennis = () => `
  <rect width="190" height="62" fill="#2b6cb0"/>
  <g stroke="#ffffff" stroke-width="2" fill="none"><rect x="10" y="8" width="170" height="46"/><line x1="95" y1="8" x2="95" y2="54"/><line x1="10" y1="31" x2="180" y2="31" stroke-dasharray="3 3"/></g>
  <circle cx="60" cy="24" r="7" fill="#d9e84a" stroke="#9aa72e" stroke-width="1"/>
  <rect x="112" y="16" width="62" height="30" rx="3" fill="${INK}"/>
  ${text(143, 29, '6-4', 12, { bold: true, fill: '#ffffff', anchor: 'middle' })}${text(143, 42, '6-1', 12, { bold: true, fill: '#ffffff', anchor: 'middle' })}`;

const xiAlbanese = () => `
  <rect width="190" height="62" fill="#efe6d2"/>
  <rect x="10" y="10" width="66" height="42" fill="#de2910"/>
  <polygon points="24,16 26.400,23 34,23 28,27.500 30,35 24,30.500 18,35 20,27.500 14,23 21.600,23" fill="#ffde00"/>
  <rect x="114" y="10" width="66" height="42" fill="#00247d"/>
  <g fill="#ffffff"><circle cx="130" cy="40" r="5"/><circle cx="160" cy="18" r="2.500"/><circle cx="170" cy="28" r="2.500"/><circle cx="160" cy="42" r="2.500"/><circle cx="150" cy="29" r="2.500"/></g>
  <rect x="114" y="10" width="26" height="16" fill="#00247d" stroke="#ffffff" stroke-width="1"/>
  <g stroke="#cf142b" stroke-width="2"><line x1="114" y1="18" x2="140" y2="18"/><line x1="127" y1="10" x2="127" y2="26"/></g>
  <g stroke="${INK}" stroke-width="3" stroke-linecap="round"><line x1="80" y1="31" x2="110" y2="31"/><polyline points="104,25 110,31 104,37" fill="none"/><polyline points="86,25 80,31 86,37" fill="none"/></g>`;

const senegal = () => `
  <rect width="190" height="62" fill="#9ec9e6"/>
  <rect y="30" width="190" height="32" fill="#1f5f8b"/>
  <g fill="none" stroke="#7fb4d6" stroke-width="2"><path d="M0 40 q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/><path d="M0 54 q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/></g>
  <path d="M58 34 Q95 8 132 34 Z" fill="#b5652a" stroke="#6e3a14" stroke-width="1.500"/>
  <line x1="62" y1="33" x2="128" y2="33" stroke="#e7c84a" stroke-width="2"/>
  <rect x="150" y="6" width="11" height="16" fill="#00853f"/><rect x="161" y="6" width="11" height="16" fill="#fdef42"/><rect x="172" y="6" width="11" height="16" fill="#e31b23"/>
  ${text(8, 18, 'OFF YENNE', 10, { bold: true, fill: '#14324a', ls: 1 })}`;

// ---------------------------------------------------------------- the day's stories

const leads = [
  { n: 1, region: 'EUROPE', field: 'UKRAINE WAR', art: kyiv, lon: 30.5, lat: 50.4,
    head: ['Russian missiles hit three', 'Kyiv bridges; 8 killed'],
    sub: ['Biggest strike yet on the Dnipro crossings; power', 'cut in parts of the capital, the mayor says.'] },
  { n: 2, region: 'ASIA', field: 'CYCLONE', art: cyclone, lon: 84.9, lat: 19.3,
    head: ['Cyclone Akvan makes', 'landfall in eastern India'],
    sub: ['Storm crosses the Odisha coast near Gopalpur;', 'shelters open, transport disrupted.'] },
  { n: 3, region: 'GLOBAL', field: 'CLIMATE', art: cop, lon: 30.7, lat: 36.9,
    head: ['COP31 deadlocked on', 'its final day in Antalya'],
    sub: ['New draft drops the fossil-fuel phase-out; finance', 'text weakened. Talks may run into the weekend.'] },
];

const cards = [
  { n: 4, region: 'ASIA', field: 'MARKETS', art: markets, lon: 121.5, lat: 25.0,
    head: ['AI sell-off sinks', 'Asian stock markets'], sub: ['Taiex −6.2%, Kospi −5.2%,', 'Nikkei −5.1% at the close.'] },
  { n: 5, region: 'EUROPE', field: 'DIPLOMACY', art: ukEu, lon: 4.4, lat: 50.8,
    head: ['UK and EU agree a', 'post-Brexit reset deal'], sub: ['Youth mobility, food trade,', 'carbon link; fees still open.'] },
  { n: 6, region: 'EUROPE', field: 'SECURITY', art: poland, lon: 22.6, lat: 51.2,
    head: ['Russian missile falls', 'inside Poland'], sub: ['Kh-101 lands near Nowy Lipowiec;', 'no injuries, Warsaw says.'] },
  { n: 7, region: 'EUROPE', field: 'LABOUR', art: italy, lon: 12.5, lat: 41.9,
    head: ['General strike across', 'Italy over 2027 budget'], sub: ['CGIL walkout hits schools and', 'health; tens of thousands march.'] },
  { n: 8, region: 'ASIA', field: 'ECONOMY', art: japan, lon: 139.7, lat: 35.7,
    head: ['Japan inflation rises', 'to 2.3% in October'], sub: ['Fastest pace this year; core', 'CPI 2.2%, statistics bureau.'] },
  { n: 9, region: 'ASIA', field: 'RATES', art: china, lon: 116.4, lat: 39.9,
    head: ['China holds lending', 'rates for 18th month'], sub: ['One-year LPR stays 3.0%,', 'five-year 3.5%, PBOC says.'] },
  { n: 10, region: 'OCEANIA', field: 'CRICKET', art: cricket, lon: 174.8, lat: -41.3,
    head: ['Phillips hits 118 as', 'NZ make 368 v India'], sub: ['Day 2 in Wellington: India', 'reply 159-1 at stumps.'] },
  { n: 11, region: 'EUROPE', field: 'TENNIS', art: tennis, lon: 7.7, lat: 45.1,
    head: ['Alcaraz beats Cobolli,', 'into ATP Finals semis'], sub: ['6-4 6-1 in Turin; unbeaten in', 'his group, meets Shelton next.'] },
  { n: 12, region: 'ASIA', field: 'DIPLOMACY', art: xiAlbanese, lon: 114.1, lat: 22.5,
    head: ['Xi hails ‘turnaround’', 'in ties with Australia'], sub: ['Meets PM Albanese in Shenzhen;', 'farm and AI cooperation urged.'] },
  { n: 13, region: 'AFRICA', field: 'MIGRATION', art: senegal, lon: -17.4, lat: 14.7,
    head: ['Four bodies found after', 'Senegal boat capsizes'], sub: ['Search goes on off Yenne for', 'migrants bound for Spain.'] },
];

const briefs = [
  ['ASIA', 'Shenzhen', 'Indonesia’s Prabowo, Xi discuss South China Sea'],
  ['ASIA', 'Jakarta', 'Google asked to explain 19,000 YouTube removals'],
  ['OCEANIA', 'Sydney', 'man, 35, charged with terrorism offences'],
  ['ASIA', 'Tokyo', 'SoftBank shares plunge 15% in morning trade'],
  ['ASIA', 'Hong Kong', 'Hang Seng falls 1.9%, nears a bear market'],
  ['ASIA', 'Taipei', 'stocks cap their worst week since 1991'],
  ['AMERICAS', 'New York', 'Anthropic slides about 9% in early trading'],
  ['AMERICAS', 'Wall Street', 'Nasdaq futures −1.6%; AMD −7% pre-market'],
  ['AMERICAS', 'Los Angeles', 'magnitude 4.4 quake near downtown'],
  ['EUROPE', 'Kyiv', 'power cut in parts of the city, DTEK says'],
  ['EUROPE', 'Lviv', 'deaths reported as strikes reach the west'],
  ['EUROPE', 'Moscow', 'Russia says it hit energy and transport sites'],
  ['EUROPE', 'Poland', 'Patriots on alert; NATO AWACS patrol the east'],
  ['EUROPE', 'Brussels', 'UK–EU tuition-fee talks get six more months'],
  ['EUROPE', 'Rome', 'rail and air travel exempt from the strike'],
  ['GLOBAL', 'Antalya', 'Panama vows to block a weak COP31 text'],
  ['GLOBAL', 'Antalya', '75 nations back ‘35 by 35’ electricity goal'],
  ['ASIA', 'Odisha', 'thousands of cyclone shelters opened'],
  ['MIDDLE EAST', 'Iraq', 'troops deploy in militia base Jurf al-Sakhar'],
  ['AFRICA', 'Dakar', 'president urges tighter coastal controls'],
  ['EUROPE', 'Turin', 'Alcaraz v Shelton set for Saturday’s semi-final'],
  ['GLOBAL', 'UN', 'World Children’s Day marked around the globe'],
  ['GLOBAL', 'Space', 'BepiColombo on final approach to Mercury'],
].map(([region, place, line], i) => ({ n: 14 + i, region, place, line }));

const total = leads.length + cards.length + briefs.length;

// ---------------------------------------------------------------- page pieces

function masthead() {
  return [
    text(16, 30, 'THE WORLD IN ONE DAY', 14, { bold: true, ls: 2.500 }),
    text(1008, 30, `${total} STORIES · 7 REGIONS · EVERY ONE FROM THIS FRIDAY`, 12.500, { bold: true, ls: 1, fill: GREY, anchor: 'end' }),
    `<rect x="16" y="38" width="992" height="74" fill="${INK}"/>`,
    text(512, 94, 'FRIDAY 20 NOVEMBER 2026', 58, { serif: true, bold: true, fill: '#ffffff', anchor: 'middle' }),
    text(512, 131, 'Missiles on Kyiv’s bridges  ·  Cyclone Akvan ashore in India  ·  COP31 stuck on its last day  ·  AI sell-off  ·  UK–EU reset',
      13.500, { serif: true, italic: true, fill: '#8a1c1c', anchor: 'middle' }),
    `<line x1="16" y1="140" x2="1008" y2="140" stroke="${INK}" stroke-width="2"/>`,
  ].join('\n');
}

function leadTile(s, i) {
  const x = 16 + i * 336;
  const y = 148;
  const color = REGION[s.region];
  return `<g transform="translate(${x} ${y})">
    <svg width="320" height="104" viewBox="0 0 320 104">${s.art()}</svg>
    <rect width="320" height="104" fill="none" stroke="${INK}" stroke-width="1.500"/>
    ${disc(10, 120, s.n, color)}
    ${text(24, 124, `${s.region} · ${s.field}`, 11, { bold: true, ls: 1, fill: color })}
    ${text(0, 148, s.head[0], 21.500, { serif: true, bold: true })}
    ${text(0, 172, s.head[1], 21.500, { serif: true, bold: true })}
    ${text(0, 191, s.sub[0], 12.500, { fill: GREY })}
    ${text(0, 206, s.sub[1], 12.500, { fill: GREY })}
  </g>`;
}

function card(s, i) {
  const x = 16 + (i % 5) * 200.500;
  const y = 368 + Math.floor(i / 5) * 162;
  const color = REGION[s.region];
  return `<g transform="translate(${x} ${y})">
    <svg width="190" height="62" viewBox="0 0 190 62">${s.art()}</svg>
    <rect width="190" height="62" fill="none" stroke="${INK}" stroke-width="1.200"/>
    ${disc(8, 76, s.n, color, 7.500)}
    ${text(20, 79.500, `${s.region} · ${s.field}`, 9.500, { bold: true, ls: 0.800, fill: color })}
    ${text(0, 99, s.head[0], 15.500, { serif: true, bold: true })}
    ${text(0, 117, s.head[1], 15.500, { serif: true, bold: true })}
    ${text(0, 133, s.sub[0], 11.500, { fill: GREY })}
    ${text(0, 147, s.sub[1], 11.500, { fill: GREY })}
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
  // nudges keep the crowded European pins apart
  const nudge = { 1: [12, -6], 3: [11, 10], 5: [-13, -9], 6: [0, -20], 7: [-2, 12], 11: [-17, 5], 12: [-10, 10], 4: [9, 0], 9: [-6, -9] };
  const pins = [...leads, ...cards].map((s) => {
    const [dx, dy] = nudge[s.n] ?? [0, 0];
    return disc(px(s.lon) + dx, py(s.lat) + dy, s.n, REGION[s.region], 6.500);
  }).join('');
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#cfe2ee" stroke="${INK}" stroke-width="1.200"/>${land}${pins}`;
}

function lower() {
  const top = 696;
  const out = [
    `<line x1="16" y1="${top - 6}" x2="1008" y2="${top - 6}" stroke="${INK}" stroke-width="2"/>`,
    text(16, top + 12, 'WHERE IT HAPPENED', 12, { bold: true, ls: 1.500, fill: '#8a1c1c' }),
    map(16, top + 20, 248, 172),
    text(278, top + 12, 'ALSO ON FRIDAY 20 NOVEMBER 2026', 12, { bold: true, ls: 1.500, fill: '#8a1c1c' }),
  ];
  // region key under the map
  Object.entries(REGION).forEach(([name, color], i) => {
    const kx = 16 + (i % 4) * 63;
    const ky = top + 206 + Math.floor(i / 4) * 15;
    out.push(`<circle cx="${kx + 5}" cy="${ky - 4}" r="4.500" fill="${color}"/>`, text(kx + 13, ky, name, 8.500, { bold: true, fill: GREY }));
  });
  briefs.forEach((b, i) => {
    const col = Math.floor(i / 12);
    const bx = 278 + col * 372; // two columns to the right of the map
    const by = top + 33 + (i % 12) * 17.700;
    out.push(disc(bx + 8, by - 4, b.n, REGION[b.region], 7.500));
    out.push(`<text x="${bx + 21}" y="${by}" font-family="${SANS}" font-size="12.300" fill="${INK}"><tspan font-weight="700">${esc(b.place)}:</tspan> ${esc(b.line)}</text>`);
  });
  return out.join('\n');
}

function dateCheck() {
  const y = 936;
  return [
    `<rect x="16" y="${y}" width="992" height="52" fill="#fbf3e1" stroke="#8a1c1c" stroke-width="1.500"/>`,
    `<rect x="24" y="${y + 8}" width="92" height="18" fill="#8a1c1c"/>`,
    text(70, y + 21, 'DATE CHECK', 11, { bold: true, fill: '#ffffff', anchor: 'middle', ls: 1 }),
    text(126, y + 21, 'Left out on purpose because they broke on Thursday 19 November: the Trump–Xi–Putin declaration in Shenzhen, the ICJ’s Myanmar', 11.500),
    text(24, y + 36, 'genocide ruling, Anthropic’s stock-market debut, Denmark’s Greenland vote and Somalia expelling the UAE ambassador. Not yet: BepiColombo enters', 11.500),
    text(24, y + 48, 'Mercury orbit on Saturday 21 November; the Copa Sudamericana final is also on Saturday.', 11.500),
    text(16, 1006, 'Every story here happened or was first reported on Friday 20 November 2026. Figures are as reported that day.', 10.500, { fill: GREY }),
    text(1008, 1006, 'Sources: Reuters, AP, AFP, UN News, Kyiv Independent, Al Jazeera, PBOC, ATP. Original drawings.', 10.500, { fill: GREY, anchor: 'end' }),
  ].join('\n');
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<rect width="1024" height="1024" fill="${PAPER}"/>
<rect x="5" y="5" width="1014" height="1014" fill="none" stroke="${INK}" stroke-width="2"/>
${masthead()}
${leads.map(leadTile).join('\n')}
<line x1="16" y1="361" x2="1008" y2="361" stroke="${INK}" stroke-width="1"/>
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
