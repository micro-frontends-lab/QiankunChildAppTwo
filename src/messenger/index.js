// @micro 创建messenger，供应用间通信使用。

import { name } from '../../package.json'
import messenger from '@bingo-micro/messenger'

export default messenger(name)
