import del from "del";

export const cls = () => {
  return del(app.path.dist.cls)
}
