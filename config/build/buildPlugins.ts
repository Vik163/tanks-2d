import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { BuildOptions } from './types/config'

export const buildPlugins = (options: BuildOptions) => {
  const { isDev, paths } = options
  const isProd = !isDev

  const plugins = [
    // пробрасывает глобальные переменные
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev)
    }),
    // отображения отчетов о ходе выполнения во время компиляции
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    // кольцевые зависимости
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true // при обнаружении выпадает ошибка
    }),
    // обработка типов отдельно при загрузке
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // настройка babel - https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/tree/main/examples/babel-loader
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        },
        mode: 'write-references'
      }
    })
  ]

  if (isDev) plugins.push(new webpack.HotModuleReplacementPlugin())
  //   plugins.push(new ReactRefreshWebpackPlugin());

  return plugins
}
