import replace from "gulp-replace"; // * ПЛАГИН ПОИСКА И ЗАМЕНЫ
import plumber from "gulp-plumber"; // * ПЛАГИН ОБРАБОТКИ ОШИБОК
import notify from "gulp-notify"; // * ПЛАГИН СООБЩЕНИЯ И ПОДСКАЗКИ
import browser from "browser-sync"; // * ПЛАГИН ДЛЯ ПОДНЯТИЯ ЛОКАЛЬНОГО СЕРВЕРА
import sourcemaps from "gulp-sourcemaps"; // * ПЛАГИН ДЛЯ СОЗДАНИЯ КАРТЫ КОМПИЛЯЦИИ
import rename from "gulp-rename"; // * ПЛАГИН ПЕРЕИМЕНОВЫВАЯ ФАЙЛА

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browser: browser,
  sourcemaps: sourcemaps,
  rename: rename,
}
