/* global React, Icon, Button, Pill, Eyebrow, Header, Footer */
const { useState } = React;

/* =========================================================================
   File helpers + PDF viewer
   ========================================================================= */

const FileViewerContext = React.createContext(null);

const FileViewerProvider = ({ children }) => {
  const [state, setState] = useState(null); // { url, title, kind }
  const open = React.useCallback(async (href, title, kind) => {
    // All local files (PDF + XLSX) download directly — preview in the
    // sandboxed iframe is unreliable, so just give the user the file.
    try {
      const resp = await fetch(href);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = href.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      console.error("download failed", err);
      // Fallback: try a plain navigation so the browser at least surfaces an error.
      window.location.href = href;
    }
  }, []);
  const close = React.useCallback(() => {
    setState((s) => {
      if (s?.url) setTimeout(() => URL.revokeObjectURL(s.url), 60_000);
      return null;
    });
  }, []);
  React.useEffect(() => {
    if (!state) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, close]);
  return (
    <FileViewerContext.Provider value={{ open }}>
      {children}
      {state && (
        <div className="file-viewer" role="dialog" aria-modal="true" aria-label={state.title}>
          <div className="file-viewer__scrim" onClick={close}/>
          <div className="file-viewer__panel">
            <div className="file-viewer__bar">
              <div className="file-viewer__title">
                <Icon name="file-text" size={16}/>
                <span>{state.title}</span>
              </div>
              <div className="file-viewer__actions">
                {state.url && (
                  <a className="file-viewer__btn" href={state.url} download={state.href.split("/").pop()}>
                    <Icon name="arrow-right" size={14} style={{transform:"rotate(90deg)"}}/>
                    Download
                  </a>
                )}
                <button className="file-viewer__btn file-viewer__btn--icon" type="button" onClick={close} aria-label="Close">
                  <Icon name="x" size={18}/>
                </button>
              </div>
            </div>
            <div className="file-viewer__body">
              {state.loading && (
                <div className="file-viewer__status">
                  <div className="file-viewer__spinner"/>
                  Loading {state.title}…
                </div>
              )}
              {state.error && (
                <div className="file-viewer__status">
                  <Icon name="x" size={20}/>
                  <div>
                    <strong>Couldn't load this file.</strong>
                    <div style={{fontSize:13, opacity:0.7, marginTop:6}}>{state.error}</div>
                  </div>
                </div>
              )}
              {state.url && state.kind === "pdf" && (
                <iframe className="file-viewer__frame" src={state.url} title={state.title}/>
              )}
            </div>
          </div>
        </div>
      )}
    </FileViewerContext.Provider>
  );
};

const useFileViewer = () => React.useContext(FileViewerContext);

/* =========================================================================
   DATA
   ========================================================================= */

const OFFICERS = [
{
  name: "Christina Pixley",
  role: "Advisor",
  titleSuffix: "Our Amazing Advisor",
  email: "cpixley@lwsd.org",
  isAdvisor: true
},
{
  name: "Tanya Acharya",
  role: "President",
  email: "1046594@lwsd.org"
},
{
  name: "Sayuri Kuruppu",
  role: "VP of Competition",
  email: "1053337@lwsd.org"
},
{
  name: "Anika Bhadra",
  role: "VP of Competition",
  email: "1060112@lwsd.org"
},
{
  name: "Ila Lu",
  role: "VP of Communication",
  email: "1053868@lwsd.org"
},
{
  name: "Shivam Chowdhary",
  role: "VP of Finance",
  email: "1058748@lwsd.org"
},
{
  name: "Saahil Dugar",
  role: "VP of Mentorship",
  email: "1051549@lwsd.org"
},
{
  name: "Yash Nagarahalli",
  role: "VP of Mentorship",
  email: "1066968@lwsd.org"
}];


/* Conference dates — pushed one year forward per request. */
const DATES = [
{
  kind: "Intra‑chapters",
  detail: "In‑school competition",
  title: "Intra‑chapter Week",
  range: "Nov 17 – 21, 2026",
  note: "The week before Thanksgiving Break. Open to every member — your warm‑up for States.",
  variant: "default"
},
{
  kind: "State conference",
  detail: "Washington TSA",
  title: "WA TSA State",
  range: "Apr 15 – 18, 2027",
  note: "Falls during Spring Break — sorry, not our fault 😢. Teams confirmed in late winter.",
  variant: "crimson"
},
{
  kind: "National conference",
  detail: "Top finishers advance",
  title: "National TSA",
  range: "Jun 22 – 26, 2027",
  note: "The week after the school year ends. Travel and registration are coordinated by officers.",
  variant: "navy"
}];


const FEATURES = [
{
  icon: "wrench",
  title: "Hands‑on STEM events",
  body: "From Engineering Design to Software Development to Children's Stories — events that reward making, not just memorizing."
},
{
  icon: "trophy",
  title: "Compete, locally to nationally",
  body: "Members compete at Intra‑chapters, advance to the WA State Conference, and qualify for Nationals each summer."
},
{
  icon: "users",
  title: "A real CTSO",
  body: "TSA is a recognized Career and Technical Student Organization. The work you do here counts toward future scholarships and college apps."
}];


const INTRACHAPTERS_URL = "https://lwsd-my.sharepoint.com/:x:/r/personal/1098823_lwsd_org/Documents/12th%20Grade/TSA%20Officers/25-26/Intrachapter/TSA%20Event%20and%20Team%20Selection%20-%20INTRACHAPTER.xlsx?d=w0f17875cb93e483894563f696878de06&csf=1&web=1&e=GRjnVQ";
const STATES_URL = "https://lwsd-my.sharepoint.com/:x:/g/personal/1098823_lwsd_org/IQAuPWpC92VHQYtgLo0Tj_0kAXoJplbK7LQTG7_Z-ZuGu-Y?e=Osi5zG";
const OFFICER_APP_URL = "https://forms.office.com/pages/responsepage.aspx?id=P2fUH5bfIUaGOKHYjEyF1__sKDpcF5dHkQVKrWtS3KFUNjFKNFUzTVlVTkhZMzFBRTVMUEIzR0pBSy4u&route=shorturl";
const NATIONALS_PORTAL = "https://tsamembership.registermychapter.com/members#";
const CORRECT_RUBRICS_URL = "https://lwsd-my.sharepoint.com/:f:/g/personal/cpixley_lwsd_org/IgDhr5cS_UCUQKK1r08rNNQkAVsJDdUC2RpBmsnlEgzS-ZM?e=vNOBU9";
const STATES_RUBRICS_URL = "https://lwsd-my.sharepoint.com/:f:/g/personal/1098823_lwsd_org/IgDW_CTd8jMQTKUlzS8aJ-AyAdBnNfKaG8ZEzvswb9Yhgrc?e=Zm3mPW";
const STATE_CONFERENCE_URL = "https://www.washingtontsa.org/2026-state-conference";
const TSA_REGISTRATION_URL = "https://lwsd-my.sharepoint.com/:x:/r/personal/1098823_lwsd_org/Documents/12th%20Grade/TSA%20Officers/25-26/General/TSA%20Registration%202026.xlsx?d=wed17071065bd40ebbefea305a38fe97d&csf=1&web=1&e=W8JAWN";
const CANVAS_ROSTER_URL = "https://lwsd-my.sharepoint.com/:x:/r/personal/1098823_lwsd_org/Documents/12th%20Grade/TSA%20Officers/25-26/General/tsa%20canvas%20student%20roster.xlsx?d=w1a56f7d057124a88bed9aca567a9959b&csf=1&web=1&e=GBZH4w";
const OFFICER_GROUPINGS_URL = "https://lwsd-my.sharepoint.com/:x:/r/personal/1098823_lwsd_org/Documents/12th%20Grade/TSA%20Officers/25-26/General/Officer%20Groupings%202025-2026.xlsx?d=w26d882a80c9149b0bda1f1128db3846f&csf=1&web=1&e=pc4kjS";

const ANNOUNCEMENTS = [
{
  id: "officers-26-27",
  title: "EHS TSA 26‑27 Officer Applications",
  eyebrow: "Discussion Topic",
  author: "Saranya Agrawal",
  initials: "SA",
  role: "Author · Teacher",
  posted: "Posted May 11, 4:59 PM",
  closed: true,
  paragraphs: [
  <>If you are interested in applying for the Eastlake TSA officer team, applications are open from today till <strong>Saturday (5/16) at 11:59 PM</strong>. We will <strong>NOT</strong> be accepting late submissions.</>,
  <>After the initial round of applications, we will hold interviews and finally announce the new officer team in the beginning of June!</>,
  <>Application: <a href={OFFICER_APP_URL} target="_blank" rel="noopener noreferrer">2026‑27 TSA Officer Application — Fill out form</a></>],

  replies: [
  {
    author: "Saranya Agrawal",
    initials: "SA",
    date: "May 15, 10:31 PM",
    content: "REMINDER: officer applications are due tomorrow night!"
  }]

},
{
  id: "nationals-early-entry",
  title: "Nationals Early Entry Submissions",
  eyebrow: "Discussion Topic",
  author: "Saranya Agrawal",
  initials: "SA",
  role: "Author · Teacher",
  posted: "Posted May 11, 4:50 PM",
  closed: true,
  paragraphs: [
  <>If you are participating in TSA Nationals and have an event requiring an <strong>EARLY ENTRY SUBMISSION</strong>, the portal is open from today to <strong>Wednesday at 11:59 PM ET</strong> (NOT PST). They will not be accepting late submissions, so please get it in ASAP!</>,
  <>You can find the instructions to submit in the PDF attached. Here is the link to the portal: <a href={NATIONALS_PORTAL} target="_blank" rel="noopener noreferrer">{NATIONALS_PORTAL}</a></>],

  attachments: [
  { name: "competition-component-upload-instructions.pdf", href: "#" }]

},
{
  id: "grab-projects",
  title: "GRAB YOUR PROJECTS!",
  eyebrow: "Discussion Topic",
  author: "Saranya Agrawal",
  initials: "SA",
  role: "Author · Teacher",
  posted: "Posted Apr 28, 9:18 PM",
  closed: true,
  paragraphs: [
  <>If you had a project that you had put in the red truck to bring back from States, please grab it from <strong>Ms. Pixley's room (C112)</strong> ASAP! There are still a bunch of projects there.</>]

},
{
  id: "correct-rubrics",
  title: "Correct Rubrics",
  eyebrow: "Discussion Topic",
  author: "Christina Pixley",
  initials: "CP",
  role: "Author · Teacher",
  posted: "Posted Apr 26, 6:27 AM",
  closed: true,
  paragraphs: [
  <>Hi all,</>,
  <>It seems there was an issue with some of the rubrics. Please find them <a href={CORRECT_RUBRICS_URL} target="_blank" rel="noopener noreferrer">HERE</a> and let me know if you have any issues.</>]

},
{
  id: "states-rubrics-nationals-updates",
  title: "States Rubrics + Nationals Updates",
  eyebrow: "Discussion Topic",
  author: "Saranya Agrawal",
  initials: "SA",
  role: "Author · Teacher",
  posted: "Posted Apr 22, 10:17 PM",
  closed: true,
  paragraphs: [
  <>Hi everyone,</>,
  <>Here are your rubrics for TSA States: <a href={STATES_RUBRICS_URL} target="_blank" rel="noopener noreferrer">States Rubrics!</a> Ms. Pixley has reached out if you are eligible to go to TSA Nationals :). More details about that should be going out soon.</>,
  <>If you are a senior, the officers will be reaching out to you for your project/event content to create a compilation of all the past events + rubrics to help future members out. Please be on the lookout for that email!</>,
  <>We will not be having regular meetings, but information about officer applications will be coming out in the next few weeks as well.</>]

},
{
  id: "state-conference-app-reminders",
  title: "State Conference App + Last Minute Reminders",
  eyebrow: "Discussion Topic",
  author: "Anirudh Aravind",
  initials: "AA",
  role: "Author · Teacher",
  posted: "Posted Apr 14, 10:46 AM",
  closed: true,
  paragraphs: [
  <>Hello everyone,</>,
  <>Hope you are having a good spring break. Please download the WTSA State Conference Schedule in the Guidebook App using the instructions below. This will have the timings for all events as well as the semifinalists for each event when they are announced. <strong>Some events will happen tomorrow right after we arrive, so please download the app and check ASAP.</strong></>,
  <><a href={STATE_CONFERENCE_URL} target="_blank" rel="noopener noreferrer">2026 State Conference — Washington Technology Student Association</a></>,
  <>Also here are some last‑minute reminders:</>],

  bullets: [
  <>Portfolios should <strong>not</strong> have your names on them. You will get points taken off if they do.</>,
  <>Portfolios should be submitted in clear plastic covers. <strong>Binders will not be accepted.</strong></>,
  <>It is a 4‑hour bus ride to Spokane. Please bring snacks or anything else you may need.</>,
  <>Remember to pack dress pants/shoes or any other formal wear you may need.</>],

  paragraphsAfter: [
  <>If you are not in a phone tree yet or have any additional questions, please let me know.</>,
  <>Thank you,<br />Anirudh Aravind</>]

}];


/* =========================================================================
   HOME
   ========================================================================= */

const Hero = () =>
<section className="site-hero">
    <div className="es-container">
      <img className="site-hero__banner" src="assets/tsa-banner.png" alt="Eastlake TSA — Technology Student Association" />
      <div className="site-hero__intro">
        <div>
          <Eyebrow>Welcome to EHS TSA</Eyebrow>
          <h1 className="site-hero__welcome">
            A STEM competition club — <em>built by students, for students.</em>
          </h1>
          <p className="site-hero__body">
            We're a <strong>STEM‑based competition club</strong> (Career and Technical Student Organization)
            with a lot of hands‑on and interactive events — ranging from Engineering Design to
            Children's Stories. We compete at the chapter, state, and national level.
          </p>
          <div className="site-tag-row">
            <Pill tone="tag">Hands‑on</Pill>
            <Pill tone="tag-outline">CTSO</Pill>
            <Pill tone="tag-outline">Eastlake High School</Pill>
          </div>
        </div>
        <aside className="site-hero__aside">
          <div className="site-hero__aside-eyebrow">What's on this site</div>
          <h2 className="site-hero__aside-title">Everything that used to live on Canvas</h2>
          <ul className="site-hero__aside-list">
            <li><span><strong>Announcements</strong>Important updates from the officer team</span></li>
            <li><span><strong>Files</strong>Meeting slides and event information</span></li>
            <li><span><strong>Discussions</strong>A space to ask questions</span></li>
            <li><span><strong>Calendar</strong>Meeting reminders and deadlines</span></li>
            <li><span><strong>To‑do</strong>Sign‑ups, deadlines, what's next</span></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>;


const About = () =>
<section className="es-section site-about">
    <div className="es-container">
      <div className="es-section-title">
        <div>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="site-h2">The short version</h2>
        </div>
      </div>
      <div className="site-about__grid">
        {FEATURES.map((f, i) =>
      <div key={i} className="site-feature">
            <div className="site-feature__icon"><Icon name={f.icon} size={22} /></div>
            <h3 className="site-feature__title">{f.title}</h3>
            <p className="site-feature__body">{f.body}</p>
          </div>
      )}
      </div>
    </div>
  </section>;


const Dates = () =>
<section className="es-section">
    <div className="es-container">
      <div className="es-section-title">
        <div>
          <Eyebrow>Important dates</Eyebrow>
          <h2 className="site-h2">The competition calendar</h2>
        </div>
        <p style={{ maxWidth: 320, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-500)", margin: 0 }}>
          Three big checkpoints in the TSA year. Plan around them — especially States, which falls during Spring Break.
        </p>
      </div>
      <div className="site-dates">
        {DATES.map((d, i) =>
      <div key={i} className={`site-date ${d.variant === "navy" ? "site-date--navy" : d.variant === "crimson" ? "site-date--crimson" : ""}`}>
            <div className="site-date__eyebrow">{d.kind}</div>
            <h3 className="site-date__title">{d.title}</h3>
            <div className="site-date__dates">{d.range}</div>
            <div className="site-date__note">{d.note}</div>
          </div>
      )}
      </div>
    </div>
  </section>;


const Teams = () =>
<section className="es-section es-section--alt">
    <div className="es-container">
      <div className="es-section-title">
        <div>
          <Eyebrow>Team selection</Eyebrow>
          <h2 className="site-h2">Sign up for an event</h2>
        </div>
        <p style={{ maxWidth: 340, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-500)", margin: 0 }}>
          Browse events and find your team. Both sheets are maintained by your officers — check back as deadlines approach.
        </p>
      </div>
      <div className="site-teams">
        <a className="site-team" href={INTRACHAPTERS_URL} target="_blank" rel="noopener noreferrer">
          <div className="site-team__icon"><Icon name="file-text" size={24} /></div>
          <div className="site-team__body">
            <div className="site-team__eyebrow">Intra‑chapter teams</div>
            <div className="site-team__title">
              TSA Event and Team Selection
              <Icon name="external-link" size={14} />
            </div>
            <div className="site-team__desc">The master spreadsheet for in‑school competition events. Pick events, find teammates.</div>
          </div>
        </a>
        <a className="site-team site-team--crimson" href={STATES_URL} target="_blank" rel="noopener noreferrer">
          <div className="site-team__icon"><Icon name="trophy" size={24} /></div>
          <div className="site-team__body">
            <div className="site-team__eyebrow">States teams</div>
            <div className="site-team__title">
              States Event Teams
              <Icon name="external-link" size={14} />
            </div>
            <div className="site-team__desc">Confirmed rosters for the Washington State Conference next spring.</div>
          </div>
        </a>
      </div>
    </div>
  </section>;


const Officers = () =>
<section className="es-section">
    <div className="es-container">
      <div className="es-section-title">
        <div>
          <Eyebrow>Officers · 2026–27</Eyebrow>
          <h2 className="site-h2">The people running this</h2>
        </div>
        <p style={{ maxWidth: 360, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-500)", margin: 0 }}>
          If you have any questions, feel free to reach out to any of the officers — each owns a different area of the chapter.
        </p>
      </div>
      <div className="site-officers">
        {OFFICERS.map((o, i) => {
        const initials = o.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
        return (
          <article key={i} className={`site-officer ${o.isAdvisor ? "site-officer--advisor" : ""}`}>
              <div className="site-officer__avatar">{initials}</div>
              <div className="site-officer__body">
                <div className="site-officer__role">{o.role}</div>
                <h3 className="site-officer__name">{o.name}</h3>
                {o.titleSuffix &&
                  <div className="site-officer__suffix">{o.titleSuffix}</div>
                }
                {o.email &&
                  <a className="site-officer__email" href={`mailto:${o.email}`}>
                    <Icon name="mail" size={13} /> {o.email}
                  </a>
                }
              </div>
            </article>);

      })}
      </div>
    </div>
  </section>;


const HomePage = () =>
<>
    <Hero />
    <About />
    <Dates />
    <Teams />
    <Officers />
  </>;


/* =========================================================================
   ANNOUNCEMENTS PAGE
   ========================================================================= */

const AnnouncementPost = ({ post }) =>
<article className="site-post">
    <div className="site-post__head">
      <div className="site-post__avatar">{post.initials}</div>
      <div>
        <div className="site-post__author-row">
          <span className="site-post__author">{post.author}</span>
          <span className="site-post__role-pill">{post.role}</span>
        </div>
        <div className="site-post__date">{post.posted}</div>
      </div>
      {post.replies && post.replies.length > 0 &&
    <div className="site-post__meta-right">
          <span className="site-post__reply-count">
            <Icon name="reply" size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            {post.replies.length} {post.replies.length === 1 ? "Reply" : "Replies"}
          </span>
        </div>
    }
    </div>
    <div className="site-post__body">
      {post.eyebrow && <div className="site-post__title-eyebrow">{post.eyebrow}: {post.title}</div>}
      <h2 className="site-post__title">{post.title}</h2>
      <div className="site-post__content">
        {post.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        {post.bullets &&
      <ul className="site-post__bullets">
            {post.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
      }
        {post.paragraphsAfter && post.paragraphsAfter.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {post.attachments &&
    <div className="site-post__attachments">
          {post.attachments.map((a, i) =>
      <a key={i} className="site-post__attachment" href={a.href}>
              <Icon name="paperclip" size={14} />
              {a.name}
            </a>
      )}
        </div>
    }
    </div>
    {post.replies && post.replies.map((r, i) =>
  <div key={i} className="site-reply">
        <div className="site-reply__avatar">{r.initials}</div>
        <div className="site-reply__body">
          <div className="site-reply__head">
            <span className="site-reply__name">{r.author}</span>
            <span className="site-reply__date">Reply from {r.author} · {r.date}</span>
          </div>
          <p className="site-reply__content">{r.content}</p>
        </div>
      </div>
  )}
    {post.closed &&
  <div className="site-post__foot">
        <span className="site-post__closed">
          <Icon name="lock" size={13} /> This topic is closed for comments.
        </span>
      </div>
  }
  </article>;


const AnnouncementsPage = () => {
  const [query, setQuery] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("newest");
  const sortRef = React.useRef(null);

  React.useEffect(() => {
    if (!sortOpen) return;
    const onClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [sortOpen]);

  const filtered = ANNOUNCEMENTS.filter((a) =>
  !query ||
  a.title.toLowerCase().includes(query.toLowerCase()) ||
  a.author.toLowerCase().includes(query.toLowerCase())
  );
  const sorted = sort === "oldest" ? [...filtered].reverse() : filtered;
  const sortLabel = sort === "oldest" ? "Oldest first" : "Newest first";
  return (
    <>
      <div className="es-pagehead">
        <div className="es-container">
          <Eyebrow>Announcements</Eyebrow>
          <h1>Officer updates, deadlines, and reminders</h1>
          <p>Posts from the officer team — the freshest things sit at the top. Comments are closed on official announcements; reach out to an officer directly if you have questions.</p>
          <div className="site-pagehead-meta">
            <span><Icon name="bell" size={14} /> {ANNOUNCEMENTS.length} announcements</span>
            <span><Icon name="calendar" size={14} /> Latest: May 15, 2026</span>
          </div>
        </div>
      </div>
      <section className="es-section">
        <div className="es-container">
          <div className="site-ann-toolbar">
            <div className="site-ann-search">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Search entries or author…"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />

            </div>
            <div className="site-ann-sort-wrap" ref={sortRef}>
              <button
                className={`site-ann-sort ${sortOpen ? "is-open" : ""}`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((o) => !o)}>
                Sort by: {sortLabel}
                <Icon name="chevron-down" size={14} />
              </button>
              {sortOpen && (
                <div className="site-ann-sort-menu" role="listbox">
                  <button
                    type="button"
                    role="option"
                    aria-selected={sort === "newest"}
                    className={`site-ann-sort-opt ${sort === "newest" ? "is-active" : ""}`}
                    onClick={() => { setSort("newest"); setSortOpen(false); }}>
                    Newest first
                  </button>
                  <button
                    type="button"
                    role="option"
                    aria-selected={sort === "oldest"}
                    className={`site-ann-sort-opt ${sort === "oldest" ? "is-active" : ""}`}
                    onClick={() => { setSort("oldest"); setSortOpen(false); }}>
                    Oldest first
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="site-ann-list">
            {sorted.map((post) => <AnnouncementPost key={post.id} post={post} />)}
            {sorted.length === 0 &&
            <div style={{ padding: "48px", textAlign: "center", color: "var(--ink-500)", fontFamily: "var(--font-body)" }}>
                No announcements match "{query}".
              </div>
            }
          </div>
        </div>
      </section>
    </>);

};

/* =========================================================================
   RESOURCES PAGE
   ========================================================================= */

const RESOURCE_GROUPS = [
{
  title: "Competition guides",
  subtitle: "Rules, events, and what's allowed",
  items: [
  {
    kind: "pdf",
    title: "2024–2025 HS Summary of Changes",
    desc: "Quick read on what changed from last year — useful if you competed before.",
    href: "files/2024-2025-HS-Summary-of-Changes.pdf",
    size: "79 KB",
    ext: "PDF"
  },
  {
    kind: "pdf",
    title: "Team & Entry Limits",
    desc: "How many people per team, how many entries per chapter, per event.",
    href: "files/Team-and-Entry-Limits.pdf",
    size: "156 KB",
    ext: "PDF"
  }]

},
{
  title: "Intra‑chapter competition",
  subtitle: "Everything for the November in‑school comp",
  items: [
  {
    kind: "xlsx",
    title: "Intra‑chapter Schedule",
    desc: "When each event runs during Intra‑chapter Week.",
    href: "files/Interchapter-Schedule.xlsx",
    size: "10 KB",
    ext: "XLSX"
  },
  {
    kind: "xlsx",
    title: "Intra‑chapter Rubrics 25–26",
    desc: "Scoring rubrics officers use to judge each event. Read your event's rubric before you start.",
    href: "files/Intrachapter-Rubrics-25-26.xlsx",
    size: "13 KB",
    ext: "XLSX"
  },
  {
    kind: "link",
    title: "TSA Event and Team Selection — Intra‑chapter",
    desc: "Pick your events and find teammates. Officer‑maintained spreadsheet.",
    href: INTRACHAPTERS_URL,
    external: true,
    ext: "Sheet"
  }]

},
{
  title: "States & Nationals",
  subtitle: "Once you advance",
  items: [
  {
    kind: "link",
    title: "States Event Teams",
    desc: "Confirmed rosters for the Washington State Conference.",
    href: STATES_URL,
    external: true,
    ext: "Sheet"
  },
  {
    kind: "link",
    title: "States Rubrics",
    desc: "Scoring rubrics used at the WA State Conference. Read your event's rubric before competing.",
    href: STATES_RUBRICS_URL,
    external: true,
    ext: "Folder"
  },
  {
    kind: "link",
    title: "WA State Conference page",
    desc: "Official Washington TSA page for the 2026 State Conference — schedule, venue, app download.",
    href: STATE_CONFERENCE_URL,
    external: true,
    ext: "Site"
  },
  {
    kind: "link",
    title: "TSA Nationals registration portal",
    desc: "Member portal for Nationals early entry and registration. ET deadlines — not PST.",
    href: NATIONALS_PORTAL,
    external: true,
    ext: "Portal"
  }]

},
{
  title: "Chapter admin",
  subtitle: "Roster, dues, and groupings",
  items: [
  {
    kind: "link",
    title: "TSA Registration 2026",
    desc: "Chapter‑wide registration spreadsheet for the 2026 season.",
    href: TSA_REGISTRATION_URL,
    external: true,
    ext: "Sheet"
  },
  {
    kind: "link",
    title: "TSA Canvas Student Roster",
    desc: "The active student roster maintained by the officer team.",
    href: CANVAS_ROSTER_URL,
    external: true,
    ext: "Sheet"
  },
  {
    kind: "link",
    title: "Officer Student Groupings 2025–26",
    desc: "Mentor pairings — which officer is your go‑to for what.",
    href: OFFICER_GROUPINGS_URL,
    external: true,
    ext: "Sheet"
  }]

},
{
  title: "External references",
  subtitle: "Official TSA materials",
  items: [
  {
    kind: "link",
    title: "Washington TSA",
    desc: "State association — calendar of competitions, results, scholarships.",
    href: "https://washingtontsa.org",
    external: true,
    ext: "Site"
  },
  {
    kind: "link",
    title: "National TSA",
    desc: "Programs, scholarships, and the national competitions schedule.",
    href: "https://tsaweb.org",
    external: true,
    ext: "Site"
  }]

}];


const FileCard = ({ item }) => {
  const viewer = useFileViewer();
  const iconClass =
  item.kind === "pdf" ? "site-file__icon--pdf" :
  item.kind === "xlsx" ? "site-file__icon--xlsx" :
  "site-file__icon--link";
  const isLocal = item.kind === "pdf" || item.kind === "xlsx";
  const onClick = isLocal ? (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    viewer.open(item.href, item.title, item.kind);
  } : undefined;
  return (
    <a className="site-file" href={item.href}
    target={item.external ? "_blank" : undefined}
    rel={item.external ? "noopener noreferrer" : undefined}
    onClick={onClick}>
      <div className={`site-file__icon ${iconClass}`}>{item.ext}</div>
      <div className="site-file__body">
        <div className="site-file__title">
          {item.title}
          {item.external && <Icon name="external-link" size={13} />}
        </div>
        <div className="site-file__desc">{item.desc}</div>
      </div>
      <div className="site-file__meta">{item.size || (item.external ? "External" : "")}</div>
    </a>);

};

const ResourcesPage = () => {
  const viewer = useFileViewer();
  return (
  <>
    <div className="es-pagehead">
      <div className="es-container">
        <Eyebrow>Resources</Eyebrow>
        <h1>Files, forms, and everything you'll need to compete</h1>
        <p>Competition guides, rubrics, schedules, and links to the spreadsheets we keep updated through the year. Click any item to open it in a new tab.</p>
        <div className="site-pagehead-meta">
          <span><Icon name="file-text" size={14} /> {RESOURCE_GROUPS.reduce((n, g) => n + g.items.length, 0)} items</span>
          <span><Icon name="calendar" size={14} /> Updated for the 2025–26 season</span>
        </div>
      </div>
    </div>
    <section className="es-section">
      <div className="es-container" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
        {/* Featured: the big Competitive Events Guide */}
        <a className="site-featured-resource" href="files/2025-2026-Competitive-Events-Guide.pdf"
          onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); viewer.open("files/2025-2026-Competitive-Events-Guide.pdf", "2025–26 Competitive Events Guide", "pdf"); }}>
          <div className="site-featured-resource__cover">
            <img src="assets/competitive-events-guide-cover.png" alt="TSA 2025–26 High School Competitive Events Guide cover"/>
          </div>
          <div className="site-featured-resource__body">
            <div className="site-featured-resource__eyebrow">Start here</div>
            <h2 className="site-featured-resource__title">2025–26 Competitive Events Guide</h2>
            <p className="site-featured-resource__desc">
              The official TSA Competitive Events Guide for the 2025–26 high school season. Every event,
              every rule, every rubric. If you're deciding what to enter — this is the document to read.
            </p>
            <div className="site-featured-resource__meta">
              <span><Icon name="file-text" size={13} /> PDF · 2.7 MB</span>
              <span><Icon name="sparkles" size={13} /> Required reading for competitors</span>
            </div>
          </div>
          <span className="site-featured-resource__cta">
            Open guide <Icon name="arrow-right" size={14} />
          </span>
        </a>

        {RESOURCE_GROUPS.map((g, gi) =>
      <div key={gi}>
            <div className="site-rgroup-head">
              <h2>{g.title}</h2>
              <span className="site-rgroup-head__count">{g.subtitle}</span>
            </div>
            <div className="site-files">
              {g.items.map((it, i) => <FileCard key={i} item={it} />)}
            </div>
          </div>
      )}

        {/* Help footer */}
        <div className="site-help">
          <div className="site-help__icon"><Icon name="lightbulb" size={24} /></div>
          <div>
            <h3 className="site-help__title">Don't see something you need?</h3>
            <p className="site-help__body">
              Email any officer or your advisor Ms. Pixley (C112). We'll get it added — that's the whole point of this site.
            </p>
          </div>
          <Button variant="primary" icon="mail" href="mailto:cpixley@lwsd.org">Email an officer</Button>
        </div>
      </div>
    </section>
  </>);
};


/* =========================================================================
   EVENTS
   ========================================================================= */

/* Populated by events.js, which loads before this file. */
const EVENTS = window.TSA_EVENTS || [];

const WA_TSA_EVENTS_URL = "https://www.washingtontsa.org/high-school-events";

/* Links inside event copy point at rubrics, upload portals, and coordinators.
   Mail links stay in the mail app; everything else opens in a new tab. */
const EventLink = ({ href, children }) => {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      className="site-event__link"
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}>
      {children}
      {!isMail && <Icon name="external-link" size={12} style={{ marginLeft: 4, verticalAlign: "-1px" }} />}
    </a>);

};

const EventText = ({ block }) =>
block.href ? <EventLink href={block.href}>{block.text}</EventLink> : <>{block.text}</>;

/* The source content is a flat run of headings, paragraphs, and list items;
   consecutive list items get collected back into a single list. */
const EventBlocks = ({ blocks }) => {
  const out = [];
  let list = [];

  const flush = (key) => {
    if (!list.length) return;
    out.push(
      <ul key={`ul-${key}`} className="site-event__list">
        {list.map((b, i) =>
        <li key={i} className={b.depth ? "is-nested" : ""}><EventText block={b} /></li>
        )}
      </ul>);

    list = [];
  };

  blocks.forEach((b, i) => {
    if (b.kind === "li") {list.push(b);return;}
    flush(i);
    if (b.kind === "h3") {
      out.push(<h3 key={i} className="site-event__subhead">{b.text}</h3>);
    } else {
      out.push(<p key={i} className="site-event__p"><EventText block={b} /></p>);
    }
  });
  flush("end");
  return <>{out}</>;
};

const EventCard = ({ event, onOpen }) =>
<article className="site-event-card">
    {event.thumb &&
    <a
      className="site-event-card__media"
      href="#"
      tabIndex={-1}
      aria-hidden="true"
      onClick={(e) => {e.preventDefault();onOpen(event.slug);}}>
        <img src={event.thumb} alt="" loading="lazy" />
      </a>
    }
    <div className="site-event-card__body">
      <div className="site-event-card__head">
        <h3 className="site-event-card__title">{event.title}</h3>
        {event.waOnly && <span className="site-event-card__wa">WA only</span>}
      </div>
      <p className="site-event-card__blurb">{event.blurb}</p>
      <a
      className="site-event-card__more"
      href="#"
      onClick={(e) => {e.preventDefault();onOpen(event.slug);}}>
        View event <Icon name="arrow-right" size={14} />
      </a>
    </div>
  </article>;


const EventsPage = ({ onOpen }) => {
  const [query, setQuery] = useState("");
  const [waOnly, setWaOnly] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = EVENTS.filter((e) =>
  (!waOnly || e.waOnly) && (
  !q || e.title.toLowerCase().includes(q) || (e.blurb || "").toLowerCase().includes(q)));

  const waCount = EVENTS.filter((e) => e.waOnly).length;

  return (
    <>
      <div className="es-pagehead">
        <div className="es-container">
          <Eyebrow>Competitive Events</Eyebrow>
          <h1>Every high school event, in one place</h1>
          <p>
            The full Washington TSA high school event list — what each event is, when its
            deadlines fall, and what you have to submit. Start here to pick what you want
            to compete in, then use the intra‑chapter sheet to find your team.
          </p>
          <div className="site-pagehead-meta">
            <span><Icon name="trophy" size={14} /> {EVENTS.length} events</span>
            <span><Icon name="map-pin" size={14} /> {waCount} Washington‑only</span>
          </div>
        </div>
      </div>

      <section className="es-section">
        <div className="es-container">
          <div className="site-ann-toolbar">
            <div className="site-ann-search">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Search events…"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />

            </div>
            <button
              type="button"
              className={`site-event-filter ${waOnly ? "is-active" : ""}`}
              aria-pressed={waOnly}
              onClick={() => setWaOnly((v) => !v)}>
              <Icon name="map-pin" size={14} /> Washington‑only
            </button>
          </div>

          {filtered.length === 0 ?
          <p className="site-event-empty">No events match “{query}”.</p> :

          <div className="site-event-grid">
              {filtered.map((e) =>
            <EventCard key={e.slug} event={e} onOpen={onOpen} />
            )}
            </div>
          }

          <p className="site-event-source">
            Mirrored from{" "}
            <a href={WA_TSA_EVENTS_URL} target="_blank" rel="noopener noreferrer">
              Washington TSA high school events <Icon name="external-link" size={12} style={{ verticalAlign: "-1px" }} />
            </a>
            {" "}so you can browse it here. If anything below disagrees with the official
            page, the official page wins.
          </p>
        </div>
      </section>
    </>);

};

const EventDetailPage = ({ slug, onBack }) => {
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="es-pagehead">
        <div className="es-container">
          <h1>Event not found</h1>
          <p>That event isn’t in the list.</p>
          <Button variant="secondary" onClick={onBack}>Back to all events</Button>
        </div>
      </div>);

  }

  return (
    <>
      <div className="es-pagehead">
        <div className="es-container">
          <a
            className="site-event__back"
            href="#"
            onClick={(e) => {e.preventDefault();onBack();}}>
            ← All events
          </a>
          <div className="site-event__titlerow">
            <h1>{event.title}</h1>
            {event.waOnly && <span className="site-event-card__wa">WA only</span>}
          </div>
        </div>
      </div>

      <section className="es-section">
        <div className="es-container site-event__body">
          {event.image &&
          <figure className="site-event__figure">
              <img src={event.image} alt={`${event.title} — winning entry`} />
              {event.featured &&
            <figcaption>
                  <Icon name="trophy" size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                  {event.featured}
                </figcaption>
            }
            </figure>
          }
          {event.sections.map((s, i) =>
          <div key={i} className="site-event__section">
              <h2 className="site-event__heading">{s.heading}</h2>
              <EventBlocks blocks={s.blocks} />
            </div>
          )}

          <div className="site-event__foot">
            <p>
              This page mirrors{" "}
              <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">
                the official Washington TSA page for {event.title}
                <Icon name="external-link" size={12} style={{ marginLeft: 4, verticalAlign: "-1px" }} />
              </a>
              , which is authoritative for rules and deadlines.
            </p>
            <Button variant="secondary" onClick={onBack}>← All events</Button>
          </div>
        </div>
      </section>
    </>);

};


/* =========================================================================
   App shell
   ========================================================================= */

const PAGE_LABELS = { home: "Home", events: "Events", announcements: "Announcements", resources: "Resources" };

const App = () => {
  const [page, setPage] = useState("home");
  const [eventSlug, setEventSlug] = useState(null);

  const navigate = (id) => {setEventSlug(null);setPage(id);};
  const openEvent = (slug) => {
    setEventSlug(slug);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const closeEvent = () => {
    setEventSlug(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const label = page === "events" && eventSlug ?
  (EVENTS.find((e) => e.slug === eventSlug) || {}).title || "Events" :
  PAGE_LABELS[page] || "Home";

  return (
    <FileViewerProvider>
      <div data-screen-label={`Eastlake TSA — ${label}`}>
        <Header active={page} onNavigate={navigate} />
        {page === "home" && <HomePage />}
        {page === "events" && (eventSlug ?
        <EventDetailPage slug={eventSlug} onBack={closeEvent} /> :
        <EventsPage onOpen={openEvent} />)}
        {page === "announcements" && <AnnouncementsPage />}
        {page === "resources" && <ResourcesPage />}
        <Footer onNavigate={navigate} />
      </div>
    </FileViewerProvider>);

};

Object.assign(window, { App });