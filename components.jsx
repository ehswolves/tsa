/* global React */
/* =========================================================================
   Shared icons, primitives, header, footer
   ========================================================================= */

const Icon = ({ name, size = 20, className = "", style }) => {
  const s = { width: size, height: size, ...style };
  const props = {
    viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round",
    style: s, className, "aria-hidden": true
  };
  switch (name) {
    case "bell":return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;
    case "calendar":return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "calendar-days":return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>;
    case "users":return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "file-text":return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
    case "arrow-right":return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "external-link":return <svg {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
    case "mail":return <svg {...props}><path d="M4 4h16v16H4z" /><polyline points="22 6 12 13 2 6" /></svg>;
    case "chevron-down":return <svg {...props}><polyline points="6 9 12 15 18 9" /></svg>;
    case "menu":return <svg {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
    case "x":return <svg {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
    case "clock":return <svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "map-pin":return <svg {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "search":return <svg {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    case "trophy":return <svg {...props}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M17 4h3v3a3 3 0 0 1-3 3M7 4H4v3a3 3 0 0 0 3 3" /></svg>;
    case "wrench":return <svg {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>;
    case "lightbulb":return <svg {...props}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.7c-.6.5-1 1.3-1 2.1V18H9v-1.2c0-.8-.4-1.6-1-2.1A7 7 0 0 1 12 2z" /></svg>;
    case "sparkles":return <svg {...props}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M19 16l.7 2L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z" /></svg>;
    case "lock":return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case "reply":return <svg {...props}><polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" /></svg>;
    case "paperclip":return <svg {...props}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>;
    case "instagram":return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
    case "school":return <svg {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></svg>;
    default:return null;
  }
};

const Button = ({ variant = "primary", children, icon, onClick, href, className = "", target, rel }) => {
  const cls = `es-btn es-btn--${variant} ${className}`;
  const content = <>
    {children}
    {icon && <Icon name={icon} size={16} style={{ marginLeft: 4 }} />}
  </>;
  if (href) return (
    <a className={cls} href={href} target={target} rel={rel}>{content}</a>);

  return <button type="button" onClick={onClick} className={cls}>{content}</button>;
};

const Pill = ({ tone = "tag", live, children }) =>
<span className={`es-pill es-pill--${tone}`}>
    {live && <span className="es-pill__dot" />}
    {children}
  </span>;


const Eyebrow = ({ children }) => <div className="es-eyebrow-h">{children}</div>;

/* =========================================================================
   Header
   ========================================================================= */

const Header = ({ active, onNavigate }) => {
  const [open, setOpen] = React.useState(false);
  const items = [
  { id: "home", label: "Home" },
  { id: "announcements", label: "Announcements" },
  { id: "resources", label: "Resources" }];

  const handleNav = (id) => {setOpen(false);onNavigate(id);window.scrollTo({ top: 0, behavior: "instant" });};
  return (
    <header className="es-header">
      <div className="es-header__inner es-container">
        <a className="es-header__brand" href="#" onClick={(e) => {e.preventDefault();handleNav("home");}}>
          <img className="es-header__wolf" src="assets/eastlake-wolf.png" alt="Eastlake Wolves" />
          <span className="es-header__div" aria-hidden="true"></span>
          <span className="es-header__wm">
            <span className="es-header__wm-top">EASTLAKE</span>
            <span className="es-header__wm-bot">TSA</span>
          </span>
        </a>
        <nav className="es-header__nav">
          {items.map((it) =>
          <a key={it.id} href="#"
          className={`es-navlink ${active === it.id ? "is-active" : ""}`}
          onClick={(e) => {e.preventDefault();handleNav(it.id);}}>
              {it.label}
            </a>
          )}
        </nav>
        <div className="es-header__cta">
          <Button variant="primary" icon="mail" href="mailto:cpixley@lwsd.org">Contact</Button>
        </div>
      </div>
    </header>);

};

/* =========================================================================
   Footer
   ========================================================================= */

const Footer = ({ onNavigate }) =>
<footer className="es-footer">
    <div className="es-container es-footer__inner">
      <div className="es-footer__brand">
        <div className="es-footer__lockup">
          <img src="assets/eastlake-wolf.png" alt="Eastlake Wolves" height="64" />
          <span className="es-footer__wm">
            <span className="es-footer__wm-top">EASTLAKE</span>
            <span className="es-footer__wm-bot">TSA</span>
          </span>
        </div>
        <p className="es-footer__tag">Eastlake High School chapter of the Technology Student Association. A STEM‑based event competition club, run by students, supported by our advisor.</p>
      </div>
      <div className="es-footer__cols">
        <div>
          <div className="es-footer__col-head">Chapter</div>
          <a href="#" onClick={(e) => {e.preventDefault();onNavigate("home");}}>Home</a>
          <a href="#" onClick={(e) => {e.preventDefault();onNavigate("announcements");}}>Announcements</a>
          <a href="#" onClick={(e) => {e.preventDefault();onNavigate("resources");}}>Resources</a>
        </div>
        <div>
          <div className="es-footer__col-head">Connect</div>
          <a href="mailto:cpixley@lwsd.org"><Icon name="mail" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />cpixley@lwsd.org</a>
          <a href="https://ehs.lwsd.org" target="_blank" rel="noopener noreferrer"><Icon name="external-link" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />Eastlake High School</a>
        </div>
        <div>
          <div className="es-footer__col-head">About</div>
          <a href="https://tsaweb.org" target="_blank" rel="noopener noreferrer"><Icon name="external-link" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />National TSA</a>
          <a href="https://washingtontsa.org" target="_blank" rel="noopener noreferrer"><Icon name="external-link" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />Washington TSA</a>
        </div>
      </div>
    </div>
    <div className="es-container es-footer__bottom">
      <span>© 2026 Eastlake TSA · Lake Washington School District</span>
      <span>This website is unofficial and is a model in-progress.</span>
    </div>
  </footer>;


Object.assign(window, { Icon, Button, Pill, Eyebrow, Header, Footer });