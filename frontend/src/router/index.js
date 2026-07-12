import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { guestOnly: true }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: { guestOnly: true }
  },
  {
    path: "/",
    name: "products",
    component: () => import("../views/ProductListView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/products/new",
    name: "product-create",
    component: () => import("../views/ProductCreateView.vue"),
    meta: { requiresAuth: true, roles: ["owner"] }
  },
  {
    path: "/rentals",
    name: "rentals",
    component: () => import("../views/RentalHistoryView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "products" };
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.role)) {
    return { name: "products" };
  }

  return true;
});

export default router;
