// 向用户提出问题，接收用户的输入并作出相应的处理。
const inquirer = require('inquirer')
const { stopSpinner } = require('./spinner')

async function create(projectName, options) {
  const res = await inquirer.prompt([
    {
      name: 'config.vue',
      type: 'list',
      message: `vue 版本选择:`,
      choices: [
        // { name: "vue 2.x", value: "vue2" },
        { name: 'vue 3.x', value: 'vue3' }
      ],
      default: 'vue3'
    },
    {
      name: 'config.lang',
      type: 'list',
      message: `语言:`,
      choices: [
        { name: 'typescript', value: 'ts' },
        { name: 'javascript', value: 'js' }
      ],
      default: 'ts'
    }
  ])
  require('./gitClone')(name, res.config.vue, () => console.log('cd ' + name + ' && npm install'))
}
module.exports = (...args) => {
  return create(...args).catch(() => {
    stopSpinner(false) // do not persist
  })
}
