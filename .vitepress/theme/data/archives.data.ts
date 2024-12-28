import { generateArchives } from '../../utils/archives'

export default {
  watch: ['blog/**/*.md'],
  load() {
    return generateArchives()
  }
} 