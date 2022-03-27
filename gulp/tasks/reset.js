import del from "del"; // * ПЛАГИН УДАЛЕНИЯ/ОЧИЩЕНИЯ

export const reset = () => {
  return del(app.path.clean);
}
