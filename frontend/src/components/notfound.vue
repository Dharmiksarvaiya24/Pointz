<template>
    <div class="notfound-wrapper">
      <div class="video-container">
        <video autoplay muted loop playsinline class="background-video">
          <source src="../assets/main_back.mp4" type="video/mp4" />
        </video>
        <div class="overlay"></div>
      </div>
  
      <div class="error-box">
  <img src="https://i.postimg.cc/Wzghx0tC/404.png" alt="404 Image" class="error-image" />
  <h1 class="error-heading">404 - Page not found</h1>
  <p class="error-text">Oops! This isn't the web page you're looking for.</p>
  <router-link to="/" class="back-button">Go Back Home</router-link>
</div>

    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound"
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }
  
  .notfound-wrapper {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
  
  /* Error box */
  .error-box {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 3rem 2rem;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  
  .error-image {
    width: 200px;
    margin-bottom: 1.5rem;
  }
  
  .error-heading {
    font-size: 2.2rem;
    background: linear-gradient(90deg, #ff6ec4, #7873f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  
  .back-button {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: linear-gradient(90deg, #ff6ec4, #7873f5);
    color: white;
    font-weight: 600;
    border-radius: 30px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .back-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .error-text {
  font-size: 1.1rem;
  color: #e0e0e0;
  margin-bottom: 2rem;
  line-height: 1.6;
}

  </style>
  