<template>
    <div class="login-page" style="min-height: 462.604px;">
        <div class="login-box">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <a href="#" class="h1"><b>Admin</b>LTE</a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Sign in to start your session</p>

                    <form @submit.prevent="handleSignIn">
                        <div class="input-group mb-3">
                            <input v-model="email" type="email" class="form-control" placeholder="Email" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input v-model="password" type="password" class="form-control" placeholder="Password" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input v-model="remember" type="checkbox" id="remember" />
                                    <label for="remember">Remember Me</label>
                                </div>
                            </div>
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </div>
                    </form>


                    <p class="mb-1">
                        <a href="#">I forgot my password</a>
                    </p>
                    <p class="mb-0">
                        <router-link to="/signup" class="text-center">Sign up an account</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            password: '',
            remember: false,
        }
    },
    mounted() {
        document.body.classList.add('hold-transition', 'login-page')
    },
    beforeUnmount() {
        document.body.classList.remove('hold-transition', 'login-page')
    },
    methods: {
        handleSignIn() {
            this.$router.push('/dashboard')
        },
    },
}
</script>
