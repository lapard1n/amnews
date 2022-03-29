import mainSass from 'sass';
import gulpSass from 'gulp-sass';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(mainSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: true })

    // ? НАСТРОЙКА ПЛАГИНА ДЛЯ ОТОБРАЖЕНИЯ ОШИБОК
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "scss",
        message: "error:  <%= error.message %>",
      })
    ))

    // ? ЗАПУСК И ПАРАМЕТРЫ КОМПИЛЯЦИИ CSS ИЗИ SCSS
    .pipe(app.plugins.sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))

    // ? СБОРКА МЕДИАЗАРОСОВ
    .pipe(groupCssMediaQueries())

    // ? ПЛАГИН ПО ЗАМЕНЕ ИЗОБРАЖЕНИЙ ДЛЯ WEBP + ТРЕБУЕТСЯ УСТАНОВКА КОНВЕРТЕРА ПОД НЕГО: webp-converter@2.2.3
    .pipe(webpcss({
      webpClass: ".webp",
      noWebpClass: ".no-webp",
    }))

    // ? ДОБАВЛЕНИЕ ВЕНДОРНЫХ ПРЕФИКСОВ ДЛЯ КРОСС-ПЛАТФОРМЕННОЙ ВЕРСТКИ
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 3 versions"],
      cascade: true,
    }))

    .pipe(app.plugins.sourcemaps.write('.'))
    .pipe(app.gulp.dest(app.path.dist.css))
    .pipe(app.plugins.browser.stream())
}

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
