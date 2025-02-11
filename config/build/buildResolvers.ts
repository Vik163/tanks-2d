import { BuildOptions } from './types/config'

export function buildResolvers (options: BuildOptions) {
  const { paths } = options
  return {
    // extensions: [".ts", ".tsx", ".js"],
    extensions: ['.ts', '.js'],
    mainFiles: ['index'],
    modules: [paths.src, 'node_modules'], // добавить каталог для поиска, который имеет приоритет над node_modules
    alias: {
      '@': paths.src
    }
  }
}
