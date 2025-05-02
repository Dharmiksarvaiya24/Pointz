<template>
    <div class="pointz-app">
      <div class="video-container">
        <video autoplay muted loop playsinline class="background-video">
          <source src="../assets/main_back.mp4" type="video/mp4" />
        </video>
        <div class="overlay"></div>
      </div>
  
      <div class="container">
        <header>
          <div class="logo-container">
            <img src="https://i.postimg.cc/SRWwBK4D/main-page.png" alt="Pointz Logo" class="logo" />
          </div>
          <h1 class="main-heading">Welcome to Pointz</h1>
          <p class="tagline">Reward yourself for everyday achievements</p>
        </header>
  
        <div class="content-card">
          <div class="card-content features">
            <div class="feature">
              <div class="feature-icon">
                <img src="https://i.postimg.cc/D0MXK7c4/main1.png" alt="Reward Icon" />
              </div>
              <p>Earn points as rewards for your everyday actions</p>
            </div>
  
            <div class="feature">
              <div class="feature-icon">
                <img src="https://i.postimg.cc/rFs1ZP9t/main2.png" alt="Gift Icon" />
              </div>
              <p>Turn achievements into exciting benefits and lifestyle upgrades</p>
            </div>
  
            <div class="feature">
              <div class="feature-icon">
                <img src="https://i.postimg.cc/CLcvz8cb/main3.png" alt="Chart Icon" />
              </div>
              <p>From fitness to finance, Pointz motivates positive habits</p>
            </div>
          </div>
  
          <div class="cta-section">
            <p class="cta-text">Start earning, start growing — your better lifestyle begins now!</p>
            <button @click="redirectToLogin" class="cta-button">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "main",
    methods: {
      redirectToLogin() {
        this.$router.push("/signup");
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }
  
  .pointz-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
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
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    z-index: 1;
  }
  
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .logo-container {
    margin-bottom: 1rem;
  }
  
  .logo {
    height: 150px;
    object-fit: contain;
  }
  
  .main-heading {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #ff6ec4, #7873f5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
   
  }
  
  .tagline {
    font-size: 1.2rem;
    color: white;
    font-weight: 300;
    letter-spacing: 1px;
  }
  
  .content-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .card-content {
    padding: 2.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .card-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .feature-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .feature p {
    color: white;
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .cta-section {
    grid-column: span 3;
    text-align: center;
    padding-top: 2rem;
    
    padding-bottom: 2rem;
  }
  
  .cta-text {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .cta-button {
    background: linear-gradient(90deg, #ff6ec4, #7873f5);
    color: white;
    border: none;
    padding: 0.8rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .cta-button:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .main-heading {
      font-size: 2.5rem;
    }
  
    .card-content {
      padding: 1.5rem;
      grid-template-columns: 1fr;
    }
  
    .cta-section {
      grid-column: span 1;
    }
  }
  
  @media (max-width: 480px) {
    .main-heading {
      font-size: 2rem;
    }
  
    .tagline {
      font-size: 1rem;
    }
  
    .feature-icon {
      width: 50px;
      height: 50px;
    }
  }
  </style>
  