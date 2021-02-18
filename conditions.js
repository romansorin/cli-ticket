const inquirer = require('inquirer')

const conditions = async () => {
  const statements = []
  const questions = [
    {
      type: 'list',
      name: 'pavement',
      message: 'Pavement',
      choices: ['Dry', 'Wet', 'Snow', 'Ice']
    },
    {
      type: 'number',
      name: 'lanes',
      message: 'Lanes'
    },
    {
      type: 'list',
      name: 'visibility',
      message: 'Visibility',
      choices: ['Clear', 'Cloudy']
    },
    {
      type: 'list',
      name: 'visibility_time',
      message: 'Visibility Time',
      choices: ['Dusk', 'Night', 'Dawn', 'Day']
    },
    {
      type: 'confirm',
      name: 'adverse',
      message: 'Adverse Visibility',
      default: false
    },
    {
      type: 'list',
      name: 'weather',
      message: 'Weather',
      choices: ['Rain', 'Snow', 'Fog', 'No Adverse']
    },
    {
      type: 'list',
      name: 'traffic',
      message: 'Traffic',
      choices: ['Heavy', 'Moderate', 'Light', 'None']
    },
    {
      type: 'list',
      name: 'area',
      message: 'Area',
      choices: ['Business', 'Freeway', 'Industrial', 'Residential', 'Rural']
    },
    {
      type: 'list',
      name: 'crash',
      message: 'Crash',
      choices: ['Yes', 'No', 'Almost Caused', 'Non-Injury']
    },
    {
      type: 'confirm',
      name: 'injury',
      message: 'Injury',
      default: false
    },
    {
      type: 'confirm',
      name: 'fatal',
      message: 'Fatal',
      default: false
    },
    {
      type: 'input',
      name: 'remarks',
      message: 'Remarks'
    },
    {
      type: 'input',
      name: 'charging',
      message: 'Charging LEO'
    },
    {
      type: 'input',
      name: 'issuing',
      message: 'Issuing LEO'
    }
  ]

  console.log('Conditions:\n')

  return inquirer.prompt(questions).then(async answers => {
    statements.push(
      `PAVEMENT: ${answers.pavement} # of Lanes ${answers.lanes}`,
      `VISIBILITY: ${answers.visibility} ${answers.visibility_time}${
        answers.adverse ? ' | A/V' : ''
      }`,
      `WEATHER: ${answers.weather}`,
      `TRAFFIC: ${answers.traffic}`,
      `AREA: ${answers.area}`,
      `CRASH: ${answers.crash}${answers.injury ? ' INJURY' : ''}${
        answers.fatal ? ' FATAL' : ''
      }`,
      `REMARKS: ${answers.remarks}`
    )

    statements.push('--------------')

    statements.push(`Charging LEO: ${answers.charging}`)
    statements.push(`Issuing LEO: ${answers.issuing}`)

    return statements
  })
}

module.exports = { conditions }
