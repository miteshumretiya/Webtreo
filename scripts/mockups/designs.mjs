import { page } from "./shared.mjs";

/* ───────────── 1. Fieldnote — B2B SaaS analytics ───────────── */
const fieldnote = page({
  bg: "#F5F3EE",
  fonts: "family=Inter+Tight:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500",
  css: `
body{font-family:'Inter Tight';color:#141413}
.logo{font-weight:800;font-size:26px;letter-spacing:-.04em;display:flex;gap:10px;align-items:center}
.logo i{width:26px;height:26px;border-radius:7px;background:#141413;position:relative;display:block}
.logo i:after{content:"";position:absolute;inset:6px 6px 6px 13px;background:#FF6A3D;border-radius:2px}
.btn{padding:16px 26px;border-radius:999px;font-weight:600;font-size:17px}
.dark{background:#141413;color:#fff}.ghost{border:1.5px solid #14141333}
.hero{display:grid;grid-template-columns:640px 1fr;gap:56px;padding:56px 72px 0}
.pill{display:inline-flex;gap:10px;align-items:center;background:#fff;border:1px solid #1414131a;border-radius:999px;padding:8px 16px 8px 8px;font-size:15px;font-weight:500}
.pill b{background:#FF6A3D;color:#fff;border-radius:999px;padding:4px 10px;font-size:13px}
h1{font-size:92px;line-height:.95;letter-spacing:-.055em;font-weight:700;margin:28px 0 26px}
h1 em{font-style:normal;color:#FF6A3D}
.sub{font-size:21px;line-height:1.5;color:#55554f;max-width:520px}
.cta{display:flex;gap:14px;margin-top:38px}
.dash{background:#fff;border-radius:28px;box-shadow:0 40px 80px -30px #0003,0 0 0 1px #14141310;padding:28px;height:640px}
.dhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.tabs{display:flex;gap:6px;background:#F5F3EE;padding:5px;border-radius:12px;font-size:14px;font-weight:600}
.tabs span{padding:8px 14px;border-radius:9px}.tabs .on{background:#fff;box-shadow:0 1px 3px #0002}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.kpi{border:1px solid #14141314;border-radius:18px;padding:18px}
.kpi small{font-family:'JetBrains Mono';font-size:12px;color:#77776f;text-transform:uppercase;letter-spacing:.05em}
.kpi p{font-size:38px;font-weight:700;letter-spacing:-.04em;margin-top:8px}
.kpi s{text-decoration:none;font-size:14px;font-weight:600;color:#1a9a5a;background:#E2F6EA;padding:3px 8px;border-radius:999px;margin-left:8px;vertical-align:middle}
.chart{margin-top:16px;border:1px solid #14141314;border-radius:18px;padding:18px;height:300px;position:relative}
.funnel{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:16px}
.funnel div{background:#F5F3EE;border-radius:12px;height:62px;position:relative;overflow:hidden;font-size:13px;font-weight:600;padding:10px 12px}
.funnel div i{position:absolute;left:0;bottom:0;height:8px;background:#FF6A3D}
.logos{display:flex;justify-content:space-between;padding:70px 72px 0;color:#14141366;font-weight:700;font-size:24px;letter-spacing:-.03em}
`,
  body: `
<div class="nav"><div class="logo"><i></i>fieldnote</div>
<div class="links"><span>Product</span><span>Solutions</span><span>Customers</span><span>Pricing</span><span>Docs</span></div>
<div class="row" style="gap:12px"><span class="btn ghost">Sign in</span><span class="btn dark">Book a demo</span></div></div>
<div class="hero"><div>
<span class="pill"><b>New</b> Journeys 2.0 is live →</span>
<h1>Product analytics that <em>reads like a story.</em></h1>
<p class="sub">See exactly where users get stuck, why they churn and which features make them stay — no SQL, no dashboards nobody opens.</p>
<div class="cta"><span class="btn dark">Start free trial</span><span class="btn ghost">Watch 2-min tour</span></div>
<p style="margin-top:34px;font-size:15px;color:#77776f">★★★★★ &nbsp;4.9 from 1,200+ product teams</p>
</div>
<div class="dash"><div class="dhead"><b style="font-size:20px;letter-spacing:-.02em">Activation overview</b><div class="tabs"><span>7d</span><span class="on">30d</span><span>90d</span></div></div>
<div class="kpis"><div class="kpi"><small>Activation</small><p>64.2%<s>+12%</s></p></div><div class="kpi"><small>Retention W4</small><p>41.8%<s>+6%</s></p></div><div class="kpi"><small>Time to value</small><p>3.4d<s>−2d</s></p></div></div>
<div class="chart"><small style="font-family:JetBrains Mono;font-size:12px;color:#77776f">WEEKLY ACTIVE USERS</small>
<svg viewBox="0 0 760 230" style="position:absolute;left:18px;right:18px;bottom:14px;width:calc(100% - 36px)"><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FF6A3D" stop-opacity=".35"/><stop offset="1" stop-color="#FF6A3D" stop-opacity="0"/></linearGradient></defs>
<g stroke="#14141310"><path d="M0 46H760M0 102H760M0 158H760M0 214H760"/></g>
<path d="M0 190C60 182 90 160 140 164S220 120 280 128 360 90 420 96 500 60 560 70 660 30 760 22V230H0Z" fill="url(#g)"/>
<path d="M0 190C60 182 90 160 140 164S220 120 280 128 360 90 420 96 500 60 560 70 660 30 760 22" fill="none" stroke="#FF6A3D" stroke-width="4"/>
<path d="M0 206C80 200 120 190 180 192S300 170 360 172 470 150 540 156 680 128 760 120" fill="none" stroke="#141413" stroke-width="3" stroke-dasharray="8 8" opacity=".5"/>
<circle cx="560" cy="70" r="9" fill="#fff" stroke="#FF6A3D" stroke-width="4"/></svg>
<div style="position:absolute;left:58%;top:34px;background:#141413;color:#fff;border-radius:12px;padding:10px 14px;font-size:14px"><b>18,402</b> users · Week 32</div></div>
<div class="funnel"><div>Signed up<i style="width:100%"></i></div><div>Created project<i style="width:78%"></i></div><div>Invited team<i style="width:52%"></i></div><div>Activated<i style="width:41%"></i></div></div>
</div></div>
<div class="logos"><span>Lumen</span><span>Northstar</span><span>Kernel</span><span>Atlas&amp;Co</span><span>Parcel</span><span>Quanta</span></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:56px 72px 0">${[["Journeys","Replay every path to activation, step by step."],["Signals","Get pinged the moment a cohort starts to slip."],["Ask Fieldnote","Plain-English questions, chart-ready answers."]].map(([a,b],i)=>`<div style="background:${i===1?"#141413":"#fff"};color:${i===1?"#fff":"#141413"};border-radius:24px;padding:28px;height:220px;border:1px solid #1414130f"><span style="display:inline-block;width:42px;height:42px;border-radius:12px;background:#FF6A3D"></span><p style="font-size:26px;font-weight:700;letter-spacing:-.03em;margin-top:22px">${a}</p><p style="font-size:17px;opacity:.7;margin-top:8px">${b}</p></div>`).join("")}</div>`,
});

/* ───────────── 2. Voltline — EV charging network ───────────── */
const streets = Array.from({ length: 26 }, (_, i) => {
  const a = (i * 47) % 1600;
  const b = (i * 83 + 300) % 1600;
  return `<path d="M${a} -20 L${b} 1220" />`;
}).join("") + Array.from({ length: 18 }, (_, i) => {
  const a = (i * 71) % 1200;
  const b = (i * 59 + 200) % 1200;
  return `<path d="M-20 ${a} L1620 ${b}" />`;
}).join("");
const voltline = page({
  bg: "#0A0E1A",
  fonts: "family=Space+Grotesk:wght@400;500;600;700",
  css: `
body{font-family:'Space Grotesk';color:#EEF1FF}
.map{position:absolute;inset:0}
.logo{font-weight:700;font-size:25px;letter-spacing:.12em;display:flex;gap:10px;align-items:center}
.btn{padding:16px 26px;border-radius:14px;font-weight:600;font-size:17px}
.lime{background:#C8FF3D;color:#0A0E1A}.ghost{border:1px solid #ffffff2e}
.hero{position:relative;padding:84px 72px 0;width:860px}
.tag{font-size:15px;color:#C8FF3D;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
h1{font-size:110px;line-height:.92;letter-spacing:-.045em;font-weight:700;margin:24px 0 28px}
.sub{font-size:21px;line-height:1.5;color:#AEB4CC;max-width:560px}
.stats{display:flex;gap:16px;margin-top:56px}
.stat{background:#ffffff0d;border:1px solid #ffffff17;border-radius:18px;padding:20px 24px;backdrop-filter:blur(8px);min-width:190px}
.stat p{font-size:40px;font-weight:700;letter-spacing:-.03em}.stat small{color:#AEB4CC;font-size:15px}
.card{position:absolute;right:120px;top:420px;width:400px;background:#121831;border:1px solid #ffffff1c;border-radius:24px;padding:26px;box-shadow:0 40px 80px -20px #000a}
.bar{height:10px;border-radius:99px;background:#ffffff14;overflow:hidden;margin:16px 0 6px}.bar i{display:block;height:100%;width:75%;background:#C8FF3D}
.plugs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:18px}.plugs span{height:46px;border-radius:10px;border:1px solid #ffffff1c;display:grid;place-items:center;font-size:13px;color:#AEB4CC}
.plugs .on{background:#C8FF3D;color:#0A0E1A;font-weight:700;border:0}
`,
  body: `
<svg class="map" viewBox="0 0 1600 1200"><defs><radialGradient id="glow" cx="72%" cy="48%" r="45%"><stop offset="0" stop-color="#2857FF" stop-opacity=".35"/><stop offset="1" stop-color="#2857FF" stop-opacity="0"/></radialGradient></defs>
<rect width="1600" height="1200" fill="url(#glow)"/>
<g stroke="#ffffff10" stroke-width="2" fill="none">${streets}</g>
<path d="M760 1150C860 980 900 920 1010 860S1180 700 1160 560 1260 380 1420 300" fill="none" stroke="#C8FF3D" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 14"/>
<path d="M760 1150C860 980 900 920 1010 860S1180 700 1160 560" fill="none" stroke="#C8FF3D" stroke-width="6" stroke-linecap="round"/>
${[[1010, 860], [1160, 560], [1420, 300], [1320, 760], [880, 640], [1480, 980]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i < 3 ? 16 : 10}" fill="${i < 3 ? "#C8FF3D" : "#2857FF"}"/><circle cx="${x}" cy="${y}" r="${i < 3 ? 34 : 22}" fill="none" stroke="${i < 3 ? "#C8FF3D" : "#2857FF"}" stroke-opacity=".35" stroke-width="2"/>`).join("")}
</svg>
<div class="nav" style="position:relative"><div class="logo"><svg width="24" height="28" viewBox="0 0 24 28"><path d="M14 0L0 16h9l-2 12L24 10h-9l3-10z" fill="#C8FF3D"/></svg>VOLTLINE</div>
<div class="links" style="color:#AEB4CC"><span>Find a charger</span><span>For fleets</span><span>For hosts</span><span>Pricing</span></div>
<div class="row" style="gap:12px"><span class="btn ghost">Log in</span><span class="btn lime">Get the app</span></div></div>
<div class="hero"><p class="tag">4,200 stations · 28 countries</p><h1>Charge anywhere. Pay once.</h1>
<p class="sub">One app, one card and one bill for every fast charger on your route. Plan the trip — we'll have a plug waiting.</p>
<div class="stats"><div class="stat"><p>350 kW</p><small>Ultra-fast chargers</small></div><div class="stat"><p>12 min</p><small>Average top-up</small></div><div class="stat"><p>99.3%</p><small>Network uptime</small></div></div></div>
<div class="card"><div class="row" style="justify-content:space-between"><b style="font-size:21px">Station 214</b><span style="font-size:13px;background:#C8FF3D22;color:#C8FF3D;padding:5px 10px;border-radius:99px">● Available</span></div>
<p style="color:#AEB4CC;font-size:15px;margin-top:6px">Kings Cross · 0.8 mi away</p>
<div class="bar"><i></i></div><div class="row" style="justify-content:space-between;font-size:14px;color:#AEB4CC"><span>6 of 8 free</span><span>£0.49 / kWh</span></div>
<div class="plugs"><span class="on">CCS</span><span>CCS</span><span>Type 2</span><span>CHAdeMO</span></div>
<div class="btn lime" style="text-align:center;margin-top:18px">Reserve a plug</div></div>`,
});

/* ───────────── 3. Northwind Roasters — specialty coffee e-commerce ───────────── */
const bag = (x, y, color, label, tone, rot) => `
<g transform="translate(${x} ${y}) rotate(${rot})">
<path d="M0 60 L18 0 H222 L240 60 V430 Q240 452 218 452 H22 Q0 452 0 430Z" fill="${color}"/>
<path d="M18 0 H222 L240 60 H0Z" fill="#000" opacity=".18"/>
<rect x="0" y="54" width="240" height="14" fill="#000" opacity=".12"/>
<circle cx="120" cy="230" r="70" fill="#F3E9DA"/>
<text x="120" y="222" text-anchor="middle" font-family="Fraunces" font-size="26" font-weight="700" fill="${color}">${label}</text>
<text x="120" y="252" text-anchor="middle" font-family="DM Mono" font-size="12" fill="#3B2416">${tone}</text>
<text x="120" y="390" text-anchor="middle" font-family="Fraunces" font-size="22" font-style="italic" fill="#F3E9DA">Northwind</text>
</g>`;
const northwind = page({
  bg: "#F3E9DA",
  fonts: "family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@500",
  css: `
body{font-family:'DM Sans';color:#3B2416}
.logo{font-family:Fraunces;font-weight:700;font-size:32px;letter-spacing:-.02em}
.btn{padding:18px 30px;border-radius:999px;font-weight:700;font-size:17px}
.terra{background:#C8553D;color:#fff}.line{border:1.5px solid #3B241640}
.hero{display:grid;grid-template-columns:700px 1fr;padding:40px 72px 0;gap:40px}
.eyebrow{font-family:'DM Mono';font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#C8553D}
h1{font-family:Fraunces;font-weight:600;font-size:118px;line-height:.92;letter-spacing:-.035em;margin:22px 0 28px}
h1 i{font-weight:400}
.sub{font-size:22px;line-height:1.5;max-width:540px;color:#5A3F2E}
.stage{position:relative;height:640px;background:#E4CDB2;border-radius:36px;overflow:hidden}
.products{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:56px 72px 0}
.p{background:#FBF5EC;border-radius:22px;padding:20px;display:flex;gap:16px;align-items:center}
.p i{width:56px;height:70px;border-radius:10px;display:block;flex:none}
.p b{font-family:Fraunces;font-size:20px;display:block}.p small{color:#7A5E4C;font-size:14px}
`,
  body: `
<div class="nav"><div class="links" style="font-weight:500"><span>Shop</span><span>Subscriptions</span><span>Wholesale</span></div>
<div class="logo">Northwind<span style="color:#C8553D">.</span></div>
<div class="links" style="font-weight:500;align-items:center"><span>Journal</span><span>Account</span><span style="background:#3B2416;color:#F3E9DA;border-radius:99px;padding:8px 16px">Bag (2)</span></div></div>
<div class="hero"><div style="padding-top:40px">
<p class="eyebrow">Roasted Monday · At your door Thursday</p>
<h1>Coffee worth <i>waking up</i> for.</h1>
<p class="sub">Single-origin beans from farms we visit every year, roasted in small batches and delivered on your schedule.</p>
<div class="row" style="gap:14px;margin-top:40px"><span class="btn terra">Start a subscription</span><span class="btn line">Shop all beans</span></div>
<p style="margin-top:36px;font-size:16px;color:#7A5E4C">Free shipping over $40 · Pause or cancel anytime</p></div>
<div class="stage"><svg viewBox="0 0 700 640" width="100%" height="100%">
<circle cx="560" cy="120" r="150" fill="#C8553D" opacity=".18"/><ellipse cx="350" cy="600" rx="320" ry="40" fill="#3B2416" opacity=".12"/>
${bag(50, 150, "#3B2416", "GUJI", "PEACH · JASMINE", -6)}${bag(420, 160, "#5B6B3A", "HUILA", "CACAO · PLUM", 7)}${bag(235, 120, "#C8553D", "KAYANZA", "CITRUS · HONEY", 0)}
</svg></div></div>
<div class="products">
<div class="p"><i style="background:#3B2416"></i><div><b>Ethiopia Guji</b><small>Peach, jasmine · $19</small></div></div>
<div class="p"><i style="background:#C8553D"></i><div><b>Burundi Kayanza</b><small>Citrus, honey · $21</small></div></div>
<div class="p"><i style="background:#5B6B3A"></i><div><b>Colombia Huila</b><small>Cacao, plum · $18</small></div></div>
<div class="p"><i style="background:#B08A57"></i><div><b>House Espresso</b><small>Toffee, cherry · $17</small></div></div></div>`,
});

/* ───────────── 4. Halcyon Health — booking ───────────── */
const halcyon = page({
  bg: "#E6EEE7",
  fonts: "family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700",
  css: `
body{font-family:'DM Sans';color:#1F3D33}
.logo{font-weight:700;font-size:26px;display:flex;align-items:center;gap:10px;letter-spacing:-.02em}
.btn{padding:16px 26px;border-radius:999px;font-weight:600;font-size:17px}
.green{background:#1F3D33;color:#fff}
.hero{display:grid;grid-template-columns:1fr 560px;gap:60px;padding:60px 72px 0}
h1{font-family:'DM Serif Display';font-weight:400;font-size:104px;line-height:.98;letter-spacing:-.02em;margin:22px 0 26px}
h1 span{color:#3E8E6E;font-style:italic}
.sub{font-size:22px;line-height:1.5;max-width:600px;color:#3F5A50}
.search{margin-top:42px;background:#fff;border-radius:22px;padding:10px;display:grid;grid-template-columns:1.4fr 1fr auto;gap:8px;box-shadow:0 20px 50px -24px #1F3D3366}
.search div{padding:14px 18px;border-radius:14px;background:#F3F7F4}.search small{display:block;font-size:13px;color:#6B8579;font-weight:600}.search b{font-weight:500;font-size:17px}
.card{background:#fff;border-radius:32px;padding:30px;box-shadow:0 40px 80px -30px #1F3D3355}
.doc{display:flex;gap:16px;align-items:center}
.ava{width:68px;height:68px;border-radius:20px;background:#3E8E6E;position:relative;overflow:hidden}
.ava:before{content:"";position:absolute;width:30px;height:30px;border-radius:50%;background:#F2C9A8;left:19px;top:12px}
.ava:after{content:"";position:absolute;width:56px;height:40px;border-radius:28px 28px 0 0;background:#fff;left:6px;top:46px}
.days{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:24px 0 16px}
.days span{border:1px solid #1F3D331f;border-radius:16px;padding:12px 0;text-align:center;font-size:14px;color:#3F5A50}.days b{display:block;font-size:22px;color:#1F3D33}
.days .on{background:#1F3D33;color:#cfe3d8}.days .on b{color:#fff}
.slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.slots span{border-radius:12px;background:#F3F7F4;padding:13px;text-align:center;font-weight:600;font-size:16px}
.slots .on{background:#3E8E6E;color:#fff}
.trust{display:flex;gap:48px;padding:64px 72px 0;font-size:17px;color:#3F5A50}.trust b{display:block;font-family:'DM Serif Display';font-size:44px;color:#1F3D33;font-weight:400}
`,
  body: `
<div class="nav"><div class="logo"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M15 2C22 8 26 14 15 28 4 14 8 8 15 2Z" fill="#3E8E6E"/><path d="M15 8v20" stroke="#E6EEE7" stroke-width="2"/></svg>halcyon</div>
<div class="links"><span>Find care</span><span>Specialists</span><span>Clinics</span><span>Insurance</span><span>For employers</span></div>
<div class="row" style="gap:20px"><span style="font-size:17px">Sign in</span><span class="btn green">Book a visit</span></div></div>
<div class="hero"><div>
<p style="font-weight:600;color:#3E8E6E;font-size:17px">● 214 doctors available today</p>
<h1>Book a doctor in <span>under a minute.</span></h1>
<p class="sub">Same-day visits in clinic or by video, with clear prices before you book. Most insurance accepted.</p>
<div class="search"><div><small>What do you need?</small><b>Symptom, specialty or doctor</b></div><div><small>Where</small><b>Brooklyn, NY</b></div><span class="btn green" style="display:grid;place-items:center;border-radius:14px">Search</span></div>
</div>
<div class="card"><div class="doc"><div class="ava"></div><div><b style="font-size:22px">Dr. Amara Okafor</b><p style="color:#6B8579;font-size:16px">Family medicine · ★ 4.9 (312)</p></div></div>
<div class="days"><span>Mon<b>14</b></span><span class="on">Tue<b>15</b></span><span>Wed<b>16</b></span><span>Thu<b>17</b></span><span>Fri<b>18</b></span></div>
<div class="slots"><span>9:00</span><span>9:30</span><span class="on">10:15</span><span>11:00</span><span>13:30</span><span>15:45</span></div>
<div class="row" style="justify-content:space-between;margin:22px 0 18px;font-size:16px"><span style="color:#6B8579">Video visit · 20 min</span><b>$45 copay</b></div>
<div class="btn green" style="text-align:center">Confirm booking</div></div></div>
<div class="trust"><div><b>4.9/5</b>Average patient rating</div><div><b>12 min</b>Median wait time</div><div><b>140+</b>Insurance plans</div></div>
<div style="display:flex;flex-wrap:wrap;gap:12px;padding:56px 72px 0">${["Primary care","Dermatology","Mental health","Pediatrics","Women's health","Physical therapy","Allergy","Nutrition"].map((t,i)=>`<span style="padding:16px 24px;border-radius:999px;font-size:18px;font-weight:600;background:${i===2?"#1F3D33":"#ffffff"};color:${i===2?"#fff":"#1F3D33"}">${t}</span>`).join("")}</div>`,
});

/* ───────────── 5. Kiln & Co — ceramics shop ───────────── */
const vase = (d, fill, hi) => `<svg viewBox="0 0 300 380" width="100%" height="100%"><defs><linearGradient id="v${fill.slice(1)}" x1="0" x2="1"><stop offset="0" stop-color="${fill}"/><stop offset=".55" stop-color="${hi}"/><stop offset="1" stop-color="${fill}"/></linearGradient></defs><ellipse cx="150" cy="352" rx="96" ry="12" fill="#00000018"/><path d="${d}" fill="url(#v${fill.slice(1)})"/></svg>`;
const kiln = page({
  bg: "#ECE1D2",
  fonts: "family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600",
  css: `
body{font-family:Inter;color:#2A2420}
.logo{font-family:'Instrument Serif';font-size:36px}
.hero{padding:30px 72px 0;display:flex;justify-content:space-between;align-items:flex-end}
h1{font-family:'Instrument Serif';font-weight:400;font-size:168px;line-height:.88;letter-spacing:-.03em}
h1 i{color:#A65A3A}
.grid{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:20px;padding:44px 72px 0}
.tile{border-radius:28px;height:640px;position:relative;overflow:hidden;padding:30px}
.tile .v{position:absolute;left:12%;right:12%;bottom:90px;top:70px}
.meta{position:absolute;left:28px;right:28px;bottom:26px;display:flex;justify-content:space-between;font-size:17px}
.meta b{font-weight:500}
.chip{font-size:13px;letter-spacing:.08em;text-transform:uppercase;background:#ffffff99;border-radius:99px;padding:7px 12px;display:inline-block}
`,
  body: `
<div class="nav"><div class="logo">Kiln &amp; Co.</div><div class="links"><span>Shop</span><span>Studio</span><span>Workshops</span><span>Journal</span></div><div class="links"><span>Search</span><span>Bag (1)</span></div></div>
<div class="hero"><h1>Made slowly,<br><i>by hand.</i></h1><div style="max-width:360px;font-size:19px;line-height:1.55;padding-bottom:18px"><p>Small-batch stoneware thrown and glazed in our Lisbon studio. Every piece is one of a kind — like the table it lands on.</p><p style="margin-top:24px;font-weight:600;border-bottom:1.5px solid;display:inline-block">Shop the autumn kiln →</p></div></div>
<div class="grid">
<div class="tile" style="background:#D9C3A8"><span class="chip">New glaze</span><div class="v">${vase("M122 28H178Q184 28 182 38C176 72 172 92 190 110 244 150 252 222 242 270 230 330 192 346 150 346S70 330 58 270C48 222 56 150 110 110 128 92 124 72 118 38Q116 28 122 28Z", "#A65A3A", "#D98E6B")}</div><div class="meta"><b>Ripple vase</b><span>$64</span></div></div>
<div class="tile" style="background:#CFC9BC"><div class="v">${vase("M70 120C70 80 100 60 150 60S230 80 230 120C230 200 250 260 210 320 196 338 104 338 90 320 50 260 70 200 70 120Z", "#3F4A44", "#6E7C73")}</div><div class="meta"><b>Moss jar</b><span>$48</span></div></div>
<div class="tile" style="background:#E3D3BC"><div class="v">${vase("M60 200C60 150 100 130 150 130S240 150 240 200C240 280 200 330 150 330S60 280 60 200ZM110 130C110 90 130 50 150 50S190 90 190 130Z", "#E8E0D2", "#FFFFFF")}</div><div class="meta"><b>Cloud bud vase</b><span>$36</span></div></div>
</div>`,
});

/* ───────────── 6. Orbital — fintech ───────────── */
const card = (x, y, rot, grad, dark) => `
<div style="position:absolute;left:${x}px;top:${y}px;width:470px;height:296px;border-radius:26px;transform:rotate(${rot}deg);background:${grad};box-shadow:0 50px 90px -30px #000c;padding:30px;color:${dark ? "#fff" : "#06102E"};overflow:hidden">
<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:26px;letter-spacing:-.03em">orbital</b><svg width="40" height="40" viewBox="0 0 40 40"><circle cx="15" cy="20" r="12" fill="currentColor" opacity=".55"/><circle cx="25" cy="20" r="12" fill="currentColor" opacity=".35"/></svg></div>
<div style="width:58px;height:44px;border-radius:9px;background:linear-gradient(135deg,#E8D9A8,#B89B4F);margin-top:46px"></div>
<div style="display:flex;justify-content:space-between;margin-top:44px;font-size:18px;letter-spacing:.12em;opacity:.85"><span>•••• 4821</span><span>09/29</span></div>
<div style="position:absolute;right:-80px;bottom:-120px;width:300px;height:300px;border-radius:50%;border:40px solid #ffffff14"></div></div>`;
const orbital = page({
  bg: "#05070F",
  fonts: "family=Sora:wght@300;400;600;700",
  css: `
body{font-family:Sora;color:#F2F4FF}
.logo{font-weight:700;font-size:28px;letter-spacing:-.04em;display:flex;gap:10px;align-items:center}
.btn{padding:16px 26px;border-radius:999px;font-weight:600;font-size:16px}
.blue{background:#2857FF;color:#fff}.ghost{border:1px solid #ffffff26}
.hero{padding:80px 72px 0;width:820px;position:relative;z-index:2}
h1{font-size:96px;line-height:1;letter-spacing:-.05em;font-weight:600;margin:24px 0 28px}
h1 span{background:linear-gradient(90deg,#5C82FF,#7FE3FF);-webkit-background-clip:text;color:transparent}
.sub{font-size:21px;line-height:1.55;color:#A4AAC4;max-width:600px;font-weight:300}
.mail{margin-top:42px;display:flex;gap:10px;background:#ffffff0d;border:1px solid #ffffff1c;border-radius:999px;padding:8px 8px 8px 26px;width:600px;align-items:center;justify-content:space-between;color:#7B82A3;font-size:17px}
.phone{position:absolute;right:110px;top:250px;width:330px;height:660px;border-radius:52px;background:#0E1222;border:10px solid #1B2033;box-shadow:0 60px 120px -30px #000;padding:26px 22px;z-index:3}
.feat{display:flex;gap:56px;padding:120px 72px 0;color:#A4AAC4;font-size:16px;position:relative;z-index:2}.feat b{display:block;color:#fff;font-size:20px;margin-bottom:6px;font-weight:600}
`,
  body: `
<div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 75% 45%,#2857FF55,transparent 70%)"></div>
<div class="nav" style="position:relative;z-index:2"><div class="logo"><svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="12" stroke="#5C82FF" stroke-width="3" fill="none"/><circle cx="24" cy="8" r="4" fill="#7FE3FF"/></svg>orbital</div>
<div class="links" style="color:#A4AAC4"><span>Accounts</span><span>Cards</span><span>Invoicing</span><span>Treasury</span><span>Company</span></div>
<div class="row" style="gap:12px"><span class="btn ghost">Log in</span><span class="btn blue">Join waitlist</span></div></div>
<div class="hero"><p style="color:#7FE3FF;font-size:15px;letter-spacing:.14em;text-transform:uppercase">For founders, freelancers &amp; studios</p>
<h1>Banking for people who <span>build things.</span></h1>
<p class="sub">Business accounts that open in eight minutes, cards with built-in budgets and invoices that chase themselves.</p>
<div class="mail"><span>you@company.com</span><span class="btn blue">Get early access</span></div></div>
${card(780, 300, -14, "linear-gradient(135deg,#2857FF,#7FE3FF)", false)}${card(860, 520, 8, "linear-gradient(135deg,#1B2033,#0A0D1A 60%,#2857FF)", true)}
<div class="phone"><p style="font-size:14px;color:#7B82A3">Total balance</p><p style="font-size:38px;font-weight:600;letter-spacing:-.03em;margin:6px 0 20px">$48,210.55</p>
<svg viewBox="0 0 270 120" width="100%"><path d="M0 100C30 96 50 80 80 84S130 50 160 56 220 20 270 14" fill="none" stroke="#5C82FF" stroke-width="4"/><path d="M0 100C30 96 50 80 80 84S130 50 160 56 220 20 270 14V120H0Z" fill="#5C82FF" opacity=".15"/></svg>
${[["Figma", "−$45.00"], ["Stripe payout", "+$12,400.00"], ["AWS", "−$318.24"], ["Invoice #1042", "+$6,250.00"]].map(([a, b]) => `<div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid #ffffff12;font-size:15px"><span>${a}</span><span style="color:${b.startsWith("+") ? "#7FE3FF" : "#A4AAC4"}">${b}</span></div>`).join("")}
</div>
<div class="feat"><div><b>8-minute sign-up</b>Fully online, no branch visits.</div><div><b>4.1% on reserves</b>Treasury built in.</div><div><b>Unlimited cards</b>Virtual & physical.</div></div>`,
});

export const designs = { fieldnote, voltline, northwind, halcyon, kiln, orbital };
