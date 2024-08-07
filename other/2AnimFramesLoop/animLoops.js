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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var a1Max = 4;
var anim1counter = a1Max;
var a2Max = 5;
var anim2counter = a2Max;
var ia2Max = 200;
var internalAnim2counter = ia2Max;
var animationFrameID = null;
var internalAnimFrameID = null;
var x = 0;
function anim1() {
    return __awaiter(this, void 0, void 0, function () {
        var pic, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    _a.label = 1;
                case 1:
                    if (!(anim1counter > 0)) return [3 /*break*/, 3];
                    pic = document.getElementById("pic");
                    pic.setAttribute("src", "resources/bgnd.png");
                    anim1counter--;
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1300); })];
                case 2:
                    _a.sent(); // simulate delay
                    return [3 /*break*/, 1];
                case 3:
                    anim1counter = a1Max;
                    return [4 /*yield*/, anim2()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function anim2() {
    return __awaiter(this, void 0, void 0, function () {
        var pic, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    _a.label = 1;
                case 1:
                    if (!(anim2counter > 0)) return [3 /*break*/, 4];
                    pic = document.getElementById("pic");
                    pic.setAttribute("src", "resources/plane.png");
                    return [4 /*yield*/, internalAnim2()];
                case 2:
                    _a.sent();
                    anim2counter--;
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1300); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 4:
                    anim2counter = a2Max;
                    return [4 /*yield*/, anim1()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function internalAnim2() {
    return __awaiter(this, void 0, void 0, function () {
        var pic, animHandle, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pic = document.getElementById("pic");
                    animHandle = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    _a.label = 2;
                case 2:
                    if (!(internalAnim2counter > 0)) return [3 /*break*/, 4];
                    internalAnim2counter--;
                    x++;
                    pic.style.left = new String(x) + 'px';
                    animHandle = requestAnimationFrame(function () { return internalAnim2(); });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4:
                    cancelAnimationFrame(animHandle);
                    x = 0;
                    pic.style.left = "0px";
                    internalAnim2counter = ia2Max;
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
anim1();
