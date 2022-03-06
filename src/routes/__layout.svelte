<script>
  import '../app.css';
</script>

<svelte:head>
  <title>nontonyuk!</title>
</svelte:head>
<div class="layout-container">
  <slot />
</div>

<style>
  .layout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    /* padding-right: 250px;
    padding-left: 250px; */
    padding-right: 10%;
    padding-left: 10%;
    max-width: 100vw !important;
    /* background-color: #495371; */
  }

  @media only screen and (min-width: 1200px) {
    .layout-container {
      padding-right: 250px;
      padding-left: 250px;
    }
  }
</style>
