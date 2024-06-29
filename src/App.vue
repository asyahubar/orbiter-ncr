<template>
  <main>
    <div id="canvas">
      <div
        v-for="day in days"
        :key="day.contact_date"
        class="flex flex-wrap"
      >
        <Card
          v-for="person in day.array"
          :key="person.created_at"
          :person="person"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import Card from './components/Card.vue';

// DATA
const days = ref([]);

// METHODS
const getDays = async () => {
  const today = new Date()
  const YYYYMMDD = today.toISOString().split('T')[0];
  try {
    const response = await fetch(`https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=${YYYYMMDD}`);
    const readyToUse = await response.json();

    // Removing duplicates in the data
    readyToUse.forEach((entry, index) => {
      readyToUse[index].array = [...new Set(entry.array)];
    });

    // Storing the response
    days.value = readyToUse;
    console.info(readyToUse);
  } catch (error) {
    console.error(error);
  }
}
getDays();
</script>

<style scoped>
</style>
