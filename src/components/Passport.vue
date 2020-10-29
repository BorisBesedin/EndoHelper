<template>
  <div class="record__passport">
    <p class="record__passport-item">
      <label for="patient">Пациент:</label>
      <input type="text" id="patient" v-model="passport.name" placeholder="Иванов Иван Иванович, 1964 г.р." />
    </p>
    <p class="record__passport-item">
      <label for="complain">Жалобы:</label>
      <input type="text" id="complain" v-model="passport.complain" placeholder="На жизнь"/>
    </p>
    <p class="record__passport-item">
      <label for="diagnose">Диагноз при направлении:</label>
      <input type="text" id="diagnose" v-model="passport.diagnose" placeholder="Болезнь"/>
    </p>
    <p class="record__passport-item">
      <label for="anamnesis">Анамнез:</label>
      <input type="text" id="anamnesis" v-model="passport.anamnesis" placeholder="Вкратце"/>
    </p>
    <p class="record__passport-item">
      <label for="anestesia">Анестезия:</label>
      <input type="text" id="anestesia" v-model="passport.anestesia" placeholder="для слабаков" />
    </p>
    <p class="record__passport-item">
      <label for="endoscope">Модель аппарата:</label>
      <input type="text" id="endoscope" v-model="passport.endoscope" placeholder="olympus" />
    </p>
    <p class="record__passport-item">
      <label for="doctor">Эндоскопист:</label>
      <input type="text" id="doctor" v-model="passport.doctor" placeholder="Ваше имя" />
    </p>
  </div>
</template>

<script>
export default {
    props: ['passport']
}
</script>

<style lang="scss" scoped>
.record__passport {
  width: 700px;
  margin: 0 auto;
  margin-top: 80px;
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