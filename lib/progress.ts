import { useState, useEffect } from 'react';

const KEY = 'docs-site-progress-v1';

export interface ProgressStore {
  articlesRead: string[];
  quizzesCompleted: string[];
  quizzesRevealed: Record<string, number[]>; // slug → array of revealed question IDs
}

function defaults(): ProgressStore {
  return { articlesRead: [], quizzesCompleted: [], quizzesRevealed: {} };
}

export function loadProgress(): ProgressStore {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    return { ...defaults(), ...JSON.parse(raw) };
  } catch {
    return defaults();
  }
}

function persist(store: ProgressStore): void {
  localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent('progress-changed'));
}

export function markArticleRead(slug: string): void {
  const store = loadProgress();
  if (!store.articlesRead.includes(slug)) {
    store.articlesRead = [...store.articlesRead, slug];
    persist(store);
  }
}

export function setRevealedQuestions(slug: string, revealed: number[]): void {
  const store = loadProgress();
  store.quizzesRevealed = { ...store.quizzesRevealed, [slug]: revealed };
  persist(store);
}

export function markQuizCompleted(slug: string): void {
  const store = loadProgress();
  if (!store.quizzesCompleted.includes(slug)) {
    store.quizzesCompleted = [...store.quizzesCompleted, slug];
  }
  persist(store);
}

export function resetQuiz(slug: string): void {
  const store = loadProgress();
  const { [slug]: _removed, ...rest } = store.quizzesRevealed;
  store.quizzesRevealed = rest;
  store.quizzesCompleted = store.quizzesCompleted.filter((s) => s !== slug);
  persist(store);
}

export function resetAllQuizzes(): void {
  const store = loadProgress();
  store.quizzesRevealed = {};
  store.quizzesCompleted = [];
  persist(store);
}

export function useProgress(): ProgressStore {
  const [store, setStore] = useState<ProgressStore>(loadProgress);

  useEffect(() => {
    const sync = () => setStore(loadProgress());
    window.addEventListener('progress-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('progress-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return store;
}
