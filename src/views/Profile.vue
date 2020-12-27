<template>
    <form class="form" action="#">
        <h2 class="title">Профиль</h2>
        <div class="form__section">            
            <img class="form__avatar" src="../../public/images/avatar.png" alt="" />

            <div class="form__fields">
                <p class="form__field">
                    <label for="name">Имя пользователя:</label>
                    <input v-model="userData.name" type="text" id="name" name="name" />
                </p>

                <p class="form__field">
                    <label for="job">Город:</label>
                    <input v-model="userData.city" type="text" id="job" name="job" />
                </p>

                <p class="form__field">
                    <label for="job">Место работы:</label>
                    <input v-model="userData.hospital.name" type="text" id="job" name="job" />
                </p>

                <p class="form__field">
                    <label for="adress">Адрес:</label>
                    <input v-model="userData.hospital.adress" type="text" id="adress" name="adress" />
                </p>

                <p class="form__field">
                    <label for="phone">Телефон:</label>
                    <input v-model="userData.hospital.phone" type="text" id="phone" name="phone" />
                </p>
            </div>
        </div>
        <button class="button" type="submit">Сохранить</button>
    </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {},
    };
  },
  mounted() {
    this.$emit("loading", true);
    axios
      .get("https://endohelper.herokuapp.com/api/users")
    //   .get('http://localhost:3000/api/users')
      .then((res) => {
          console.log(res)
        this.userData = res.data;
        this.$emit("loading", false);
      })
      .catch((e) => {
        this.$emit("show-message", {
          title: "Упс...ошибка подключения:",
          message: e,
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  width: 600px;
  margin: 0 auto;
  margin-top: 60px;

  & .title {
    margin-bottom: 60px;
    text-align: left;
  }
}

.form__section {
    display: flex;
}

.form__fields {
    flex-grow: 1;
    margin-left: 80px;
}

.form__avatar {
  width: 150px;
  height: 150px;
  margin-top: 10px;
  background-color: #f2f2f2;
}

.button {
    margin-top: 40px;
}
</style>