import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { app, sampleProjects } from './app.js';

test('GET /api/health returns service status', async () => {
  const response = await request(app).get('/api/health').expect(200);
  assert.equal(response.body.status, 'ok');
  assert.equal(response.body.service, 'launchpad-backend');
  assert.ok(['connected', 'disconnected'].includes(response.body.database));
});

test('GET /api/projects returns a list of projects without requiring MongoDB', async () => {
  const response = await request(app).get('/api/projects').expect(200);
  assert.ok(Array.isArray(response.body));
  assert.equal(response.body.length, sampleProjects.length);
  assert.equal(response.body[0].title, 'CI/CD Pipeline');
});

test('each sample project has the fields needed by the frontend', () => {
  for (const project of sampleProjects) {
    assert.equal(typeof project.title, 'string');
    assert.equal(typeof project.category, 'string');
    assert.equal(typeof project.description, 'string');
    assert.equal(typeof project.icon, 'string');
  }
});
