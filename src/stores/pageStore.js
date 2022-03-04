import { writable } from 'svelte/store';

export const page = writable(1);

export const increment = () => page.update((p) => p + 1);
export const decrement = () => page.update((p) => p - 1);
