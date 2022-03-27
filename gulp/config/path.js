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
    files: `${distFolder}/`,
    cls: `${distFolder}/html`,
  },
  src: {
    html: [`${srcFolder}/**/*.html`, `!${srcFolder}/html/*.*`],
    files: [`${srcFolder}/**/*.*`, `!${srcFolder}/html/*.*`],
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/**/*.*`,
    cls: `${distFolder}/html`,
  },
  clean: distFolder,
  distFolder: distFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
}
