'use strict';
const json = require('./package.json');
const dirs = json.config.directories;

const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker'); //Для сортировки медиа запросов.
const minify = require('gulp-csso');
const rename = require('gulp-rename'); //Для перемеинования CSS файла.
const image = require('gulp-image');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const del = require('del');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const newer = require('gulp-newer');
const replace = require('gulp-replace');
const jade = require('gulp-jade');
const server = require('browser-sync');
const run = require('run-sequence'); //Для запуска build


gulp.task('style', function () {
    console.log('Компилирую LESS');
    gulp.src(dirs.source + '/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    '> 1%',
                    'last 1 version',
                    'last 2 Chrome versions',
                    'last 2 Firefox versions',
                    'last 2 Opera versions',
                    'last 2 Edge versions'
                ]
            }),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest(dirs.build + '/css'))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(dirs.build + '/css'))
        .pipe(server.stream());
});

gulp.task('clean', function () {
    console.log('Очистка build')
    return del(dirs.build);
});

gulp.task('copy', function () {
    console.log('Копирование файлов')
    return gulp.src([
            dirs.source + '/fonts/**/*.{woff, woff2}',
            dirs.source + '/*.html',
            dirs.source + '/*.php',
            dirs.source + '/global/js/*.js',
            dirs.source + '*.php'
        ], {
            base: dirs.source
        })
        .pipe(gulp.dest(dirs.build))
});


gulp.task('clean-icons-folder', function () {
    console.log('Удаляем папку icons')
    return del(dirs.build + '/images/icon');
});

gulp.task('jshandler', function () {
    console.log('Обработка JS')
    return gulp.src([dirs.node + '/jquery/dist/jquery.js', dirs.node + '/slick-carousel/slick/slick.js',dirs.node + '/inputmask/dist/inputmask/inputmask.js', dirs.node + '/inputmask/dist/inputmask/jquery.inputmask.js', dirs.source + '/blocks/**/*.js'])
        .pipe(concat('script.min.js'))
        .pipe(plumber())
        .pipe(gulp.dest(dirs.build + '/js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.build + '/js'))
})


gulp.task('images', function () {
    console.log('Оптимизизация изображений');
    return gulp.src(dirs.source + '/images/**/*.{png,jpg,gif}')
        .pipe(newer(dirs.build + '/images/**/*.{png,jpg,gif}'))
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(gulp.dest(dirs.build + '/images'));
});

gulp.task('watch-images', function () {
    console.log('Изменение в папке изображений, сжимаю, копирую!')
    return gulp.src([dirs.source + '/images/**/*.{png,jpg,gif}', dirs.source + '/image/*.{png,jpg,gif}'])
        .pipe(gulp.dest(dirs.build + '/images'))
        .pipe(newer(dirs.build + '/images'))
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
})

gulp.task('svg-min', function () {
    return gulp.src(dirs.build + '/images/*.svg')
        .pipe(newer(dirs.build + '/images'))
        .pipe(svgmin())
        .pipe(gulp.dest(dirs.build + '/images'));
});

gulp.task('symbols', function () {
    return gulp.src(dirs.build + '/images/icons/*.svg')
        .pipe(newer(dirs.build + '/images'))
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('symbols.svg'))
        .pipe(gulp.dest(dirs.build + '/images'));
});

gulp.task('jade', function () {
    console.log('Компиляция HTML');
    return gulp.src([dirs.source + '/*.jade'])
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'HTML compilation error',
                    message: err.message
                })(err);
                this.emit('end');
            }
        }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
        .pipe(gulp.dest(dirs.build));
});

gulp.task('serve', function () {
    server.init({
        server: 'build'
    });
    gulp.watch(dirs.source + '/images/**/*.{png,jpg,gif}', ['watch-images']);
    gulp.watch(dirs.source + '/images/**/*.svg', ['svg-min', 'symbols']);
    gulp.watch(dirs.source + '/**/*.less', ['style']);
    gulp.watch(dirs.source + '/**/*.js', ['jshandler']);
    gulp.watch(dirs.source + '/**/*.jade', ['jade']).on('change', server.reload);
});

gulp.task('build', function (fn) {
    run(
        'clean',
        'copy',
        'jade',
        'style',
        'images',
        'svg-min',
        'symbols',
        'clean-icons-folder',
        'jshandler',
        fn
    );
});