<script lang="ts">
  import { fade } from 'svelte/transition';

  import type { TodoList, RequiredTodoForm } from 'src/type';
  import { API_ROOT, TODO } from '../constant';
  import { requiredTodoForm } from '../store';

  const getTodoList = async () => {
    try {
      const res = await fetch(`${API_ROOT}/${TODO}`);
      return await res.json() as TodoList;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const postTodo = async (formData: RequiredTodoForm) => {
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

  let getTodoListPromise: ReturnType<typeof getTodoList>;
  let postTodoPromise: ReturnType<typeof postTodo>;

  let isRegistedTodo = false;
  let isDisabled     = false;

  const handleGEtTodoList = () => {
    getTodoListPromise = getTodoList();
  }

  const handleSubmitRegisterTodo = (e: Event) => {
    e.preventDefault();
    isDisabled = true;
    postTodoPromise = postTodo($requiredTodoForm);

    postTodoPromise.then(res => {
      if(res) {
        isRegistedTodo = res;

        setTimeout(() => {
          isDisabled = false;
          isRegistedTodo = false;

          $requiredTodoForm = {
            title: '',
            detail: ''
          };

          handleGEtTodoList();
        }, 2000);
      } else {
        isDisabled = false;
      }
    });
  }

  // page mounted timing fire
  handleGEtTodoList();
</script>

<div class="todo-app">
  <div class="todo-regist">
    <form on:submit={e => handleSubmitRegisterTodo(e)}>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Title</label>
      <input type="text" bind:value={$requiredTodoForm.title}>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Detail</label>
      <input type="text" bind:value={$requiredTodoForm.detail}>
      <input type="submit" value="Register TODO" disabled={isDisabled}>

      <div class="todo-registed-status">
        {#await postTodoPromise}
          <p>Registering...</p>
        {:then _}
          {#if isRegistedTodo}
            <p out:fade>Succeeded in TODO registration !</p>
          {/if}
        {:catch error}
          <p style="color: red">Failed in TODO registration: {error.message}</p>
        {/await}
      </div>
    </form>
  </div>
  <ul class="todo-list">
    {#await getTodoListPromise}
      <li>Loading...</li>
    {:then todoList}
      {#each todoList as todo }
        <li>
          <h3>{todo.id}: {todo.title}</h3>
          <p>{todo.detail}</p>
        </li>
      {/each}
    {:catch error}
      <li style="color: red">{error.message}</li>
    {/await}
  </ul>
</div>

<style>
  .todo-app {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }

  .todo-regist form {
    display: grid;
    grid-template-columns: 20% 80%;
    grid-column-gap: 10px;
  }
</style>