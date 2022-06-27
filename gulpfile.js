const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const $ = require("gulp-load-plugins")({ pattern: ["*", "!sass"] });
const isSync = process.argv.indexOf("--sync") !== -1;
const isDev = process.argv.indexOf("--dev") !== -1;
const isProd = !isDev;

// console.log(JSON.stringify($));
let pckg = require("./package.json");
let webconf = {
	output: {
		filename: "common.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: { presets: ["@babel/preset-env"] },
				},
			},
		],
	},
	externals: {
		jquery: "jQuery",
	},
	mode: isDev ? "development" : "production",
	devtool: isDev ? "eval-source-map" : "none",
};

let pth = {
	pbl: {
		root: "./docs/",
		html: "./docs/",
		js: "./docs/",
		css: "./docs/",
		img: "./docs/images/",
 	},
	src: {
		root: "./src/",
		html: "./src/[^_]*.html",
		js: "./src/js/common.js",
		css: "./src/scss/style.scss",
		scss: "./src/scss/lib/",
		img: "./src/images/**/!(icon-*.svg|shape-*.svg)",
		shp: "./src/images/**/shape-*.svg",
		icn: "./src/images/**/icon-*.svg",
 		tmpl: "./src/templates/",
	},
	wtch: {
		html: "./src/**/*.html",
		js: ["./src/js/**/*.js", "./src/blocks/**/(*.js|*.json)"],
		css: ["./src/scss/**/*.scss", "./src/blocks/**/*.scss"],
		img: "./src/images/**/!(icon-*.svg|shape-*.svg)",
		shp: "./src/images/**/shape-*.svg",
		icn: "./src/images/**/icon-*.svg",
	},
};

function swallowError(error) {
	console.log(error.toString());
	this.emit("end");
}

function clear() {
	return $.del(pth.pbl.root + "*");
}

function js() {
	return gulp
		.src(pth.src.js)
		.pipe($.webpackStream(webconf))
		.on("error", swallowError)
		.pipe(gulp.dest(pth.pbl.js))
		.pipe($.if(isSync, $.browserSync.stream()))
		.on("end", function () {

		});
}

function jslib() {
	let paths = [];
	if (Object.keys(pckg.externalJs).length !== 0) {
		Object.entries(pckg.externalJs).forEach(function ([key, value], index) {
			paths[index] = `node_modules/${key}/${value}`;
		});

		return gulp.src(paths).pipe(gulp.dest(pth.pbl.js));
	}
	return gulp.src(".", { allowEmpty: true });
}

function html() {
	return (
		gulp
			.src(pth.src.html)
			.pipe($.fileInclude({ prefix: "@@", basepath: pth.src.tmpl }))
			.on("error", swallowError)
			/* .pipe($.if(isProd, $.versionNumber({
			'value': '%DT%',
			'append': {
				'to': [
					{ 'type': 'js', 'files': ['common.js'] },
					{ 'type': 'css', 'files': ['style.css'] }
				]
			}
		}))) */
			.pipe(gulp.dest(pth.pbl.html))
			.pipe($.if(isSync, $.browserSync.stream()))
	);
}

function styles() {
	return gulp
		.src(pth.src.css)
		.pipe($.if(isDev, $.sourcemaps.init()))
		.pipe($.sassGlob())
		.pipe(sass())
		.on("error", swallowError)
		.pipe(
			$.autoprefixer({
				overrideBrowserslist: ["last 4 version"],
				cascade: false,
				grid: true,
			})
		)
		.pipe($.if(isProd, $.groupCssMediaQueries()))
		.pipe($.if(isProd, $.cleanCss({ level: 2 })))
		.pipe($.if(isDev, $.sourcemaps.write()))
		.pipe(gulp.dest(pth.pbl.css))
		.pipe($.if(isSync, $.browserSync.stream()))
		.on("end", function () {});
}

function images() {
	return gulp
		.src(pth.src.img)
		.pipe($.newer(pth.pbl.img))
		.pipe(gulp.dest(pth.pbl.img))
		.pipe($.if(isSync, $.browserSync.stream()));
}

function icons() {
	return gulp
		.src(pth.src.icn)
		.pipe(
			$.svgSymbolView({
				name: "icons-sprite",
				monochrome: {
					primary: "#FFC635",
					black: "#263238",
					blue: "#3570C8",
					white: "#ffffff",
				},
			})
		)
		.pipe(gulp.dest(pth.pbl.img));
}

function shapes() {
	return gulp
		.src(pth.src.shp)
		.pipe($.svgSymbolView("svg-sprite"))
		.pipe(gulp.dest(pth.pbl.img));
}


function watch() {
	if (isSync) {
		$.browserSync.init({
			server: { baseDir: pth.pbl.root },
		});
	}
	gulp.watch(pth.wtch.js, js);
	gulp.watch(pth.wtch.html, html);
	gulp.watch(pth.wtch.css, styles);
	// gulp.watch(pth.wtch.img, gulp.parallel(images, icons));
	gulp.watch(pth.wtch.img, images);
	gulp.watch(pth.wtch.icn, icons);
	gulp.watch(pth.wtch.shp, shapes);
}

const build = gulp.series(
	clear,
	gulp.parallel(html, js, jslib, styles, images, icons, shapes)
);

exports.build = build;
exports.watch = gulp.series(build, watch);
