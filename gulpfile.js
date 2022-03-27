// ? ИМПОРТ ОСНОВНОГО МОДУЛЯ
import gulp from "gulp";

// ? ИМПОРТ ПУТЕЙ
import { path } from "./gulp/config/path.js";

// ? ПЕРЕДАЮ ЗНАЧЕНИЯ В ГЛОБАЛЬНУЮ ПЕРЕМЕННУЮ
global.app = {
  path: path,
  gulp: gulp,
}

// ? ИМПОРТ ЗАДАЧ
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";

// ? НАБЛЮДАТЕЛЬ ЗА ИЗМЕНЕНИЯМИ В ФАЙЛАХ
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
}

const mainTasks = gulp.parallel(copy, html); // * МЕТОД ГЛОБАЛЬНОГО ОБЪЕКТА ДЛЯ ПАРАЛЛЕЛЬНОГО ВЫПОЛНЕНИЯ УКАЗАННЫХ ЗАДАЧ

// ? ПОСТОРОЕНИЕ СЦЕНАРИЕВ ДЛЯ ВЫПОЛНЕНИЯ ЗАДАЧ
const dev = gulp.series(reset, mainTasks, watcher);

// ? ВЫПОЛНЕНИЕ СЦЕНАРИЯ ПО УМОЛЧАНИЮ
gulp.task('default', dev);
