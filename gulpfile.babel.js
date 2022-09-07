import gulp from "gulp";
import yargs from "yargs";
// import sass from "gulp-sass";
import gulpSass from "gulp-sass";
import nodeSass from "sass";

const sass = gulpSass(nodeSass);

import cleanCss from "gulp-clean-css";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
// import imagemin from "gulp-imagemin";
import del from "del";
import webpack from "webpack-stream";
import uglify from "gulp-uglify";
import named from "vinyl-named";
import browserSync from "browser-sync";
import zip from "gulp-zip";
import replace from "gulp-replace";
import info from "./package.json";

const server = browserSync.create();

const PRODUCTION = yargs.argv.prod;

const paths = {
    styles: {
        src: ["src/assets/scss/bundle.scss", "src/assets/scss/admin.scss"],
        dest: "dist/assets/css",
    },
    images: {
        src: "src/assets/images/**/*.{jpg,jpeg,png,svg,gif}",
        dest: "dist/assets/images",
    },
    scripts: {
        src: ["src/assets/js/bundle.js", "src/assets/js/admin.js"],
        dest: "dist/assets/js",
    },
    other: {
        src: [
            "src/assets/**/*",
            "!src/assets/{images,js,scss}",
            "!src/assets/{images,js,scss}/**/*",
        ],
        dest: "dist/assets",
    },
    package: {
        src: ["**/*", "!.vscode", "!node_modules{,/**}", "!packaged{,/**}"],
        dest: "packaged",
    },
};

export const serve = (done) => {
    server.init({
        proxy: "http://localhost:10078/",
    });
    done();
};

export const reload = (done) => {
    server.reload();
    done();
};

export const clean = () => del(["dist"]);

export const styles = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulpif(PRODUCTION, cleanCss({ compatibility: "ie8" })))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

export const copy = () => {
    return gulp.src(paths.other.src).pipe(gulp.dest(paths.other.dest));
};
export const temporaryCopyImages = () => {
    return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
};
export const watch = () => {
    gulp.watch("src/assets/scss/**/*.scss", styles);
    gulp.watch("src/assets/js/**/*.js", gulp.series(scripts, reload));
    gulp.watch("**/*.php", reload);
    gulp.watch(paths.other.src, gulp.series(copy, reload));
};

export const scripts = () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(named())
        .pipe(
            webpack({
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: ["@babel/preset-env"],
                                },
                            },
                        },
                    ],
                },
                output: {
                    filename: "[name].js",
                },
                externals: {
                    jquery: "jQuery",
                },
                devtool: !PRODUCTION ? "inline-source-map" : false,
                mode: PRODUCTION ? "production" : "development",
            })
        )
        .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(gulp.dest(paths.scripts.dest));
};

export const compress = () => {
    return gulp
        .src(paths.package.src)
        .pipe(
            gulpif(
                (file) => file.relative.split(".").pop() !== "zip",
                replace("juliuspaskevicius", info.name)
            )
        )
        .pipe(zip(`${info.name}.zip`))
        .pipe(gulp.dest(paths.other.dest));
};

export const dev = gulp.series(
    clean,
    gulp.parallel(styles, temporaryCopyImages, scripts, copy),
    serve,
    watch
);
export const build = gulp.series(
    clean,
    gulp.parallel(styles, temporaryCopyImages, scripts, copy)
);
export const bundle = gulp.series(build, compress);

export default dev;
