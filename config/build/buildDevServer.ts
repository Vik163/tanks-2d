import { BuildOptions } from './types/config'

export function buildDevServer (options: BuildOptions) {
  return {
    host: '127.0.0.1', // you can change this ip with your ip
    port: options.port,
    // open: true, // Автоматически открывает в браузере приложение

    // При использовании HTML5 History API страница index.html скорее всего будет отображаться вместо любых 404 ответов
    // Запросы через index page иначе при перезагрузке не на главной странице выпадет ошибка
    historyApiFallback: true,
    // позволяет заменять, добавлять или удалять модули во время работы приложения без полной перезагрузки (сохраняет состояние приложения, обновляет только то, что было изменено, мгновенно обновляет браузер при внесении изменений в CSS/JS)
    hot: true
  }
}
