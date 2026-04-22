import { useState, useEffect, useRef } from "react";




const stats = [
  { num: "10", suffix: "+", label: "Projects Completed" },
  { num: "5", suffix: "+", label: "Tech Stack Mastered" },
  { num: "1.2", suffix: "k", label: "Github Commits" },
];

const services = [
  { num: "01", icon: "🎨", title: "Graphic Design", desc: "Creating visual identities and promotional materials for campus events and organizations.", tag: "Posters · Branding · UI" },
  { num: "02", icon: "💻", title: "Web Development", desc: "Building responsive web applications using modern frameworks like Laravel and React.", tag: "PHP · Laravel · SQL" },
  { num: "03", icon: "⚙️", title: "Systems Analysis", desc: "Designing database structures and documenting system workflows for management platforms.", tag: "MySQL · DFD · Documentation" },
];
const experience = [
  { 
    role: "Student Assistant", 
    company: "IT Department - GRC", 
    period: "2024–Present", 
    desc: "Assisting in technical laboratory maintenance and supporting departmental IT administrative tasks." 
  },
  { 
    role: "College President", 
    company: "College of Computer Studies", 
    period: "2025–Present", 
    desc: "Leading the student body, organizing tech events, and representing the department in campus-wide initiatives." 
  },
  { 
    role: "Lead Developer", 
    company: "Dorm Tenant Management System", 
    period: "2026", 
    desc: "Developing a full-stack web platform for property owners to manage payments, contracts, and occupancy." 
  },
];
const socials = [
  { icon: "◈", name: "GitHub", handle: "github.com/user050507280221" },
  { icon: "✉", name: "Gmail", handle: "angelbenitezayado477@gmail.com" },
  { icon: "📸", name: "Instagram", handle: "@vn5e1.hygge" },
  { icon: "fb", name: "Facebook", handle: "facebook.com/angelbenitezayado" },
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
      
      <div className="portfolio-root">
        {/* NAV */}
        <nav className="nav">
        <div className="nav-logo">Angel<span>.dev</span></div>          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="nav-btn">Let's Connect →</button>
        </nav>

{/* HERO */}
<section className="hero" ref={heroRef}>
  <div>
    <FadeSection>
      {/* Updated badge to be more specific to your student status */}
      <div className="hero-badge">Open for Internships & Collaborations</div>
    </FadeSection>
    <FadeSection delay={80}>
      <h1 className="hero-title">
        Creative Tech by<br />
        <span className="name">Angel Benitez</span><br />
        IT Student &<br />Graphic Designer
      </h1>
    </FadeSection>
    <FadeSection delay={160}>
      <p className="hero-sub">
        Building the future of digital management and design. Currently a BSIT student and Student Assistant at GRC, focusing on full-stack development and pixel-perfect UI.
      </p>
    </FadeSection>
    <FadeSection delay={220}>
      <div className="hero-ctas">
        <button className="btn-primary">View My Projects →</button>
        <button className="btn-outline">Download Resume</button>
      </div>
    </FadeSection>
    <FadeSection delay={300}>
      <div className="hero-stats">
        {[["a", "Active Projects"], ["b", "Certifications"], ["c", "Code Repos"]].map(([key, label], i) => (
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
        {/* We use your URL directly here */}
        <img 
          src="https://lh3.googleusercontent.com/a/ACg8ocJWRFo9rigs8rfVMJcJ873JcDZ7Nq6tqf1bGTcwsTS3yh4uXHs=s288-c-no" 
          alt="Angel Benitez" 
          className="hero-avatar-image" 
        />
        <div className="avatar-name-tag">Angel Benitez</div>
        <div className="avatar-role-tag">IT Student & Designer</div>
      </div>

      {/* Floating Info Cards */}
      <div className="hero-card-float tl">
        <div className="float-label">STATUS</div>
        <div className="float-val">BSIT</div>
        <div className="float-sub">Active Student</div>
      </div>
      <div className="hero-card-float br">
        <div className="float-label">TECH STACK</div>
        <div className="float-val">CCS</div>
        <div className="float-sub">Graphic Designer</div>
      </div>
    </div>
  </div>
</section>
{/* ABOUT */}
<section className="about" id="about">
  <div>
    <FadeSection>
      <div className="section-eyebrow">About Me</div>
      <h2 className="section-title">Bridging the gap between<br />pixels and <span className="accent">possibility</span></h2>
      <p className="section-body">
        I'm an aspiring Designer and Developer currently honing my craft in the classroom and through hands-on projects. I’m passionate about the intersection of aesthetics and logic—constantly exploring how code can bring static designs to life.
      </p>
    </FadeSection>
    <FadeSection delay={100}>
      <div className="about-skills">
        {["Figma", "React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "Git", "Postgres"].map(s => (
          <span key={s} className="skill-pill">{s}</span>
        ))}
      </div>
    </FadeSection>
  </div>
  <FadeSection delay={200}>
    <div className="about-visual">
      {[
        { icon: "🎓", title: "Continuous Learning", desc: "Currently pursuing my degree while keeping up with the latest industry frameworks." },
        { icon: "🚀", title: "Project Driven", desc: "Building real-world applications to solve everyday problems and sharpen my logic." },
        { icon: "🤝", title: "Open to Collaborate", desc: "Eager to contribute to team projects, learn from mentors, and grow within the tech community.", span: true },
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
        <div className="section-eyebrow">Expertise</div>
        <h2 className="section-title">
          Turning Ideas Into<br />
          <span className="accent">Digital Reality</span><br />
          Through Code & Design
        </h2>
      </FadeSection>
    </div>
    <FadeSection delay={100}>
      {/* Changed "All Services" to "My Stack" or "Tech Stack" */}
      <button className="btn-primary">View Tech Stack →</button>
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
      <div className="section-eyebrow">Academic Journey</div>
      {/* Changed from 3rd to 2nd */}
      <div className="exp-years">2nd</div>
      <div className="exp-label">
        Year BSIT Student<br /> 
        Specializing in Web Tech &<br /> 
        Graphic Design
      </div>
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
      <div className="section-eyebrow">Connect with Me</div>
      <h2 className="cta-title">Let’s Build Something<br /><span className="highlight">Together</span></h2>
      <p className="cta-sub">
        I am currently looking for internship opportunities and collaborative tech projects. Whether you have a question or just want to network, my inbox is always open!
      </p>
      {/* Updated button text for a student profile */}
      <button className="btn-primary" onClick={() => window.location.href = 'mailto:your-email@gmail.com'}>
        Reach Out via Email →
      </button>
    </FadeSection>
  </div>
  <FadeSection delay={150}>
    <div className="social-links">
      {socials.map((s, i) => (
        <a 
          key={i} 
          href={s.handle.includes('@') ? `mailto:${s.handle}` : `https://${s.handle}`} 
          className="social-item"
          target="_blank" 
          rel="noopener noreferrer"
        >
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
  <div className="footer-copy">
    © 2026 <span>Angel Benitez</span> • Updated 22 April
  </div>
  <div className="footer-links">
    {/* These are often unnecessary for student portfolios; 
        you could replace them with your school or degree */}
    <a href="#">BSIT Student</a>
    <a href="#">Global Reciprocal Colleges</a>
  </div>
</footer>
      </div>
    </>
  );
}
