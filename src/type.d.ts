export type CountState = number;

export type Todo = {
  id: string;
  title: string;
  detail?: string;
  createdAt: Date;
};
export type TodoList = Todo[];
export type RequiredTodoForm = Pick<Todo, 'title' | 'detail'>;
