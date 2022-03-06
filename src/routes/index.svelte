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
  import { increment, decrement, page } from './../stores/pageStore.js';
  import { loading, err } from './../stores/loadStore.js';
  import Card from '../components/card.svelte';
  import Loading from '../components/loading.svelte';
  import ErrorMsg from './../components/errorMsg.svelte';

  export let movies;
  let section = 'popular';

  const getMovies = async () => {
    loading.set(true);
    let url = `https://api.themoviedb.org/3/movie/${section}?api_key=b092fbfe96fe122af99d753ce8372286&page=${$page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      movies = data.results;
      movies && setTimeout(() => loading.set(false), 300);

      if (!movies) {
        setTimeout(() => loading.set(false), 300);
        $err = 'No movies found';
      }
    } catch (error) {
      loading.set(false);
      $err = 'Something went wrong';
    }
  };

  const changeSection = (newSection) => {
    $page = 1;
    section = newSection;
    getMovies();
    window.scrollTo(0, 0);
  };
</script>

<div class="home">
  <div class="home__banner">
    <h1>nontonyuk!</h1>
    <p>The site provides complete details about movies.</p>
  </div>

  <div class="home__tab">
    <h1
      class={`home__title ${
        section === 'popular' ? 'home__title--active' : ''
      }`}
      on:click={() => changeSection('popular')}
    >
      Popular
    </h1>
    <h1
      class={`home__title ${
        section === 'top_rated' ? 'home__title--active' : ''
      }`}
      on:click={() => changeSection('top_rated')}
    >
      Top Rated
    </h1>
    <h1
      class={`home__title ${
        section === 'now_playing' ? 'home__title--active' : ''
      }`}
      on:click={() => changeSection('now_playing')}
    >
      Now Playing
    </h1>
    <h1
      class={`home__title ${
        section === 'upcoming' ? 'home__title--active' : ''
      }`}
      on:click={() => changeSection('upcoming')}
    >
      Upcoming
    </h1>
  </div>

  {#if $err !== null}
    <ErrorMsg error={$err} />
  {/if}

  {#if $loading === true}
    <Loading />
  {:else if $loading === false}
    <div class="home__card-wrapper">
      {#each movies as movie}
        <Card {movie} />
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
  {/if}
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
  .home__banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.5;
    color: white;
    background-image: radial-gradient(
      circle 610px at 5.2% 51.6%,
      rgba(5, 8, 114, 1) 0%,
      rgba(7, 3, 53, 1) 97.5%
    );
    width: 100%;
    height: 300px;
    margin-bottom: 40px;
    padding: 20px;
  }
  .home__banner h1 {
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .home__title {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    color: rgba(7, 3, 53, 1);
  }
  .home__title--active {
    width: 15%;
    margin-bottom: 20px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 8px solid rgba(7, 3, 53, 1);
    transition: all 0.5s ease-in-out;
  }
  .home__tab {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid rgba(7, 3, 53, 1);
    width: 100%;
    height: 50px;
  }
  .home__card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
    /* transition: all 0.5s 1s ease-in-out; */
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

  @media only screen and (min-width: 1200px) {
    .home__title--active {
      color: white;
      background-color: rgba(7, 3, 53, 1);
      width: 25%;
      text-align: center;
      padding: 15px;
    }
  }
</style>
