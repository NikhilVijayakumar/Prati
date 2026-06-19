import { describe, it, expect, beforeEach } from 'vitest';
import { createNavigationState, navigationStateReducer } from './navigation-state';
import type { NavigationState } from '../types';

describe('Navigation State', () => {
  it('creates initial state', () => {
    const state = createNavigationState();
    expect(state.currentScreen).toBeNull();
    expect(state.currentWorkflow).toBeNull();
    expect(state.currentStep).toBe(0);
    expect(state.history).toEqual([]);
    expect(state.params).toEqual({});
    expect(state.workflowData).toEqual({});
  });

  it('creates state with initial values', () => {
    const state = createNavigationState({ currentScreen: 'home' });
    expect(state.currentScreen).toBe('home');
  });

  it('navigates to a screen', () => {
    const state = createNavigationState();
    const next = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'dashboard' });
    expect(next.currentScreen).toBe('dashboard');
    expect(next.history).toEqual(['dashboard']);
  });

  it('navigates with params', () => {
    const state = createNavigationState();
    const next = navigationStateReducer(state, {
      type: 'NAVIGATE',
      screen: 'detail',
      params: { id: '42' },
    });
    expect(next.currentScreen).toBe('detail');
    expect(next.params).toEqual({ id: '42' });
  });

  it('replaces history on replace navigation', () => {
    const state = createNavigationState();
    const s1 = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'a' });
    const s2 = navigationStateReducer(s1, { type: 'NAVIGATE', screen: 'b', replace: true });
    expect(s2.history).toEqual(['b']);
  });

  it('goes back in history', () => {
    let state = createNavigationState();
    state = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'a' });
    state = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'b' });
    state = navigationStateReducer(state, { type: 'GO_BACK' });
    expect(state.currentScreen).toBe('a');
  });

  it('does not go back when history has single entry', () => {
    const state = createNavigationState();
    const s1 = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'a' });
    const s2 = navigationStateReducer(s1, { type: 'GO_BACK' });
    expect(s2.currentScreen).toBe('a');
  });

  it('starts a workflow', () => {
    const state = createNavigationState();
    const next = navigationStateReducer(state, {
      type: 'START_WORKFLOW',
      workflowId: 'wizard',
      initialData: { step: 1 },
    });
    expect(next.currentWorkflow).toBe('wizard');
    expect(next.currentStep).toBe(0);
    expect(next.workflowData).toEqual({ step: 1 });
  });

  it('advances workflow step', () => {
    let state = createNavigationState();
    state = navigationStateReducer(state, { type: 'START_WORKFLOW', workflowId: 'wizard' });
    state = navigationStateReducer(state, { type: 'ADVANCE_WORKFLOW', stepData: { form: 'complete' } });
    expect(state.currentStep).toBe(1);
    expect(state.workflowData).toEqual({ form: 'complete' });
  });

  it('completes a workflow', () => {
    let state = createNavigationState();
    state = navigationStateReducer(state, { type: 'START_WORKFLOW', workflowId: 'wizard' });
    state = navigationStateReducer(state, { type: 'COMPLETE_WORKFLOW' });
    expect(state.currentWorkflow).toBeNull();
    expect(state.currentStep).toBe(0);
    expect(state.workflowData).toEqual({});
  });

  it('sets params', () => {
    const state = createNavigationState();
    const next = navigationStateReducer(state, { type: 'SET_PARAMS', params: { lang: 'en' } });
    expect(next.params).toEqual({ lang: 'en' });
  });

  it('merges params on SET_PARAMS', () => {
    const state = createNavigationState();
    const s1 = navigationStateReducer(state, { type: 'SET_PARAMS', params: { a: '1' } });
    const s2 = navigationStateReducer(s1, { type: 'SET_PARAMS', params: { b: '2' } });
    expect(s2.params).toEqual({ a: '1', b: '2' });
  });

  it('resets to initial state', () => {
    let state = createNavigationState();
    state = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'a' });
    state = navigationStateReducer(state, { type: 'RESET' });
    expect(state.currentScreen).toBeNull();
  });

  it('resets with initial values', () => {
    let state = createNavigationState();
    state = navigationStateReducer(state, { type: 'NAVIGATE', screen: 'a' });
    state = navigationStateReducer(state, { type: 'RESET', initial: { currentScreen: 'home' } });
    expect(state.currentScreen).toBe('home');
  });
});
