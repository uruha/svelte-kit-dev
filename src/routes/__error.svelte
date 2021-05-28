<script context="module" lang="ts">
  import type { LoadOutput } from '@sveltejs/kit/types/page';
  export function load({ error, status }: LoadOutput) {
    return {
      props: { error, status }
    };
  }
</script>

<script lang="ts">
  import { dev } from '$app/env';

  export let status: number | string;
  export let error: Error;

  const offline = typeof navigator !== 'undefined'
    && navigator.onLine === false;
  
  const title   = offline ? 'Offline' : status;
  const message = offline ? 'Find the internet and try again' : error.message;

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>{title}</h1>
<p>{message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
