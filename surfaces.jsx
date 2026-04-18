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
              <span>Nordic · Remote-first</span>
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
            Rooted in the Nordic tradition of craft and quiet confidence. We build AI-powered SaaS products and consult on digital infrastructure — with the discipline of master builders.
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
              <div style={{marginTop:16, fontFamily:"var(--font-mono)", fontSize:12, color:"var(--mist)", letterSpacing:"0.08em", textTransform:"uppercase"}}>/ nordic, 2026</div>
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

      {/* Nordic narrative */}
      <section className="sl-section">
        <div className="shell">
          <div className="sl-slash" style={{marginBottom:24}}>/ nordic / since 2026</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start"}}>
            <h2 style={{fontSize:48, fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.1, textWrap:"balance"}}>
              Why we're here, and not somewhere louder.
            </h2>
            <div style={{display:"flex", flexDirection:"column", gap:20, fontSize:17, lineHeight:1.65, color:"var(--alvesolv)"}}>
              <p>The Nordic tradition is quiet, material, built to last. Wooden houses painted in Jotun tones. Engineering that outlasts fashion. A culture that values restraint over excess — and work that works.</p>
              <p>The city punches above its weight in serious software because it has to. Platforms built here run on North Sea rigs, in hospitals, in boats that can't afford to be wrong about the weather. It's a culture that ships once and maintains for decades.</p>
              <p>That's the tradition we work in. We build for the long view, because where we're from, everything else already does.</p>
            </div>
          </div>
          {/* Meta strip */}
          <div className="sl-about-meta">
            <div><span>/ founded</span><strong>2026</strong></div>
            <div><span>/ studio</span><strong>Nordic · Remote-first</strong></div>
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
  quoteAttribution: "Kjetil H. · Captain, Nordic Charter",
  nextTitle: "Lara",
  nextKicker: "AI scheduling assistant for clinical operations.",
};


/* ============ INVESTORS PAGE ============ */
function InvestorsPage() {
  return (
    <>
      {/* HERO */}
      <section className="sl-hero sl-investors-hero">
        <div className="shell">
          <div className="sl-hero__eyebrow sl-slash">/ for investors</div>
          <h1 className="sl-hero__title sl-hero__title--stacked">
            Funding Nordic ventures<br/>
            <span className="sl-investors-hero__accent">we build from the inside.</span>
          </h1>
          <p className="sl-hero__sub sl-investors-hero__sub">
            Solidlab is a venture studio. We identify real problems, build products with care,
            and invite capital in at the right stage — per project, not per fund.
          </p>
          <div className="sl-hero__cta">
            <a className="sl-btn sl-btn--primary"
               href="mailto:hello@solidlab.ai?subject=Investor%20inquiry"
               target="_blank" rel="noopener">Request project brief →</a>
          </div>
        </div>
      </section>

      {/* THE MODEL */}
      <section className="sl-sect">
        <div className="shell">
          <div className="sl-sect__eyebrow">/ 01 — the model</div>
          <h2 className="sl-sect__title">A venture studio, not a pitch deck.</h2>
          <p className="sl-sect__sub">
            We operate. We ship. We invite capital in when a project is ready to move — not before.
            Each venture stands on its own: its own cap table, its own trajectory, its own investors.
          </p>

          <div className="sl-investors-model">
            <div className="sl-investors-model__item">
              <div className="sl-investors-model__num">/ 01</div>
              <div className="sl-investors-model__title">We operate</div>
              <div className="sl-investors-model__desc">
                Not consulting, not roadmaps, not pitch decks in search of funding.
                We build the product, run the business, own the outcome.
              </div>
            </div>
            <div className="sl-investors-model__item">
              <div className="sl-investors-model__num">/ 02</div>
              <div className="sl-investors-model__title">We ship</div>
              <div className="sl-investors-model__desc">
                AI has compressed build timelines. A team that could once build one SaaS a year
                can now run several in parallel — if the operators know what they're doing.
              </div>
            </div>
            <div className="sl-investors-model__item">
              <div className="sl-investors-model__num">/ 03</div>
              <div className="sl-investors-model__title">We invite capital per project</div>
              <div className="sl-investors-model__desc">
                Each venture raises on its own merits. Investors back the specific bet,
                not a pooled vehicle. Direct equity, transparent terms.
              </div>
            </div>
            <div className="sl-investors-model__item">
              <div className="sl-investors-model__num">/ 04</div>
              <div className="sl-investors-model__title">We stay Nordic</div>
              <div className="sl-investors-model__desc">
                Built across the Nordics. Operating globally. Craft discipline from the
                Nordic tradition applied to AI-era software.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="sl-sect sl-sect--alt">
        <div className="shell">
          <div className="sl-sect__eyebrow">/ 02 — track record</div>
          <h2 className="sl-sect__title">A decade of building, shipping, scaling.</h2>
          <p className="sl-sect__sub">
            The founders have over ten years in product, tech, and go-to-market across
            multiple ventures — with real exits and products still running in production today.
          </p>

          <div className="sl-investors-record">
            <div className="sl-investors-record__item">
              <div className="sl-investors-record__num">10+</div>
              <div className="sl-investors-record__label">years building tech ventures</div>
            </div>
            <div className="sl-investors-record__item">
              <div className="sl-investors-record__num">Multiple</div>
              <div className="sl-investors-record__label">founder-exits</div>
            </div>
            <div className="sl-investors-record__item">
              <div className="sl-investors-record__num">Products</div>
              <div className="sl-investors-record__label">shipped, scaled, still live</div>
            </div>
            <div className="sl-investors-record__item">
              <div className="sl-investors-record__num">Operator</div>
              <div className="sl-investors-record__label">roles: founder, CEO, growth lead</div>
            </div>
          </div>

          <p className="sl-investors-record__note">
            Prior ventures named on request under NDA. Track record documentation
            available in initial conversations.
          </p>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="sl-sect">
        <div className="shell">
          <div className="sl-sect__eyebrow">/ 03 — why now</div>
          <h2 className="sl-sect__title">AI changed the economics of building.</h2>
          <p className="sl-sect__sub sl-investors-why__sub">
            The cost and time-to-market for production software dropped an order of magnitude.
            Seasoned operators can now run portfolios where solo ventures used to be the norm.
          </p>
          <p className="sl-sect__sub sl-investors-why__sub">
            Solidlab is the vehicle for doing this with discipline: pick problems carefully,
            build with craft, bring in capital when it genuinely accelerates outcomes.
          </p>
        </div>
      </section>

      {/* WHAT WE'RE LOOKING FOR */}
      <section className="sl-sect sl-sect--alt">
        <div className="shell">
          <div className="sl-sect__eyebrow">/ 04 — thesis fit</div>
          <h2 className="sl-sect__title">Who we'd like to hear from.</h2>

          <div className="sl-investors-fit">
            <div className="sl-investors-fit__item">
              <div className="sl-investors-fit__label">/ geography</div>
              <div className="sl-investors-fit__text">
                Nordic and global angels, seed funds with Nordic exposure,
                and strategic operators.
              </div>
            </div>
            <div className="sl-investors-fit__item">
              <div className="sl-investors-fit__label">/ thesis</div>
              <div className="sl-investors-fit__text">
                AI-era vertical SaaS, Norwegian infrastructure, operator-led
                venture studios, B2B products with recurring revenue.
              </div>
            </div>
            <div className="sl-investors-fit__item">
              <div className="sl-investors-fit__label">/ style</div>
              <div className="sl-investors-fit__text">
                Investors who back operators and stay out of the weeds.
                Long time horizons. Honest cap tables.
              </div>
            </div>
            <div className="sl-investors-fit__item">
              <div className="sl-investors-fit__label">/ stage</div>
              <div className="sl-investors-fit__text">
                Early. We bring you in before product-market fit is obvious —
                when the team and thesis are the bet.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sl-sect sl-investors-cta">
        <div className="shell">
          <div className="sl-sect__eyebrow">/ let's talk</div>
          <h2 className="sl-sect__title sl-investors-cta__title">
            If the thesis fits, we'd like to talk specifics.
          </h2>
          <p className="sl-sect__sub">
            Project briefs, cap-table structure, and operational details are shared
            in initial conversations — tailored to your interests and check size.
          </p>
          <div className="sl-hero__cta">
            <a className="sl-btn sl-btn--primary"
               href="mailto:hello@solidlab.ai?subject=Investor%20inquiry"
               target="_blank" rel="noopener">Request project brief →</a>
            <a className="sl-btn sl-btn--ghost"
               href="mailto:hello@solidlab.ai?subject=Introduction"
               target="_blank" rel="noopener">/ just say hi</a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactPage, AboutPage, CaseStudy, InvestorsPage, SAMPLE_CASE });
