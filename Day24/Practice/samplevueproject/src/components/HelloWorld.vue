<script setup>
import { ref } from 'vue'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import vueLogo from '../assets/vue.svg'

const count = ref(0)
const counter=()=>{
  count.value++
}

const increaseWidth=(event)=>{
  event.preventDefault();
  event.target.style.width=event.target.offsetWidth+10+"px";
}
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const  handleInput=(event)=>{console.log(event.target.value)}

</script>

<template>
  <input type="text" placeholder="Type something..." @input="debounce(handleInput, 300)"/>
  <div id="box" @click="increaseWidth">
    <h1>Hello Friends</h1>
    <p>Welcome to Vite + Vue 3 + JavaScript</p>
  </div>
    <img src="../assets/vite.svg" class="logo" alt="Vite logo" loading="lazy"/>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/4deVCNJq3qc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <img src="../assets/hero.png" class="logo hero" alt="Hero image" loading="lazy"/>
    <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" loading="lazy"/>

    <button class="counter" @mousemove="debounce(counter, 1000)">Count is {{ count }}</button>

</template>
