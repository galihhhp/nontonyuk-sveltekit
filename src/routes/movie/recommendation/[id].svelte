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
  import { goto } from '$app/navigation';
  import Card from '../../../components/card.svelte';

  export let movies;
</script>

<div class="container">
  <button class="btn-back" on:click={() => goto('/')}>Back</button>
  <h1 class="title">Recomendations</h1>
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
    flex-wrap: wrap;
    margin-top: 50px;
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
  .container .title {
    font-size: 5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    font-weight: bold;
    align-self: start;
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
