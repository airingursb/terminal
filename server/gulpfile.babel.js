import gulp from 'gulp'
import watch from 'gulp-watch'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import nodemon from 'gulp-nodemon'

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('transform', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  return gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js', {
      verbose: true
    }))
    .pipe(eslint({configFle: './.eslintrc'}))
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('dev', () => {
  gulp.start('transform')
  gulp.start('watch')
  nodemon({
    script: 'dist/app.js',
    ext: 'js',
    env: {'NODE_ENV': 'development'}
  })
})

gulp.task('default', ['transform', 'lint'], () => {
  nodemon({
    script: 'dist/app.js',
    ext: 'js',
    watch: 'src',
    tasks: ['transform']
  })
})
