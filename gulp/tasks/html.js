import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

export const html = () => {
  return app.gulp.src(app.path.src.html)

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "html",
        message: "error:  <%= error.message %>",
      })
    ))

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
