<template>
  <div class="card p-2.5 max-w-lg">

    <header class="flex justify-between p-2.5">
      <img
        :src="person.img" 
        alt=""
        class="avatar">

      <main class="px-4 grow">
        <h2 class="text-base font-bold">{{ person.name }}</h2>
        <p class="text-xs">{{ person.position }}</p>
        <p class="text-xs">{{ person.city }}</p>
        <div class="connections flex items-center">
          <div class="connect-avatars flex ml-2">
            <img src="/connect1.png" alt="">
            <img src="/connect2.png" alt="">
            <img src="/connect3.png" alt="">
            <img src="/connect4.png" alt="">
          </div>
          <p class="ml-1.5 text-xs">Jason Diamond, John Eremic, <br> and 281 other mutual connections</p>
        </div>
      </main>
      
      <img :src="CompanyLogo" alt="" class="w-12 h-12">
    </header>

    <div class="last_message">
      <section class="flex items-center bg-neutral-900 p-2.5">
        <IconMail />
        <p class="pl-2.5">Reply from Emery Wells</p>
      </section>

      <article>
        <div class="flex justify-between">
          <p>Saturday, November 4 2023 at 9:04 AM EST</p>
          <p>2 days ago</p>
        </div>
        <div>
          <h2>{{ person._orbits_last_message.message_head }}</h2>
          <p>{{ person._orbits_last_message.message }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { defineProps, shallowRef } from 'vue';
import CompanyLogo from '../assets/company_logo.png';
import IconMail from './icons/IconMail.vue';
import { Person } from '../entities/person';

defineProps({
  person: {
    type: Object,
    default: new Person()
  }
});

// DATA
const isExpanded = shallowRef(false);

</script>
<style>
.card {
  border: 1px solid transparent;
  background-image: #0a0a0a, linear-gradient(180deg, rgb(181, 181, 181), rgb(44, 44, 44));
  border-radius: 10px !important;
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.card .avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  /* border: 1px solid;
  border-image-source: linear-gradient(180deg, #FFFFFF 0%, #000000 100%);
  border-image-slice: 1; */
}
.connect-avatars img {
  margin-left: -8px;
}
</style>