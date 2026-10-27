import { useEffect, useState } from 'react';

const fallbackProjects = [
  { title: 'CI/CD Pipeline', category: 'Automation', description: 'Run checks automatically on every push and pull request.', status: 'Start here', icon: '🔁' },
  { title: 'Container Lab', category: 'Docker', description: 'Package an application into repeatable container images.', status: 'Ready to explore', icon: '📦' },
  { title: 'Cloud Deployment', category: 'Cloud', description: 'Deploy a versioned build and practise safe rollbacks.', status: 'Next challenge', icon: '☁️' },
  { title: 'Observability', category: 'Monitoring', description: 'Inspect health endpoints, application logs, and failure cases.', status: 'Next challenge', icon: '📈' },
  { title: 'Infrastructure as Code', category: 'IaC', description: 'Describe repeatable infrastructure and review changes before applying.', status: 'Advanced', icon: '🧱' },
  { title: 'Security Checks', category: 'DevSecOps', description: 'Scan dependencies and keep credentials out of source control.', status: 'Advanced', icon: '🛡️' }
];

export default function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [apiStatus, setApiStatus] = useState('Demo mode');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => { if (!r.ok) throw new Error('API unavailable'); return r.json(); })
      .then((data) => setApiStatus(data.database === 'connected' ? 'API + database online' : 'API online · database offline'))
      .catch(() => setApiStatus('Demo mode · API unavailable'));

    fetch('/api/projects')
      .then((r) => { if (!r.ok) throw new Error('Could not fetch projects'); return r.json(); })
      .then((data) => { if (Array.isArray(data) && data.length) setProjects(data); })
      .catch(() => {});
  }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const visibleProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="app-shell">
      <nav className="nav wrap">
        <a className="brand" href="#"><span className="brand-mark">L</span> LaunchPad<span className="brand-dot">.</span></a>
        <div className="nav-links"><a href="#labs">Labs</a><a href="#workflow">Workflow</a><a href="#about">About</a></div>
        <a className="nav-cta" href="#labs">Explore labs <span>↗</span></a>
      </nav>
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse"></span> YOUR PERSONAL DEVOPS PLAYGROUND</div>
            <h1>Build it.<br /><span>Ship it.</span><br />Understand it.</h1>
            <p className="hero-text">A hands-on launchpad for learning the tools and workflows behind reliable software delivery. One small lab at a time.</p>
            <div className="hero-actions"><a className="button button-primary" href="#labs">Explore the labs <span>→</span></a><a className="button button-ghost" href="#workflow">How it works</a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>G</span><span>D</span><span>C</span></div><span>Learn by doing, not just watching.</span></div>
          </div>
          <div className="terminal-card">
            <div className="terminal-top"><div className="window-dots"><i></i><i></i><i></i></div><span>deployment.sh</span><span className="terminal-lock">⌘</span></div>
            <div className="terminal-body">
              <div className="terminal-line"><span className="line-no">01</span><span className="muted">$</span> git push origin main</div>
              <div className="terminal-line"><span className="line-no">02</span><span className="green">✓</span> Code pushed successfully</div>
              <div className="terminal-line"><span className="line-no">03</span><span className="muted">→</span> Running CI pipeline...</div>
              <div className="terminal-line indent"><span className="green">✓</span> Tests passed <span className="duration">12s</span></div>
              <div className="terminal-line indent"><span className="green">✓</span> Docker image built <span className="duration">28s</span></div>
              <div className="terminal-line indent"><span className="green">✓</span> Security scan passed <span className="duration">8s</span></div>
              <div className="terminal-line"><span className="muted">→</span> Deploying to production...</div>
              <div className="terminal-success"><span className="green">●</span> DEPLOYMENT SUCCESSFUL <span className="blinking">_</span></div>
            </div>
            <div className="terminal-footer"><span><i className="tiny-green"></i> main</span><span>build #024 <b>·</b> 48s</span></div>
            <div className="float-chip chip-top"><span>↗</span><div><b>CI/CD</b><small>Automated delivery</small></div></div>
            <div className="float-chip chip-bottom"><span>◈</span><div><b>99.9%</b><small>Dream big. Monitor well.</small></div></div>
          </div>
          <div className="hero-glow"></div>
        </section>
        <section className="stats wrap">
          <div><strong>06</strong><span>Practice labs</span></div><div><strong>03</strong><span>Core services</span></div><div><strong>∞</strong><span>Ways to experiment</span></div><div className="status-stat"><span className="status-dot"></span><span aria-live="polite">{apiStatus}</span></div>
        </section>
        <section className="labs-section wrap" id="labs">
          <div className="section-heading"><div><div className="eyebrow">THE PRACTICE ZONE</div><h2>Choose your next <span>challenge.</span></h2></div><p>Small, focused projects that help turn DevOps concepts into practical skills.</p></div>
          <div className="filter-row" aria-label="Filter labs">{categories.map((category) => <button type="button" key={category} className={filter === category ? 'filter active' : 'filter'} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => <article className="project-card" key={project._id || project.title}>
              <div className="card-top"><span className="project-icon" aria-hidden="true">{project.icon}</span><span className="card-number">0{index + 1}</span></div>
              <div className="category-label">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p>
              <div className="card-bottom"><span className="project-status"><i></i>{project.status}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
            </article>)}
          </div>
        </section>
        <section className="workflow-section" id="workflow"><div className="wrap workflow-inner">
          <div className="eyebrow">A SIMPLE LOOP. REAL SKILLS.</div><h2>From commit to <span>confidence.</span></h2>
          <div className="workflow-steps"><div><span className="step-num">01</span><span className="step-icon">⌘</span><h3>Commit</h3><p>Track your changes with Git and collaborate through pull requests.</p></div><div><span className="step-num">02</span><span className="step-icon">⚙</span><h3>Automate</h3><p>Run tests and build artifacts with a repeatable CI pipeline.</p></div><div><span className="step-num">03</span><span className="step-icon">▣</span><h3>Ship</h3><p>Build containers, deploy safely, and learn how to roll back.</p></div><div><span className="step-num">04</span><span className="step-icon">⌁</span><h3>Observe</h3><p>Read logs, check health, and troubleshoot what goes wrong.</p></div></div>
        </div></section>
        <section className="cta-section wrap" id="about"><div><div className="eyebrow">YOUR NEXT STEP STARTS HERE</div><h2>Make your next commit<br />a <span>learning moment.</span></h2></div><a className="button button-primary" href="#labs">Pick a lab <span>→</span></a></section>
      </main>
      <footer className="footer wrap"><a className="brand" href="#"><span className="brand-mark">L</span> LaunchPad<span className="brand-dot">.</span></a><span>Built for practice. Ready for your pipeline.</span><span>© 2026 LaunchPad Lab</span></footer>
    </div>
  );
}
