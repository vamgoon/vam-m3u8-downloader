<template>
    <div id="mask" @click="close">

    </div>
</template>

<script>
  export default {
    name: 'config',
    props: ['configVisible'],
    methods: {
      close() {
        this.configVisible = false
        this.$emit('update:configVisible')
      }
    },
    computed: {
      subConfigVisible: {
        get: function () {
          return this.dialogVisible;
        },
        // setter
        set: function (newValue) {
          this.$emit('update:dialogVisible', newValue);
        }
      }
    }
  }
</script>

<style scoped>
    #mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55,55,55,.6);
        height: 100%;
        z-index: 1000;
    }
</style>