<template>
    <div id="wrapper">
        <header>
            <Row>
                <Col span="6" class="logo">
                    <span>
                        VAM下载器
                    </span>
                </Col>
                <Col span="12" class="input-area">
                    <div>
                        <Input v-model="headerModel.searchValue" size="small" class="search-input">
                        </Input>
                        <Button icon="ios-download-outline" size="small" type="error" @click="start">下载</Button>
                    </div>
                </Col>
                <Col span="5" class="config-area">
                    <Row class="icon-area">
                        <Tooltip content="设置" placement="top">
                            <Icon type="ios-cog-outline" size="20" color="white" @click="handleSettingClick"/>
                        </Tooltip>
                        <Tooltip content="日志" placement="top">
                            <Icon type="ios-list-box-outline" size="20" color="white" @click="handleLogClick"/>
                        </Tooltip>
                    </Row>
                </Col>
                <Col span="1">
                    <Icon type="md-close" size="20" color="white" @click="handleCloseClick" class="close-button"/>
                </Col>
            </Row>
        </header>
        <main>
          <download class="download-area"></download>
        </main>
        <footer>
            <div>
                <Input v-model="footerModel.fileName" size="small" class="save-name-input">
                    <span slot="append">.mp4</span>
                </Input>
                <Button icon="ios-download-outline" size="small" type="error">删除</Button>
                <Button icon="ios-download-outline" size="small" type="error">合并</Button>
                <p>视频时长 {{footerModel.totalTime}}</p>
                <p>片段总个数 {{footerModel.totalNumber}}</p>
                <p>已下载个数 0</p>
            </div>
        </footer>
        // 日志drawer
        <transition name="slide-fade">
            <vam-log v-if="showLog" :logData="logData"></vam-log>
        </transition>
        <!--设置界面-->
        <transition name='fade'>
            <config v-if="configVisible" :configVisible.sync="configVisible"></config>
        </transition>
    </div>
</template>

<script>
  import Config from '../components/config'
  import Download from '../components/download'
  import VamLog from '../components/vam-log'
  import {parseM3u8} from '../utils/parseM3u8'
  import {getCurrentTime} from '../utils/utils'
  export default {
    name: 'home',
    data () {
      return {
        headerModel: {
          searchValue: ''
        },
        configVisible: false,
        showLog: true,
        footerModel: {
          totalTime: '00:00',
          totalNumber: 0,
          fileName: ''
        },
        logData: [1, 2, 4, 5]
      }
    },
    components: {
      Config,
      Download,
      VamLog
    },
    methods: {
      start () {
        this.parseM3u8()
      },
      parseM3u8 () {
        let result = parseM3u8(this.headerModel.searchValue)
        result.then((res) => {
          this.footerModel.totalTime = res.totalTime
          this.footerModel.totalNumber = res.totalNumber
          this.$eHub.$emit('download', res.urlList)
        })
      },
      handleSettingClick () { // 显示/隐藏 setting
        this.configVisible = true
      },
      handleLogClick () { // 显示/隐藏log
        this.showLog = !this.showLog
      },
      handleCloseClick () { // 关闭当前window
        // window.close()
        this.logData.push(getCurrentTime() + ' | ' + Math.random().toString())
      }
    }
  }
</script>

<style scoped>
    html, body, div, p, ul, a, li, table, tr, td, header, aside, main, footer {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    header {
        width: 100%;
        height: 60px;
        background-color: #b72712;
        -webkit-app-region: drag;
    }
    header .logo {
        height: 60px;
    }
    header .logo span {
        display: inline-block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #ffffff;
        text-align: center;
        font-size: 20px;
    }
    header .input-area, header .config-area, footer {
        height: 60px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    header .input-area>div, footer>div {
        display: flex;
        overflow: hidden;
    }
    header .input-area>div>button {
        position: absolute;
        z-index: 1000;
        right: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: #b72712;
    }
    header .input-area>div>button:active {
        background-color: #ed4014;
        transition: none;
    }
    header .config-area i {
        cursor: pointer;
        -webkit-app-region: no-drag !important;
    }
    header .icon-area {
        padding: 0 20px;
    }
    header .search-input {
        overflow: hidden;
        -webkit-app-region: no-drag !important;
        z-index: 1000;
    }
    header .close-button {
        position: absolute;
        top: 3px;
        right: 3px;
        cursor: pointer;
        -webkit-app-region: no-drag !important;
    }
    main {
        flex: 1;
        border: 1px solid #cccccc;
        border-top: 0;
    }

    main .download-area {
    }

    footer {
        position: absolute;
        bottom: 0;
        height: 40px;
        width: 100%;
        z-index: 1000;
        background-color: #b72712;
        padding-left: 10px;
    }
    footer .save-name-input {
        width: 50%;
    }
    footer button {
        background-color: #b72712;
        margin-left: 10px;
    }
    footer button:active {
        background-color: #ed4014;
        transition: none;
    }
    footer>div>p {
        height: 24px;
        line-height: 24px;
        color: #ffffff;
        text-align: center;
        flex: 1;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(100%);
        opacity: 0;
    }
</style>
