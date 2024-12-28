import { generateTags } from '../../utils/tags'

// 使用异步数据加载
export default {
  // watch 指定要监听变化的文件
  watch: ['blog/**/*.md'],
  // load 返回数据
  load() {
    return generateTags()
  }
} 