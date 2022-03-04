import { writable } from 'svelte/store';

function categoryStore() {
  const { subscribe, set, update } = writable('terbaru');

  return {
    subscribe,
    changeValue: (val) => set(val),
    reset: () => {},
  };
}

export const category = categoryStore();
