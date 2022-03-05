<script context="module">
  export const load = ({ params }) => {
    const id = params.id;
    return {
      props: {
        id,
      },
    };
  };
</script>

<script>
  export let id;

  $: console.log(id);
</script>

<h1>{id}</h1>

<style>
  h1 {
    font-size: 4em;
  }
</style>
