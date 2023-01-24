import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListView from "../views/ListingView.vue";
import AddUserView from "../views/AddUserView.vue";
import EditView from "../views/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/edit/:id",
      name: "Edit User",
      component: EditView
    },
    {
      path: "/list",
      name: "List",
      component: ListView
    },
    {
      path: "/add-user",
      name: "Add User",
      component: AddUserView
    }
  ],
});

export default router;
