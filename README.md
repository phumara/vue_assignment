# Vue Assignment — AdminLTE Admin Dashboard

A Vue 3 + Vite single-page app that wraps the **AdminLTE 3** admin template.
It has Sign In / Sign Up pages and an authenticated layout (Navbar, Sidebar,
Footer, Control Sidebar) around a Dashboard and a Profile page.

> The auth is **UI only** — there is no real backend. Clicking *Sign In* just
> routes you to the dashboard, and *Logout* just routes you back to Sign In.

---

## What the app does

| Area      | Behavior |
|-----------|----------|
| **Sign In**  | Default route (`/`). Submitting routes to the dashboard. Link to Sign Up. |
| **Sign Up**  | Link/button routes back to Sign In. |
| **Navbar**   | Logout button routes back to Sign In. |
| **Dashboard**| Shows summary widgets (New Orders, User Registrations, etc.). |
| **Profile**  | Shows profile information. |

---

## How to build this assignment step by step

Follow these steps to recreate the project from scratch.

### Step 1 — Scaffold a Vue 3 + Vite project

```sh
npm create vue@latest vue_assignment
```

When prompted, you only need a minimal setup (Router can be added manually as
below). Then:

```sh
cd vue_assignment
npm install
```

### Step 2 — Install AdminLTE and its dependencies

AdminLTE 3 is built on Bootstrap 4 and jQuery, so install those too, plus the
icon/checkbox styles the template uses.

```sh
npm install admin-lte@^3.2 bootstrap@^4.6 jquery
npm install vue-router@4
npm install @fortawesome/fontawesome-free icheck-bootstrap
```

### Step 3 — Configure Vite

Edit `vite.config.js` to add the `@` → `src` alias and pre-bundle jQuery:

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  optimizeDeps: { include: ['jquery'] },
})
```

### Step 4 — Load the global styles

Create `src/main.css` and import the fonts, icons and AdminLTE CSS:

```css
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback');
@import url('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
@import '@fortawesome/fontawesome-free/css/all.min.css';
@import 'icheck-bootstrap/icheck-bootstrap.min.css';
@import 'admin-lte/dist/css/adminlte.min.css';
```

### Step 5 — Bootstrap the app in `main.js`

jQuery must be on `window` **before** Bootstrap and AdminLTE load, because both
expect a global `$`/`jQuery`.

```js
import { createApp } from 'vue'
import App from '@/App.vue'
import '@/main.css'
import router from '@/router.js'
import $ from 'jquery'

window.$ = window.jQuery = $
await import('bootstrap/dist/js/bootstrap.bundle.min.js')
await import('admin-lte/dist/js/adminlte.min.js')

createApp(App).use(router).mount('#app')
```

### Step 6 — Set up `index.html`

Give the body the AdminLTE classes and mount point:

```html
<body class="sidebar-mini sidebar-collapse" style="height: auto;">
  <div id="app" wrapper></div>
  <script type="module" src="/src/main.js"></script>
  <link rel="stylesheet" href="/src/main.css"/>
</body>
```

### Step 7 — Build the component folders

Create the following structure under `src/`:

```
src/
├── App.vue
├── main.js
├── main.css
├── router.js
└── components/
    ├── auth/
    │   ├── SignIn.vue
    │   ├── SignUp.vue
    │   └── Profile.vue
    ├── pages/
    │   └── Dashboard.vue
    └── includes/
        ├── Navbar.vue
        ├── Sidebar.vue
        ├── Footer.vue
        └── ControlSidebar.vue
```

### Step 8 — Use named router views in `App.vue`

The authenticated layout is assembled from several **named** `<RouterView>`s so
the same chrome (navbar/sidebar/footer) can wrap any page:

```vue
<template>
  <RouterView name="navbar" />
  <RouterView name="sidebar" />
  <RouterView />            <!-- default: the page -->
  <RouterView name="control_sidebar" />
  <RouterView name="footer" />
</template>
```

### Step 9 — Define the routes (`src/router.js`)

Auth pages render into the default view only. Dashboard/Profile fill all the
named views. A catch-all redirects unknown paths to Sign In.

```js
import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/components/auth/SignIn.vue'
import SignUp from '@/components/auth/SignUp.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import Profile from '@/components/auth/Profile.vue'
import Navbar from '@/components/includes/Navbar.vue'
import Sidebar from '@/components/includes/Sidebar.vue'
import Footer from '@/components/includes/Footer.vue'
import ControlSidebar from '@/components/includes/ControlSidebar.vue'

const routes = [
  { path: '/', name: 'SignIn', component: SignIn },
  { path: '/signin', name: 'signIn', component: SignIn },
  { path: '/signup', name: 'signUp', component: SignUp },
  {
    path: '/dashboard',
    name: 'dashboard',
    components: {
      navbar: Navbar, sidebar: Sidebar, footer: Footer,
      control_sidebar: ControlSidebar, default: Dashboard,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    components: {
      navbar: Navbar, sidebar: Sidebar, footer: Footer,
      control_sidebar: ControlSidebar, default: Profile,
    },
  },
  { path: '/:path(.*)*', redirect: { name: 'SignIn' } },
]

export default createRouter({ history: createWebHistory(), routes })
```

### Step 10 — Wire up the navigation (the "fake auth")

Each page toggles the `body` CSS classes AdminLTE needs, and navigation is done
with the router. For example, `SignIn.vue`:

```vue
<script>
export default {
  name: 'SignIn',
  data() {
    return { email: '', password: '', remember: false }
  },
  mounted() {
    document.body.classList.add('hold-transition', 'login-page')
  },
  beforeUnmount() {
    document.body.classList.remove('hold-transition', 'login-page')
  },
  methods: {
    handleSignIn() {
      this.$router.push('/dashboard')   // no real auth — just navigate
    },
  },
}
</script>
```

- **Sign In form** → `@submit.prevent="handleSignIn"` pushes `/dashboard`.
- **"Sign up an account"** → `<router-link to="/signup">`.
- **Logout (Navbar)** → `<router-link to="/signin">`.
- Dashboard/Profile pages add `sidebar-mini` to the body on `mounted` and remove
  it on `beforeUnmount`.

Paste the AdminLTE markup for each page (login box, sidebar, info boxes, etc.)
from the [AdminLTE docs/demo](https://adminlte.io/themes/v3/) into the matching
component template.

### Step 11 — Run it

```sh
npm run dev
```

Open the printed URL, sign in, and you should land on the dashboard.

---

## Project commands

```sh
npm install      # install dependencies
npm run dev      # start dev server with hot reload
npm run build    # build for production
npm run preview  # preview the production build locally
```

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
(disable Vetur). See the [Vite Configuration Reference](https://vite.dev/config/)
for customizing the build.
