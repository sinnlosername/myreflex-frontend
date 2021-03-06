const {addLessLoader, override} = require("customize-cra");

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        'primary-color': '#1890ff',
        'link-color': '#6FB5B5',
        'font-size-base': '16px'
      }
    }
  })
)