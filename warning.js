/**
 * - Provide date, time, location
 * - Specify if warning
 * - Specify if equipment repair order
 *
 * if warning, string input for written reason
 * if equipment repair order, ability to select one or several reasons, or provide other (string input)
 *
 * requires signing
 * officers signature
 */

const { context } = require('./warning_context')
const { violations } = require('./warning_violations')

async function main () {
  const statements = []
  statements.push(
    await context(),
    '\n====================\n',
    await violations()
  )

  statements.map(statement => {
    if (typeof statement === 'string') console.log(statement)
    else statements.map(line => console.log(line))
  })
}

main()
