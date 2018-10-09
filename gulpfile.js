var gulp = require('gulp');
sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
cssnano = require('gulp-cssnano');
browserSync = require('browser-sync').create();
useref = require('gulp-useref');
uglify = require('gulp-uglify');
gulpIf = require('gulp-if');
concat = require('gulp-concat');
imagemin = require('gulp-imagemin');
del = require('del');
runSequence = require('run-sequence');
replace = require('gulp-replace')

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: '../',
    },
    port: 8080
  });
});

gulp.task('color', function () {
  gulp.src('../user_unify/scss/variables/color.scss')
    .pipe(gulp.dest('src/assets/scss'))
});

gulp.task('compile-unf-scss', function () {
  var anchor = '// Add import';

  gulp.src(['../user_unify/scss/dialog.scss', '../user_unify/scss/Button.scss', '../user_unify/scss/Tooltip.scss', '../user_unify/scss/Textfield.scss'])
    .pipe(replace(anchor, '@import \'./variables/color.scss\'\n' + ';'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('unify.css'))
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('compile-unf-js', function () {
  gulp.src(['../user_unify/js/Dialog.js', '../user_unify/js/Input.js', '../user_unify/js/Validate.js'])
    .pipe(concat('unify.js'))
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('sass', function () {
  gulp
    .src('./src/assets/scss/master.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
    // .pipe(cssnano())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/assets/js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(
    ['sass', 'browserSync', 'watch'],
    callback
  );
});

// for production

gulp.task('clean:dist', function () {
  del.sync('dist');
});

gulp.task('css', function () {
  gulp.src('src/css/*')
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('vendor', function () {
  gulp.src(['./node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('script', function () {
  gulp.src(['src/js/script.js', 'src/js/unf.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('useref', function () {
  gulp
    .src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', ['useref', 'css', 'vendor', 'script'],
    callback
  );
});