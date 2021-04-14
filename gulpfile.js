const { dest } = require('gulp');

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    svgSprite = require('gulp-svg-sprite'),
    inject = require('gulp-inject');
    browsersync = require('browser-sync').create();


// file paths
// -------------------------------------------------------------------------
var paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  icons: {
    src: 'src/icons/**/*.svg',
    dest: 'dist/icons/'
  },
  html: {
    src: 'dist/*.html',
    dest: 'dist/'
  },
};


// clean up folders
// -------------------------------------------------------------------------
function clean() {
  return del([
    'dist/css/*',
    'dist/icons/*',
  ]);
}


// css tasks: compile scss to css
// -------------------------------------------------------------------------
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest))
}


// Compile the SVG sprite
function sprite() {
  return gulp.src(paths.icons.src)
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


// Inject the sprite to index.html
function inject() {
  return gulp.src(paths.html.src)
    .pipe(
      inject(
        gulp.src(paths.styles.dest),
        {
          starttag: '<!-- inject:sprite.svg -->',
          transform: function(filePath, file) {
            return file.contents.toString('utf8');
          },
        },
      ),
    )
    .pipe(gulp.dest('./dist'));
}


// watch & browser sync
// -------------------------------------------------------------------------
function watch() {
  browsersync.init({
    server: './dist'
  });
    gulp.watch(paths.styles.src, styles).on('change', browsersync.reload)
    gulp.watch(paths.icons.src, sprite).on('change', browsersync.reload)
    gulp.watch(paths.html.src).on('change', browsersync.reload)
}


// build
// -------------------------------------------------------------------------
var build = gulp.series(clean, gulp.parallel(styles, sprite), inject, watch);

exports.default = build;