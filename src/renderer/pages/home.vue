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
                    <Input v-model="headerModel.searchValue" size="small" class="search-input">
                        <!--<Button  icon="md-download">下载</Button>-->
                        <Button slot="append" icon="ios-download-outline" type="primary">下载</Button>
                    </Input>
                </Col>
            </Row>
        </header>
        <main>
            <Button @click="mask">mask</Button>
            <config v-if="configVisible" :configVisible.sync="configVisible"></config>
        </main>
    </div>
</template>

<script>
  import Config from '../components/config'
  export default {
    name: 'home',
    data () {
      return {
        headerModel: {
          searchValue: ''
        },
        configVisible: false
      }
    },
    components: {
      Config
    },
    methods: {
      mask () {
        this.configVisible = true
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
    header .input-area {
        height: 60px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    header .search-input {
        overflow: hidden;
        -webkit-app-region: no-drag !important;
        z-index: 1000;
    }
    main {
        flex: 1;
        background-color: #cccccc;
        border: 1px solid #cccccc;
        border-top: 0;
    }
</style>
