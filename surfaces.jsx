const { useState } = React;

/* ============ CONTACT PAGE ============ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [sent, setSent] = useState(false);
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section className="sl-section" style={{borderBottom:0, paddingTop: 80}}>
      <div className="shell">
        <div className="sl-slash" style={{marginBottom:24}}>/ 04 — contact</div>
        <h1 className="sl-section__title" style={{fontSize:64, maxWidth: 900}}>
          Let's see if we're a fit. <em style={{fontStyle:"normal",color:"var(--oslo)"}}>No pitch deck required.</em>
        </h1>

        <div style={{display:"grid", gridTemplateColumns:"0.42fr 0.38fr", gap:"7%", marginTop:80, alignItems:"start"}}>
          <form className="sl-contact-form" onSubmit={(e)=>{e.preventDefault(); setSent(true);}}>
            <div className="sl-field">
              <label className="sl-field__lbl">/ your name</label>
              <input className="sl-field__in" value={form.name} onChange={up("name")} placeholder="Ulrik Andresen" required/>
            </div>
            <div className="sl-field-row">
              <div className="sl-field">
                <label className="sl-field__lbl">/ email</label>
                <input className="sl-field__in" type="email" value={form.email} onChange={up("email")} placeholder="you@company.com" required/>
              </div>
              <div className="sl-field">
                <label className="sl-field__lbl">/ company (optional)</label>
                <input className="sl-field__in" value={form.org} onChange={up("org")} placeholder="—"/>
              </div>
            </div>
            <div className="sl-field">
              <label className="sl-field__lbl">/ what are you building?</label>
              <textarea className="sl-field__ta" rows="6" value={form.message} onChange={up("message")} placeholder="A sentence or two about the work. We reply within a day."/>
            </div>
            <div style={{display:"flex", gap:12, marginTop:8}}>
              <button type="submit" className="sl-btn sl-btn--primary">{sent ? "Thanks — reply within a day" : "Send →"}</button>
              <a className="sl-btn sl-btn--ghost" href="mailto:hello@solidlab.ai">/ or email directly</a>
            </div>
          </form>

          <aside className="sl-contact-meta">
            <div className="sl-contact-meta__block">
              <span className="sl-contact__label">/ direct</span>
              <a href="mailto:hello@solidlab.ai">hello@solidlab.ai</a>
              <a href="tel:+4740093494">+47 400 93 494</a>
            </div>
            <div className="sl-contact-meta__block">
              <span className="sl-contact__label">/ studio</span>
              <span>Solidlab AS</span>
              <span>Stavanger · Norway</span>
              <span style={{color:"var(--mist)"}}>Org.nr 933 xxx xxx</span>
            </div>
            <div className="sl-contact-meta__block">
              <span className="sl-contact__label">/ response</span>
              <span>Within one business day.</span>
              <span style={{color:"var(--mist)"}}>Mon–Fri · CET</span>
            </div>
            <div className="sl-contact-meta__block">
              <span className="sl-contact__label">/ best fit</span>
              <span>AI-powered SaaS · infrastructure · engineering partnerships.</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ============ ABOUT PAGE ============ */
function AboutPage() {
  const values = [
    { n:"01", t:"Solid by default",  b:"We ship code and systems that work under pressure. No shortcuts that become tomorrow's debt."},
    { n:"02", t:"Quiet confidence",  b:"We don't oversell. The work speaks for itself, and we let clients be the heroes of their own stories."},
    { n:"03", t:"Craft over hype",   b:"We adopt new tools when they serve the work — not because they're trending. AI is a tool, not a slogan."},
    { n:"04", t:"Built to last",     b:"Every system we build should be maintainable, understandable, and ownable by the team who inherits it."},
  ];

  return (
    <>
      {/* Intro */}
      <section className="sl-section" style={{paddingTop: 80}}>
        <div className="shell">
          <div className="sl-slash" style={{marginBottom:24}}>/ 03 — about</div>
          <h1 className="sl-section__title" style={{fontSize:72, maxWidth:1100}}>
            A studio anchored in Nordic craft — <em style={{fontStyle:"normal",color:"var(--oslo)"}}>not aesthetic, commitment.</em>
          </h1>
          <p className="sl-section__intro" style={{marginTop:40, maxWidth:680, fontSize:19}}>
            Based in Stavanger, on the west coast of Norway. We build AI-powered SaaS products and consult on digital infrastructure — with the craft and discipline of master builders.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="sl-section">
        <div className="shell">
          <div className="sl-slash" style={{marginBottom:24}}>/ founder</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:80, alignItems:"start"}}>
            <div>
              {/* Portrait placeholder — intentional; swap for a real photo */}
              <div className="sl-portrait" aria-label="Portrait placeholder">
                <div className="sl-portrait__inner">
                  <span className="sl-slash" style={{color:"var(--mist)"}}>/ portrait</span>
                  <span style={{fontFamily:"var(--font-mono)", fontSize:12, color:"var(--mist)", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:12}}>replace with photo</span>
                </div>
              </div>
              <div style={{marginTop:16, fontFamily:"var(--font-mono)", fontSize:12, color:"var(--mist)", letterSpacing:"0.08em", textTransform:"uppercase"}}>/ stavanger, 2026</div>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:28}}>
              <h2 style={{fontSize:40, fontWeight:600, letterSpacing:"-0.01em", lineHeight:1.15}}>Ulrik Andresen</h2>
              <div className="sl-slash">/ founder · engineer</div>
              <p style={{fontSize:19, lineHeight:1.65, color:"var(--alvesolv)"}}>
                I started Solidlab because I wanted to build software the way my grandfather built houses — slowly enough to get it right, and for people who'd still be using it in twenty years.
              </p>
              <p style={{fontSize:19, lineHeight:1.65, color:"var(--alvesolv)"}}>
                Before this I spent a decade shipping infrastructure in and around Oslo — platforms that handle real money for real people. The studio is the continuation of that work, with a smaller team and a longer time horizon.
              </p>
              <p style={{fontSize:19, lineHeight:1.65, color:"var(--alvesolv)"}}>
                If you'd like to talk about a project, or just how Norwegian engineering culture handles AI differently, <a className="sl-link" href="mailto:hello@solidlab.ai" style={{color:"var(--antikkhvit)", borderBottom:"1px solid var(--oslo)"}}>write to me directly</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stavanger narrative */}
      <section className="sl-section">
        <div className="shell">
          <div className="sl-slash" style={{marginBottom:24}}>/ stavanger / norway</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start"}}>
            <h2 style={{fontSize:48, fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.1, textWrap:"balance"}}>
              Why we're here, and not somewhere louder.
            </h2>
            <div style={{display:"flex", flexDirection:"column", gap:20, fontSize:17, lineHeight:1.65, color:"var(--alvesolv)"}}>
              <p>Stavanger is a harbor town on Norway's southwest coast — 140,000 people, a thousand-year-old cathedral, and the oil industry that shaped modern Norwegian engineering.</p>
              <p>The city punches above its weight in serious software because it has to. Platforms built here run on North Sea rigs, in hospitals, in boats that can't afford to be wrong about the weather. It's a culture that ships once and maintains for decades.</p>
              <p>That's the tradition we work in. We build for the long view, because where we're from, everything else already does.</p>
            </div>
          </div>
          {/* Meta strip */}
          <div className="sl-about-meta">
            <div><span>/ founded</span><strong>2026</strong></div>
            <div><span>/ studio</span><strong>Stavanger · Norway</strong></div>
            <div><span>/ team</span><strong>Small, intentionally</strong></div>
            <div><span>/ working</span><strong>Globally, remotely</strong></div>
          </div>
        </div>
      </section>

      {/* Values as slash-prefixed cards */}
      <section className="sl-section">
        <div className="shell">
          <div className="sl-slash" style={{marginBottom:24}}>/ 04 — principles</div>
          <h2 className="sl-section__title" style={{fontSize:56, marginBottom:64}}>
            Four things we refuse to compromise on.
          </h2>
          <div className="sl-values-grid">
            {values.map(v => (
              <div key={v.n} className="sl-value-card">
                <div className="sl-value-card__num">/ {v.n}</div>
                <h3 className="sl-value-card__t">{v.t}</h3>
                <p className="sl-value-card__b">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ CASE STUDY TEMPLATE ============ */
function CaseStudy({ data, onBack, onNext }) {
  if (!data) return null;
  return (
    <>
      <section className="sl-case-hero">
        <div className="shell">
          <a className="sl-detail__back" href="#" onClick={(e)=>{e.preventDefault(); onBack();}}>
            <span>←</span> / back to work
          </a>
          <div className="sl-slash" style={{marginTop:40, color:"var(--oslo)"}}>/ case study — {data.year}</div>
          <h1 className="sl-case-hero__title">{data.title}</h1>
          <p className="sl-case-hero__kicker">{data.kicker}</p>

          <div className="sl-case-meta">
            <div><span>/ client</span><strong>{data.client}</strong></div>
            <div><span>/ year</span><strong>{data.year}</strong></div>
            <div><span>/ kind</span><strong>{data.kind}</strong></div>
            <div><span>/ outcome</span><strong style={{color:"var(--oslo)"}}>{data.outcome}</strong></div>
          </div>
        </div>
      </section>

      {/* Problem · Approach · Result */}
      <section className="sl-section">
        <div className="shell">
          <div className="sl-par-grid" style={{gridTemplateColumns:"1fr 2fr 1fr"}}>
            {[
              { n:"01", t:"Problem",  b:data.problem  },
              { n:"02", t:"Approach", b:data.approach },
              { n:"03", t:"Result",   b:data.result   },
            ].map(b => (
              <div key={b.n} className="sl-par">
                <div className="sl-slash" style={{color:"var(--oslo)"}}>/ {b.n} — {b.t.toLowerCase()}</div>
                <h3 className="sl-par__t">{b.t}</h3>
                <p className="sl-par__b">{b.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery (placeholders) */}
      <section className="sl-section" style={{paddingTop:0}}>
        <div className="shell">
          <div className="sl-slash" style={{marginBottom:24}}>/ 02 — gallery</div>
          <div className="sl-gallery">
            <div className="sl-gallery__main">
              <div className="sl-img-ph sl-img-ph--wide">
                <span className="sl-slash" style={{color:"var(--mist)"}}>/ hero shot placeholder</span>
              </div>
            </div>
            <div className="sl-gallery__sub">
              <div className="sl-img-ph"><span className="sl-slash" style={{color:"var(--mist)"}}>/ detail 01</span></div>
              <div className="sl-img-ph"><span className="sl-slash" style={{color:"var(--mist)"}}>/ detail 02</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="sl-section">
        <div className="shell">
          <div className="sl-slash" style={{color:"var(--oslo)", marginBottom:32}}>/ 03 — in their words</div>
          <blockquote className="sl-pullquote">
            <span className="sl-pullquote__mark">/</span>
            <p className="sl-pullquote__text">{data.quote}</p>
            <footer className="sl-pullquote__cite">— {data.quoteAttribution}</footer>
          </blockquote>
        </div>
      </section>

      {/* Next case */}
      <section className="sl-section" style={{borderBottom:0}}>
        <div className="shell">
          <a className="sl-next-case" href="#" onClick={(e)=>{e.preventDefault(); onNext();}}>
            <div className="sl-slash" style={{color:"var(--mist)"}}>/ next case</div>
            <div className="sl-next-case__t">{data.nextTitle} <span>→</span></div>
            <div className="sl-next-case__k">{data.nextKicker}</div>
          </a>
        </div>
      </section>
    </>
  );
}

/* Sample case study data */
const SAMPLE_CASE = {
  title: "Bølgevarsel",
  kicker: "A real-time marine forecasting platform for Norwegian boaters — live, paying for itself.",
  client: "Bølgevarsel AS",
  year: "2026",
  kind: "Product · Studio",
  outcome: "Live · profitable",
  problem: "Norwegian recreational boaters were stitching together three different weather services to plan a single trip — none of them tuned for fjord conditions, and none of them honest about uncertainty. People were making risk decisions on bad data.",
  approach: "We built a small team of two and shipped a v0 in six weeks: a purpose-built forecast model for the Norwegian coast, a map UI that shows confidence bands instead of false precision, and a boringly reliable subscription billing stack. AI where it served the work; not where it didn't.",
  result: "Launched publicly in spring 2026. Hit operating-cost break-even in eleven weeks. Used today by licensed captains along the west coast. The team now runs it as a product, and we stepped back to a maintenance role — exactly as designed.",
  quote: "Solidlab wrote the kind of code I'd be happy to inherit. Three years from now this thing will still be cheap to run and easy to extend. That's rare.",
  quoteAttribution: "Kjetil H. · Captain, Stavanger Charter",
  nextTitle: "Lara",
  nextKicker: "AI scheduling assistant for clinical operations.",
};

Object.assign(window, { ContactPage, AboutPage, CaseStudy, SAMPLE_CASE });
