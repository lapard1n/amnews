import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const img = () => {
  return app.gulp.src(app.path.src.img)

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "img",
        message: "error:  <%= error.message %>",
      })
    ))

    // ? ПРОВЕРЯЕТ БОЛЕЕ НОВЫЕ ИЗОБРАЖЕНИЯ, ПОСЛЕ ЧЕГО РЕ-ФОРМАТИРУЕТ ИХ
    .pipe(app.plugins.newer(app.path.dist.img))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.dist.img))

    // ? МИНИФИЦИРУЕТ ИЗОБРАЖЕНИЯ ТАК ЖЕ ПРОВЕРЯЯ ПО НОВИЗНЕ
    .pipe(app.gulp.src(app.path.src.img))
    .pipe(app.plugins.newer(app.path.dist.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(app.gulp.dest(app.path.dist.img))

    // ? ВЫГРУЖАЕТ SVG
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.dist.img))

    .pipe(app.plugins.browser.stream())
}
