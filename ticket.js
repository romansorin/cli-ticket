const { context } = require('./context')
const { violations } = require('./violations')
const { conditions } = require('./conditions')

async function main () {
  const statements = []
  statements.push(
    await context(),
    '\n====================\n',
    await violations(),
    await conditions()
  )

  statements.map(statement => {
    if (typeof statement === 'string') console.log(statement)
    else statement.map(line => console.log(line))
  })
}

main()
