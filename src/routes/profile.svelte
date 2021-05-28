<script lang="ts">
  import { count } from '../store';
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h1>Profile</h1>
<h2>Count</h2>
<p>{$count}</p>