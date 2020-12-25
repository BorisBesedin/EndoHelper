<template>
  <div class="record__passport">
    <button class="button small" @click="$emit('clear-doctor')">Очистить</button>
    <p class="record__passport-item">
      <label for="diagnose">Пациент:</label>
      <input type="text" id="diagnose" v-model="patient.patient"/>
    </p>
    <p class="record__passport-item">
      <label for="anamnesis">Дата рождения:</label>
      <input type="text" id="anamnesis" v-model="patient.birth"/>
    </p>
    <p class="record__passport-item">
      <label for="anamnesis">Жалобы:</label>
      <input type="text" id="anamnesis" v-model="patient.complains"/>
    </p>
    <p class="record__passport-item">
      <label for="anamnesis">Анамнез:</label>
      <input type="text" id="anamnesis" v-model="patient.anamnesis"/>
    </p>
    <p class="record__passport-item">
      <label for="anestesia">Анестезия:</label>
      <input type="text" id="anestesia" v-model="patient.anestesia" />
    </p>
    <p class="record__passport-item">
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
.record__passport {
  position: relative;
  width: 700px;
  margin: 0 auto;
  margin-top: 80px;

  & .button {
    position: absolute;
    top: -40px;
    right: 0;
  }
}

.record__passport-item {
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
</style>