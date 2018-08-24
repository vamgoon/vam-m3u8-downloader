<template>
    <div class="log-area" ref="logBox">
        <p v-for="item in logData">{{item}}</p>
    </div>
</template>

<script>
  export default {
    name: 'vam-log',
    props: ['logData'],
    methods: {
      scrollToTop () {
        let lb = this.$refs.logBox
        this.$nextTick(() => {
          lb.scrollTop = lb.scrollHeight
        })
      }
    },
    watch: {
      logData: 'scrollToTop'
    }
  }
</script>

<style scoped>
    .log-area {
        width: 100%;
        height: 200px;
        position: fixed;
        left: 0;
        bottom: 40px;
        background-color: rgba(255, 255, 255, 0.9);
        border-top: 1px solid #cccccc;
        overflow-y: scroll;
        padding: 0 10px;
    }
    .log-area::-webkit-scrollbar {
        display:none
    }
    p {
        padding: 3px 2px;
    }
</style>
