<template>
  <div class="passport">
    <button class="button small" @click="$emit('clear-doctor')">Очистить</button>
    <p class="passport-item">
      <label for="diagnose">Пациент:</label>
      <input type="text" id="diagnose" v-model="patient.patient"/>
    </p>
    <p class="passport-item">
      <label for="birth">Дата рождения:</label>
      <input type="text" id="birth" v-model="patient.birth"/>
    </p>
    <p class="passport-item">
      <label for="complains">Жалобы:</label>
      <input type="text" id="complains" v-model="patient.complains"/>
    </p>
    <p class="passport-item">
      <label for="anamnesis">Анамнез:</label>
      <input type="text" id="anamnesis" v-model="patient.anamnesis"/>
    </p>
    <p class="passport-item">
      <label for="anestesia">Анестезия:</label>
      <input type="text" id="anestesia" v-model="patient.anestesia" />
    </p>
    <p class="passport-item">
      <label for="endoscope">Модель аппарата:</label>
      <input type="text" id="endoscope" v-model="patient.endoscope"/>
    </p>
  </div>
</template>

<script>
export default {
    props: ['patient']
}
</script>

<style lang="scss" scoped>
.passport {
  position: relative;  

  & .button {
    position: absolute;
    top: -40px;
    right: 0;
  }
}

.passport-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

input {    
    width: 400px;
    padding: 5px;
    font-size: 14px;

    &.focus {
        border-color: #000;
    }
}

label {
  font-size: 14px;
}
</style>