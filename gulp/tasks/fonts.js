import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`)

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "fonts",
        message: "error:  <%= error.message %>",
      })
    ))

    // ? КОНВЕРТИРУЕМ В .ttf
    .pipe(fonter({
      formats: ['ttf'],
    }))
    // ? ВЫГРУЖАЕМ РЕЗУЛЬТАТ В РАБОЧУЮ ПАПКУ
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "fonts",
        message: "error:  <%= error.message %>",
      })
    ))

    // ? КОНВЕРТИРУЕМ В .ttf
    .pipe(fonter({
      formats: ['woff'],
    }))
    // ? ВЫГРУЖАЕМ РЕЗУЛЬТАТ В РАБОЧУЮ ПАПКУ
    .pipe(app.gulp.dest(app.path.dist.fonts))

    // ? ПОЛУЧАЕМ TTF И КОНВЕРТИРУЯ ВЫГРУЖАЕМ WOFF2 В DIST
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.dist.fonts))
}
