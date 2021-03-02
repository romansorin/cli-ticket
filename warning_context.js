const inquirer = require('inquirer')

const context = async () => {
  const questions = [
    {
      type: 'input',
      name: 'date',
      message: 'Enter date:'
    },
    {
      type: 'number',
      name: 'time',
      message: 'Enter time:'
    },
    {
      type: 'input',
      name: 'street',
      message: 'Street name:'
    },
    {
      type: 'input',
      name: 'direction',
      message: 'Direction:'
    },
    {
      type: 'input',
      name: 'at',
      message: 'At/near:'
    }
  ]

  console.log('Information:\n')

  return inquirer.prompt(questions).then(async answers => {
    const statements = []

    statements.push(
      `ON ${answers.date} AT ${answers.time}`,
      `CONTACT AT/NEAR ${answers.at} ${answers.street} (${answers.direction})`
    )

    return statements
  })
}

module.exports = { context }
