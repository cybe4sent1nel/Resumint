import Handlebars from 'handlebars'

// Register helper for JSON stringify
Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context, null, 2)
})

export default Handlebars
