const { useState, useEffect } = React;

/* ============ THEME TOGGLE ============ */
function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("solidlab-theme", theme); } catch(e) {}
  }, [theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <button className="sl-theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span className="sl-theme-toggle__icon" aria-hidden="true">
        {theme === "dark" ? (
          /* sun icon for light mode */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="5"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="5" y2="12"/>
            <line x1="19" y1="12" x2="22" y2="12"/>
            <line x1="4.9" y1="4.9" x2="7" y2="7"/>
            <line x1="17" y1="17" x2="19.1" y2="19.1"/>
            <line x1="4.9" y1="19.1" x2="7" y2="17"/>
            <line x1="17" y1="7" x2="19.1" y2="4.9"/>
          </svg>
        ) : (
          /* moon icon for dark mode */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </span>
      <span>{theme === "dark" ? "light" : "dark"}</span>
    </button>
  );
}



/* ============ TYPEWRITER ============ */
function Typewriter({ words, typeSpeed = 70, deleteSpeed = 40, pauseAfterType = 2000, pauseAfterDelete = 300, initialPause = 1200 }) {
  const [display, setDisplay] = React.useState(words[0]);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(words[0].length);
  const [phase, setPhase] = React.useState("rest"); // start at rest, let first word sit fully typed

  React.useEffect(() => {
    // Respect prefers-reduced-motion — show first word statically, skip animation entirely
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(words[0]);
      return;
    }

    let timeout;

    // On mount, wait for initialPause before starting the delete-and-cycle loop
    if (phase === "rest") {
      timeout = setTimeout(() => setPhase("deleting"), initialPause);
      return () => clearTimeout(timeout);
    }

    const currentWord = words[wordIndex];

    if (phase === "typing") {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplay(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typeSpeed);
      } else {
        // Word fully typed — pause then start deleting
        timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
      }
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplay(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);
      } else {
        // Fully deleted — move to next word
        timeout = setTimeout(() => {
          setWordIndex((wordIndex + 1) % words.length);
          setCharIndex(1);
          setDisplay(words[(wordIndex + 1) % words.length].charAt(0));
          setPhase("typing");
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, wordIndex, phase, words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, initialPause]);

  return (
    <span className="sl-typewriter" aria-live="polite" aria-atomic="true">
      <span className="sl-typewriter__text">{display}</span>
      <span className="sl-typewriter__cursor" aria-hidden="true">|</span>
    </span>
  );
}

const SOLID_WORDS = ["concepts", "software", "apps", "integrations", "websites", "ecommerce"];

/* ============ HEADER ============ */
function Header({ current, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { k: "technology", label: "/ tech" },
    { k: "ai", label: "/ ai" },
    { k: "about", label: "/ about" },
    { k: "contact", label: "/ contact" },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (k) => {
    setMenuOpen(false);
    onNav(k);
  };

  return (
    <>
      <header className="sl-header">
        <div className="shell sl-header__inner">
          <a className="sl-wm" href="#" onClick={(e)=>{e.preventDefault(); handleNav("home");}}><span className="sl-wm__solid">solid</span><span className="sl-wm__lab">lab</span><span className="sl-wm__ai">.ai</span></a>

          {/* Desktop nav */}
          <nav className="sl-nav sl-nav--desktop">
            {items.map(i => (
              <a key={i.k} href="#"
                 className={current === i.k ? "active" : ""}
                 onClick={(e)=>{e.preventDefault(); onNav(i.k);}}>{i.label}</a>
            ))}
            <ThemeToggle/>
          </nav>

          {/* Mobile menu trigger */}
          <button
            className="sl-menu-trigger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="sl-menu-trigger__line"></span>
            <span className="sl-menu-trigger__line"></span>
            <span className="sl-menu-trigger__label">/ menu</span>
          </button>
        </div>
      </header>

      {/* Mobile side menu */}
      <div className={`sl-sidemenu${menuOpen ? ' sl-sidemenu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="sl-sidemenu__backdrop" onClick={() => setMenuOpen(false)}></div>
        <aside className="sl-sidemenu__panel" role="dialog" aria-label="Main menu">
          <div className="sl-sidemenu__head">
            <span className="sl-slash sl-sidemenu__eyebrow">/ menu</span>
            <button
              className="sl-sidemenu__close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span className="sl-sidemenu__close-x">×</span>
              <span className="sl-sidemenu__close-label">close</span>
            </button>
          </div>

          <nav className="sl-sidemenu__nav">
            {items.map(i => (
              <a
                key={i.k}
                href="#"
                className={`sl-sidemenu__link${current === i.k ? ' active' : ''}`}
                onClick={(e)=>{e.preventDefault(); handleNav(i.k);}}
              >
                {i.label}
              </a>
            ))}
          </nav>

          <div className="sl-sidemenu__divider"></div>

          <nav className="sl-sidemenu__secondary">
            <a href="mailto:hello@solidlab.ai" className="sl-sidemenu__link-small">hello@solidlab.ai</a>
          </nav>

          <div className="sl-sidemenu__footer">
            <ThemeToggle/>
            <span className="sl-sidemenu__meta">nordic / norway</span>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ============ HERO ============ */
function Hero({ onNav }) {
  return (
    <section className="sl-hero">
      <div className="shell">
        <div className="sl-hero__eyebrow sl-slash">/ a nordic venture studio · for builders and backers</div>
        <h1 className="sl-hero__title sl-hero__title--stacked">
          <span><span className="sl-hero__light">We build </span><span className="sl-hero__bold">solid</span></span>
          <span className="sl-hero__light"><Typewriter words={SOLID_WORDS}/></span>
        </h1>
        <p className="sl-hero__sub">
          We build solid products for our own ventures — and for the clients who want us to build the same for them.
        </p>
        <div className="sl-hero__cta">
          <a className="sl-btn sl-btn--primary" href="#" onClick={(e)=>{e.preventDefault(); onNav("contact");}}>Get in touch →</a>
          <a className="sl-btn sl-btn--ghost" href="#" onClick={(e)=>{e.preventDefault(); onNav("home"); setTimeout(() => document.querySelector('.sl-services')?.scrollIntoView({behavior:'smooth', block:'start'}), 50);}}>/ view services</a>
        </div>
      </div>
    </section>
  );
}

/* ============ WHAT WE DO ============ */
function WhatWeDo() {
  const items = [
    { n: "01", t: "Websites", b: "Sites that convert — built from real user needs, not template clichés. Modern stack (Next.js, React), from strategy and prototype to launch and iteration." },
    { n: "02", t: "E-commerce", b: "Online stores built for growth, not just presence. Right platform for where you are and where you're going — Shopify, WooCommerce, or headless. User experience, conversion, operations." },
    { n: "03", t: "Web applications", b: "Custom SaaS and internal tools that solve concrete problems. Modern stack with security, scalability, and maintenance built in from day one." },
    { n: "04", t: "Automation & integrations", b: "Clean up the manual work that steals your time. We connect your systems — CRM, email, accounting, suppliers — so data flows where it should without anyone clicking through." },
  ];
  return (
    <section className="sl-section">
      <div className="shell">
        <div className="sl-slash" style={{marginBottom:24}}>/ 01 — what we do</div>
        <div className="sl-section__head">
          <h2 className="sl-section__title">We simplify and build the everyday tools of growing businesses.</h2>
          <p className="sl-section__intro">
            Solid technology. Skilled people. We work at the intersection of technology, business development, and concept design — no shortcuts that become tomorrow's debt.
          </p>
        </div>
        <div className="sl-services">
          {items.map(i => (
            <div key={i.n} className="sl-service">
              <span className="sl-slash sl-service__num">/ {i.n}</span>
              <h3 className="sl-service__title">{i.t}</h3>
              <p className="sl-service__body">{i.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ADVISORY — standalone service block ============ */
function Advisory({ onNav }) {
  return (
    <section className="sl-advisory">
      <div className="shell">
        <div className="sl-slash sl-advisory__eyebrow">/ 02 — advisory</div>
        <div className="sl-advisory__grid">
          <div className="sl-advisory__left">
            <h2 className="sl-advisory__title">
              The strategic layer — <em>where technology meets business decisions.</em>
            </h2>
          </div>
          <div className="sl-advisory__right">
            <p className="sl-advisory__body">
              Not every challenge needs more code. Sometimes it needs the right question.
            </p>
            <p className="sl-advisory__body">
              We work alongside founders, leadership teams, and product owners to cut through the noise: platform choices, build-vs-buy decisions, technical roadmaps, and where AI actually belongs in your operation.
            </p>
            <p className="sl-advisory__body">
              <strong>No deliverables theatre. Just clear thinking and concrete next steps.</strong>
            </p>
            <a className="sl-btn sl-btn--primary sl-advisory__cta" href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav("contact");}}>
              Book a conversation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ TECHNOLOGY — forside teaser ============ */
function Technology({ onNav }) {
  const categories = [
    {
      k: "frontend",
      n: "01",
      t: "Frontend & CMS",
      b: "Next.js, React, Vue, Webflow, WordPress, Sanity — and more.",
    },
    {
      k: "backend",
      n: "02",
      t: "Backend & Cloud",
      b: "Supabase, Postgres, AWS, Vercel, Cloudflare — production-grade stack.",
    },
    {
      k: "ai",
      n: "03",
      t: "AI & Automation",
      b: "Claude, GPT, Gemini, MCP, Ollama. Smart from the inside.",
      highlight: true,
    },
    {
      k: "integrations",
      n: "04",
      t: "Commerce & Payments",
      b: "Shopify, WooCommerce, Stripe, Vipps, Klarna, Klaviyo.",
    },
    {
      k: "infra",
      n: "05",
      t: "CRM & Messaging",
      b: "HubSpot, Intercom, Slack, Twilio, 46elks, Resend.",
    },
  ];
  return (
    <section className="sl-tech">
      <div className="shell">
        <div className="sl-slash" style={{marginBottom:24}}>/ 03 — technology</div>
        <div className="sl-section__head">
          <h2 className="sl-section__title">The right tool for the job.</h2>
          <p className="sl-section__intro">
            We're pragmatic about technology — modern where it serves the work, boring where it keeps things stable. Our toolkit spans 11 categories and hundreds of tools — chosen to last, not to impress.
          </p>
        </div>
        <div className="sl-tech__grid">
          {categories.map(c => (
            <a
              key={c.k}
              href="#"
              className={`sl-tech__card${c.highlight ? ' sl-tech__card--highlight' : ''}`}
              onClick={(e) => { e.preventDefault(); onNav(c.k === "ai" ? "ai" : "technology"); }}
            >
              <span className="sl-slash sl-tech__num">/ {c.n}</span>
              <h3 className="sl-tech__card-title">{c.t}</h3>
              <p className="sl-tech__card-body">{c.b}</p>
              <span className="sl-tech__arrow">→</span>
            </a>
          ))}
        </div>
        <div className="sl-tech__ctas">
          <a className="sl-btn sl-btn--ghost" href="#" onClick={(e)=>{e.preventDefault(); onNav("technology");}}>/ full toolkit</a>
          <a className="sl-btn sl-btn--ghost" href="#" onClick={(e)=>{e.preventDefault(); onNav("ai");}}>/ ai & claude</a>
        </div>
      </div>
    </section>
  );
}

/* ============ WORK ============ */
const WORK_ITEMS = [
  {
    k: "bolgevarsel",
    title: "Bølgevarsel",
    kicker: "Real-time marine forecasting for Norwegian boaters. Live, cash-flow positive.",
    year: "2026",
    kind: "product",
    tag: "/ shipped",
    thumbClass: "a",
  },
  {
    k: "lara",
    title: "Lara",
    kicker: "AI image generation platform — prompt, generate, refine. Powered by Imagen 4.",
    year: "2026",
    kind: "product",
    tag: "/ shipped",
    thumbClass: "b",
  },
  {
    k: "klinikkdrift",
    title: "Klinikkdrift",
    kicker: "Operations platform for independent Nordic clinics.",
    year: "2025",
    kind: "product",
    tag: "/ shipped",
    thumbClass: "c",
  },
  {
    k: "infra-2024",
    title: "Coastal logistics platform",
    kicker: "Consulting — rebuilding a 15-year-old dispatch system to modern standards.",
    year: "2024",
    kind: "consulting",
    tag: "/ client",
    thumbClass: "d",
  },
];

function ThumbA() {
  // sparse grid / chart — evokes marine data
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="none" fill="none" stroke="#4A5A62" strokeWidth="1">
      {[...Array(8)].map((_,i)=>(
        <line key={i} x1="0" x2="400" y1={28*(i+1)} y2={28*(i+1)} stroke="#1F1F1F"/>
      ))}
      {[...Array(10)].map((_,i)=>(
        <line key={i} y1="0" y2="225" x1={40*(i+1)} x2={40*(i+1)} stroke="#1F1F1F"/>
      ))}
      <path d="M0 180 C 40 120, 80 160, 120 110 C 160 60, 200 130, 240 90 C 280 50, 320 100, 400 40" stroke="#6B8290" strokeWidth="1.5"/>
      <path d="M0 200 C 40 180, 80 190, 120 160 C 160 130, 200 170, 240 140 C 280 110, 320 150, 400 100" stroke="#4A5A62" strokeWidth="1.5"/>
      <circle cx="240" cy="90" r="3" fill="#4A5A62"/>
      <circle cx="320" cy="100" r="3" fill="#4A5A62"/>
    </svg>
  );
}
function ThumbB() {
  // scheduling grid
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="none">
      {[...Array(6)].map((_,r)=>[...Array(8)].map((_,c)=>(
        <rect key={r+'-'+c} x={c*50+4} y={r*36+4} width={42} height={28}
          fill={(r+c)%5===0 ? '#4A5A62' : (r+c)%3===0 ? '#1F1F1F' : 'transparent'}
          stroke="#1F1F1F" strokeWidth="1"/>
      )))}
    </svg>
  );
}
function ThumbC() {
  // architectural pattern
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="none" fill="none" stroke="#4A5A62" strokeWidth="1">
      <rect x="40" y="40" width="320" height="145" stroke="#1F1F1F" strokeWidth="1"/>
      <line x1="40" y1="80" x2="360" y2="80" stroke="#1F1F1F"/>
      <line x1="120" y1="40" x2="120" y2="185" stroke="#1F1F1F"/>
      <line x1="200" y1="40" x2="200" y2="185" stroke="#1F1F1F"/>
      <line x1="280" y1="40" x2="280" y2="185" stroke="#1F1F1F"/>
      <rect x="120" y="80" width="80" height="50" fill="#4A5A62"/>
      <rect x="200" y="130" width="80" height="55" fill="#1F1F1F"/>
    </svg>
  );
}
function ThumbD() {
  // code texture
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="none">
      {[20,36,52,72,88,104,124,140,156,176].map((y,i)=>(
        <rect key={i} x="32" y={y} width={Math.random()*180+60} height="2" fill={i%3===0 ? '#4A5A62' : '#1F1F1F'}/>
      ))}
    </svg>
  );
}

function Work({ onSelect }) {
  const thumbFor = {a:<ThumbA/>, b:<ThumbB/>, c:<ThumbC/>, d:<ThumbD/>};
  return (
    <section className="sl-section">
      <div className="shell">
        <div className="sl-slash" style={{marginBottom:24}}>/ 03 — selected work</div>
        <div className="sl-section__head">
          <h2 className="sl-section__title">What we've shipped.</h2>
          <p className="sl-section__intro">Real outcomes, real clients, real code. No case-study fluff.</p>
        </div>
        <div className="sl-work">
          {WORK_ITEMS.map(w => (
            <a key={w.k} className="sl-work__item"
               onClick={(e)=>{e.preventDefault(); onSelect(w.k);}} href="#">
              <div className="sl-work__head">
                <span className="sl-work__meta">{w.tag} · {w.year}</span>
                <span className="sl-work__arrow">→</span>
              </div>
              <div className={`sl-work__thumb ${w.thumbClass}`}>
                {thumbFor[w.thumbClass]}
              </div>
              <h3 className="sl-work__title">{w.title}</h3>
              <p className="sl-work__kicker">{w.kicker}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
function About() {
  const values = [
    { n:"01", t:"Solid by default",  b:"We ship code and systems that work under pressure. No shortcuts that become tomorrow's debt."},
    { n:"02", t:"Quiet confidence",  b:"We don't oversell. The work speaks for itself, and we let clients be the heroes of their own stories."},
    { n:"03", t:"Craft over hype",   b:"We adopt new tools when they serve the work — not because they're trending. AI is a tool, not a slogan."},
    { n:"04", t:"Built to last",     b:"Every system we build should be maintainable, understandable, and ownable by the team who inherits it."},
  ];
  return (
    <section className="sl-section sl-about">
      <div className="shell">
        <div className="sl-slash" style={{marginBottom:24}}>/ 04 — about</div>
        <div className="sl-about__inner">
          <h2 className="sl-about__title">A studio anchored in Nordic craft — not aesthetic, commitment.</h2>
          <div className="sl-about__body">
            <p>Rooted in the <strong>Nordic tradition</strong> of craft and quiet confidence, we work at the intersection of code and craft — where good engineering meets good design.</p>
            <p>Our identity is rooted in the <strong>Scandinavian tradition</strong> of quiet craftsmanship, material honesty, and quality that outlasts trends. The technology may be new, but the values are old.</p>
            <p>We build for decades, not quarters.</p>
          </div>
        </div>
        <div className="sl-values">
          {values.map(v => (
            <div key={v.n} className="sl-value">
              <div className="sl-value__num">/ {v.n}</div>
              <div className="sl-value__title">{v.t}</div>
              <div className="sl-value__body">{v.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  return (
    <section className="sl-contact">
      <div className="shell">
        <div className="sl-slash" style={{marginBottom:32}}>/ 05 — contact</div>
        <div className="sl-contact__grid">
          <h2 className="sl-contact__title">Want to build something <em>solid?</em></h2>
          <div className="sl-contact__meta">
            <div>
              <span className="sl-contact__label">/ email</span>
              <a href="mailto:hello@solidlab.ai">hello@solidlab.ai</a>
            </div>
            <div>
              <span className="sl-contact__label">/ phone</span>
              <a href="tel:+4740093494">+47 400 93 494</a>
            </div>
            <div>
              <span className="sl-contact__label">/ studio</span>
              nordic / since 2026
            </div>
            <div>
              <span className="sl-contact__label">/ response</span>
              within a day
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer({ onNav }) {
  return (
    <footer className="sl-footer">
      <div className="shell sl-footer__inner">
        <div>© 2026 <span className="sl-wm sl-wm--footer"><span className="sl-wm__solid">solid</span><span className="sl-wm__lab">lab</span><span className="sl-wm__ai">.ai</span></span> · nordic / norway</div>
        <div className="sl-footer__right">
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav("investors");}}>/ investors</a>
          <a href="mailto:hello@solidlab.ai">hello@solidlab.ai</a>
        </div>
      </div>
    </footer>
  );
}

/* ============ DETAIL (case study) ============ */
function Detail({ item, onBack }) {
  if (!item) return null;
  return (
    <section className="sl-detail">
      <div className="shell">
        <a className="sl-detail__back" href="#" onClick={(e)=>{e.preventDefault(); onBack();}}>
          <span>←</span> / back to work
        </a>
        <h1 className="sl-detail__title">{item.title}</h1>
        <div className="sl-detail__meta">
          <div><span>/ year</span><strong>{item.year}</strong></div>
          <div><span>/ kind</span><strong>{item.kind}</strong></div>
          <div><span>/ status</span><strong>{item.tag.replace('/ ','')}</strong></div>
          <div><span>/ role</span><strong>Studio + partner</strong></div>
        </div>
        <div className="sl-detail__body">
          <p><strong>{item.kicker}</strong></p>
          <p>
            We partnered on this work from a blank page. Discovery with real users, a prototype in two weeks, a shipped v1 that people pay for. No revolution — just solid engineering, carefully applied.
          </p>
          <p>
            The stack is deliberately boring: a small surface area, maintainable by a team of two. We write what we'd want to inherit.
          </p>
          <p>
            <em className="sl-slash" style={{display:"inline-block", color:"var(--oslo)"}}>/ case study in progress — more detail on request</em>
          </p>
        </div>
      </div>
    </section>
  );
}

/* Export to global scope so index.html can use them */
Object.assign(window, { ThemeToggle, Typewriter, SOLID_WORDS, Header, Hero, WhatWeDo, Advisory, Technology, Work, About, Contact, Footer, Detail, WORK_ITEMS });
