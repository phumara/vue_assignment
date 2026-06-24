    <template>
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i class="fas fa-bars"></i>
                    </a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/signin" class="nav-link" title="Logout">
                        <i class="fas fa-sign-out-alt"></i>
                    </router-link>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->
    </template>

<script>
import avatar2 from 'admin-lte/dist/img/avatar2.png'
import avatar3 from 'admin-lte/dist/img/avatar3.png'
import avatar4 from 'admin-lte/dist/img/avatar4.png'

export default {
    name: 'Dashboard',
    data() {
        return {
            avatar2,
            avatar3,
            avatar4,
        }
    },
    mounted() {
        document.body.classList.add('hold-transition', 'sidebar-mini')
    },
    beforeUnmount() {
        document.body.classList.remove('hold-transition', 'sidebar-mini')
    },
}
</script>