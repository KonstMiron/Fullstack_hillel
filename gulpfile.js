const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const paths = {
  scss: 'src/scss/**/*.scss',
  html: 'src/*.html',
  js: 'src/js/**/*.js',
  dist: 'dist'
};

function styles() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest(`${paths.dist}/css`))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
}

function html() {
  return src(paths.html)
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.js)
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

  watch(paths.scss, styles);
  watch(paths.html, html);
  watch(paths.js, scripts);
}

exports.default = series(styles, html, scripts, serve);