<template>
  <div>
     <router-link to="/event">去eventtest页面</router-link>
     <router-link to="/model">去modeltestt页面</router-link>
     <router-link to="/sync">去synctest页面</router-link>
     <router-link to="/attrs-listennersTest">去attrs-listennersTest页面</router-link>
     <router-link to="/children-parentTest">去children-parentTest页面</router-link>
     <router-link to="/scope-slottest">去scope-slottest页面</router-link>
     <router-view />
  </div>
</template>

<script>

export default {
  name: 'Communication',
  
}
</script>
