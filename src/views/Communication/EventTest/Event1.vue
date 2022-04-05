<template>
  <div>
      event1 组件3333
      <button @click="event1Emit">event1 组件</button>
  </div>
</template>

<script>


export default {
  name: 'Event1',
  methods:{
    event1Emit(){
       this.$emit('click',{name:'hello'})
    }
  }
}
</script>
