<template>
  <div class="app-container">
    <!-- Background video with overlay -->
    <div class="video-container">
      <video autoplay muted loop playsinline class="background-video">
        <source src="../assets/main_back.mp4" type="video/mp4" />
      </video>
      <div class="overlay"></div>
    </div>

    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-left">
        <h2 class="dashboard-heading">Welcome to Pointz</h2>
      </div>
      <div class="navbar-right">
        <div class="user-section">
          <div class="history" @click="toggleHistory">
            <img src="../assets/history.png" alt="History" style="width: 20px; height: 20px;" />
          </div>
          <img src="../assets/user.png" alt="User" class="user-avatar" @click="toggleUserMenu" />
          <span class="welcome-label">{{ userName }}</span>
        </div>
    
      </div>
    </header>

    <!-- User menu overlay -->
    <transition name="fade">
      <div v-if="userMenuVisible" class="user-menu-overlay" @click.self="toggleUserMenu">
        <div class="user-menu">
          <div class="user-menu-header">
            <div class="user-menu-avatar">
              <img src="../assets/user.png" alt="User" />
            </div>
            <div class="user-menu-info">
              <h3>{{ userName }}</h3>
              <p>Dashboard Manager</p>
            </div>
          </div>
          
          <div class="user-menu-divider"></div>
          
          <div class="user-menu-options">
            <div class="user-menu-option" @click="showModal = true; toggleUserMenu()">
              <div class="option-icon add-user-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="19" y1="8" x2="19" y2="14"></line>
                  <line x1="16" y1="11" x2="22" y2="11"></line>
                </svg>
              </div>
              <div class="option-text">
                <h4>Add User</h4>
                <p>Create a new participant</p>
              </div>
            </div>
            
            <div class="user-menu-option" @click="showRewardModal = true; toggleUserMenu()">
              <div class="option-icon add-reward-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div class="option-text">
                <h4>Add Reward</h4>
                <p>Create a new reward</p>
              </div>
            </div>
          </div>
          
          <div class="user-menu-footer">
            <button class="logout-menu-btn" @click="logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- History overlay -->
    <div v-if="historyVisible" class="history-overlay" @click.self="toggleHistory">
      <div class="history-panel">
        <h3>History </h3>
        <div class="history-list">
          <div v-if="historyItems.length === 0" class="empty-history">
            This feature is comming soon !
          </div>
          <div v-for="(item, index) in historyItems" :key="index" class="history-item">
            <div class="history-time">{{ item.time }}</div>
            <div class="history-action">{{ item.action }}</div>
          </div>
        </div>
        <button class="close-history" @click="toggleHistory">Close</button>
      </div>
    </div>

    <!-- Main content -->
    <main class="main-section">
      <div class="user-container">
        <h2 class="user-list-heading">Participations</h2>
        <div v-if="users.length === 0" class="empty-state">
          <p>Add user by taping on profile</p>
        </div>
        <div v-else class="user-cards">
          <UserCard
            v-for="user in users"
            :key="user._id"
            :user="user"
            @user-updated="updateUser"
          />
        </div>
      </div>

      <div class="user-container">
        <h2 class="user-list-heading">Rewards</h2>
        <div v-if="rewards.length === 0" class="empty-state">
          <p>Add Rewards by taping on profile</p>
        </div>
        <div v-else class="user-cards">
          <div v-for="(reward, index) in rewards" :key="index" class="reward-card">
            {{ reward }}
          </div>
        </div>
      </div>
    </main>

    <!-- Add User Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Add New User</h2>
        <input type="text" v-model="newuser" placeholder="Enter username" />
        <button @click="saveUser">Save</button>
      </div>
    </div>

    <!-- Add Reward Modal -->
    <div v-if="showRewardModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showRewardModal = false">&times;</span>
        <h2>Add New Reward</h2>
        <input type="text" v-model="newReward" placeholder="Enter reward name" />
        <button @click="saveReward">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserCard from "./usercard.vue";

export default {
  components: { UserCard },
  data() {
    return {
      userName: this.$route.params.username || "Guest",
      showModal: false,
      newuser: "",
      users: [],
      showRewardModal: false,
      newReward: "",
      rewards: [],
      userMenuVisible: false,
      historyVisible: false,
      historyItems: []
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    toggleUserMenu() {
      this.userMenuVisible = !this.userMenuVisible;
    },
    toggleHistory() {
      this.historyVisible = !this.historyVisible;
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        this.users = response.data;
      } catch (error) {
        alert("Failed to fetch users. Please try again.");
      }
    },
    async saveUser() {
      if (!this.newuser.trim()) {
        alert("Username cannot be empty.");
        return;
      }
      try {
        await axios.post("http://localhost:3000/newuser", { username: this.newuser });
        this.newuser = "";
        this.showModal = false;
        await this.fetchUsers();
        
        alert("User added successfully!");
      } catch (error) {
        alert("User limit reached. Only 2 users allow");
      }
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u._id === updatedUser._id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        
      }
    },
    
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
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
  filter: blur(5px) brightness(0.8);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.45));
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  margin: 1.5rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.dashboard-heading {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(255, 110, 196, 0.2);
}

.navbar-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.history {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.history:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.6);
}

.welcome-label {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}



/* Enhanced User Menu Styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.user-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.user-menu {
  background: rgba(15, 15, 20, 0.9);
  width: 350px;
  max-width: 90%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 
              0 0 0 1px rgba(255, 255, 255, 0.1),
              0 0 30px rgba(120, 115, 245, 0.2);
  animation: menu-glow 3s infinite alternate;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

@keyframes menu-glow {
  0% {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 
                0 0 0 1px rgba(255, 255, 255, 0.1),
                0 0 30px rgba(120, 115, 245, 0.2);
  }
  100% {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 
                0 0 0 1px rgba(255, 255, 255, 0.1),
                0 0 50px rgba(255, 110, 196, 0.3);
  }
}

.user-menu-header {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.user-menu-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(255, 110, 196, 0.3);
}

.user-menu-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-menu-info h3 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.user-menu-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.user-menu-divider {
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0), 
    rgba(255, 255, 255, 0.1), 
    rgba(255, 255, 255, 0));
  margin: 0.5rem 0;
}

.user-menu-options {
  padding: 1rem;
}

.user-menu-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-menu-option:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.option-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.add-user-icon {
  background: linear-gradient(135deg, #ff6ec4, #7873f5);
  box-shadow: 0 5px 15px rgba(255, 110, 196, 0.2);
}

.add-reward-icon {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  box-shadow: 0 5px 15px rgba(56, 249, 215, 0.2);
}


.option-text h4 {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.option-text p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
}

.user-menu-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.logout-menu-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.logout-menu-btn:hover {
  background: rgba(255, 87, 108, 0.2);
  box-shadow: 0 0 20px rgba(255, 87, 108, 0.3);
  transform: translateY(-2px);
}

.main-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 1rem 2rem 2rem;
  flex: 1;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
}

.user-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  color: white;
  flex: 1 1 400px;
  max-width: 800px;
  height: calc(100vh - 150px);
  overflow-y: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.user-list-heading {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #a1c4fd, #c2e9fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  position: sticky;
  top: 0;
  padding: 0.5rem 0;
  z-index: 1;
}

.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  padding-bottom: 1rem;
}

.reward-card {
  background: rgba(255, 255, 255, 0.15);
  padding: 1.2rem 1.5rem;
  border-radius: 15px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  min-width: 150px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  backdrop-filter: blur(5px);
}

.reward-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.empty-state p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.add-btn {
  background: linear-gradient(90deg, #f093fb, #f5576c);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: rgba(30, 30, 30, 0.8);
  padding: 2.5rem;
  border-radius: 20px;
  width: 350px;
  color: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.modal-content h2 {
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-content input {
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  border: none;
  border-radius: 10px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  font-size: 1rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.modal-content input:focus {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.modal-content button {
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(90deg, #43e97b, #38f9d7);
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.modal-content button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(56, 249, 215, 0.4);
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.close:hover {
  transform: scale(1.2);
  color: #ff6ec4;
}

/* History panel styles */
.history-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.history-panel {
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 15px;
  width: 400px;
  max-width: 90%;
  max-height: 80vh;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
}

.history-panel h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(90deg, #a1c4fd, #c2e9fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.history-list {
  overflow-y: auto;
  max-height: 50vh;
  margin-bottom: 1.5rem;
}

.history-item {
  padding: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.history-time {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.history-action {
  font-size: 1rem;
}

.empty-history {
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.close-history {
  align-self: center;
  background: linear-gradient(90deg, #43e97b, #38f9d7);
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.close-history:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(56, 249, 215, 0.4);
}

/* Custom scrollbar for containers */
.user-container::-webkit-scrollbar,
.history-list::-webkit-scrollbar {
  width: 8px;
}

.user-container::-webkit-scrollbar-track,
.history-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.user-container::-webkit-scrollbar-thumb,
.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.user-container::-webkit-scrollbar-thumb:hover,
.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    margin: 1rem;
    padding: 1rem 1.5rem;
  }
  
  .main-section {
    padding: 1rem;
  }
  
  .user-container {
    height: auto;
    max-height: 500px;
  }
  
  .dashboard-heading {
    font-size: 1.4rem;
  }
  
  .welcome-label {
    display: none;
  }
  
  .user-menu {
    width: 300px;
  }
}

@media (max-width: 480px) {
  .navbar-left, .navbar-right {
    width: 100%;
    justify-content: center;
  }
  
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .user-container {
    padding: 1.5rem;
  }
  
  .user-menu-header {
    padding: 1.5rem;
  }
  
  .user-menu-option {
    padding: 0.8rem;
  }
}
</style>

