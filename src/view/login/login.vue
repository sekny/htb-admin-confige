<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <vue-particles color="#dedede"></vue-particles>
    <div class="login-con">
      <Card icon="log-in" :title="$t('login')" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"> {{ $t('fill_useranme_and_password_desc') }} </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapMutations, mapActions } from 'vuex'
// import { Spin } from 'iview'
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
      'setAvatar',
      'setUserName',
      'setUserId',
      'setAccess',
      'setHasGetInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.$Loading.start()
      // Spin.show()
      this.isLoading = true
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }).catch(res => {
        var errorMessage = 'Invalid username or password'
        if (res.response && res.response.data && res.response.data.error) {
          errorMessage = res.response.data.error
        }
        this.$Message.error(errorMessage)
      }).finally(() => {
        // Spin.hide()
        this.$Loading.finish()
        this.isLoading = false
      })
    }
  }
}
</script>
