var gulp = require('gulp');
var sass = require('gulp-sass');
const watchSass = require("gulp-watch-sass");
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

 
gulp.task("sass:watch", () => watchSass([
  "./scss/*.scss"
]).pipe(sass())
.pipe(gulp.dest("./css")));