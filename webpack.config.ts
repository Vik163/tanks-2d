import type webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildEnv, BuildPaths } from './config/build/types/config';

const path = require('path');

export default (env: BuildEnv) => {
   const paths: BuildPaths = {
      entry: path.resolve(__dirname, './src/init.ts'),
      build: path.resolve(__dirname, 'build'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, './src'),
      favicon: path.resolve(__dirname, 'public', 'tank_icon.png'),
   };

   const mode = env.mode || 'development';
   const port = env.port || 3000;
   const isDev = mode === 'development';

   const config: webpack.Configuration = buildWebpackConfig({
      paths,
      mode,
      port,
      isDev,
   });

   return config;
};
