const { dest } = require('gulp');

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    svgSprite = require('gulp-svg-sprite'),
    inject = require('gulp-inject-string'),
    browsersync = require('browser-sync').create(),
    fs = require('fs');


// file paths
// -------------------------------------------------------------------------
var paths = {
  styles: {
    src: 'src/scss/**/main.scss',
    dest: 'dist/css/'
  },
  icons: {
    src: 'src/icons/**/*.svg',
    dest: 'dist/icons/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
};


// clean up folders
// -------------------------------------------------------------------------
function clean() {
  return del([
    '.temp',
    'dist/*',
  ]);
}


// rename icons (if material icons/google icons) & copy to .temp folder
// -------------------------------------------------------------------------
function copyicons() {
  return gulp.src(paths.icons.src)
  .pipe(rename(function(opt) {
    opt.basename = opt.basename.replace(/_black/, '');
    opt.basename = opt.basename.replace(/_24dp/, '');
    return opt;
  }))
  .pipe(gulp.dest('.temp/icons/'));
}


// compile the SVG sprite
function sprite() {
  return gulp.src('.temp/icons/**/*.svg',)
    .pipe(svgSprite({
      mode: {
        symbol: {
          // inline: true,
          // prefix: '#Icon-XYZ', 
          example: false,
          sprite: 'sprite.svg',
          dest: ''
        }
      }
    }))
    .pipe(gulp.dest(paths.icons.dest));
}


// inject sprite.svg to index.html
function injectsprite() {
  return gulp.src('./src/index.html')
    .pipe(inject.replace("%%INJECT_SPRITE%%", fs.readFileSync('./dist/icons/sprite.svg')))
    .pipe(gulp.dest(paths.html.dest));
}


// css tasks: compile scss to css
// -------------------------------------------------------------------------
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest))
}


// watch & browser sync
// -------------------------------------------------------------------------
function watch() {
  browsersync.init({
    server: './dist'
  });
    gulp.watch(paths.icons.src, build).on('change', browsersync.reload)
    gulp.watch(paths.styles.src, styles).on('change', browsersync.reload)
    gulp.watch(paths.html.src).on('change', browsersync.reload)
}


// build
// -------------------------------------------------------------------------
var build = gulp.series(clean, copyicons, gulp.parallel(sprite, styles), injectsprite);


gulp.task("build", build);
gulp.task("watch", watch);
