<template>
    <div id="mask">
        <div>
            <div class="left">
                <Input v-model="value11" icon="ios-clock-outline">
                    <span slot="prepend">缓存目录</span>
                    <Button slot="append" icon="ios-search"></Button>
                </Input><br>
                <Input v-model="value1">
                    <span slot="prepend">存储目录</span>
                </Input><br>
                <Input v-model="value">
                    <span slot="prepend">缓存目录</span>
                </Input>
                <br>
            </div>
            <div class="right">

            </div>
        </div>
        <Icon size="30" type="md-close" class="closeButton" color="white" @click="close"/>
    </div>
</template>

<script>
  export default {
    name: 'config',
    props: ['configVisible'],
    data () {
      return {
      }
    },
    methods: {
      close () {
        this.subConfigVisible = false
      }
    },
    computed: {
      subConfigVisible: {
        get: function () {
          return this.configVisible
        },
        // setter
        set: function (newValue) {
          this.$emit('update:configVisible', newValue)
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
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #mask>div {
        overflow-y: scroll;
        border-radius: 5px;
        background-color: #ffffff;
        width: 80%;
        height: 70%;
        padding: 15px 30px;
        display: flex;
        flex-direction: row;
    }
    #mask>div .left, #mask>div .right {
        flex: 1;
    }
    #mask>div::-webkit-scrollbar {
        display: none;
    }
    .closeButton {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
</style>