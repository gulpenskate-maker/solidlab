/* ============================================================
   SOLIDLAB COOKIE CONSENT
   Minimal, brand-aligned consent manager
   API: window.solidlabConsent
   ============================================================ */

(function() {
  const STORAGE_KEY = "solidlab-consent";
  const VERSION = 1;

  const DEFAULTS = {
    version: VERSION,
    timestamp: null,
    necessary: true,   // always true, cannot be changed
    analytics: false,
    marketing: false,
  };

  // Event emitter for consent changes
  const listeners = new Set();

  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Invalidate old versions to re-prompt when categories change
      if (parsed.version !== VERSION) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(consent) {
    const full = {
      ...DEFAULTS,
      ...consent,
      necessary: true,
      version: VERSION,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    } catch (e) {
      console.warn("[solidlab-consent] could not persist:", e);
    }
    listeners.forEach(fn => {
      try { fn(full); } catch (e) { console.error(e); }
    });
    return full;
  }

  // Public API — available immediately so other scripts can check consent
  window.solidlabConsent = {
    get: () => readConsent() || { ...DEFAULTS },
    has: (category) => {
      const c = readConsent();
      return c ? !!c[category] : false;
    },
    onChange: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    showPreferences: () => {
      window.dispatchEvent(new CustomEvent("solidlab-consent:open"));
    },
    // Internal — used by the component
    _write: writeConsent,
    _read: readConsent,
  };
})();

/* ============================================================
   REACT COMPONENT
   ============================================================ */

function CookieConsent() {
  const [visible, setVisible] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [prefs, setPrefs] = React.useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Initial mount: decide whether to show the banner
  React.useEffect(() => {
    const existing = window.solidlabConsent._read();
    if (!existing) {
      // Delay a tick so it feels like an intentional reveal, not a flash
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    } else {
      setPrefs({
        necessary: true,
        analytics: !!existing.analytics,
        marketing: !!existing.marketing,
      });
    }
  }, []);

  // Listen for external "open preferences" requests
  React.useEffect(() => {
    const handler = () => setModalOpen(true);
    window.addEventListener("solidlab-consent:open", handler);
    return () => window.removeEventListener("solidlab-consent:open", handler);
  }, []);

  // Body scroll lock when modal is open
  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // ESC key closes modal
  React.useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  const acceptAll = () => {
    const next = { necessary: true, analytics: true, marketing: true };
    setPrefs(next);
    window.solidlabConsent._write(next);
    setVisible(false);
    setModalOpen(false);
  };

  const rejectAll = () => {
    const next = { necessary: true, analytics: false, marketing: false };
    setPrefs(next);
    window.solidlabConsent._write(next);
    setVisible(false);
    setModalOpen(false);
  };

  const savePrefs = () => {
    window.solidlabConsent._write(prefs);
    setVisible(false);
    setModalOpen(false);
  };

  const togglePref = (key) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  return (
    <>
      {/* Banner */}
      <div
        className={`sl-cc ${visible ? 'sl-cc--visible' : ''}`}
        role="region"
        aria-label="Cookie consent"
        aria-hidden={!visible}
      >
        <div className="sl-cc__inner">
          <div className="sl-cc__container">
            <div className="sl-cc__content">
              <div className="sl-cc__eyebrow">
                <span className="sl-slash">/</span> cookies
              </div>
              <p className="sl-cc__text">
                We use cookies to make this site work, remember your preferences, and — with your consent — measure what helps us build better. Details in our <a href="/legal/privacy">privacy policy</a>.
              </p>
            </div>
            <div className="sl-cc__actions">
              <button
                className="sl-cc__btn"
                onClick={() => setModalOpen(true)}
                aria-label="Customize cookie preferences"
              >
                <span className="sl-slash">/</span> customize
              </button>
              <button
                className="sl-cc__btn"
                onClick={rejectAll}
              >
                reject all
              </button>
              <button
                className="sl-cc__btn sl-cc__btn--primary"
                onClick={acceptAll}
              >
                accept all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <div
        className={`sl-cc-modal ${modalOpen ? 'sl-cc-modal--visible' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sl-cc-modal-title"
        aria-hidden={!modalOpen}
      >
        <div
          className="sl-cc-modal__backdrop"
          onClick={() => setModalOpen(false)}
        />
        <div className="sl-cc-modal__panel">
          <div className="sl-cc-modal__head">
            <div className="sl-cc-modal__head-text">
              <div className="sl-cc-modal__eyebrow">
                <span className="sl-slash">/</span> cookie preferences
              </div>
              <h2 className="sl-cc-modal__title" id="sl-cc-modal-title">
                Choose what we measure.
              </h2>
              <p className="sl-cc-modal__subtitle">
                Necessary cookies keep the site working. Everything else is opt-in. You can change this any time.
              </p>
            </div>
            <button
              className="sl-cc-modal__close"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="sl-cc-modal__body">
            {/* Necessary */}
            <div className="sl-cc-cat">
              <div className="sl-cc-cat__head">
                <h3 className="sl-cc-cat__title">
                  <span className="sl-slash">/</span> necessary
                  <span className="sl-cc-cat__badge">always on</span>
                </h3>
                <label className="sl-cc-toggle">
                  <input type="checkbox" checked disabled readOnly />
                  <span className="sl-cc-toggle__slider"></span>
                </label>
              </div>
              <p className="sl-cc-cat__desc">
                Required for the site to work. Session, theme preference, language selection. No consent needed under GDPR.
              </p>
              <div className="sl-cc-cat__examples">
                <span className="sl-slash">/</span> solidlab-theme · weglot language · session
              </div>
            </div>

            {/* Analytics */}
            <div className="sl-cc-cat">
              <div className="sl-cc-cat__head">
                <h3 className="sl-cc-cat__title">
                  <span className="sl-slash">/</span> analytics
                </h3>
                <label className="sl-cc-toggle">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={() => togglePref("analytics")}
                  />
                  <span className="sl-cc-toggle__slider"></span>
                </label>
              </div>
              <p className="sl-cc-cat__desc">
                Helps us understand how the site is used — which pages get traffic, what breaks, where people drop off. Aggregated data only, never sold.
              </p>
              <div className="sl-cc-cat__examples">
                <span className="sl-slash">/</span> google analytics · search console · plausible
              </div>
            </div>

            {/* Marketing */}
            <div className="sl-cc-cat">
              <div className="sl-cc-cat__head">
                <h3 className="sl-cc-cat__title">
                  <span className="sl-slash">/</span> marketing
                </h3>
                <label className="sl-cc-toggle">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={() => togglePref("marketing")}
                  />
                  <span className="sl-cc-toggle__slider"></span>
                </label>
              </div>
              <p className="sl-cc-cat__desc">
                Lets us measure the impact of campaigns we run on Meta, Google, and LinkedIn. Used to reach people who might want what we build.
              </p>
              <div className="sl-cc-cat__examples">
                <span className="sl-slash">/</span> meta pixel · linkedin insight · google ads
              </div>
            </div>
          </div>

          <div className="sl-cc-modal__foot">
            <button
              className="sl-cc__btn"
              onClick={rejectAll}
            >
              reject all
            </button>
            <button
              className="sl-cc__btn"
              onClick={savePrefs}
            >
              <span className="sl-slash">/</span> save choices
            </button>
            <button
              className="sl-cc__btn sl-cc__btn--primary"
              onClick={acceptAll}
            >
              accept all
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* Export to global scope */
window.CookieConsent = CookieConsent;
