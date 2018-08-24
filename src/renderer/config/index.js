import {getHomePath, checkPath} from '../utils/utils'
export default {
  cache_path: localStorage.getItem('cache') || checkPath(getHomePath() + '/cache'),
  destination_path: localStorage.getItem('destination') || checkPath(getHomePath() + '/des'),
  download_num: localStorage.getItem('download_num') || 10
}
