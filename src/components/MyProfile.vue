<template>
    <section>
        <div class="container">
            <div class="profile-form bg-light p-5 rounded shadow-sm">
                <h2 class="mt-3 mt-lg-5 text-center">My Profile</h2>
                <h5 class="mb-4 text-center">Update your information</h5>
                <form ref="form">
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-person-fill"></i></span>
                        <input type="text" class="form-control" v-model="user.username" placeholder="Username"
                            aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-lock-fill"></i></span>
                        <input type="password" class="form-control" v-model="user.password"
                            placeholder="Enter new password" aria-label="Password" aria-describedby="basic-addon2" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon3"><i class="bi bi-envelope-fill"></i></span>
                        <input type="email" class="form-control" v-model="user.email" placeholder="Email"
                            aria-label="Email" aria-describedby="basic-addon3" />
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" class="btn btn-primary me-md-2" @click="updateUser">Save changes</button>
                        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
                    </div>
                </form>
            </div>
            <div class="profile-form bg-light p-5 rounded shadow-sm">
                <h2 class="mt-3 mt-lg-5 text-center">My Shipping Information</h2>
                <h5 class="mb-4 text-center">Update your information</h5>
                <form ref="form">
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-person-vcard-fill"></i></span>
                        <input type="text" class="form-control" v-model="info.full_name" placeholder="Full Name"
                            aria-label="Full Name" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-crosshair2"></i></span>
                        <input type="text" class="form-control" v-model="info.address" placeholder="Address"
                            aria-label="Address" aria-describedby="basic-addon2" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon3"><i class="bi bi-geo-alt-fill"></i></span>
                        <input type="text" class="form-control" v-model="info.city" placeholder="City" aria-label="City"
                            aria-describedby="basic-addon3" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon4"><i class="bi bi-mailbox2-flag"></i></span>
                        <input type="text" class="form-control" v-model="info.postal_code" placeholder="Postal Code"
                            aria-label="Postal Code" aria-describedby="basic-addon4" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon5"><i class="bi bi-pin-map"></i></span>
                        <input type="text" class="form-control" v-model="info.country" placeholder="Country"
                            aria-label="Country" aria-describedby="basic-addon5" />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text" id="basic-addon6"><i class="bi bi-telephone-fill"></i></span>
                        <input type="text" class="form-control" v-model="info.phone_number" placeholder="Phone Number"
                            aria-label="Phone Number" aria-describedby="basic-addon6" />
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" class="btn btn-primary me-md-2" @click="updateInfo">Save changes</button>
                        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../auth-store';

export default {
    name: 'MyProfile',
    data() {
        return {
            user: {
                id: 0,
                username: '',
                password: null,
                email: '',
                role_id: 1,
            },
            info: {
                full_name: '',
                address: '',
                city: '',
                postal_code: '',
                country: '',
                email: '',
                phone_number: ''
            }
        };
    },
    created() {
        this.fetchShippingDetails();
    },
    methods: {
        updateUser() {
            let data = {
                username: this.user.username,
                email: this.user.email,
                role_id: this.user.role_id,
            };

            if (this.user.password) {
                data.password = this.user.password;
            }

            axios
                .put(`http://localhost/users/${this.user.id}`, data)
                .then((response) => {
                    console.log(response.data);
                    this.$refs.form.reset();
                    this.user.password = null;
                    alert('Profile updated successfully!');
                    const authStore = useAuthStore();
                    authStore.fetchUserDetails();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Failed to update profile.');
                });
        },
        updateInfo() {
            let data = {
                full_name: this.info.full_name,
                address: this.info.address,
                city: this.info.city,
                postal_code: this.info.postal_code,
                country: this.info.country,
                phone_number: this.info.phone_number,
            };

            axios
                .put(`http://localhost/shippinginfo/${this.user.id}`, data)
                .then((response) => {
                    console.log(response.data);
                    this.$refs.form.reset();
                    alert('Shipping info updated successfully!');
                    this.fetchShippingDetails();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Failed to update shipping info.');
                });
        },
        cancel() {
            this.$router.push('/');
        },
        async fetchShippingDetails() {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost/shippinginfo/user/${userId}`);
                    const info = response.data;
                    this.info = info;
                } catch (error) {
                    console.error('Error fetching info details:', error);
                }
            } else {
                console.error('userId ID not provided.');
            }
        },
    },
    mounted() {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
            this.user.id = authStore.getId;
            this.user.username = authStore.username;
            this.user.email = authStore.getToken;
            this.user.role_id = authStore.isAdmin ? "1" : "2";
            axios
                .get(`http://localhost/users/${this.user.id}`)
                .then((response) => {
                    this.user = { ...this.user, ...response.data };
                })
                .catch((error) => console.log(error));
        }
    },
};
</script>

<style scoped>
.profile-form {
    max-width: 600px;
    margin: 0 auto;
}

.input-group-text {
    background-color: #0d6efd;
    color: white;
}

.btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

.input-group-text i {
    font-size: 1.2rem;
}

.container {
    display: flex;
}

.profile-form {
    width: 800px;
}
</style>