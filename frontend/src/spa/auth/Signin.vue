<template>
  <div class="auth-w signin-w">
    <div class="auth-c signin-c">
      <div class="logo-w">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <div class="to-login-w">
        <div class="to-login-c">
          <router-link to="/signin">아이디 비밀번호가 기억나지 않으신가요?</router-link>
        </div>
      </div>
    </div>
    <div class="auth-c signin-c">
      <div class="auth-title-c">
        <h1>Sign in</h1>
      </div>
      <div class="auth-input-w">
        <form v-on:submit.prevent="onSubmit">
          <div class="auth-input-c">
            <font-awesome-icon icon="user-alt"/>
            <input type="text" v-model="id" @keyup="checkId" placeholder="Your id">
          </div>
          <div class="auth-input-c">
            <font-awesome-icon icon="key"/>
            <input type="password" v-model="password" @keyup="checkPw" placeholder="Password">
          </div>
          <p v-if="validationId">{{validationId}}</p>
          <p v-if="validationPw">{{validationPw}}</p>
          <p v-if="errorFromServer">{{errorFromServer}}</p>
          <div class="register-button-w">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import validation from '@/commons/validations/input.validations.js'
export default {
  name: 'signin',
  data() {
    return {
      id: '',
      password: '',
      validationId: '',
      validationPw: '',
      errorFromServer: ''
    }
  },
  created() {
    // console.log(this.$store.getters.getToken)
  },
  methods : {
    checkId() {
      let id = this.id
      if(validation.length(id, 5, 30)) {
        this.validationId = '아이디는 5자 ~ 30자 내외로 입력하세요'
      }
      else this.validationId = '' 
      if(validation.regExp(this.id, '[^\\w]')) this.validationId = '특수 문자는 입력하실 수 없습니다.'
    },
    checkPw() {
      let pw = this.password
      if(validation.length(pw, 8)) {
        this.validationPw = '암호는 8자 이상 입력하세요'
      }
      else this.validationPw = ''
    },
    onSubmit() {
      const baseURI = 'http://localhost:3000';
      this.$http.post(`${baseURI}/signin`, { id: this.id, password: this.password })
      .then(response => {
        this.$store.dispatch('setToken', response.data.token)
        localStorage.setItem('user-token', this.$store.getters.getToken)
        this.$router.push('/')
      })
      .catch(err => {
        this.errorFromServer = err.response.data.msg
      })
    }
  },
}
</script>
<style lang="scss" scoped src="@/assets/scss/auth/auth.scss"></style>
<style lang="scss" scoped src="@/assets/scss/auth/signin.scss"></style>