<script lang="ts">
  import { fade } from 'svelte/transition';

  import type { Todo } from '../type';
  import { requiredTodoForm } from '../store';
  import { deleteTodo, getTodoList, postTodo } from '../ext.api';

  let getTodoListPromise: ReturnType<typeof getTodoList>;
  let postTodoPromise:    ReturnType<typeof postTodo>;
  let deleteTodoPromise:  ReturnType<typeof deleteTodo>;

  let isRegistedTodo   = false;
  let isDisabled       = false;
  let isCompletedTodo  = false;

  const handleGetTodoList = () => {
    getTodoListPromise = getTodoList();
  }

  const handleSubmitRegisterTodo = (e: Event) => {
    e.preventDefault();
    // between start submit and until the API response is returned,
    // can't use submit button
    isDisabled = true;

    // call api
    postTodoPromise = postTodo($requiredTodoForm);

    // state control on the DOM side by API response
    postTodoPromise.then(res => {
      if(res) {
        isRegistedTodo = res;

        // when POST is successful
        // fade out the label after 2 seconds to use the submit button
        setTimeout(() => {
          isDisabled = false;
          isRegistedTodo = false;

          // reset form values
          requiredTodoForm.set({
            title: '',
            detail: ''
          });

          // refresh todo list
          handleGetTodoList();
        }, 2000);
      } else {
        isDisabled = false;
      }
    });
  }

  const handleCloseTodo = (id: Todo['id']) => {
    deleteTodoPromise = deleteTodo(id);

    deleteTodoPromise.then(res => {
      if(res.id) {
        isCompletedTodo = true;

        setTimeout(() => {
          isCompletedTodo = false;

          handleGetTodoList();
        }, 1000);
      }
    });
  }

  // page mounted timing fire
  handleGetTodoList();
</script>

<svelte:head>
  <title>Simple Todo</title>
</svelte:head>

<div class="todo-app">
  <div class="control-panel">
    <div class="todo-regist">
      <form on:submit={e => handleSubmitRegisterTodo(e)}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Title</label>
        <input type="text" bind:value={$requiredTodoForm.title}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Detail</label>
        <input type="text" bind:value={$requiredTodoForm.detail}>
        <input type="submit" value="Register" disabled={isDisabled}>
  
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

    <div class="completed-todo-information">
      {#await deleteTodoPromise}
        <p>Closing Todo ⏱</p>
      {:then todo}
        {#if isCompletedTodo}
          <div class="completed-todo-pop" out:fade>
            <h4>Completed !</h4>
            <p>{todo.id}: {todo.title}</p>
          </div>
        {/if}
      {/await}
    </div>
  </div>

  <div class="todo-list-container">
    <ul class="todo-list">
      {#await getTodoListPromise}
        <li class="todo-loading">Loading...</li>
      {:then todoList}
        {#each todoList as todo (todo.id) }
          <li class="todo-item">
            <div>
              <h3>{todo.id}: {todo.title}</h3>
              <p>{todo.detail}</p>
            </div>
            <button on:click={() => handleCloseTodo(todo.id)}>close</button>
          </li>
        {/each}
      {:catch error}
        <li class="error">{error.message}</li>
      {/await}
    </ul>
  </div>

</div>

<style>
  .todo-app {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    width: 100vw;
    height: 100%;
  }

  .control-panel {
    width: 50vw;
  }

  .todo-regist {
    padding: 2rem;
  }
  .todo-regist form {
    display: grid;
    grid-template-columns: 20% 60%;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  .todo-list-container {
    width: 50vw;
    height: 100%;
    position: relative;
  }

  .todo-list {
    position: absolute;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-x: scroll;
  }

  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
</style>