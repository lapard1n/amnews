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
    img: `${distFolder}/img/`,
    fonts: `${distFolder}/fonts/`,
    files: `${distFolder}/`,
  },
  src: {
    html: `${srcFolder}/*.pug`,
    scss: [
      `${srcFolder}/scss/**/*.scss`,
      `${srcFolder}/sass/**/*.sass`,
    ],
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
    svg: `${srcFolder}/img/**/*.svg`,
    files: [
      `${srcFolder}/**/*.*`,
      `!${srcFolder}/html/**/*.*`,
      `!${srcFolder}/scss/**/*.*`,
      `!${srcFolder}/sass/**/*.*`,
      `!${srcFolder}/js/**/*.*`,
      `!${srcFolder}/layout/**/*.*`,
      `!${srcFolder}/img/**/*.*`,
      `!${srcFolder}/fonts/**/*.*`,
      `!${srcFolder}/ignore/**/*.*`,
      `!${srcFolder}/*.pug`
    ],
  },
  watch: {
    html: `${srcFolder}/**/*.pug`,
    scss: [
      `${srcFolder}/scss/**/*.scss`,
      `${srcFolder}/sass/**/*.sass`,
    ],
    cssmin: `${distFolder}/css/style.css`,
    js: `${srcFolder}/js/**/*.js`,
    jsmin: `${distFolder}/js/app.js`,
    img: `${srcFolder}/img/**/*.*`,
    files: `${srcFolder}/**/*.*`,
  },
  clean: distFolder,
  distFolder: distFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
}
