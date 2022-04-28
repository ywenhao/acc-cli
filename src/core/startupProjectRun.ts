/**
 * @author wh
 * @description 表示启动项目
 */
import type { IExecOptions } from '../types'
import { runCommand } from '../utils'

class StartupProjectRun {
  /**
   * @author wh
   * @description 项目入口
   * @param options
   */
  async apply(options: IExecOptions) {
    const { tool, projectPath, callback } = options

    await runCommand(tool, ['dev'], { cwd: projectPath })
    callback && callback()
  }
}

export default new StartupProjectRun()
