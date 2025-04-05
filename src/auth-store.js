import { defineStore } from "pinia";
import axios from "axios";
import { useCartStore } from "./cart-store";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    username: "",
    token: "",
    id: "",
    role_id: "",
  }),
  getters: {
    isLoggedIn: (state) => !!state.username,
    getToken: (state) => state.token,
    getId: (state) => state.id,
    isAdmin: (state) => state.role_id === "1",
  },
  actions: {
    login(username, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost/users/login", { username, password })
          .then(async (res) => {
            console.log("Login API Response:", res.data); // Debug API response
    
            if (!res.data.id) {
              console.error("API did not return a user ID! Response:", res.data);
              return reject("Invalid login response");
            }
    
            this.$patch({
              username: res.data.username,
              token: res.data.jwt,
              id: res.data.id,
              role_id: res.data.role_id,
              email: res.data.email,
            });
    
            // Store in localStorage
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("token", res.data.jwt);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("role_id", res.data.role_id);
            localStorage.setItem("email", res.data.email);
    
            axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.jwt;
    
            console.log("Login successful! User ID:", res.data.id);
            await this.fetchUserDetails();
    
            resolve();
          })
          .catch((err) => {
            console.error("Login error:", err);
            reject(err);
          });
      });
    }
    ,
    autoLogin() {
      console.log("Auto-Login Running...");
    
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const role_id = localStorage.getItem("role_id");
      const email = localStorage.getItem("email");
    
      console.log("Fetched from localStorage:", { username, token, id, role_id, email });
    
      if (token && username && id && role_id && email) {
        this.$patch({ username, token, id, role_id, email });
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        this.fetchUserDetails();
      } else {
        console.warn("Auto-login skipped: Data missing.");
      }
    },
    logout() {
      this.$reset();
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role_id");
      localStorage.removeItem("email");
      delete axios.defaults.headers.common["Authorization"];
      const cartStore = useCartStore();
      cartStore.setItemCount(0);
      console.log("User logged out successfully.");
    },
    register(username, password, email) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost/users/register", {
            username,
            password,
            email,
            role_id: 2,
          })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.error("Registration error:", err);
            reject(err);
          });
      });
    },
    async fetchUserDetails() {
      if (!this.id) return;
      try {
        const response = await axios.get(`http://localhost/users/${this.id}`);
        this.role_id = response.data.role_id;
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    },
  },
});
