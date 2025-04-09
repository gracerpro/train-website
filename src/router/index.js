import { createRouter, createWebHistory } from "vue-router"
import TheHomeView from "../views/TheHomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
})

export default router
