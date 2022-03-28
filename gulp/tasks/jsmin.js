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
