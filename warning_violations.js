const inquirer = require('inquirer')

const violations = async () => {
  const questions = [
    {
      type: 'confirm',
      name: 'warning',
      message: 'Warning',
      default: false
    },
    {
      type: 'confirm',
      name: 'equpiment',
      message: 'Equipment Repair Order',
      default: false
    }
  ]

  console.log('Violations:\n')

  return inquirer.prompt(questions).then(async answers => {
    const statements = []
    const warningQuestions = [
      {
        type: 'input',
        name: 'reason',
        message: 'Warning reason:'
      }
    ]

    const equipmentQuestions = [
      {
        type: 'checkbox',
        name: 'repair_type',
        message: 'Repair orders:',
        choices: [
          'Headlamp',
          'Stop Lamp',
          'Tail Lamp',
          'Clearance Lamp',
          'Brakes',
          'Mirror',
          'Defective Muffler',
          'Windshield Wiper',
          'Reflectors',
          'Turn Signal',
          'Defective Horn',
          'Warning Devices',
          'Other'
        ]
      }
    ]

    if (answers.warning) {
      await inquirer.prompt(warningQuestions).then(answers => {
        statements.push(`WARNING FOR: ${answers.reason}`)
      })
    }

    if (answers.equipment) {
      await inquirer.prompt(equipmentQuestions).then(answers => {
        console.log(answers)
        statements.push('EQUPIMENT REPAIR ORDER:', '\n', answers)
      })
    }

    return statements
  })
}

module.exports = { violations }
