<script context="module">
  export const load = async () => {
    let page = 1;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=b092fbfe96fe122af99d753ce8372286&page=${page}`;
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
  import { increment, decrement, page } from './../stores/pageStore.js';
  export let movies;
  $: console.log(movies);

  const getMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=b092fbfe96fe122af99d753ce8372286&page=${$page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      movies = data.results;
    } catch (error) {
      console.log(error);
    }
  };

  function routeToPage(slug, cat) {
    goto(`/news/${slug}/${cat}`);
  }
</script>

<div class="home">
  <h1 class="home__title">Popular Movies</h1>
  <div class="home__card-wrapper">
    {#each movies as movie}
      <div class="card">
        <img
          class="card__img"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <h1 class="card__title">{movie.original_title}</h1>
      </div>
    {/each}
  </div>
  <div>
    <button
      disabled={$page === 1}
      class="home__button"
      on:click={() => {
        decrement();
        getMovies();
      }}>PREV</button
    >
    <button
      class="home__button"
      on:click={() => {
        increment();
        getMovies();
      }}>NEXT</button
    >
  </div>
</div>

<style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    margin-top: 40px;
    width: 100%;
    height: 100%;
  }
  .home__title {
    font-weight: bold;
    font-size: 30px;
  }
  .home__card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
  }
  .home__button {
    margin: 10px;
    padding: 15px;
    font-size: 20px;
    border-radius: 5px;
    width: 150px;
    cursor: pointer;
    border: none;
    background-color: black;
    color: white;
  }
  .home__button:hover {
    font-weight: bold;
    transition: font-weight 0.5s ease-in-out;
  }
  .home__button:disabled {
    background-color: grey;
    color: white;
    cursor: default;
  }
  .home__button:disabled:hover {
    font-weight: normal;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding-bottom: 20px;
    background-color: white;
    width: 200px;
    height: auto;
    border-radius: 10px;
    cursor: pointer;
    /* box-shadow: 6px 6px 18px -10px rgba(0, 0, 0, 0.25); */
  }
  .card:hover {
    font-weight: bold;
  }
  .card__img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
  .card__title {
    font-size: 1.5em;
    text-align: center;
    padding-top: 20px;
    /* font-weight: bold; */
  }
</style>
