<template>
    <Table border height="570" size="small" :columns="downloadTableCols" :data="downloadData"></Table>
</template>
<script>
  import {stdownload} from '../utils/download'
  import {formatFileName} from '../utils/utils'
  import async from 'async'
  import config from '../config'
  export default {
    data () {
      return {
        downloadTableCols: [
          {
            title: '编号',
            type: 'index',
            align: 'center'
          },
          {
            title: '文件名',
            key: 'fileName',
            align: 'center'
          },
          {
            title: '片段时长(S)',
            key: 'fileTime',
            align: 'center'
          },
          {
            title: '片段大小(KB)',
            key: 'fileSize',
            align: 'center'
          },
          {
            title: '已下载(KB)',
            key: 'downloadSize',
            align: 'center'
          },
          {
            title: '进度',
            align: 'center',
            render: (h, params) => {
              return h('Progress', {
                props: {
                  percent: this.downloadData[params.index].progress
                }
              })
            }
          },
          {
            title: '功能',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                }, '停止'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '下载')
              ])
            }
          }
        ],
        downloadData: [
          {
            fileName: '0003.ts',
            fileTime: 18,
            fileSize: 2048,
            downloadSize: 1024,
            progress: 99.99
          }
        ]
      }
    },
    methods: {
      download (arr, cb) {
        let index = -1
        async.mapLimit(arr, config.download_num, (item, callback) => {
          index++
          this.$set(this.downloadData, index, {
            fileName: formatFileName(index) + '.ts',
            fileTime: 18,
            fileSize: 2048,
            downloadSize: 1024,
            progress: 0
          })
          stdownload.downloadFile(index, arr, cb).then(() => {
            callback()
          })
        })
      },
      downloadCallback (msg, index, value) {
        switch (msg) {
          case 'progress':
            this.downloadData[index].progress = parseInt(value)
            break
          case 'totalBytes':
            this.downloadData[index].fileSize = value
            break
          case 'receivedBytes':
            this.downloadData[index].downloadSize = value
            break
          default:
            console.log(3333)
        }
      }
    },
    mounted () {
      this.$eHub.$on('download', (arr) => {
        // console.log(index, arr)
        this.download(arr, this.downloadCallback)
      })
    }
  }
</script>

<style scoped>
</style>
