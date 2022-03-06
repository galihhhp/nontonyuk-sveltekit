<script context="module">
  export const load = async ({ params }) => {
    const id = params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=b092fbfe96fe122af99d753ce8372286`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      props: {
        movies: data.results,
      },
    };
  };
</script>

<script>
  import Banner from './../../../components/banner.svelte';
  import { goto } from '$app/navigation';
  import Card from '../../../components/card.svelte';

  export let movies;
</script>

<Banner>
  <h1 class="banner__title">Recomendations</h1>
</Banner>
<div class="container">
  <button class="btn-back" on:click={() => goto('/movie')}>Back</button>
  {#if movies.length === 0}
    <p>No movies found</p>
  {/if}
  <div class="card-wrapper">
    {#each movies as movie}
      <Card {movie} />
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }
  .container .btn-back {
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
    width: auto;
    align-self: start;
    margin-bottom: 30px;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    background-color: rgba(5, 8, 114, 1);
  }
  .banner__title {
    font-size: 3rem;
    font-weight: bold;
  }
  .card-wrapper {
    display: flex;
    flex-direction: row;
    /* width: 100vw; */
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
