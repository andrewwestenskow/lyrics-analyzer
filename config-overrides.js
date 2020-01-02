const {
  override,
  fixBabelImports,
  addWebpackModuleRule,
} = require('customize-cra')

const AntdScssThemePlugin = require('antd-scss-theme-plugin')

const addLoader = config => {
  config.plugins.push(new AntdScssThemePlugin('src/styles/theme.scss'))
  return config
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLoader,
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      AntdScssThemePlugin.themify({
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      }),
    ],
  })
)
