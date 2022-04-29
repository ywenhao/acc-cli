#!/usr/bin/env node
const chalk = require('chalk')
const path = require('path')
const merge = require('./utils/index.js')
//命令
const program = require('commander')
const packageData = require('./package.json')
const fs = require('fs-extra')
//当前cli的名称
const cliName = packageData.name

//重写package.json中的配置项
function reWritePackageJson(res, name) {
  //获取package.json文件内容
  let old = require(path.resolve('./') + `/${name}/package.json`)

  delete res.config //移除基础config
  //合并package.json
  let result = merge(old, res)

  //写入package.json文件
  let resStr = JSON.stringify(result, '', '\t')
  fs.writeFile(
    path.resolve('./') + `/${name}/package.json`,
    resStr, //格式化json
    (err) => {
      if (err) {
        throw err
      }
      console.log('cd ' + name + ' && npm install')
    }
  )
}
program.on('--help', () => {
  console.log(`Run ${chalk.red(`${cliName} <command> --help`)} show details`)
})

program
  .version(require('./package').version, '-v, --version')
  .usage('<command> [options]')
  .action((name, cmd) => {
    console.log(name)
  })

program
  .command('create <app-name>') //表示创建一个项目，create表示命令 <app-name>表示项目名称
  .description('创建一个空项目') //表示项目描述
  .option('-f, --force', '强制覆盖同名的项目名') //创建项目的配置，以及说明，在命令行那则会显示 create [options] <app-name>， 如果是可选参数，第三个参数是默认值，那如果是一个函数则表示是对用户值的修正
  .action((name, cmd) => {
    //这里会收到项目名称，第一个参数表示设置的值， 第二个参数表示配置
    fs.mkdir(name, (err) => {
      //创建文件夹
      if (err) {
        throw '项目文件夹已存在,请检查'
      }
      require('./lib/create')(name, cmd) //根据create.js创建项目
    })
  })

program.parse(process.argv)
if (!program.args.length) {
  //输入脚手架名时调用help
  program.help()
}
