<template>
    <div id="mask">
        <div>
            <div class="left">
                <Input v-model="config.cache_path" class="inputOuterBox">
                    <span slot="prepend">缓存目录</span>
                    <Button slot="append" icon="ios-folder"></Button><Icon type="ios-folder-outline" />
                </Input><br>
                <Input v-model="config.destination_path" class="inputOuterBox">
                    <span slot="prepend">存储目录</span>
                <Button slot="append" icon="ios-folder-outline"></Button>
                </Input><br>
                <Input v-model="config.download_num" max="20" class="inputOuterBox">
                    <span slot="prepend">并行下载数目</span>
                </Input>
            </div>
            <div class="right">

            </div>
        </div>
        <Icon size="30" type="md-close" class="closeButton" color="white" @click="close"/>
    </div>
</template>

<script>
  import configOptions from '../config/index'

  export default {
    name: 'config',
    props: ['configVisible'],
    data () {
      return {
        config: configOptions
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
    },
    mounted () {
      if (!localStorage.getItem('init')) {
        localStorage.setItem('init', '1')
        Object.keys(this.config).forEach((item) => {
          localStorage.setItem(item, this.config[item])
        })
      }
    },
    watch: {
      config: {
        handler (curVal) {
          Object.keys(curVal).forEach((item) => {
            localStorage.setItem(item, curVal[item])
          })
        },
        deep: true
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
        z-index: 1001;
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
        -webkit-app-region: no-drag !important;
    }
    .inputOuterBox {
        overflow: hidden;
    }
</style>
