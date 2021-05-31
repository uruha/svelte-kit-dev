import { writable } from 'svelte/store';
import type { CountState } from './type';

const initialState: CountState = 0;
export const count = writable<CountState>(initialState);
