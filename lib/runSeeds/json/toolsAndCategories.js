const Category = require('../../../models/category');
const Tool = require('../../../models/tool');

module.exports = async () => {
  console.log("These seeds are intentionally disabled. Please do not rerun previously run and archived seeds.");
  return

  const tools = require('../../../seeds/json/toolsAndCategories/fiberArtsEmily.json');

  const toolNames = Object.keys(tools);
  const dupCategories = toolNames.flatMap(toolName => tools[toolName]);
  let categoriesToCreate = [];
  dupCategories.forEach(categoryName => {
    if (categoriesToCreate.indexOf(categoryName) < 0 ) {
      categoriesToCreate.push(categoryName)
    }
  })
  const promisedCategories = await categoriesToCreate.map(async categoryName => {
    const categoryAlreadyExists = await Category.findByName(categoryName)
    if (categoryAlreadyExists) {
      return categoryAlreadyExists
    }
    return (await Category.create({name: categoryName}))
  })
  const createdCategories = await Promise.all(promisedCategories)

  toolNames.forEach(async toolName => {
    try {
      const categoryIds = tools[toolName].map(categoryName => {
        return createdCategories.find(category => {
          return category.name === categoryName
        }).id
      })
      const createdTool = await Tool.create({
        name: toolName,
        categoryIds
      })
      if (createdTool.errors) {
        console.log("Uh oh, ", createdTool.properties.name, createdTool.errors);
      } else {
        console.log("Created ", createdTool);
      }
    } catch (e) {
      console.log("Oh no!", e);
    }
  })
}
