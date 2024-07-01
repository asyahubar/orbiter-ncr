<template>
  <div 
    class="card absolute max-w-lg"
    :class="{'card-expanded z-50': isExpanded}"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"  
  >

    <header 
      class="flex justify-between p-2.5 text-white items-start"
      :class="{'bg-neutral-950': isExpanded}"
    >
      <div class="avatar-wrapper">
        <img
          :src="person.img || ''" 
          alt=""
          class="avatar"
        >
      </div>

      <main v-show="isExpanded" class="px-4 grow bg-neutral-950">
        <h2 class="text-base font-bold">{{ person.name }}</h2>
        <p class="text-xs pb-1">{{ person.position }}</p>
        <p class="text-xs pb-1">{{ person.city }}</p>
        <div class="connections flex items-center pt-1">
          <div class="connect-avatars flex ml-2">
            <img src="/connect1.png" alt="">
            <img src="/connect2.png" alt="">
            <img src="/connect3.png" alt="">
            <img src="/connect4.png" alt="">
          </div>
          <p class="ml-1.5 text-xs">Jason Diamond, John Eremic, <br> and 281 other mutual connections</p>
        </div>
      </main>
      
      <div class="logo-wrapper">
        <img :src="CompanyLogo" alt="" class="w-12 h-12">
      </div>
    </header>

    <div class="last_message p-2.5">
      <section class="mail-header flex items-center p-2.5">
        <IconMail />
        <p class="pl-2.5 text-white">Reply from Emery Wells</p>
      </section>

      <article>
        <div class="flex justify-between p-2.5">
          <p>Saturday, November 4 2023 at 9:04 AM EST</p>
          <p>2 days ago</p>
        </div>
        <div class="text-base px-2.5">
          <h2 class="font-bold text-white pb-1">{{ person._orbits_last_message.message_head }}</h2>
          <p>{{ person._orbits_last_message.message }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';
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
.card-expanded {
  border-radius: 10px;
  border: 1px solid transparent;
  background-image: linear-gradient(#0a0a0a 0%, #0a0a0a 0%), linear-gradient(180deg, rgb(181, 181, 181), rgb(44, 44, 44));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-sizing: border-box;
  z-index: 100;
  overflow: hidden;
}
.card {
  border: 1px solid transparent;
}
.card .avatar {
  position: relative;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}
.card.card-expanded .avatar {
  width: 100px;
  height: 100px;
} 
.card .avatar-wrapper {
  display: inline-block;
  border: 1px solid transparent;
  background-image: linear-gradient(transparent, transparent), linear-gradient(180deg, #FFFFFF 0%, #000000 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 50%;
  overflow: hidden;
}
.connect-avatars img {
  margin-left: -8px;
}
.card .logo-wrapper {
  display: none;
  border: 1px solid transparent;
  background-image: linear-gradient(transparent, transparent), linear-gradient(180deg, #FFFFFF 0%, #000000 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 10px;
  overflow: hidden;
}
.card .last_message {
  display: none;
}
.card-expanded .logo-wrapper,
.card-expanded .last_message {
  display: block;
}
.card .last_message .mail-header {
  background-color: rgba(225, 225, 225, .05);
}
</style>