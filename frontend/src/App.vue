<template>
  <div>
    <router-view></router-view> 
  </div>
</template>


<script>
import login from "./components/login.vue"; 
import Signup from "./components/signup.vue";
import dashboard from "./components/dashbord.vue";


export default { 
  components: {
    login, 
    Signup,
    dashboard,
  },
};
</script>
