import concat from 'gulp-concat';

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: true })

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "js",
        message: "error:  <%= error.message %>",
      })
    ))

    // ? СОЗДАНИЕ КАРТЫ ИСТОЧНИКА С КОНКАТЕНАЦИЕЙ ФАЙЛОВ
    .pipe(app.plugins.sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(app.plugins.sourcemaps.write('.'))

    .pipe(app.gulp.dest(app.path.dist.js))
    .pipe(app.plugins.browser.stream())
}

import uglify from 'gulp-uglify';

export const jsmin = () => {
  return app.gulp.src(`${app.path.dist.js}/app.js`)

    // ? МИНИФИКАЦИЯ JS
    .pipe(uglify())

    // ? ПЕРЕИМЕНОВАНИЕ ФАЙЛА ПОСЛЕ ЕГО КОМПИЛЯЦИИ
    .pipe(app.plugins.rename({
      extname: ".min.js",
    }))

    .pipe(app.gulp.dest(app.path.dist.js))
}
