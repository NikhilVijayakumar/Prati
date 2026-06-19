import { describe, it, expect } from 'vitest';
import { Persistence, createPersistence } from './index';

describe('Persistence', () => {
  it('creates a persistence instance with memory storage', () => {
    const p = new Persistence({ namespace: 'test', storage: 'memory' });
    expect(p.isAvailable()).toBe(true);
    expect(p.getConfig()).toEqual({ namespace: 'test', storage: 'memory' });
  });

  it('stores and retrieves values', () => {
    const p = new Persistence({ namespace: 'test', storage: 'memory' });
    p.set('foo', { bar: 42 });
    const result = p.get<{ bar: number }>('foo');
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ bar: 42 });
  });

  it('returns error for missing keys', () => {
    const p = new Persistence({ namespace: 'test', storage: 'memory' });
    const result = p.get('nonexistent');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('removes stored values', () => {
    const p = new Persistence({ namespace: 'test', storage: 'memory' });
    p.set('foo', 'bar');
    expect(p.get('foo').success).toBe(true);
    p.remove('foo');
    expect(p.get('foo').success).toBe(false);
  });

  it('lists stored keys', () => {
    const p = new Persistence({ namespace: 'test', storage: 'memory' });
    p.set('key1', 1);
    p.set('key2', 2);
    const keys = p.keys();
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
  });

  it('clears all stored values', () => {
    const p = new Persistence({ namespace: 'test', storage: 'memory' });
    p.set('foo', 1);
    p.set('bar', 2);
    p.clear();
    expect(p.keys()).toHaveLength(0);
  });

  it('is namespaced - separate instances do not share data', () => {
    const p1 = new Persistence({ namespace: 'app1', storage: 'memory' });
    const p2 = new Persistence({ namespace: 'app2', storage: 'memory' });
    p1.set('shared', 'from-app1');
    const r2 = p2.get('shared');
    expect(r2.success).toBe(false);
  });

  it('createPersistence factory works', () => {
    const p = createPersistence({ namespace: 'factory-test', storage: 'memory' });
    expect(p).toBeInstanceOf(Persistence);
  });
});
