<template>
  <div class="alert">
    <div style="width:90vw;min-height:30vh;border:1px solid #ddd;border-radius: 2%;display:flex;align-items: center;justify-content: space-around;flex-direction: column;background-color:#000">
      <div style="color:#ddd">
        重要提示
      </div>
      <div style="display: flex;flex-direction: column;justify-content: space-around;min-height:10vh;">
        <div style="text-align: left;width:80vw;color:#ddd">
          {{textAlert}}
        </div>
        <div style="color:#e4393c;text-align: left;width:80vw;">
          {{textWarning}}
        </div>
      </div>
      <div style="width:90vw;display:flex;justify-content: space-around">
        <my-button style="width:40vw;height:6vh" @click="isEquip()">替换</my-button>
        <my-button style="width:40vw;height:6vh" @click="notEquip()">保留</my-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import MyButton from '@/components/MyButton'
  Vue.component(MyButton.name, MyButton)

  export default {
    name: 'my-alert',
    props: {
      textAlert: String,
      textWarning: String
    },
    data () {
      return {}
    },
    created: function () {

    },
    methods: {
      isEquip: function () {
        this.$emit('isEquip')
      },
      notEquip: function () {
        this.$emit('notEquip')
      }
    }
  }
</script>

<style scoped>
  .alert{
    width:100vw;
    height:100vh;
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    background-color:rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
