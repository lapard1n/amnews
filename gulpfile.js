// ? ИМПОРТ ОСНОВНОГО МОДУЛЯ
import gulp from "gulp";

// ? ИМПОРТ ПУТЕЙ
import { path } from "./gulp/config/path.js";

// ? ИМПОРТ ОБЩИХ ПЛАГИНОВ
import { plugins } from "./gulp/config/plugins.js";

// ? ПЕРЕДАЮ ЗНАЧЕНИЯ В ГЛОБАЛЬНУЮ ПЕРЕМЕННУЮ
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// ? ИМПОРТ ЗАДАЧ
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { jsmin } from "./gulp/tasks/jsmin.js";
import { cssmin } from "./gulp/tasks/cssmin.js";

// ? НАБЛЮДАТЕЛЬ ЗА ИЗМЕНЕНИЯМИ В ФАЙЛАХ
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.cssmin, cssmin);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.jsmin, jsmin);
}

// ? МЕТОД ГЛОБАЛЬНОГО ОБЪЕКТА ДЛЯ ПАРАЛЛЕЛЬНОГО ВЫПОЛНЕНИЯ УКАЗАННЫХ ЗАДАЧ
const mainTasks = gulp.parallel(copy, html, scss, js);
const codeMin = gulp.parallel(cssmin, jsmin);

// ? ПОСТОРОЕНИЕ СЦЕНАРИЕВ ДЛЯ ВЫПОЛНЕНИЯ ЗАДАЧ
const dev = gulp.series(reset, mainTasks, codeMin, gulp.parallel(watcher, server));

// ? ВЫПОЛНЕНИЕ СЦЕНАРИЯ ПО УМОЛЧАНИЮ
gulp.task('default', dev);
