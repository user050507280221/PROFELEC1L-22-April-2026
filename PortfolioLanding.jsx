import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0f;
    --bg2: #141416;
    --bg3: #1a1a1e;
    --red: #e8182c;
    --red2: #ff2d42;
    --white: #f5f5f5;
    --gray: #888;
    --muted: #444;
    --border: rgba(255,255,255,0.07);
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  .portfolio-root {
    min-height: 100vh;
    background: var(--bg);
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 60px;
    background: rgba(13,13,15,0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-head);
    font-weight: 800; font-size: 22px;
    color: var(--white);
    letter-spacing: -0.5px;
  }
  .nav-logo span { color: var(--red); }
  .nav-links { display: flex; gap: 32px; }
  .nav-links a {
    font-size: 13px; font-weight: 500;
    color: var(--gray);
    text-decoration: none;
    letter-spacing: 0.3px;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--white); }
  .nav-btn {
    background: var(--red);
    color: #fff;
    border: none; border-radius: 6px;
    padding: 9px 22px;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    font-family: var(--font-body);
    transition: background 0.2s, transform 0.15s;
  }
  .nav-btn:hover { background: var(--red2); transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 120px 60px 80px;
    gap: 60px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; bottom: -120px; right: -80px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(232,24,44,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(232,24,44,0.12);
    border: 1px solid rgba(232,24,44,0.3);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 11px; font-weight: 600;
    color: var(--red2);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .hero-badge::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--red2);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }
  .hero-title {
    font-family: var(--font-head);
    font-size: clamp(38px, 4.5vw, 62px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }
  .hero-title .name { color: var(--red2); }
  .hero-sub {
    font-size: 15px; color: var(--gray);
    line-height: 1.7; max-width: 420px;
    margin-bottom: 36px;
  }
  .hero-ctas { display: flex; gap: 14px; margin-bottom: 56px; }
  .btn-primary {
    background: var(--red);
    color: #fff; border: none; border-radius: 8px;
    padding: 13px 28px;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    font-family: var(--font-body);
    transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { background: var(--red2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,24,44,0.35); }
  .btn-outline {
    background: transparent;
    color: var(--white); border: 1px solid var(--muted); border-radius: 8px;
    padding: 13px 28px;
    font-size: 14px; font-weight: 500;
    cursor: pointer;
    font-family: var(--font-body);
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--white); }
  .hero-stats { display: flex; gap: 40px; }
  .stat-item { text-align: left; }
  .stat-num {
    font-family: var(--font-head);
    font-size: 32px; font-weight: 800;
    color: var(--white);
    line-height: 1;
  }
  .stat-num span { color: var(--red2); }
  .stat-label { font-size: 11px; color: var(--gray); margin-top: 4px; letter-spacing: 0.5px; }
  .stat-divider { width: 1px; background: var(--border); }

  /* HERO IMAGE SIDE */
  .hero-visual {
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .hero-avatar-wrap {
    position: relative;
    width: 340px; height: 420px;
  }
  .hero-avatar-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--bg3) 0%, #1f1f24 100%);
    border-radius: 24px;
    border: 1px solid var(--border);
    overflow: hidden;
  }
  .hero-avatar-bg::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 40%;
    background: linear-gradient(to top, rgba(232,24,44,0.15), transparent);
  }
  .avatar-placeholder {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 14px;
  }
  .avatar-circle {
    width: 110px; height: 110px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2a2a2e, #3a1a1e);
    border: 3px solid rgba(232,24,44,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 42px;
  }
  .avatar-name-tag {
    font-family: var(--font-head);
    font-size: 18px; font-weight: 700;
    color: var(--white);
  }
  .avatar-role-tag {
    font-size: 12px; color: var(--gray);
    background: rgba(255,255,255,0.05);
    padding: 4px 12px; border-radius: 20px;
  }
  .hero-card-float {
    position: absolute;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px;
    backdrop-filter: blur(10px);
  }
  .hero-card-float.tl { top: -20px; left: -40px; }
  .hero-card-float.br { bottom: 20px; right: -50px; }
  .float-label { font-size: 10px; color: var(--gray); letter-spacing: 0.5px; margin-bottom: 2px; }
  .float-val { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--red2); }
  .float-sub { font-size: 10px; color: var(--gray); }

  /* ABOUT */
  .about {
    padding: 100px 60px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
    border-top: 1px solid var(--border);
  }
  .section-eyebrow {
    font-size: 11px; font-weight: 600;
    color: var(--red2);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .section-title {
    font-family: var(--font-head);
    font-size: clamp(28px, 3vw, 44px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 20px;
  }
  .section-title .accent { color: var(--red2); }
  .section-body {
    font-size: 14px; color: var(--gray);
    line-height: 1.8; margin-bottom: 28px;
  }
  .about-skills { display: flex; flex-wrap: wrap; gap: 10px; }
  .skill-pill {
    font-size: 12px; font-weight: 500;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    color: var(--white);
    border-radius: 6px;
    padding: 6px 14px;
    transition: all 0.2s;
  }
  .skill-pill:hover { background: rgba(232,24,44,0.12); border-color: rgba(232,24,44,0.4); color: var(--red2); }
  .about-visual {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .about-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    transition: border-color 0.2s;
  }
  .about-card:hover { border-color: rgba(232,24,44,0.3); }
  .about-card.span2 { grid-column: span 2; }
  .about-card-icon { font-size: 24px; margin-bottom: 12px; }
  .about-card-title {
    font-family: var(--font-head);
    font-size: 15px; font-weight: 700;
    margin-bottom: 6px;
  }
  .about-card-desc { font-size: 12px; color: var(--gray); line-height: 1.6; }

  /* SERVICES */
  .services {
    padding: 100px 60px;
    background: var(--bg2);
    border-top: 1px solid var(--border);
  }
  .services-header {
    display: flex; justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 56px;
  }
  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .service-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px;
    position: relative; overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
  }
  .service-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(232,24,44,0.06), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .service-card:hover { border-color: rgba(232,24,44,0.35); transform: translateY(-4px); }
  .service-card:hover::before { opacity: 1; }
  .service-num {
    font-family: var(--font-head);
    font-size: 48px; font-weight: 800;
    color: rgba(232,24,44,0.12);
    line-height: 1;
    margin-bottom: 16px;
    letter-spacing: -2px;
  }
  .service-icon { font-size: 28px; margin-bottom: 16px; }
  .service-title {
    font-family: var(--font-head);
    font-size: 18px; font-weight: 700;
    margin-bottom: 10px;
  }
  .service-desc { font-size: 13px; color: var(--gray); line-height: 1.7; }
  .service-tag {
    display: inline-block;
    margin-top: 20px;
    font-size: 11px; font-weight: 600;
    color: var(--red2);
    letter-spacing: 0.5px;
  }

  /* EXPERIENCE */
  .experience {
    padding: 100px 60px;
    border-top: 1px solid var(--border);
    display: grid; grid-template-columns: 360px 1fr;
    gap: 80px; align-items: start;
  }
  .exp-sticky { position: sticky; top: 120px; }
  .exp-years {
    font-family: var(--font-head);
    font-size: 100px; font-weight: 800;
    line-height: 1;
    color: var(--red2);
    letter-spacing: -5px;
    margin-bottom: 8px;
  }
  .exp-label {
    font-size: 14px; color: var(--gray);
    line-height: 1.5;
  }
  .exp-list { display: flex; flex-direction: column; gap: 2px; }
  .exp-item {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 32px;
    display: grid; grid-template-columns: 1fr auto;
    gap: 12px; align-items: start;
    transition: border-color 0.2s;
  }
  .exp-item:hover { border-color: rgba(232,24,44,0.3); }
  .exp-role {
    font-family: var(--font-head);
    font-size: 17px; font-weight: 700;
    margin-bottom: 4px;
  }
  .exp-company { font-size: 13px; color: var(--red2); margin-bottom: 8px; }
  .exp-desc { font-size: 13px; color: var(--gray); line-height: 1.6; }
  .exp-period {
    font-size: 11px; color: var(--gray);
    background: rgba(255,255,255,0.05);
    padding: 4px 10px; border-radius: 20px;
    white-space: nowrap;
    height: fit-content;
  }

  /* SOCIAL / CTA */
  .cta-section {
    padding: 100px 60px;
    background: var(--bg2);
    border-top: 1px solid var(--border);
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center;
  }
  .cta-title {
    font-family: var(--font-head);
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }
  .cta-title .highlight { color: var(--red2); }
  .cta-sub { font-size: 14px; color: var(--gray); line-height: 1.7; margin-bottom: 36px; }
  .social-links { display: flex; flex-direction: column; gap: 12px; }
  .social-item {
    display: flex; align-items: center; gap: 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 20px;
    text-decoration: none;
    color: var(--white);
    transition: all 0.2s;
  }
  .social-item:hover { border-color: rgba(232,24,44,0.4); transform: translateX(4px); }
  .social-icon {
    width: 36px; height: 36px;
    background: rgba(232,24,44,0.12);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .social-info { flex: 1; }
  .social-name { font-size: 14px; font-weight: 600; }
  .social-handle { font-size: 11px; color: var(--gray); }
  .social-arrow { color: var(--gray); font-size: 16px; }

  /* FOOTER */
  .footer {
    padding: 32px 60px;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-size: 12px; color: var(--gray); }
  .footer-copy span { color: var(--red2); }
  .footer-links { display: flex; gap: 24px; }
  .footer-links a { font-size: 12px; color: var(--gray); text-decoration: none; }
  .footer-links a:hover { color: var(--white); }

  /* ANIMATIONS */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 900px) {
    .nav { padding: 16px 24px; }
    .nav-links { display: none; }
    .hero, .about, .cta-section { grid-template-columns: 1fr; padding: 100px 24px 60px; }
    .hero-visual { display: none; }
    .services { padding: 60px 24px; }
    .services-grid { grid-template-columns: 1fr; }
    .services-header { flex-direction: column; gap: 16px; }
    .experience { grid-template-columns: 1fr; padding: 60px 24px; gap: 40px; }
    .exp-sticky { position: static; }
    .exp-years { font-size: 60px; }
    .footer { padding: 24px; flex-direction: column; gap: 12px; text-align: center; }
  }
`;

const stats = [
  { num: "320", suffix: "+", label: "Happy Clients" },
  { num: "299", suffix: "", label: "Projects Done" },
  { num: "199", suffix: "+", label: "Awards Won" },
];

const services = [
  { num: "01", icon: "🎨", title: "UI/UX Design", desc: "Crafting pixel-perfect interfaces and seamless user experiences that convert visitors into loyal customers.", tag: "Design Systems · Figma · Prototyping" },
  { num: "02", icon: "⚡", title: "Frontend Dev", desc: "Building fast, accessible, and maintainable web applications using modern React and performance-first architecture.", tag: "React · Next.js · TypeScript" },
  { num: "03", icon: "🌐", title: "Full-Stack", desc: "End-to-end product development from database design to deployed production apps, handling everything in between.", tag: "Node.js · Postgres · AWS" },
];

const experience = [
  { role: "Senior UI/UX Designer", company: "Framer Inc.", period: "2022–Now", desc: "Led design system overhaul for enterprise clients, improving team velocity by 40% and reducing design debt significantly." },
  { role: "Frontend Engineer", company: "Creative Agency Co.", period: "2020–2022", desc: "Developed 20+ high-performance landing pages and interactive marketing sites with advanced animations." },
  { role: "Product Designer", company: "Startup Labs", period: "2018–2020", desc: "Owned the product design lifecycle from discovery to delivery for a B2B SaaS platform serving 10k+ users." },
];

const socials = [
  { icon: "𝕏", name: "Twitter / X", handle: "@johndixon_dev" },
  { icon: "in", name: "LinkedIn", handle: "linkedin.com/in/johndixon" },
  { icon: "⬡", name: "Dribbble", handle: "dribbble.com/johndixon" },
  { icon: "◈", name: "GitHub", handle: "github.com/johndixon" },
];

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>;
}

export default function PortfolioLanding() {
  const [count, setCount] = useState({ a: 0, b: 0, c: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const targets = [320, 299, 199];
    const keys = ["a", "b", "c"];
    targets.forEach((target, i) => {
      let start = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(prev => ({ ...prev, [keys[i]]: start }));
        if (start >= target) clearInterval(interval);
      }, 25);
    });
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="portfolio-root">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Fra<span>me</span></div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="nav-btn">Hire Me →</button>
        </nav>

        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <div>
            <FadeSection>
              <div className="hero-badge">Available for work</div>
            </FadeSection>
            <FadeSection delay={80}>
              <h1 className="hero-title">
                Say Hi from<br />
                <span className="name">John Dixon,</span><br />
                Framer Designer<br />& Developer
              </h1>
            </FadeSection>
            <FadeSection delay={160}>
              <p className="hero-sub">
                I craft bold digital experiences that blend sharp design with clean, performant code. Based in New York, working worldwide.
              </p>
            </FadeSection>
            <FadeSection delay={220}>
              <div className="hero-ctas">
                <button className="btn-primary">View My Work →</button>
                <button className="btn-outline">Download CV</button>
              </div>
            </FadeSection>
            <FadeSection delay={300}>
              <div className="hero-stats">
                {[["a", "Happy Clients"], ["b", "Projects Done"], ["c", "Awards Won"]].map(([key, label], i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-num">{count[key]}<span>+</span></div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>

          <div className="hero-visual">
            <div className="hero-avatar-wrap">
              <div className="hero-avatar-bg">
                <div className="avatar-placeholder">
                  <div className="avatar-circle">👨‍💻</div>
                  <div className="avatar-name-tag">John Dixon</div>
                  <div className="avatar-role-tag">Framer Designer & Dev</div>
                </div>
              </div>
              <div className="hero-card-float tl">
                <div className="float-label">EXPERIENCE</div>
                <div className="float-val">10+</div>
                <div className="float-sub">Years in Industry</div>
              </div>
              <div className="hero-card-float br">
                <div className="float-label">RATING</div>
                <div className="float-val">5.0 ★</div>
                <div className="float-sub">On All Platforms</div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div>
            <FadeSection>
              <div className="section-eyebrow">About Me</div>
              <h2 className="section-title">Every great design<br />begins with a <span className="accent">story</span></h2>
              <p className="section-body">
                I'm a Full Stack Designer and Developer with over a decade of experience turning complex problems into elegant, user-centered solutions. I believe that design and code are two sides of the same coin.
              </p>
            </FadeSection>
            <FadeSection delay={100}>
              <div className="about-skills">
                {["Framer", "Figma", "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Motion", "Postgres", "AWS"].map(s => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </FadeSection>
          </div>
          <FadeSection delay={200}>
            <div className="about-visual">
              {[
                { icon: "🎯", title: "User-Centered", desc: "Design decisions backed by real user research and behavior data." },
                { icon: "⚡", title: "Performance First", desc: "Code that ships fast and stays fast under real-world load." },
                { icon: "🌍", title: "100+ Clients Worldwide", desc: "Worked with startups, agencies, and Fortune 500 companies across 20+ countries.", span: true },
              ].map((c, i) => (
                <div key={i} className={`about-card${c.span ? " span2" : ""}`}>
                  <div className="about-card-icon">{c.icon}</div>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </FadeSection>
        </section>

        {/* SERVICES */}
        <section className="services" id="services">
          <div className="services-header">
            <div>
              <FadeSection>
                <div className="section-eyebrow">What I Do</div>
                <h2 className="section-title">Boost Business<br /><span className="accent">Strategic Solutions</span><br />With Us</h2>
              </FadeSection>
            </div>
            <FadeSection delay={100}>
              <button className="btn-primary">All Services →</button>
            </FadeSection>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <FadeSection key={i} delay={i * 100}>
                <div className="service-card">
                  <div className="service-num">{s.num}</div>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-title">{s.title}</div>
                  <div className="service-desc">{s.desc}</div>
                  <div className="service-tag">{s.tag}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="experience" id="experience">
          <div className="exp-sticky">
            <FadeSection>
              <div className="section-eyebrow">Career Path</div>
              <div className="exp-years">10+</div>
              <div className="exp-label">Years of Experience<br />in UI/UX Design &<br />Development</div>
            </FadeSection>
          </div>
          <div className="exp-list">
            {experience.map((e, i) => (
              <FadeSection key={i} delay={i * 120}>
                <div className="exp-item">
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-company">{e.company}</div>
                    <div className="exp-desc">{e.desc}</div>
                  </div>
                  <div className="exp-period">{e.period}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* CTA / SOCIAL */}
        <section className="cta-section" id="contact">
          <div>
            <FadeSection>
              <div className="section-eyebrow">Get In Touch</div>
              <h2 className="cta-title">You Can<br />Find Me <span className="highlight">On</span></h2>
              <p className="cta-sub">
                Whether you have a project in mind, want to collaborate, or just want to say hello — I'm always open to connecting with new people.
              </p>
              <button className="btn-primary">Send Me a Message →</button>
            </FadeSection>
          </div>
          <FadeSection delay={150}>
            <div className="social-links">
              {socials.map((s, i) => (
                <a key={i} href="#" className="social-item">
                  <div className="social-icon">{s.icon}</div>
                  <div className="social-info">
                    <div className="social-name">{s.name}</div>
                    <div className="social-handle">{s.handle}</div>
                  </div>
                  <span className="social-arrow">→</span>
                </a>
              ))}
            </div>
          </FadeSection>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-copy">© 2026 <span>John Dixon</span>. All rights reserved.</div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </footer>
      </div>
    </>
  );
}
