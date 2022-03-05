<script>
  export let error;
</script>

<h1>{error}</h1>
<button on:click={() => window.location.reload()}>Reload page, please!</button>

<style>
  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  button {
    cursor: pointer;
    font-size: 1em;
    padding: 15px;
    width: 50%;
    background: rgba(7, 3, 53, 1);
    color: white;
  }
  button:hover {
    font-weight: bold;
    background: rgba(5, 8, 114, 1);
    transition: all 0.5s ease-in-out;
  }
</style>
