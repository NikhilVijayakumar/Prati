import { describe, it, expect } from 'vitest';
import { createMockDataProvider } from './registry';

describe('MockDataProvider', () => {
  const config = {
    datasets: {
      users: [
        { id: '1', name: 'Alice', role: 'admin' },
        { id: '2', name: 'Bob', role: 'user' },
      ],
      projects: [
        { name: 'Project X', status: 'active' },
        { name: 'Project Y', status: 'completed' },
      ],
    },
  };

  it('returns datasets by name', () => {
    const provider = createMockDataProvider(config);
    const users = provider.getDataset('users');
    expect(users).toHaveLength(2);
    expect(users[0].name).toBe('Alice');
  });

  it('auto-assigns IDs to entries without them', () => {
    const provider = createMockDataProvider(config);
    const projects = provider.getDataset('projects');
    expect(projects[0].id).toBeDefined();
    expect(projects[1].id).toBeDefined();
  });

  it('returns empty array for missing datasets', () => {
    const provider = createMockDataProvider(config);
    expect(provider.getDataset('nonexistent')).toEqual([]);
  });

  it('gets a specific entry by ID', () => {
    const provider = createMockDataProvider(config);
    const alice = provider.getEntry('users', '1');
    expect(alice).toBeDefined();
    expect(alice?.name).toBe('Alice');
  });

  it('returns undefined for missing entry', () => {
    const provider = createMockDataProvider(config);
    expect(provider.getEntry('users', '999')).toBeUndefined();
  });

  it('adds a new entry', () => {
    const provider = createMockDataProvider(config);
    provider.addEntry('users', { id: '3', name: 'Charlie', role: 'user' });
    expect(provider.getDataset('users')).toHaveLength(3);
    expect(provider.getEntry('users', '3')?.name).toBe('Charlie');
  });

  it('auto-generates ID for entries without one', () => {
    const provider = createMockDataProvider(config);
    provider.addEntry('tasks', { title: 'New Task' });
    const tasks = provider.getDataset('tasks');
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBeDefined();
  });

  it('updates an existing entry', () => {
    const provider = createMockDataProvider(config);
    const updated = provider.updateEntry('users', '1', { role: 'superadmin' });
    expect(updated).toBe(true);
    expect(provider.getEntry('users', '1')?.role).toBe('superadmin');
  });

  it('returns false when updating non-existent entry', () => {
    const provider = createMockDataProvider(config);
    expect(provider.updateEntry('users', '999', { name: 'Ghost' })).toBe(false);
  });

  it('removes an entry', () => {
    const provider = createMockDataProvider(config);
    const removed = provider.removeEntry('users', '1');
    expect(removed).toBe(true);
    expect(provider.getDataset('users')).toHaveLength(1);
  });

  it('returns false when removing non-existent entry', () => {
    const provider = createMockDataProvider(config);
    expect(provider.removeEntry('users', '999')).toBe(false);
  });

  it('lists all dataset names', () => {
    const provider = createMockDataProvider(config);
    const names = provider.listDatasets();
    expect(names).toContain('users');
    expect(names).toContain('projects');
  });

  it('resets to initial state', () => {
    const provider = createMockDataProvider(config);
    provider.addEntry('users', { id: '99', name: 'Intruder', role: 'hacker' });
    provider.reset();
    expect(provider.getDataset('users')).toHaveLength(2);
    expect(provider.getEntry('users', '99')).toBeUndefined();
  });
});
