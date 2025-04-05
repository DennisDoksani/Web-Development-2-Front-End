<template>
    <div class="contact-us mt-5">
        <div class="row">
            <div class="col-lg-6">
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out to us. We would love to hear from you!</p>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" v-model="form.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="email" v-model="form.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="company" class="form-label">Company</label>
                        <input type="text" class="form-control" id="company" v-model="form.company">
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" id="message" v-model="form.message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
            <div class="col-lg-6">
                <div class="contact-info mt-5 mt-lg-0">
                    <h3>Get in Touch</h3>
                    <p>We are available for you 24/7.</p>
                    <div class="contact-details">
                        <p><strong>Address:</strong> Greece, Πάτρας Πύργου 65, Κάτω Αχαΐα 252 00, Greece</p>
                        <p><strong>Phone:</strong> +302693024098</p>
                        <p><strong>Email:</strong> info@rag365.gr</p>
                    </div>
                    <div class="map mt-4">
                        <img src="/ragabanhs.png" alt="Map" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact",
    data() {
        return {
            form: {
                name: '',
                email: '',
                company: '',
                message: ''
            }
        };
    },
    methods: {
        submitForm() {
            alert(`Contact Form submitted!\nName: ${this.form.name}\nEmail: ${this.form.email}\nCompany: ${this.form.company}\nMessage: ${this.form.message}`);
            this.form.name = '';
            this.form.email = '';
            this.form.company = '';
            this.form.message = '';
        }
    }
};
</script>

<style scoped>
.contact-info {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.contact-details p {
    margin: 0;
    margin-bottom: 10px;
}

.map img {
    width: 100%;
    border-radius: 8px;
}
</style>