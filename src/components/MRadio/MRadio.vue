<template>
  <div>
    <label>
      <input type="radio" :name="name"/>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'm-radio',
    props: {
      name: {
        type: String,
        default: '',
      }
    },
  }
</script>

<style scoped>

</style>
