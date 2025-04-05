import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../auth-store.js";

import Home from "../components/Home.vue";
import OurServices from "../components/OurServices.vue";
import AboutUs from "../components/AboutUs.vue";
import Contact from "../components/Contact.vue";
import Checkout from "../components/Checkout.vue";
import MyProfile from "../components/MyProfile.vue";
import Unauthorized from "../components/Unauthorized.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import ProductList from "../components/products/ProductList.vue";
import ProductDetails from "../components/products/ProductDetails.vue";
import ShopList from "../components/products/ShopList.vue";
import CreateProduct from "../components/products/CreateProduct.vue";
import EditProduct from "../components/products/EditProduct.vue";
import CategoryList from "../components/categories/CategoryList.vue";
import CreateCategory from "../components/categories/CreateCategory.vue";
import EditCategory from "../components/categories/EditCategory.vue";
import RoleList from "../components/roles/RoleList.vue";
import CreateRole from "../components/roles/CreateRole.vue";
import EditRole from "../components/roles/EditRole.vue";
import ServiceList from "../components/services/ServiceList.vue";
import CreateService from "../components/services/CreateService.vue";
import EditService from "../components/services/EditService.vue";
import UserList from "../components/users/UserList.vue";
import CreateUser from "../components/users/CreateUser.vue";
import EditUser from "../components/users/EditUser.vue";
import CartView from "../components/shoppingcarts/CartView.vue";
import OrderView from "../components/orders/OrderView.vue";
import UserOrders from "../components/orders/OrdersView.vue";
import OrderList from "../components/orders/OrderList.vue";
import EditOrder from "../components/orders/EditOrder.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/ourservices", component: OurServices },
    { path: "/aboutus", component: AboutUs },
    { path: "/contact", component: Contact },
    { path: "/myprofile", component: MyProfile, meta: { requiresAuth: true } },
    { path: "/forbidden", component: Unauthorized },

    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
      path: "/products",
      component: ProductList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    { path: "/shop", component: ShopList },
    { path: "/products/:id", component: ProductDetails, props: true },
    {
      path: "/createproduct",
      component: CreateProduct,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/editproduct/:id",
      component: EditProduct,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/categories",
      component: CategoryList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/createcategory",
      component: CreateCategory,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/editcategory/:id",
      component: EditCategory,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/roles",
      component: RoleList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/createrole",
      component: CreateRole,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/editrole/:id",
      component: EditRole,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/services",
      component: ServiceList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/createservice",
      component: CreateService,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/editservice/:id",
      component: EditService,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/users",
      component: UserList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/createuser",
      component: CreateUser,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/edituser/:id",
      component: EditUser,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/shoppingcart",
      component: CartView,
      meta: { requiresAuth: true },
    },
    {
      path: "/checkout",
      component: Checkout,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/placedorder/:id",
      component: OrderView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/orders/myorders",
      component: UserOrders,
      meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      component: OrderList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/editorder/:id",
      component: EditOrder,
      props: true,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isLoggedIn) {
      alert("You need to be logged in to access this page.");
      next({ path: "/login" });
    } else if (
      to.matched.some((record) => record.meta.requiresAdmin) &&
      !authStore.isAdmin
    ) {
      alert("You need to be an admin to access this page.");
      next({ path: "/forbidden" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
