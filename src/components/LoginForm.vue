<template>
  <div class="modal-mask" v-show="show">
    <div class="modal-wrapper">
      <div class="main-modal">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input 
            type="email" 
            :class="{'form-control': true, 'error': $v.form.email.$error}" 
            placeholder="Enter email" 
            v-model="$v.form.email.$model"
          >
          <div v-if="$v.form.email.$error">
            <small v-if="!$v.form.email.required" class="text-warning">The email is required</small>
            <small v-else-if="!$v.form.email.email" class="text-warning">It should be a valid email</small>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input 
            type="password" 
            :class="{'form-control': true, 'error': $v.form.email.$error}"
            placeholder="Password" 
            v-model="$v.form.password.$model"
          >
          <small v-if="$v.form.password.$error" class="text-warning">The password is required</small>
        </div>
        <button class="btn btn-primary" @click="submitForm">Login</button>
        <button @click="dismiss" class="btn btn-warning">Dismiss</button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  props: ['show'],

  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },

  created () {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.dismiss()
      }
    }

    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', escapeHandler)
  },

  methods: {
    dismiss () {
      this.$emit('close')
    },

    submitForm () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.dismiss()
        alert('login successfull')
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.main-modal {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.error {
  border-color: red;
}
.error:focus {
  border-color: red;
  box-shadow: none;
}
</style>
