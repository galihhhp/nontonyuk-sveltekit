<script context="module">
  export const load = async ({ params }) => {
    const id = params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=b092fbfe96fe122af99d753ce8372286`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      props: {
        movie: data,
      },
    };
  };
</script>

<script>
  import { goto } from '$app/navigation';
  import Banner from '../../components/banner.svelte';

  export let movie;
</script>

<Banner><h1 class="banner__title">Movie Details</h1></Banner>
<div class="details-wrapper">
  <div class="details-wrapper--left">
    <button class="btn-back" on:click={() => goto('/movie')}>Back</button>
    <h1>{movie.original_title}</h1>
    <img
      class="card__img"
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.original_title}
    />
    <button class="btn-web" on:click={() => goto(movie.homepage)}
      >Website</button
    >
  </div>
  <div class="details-wrapper--right">
    <!-- <h1>{movie.original_title}</h1> -->
    <div>
      <h2>Tagline</h2>
      <p>{movie.tagline === '' ? '-' : `${movie.tagline}`}</p>
    </div>
    <div>
      <h2>Status</h2>
      <p>{movie.status}</p>
    </div>
    <div>
      <h2>Release Date</h2>
      <p>{movie.release_date}</p>
    </div>
    <div>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
    </div>
    <div class="genres">
      <h2>Genres</h2>
      {#each movie.genres as genre}
        <p>{genre.name}</p>
      {/each}
    </div>
    <div class="ph">
      <h2>Production Companies</h2>
      {#each movie.production_companies as ph}
        <p>{ph.name}</p>
      {/each}
    </div>
    <h2
      sveltekit:prefetch
      class="recommendation"
      on:click={() => goto(`/movie/recommendation/${movie.id}`)}
    >
      Recommendation
    </h2>
  </div>
</div>

<style>
  .details-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin: 0 auto; */
    margin-top: 40px;
    width: 100vw;
    min-height: 100vh;
  }
  .banner__title {
    font-size: 3rem;
    font-weight: bold;
  }
  .details-wrapper .details-wrapper--left {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .details-wrapper .details-wrapper--left .btn-web {
    padding: 20px;
    width: 90%;
    margin-top: 20px;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    background-color: rgba(7, 3, 53, 1);
  }
  .details-wrapper .details-wrapper--left .btn-web:hover {
    background-color: rgba(5, 8, 114, 1);
    transition: all 1s ease-in-out;
    width: 100%;
  }
  .details-wrapper .details-wrapper--left .btn-back {
    padding: 10px;
    width: auto;
    align-self: start;
    margin-bottom: 30px;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    background-color: rgba(5, 8, 114, 1);
  }

  .details-wrapper .details-wrapper--left h1 {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }
  .details-wrapper img {
    width: 300px;
    height: 70%;
    margin-top: 20px;
    /* object-fit: cover; */
  }
  .details-wrapper--right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-left: 4em;
    margin-right: 4em;
  }
  .details-wrapper--right div {
    width: 100%;
    height: auto;
    margin-bottom: 30px;
  }
  .details-wrapper--right h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .details-wrapper--right .genres p,
  .details-wrapper--right .ph p {
    margin-bottom: 5px;
  }

  .recommendation {
    align-self: start;
    background-color: rgba(7, 3, 53, 1);
    color: white;
    cursor: pointer;
    font-size: 25px !important;
    padding: 15px;
    width: 100%;
  }
  @media only screen and (min-width: 1200px) {
    .details-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      width: 100%;
      min-height: 100vh;
    }
    .details-wrapper .details-wrapper--left {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* align-items: center; */
    }
    .details-wrapper img {
      width: 400px;
      height: 70%;
      margin-top: 20px;
      /* object-fit: cover; */
    }
    .details-wrapper--right {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      margin-top: 10%;
    }
    /* .details-wrapper--right div {
      width: 100%;
      height: auto;
      margin-bottom: 30px;
    } */
    .details-wrapper--right h2 {
      font-size: 2rem;
    }
  }
</style>
