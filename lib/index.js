"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var icss_utils_1 = require("icss-utils");
var chokidar = __importStar(require("chokidar"));
var sass = __importStar(require("node-sass"));
var util_1 = require("util");
var postcss_1 = __importDefault(require("postcss"));
var fs = __importStar(require("fs"));
var postcss_icss_selectors_1 = __importDefault(require("postcss-icss-selectors"));
var postcss_nested_1 = __importDefault(require("postcss-nested"));
// import * as strip from 'strip-css-singleline-comments/sync'
var pipeline_1 = __importDefault(require("soultrain/lib/function/pipeline"));
var object_1 = require("soultrain/lib/object");
var mapArray_1 = __importDefault(require("soultrain/lib/array/mapArray"));
var bindStrict_1 = __importDefault(require("soultrain/lib/function/bindStrict"));
// import { split } from 'soultrain/lib/string'
// import last from 'soultrain/lib/array/last'
// import append from 'soultrain/lib/array/append'
var logging_1 = require("soultrain/lib/logging");
var renderPromise = util_1.promisify(sass.render);
var writePromise = util_1.promisify(fs.writeFile);
var unlinkPromise = util_1.promisify(fs.unlink);
var processor = postcss_1.default(postcss_nested_1.default, postcss_icss_selectors_1.default({ mode: 'local' }));
var toCamelCase = function (str) { return str.replace(/[_-]+(\w)/g, function (_match, firstLetter) { return firstLetter.toUpperCase(); }); };
// const getPath = ( outputDir: string, file: string ) => `${outputDir}/${file}.d.ts`
var getDtsContent = function (sassInclude, includeIndexKey, path) { return __awaiter(void 0, void 0, void 0, function () {
    var result, lazyResult, classes, namedExports, defaultExport, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, renderPromise({
                        file: path,
                        includePaths: sassInclude
                    })
                    // hmm... can't be piped...
                ];
            case 1:
                result = _a.sent();
                lazyResult = processor.process(result.css.toString());
                classes = pipeline_1.default(lazyResult, object_1.prop('root'), icss_utils_1.extractICSS, object_1.prop('icssExports'), object_1.keys, mapArray_1.default(toCamelCase));
                namedExports = classes
                    .map(function (cssClass) { return "export const " + cssClass + ": string;"; })
                    .join('\n');
                defaultExport = 'export default {} as {\n'
                    + classes.map(function (cssClass) { return "  " + cssClass + ": string,"; }).join('\n')
                    + (includeIndexKey ? '\n  [ key: string ]: string' : '')
                    + '\n}';
                return [2 /*return*/, namedExports + "\n" + defaultExport];
            case 2:
                e_1 = _a.sent();
                logging_1.trace(e_1);
                return [2 /*return*/, ''];
            case 3: return [2 /*return*/];
        }
    });
}); };
// const shaveLeft = ( remove: string, source: string ) => {
//   return source[0] === remove 
//     ? source.slice(1)
//     : source
// }
// const shaveRight = ( remove: string, source: string ) => {
//   return source[ source.length ] === remove 
//     ? source.slice(0,1)
//     : source
// }
// const shave = ( remove: string, source: string ) => pipeline(
//   source,
//   bind(shaveLeft, remove),
//   bind(shaveRight, remove)
// )
// const prependString = (a: string, b: string) => a.concat(b)
// const appendString = (a: string, b: string) => b.concat(a)
// const getWritePath = ( outputDir: string, file: string ) => {
//   return pipeline(
//     file,
//     bind(shaveRight, '/'),
//     split('/'),
//     last,
//     bind(prependString,`${outputDir}/`),
//     bind(appendString,`.d.ts`),
//   ).replace(/\+/,'/')
// }
var writeDtsContent = function (file, content) { return __awaiter(void 0, void 0, void 0, function () {
    var _, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, writePromise(file + ".d.ts", content, 'utf8')
                    // log(`wrote ${file}`)
                ];
            case 1:
                _ = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                logging_1.trace(e_2);
                logging_1.trace(''
                    + ("Error writing file " + file + ", are you sure the \n")
                    + "permissions set correctly?");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addOrUpdateAction = function (sassInclude, objectIndex, file) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = pipeline_1.default;
                return [4 /*yield*/, getDtsContent(sassInclude, objectIndex, file)];
            case 1:
                _b = [_c.sent()];
                return [4 /*yield*/, bindStrict_1.default(writeDtsContent, file)];
            case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
        }
    });
}); };
var deleteAction = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var message, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, unlinkPromise(file + ".d.ts")];
            case 1:
                message = _a.sent();
                if (message !== null) {
                    logging_1.trace(message);
                }
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                logging_1.trace(e_3);
                logging_1.trace(''
                    + ("Error unlinking file " + file + ", are you sure the \n")
                    + "permissions set correctly?");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.outputDtsFiles = function (_a) {
    // log({watchPattern})
    var _b = _a.watchPattern, watchPattern = _b === void 0 ? '*.module.scss' : _b, _c = _a.objectIndex, objectIndex = _c === void 0 ? false : _c, _d = _a.sassInclude, sassInclude = _d === void 0 ? ['src/'] : _d;
    var watcher = chokidar.watch(watchPattern, { depth: 10 });
    watcher
        .on('add', bindStrict_1.default(addOrUpdateAction, sassInclude, objectIndex))
        .on('change', bindStrict_1.default(addOrUpdateAction, sassInclude, objectIndex))
        .on('unlink', deleteAction);
};
exports.default = exports.outputDtsFiles;
