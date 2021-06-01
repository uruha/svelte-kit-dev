<nav>
  <ul>
    <li><a href=".">Home</a></li>
    <li><a href="profile">About</a></li>
    <li><a href="todo">Todo</a></li>
    <li><a rel="external" href="https://kit.svelte.dev/">SveltKit</a></li>
  </ul>
</nav>

<slot></slot>

<style>
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1rem;
  }

  li {
    padding: 0 1rem 0 0;
  }
</style>