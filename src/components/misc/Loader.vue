<template>
  <div class="container flex-center">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.loader {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.loader:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #137B80;
  border-color: #137B80 transparent #137B80 transparent;
  animation: loader 1.2s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>