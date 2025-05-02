<template>
  <div class="video-container">
    <video autoplay muted loop playsinline class="background-video">
      <source src="../assets/main_back.mp4" type="video/mp4" />
    </video>
    <div class="overlay"></div>
  </div>

  <div class="login-wrapper">
    <div class="image-container">
      <img src="https://i.postimg.cc/g29xyStp/login.png" alt="Signup Image" class="top-logo" />
    </div>  
    <h1 class="heading">Login</h1>
    <h2 class="sub-heading">Good to see you ,Welcome back!</h2>

    <form @submit.prevent="submitForm" class="login-form">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required placeholder="Enter your username" />

      <label for="email">Email:</label>
      <input type="email" v-model="email" required placeholder="Enter your email" />

      <label for="password">Password:</label>
      <input type="password" v-model="password" required placeholder="Enter your password" />

      <button type="submit">Login</button>

      <p class="signup-link">
        Don’t have an account? <router-link to="/signup">Sign Up</router-link>
      </p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          username: this.username,
          email: this.email,
          password: this.password
        });

        this.errorMessage = "";
        alert("Login Successful!");
        this.$router.push(`/dashboard/${this.username}`);
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Invalid user!";
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(4px);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4));
}

.login-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1;
  text-align: center;
}
.image-container {
  margin-bottom: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-logo {
  width: 20vw;   
  max-width: 150px;
  min-width: 60px;
  height: auto;
}


.heading {
  font-size: 2.5rem;
  font-weight: 600;
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sub-heading {
  color: white;
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.login-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white;
}

.login-form label {
  text-align: left;
  font-size: 0.95rem;
}

.login-form input {
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.login-form input::placeholder {
  color: #ddd;
}

.login-form button {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.signup-link {
  font-size: 0.9rem;
  margin-top: 1rem;
}

.signup-link a {
  color: #ff99cc;
  font-weight: 500;
  text-decoration: none;
}

.error-message {
  color: #ff4d4d;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
</style>
