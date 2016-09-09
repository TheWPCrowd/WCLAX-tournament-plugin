var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    concat = require( 'gulp-concat' );

var JSList = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-resource/angular-resource.min.js',
    './node_modules/firebase/firebase.js',
    './node_modules/angularfire/dist/angularfire.js',
    './assets/js/tournament-app.js'
];


gulp.task('js', function(){
   gulp
       .src(JSList)
       .pipe(sourcemaps.init())
       .pipe(concat('scripts.js'))
       .pipe(gulp.dest( './build/js' ))
});

gulp.task('default', ['js'], function(){
    return gulp.watch( JSList, ['js'] );
});
