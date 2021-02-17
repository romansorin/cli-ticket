const inquirer = require('inquirer')

const context = async () => {
  const questions = [
    {
      type: 'input',
      name: 'date',
      message: 'Enter date: '
    },
    {
      type: 'input',
      name: 'time',
      message: 'Enter time: '
    },
    {
      type: 'list',
      name: 'operation_type',
      message: 'Operation type: ',
      choices: ['Operated', 'Passenger', 'Parked', 'Walked at']
    },
    {
      type: 'input',
      name: 'street',
      message: 'Street name: '
    },
    {
      type: 'input',
      name: 'direction',
      message: 'Direction: '
    },
    {
      type: 'input',
      name: 'at',
      message: 'At/near: '
    }
  ]

  const statements = await inquirer.prompt(questions).then(async answers => {
    let vehicleType, license, vehicle
    const statements = []

    if (answers.operation_type !== 'Walked at') {
      await inquirer
        .prompt([
          {
            type: 'list',
            name: 'vehicle_type',
            message: 'Vehicle type: ',
            choices: [
              'Passenger',
              'Motorcycle',
              'Bicycle',
              'Commercial',
              'Other'
            ]
          },
          {
            type: 'input',
            name: 'vehicle',
            message: 'Vehicle: '
          },
          {
            type: 'input',
            name: 'license',
            message: 'LIC: '
          }
        ])
        .then(answers => {
          vehicleType = answers.vehicle_type
          vehicle = answers.vehicle
          license = answers.license
          if (answers.vehicle_type === 'Other') {
            inquirer
              .prompt([{ type: 'input', name: 'other', message: 'Other: ' }])
              .then(answers => {
                vehicleType = `Other: ${answers.other}`
              })
          }
        })
    }

    statements.push(
      `ON ${answers.date} AT ${answers.time}`,
      `SUBJECT ${answers.operation_type} ${vehicleType}`,
      `UPON A PUBLIC HIGHWAY, NAMELY ${answers.street} DIRECTION ${answers.direction}`,
      `AT/NEAR ${answers.at}`
    )

    if (answers.operation_type !== 'Walked at')
      statements.splice(2, 0, `VEHICLE: ${vehicle} LIC# ${license}`)

    return statements
  })

  statements.map(statement => {
    console.log(statement)
  })
}

module.exports = { context }
