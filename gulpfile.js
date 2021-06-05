const gulp = require('gulp');
const shell = require('gulp-shell');
const path = require('path');
const mkdirp = require('mkdirp');
const apidoc = require('gulp-apidoc');
const argv = require('yargs')['argv'];

//#region Block Document
gulp.task('gen-doc', function (done) {
	apidoc({
		src: 'src',
		dest: 'dist/public',
		config: `./document/${argv.env || 'staging'}`,
		includeFilters: [".*\\.document\\.js|ts$"]
	}, done);
});
gulp.task('document-watch', gulp.series(['gen-doc'], function (done) {
	gulp.watch(['src/api/**/*.document.ts', 'src/api-admin/**/*.document.ts'],
		{
			events: [
				'add',
				'change',
				'unlink'
			]
		},
		gulp.series('gen-doc', function (done) {
			done();
		}));
}));
//#endregion

//#region Block Build
gulp.task('compile-ts', shell.task(['rm -rf dist', 'tsc', 'tslint -c tslint.json -p tsconfig.json']));
gulp.task('copy-non-ts', () => {
	return gulp.src(['src/**/*', '!src/**/*.ts', '!src/types'])
		.pipe(gulp.dest('dist/'));
});
gulp.task('build', gulp.series('compile-ts', 'copy-non-ts', function (done) {
	done();
}));

gulp.task('build:local', shell.task(['gulp build', 'gulp gen-doc --env=staging']));
gulp.task('build:staging', shell.task(['gulp build', 'gulp gen-doc --env=staging']));
gulp.task('build:develop', shell.task(['gulp build', 'gulp gen-doc --env=develop']));
gulp.task('build:production', shell.task(['gulp build']));
//#endregion
