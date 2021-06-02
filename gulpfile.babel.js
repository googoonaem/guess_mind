import gulp from "gulp";
import autoPrefixer from "gulp-autoprefixer";
import sass from "gulp-sass";
import minifyCSS from "gulp-csso";
import del from "del";
import browserify from "gulp-browserify";
import babelify from "babelify";

sass.compiler = require("node-sass");

const paths = {
    styles: {
        src: "assets/scss/styles.scss",
        dest: "src/static/styles",
        watch: "assets/scss/*.scss",
    },
    js: {
        src: "assets/js/main.js",
        dest: "src/static/js",
        watch: "assets/js/*.js",
    },
};

const clean = () => del("src/static");

const styles = () => 
    gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(autoPrefixer({
                cascade: false,
            })
        )
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.styles.dest));

const js = () =>
    gulp
        .src(paths.js.src)
        .pipe(
            browserify({
                transform: [
                    babelify.configure({
                        presets: ["@babel/preset-env"],
                    }),
                ],
            })
        )
        .pipe(gulp.dest(paths.js.dest));


const watchfiles = () => {
    gulp.watch(paths.js.watch, js);
    gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([clean, styles, js, watchfiles]);
export default dev;