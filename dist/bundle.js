/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = function () {
    function Data(groups, UI) {
        _classCallCheck(this, Data);

        this.groups = groups;
        this.UI = UI;

        this._data = [];

        this.directDraw = false;

        this.initialize();
    }

    _createClass(Data, [{
        key: "draw",
        value: function draw() {
            var _this = this;

            this._data.forEach(function (arr, x) {
                arr.forEach(function (point, y) {
                    _this.UI.setElementValue(x, y, point.value);
                });
            });
        }
    }, {
        key: "set",
        value: function set(x, y, v) {
            if (this.directDraw) {
                this.UI.setElementValue(x, y, v);
            }
            this.setValue(x, y, v);
        }
    }, {
        key: "setValue",
        value: function setValue(x, y, v) {
            this._data[x][y].history.push(v);
            this._data[x][y].value = v;
        }
    }, {
        key: "clearValue",
        value: function clearValue(x, y) {
            this._data[x][y].value = 0;
        }
    }, {
        key: "get",
        value: function get(x, y) {
            return this._data[x][y];
        }
    }, {
        key: "getValue",
        value: function getValue(x, y) {
            return this.get(x, y).value;
        }
    }, {
        key: "initialize",
        value: function initialize() {
            var _this2 = this;

            for (var y = 0; y < 9; y++) {
                for (var x = 0; x < 9; x++) {

                    if (!this._data[x]) this._data[x] = [];
                    this._data[x][y] = {
                        value: 0,
                        history: [],
                        group: this.findGroup(x, y)
                    };
                }
            }

            this.groups.forEach(function (group) {
                group.getPoints = function () {
                    var points = [];
                    group.fields.forEach(function (field) {
                        points.push(_this2.get(field.x, field.y));
                    });
                    return points;
                };
                group.fields.forEach(function (field) {
                    if (field.value > 0) {
                        _this2._data[field.x][field.y].value = field.value;
                        _this2._data[field.x][field.y].editable = false;

                        _this2.UI.setElementValue(field.x, field.y, field.value);
                    }
                });
            });
        }
    }, {
        key: "findGroup",
        value: function findGroup(x, y) {
            var _group = void 0;
            this.groups.forEach(function (group) {
                var match = group.fields.find(function (field) {
                    return field.x === x && field.y === y;
                });
                if (match) _group = group;
            });
            return _group;
        }
    }, {
        key: "getColumn",
        value: function getColumn(y) {
            return this._data[y].map(function (point) {
                return point.value;
            });
        }
    }, {
        key: "getRow",
        value: function getRow(x) {
            var arr = [];
            for (var i = 0; i < 9; i++) {
                arr.push(this._data[i][x].value);
            }
            return arr;
        }
    }, {
        key: "getBlock",
        value: function getBlock(x, y) {
            var _x = x - x % 3,
                _xLimit = _x + 3,
                _y = y - y % 3,
                _yLimit = _y + 3,
                arr = [];

            for (var a = _x; a < _xLimit; a++) {
                for (var b = _y; b < _yLimit; b++) {
                    arr.push(this.getValue(a, b));
                }
            }

            return arr;
        }
    }]);

    return Data;
}();

exports.default = Data;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Solver = function () {
    function Solver(Data) {
        _classCallCheck(this, Solver);

        this.Data = Data;
        this.interval = null;
        this.iterations = 0;
        this.currentPoint = {
            x: 0,
            y: 0
        };
        this.done = false;
        this.startTime = null;
    }

    _createClass(Solver, [{
        key: 'run',
        value: function run(a) {
            this._init(a);
            this._run(a);

            this.Data.draw();
        }
    }, {
        key: '_run',
        value: function _run(c) {
            for (var i = 0; i < c; i++) {
                if (this.done) {
                    break;
                }
                this.step();
            }

            if (this.iterations % 10000 === 0) console.clear();

            if (this.done) {
                this._finish();
            }
        }
    }, {
        key: '_init',
        value: function _init(a) {
            console.log('==== Running Solver for [%s] steps ====', a);
            this.startTime = new Date();
        }
    }, {
        key: '_finish',
        value: function _finish() {
            console.clear();
            var end = new Date(),
                elapsed = (end.getTime() - this.startTime.getTime()) / 1000;
            console.log('==== Finished with [%s] steps ====', this.iterations);
            console.log('==== Time elapsed: %s ====', elapsed);
            console.log('==== %s Iterations per second ====', this.iterations / elapsed);
        }
    }, {
        key: 'runSteps',
        value: function runSteps() {
            var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16.6;

            this._init('~');
            this.Data.directDraw = true;
            this.interval = setInterval(this._run.bind(this, 1), i);
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this.interval);
        }
    }, {
        key: 'nextPoint',
        value: function nextPoint() {
            this.currentPoint.x++;
            if (this.currentPoint.x === 9) {
                this.currentPoint.x = 0;
                this.currentPoint.y++;
            }
            if (this.currentPoint.y === 9) {
                clearInterval(this.interval);
                this.Data.draw();
                this.done = true;
            }
        }
    }, {
        key: 'previousPoint',
        value: function previousPoint() {
            this.currentPoint.x--;
            if (this.currentPoint.x === -1) {
                this.currentPoint.x = 8;
                this.currentPoint.y--;
            }
        }
    }, {
        key: 'step',
        value: function step() {
            this.iterations++;
            var value = this.getPossibleValue();
            console.log('I: %s - Step for point (%s, %s): %s', this.iterations, this.currentPoint.x, this.currentPoint.y, value);

            if (value !== false) {
                this.Data.set(this.currentPoint.x, this.currentPoint.y, value);
                this.nextPoint();
            } else {
                this.Data.set(this.currentPoint.x, this.currentPoint.y, 0);
                this.Data.get(this.currentPoint.x, this.currentPoint.y).history = [];
                this.previousPoint();
            }
        }
    }, {
        key: 'getPossibleValue',
        value: function getPossibleValue() {
            var point = this.Data.get(this.currentPoint.x, this.currentPoint.y);

            if (!point) throw new Error('Point (' + this.currentPoint.x + ', ' + this.currentPoint.y + ') not found');

            if (point.hasOwnProperty('editable') && point.editable === false) return point.value;

            this.Data.clearValue(this.currentPoint.x, this.currentPoint.y);

            var row = this.Data.getRow(this.currentPoint.y),
                column = this.Data.getColumn(this.currentPoint.x),
                block = this.Data.getBlock(this.currentPoint.x, this.currentPoint.y),
                points = point.group.getPoints(),
                group = points.filter(function (point) {
                return point.value > 0;
            }).map(function (point) {
                return point.value;
            }),
                usedValues = row.concat(column, block, point.history, group);

            var pointsToDo = points.filter(function (point) {
                return point.value === 0;
            }).length,
                total = point.group.total,
                isLastPoint = pointsToDo === 1,
                groupSum = points.map(function (point) {
                return point.value;
            }).sum();

            var min = 1,
                max = Math.min(total - minMargin(pointsToDo - 1), total - groupSum, 9);

            if (isLastPoint) {
                min = total - groupSum;
                max = min;
            }

            return uniqueValue(usedValues, min, max);
        }
    }]);

    return Solver;
}();

exports.default = Solver;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
    function UI() {
        _classCallCheck(this, UI);

        this.element = document.getElementById('puzzle');

        this.draw();
    }

    _createClass(UI, [{
        key: 'draw',
        value: function draw() {
            for (var y = 0; y < 9; y++) {
                for (var x = 0; x < 9; x++) {
                    var div = document.createElement('div');
                    div.classList.add('field');
                    div.id = 'field-' + x + '-' + y;
                    div.innerHTML = '(' + x + ', ' + y + ')<br/><span class="value">0</span>';
                    this.element.appendChild(div);
                }
            }
        }
    }, {
        key: 'colorGroups',
        value: function colorGroups(groups) {
            var _this = this;

            groups.forEach(function (group) {
                var color = getRandomColor(),
                    textColor = invert(color);

                group.fields.forEach(function (field) {
                    var el = _this.getElement(field.x, field.y);
                    el.style.backgroundColor = '#' + color;
                    el.style.color = '#' + textColor;
                });
            });
        }
    }, {
        key: 'getElement',
        value: function getElement(x, y) {
            return document.getElementById('field-' + x + '-' + y);
        }
    }, {
        key: 'setElementValue',
        value: function setElementValue(x, y, value) {
            this.getElement(x, y).innerHTML = '(' + x + ', ' + y + ')<br/><span class="value">' + value + '</span>';4;
        }
    }]);

    return UI;
}();

exports.default = UI;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

global.getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

global.invert = function (hexnum) {
    if (hexnum.length != 6) {
        console.error("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for (var i = 0; i < 6; i++) {
        if (!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if (complexnum[splitnum[i]]) {
            resultnum += complexnum[splitnum[i]];
        } else {
            console.error("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }

    return resultnum;
};

Array.prototype.sum = function () {
    return this.reduce(function (a, b) {
        return a + b;
    }, 0);
};

Array.prototype.hasDuplicates = function () {
    var valuesSoFar = [];
    for (var i = 0; i < this.length; ++i) {
        var value = this[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
};

global.minMargin = function (amount) {
    return amount * (amount + 1) / 2;
};

global.numBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

global.uniqueValue = function (nums, min) {
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;

    var num = min;
    while (nums.indexOf(num) !== -1) {
        num++;
    }

    if (num > max || num > 9) return false;

    return num;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var groups = [{
    total: 8,
    fields: [{ x: 1, y: 1 }, { x: 1, y: 2 }]
}, {
    total: 27,
    fields: [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
}, {
    total: 10,
    fields: [{ x: 5, y: 1 }, { x: 5, y: 2 }]
}, {
    total: 4,
    fields: [{ x: 6, y: 1 }, { x: 7, y: 1 }]
}, {
    total: 6,
    fields: [{ x: 8, y: 1 }, { x: 9, y: 1 }]
}, {
    total: 14,
    fields: [{ x: 3, y: 2 }, { x: 4, y: 2 }]
}, {
    total: 9,
    fields: [{ x: 6, y: 2 }, { x: 6, y: 3 }]
}, {
    total: 12,
    fields: [{ x: 7, y: 2 }, { x: 7, y: 3 }]
}, {
    total: 14,
    fields: [{ x: 8, y: 2 }, { x: 9, y: 2 }]
}, {
    total: 15,
    fields: [{ x: 1, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 4 }]
}, {
    total: 6,
    fields: [{ x: 3, y: 3 }, { x: 3, y: 4 }]
}, {
    total: 10,
    fields: [{ x: 4, y: 3 }, { x: 5, y: 3 }]
}, {
    total: 12,
    fields: [{ x: 8, y: 3 }, { x: 9, y: 3 }]
}, {
    total: 23,
    fields: [{ x: 4, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 6, y: 6 }]
}, {
    total: 18,
    fields: [{ x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }]
}, {
    total: 10,
    fields: [{ x: 9, y: 4 }, { x: 9, y: 5 }]
}, {
    total: 8,
    fields: [{ x: 1, y: 5 }, { x: 1, y: 6 }]
}, {
    total: 9,
    fields: [{ x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }]
}, {
    total: 20,
    fields: [{ x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }]
}, {
    total: 21,
    fields: [{ x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }]
}, {
    total: 6,
    fields: [{ x: 7, y: 6 }, { x: 7, y: 7 }]
}, {
    total: 13,
    fields: [{ x: 8, y: 6 }, { x: 9, y: 6 }, { x: 9, y: 7 }]
}, {
    total: 14,
    fields: [{ x: 1, y: 7 }, { x: 2, y: 7 }]
}, {
    total: 11,
    fields: [{ x: 3, y: 7 }, { x: 3, y: 8 }]
}, {
    total: 10,
    fields: [{ x: 4, y: 7 }, { x: 4, y: 8 }]
}, {
    total: 7,
    fields: [{ x: 5, y: 7 }, { x: 6, y: 7 }]
}, {
    total: 28,
    fields: [{ x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }]
}, {
    total: 14,
    fields: [{ x: 1, y: 8 }, { x: 2, y: 8 }]
}, {
    total: 14,
    fields: [{ x: 5, y: 8 }, { x: 5, y: 9 }]
}, {
    total: 9,
    fields: [{ x: 6, y: 8 }, { x: 7, y: 8 }]
}, {
    total: 8,
    fields: [{ x: 9, y: 8 }, { x: 9, y: 9 }]
}, {
    total: 3,
    fields: [{ x: 1, y: 9 }, { x: 2, y: 9 }]
}, {
    total: 12,
    fields: [{ x: 3, y: 9 }, { x: 4, y: 9 }]
}];

groups.forEach(function (group) {
    group.fields.forEach(function (field) {
        field.x--;
        field.y--;
        if (!field.value) field.value = 0;
    });
});

exports.default = groups;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _initialData = __webpack_require__(4);

var _initialData2 = _interopRequireDefault(_initialData);

__webpack_require__(3);

var _Data = __webpack_require__(0);

var _Data2 = _interopRequireDefault(_Data);

var _UI = __webpack_require__(2);

var _UI2 = _interopRequireDefault(_UI);

var _Solver = __webpack_require__(1);

var _Solver2 = _interopRequireDefault(_Solver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('==== Construction UI Class ====');
var UI = new _UI2.default();

console.log('==== Construction Data Class ====');
var Data = new _Data2.default(_initialData2.default, UI);

console.log('==== Coloring groups ====');
UI.colorGroups(_initialData2.default);

console.log('==== Construction Solver Class ====');
window.Solver = new _Solver2.default(Data);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);