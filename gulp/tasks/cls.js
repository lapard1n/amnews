import del from "del"; // * НЕКОГДА КОСТЫЛЬНЫЙ МОДУЛЬ УДАЛЕНИЯ/ОЧИСТКИ ПАПКИ HTML В DIST

export const cls = () => {
  return del(app.path.dist.cls)
}
