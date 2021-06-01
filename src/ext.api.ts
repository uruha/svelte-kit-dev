import type { Todo, TodoList, RequiredTodoForm } from './type';
import { API_ROOT, TODO } from './constant';

export const getTodoList = async (): Promise<TodoList> => {
  try {
    const res = await fetch(`${API_ROOT}/${TODO}`);
    return await res.json() as TodoList;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const postTodo = async (formData: RequiredTodoForm): Promise<boolean> => {
  try {
    const res = await fetch(`${API_ROOT}/${TODO}`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    return res.ok;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteTodo = async (id: Todo['id']): Promise<Todo> => {
  try {
    const res = await fetch(`${API_ROOT}/${TODO}/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
