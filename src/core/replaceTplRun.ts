/**
 * @author wh
 * @description 进行模板替换
 */
import type { IExecOptions } from '../types'
import { copyFile, joinPath, removeFileAndDir } from '../utils'

class ReplaceTplRun {
  async apply(options: IExecOptions) {
    const { tpl, callback, projectPath } = options

    const basePath = joinPath(__dirname, `./template/code/${tpl}`)
    // 删除原来src下内容
    removeFileAndDir(joinPath(projectPath, 'src'))
    // 进行文件复制
    copyFile(basePath, joinPath(projectPath, 'src'))

    callback && callback()
  }
}

export default new ReplaceTplRun()
