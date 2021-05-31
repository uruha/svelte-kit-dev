import { writable } from 'svelte/store';
import type { CountState, RequiredTodoForm } from './type';

const initialState: CountState = 0;
export const count = writable<CountState>(initialState);

export const requiredTodoForm = writable<RequiredTodoForm>({
  title: '',
  detail: ''
});
