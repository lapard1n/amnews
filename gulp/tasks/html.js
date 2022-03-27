// import fileInclude from "gulp-file-include"; // * ПЛАГИН ПОДКЛЮЧЕНИЯ HTML ФРАГМЕНТОВ
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // * ПЛАГИН ЗАМЕНЫ ИЗОБРАЖЕНИЙ НА WEBP
import versionNumber from "gulp-version-number"; // * ПЛАГИН КОНТРОЛЯ ВЕРСИЙ ФАЙЛОВ, ДЛЯ ИЗБЕГАНИЯ ЗАКЕШИРОВАННЫХ...
import pug from "gulp-pug"; // * СТАРЫЙ ДОБРЫЙ ПУГЕ!

export const html = () => {
  return app.gulp.src(app.path.src.html)

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "ERROR:  <%= error.message %>",
      })
    ))

    // .pipe(fileInclude()) // ? ПЛАГИН ДЛЯ СБОРКИ HTML ФАЙЛОВ

    // ? СТАРЫЙ ДОБРЫЙ ПУГЕ!!
    .pipe(pug({
      // ? СЖАТИЕ HTML ФАЙЛА
      pretty: true,
      // ? ПОКАЗЫВАТЬ В ТЕРМИНАЛЕ КАКОЙ ФАЙЛ БЫЛ ОБРАБОТАН
      verbose: true,
    }))

    // ? ПЛАГИН ЗАМЕНЫ ИЗОБРАЖЕНИЙ НА WEBP
    .pipe(webpHtmlNosvg())

    // ? НАСТОЙКА ПЛАГИНА ПО ОТСЛЕЖИВАНИЮ ВЕРСИЙ КЭША
    .pipe(
      versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': [
            'css',
            'js',
          ]
        },
        'output': {
          'file': './gulp/version.json',
        }
      })
    )

    .pipe(app.gulp.dest(app.path.dist.html))
    .pipe(app.plugins.browser.stream())
}
