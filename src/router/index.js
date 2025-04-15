import { createRouter, createWebHistory, createMemoryHistory } from "vue-router"
import TheHomeView from "../views/TheHomeView.vue"

const router = createRouter({
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.VITE_BASE_URL)
    : createWebHistory(import.meta.env.VITE_BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  routes: [
    {
      path: "/",
      name: "home",
      component: TheHomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (TheAboutView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/TheAboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/TheContactView.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/TheHistoryView.vue"),
    },
    {
      path: "/documentation",
      name: "documentation",
      component: () => import("../views/TheDocumentationView.vue"),
    },
    {
      path: "/download",
      name: "download",
      component: () => import("../views/TheDownloadView.vue"),
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("../views/TheFaqView.vue"),
    },
    {
      path: "/user-agreement",
      name: "user-agreement",
      component: () => import("../views/TheUserAgreementView.vue"),
    },
    {
      path: "/page-not-found",
      name: "page-not-found",
      component: () => import("../views/status-pages/ThePageNotFound.vue"),
    },
    {
      path: "/internal-server-error",
      name: "internal-server-error",
      component: () => import("../views/status-pages/TheInternalServerError.vue"),
    },
    {
      // [Vue Router warn]: Discarded invalid param(s) "catchAll" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details
      path: "/:catchAll(.*)",
      redirect: (to) => {
        return {
          name: "page-not-found",
          query: { returnUrl: to.path },
        }
      },
    },
  ],
})

export { router }
