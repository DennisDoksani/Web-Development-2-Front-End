<template>
    <footer class="footer bg-dark text-white mt-5">
        <div class="container py-2">
            <div class="row">
                <div class="col-md-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link text-white">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/#ourservices" class="nav-link text-white">Services</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/#aboutus" class="nav-link text-white">About us</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/#contact" class="nav-link text-white">Contact</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/shop" class="nav-link text-white">Shop</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Company</h5>
                    <ul class="list-unstyled">
                        <li><router-link to="/" class="nav-link text-white">Privacy Policy</router-link>
                        </li>
                        <li><router-link to="/" class="nav-link text-white">Terms of
                                Service</router-link></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Follow Us</h5>
                    <ul class="list-unstyled">
                        <li><a href="https://www.facebook.com/profile.php?id=100007940432160"
                                class="nav-link text-white" target="blank">Facebook</a></li>
                        <li><a href="https://www.instagram.com/ragavanis_department_store?igsh=MWx6djdobDFpc2h2bA==" class="nav-link text-white"
                                target="blank">Instagram</a></li>
                        <li><a href="https://www.tiktok.com/@nikosoikonomopoulos_" class="nav-link text-white"
                                target="blank">Tik Tok</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center py-2">
                <p>&copy; 2025 RAGABANHS Technology. All rights reserved.</p>
                <p>Made with <i><s>love</s></i> a keyboard</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
};
</script>

<style scoped>
.footer {
    width: 100%;
    padding-top: 1.5rem;
}
</style>
