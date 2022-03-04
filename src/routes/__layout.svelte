<script>
  import { goto } from '$app/navigation';
  import '../app.css';

  function routeToHome() {
    goto('/');
  }
</script>

<svelte:head>
  <title>nontonyuk!</title>
</svelte:head>
<div class="layout-container">
  <nav class="nav">
    <h1 class="nav__brand" on:click={routeToHome}>yuknonton!</h1>
    <p class="nav__item">About yuknonton!</p>
  </nav>
  <slot />
</div>

<style>
  .layout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-right: 250px;
    padding-left: 250px;
    max-width: 100vw !important;
    /* background-color: #495371; */
  }
  .nav {
    /* background-color: #74959a; */
    text-align: center;
    display: flex;
    justify-content: space-between;
    width: 99vw;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: 6px 6px 18px -10px rgba(0, 0, 0, 0.15);
  }
  .nav__brand {
    font-size: 1.5em;
    font-weight: bold;
    padding-left: 20px;
    cursor: pointer;
  }
  .nav__item {
    align-self: center;
    padding-right: 20px;
    cursor: pointer;
  }
  .nav__item:hover {
    font-weight: bold;
  }
</style>
