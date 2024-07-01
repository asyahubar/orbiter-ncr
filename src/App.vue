<template>
  <main>
    <div id="canvas" class="fixed top-0 w-screen h-full">
      <div class="w-full h-full relative">
        <template
          v-for="(day, index) in days"
          :key="`${day.contact_date}card`"
        >
          <Card
            v-for="(person, idp) in day.array"
            :key="person.created_at"
            :person="person"
            :style="peoplePositions[index]?.[idp] || {}"
            class="card-in-orbit z-40"
          />
        </template>
        <Orbit 
          v-for="(day, index) in days"
          :key="day.contact_date"
          :diameter="orbitDiameters[index] || 80"
          class="absolute top-0"
        />
        <img :src="CompanyLogo" alt="" class="w-20 h-20 absolute border rounded-full border-white left-1/2 top-[50vw] -translate-x-1/2">
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Card from './components/Card.vue';
import Orbit from './components/Orbit.vue';
import CompanyLogo from './assets/company_logo.png';

// DATA
const days = ref([]);
const orbitDiameters = ref([]);
const peoplePositions = ref([]);
const zoom = ref(0);

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
      if (entry.array.length > 10) {
        readyToUse[index].array.length = 10;
      }
    });

    // Storing the response
    days.value = readyToUse;
    setOrbitDiameters();
    calculatePositions();
  } catch (error) {
    console.error(error);
  }
}
getDays();

const setOrbitDiameters = () => {
  const initialWidth = window.innerWidth;
  orbitDiameters.value = days.value.map((d, i) => {
    const diameterPercentage = 95 - (i + 1) * 12;
    return initialWidth * (diameterPercentage + zoom.value) / 100;
  });

  console.info(orbitDiameters.value);
}

const calculatePositions = () => {
  days.value.forEach((day, orbitIndex) => {
    const orbitWidth = orbitDiameters.value[orbitIndex];
    const totalSteps = day.array.length + 1;

    if (peoplePositions.value.length === 0) {
      peoplePositions.value.push(getPositionValues(totalSteps, orbitWidth, orbitIndex));
    } else {
      peoplePositions.value[orbitIndex] = getPositionValues(totalSteps, orbitWidth, orbitIndex);
    }
  });
};
const getPositionValues = (totalSteps, orbitWidth, personIndex) => {
  const initialWidth = window.innerWidth;
  const radius = orbitWidth / 2;

  return Array.from({ length: totalSteps }, (_, personIndex) => {
    if (orbitWidth <= 200 || orbitWidth >= initialWidth) {
      return {
        display: "none"
      }
    }

    const angle = (180 / totalSteps) * (personIndex+1);
    return {
      transform: `rotate(-${angle}deg) translate(${radius}px) rotate(${angle}deg)`
    };
  });
}

const updateZoom =  (event) => {
  const { wheelDelta } = event;
  if (!(wheelDelta < 80 && wheelDelta > -80)) {
    const zoomChange = Number(String(Math.abs(wheelDelta)).split("")[0]);

    if (zoom.value < 40 && wheelDelta > 0) {
      zoom.value += zoomChange;
    } else if ( zoom.value > 0 && wheelDelta < 0) {
      zoom.value -= zoomChange;
    }
  }
}

// WATCHES
watch(zoom, () => {
  setOrbitDiameters();  
  calculatePositions();
});

// LIFECYCLE
onMounted(() => {
  document.body.addEventListener("wheel", updateZoom);
})
</script>

<style scoped>
.card-in-orbit {
  left: calc(50% - 40px);
  top: calc(50vw - 10px);
}
</style>
