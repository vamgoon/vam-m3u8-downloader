// import request from 'request'
// import mapLimit from 'async/mapLimit'
import {getNameFromUrl, getSuffixFromUrl} from './utils'
export default (file = {
  url: '',
  path: '',
  name: ''
}, callback) => {
  let fileName = file.name || getNameFromUrl(file.url)
  
}
