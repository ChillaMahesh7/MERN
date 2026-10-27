import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Ready to explore' },
  icon: { type: String, default: '🚀' }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

const sampleProjects = [
  { title: 'CI/CD Pipeline', category: 'Automation', description: 'Run checks automatically on every push and pull request.', status: 'Start here', icon: '🔁' },
  { title: 'Container Lab', category: 'Docker', description: 'Package an application into repeatable container images.', status: 'Ready to explore', icon: '📦' },
  { title: 'Cloud Deployment', category: 'Cloud', description: 'Deploy a versioned build and practise safe rollbacks.', status: 'Next challenge', icon: '☁️' },
  { title: 'Observability', category: 'Monitoring', description: 'Inspect health endpoints, application logs, and failure cases.', status: 'Next challenge', icon: '📈' },
  { title: 'Infrastructure as Code', category: 'IaC', description: 'Describe repeatable infrastructure and review changes before applying.', status: 'Advanced', icon: '🧱' },
  { title: 'Security Checks', category: 'DevSecOps', description: 'Scan dependencies and keep credentials out of source control.', status: 'Advanced', icon: '🛡️' }
];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'launchpad-backend',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/projects', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(sampleProjects);
    }
    const projects = await Project.find().sort({ createdAt: 1 }).lean();
    return res.json(projects.length ? projects : sampleProjects);
  } catch {
    return res.status(500).json({ message: 'Could not load projects' });
  }
});

app.get('/', (_req, res) => res.send('LaunchPad API is running. Visit /api/health'));

export { app, Project, sampleProjects };
