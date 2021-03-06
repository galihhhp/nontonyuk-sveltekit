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
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { increment, decrement, page } from '../../stores/pageStore.js';
  import { loading, err } from '../../stores/loadStore.js';
  import Card from '../../components/card.svelte';
  import Loading from '../../components/loading.svelte';
  import ErrorMsg from '../../components/errorMsg.svelte';
  import Banner from '../../components/banner.svelte';

  export let movies;
  let section = 'popular';
  let isMounted = false;

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

  onMount(() => {
    isMounted = true;
  });
</script>

<div class="home">
  <Banner>
    <h1 class="banner__title">Homepage</h1>
  </Banner>
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
  {:else if $loading === false && isMounted}
    <div
      class="home__card-wrapper"
      transition:fade|local={{ delay: 250, duration: 500 }}
    >
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
    /* margin: 20px; */
    width: 100%;
    height: 100%;
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
  .banner__title {
    font-size: 3rem;
    font-weight: bold;
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
