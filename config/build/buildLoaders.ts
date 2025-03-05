import { BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/babelLoader'

export function buildLoaders (options: BuildOptions) {
  // разделяет файлы ts и tsx для скорости сборки
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

  const htmlLoader = {
    test: /\.html$/i,
    loader: 'html-loader',
  }

  // Можно добавить обработку шрифтов
  const fileLoader = {
    test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3)$/i,
    type: 'asset/resource'
  }

  const cssLoader = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  }

  return {
    rules: [  fileLoader, htmlLoader,  codeBabelLoader, tsxCodeBabelLoader, cssLoader]
  }
}
