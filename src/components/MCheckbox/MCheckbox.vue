<template>
  <div>
    <label v-for="(option, idx) of options" :key="idx" class="lb-wrp" :class="{on: (checked.indexOf(String(option.value)) > -1)}" :style="{display: display}">
      <input type="checkbox" :value="option.value" @click="onSelect($event)"/>{{option.name}}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'm-checkbox',
    props: {
      options: {
        type: [Array, Object],
        required: true,
      },
      defaultOption: {
        type: Array,
        default(){
          return [];
        },
      },
      display: {
        type: String,
        default: 'inline-block',
      },
    },
    data(){
      return {
        checked: [],
      };
    },
    mounted(){
      this.checked = this.defaultOption;
    },
    methods: {
      onSelect(event){
        const val = event.target.value;
        const index = this.checked.indexOf(val);

        if(index > -1){
          this.checked.splice(index, 1);
        }else{
          this.checked.push(val);
        }
        this.$emit('input', this.checked);
      },
    },
  }
</script>

<style lang="less" scoped>
  .lb-wrp{
    position: relative;
    margin-right: 10px;
    padding-left: 22px;
    vertical-align: middle;
    font-size: 16px;
    background: url("/static/images/components/nocheck_square.png") no-repeat left center;
    background-size: 20px 20px;

    input{
      position: absolute;
      opacity: 0;
    }
    &.on{
      background: url("/static/images/components/check_square.png") no-repeat left center;
      background-size: 20px 20px;
    }
  }
</style>
