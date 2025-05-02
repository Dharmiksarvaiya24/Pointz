<template>
    <div class="video-container">
      <video autoplay muted loop playsinline class="background-video">
        <source src="../assets/main_back.mp4" type="video/mp4" />
      </video>
      <div class="overlay"></div>
    </div>
    
    
    <div class="signup-wrapper">
        <div class="image-container">
      <img src="https://i.postimg.cc/X79jWVxM/signup.png" alt="Signup Image" class="top-logo" />
    </div>
      <h1 class="heading">Signup</h1>
      <h1 class="sub-heading">Let’s get you started with Pointz!</h1>
      <form @submit.prevent="submitForm" class="signup-form">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Enter your username"
        />
  
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
        />
  
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
  
        <button type="submit">Sign Up</button>
  
        <p class="login-link">
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
  
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "Signup",
    data() {
      return {
        username: "",
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
            username: this.username,
            email: this.email,
            password: this.password,
          });
  
          this.errorMessage = "";
          alert("Signup Successful!");
          this.$router.push(`/dashboard/${this.username}`);
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "Something went wrong!";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");
  
  * {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
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
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.4)
    );
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

  
  .signup-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    z-index: 1;
  }
  
  .heading {
    font-size: 2.5rem;
    font-weight: 600;
    background: linear-gradient(90deg, #ff6ec4, #7873f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
   
    text-align: center;
  }
  .sub-heading {
    font-size: 1rem;
    font-weight: 400;
    color: #ddd;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .signup-form {
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
  
  .signup-form label {
    text-align: left;
    font-size: 0.95rem;
  }
  
  .signup-form input {
    padding: 0.75rem;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .signup-form input::placeholder {
    color: #ddd;
  }
  
  .signup-form button {
    background: linear-gradient(90deg, #ff6ec4, #7873f5);
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-top: 0.5rem;
  }
  
  .signup-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  .login-link {
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  
  .login-link a {
    color: #ff99cc;
    font-weight: 500;
    text-decoration: none;
  }
  
  .error-message {
    color: #ff4d4d;
    font-size: 1rem;
    margin-top: 1rem;
  }
  </style>
    