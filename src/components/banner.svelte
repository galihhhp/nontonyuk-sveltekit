<script>
  import { goto } from '$app/navigation';
</script>

<div class="banner">
  <slot />
  <button on:click={() => goto('/')}>Search</button>
</div>

<style>
  .banner {
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
    width: calc(100vw - 55px);
    margin-right: 10px;
    margin-left: 9px;
    height: 200px;
    margin-bottom: 40px;
    padding: 20px;
  }
  button {
    margin-top: 20px;
    width: 200px;
    color: rgba(7, 3, 53, 1);
    background-color: white;
    font-size: 1.2em;
    padding: 5px;
    cursor: pointer;
  }
  button:hover {
    color: white;
    background-color: rgba(7, 3, 53, 1);
    transition: all 0.5s ease-in-out;
  }
</style>
