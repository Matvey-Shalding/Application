import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
// import { concat } from './gulp/tasks/concat.js'

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts,gulp.parallel(copy, html, scss, images,js));
const dev = gulp.series(
  reset,
  mainTasks,
  gulp.parallel(watcher, server),
);

import { copy } from "./gulp/tasks/copy.js";
gulp.task("default", dev);
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js,js,{
    'events' : ['change']
  });
  // gulp.watch(path.watch.js,concat,{
  //   'events' : ['add','addDir']
  // })
  gulp.watch(path.watch.images, images);
}
