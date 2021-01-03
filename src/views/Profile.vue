<template>
  <form class="form" @submit.prevent="updateUserData">
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
          <input
            v-model="userData.hospital.name"
            type="text"
            id="job"
            name="job"
          />
        </p>

        <p class="form__field">
          <label for="adress">Адрес:</label>
          <input
            v-model="userData.hospital.adress"
            type="text"
            id="adress"
            name="adress"
          />
        </p>

        <p class="form__field">
          <label for="phone">Телефон:</label>
          <input
            v-model="userData.hospital.phone"
            type="text"
            id="phone"
            name="phone"
          />
        </p>
      </div>
    </div>
    <button class="button" type="submit">Сохранить</button>
  </form>
</template>
<script>
import {HTTP} from '../../src/axios.conf'
export default {
  data() {
    return {
      userData: {
        name: "",
        city: "",
        hospital: {
          name: "",
          adress: "",
          phone: "",
        },
      },
    };
  },
  methods: {
    getUserData() {
      this.$emit("loading", true);
      HTTP
        .get('users')
        .then((res) => {
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
    updateUserData() {
      this.$emit("loading", true);
      const formData = new FormData();

      formData.append("name", this.userData.name);
      formData.append("city", this.userData.city);
      formData.append("hospitalName", this.userData.hospital.name);
      formData.append("hospitalAdress", this.userData.hospital.adress);
      formData.append("hospitalPhone", this.userData.hospital.phone || '');

      HTTP
        .post('auth/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
          this.$emit("loading", false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.$emit("show-message", {
            title: "Всё получилось",
            text: "Данные обновлены",
          });
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  width: 600px;
  margin: 0 auto;
  margin-top: 60px;
  padding-bottom: 40px;

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