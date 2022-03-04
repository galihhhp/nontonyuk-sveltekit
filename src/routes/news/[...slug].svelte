<script context="module">
  import { get } from 'svelte/store';
  // import { category } from './../../store.js';
  const kategori = get(category).value;

  export const load = async ({ params }) => {
    const slug = params.slug.toLowerCase();
    const url = `https://api-berita-indonesia.vercel.app/${slug}/`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      props: {
        news: data,
      },
    };
  };
</script>

<script>
  import { category } from './../../store.js';
  export let news;

  $: console.log($category);
  $: console.log('news', news);
</script>

<h1>asds</h1>
<button on:click={() => category.changeValue('nasional')}> change </button>

<style>
</style>
