import { BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/babelLoader'

export function buildLoaders (options: BuildOptions) {
  // разделяет файлы ts и tsx для скорости сборки
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

  // Можно добавить обработку шрифтов
  const fileLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  const cssLoader = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  }

  return {
    rules: [fileLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoader]
  }
}
