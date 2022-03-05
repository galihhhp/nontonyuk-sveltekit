<div class="lds-circle"><div /></div>

<style>
  .lds-circle {
    position: fixed;
    color: white;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.555);
    width: 100vw;
    min-height: 100vh;
  }
  .lds-circle > div {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 8px;
    border-radius: 50%;
    background: #fff;
    animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
</style>
