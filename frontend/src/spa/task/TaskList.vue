<template>
  <div class="task-list-w">
    <div class="task-list-c">
      <div class="task-input-w">
        <div class="task-input-c">
          <form v-on:submit.prevent="onSubmit"> 
            <input type="text" v-model='title' @keyup="checkTitle"/>
            <button>
              <font-awesome-icon type="submit" icon="plus"></font-awesome-icon>
            </button>
          </form>
        </div>
      </div>
      <div class="task-validation-p">
        <p>{{validationValue}}</p>
      </div>
      <div class="task-list-p">
        <ul>
          <meer-task v-for="index in 30" :key="index"></meer-task>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import validation from '@/commons/validations/input.validations.js'
import Task from '@/shared-components/Task.vue'
export default {
  name: 'task-list',
  components: {
    'task': Task
  },
  data() {
    return {
      title : '',
      validationValue : '' 
    }
  },
  created () {
  },
  methods : {
    checkTitle(){
      let title = this.title
      if(validation.length(title, 30)) this.validationValue = ''
      else {
        this.validationValue = '30자 이하로 입렵해주세요.'
      } 
    },
    onSubmit() {
      let date = new Date().toLocaleDateString()
      const baseURI = 'http://localhost:3000';
      this.$http.post(
        `${baseURI}/task`,
        { title: this.title, regDate: date },
        {
          headers: {
            'authorization': localStorage.getItem('user-token')
          }
        }
      )
      .then(() => console.log('sever connect OK'))
      .catch(err => {
        if(err.response.data.code == 403) this.$router.push('/signin')
        this.validationValue = 'sever not connect'
      })
    }
  }
  
}
</script>
<style lang="scss" src="@/assets/scss/task/task-list.scss"></style>