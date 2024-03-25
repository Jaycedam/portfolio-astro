<script lang="ts">
  import { onMount } from "svelte";

  let views: number = 0;

  onMount(async () => {
    const pathname = window.location.pathname;
    const api = "/api/pagecount.json?slug=" + pathname;

    fetch(api)
      .then((res) => res.json())
      .then((res) => (views = res.message));
  });
</script>

<p>{views} views</p>
