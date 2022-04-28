import { green, yellow } from 'colors'

const path = require('path')
const fs = require('fs')
const cp = require('child_process')
import type { ICommanderOptions, IPackageInfo, ISpawnOptions } from '../types'
import { copySync, moveSync, removeSync } from 'fs-extra'

/**
 * @author wh
 * @description 获取当前文件的配置文件
 */
const getConfigFile = (): IPackageInfo => {
  const readPath = path.resolve(__dirname, '../package.json')
  const content = fs.readFileSync(readPath, 'utf-8')
  return JSON.parse(content) as IPackageInfo
}

/**
 * @author wh
 * @description 返回一个commander描述信息
 */
const getCommanderOptions = (): ICommanderOptions[] => {
  return [
    {
      keyword: '-tpl, --template <template>',
      description: 'Please enter the template, which is consistent with vite'
    },
    {
      keyword: '-y, --y',
      description: 'Implement default parameters'
    }
  ] as ICommanderOptions[]
}

/**
 * @author wh
 * @description 要求执行cmd命令
 * @param command 命令名称 npm/ yarn/ pnpm
 * @param args 表示npm等其余的参数 tsc init等
 * @param options spawn 其余参数
 */
const runCommand = (command: string, args: string[], options: ISpawnOptions = {}): Promise<any> =>
  new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    })

    // fail
    executedCommand.on('error', (error: string | undefined) => {
      reject(new Error(error))
      console.log(error)
      process.exit(1)
    })

    // success
    executedCommand.on('exit', (code: number, ...args: any) => {
      if (code === 0) {
        resolve('')
      } else {
        reject(new Error(''))
      }
    })
  })

/**
 * @author wh
 * @description 直接执行的命令
 * @param command
 */
const exec = <T>(command: string, options: ISpawnOptions = {}) =>
  new Promise<T>((resolve, reject) => {
    cp.exec(command, options, (error: string, output: T) => {
      if (error) {
        reject(error)
      } else {
        resolve(output)
      }
    })
  })

/**
 * @author wh
 * @description 专门用来打印成功的log
 * @param message
 */
const successLog = (message: string) => {
  console.log(`${green('success')}  ${message} `)
}

/**
 * @author wh
 * @description 表示警告的message
 * @param message 需要打印的消息
 */
const warningLog = (message: string) => {
  console.log(`${yellow('warning')} ${message}`)
}

/**
 * @author wh
 * @description 解析url 地址
 * @param urls 需要拼接的url
 */
const resolvePath = (...urls: string[]) => path.resolve(__dirname, ...urls)

/**
 * @author wh
 * @description 表示拼接url 地址
 * @param urls 待拼接地址
 */
const joinPath = (...urls: string[]) => path.join(...urls)

/**
 * @author wh
 * @description 进行文件复制
 * @param src 来源地址
 * @param dest 复制目的地
 */
const copyFile = (src: string, dest: string) => copySync(src, dest)

/**
 * @author wh
 * @description 进行文件的移动
 * @param src 原文件
 * @param dest 移动地址
 * @param options 表示是否覆盖等参数
 */
const moveFile = (src: string, dest: string, options = { overwrite: true }) =>
  moveSync(src, dest, options)

/**
 * @author wh
 * @description 用来删除文件夹以及文件 可以是包含关系
 * @param target 删除路径
 */
const removeFileAndDir = (target: string) => removeSync(target)

export {
  getConfigFile,
  getCommanderOptions,
  runCommand,
  exec,
  successLog,
  warningLog,
  resolvePath,
  joinPath,
  copyFile,
  moveFile,
  removeFileAndDir
}
