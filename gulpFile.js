const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css',function(done){
    console.log('minifying css..');
    gulp.src('./assets/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./public/assets'))

    done();
});


gulp.task('js',function(done){

    console.log('minifying js..');
    var scripts = gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images',function(done){
    console.log('compressing images...');
    var images = gulp.src('./assets/**/*.+(png|jpeg|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('clear:assets',function(done){
    console.log('clearing assets..');
    del.sync('./public/assets');  
    done();
});

gulp.task('build',gulp.series('clear:assets','css','js','images'),function(done){
    console.log('building assets..');
    done();
});
