import { writable } from 'svelte/store';
import type { CountState, RequiredTodoForm } from './type';

export const count = writable<CountState>(0);
export const requiredTodoForm = writable<RequiredTodoForm>({
  title: '',
  detail: ''
});
