<template>
  <div>
    <div id="iframe" v-if="show">
      <iframe
        id="getAddress"
        class="map-item"
        @load="loadiframe"
        v-bind:src="reportUrl"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gaode-map',
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        locationData: {}
      }
    },
    created(){
        let lat = window.localStorage.getItem('lat') || '';
        let lon = window.localStorage.getItem('lon') || '';

        this.reportUrl =  'https://m.amap.com/picker/?key=608d75903d29ad471362f8c58c550daf&center='+lon+','+lat;
    },
    methods: {
      loadiframe() {
        let iframe = document.getElementById('getAddress').contentWindow;

        iframe.postMessage('getMap', 'https://m.amap.com/picker/');
        window.addEventListener('message', e => {
          if (e.data.command != "COMMAND_GET_TITLE") {
            this.$emit('on-get-address', e.data);
          }
        }, false);
      },
    }
  }
</script>
<style>
  .map-item {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #fff;
    z-index: 222;
  }
</style>
