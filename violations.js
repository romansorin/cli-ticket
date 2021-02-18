const inquirer = require('inquirer')

const violations = async () => {
  const questions = [
    {
      type: 'confirm',
      name: 'speed',
      message: 'Speed',
      default: false
    },
    {
      type: 'confirm',
      name: 'license',
      message: 'Drivers License',
      default: false
    },
    {
      type: 'confirm',
      name: 'other',
      message: 'Other Offenses',
      default: false
    },
    {
      type: 'confirm',
      name: 'suspended',
      message: 'DL Suspended',
      default: false
    },
    {
      type: 'confirm',
      name: 'seized',
      message: 'Vehicle Seized',
      default: false
    }
    // TODO: ovi
    // TODO: safety belt
  ]

  console.log('Violations:\n')

  return inquirer.prompt(questions).then(async answers => {
    const statements = []
    const speedQuestions = [
      {
        type: 'number',
        name: 'amount',
        message: 'Amount:'
      },
      {
        type: 'number',
        name: 'limit',
        message: 'Limit:'
      },
      {
        type: 'list',
        name: 'speed_type',
        message: 'Speed type:',
        choices: ['Over limits', 'Unsafe for conditions', 'ACDA']
      },
      {
        type: 'list',
        name: 'capture_type',
        message: 'Capture type:',
        choices: ['Radar', 'Air', 'VASCAR', 'PACE', 'LASER']
      },
      {
        type: 'list',
        name: 'motion_type',
        message: 'Motion type:',
        choices: ['Stationary', 'Moving']
      },
      {
        type: 'list',
        name: 'violation_type',
        message: 'Violation type:',
        choices: ['Minor', 'Major', 'Felony']
      }
    ]

    const licenseQuestions = [
      {
        type: 'list',
        name: 'violation_type',
        message: 'Violation type:',
        choices: ['None', 'Not on person', 'Suspended']
      }
    ]

    const otherQuestions = [
      {
        type: 'input',
        name: 'violations',
        message: 'Violation codes (ex. PC1-01; PC8-14):'
      }
    ]

    if (answers.speed) {
      await inquirer.prompt(speedQuestions).then(answers => {
        let violationCode = '11-01'
        switch (answers.violation_type) {
          case 'Minor':
            violationCode = '11-01'
            break
          case 'Major':
            violationCode = '11-22'
            break
          case 'Felony':
            violationCode = '11-23'
            break
          default:
            break
        }

        statements.push(
          `⬛ SPEED: ${answers.amount} MPH in ${answers.limit} MPH zone; PC${violationCode}`,
          `${answers.speed_type}`,
          `${answers.capture_type} ${answers.motion_type}`,
          '\n\n'
        )
      })
    }

    if (answers.license) {
      await inquirer.prompt(licenseQuestions).then(answers => {
        let violationCode = '8-01'

        switch (answers.violation_type) {
          case 'Suspended':
            violationCode = '8-01'
            break
          case 'None':
            violationCode = '11-14'
            break
          case 'None (CDL)':
            violationCode = '14-02'
            break
          case 'Not on person':
            violationCode = '11-14.1'
            break
          default:
            break
        }

        statements.push(
          `⬛ DRIVER LICENSE: ${answers.violation_type}; PC${violationCode}`,
          '\n\n'
        )
      })
    }

    if (answers.other) {
      await inquirer.prompt(otherQuestions).then(answers => {
        statements.push(`⬛ OTHER OFFENSE: ${answers.violations}`, '\n\n')
      })
    }

    if (answers.suspended) {
      statements.push('- DRIVER LICENSE SUSPENDED')
    }
    if (answers.seized) {
      statements.push('- VEHICLE SEIZED')
    }

    statements.push('--------------')

    return statements
  })
}

module.exports = { violations }
