<style scoped>
.button:active{
  opacity: 0.7;
}
  .button{
    color:#fff;
    border-radius: 5px;
    min-height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 4px 0 rgba(0,0,0,.75);
    border: 2px solid #ddd;
  }
</style>
<template>
  <div @click='onclick()' style="background-color: transparent" class="button">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-button',
    props: {
      disabled: Boolean
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      onclick: function () {
        this.$emit('click')
      }
    }
  }
</script>
