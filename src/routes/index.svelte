<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Loading from '../components/loading.svelte';
  import ErrorMsg from './../components/errorMsg.svelte';
  import { loading, err } from './../stores/loadStore.js';
  import { goto } from '$app/navigation';
  import Banner from '../components/banner.svelte';
  import Card from '../components/card.svelte';

  let isMounted = false;
  let movies = null;
  let query = '';

  const searchHandler = async () => {
    loading.set(true);
    let url = `http://api.themoviedb.org/3/search/movie?api_key=b092fbfe96fe122af99d753ce8372286&query=${query}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      movies = data.results;
      movies && setTimeout(() => loading.set(false), 200);

      if (!movies) {
        setTimeout(() => loading.set(false), 300);
        $err = 'No movies found';
      }
    } catch (error) {
      loading.set(false);
      $err = 'Something went wrong';
    }
  };

  const onKeyPress = () => {
    if (query) searchHandler();
  };

  onMount(() => {
    isMounted = true;
  });
</script>

<Banner>
  <h1 class="banner__title">nontonyuk!</h1>
  <p class="banner__desc">
    For movie enthusiasts, this website provides complete information about
    movies
  </p>
</Banner>
<button class="btn-homepage" on:click={() => goto('/movie')}>Homepage</button>
<p class="or">or</p>
<div class="search">
  <input
    type="text"
    placeholder="Search"
    bind:value={query}
    on:keypress={onKeyPress}
  />
  <button on:click={searchHandler}>Search</button>
</div>
{#if isMounted}
  <div class="card-wrapper" transition:fade={{ delay: 250, duration: 300 }}>
    {#if $err !== null}
      <ErrorMsg error={$err} />
    {/if}

    {#if $loading === true}
      <Loading />
    {:else if movies !== null && $loading === false}
      {#each movies as movie}
        <Card {movie} />
      {/each}
    {/if}
  </div>
{/if}

<style>
  .banner__title {
    font-size: 3rem;
    font-weight: bold;
  }
  .banner__desc {
    font-size: 1rem;
  }
  .btn-homepage {
    background-color: rgba(7, 3, 53, 1);
    color: white;
    font-size: 1rem;
    width: 70%;
    padding: 20px;
    cursor: pointer;
  }
  .btn-homepage:hover {
    background-color: rgba(5, 8, 114, 1);
    width: 90%;
    transition: all 0.5s ease-in-out;
  }
  .or {
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .search {
    display: flex;
    width: 100%;
    margin-bottom: 40px;
  }
  .search input {
    width: 80%;
    padding: 10px;
    /* border: none; */
    border-radius: 5px;
    font-size: 1.2rem;
    margin-right: 20px;
  }
  .search button {
    width: 20%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: rgba(7, 3, 53, 1);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .card-wrapper {
    border-top: 1px solid #000;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    /* max-width: 100vw; */
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media only screen and (min-width: 1200px) {
    .banner__desc {
      font-size: 1.2rem;
    }
    .btn-homepage {
      width: 30%;
    }

    .btn-homepage:hover {
      width: 50%;
    }
    .search {
      width: 60%;
    }
  }
</style>
