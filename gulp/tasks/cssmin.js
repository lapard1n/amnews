import cleanCss from 'gulp-clean-css';

export const cssmin = () => {
  return app.gulp.src(`${app.path.dist.css}/style.css`)

    // ? МИНИФИКАЦИЯ CSS
    .pipe(cleanCss())

    // ? ПЕРЕИМЕНОВАНИЕ ФАЙЛА ПОСЛЕ ЕГО КОМПИЛЯЦИИ
    .pipe(app.plugins.rename({
      extname: ".min.css"
    }))

    .pipe(app.gulp.dest(app.path.dist.css))
}
