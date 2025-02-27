import { type BuildOptions } from '../types/config'

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean;
}
// добавляем @babel/plugin-transform-typescript и @babel/plugin-transform-runtime, чтобы убрать ts-loader
export function buildBabelLoader ({ isDev, isTsx }: BuildBabelLoaderProps) {
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/, // меняем расширения
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader', // преобразует в обычный код JavaScript, поддерживаемый старыми браузерами
      options: {
        cacheDirectory: true, //  увеличивает скорость
        presets: ['@babel/preset-env'], // для компиляции ES2015+ в ES5., который понимают браузеры
        plugins: [
          [
            '@babel/plugin-transform-typescript', // плагин, который позволяет анализировать и преобразовывать код TypeScript в JavaScript
            {
              isTsx
            }
          ],
          '@babel/plugin-transform-runtime' // Плагин, который позволяет повторно использовать внедряемый вспомогательный код Babel для экономии места в коде.
        ].filter(Boolean)
      }
    }
  }
}
