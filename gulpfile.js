var 
// Основа
    gulp         = require ('gulp'),
    plumber      = require ('gulp-plumber'),
    browserSync  = require('browser-sync').create(),

// Файлы
    rename   = require ('gulp-rename'),
    concat   = require ('gulp-concat'),
    clear    = require ('gulp-clean'),

// Разметка
    pug          = require ('gulp-pug'),
    htmlbeautify = require ('gulp-html-beautify'),

// Стили
    stylus       = require ('gulp-stylus');
    combineMq    = require ('gulp-combine-mq'),
    csscomb      = require ('gulp-csscomb'),
    cssclean     = require ('gulp-clean-css'),
    cssbeautify  = require ('gulp-cssbeautify');
    rupture      = require ('rupture');

// Скрипты
    uglify  = require ('gulp-uglify'),

// Изображения
    imagemin = require('gulp-imagemin');

// Опции
var options = {
    minifyStyles: true,
    minifyScripts: true
};

// Пропустить ошибку
function swallowError(error) {
    console.log(error.message);
    this.emit('end');
}

// Разметка
gulp.task('pug', function () {
    return gulp.src('src/static/markup/*.pug')
    .pipe(plumber())
    .pipe(pug({
        doctype: 'html'
    }))
    .pipe(htmlbeautify({
        'indent_size': 4,
        'indent_char': ' ',
        'unformatted': 'html',
        'extra_liners': ' '
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

// Стили
gulp.task('styles', ['styles-compile', 'css-plugins'], function() {
    if (options.minifyStyles) {
        return gulp.src([
                'build/assets/css/reset.css',
                'build/assets/css/style.css',
                'build/assets/css/content.css',
                'build/assets/css/plugins.css',
            ])
            .pipe(cssclean())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build/assets/css/min/'))
            .pipe(browserSync.stream());
    }
});

gulp.task('styles-compile', function() {
    return gulp.src('src/static/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: [
                rupture()
            ],
            'include css': true
        })).on('error', swallowError)
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(cssbeautify())
        .pipe(csscomb())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('css-plugins', function(){
    return gulp.src('src/assets/css/plugins.css')
    .pipe(gulp.dest('build/assets/css'))
});

// Скрипты
gulp.task('script', ['assets-script', 'js-compile' ,],  function (){
    if (options.minifyScripts) {
        return gulp.src([
                'build/assets/js/plugins.js'
            ])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream());
    }
});

// Берем plugins
gulp.task('assets-script', function() {
    return gulp.src('src/assets/js/*.js')
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('js-compile', function (){
    return gulp.src ('src/static/scripts/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(browserSync.stream());
});

// Фавикон
gulp.src('favicons', function() {
    gulp.src('src/assets/favicons/*')
    .pipe(gulp.dest('build/favicons'))
});

// Изображения элементов дизайна
gulp.task('assets-images', function() {
    return gulp.src ('src/assets/img/**/*.{jpg,gif,png,svg}')
    .pipe(plumber())
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{removeViewBox: true}]
    }))
    .pipe(gulp.dest('build/assets/images'))
    .pipe(browserSync.stream());
});

// Шрифты
gulp.task('assets-fonts', function (){
    return gulp.src ('src/assets/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('build/assets/fonts'))
    .pipe(browserSync.stream());
});

// Чистка перед сборкой
gulp.task('clear', function (){
    return gulp.src ('build')
    .pipe(clear())
});

gulp.task('default', ['export'], function (){

    // Сервер
    browserSync.init({
        server: 'build',
        notify: false
    });


    // Верстка
    gulp.watch('src/static/markup/**/*.pug', ['pug']);
    gulp.watch('build/*.html').on('change', browserSync.reload);

    gulp.watch('src/static/stylus/**/*.styl', ['styles']);
    gulp.watch('build/assets/css/*.css').on('change', browserSync.reload);

    gulp.watch('src/static/scripts/**/*.js', ['script']);
    gulp.watch('build/assets/js/*.js').on('change', browserSync.reload);

    // Остальное
    gulp.watch('src/assets/favicons/*', ['favicons']);
    gulp.watch('build/favicons/*').on('change', browserSync.reload);

    gulp.watch('src/assets/img/**/*.{jpg,gif,png,svg}', ['assets-images']);
    gulp.watch('build/assets/images/**/*').on('change', browserSync.reload);

    gulp.watch('src/assets/fonts/**/*', ['assets-fonts']);
    gulp.watch('build/assets/fonts/**/*').on('change', browserSync.reload);

});

gulp.task('export', function (){

    'pug',
    'styles',
    'script',
    'assets-images',
    'assets-fonts',
    'favicons'

});
