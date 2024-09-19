const gulp = require('gulp');
const connect = require('gulp-connect');

// Пример задачи для запуска сервера
gulp.task('serve', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

// Пример задачи для сборки проекта
gulp.task('build', function(done) {
    console.log('Сборка проекта...');
    // Здесь можно добавить задачи по сборке
    done();
});

// Задача по умолчанию
gulp.task('default', gulp.series('serve'));
