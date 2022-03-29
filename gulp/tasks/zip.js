import del from "del";
import gulpZip from "gulp-zip";

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`);
  return app.gulp.src(`${app.path.distFolder}/**/*.*`)

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "zip",
        message: "error:  <%= error.message %>",
      })
    ))

    .pipe(gulpZip(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'))
}
