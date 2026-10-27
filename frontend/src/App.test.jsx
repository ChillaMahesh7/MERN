import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App.jsx';

const demoProjects = [
  { title: 'CI/CD Pipeline', category: 'Automation', description: 'Run checks automatically.', status: 'Start here', icon: '🔁' },
  { title: 'Container Lab', category: 'Docker', description: 'Build containers.', status: 'Ready', icon: '📦' }
];

describe('LaunchPad app', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((url) => {
      if (url === '/api/health') return Promise.resolve({ ok: true, json: () => Promise.resolve({ database: 'connected' }) });
      if (url === '/api/projects') return Promise.resolve({ ok: true, json: () => Promise.resolve(demoProjects) });
      return Promise.reject(new Error('Unexpected URL'));
    }));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('renders the main heading and labs section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /build it/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /choose your next challenge/i })).toBeInTheDocument();
  });

  it('loads projects from the API', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Container Lab')).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith('/api/projects');
  });

  it('filters projects by category', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Container Lab')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Docker' }));
    expect(screen.getByText('Container Lab')).toBeInTheDocument();
    expect(screen.queryByText('CI/CD Pipeline')).not.toBeInTheDocument();
  });

  it('shows demo mode if the API is unavailable', async () => {
    fetch.mockRejectedValue(new Error('Network error'));
    render(<App />);
    await waitFor(() => expect(screen.getByText('Demo mode · API unavailable')).toBeInTheDocument());
    expect(screen.getByText('CI/CD Pipeline')).toBeInTheDocument();
  });
});
