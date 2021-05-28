<script lang="ts">
  import { count } from '../store';
  const handleCountUpdate = () => count.update(n => n + 1);
  
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<h2>Count</h2>
<p>{$count}</p>
<div>
  <button on:click={() => handleCountUpdate()}>update</button>
</div>
