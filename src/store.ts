import { writable } from 'svelte/store';
import type { CountState } from './type';

const initialState = 0 as CountState;
export const count = writable<CountState>(initialState);
