<script>
  import { goto } from '$app/navigation';

  export let movie;

  const toMovieDetails = (id) => goto(`/${id}`);
</script>

<div class="card" on:click={() => toMovieDetails(movie.id)}>
  <img
    class="card__img"
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.original_title}
  />
  <h1 class="card__title">{movie.original_title}</h1>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding-bottom: 20px;
    background-color: #05086e;
    color: white;
    width: 200px;
    height: auto;
    border-radius: 10px;
    cursor: pointer;
    transition: all 5s ease-in-out;
    /* transition: all 0.5s ease-in-out; */
    /* box-shadow: 6px 6px 18px -10px rgba(0, 0, 0, 0.25); */
  }
  .card:hover {
    /* font-weight: bold; */
    height: 300px;
    /* transition: all 2s ease-in-out; */
    /* transition: height 8s ease-in-out; */
  }
  .card__img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
  .card__title {
    font-size: 1em;
    text-align: center;
    padding-top: 20px;
    /* font-weight: bold; */
  }
</style>
