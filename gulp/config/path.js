// ? ПОЛУЧАЕМ ИМЯ РОДИТЕЛЬСКОЙ ПАПКИ ПРОЕКТА, СИНТАКСИС NODE.JS
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// ? ПУТИ К ОСНОВНЫМ ПАПКАМ ПРОЕКТА
const distFolder = './dist';
const srcFolder = './src';

// ? ОБЩИЙ ОБЪЕКТ path С ИНФОРМАЦИЕЙ ПО ВСЕМ ПУТЯМ ПРОЕКТА
export const path = {
  dist: {
    html: `${distFolder}/`,
    css: `${distFolder}/css/`,
    js: `${distFolder}/js/`,
    files: `${distFolder}/`,
  },
  src: {
    html: `${srcFolder}/*.pug`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/**/*.js`,
    files: [
      `${srcFolder}/**/*.*`,
      `!${srcFolder}/html/**/*.*`,
      `!${srcFolder}/scss/**/*.*`,
      `!${srcFolder}/js/**/*.*`,
      `!${srcFolder}/layout/**/*.*`,
      `!${srcFolder}/*.pug`
    ],
  },
  watch: {
    html: `${srcFolder}/**/*.pug`,
    scss: `${srcFolder}/scss/**/*.scss`,
    cssmin: `${distFolder}/css/style.css`,
    js: `${srcFolder}/js/**/*.js`,
    jsmin: `${distFolder}/js/app.js`,
    files: `${srcFolder}/**/*.*`,
  },
  clean: distFolder,
  distFolder: distFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
}
