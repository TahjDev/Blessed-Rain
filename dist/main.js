/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/animator.js":
/*!*********************************!*\
  !*** ./src/scripts/animator.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frames */ "./src/scripts/frames.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Player = /*#__PURE__*/function () {
  function Player(frameSet) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "loop";

    _classCallCheck(this, Player);

    this.count = 0;
    this.delay = 1;
    this.frameIndex = 0;
    this.frameSet = frameSet;
    this.frameValue = frameSet[0];
    this.mode = mode;
  }

  _createClass(Player, [{
    key: "frameValue",
    value: function frameValue() {
      return this.frameValue;
    }
  }, {
    key: "animate",
    value: function animate() {
      switch (this.mode) {
        case "loop":
          this.loop();
          break;

        case "play":
          this.play();
          "break";

        case "pause":
          break;
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.count++;
      this.frameIndex++;

      if (this.count > this.frameSet.length - 1) {
        return null;
      } else {
        this.frameValue[this.frameIndex];
      }
    }
  }, {
    key: "loop",
    value: function loop() {
      this.count++;
      console.log(this.frameSet);
      console.log(this.count);
      this.frameIndex = this.count > this.frameSet.length - 1 ? this.count = 0 : this.frameIndex + 1;
      this.frameValue = this.frameSet[this.frameIndex];
    }
  }, {
    key: "updateAnimation",
    value: function updateAnimation() {
      this.animate();
    }
  }]);

  return Player;
}();

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "draw": function() { return /* binding */ draw; }
/* harmony export */ });
/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animator */ "./src/scripts/animator.js");
/* harmony import */ var _frames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frames */ "./src/scripts/frames.js");


var allFrameSets = {
  right: {
    idleRight: [0, 1, 2],
    jumpRight: [6, 7, 8],
    runRight: [12, 13, 14, 15, 16, 17, 18]
  },
  left: {
    idleLeft: [3, 4, 5],
    jumpLeft: [9, 10, 11],
    runLeft: [19, 20, 21, 22, 23, 24, 25]
  }
};
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = canvas.height - 100;
var velocity_x = 0;
var velocity_y = 0;
var rightpressed = false;
var leftpressed = false;
var lastpressed = false;
var uppressed = false;
var idle = true;
var player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);

var setIdle = function setIdle() {
  if (velocity_x === 0 && lastpressed == "right" && idle === false) {
    idle = true;
    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
  } else if (velocity_x === 0 && lastpressed == "left" && idle === false) {
    idle = true;
    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.idleLeft);
  } else if (velocity_x === 0 && lastpressed == false && idle === false) {
    idle = true;
    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
  }
};

var runningRight = function runningRight() {
  if (rightpressed && idle === true) {
    idle = false;
    velocity_x = 20;
    lastpressed = "right"; // rightpressed = false

    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);

    if (uppressed) {
      player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
    }
  } else if (rightpressed && idle == false && lastpressed == "left") {
    velocity_x = -20;
    lastpressed = "right"; // rightpressed = false

    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
  }
};

var jumping = function jumping() {
  if (uppressed) {
    idle = false; // uppressed = false

    player = lastpressed === "left" ? new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.jumpLeft) : new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.jumpRight);

    if (y <= canvas.height - 100) {
      setTimeout(function () {
        idle = true;
        player = lastpressed === "left" ? new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.idleLeft) : new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
      }, 100);
    } // else if (lastpressed === "left") {
    //     setTimeout(() => {
    //         player = new Player(allFrameSets.left.idleLeft)
    //     }
    //         , 100)
    // }

  }
};

var runningLeft = function runningLeft() {
  if (leftpressed && idle == true) {
    idle = false;
    velocity_x = -25;
    lastpressed = "left"; // rightpressed = false

    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);

    if (uppressed) {
      player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
    }
  } else if (leftpressed && idle == false && lastpressed == "right") {
    velocity_x = -25;
    lastpressed = "left"; // rightpressed = false

    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
  }
};

var draw = function draw() {
  setIdle(); //running and looking right

  runningRight();
  console.log(lastpressed); // jumping 

  jumping(); //running and looking left

  runningLeft();
  console.log(player.frameValue); // drawing the player 

  var img = new Image();
  img.src = "src/images/tanjiro_sprite.png"; // picks the correct number of frames

  var frame = _frames__WEBPACK_IMPORTED_MODULE_1__.frames[player.frameValue]; // starts animation

  player.updateAnimation();

  img.onload = function () {
    // player.updateAnimation
    ctx.clearRect(0, 0, canvas.width, canvas.height); // ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, 80, 100)

    ctx.drawImage(img, 283, 292, 55, 70, x, y, 80, 100);
    ctx.drawImage(img, 0, 380, 100, 70, x, y, 140, 100);
    ctx.drawImage(img, 128, 384, 100, 70, x, y, 140, 100);
    ctx.drawImage(img, 227, 382, 100, 70, x, y, 140, 100);
  }; // gravity


  y += 25; // collision control

  if (x + 2 > canvas.width - 80) x = canvas.width - 80;
  if (x - 2 < 0) x = 0;
  if (y + 8 > canvas.height - 100) y = canvas.height - 100; // collision control
  //  moving right and left

  if (leftpressed && rightpressed === false) x += velocity_x;
  if (rightpressed && leftpressed === false) x += velocity_x;

  if (uppressed && y === canvas.height - 100) {
    y -= 80;
  } //  moving right and left

};

var keyDownHandler = function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightpressed = true;
    velocity_x = 20;
  } else if ((e.key == "Up" || e.key == "ArrowUp") && uppressed === false) {
    uppressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftpressed = true;
    velocity_x = -20;
  }
};

var keyUpHandler = function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightpressed = false;
    velocity_x = 0;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    uppressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    velocity_x = 0;
    leftpressed = false;
  }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/***/ }),

/***/ "./src/scripts/frames.js":
/*!*******************************!*\
  !*** ./src/scripts/frames.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "frames": function() { return /* binding */ frames; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Frame = /*#__PURE__*/function () {
  function Frame(x, y, width, height) {
    _classCallCheck(this, Frame);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  _createClass(Frame, [{
    key: "x",
    value: function x() {
      return this.x;
    }
  }, {
    key: "y",
    value: function y() {
      return this.y;
    }
  }, {
    key: "height",
    value: function height() {
      return this.height;
    }
  }, {
    key: "width",
    value: function width() {
      return this.width;
    }
  }]);

  return Frame;
}();

var frames = [new Frame(0, 5, 60, 70, 100, 110), new Frame(62, 5, 60, 70), new Frame(125, 5, 60, 70), // 0 idle right
new Frame(197, 5, 60, 70), new Frame(258, 5, 60, 70), new Frame(320, 5, 60, 70), // 3 idle left
new Frame(40, 70, 55, 70), new Frame(40, 70, 55, 70), new Frame(40, 70, 55, 70), //6 jump right
new Frame(280, 70, 55, 70), new Frame(280, 70, 55, 70), new Frame(280, 70, 55, 70), //9 jump right
new Frame(100, 133, 55, 70), new Frame(164, 133, 55, 70), new Frame(225, 133, 55, 70), new Frame(285, 133, 55, 70), new Frame(335, 133, 55, 70), new Frame(0, 212, 55, 70), new Frame(62, 212, 55, 70), //12 runnning right
new Frame(115, 212, 55, 70), new Frame(170, 212, 55, 70), new Frame(225, 212, 55, 70), new Frame(277, 212, 55, 70), new Frame(325, 212, 55, 70), new Frame(4, 292, 55, 70), new Frame(75, 292, 55, 70), new Frame(283, 292, 55, 70), new Frame(0, 380, 100, 70), new Frame(128, 384, 100, 70), new Frame(227, 382, 55, 70) //26 basic attack right
];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/board */ "./src/scripts/board.js");

var interval = setInterval(_scripts_board__WEBPACK_IMPORTED_MODULE_0__.draw, 200);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9mcmFtZXMuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGxheWVyIiwiZnJhbWVTZXQiLCJtb2RlIiwiY291bnQiLCJkZWxheSIsImZyYW1lSW5kZXgiLCJmcmFtZVZhbHVlIiwibG9vcCIsInBsYXkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiYW5pbWF0ZSIsImFsbEZyYW1lU2V0cyIsInJpZ2h0IiwiaWRsZVJpZ2h0IiwianVtcFJpZ2h0IiwicnVuUmlnaHQiLCJsZWZ0IiwiaWRsZUxlZnQiLCJqdW1wTGVmdCIsInJ1bkxlZnQiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIngiLCJ5IiwiaGVpZ2h0IiwidmVsb2NpdHlfeCIsInZlbG9jaXR5X3kiLCJyaWdodHByZXNzZWQiLCJsZWZ0cHJlc3NlZCIsImxhc3RwcmVzc2VkIiwidXBwcmVzc2VkIiwiaWRsZSIsInBsYXllciIsInNldElkbGUiLCJydW5uaW5nUmlnaHQiLCJqdW1waW5nIiwic2V0VGltZW91dCIsInJ1bm5pbmdMZWZ0IiwiZHJhdyIsImltZyIsIkltYWdlIiwic3JjIiwiZnJhbWUiLCJmcmFtZXMiLCJ1cGRhdGVBbmltYXRpb24iLCJvbmxvYWQiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImRyYXdJbWFnZSIsImtleURvd25IYW5kbGVyIiwiZSIsImtleSIsImtleVVwSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJGcmFtZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUtNQSxNO0FBQ0Ysa0JBQVlDLFFBQVosRUFBcUM7QUFBQSxRQUFmQyxJQUFlLHVFQUFSLE1BQVE7O0FBQUE7O0FBQzdCLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0osUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLSyxVQUFMLEdBQWtCTCxRQUFRLENBQUMsQ0FBRCxDQUExQjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUVQOzs7O1dBRUQsc0JBQWE7QUFDVCxhQUFPLEtBQUtJLFVBQVo7QUFDSDs7O1dBRUQsbUJBQVU7QUFDTixjQUFRLEtBQUtKLElBQWI7QUFDSSxhQUFLLE1BQUw7QUFDSSxlQUFLSyxJQUFMO0FBQ0E7O0FBQ0osYUFBSyxNQUFMO0FBQ0ksZUFBS0MsSUFBTDtBQUNBOztBQUNKLGFBQUssT0FBTDtBQUNJO0FBUlI7QUFXSDs7O1dBRUQsZ0JBQU87QUFDSCxXQUFLTCxLQUFMO0FBRUEsV0FBS0UsVUFBTDs7QUFFQSxVQUFJLEtBQUtGLEtBQUwsR0FBYSxLQUFLRixRQUFMLENBQWNRLE1BQWQsR0FBdUIsQ0FBeEMsRUFBMkM7QUFDdkMsZUFBTyxJQUFQO0FBQ0gsT0FGRCxNQUdLO0FBQ0QsYUFBS0gsVUFBTCxDQUFnQixLQUFLRCxVQUFy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K0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUtBLElBQU1DLFFBQVEsR0FBR0MsV0FBVyxDQUFDbEIsZ0RBQUQsRUFBTyxHQUFQLENBQTVCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyYW1lcyB9IGZyb20gXCIuL2ZyYW1lc1wiXG5cblxuXG5cbmNsYXNzIFBsYXllciB7IFxuICAgIGNvbnN0cnVjdG9yKGZyYW1lU2V0LCBtb2RlID0gXCJsb29wXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAwXG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gMVxuICAgICAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gMFxuICAgICAgICAgICAgdGhpcy5mcmFtZVNldCA9IGZyYW1lU2V0XG4gICAgICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSBmcmFtZVNldFswXVxuICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmcmFtZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZVZhbHVlXG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sb29wKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgICAgICAgICAgICBcImJyZWFrXCJcbiAgICAgICAgICAgIGNhc2UgXCJwYXVzZVwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmNvdW50ICsrXG5cbiAgICAgICAgdGhpcy5mcmFtZUluZGV4KytcblxuICAgICAgICBpZiAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgXG4gICAgICAgIH0gIFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVWYWx1ZVt0aGlzLmZyYW1lSW5kZXhdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCsrXG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mcmFtZVNldClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3VudClcblxuICAgICAgICB0aGlzLmZyYW1lSW5kZXggPSAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkgPyB0aGlzLmNvdW50ID0gMCA6IHRoaXMuZnJhbWVJbmRleCArIDFcblxuICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSB0aGlzLmZyYW1lU2V0W3RoaXMuZnJhbWVJbmRleF1cblxuICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9hbmltYXRvclwiXG5pbXBvcnQgeyBmcmFtZXMgfSBmcm9tIFwiLi9mcmFtZXNcIlxuXG5jb25zdCBhbGxGcmFtZVNldHMgPSB7XG4gICAgcmlnaHQ6IHtcbiAgICAgICAgaWRsZVJpZ2h0OiBbMCwgMSwgMl0sXG4gICAgICAgIGp1bXBSaWdodDogWzYsIDcsIDhdLFxuICAgICAgICBydW5SaWdodDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4XVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgICBpZGxlTGVmdDogWzMsIDQsIDVdLFxuICAgICAgICBqdW1wTGVmdDogWzksIDEwLCAxMV0sXG4gICAgICAgIHJ1bkxlZnQ6IFsxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNV1cbiAgICB9LFxufVxuXG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5sZXQgeCA9IDUwO1xubGV0IHkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwO1xubGV0IHZlbG9jaXR5X3ggPSAwXG5sZXQgdmVsb2NpdHlfeSA9IDBcblxubGV0IHJpZ2h0cHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgbGVmdHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGxhc3RwcmVzc2VkID0gZmFsc2VcblxubGV0IHVwcHJlc3NlZCA9IGZhbHNlXG5cbmxldCBpZGxlID0gdHJ1ZVxuXG5cbmxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cbmNvbnN0IHNldElkbGUgPSAoKSA9PiB7XG4gICAgaWYgKHZlbG9jaXR5X3ggPT09IDAgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiICYmIGlkbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIiAmJiBpZGxlID09PSBmYWxzZSkge1xuICAgICAgICBpZGxlID0gdHJ1ZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZWxvY2l0eV94ID09PSAwICYmIGxhc3RwcmVzc2VkID09IGZhbHNlICYmIGlkbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG59XG5cbmNvbnN0IHJ1bm5pbmdSaWdodCA9ICgpID0+IHtcbiAgIFxuICAgIGlmIChyaWdodHByZXNzZWQgJiYgaWRsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IDIwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgICAgICBpZiAodXBwcmVzc2VkKSB7XG4gICAgICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICAgICAgfVxuICAgIH0gXG4gICAgZWxzZSBpZiAocmlnaHRwcmVzc2VkICYmIGlkbGUgPT0gZmFsc2UgJiYgbGFzdHByZXNzZWQgPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgdmVsb2NpdHlfeCA9IC0yMFxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICB9XG59XG5cbmNvbnN0IGp1bXBpbmcgPSAoKSA9PiB7XG4gICAgaWYgKHVwcHJlc3NlZCApIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIC8vIHVwcHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IGxhc3RwcmVzc2VkID09PSBcImxlZnRcIiA/IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuanVtcExlZnQpIDogbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuanVtcFJpZ2h0KVxuXG4gICAgICAgIGlmICh5IDw9IGNhbnZhcy5oZWlnaHQgLSAxMDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgICAgIHBsYXllciA9IGxhc3RwcmVzc2VkID09PSBcImxlZnRcIiA/IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpIDogbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLCAxMDApXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVsc2UgaWYgKGxhc3RwcmVzc2VkID09PSBcImxlZnRcIikge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5pZGxlTGVmdClcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgICAgICAsIDEwMClcblxuICAgICAgICAvLyB9XG5cbiAgICB9XG5cbn1cblxuY29uc3QgcnVubmluZ0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT0gdHJ1ZSApIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjVcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgICAgIGlmICh1cHByZXNzZWQpIHtcbiAgICAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQucnVuTGVmdClcbiAgICAgICAgfVxuICAgIH0gXG4gICAgZWxzZSBpZiAobGVmdHByZXNzZWQgJiYgaWRsZSA9PSBmYWxzZSAmJiBsYXN0cHJlc3NlZCA9PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgdmVsb2NpdHlfeCA9IC0yNVxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwibGVmdFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQucnVuTGVmdClcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3ID0gKCkgPT4ge1xuXG4gICAgc2V0SWRsZSgpXG5cbiAgICAvL3J1bm5pbmcgYW5kIGxvb2tpbmcgcmlnaHRcbiAgICBydW5uaW5nUmlnaHQoKVxuICAgIGNvbnNvbGUubG9nKGxhc3RwcmVzc2VkKVxuICAgIC8vIGp1bXBpbmcgXG4gICAganVtcGluZygpXG4gIFxuICAgIC8vcnVubmluZyBhbmQgbG9va2luZyBsZWZ0XG4gICAgcnVubmluZ0xlZnQoKVxuICAgIFxuIFxuICAgIGNvbnNvbGUubG9nKHBsYXllci5mcmFtZVZhbHVlKVxuICAgIC8vIGRyYXdpbmcgdGhlIHBsYXllciBcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gXCJzcmMvaW1hZ2VzL3Rhbmppcm9fc3ByaXRlLnBuZ1wiO1xuICAgICAgICAvLyBwaWNrcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgZnJhbWVzXG4gICAgbGV0IGZyYW1lID0gZnJhbWVzW3BsYXllci5mcmFtZVZhbHVlXVxuICAgICAgICAvLyBzdGFydHMgYW5pbWF0aW9uXG4gICAgcGxheWVyLnVwZGF0ZUFuaW1hdGlvbigpXG5cbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAvLyBwbGF5ZXIudXBkYXRlQW5pbWF0aW9uXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgZnJhbWUueCwgZnJhbWUueSwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCwgeCwgeSwgODAsIDEwMClcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDI4MywgMjkyLCA1NSwgNzAsIHgsIHksIDgwLCAxMDApXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAzODAsIDEwMCwgNzAsIHgsIHksIDE0MCwgMTAwKVxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMTI4LCAzODQsIDEwMCwgNzAsIHgsIHksIDE0MCwgMTAwKVxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMjI3LCAzODIsIDEwMCwgNzAsIHgsIHksIDE0MCwgMTAwKVxuICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICAgICAgLy8gZ3Jhdml0eVxuICAgICAgICB5ICs9IDI1IFxuICAgICAgICBcbiAgICAgICAgLy8gY29sbGlzaW9uIGNvbnRyb2xcbiAgICBpZiAoeCArIDIgPiBjYW52YXMud2lkdGggLSA4MCkgKHggPSBjYW52YXMud2lkdGggLSA4MClcblxuICAgIGlmICh4IC0gMiA8IDApICh4ID0gMClcblxuICAgIGlmICh5ICsgOCA+IGNhbnZhcy5oZWlnaHQgLSAxMDAgKSB5ID0gY2FudmFzLmhlaWdodC0xMDBcbiAgICAgICAgIC8vIGNvbGxpc2lvbiBjb250cm9sXG5cbiAgICAgICAgLy8gIG1vdmluZyByaWdodCBhbmQgbGVmdFxuICAgIGlmIChsZWZ0cHJlc3NlZCAmJiByaWdodHByZXNzZWQgPT09IGZhbHNlKSB4ICs9IHZlbG9jaXR5X3hcbiAgICBpZiAocmlnaHRwcmVzc2VkICYmIGxlZnRwcmVzc2VkID09PSBmYWxzZSkgeCArPSB2ZWxvY2l0eV94XG4gICAgaWYgKHVwcHJlc3NlZCAmJiB5ID09PSBjYW52YXMuaGVpZ2h0LTEwMCkge1xuICAgICAgICB5IC09ODBcblxuICAgIH1cbiAgICAgICAgICAgIC8vICBtb3ZpbmcgcmlnaHQgYW5kIGxlZnRcbn1cblxuXG5jb25zdCBrZXlEb3duSGFuZGxlciA9IChlKSA9PiB7XG4gICAgXG4gICAgXG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSB0cnVlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAyMFxuICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmICgoZS5rZXkgPT0gXCJVcFwiIHx8IGUua2V5ID09IFwiQXJyb3dVcFwiKSAmJiAodXBwcmVzc2VkID09PSBmYWxzZSkpIHtcbiAgICAgICAgdXBwcmVzc2VkID0gdHJ1ZVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiTGVmdFwiIHx8IGUua2V5ID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgbGVmdHByZXNzZWQgPSB0cnVlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjBcbiAgICB9XG5cbiAgICBcbn1cblxuY29uc3Qga2V5VXBIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT0gXCJSaWdodFwiIHx8IGUua2V5ID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAwXG4gICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiVXBcIiB8fCBlLmtleSA9PSBcIkFycm93VXBcIikge1xuICAgICAgICB1cHByZXNzZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiTGVmdFwiIHx8IGUua2V5ID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgdmVsb2NpdHlfeCA9IDBcbiAgICAgICAgbGVmdHByZXNzZWQgPSBmYWxzZVxuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGZhbHNlKTsiLCJcbiAgICBjbGFzcyBGcmFtZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggXG4gICAgICAgICAgICB0aGlzLnkgPSB5IFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB9XG4gICAgICAgIHgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54XG4gICAgICAgIH1cbiAgICAgICAgeSgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMueVxuICAgICAgICB9XG5cbiAgICAgICAgaGVpZ2h0KCkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHRcbiAgICAgICAgfSBcbiAgICAgICAgd2lkdGgoKXtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGhcbiAgICAgICAgfVxuICAgIH1cblxuZXhwb3J0IGNvbnN0IGZyYW1lcyA9IFtcbiAgICBuZXcgRnJhbWUoMCwgNSwgNjAsIDcwLCAxMDAsIDExMCksIG5ldyBGcmFtZSg2MiwgNSwgNjAsIDcwKSwgbmV3IEZyYW1lKDEyNSwgNSwgNjAsIDcwKSwgIC8vIDAgaWRsZSByaWdodFxuICAgIG5ldyBGcmFtZSgxOTcsIDUsIDYwLCA3MCksIG5ldyBGcmFtZSgyNTgsIDUsIDYwLCA3MCksbmV3IEZyYW1lKCAzMjAsIDUsIDYwLCA3MCksIC8vIDMgaWRsZSBsZWZ0XG4gICAgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwKSwgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwKSwgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwKSwgLy82IGp1bXAgcmlnaHRcbiAgICBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwKSwgbmV3IEZyYW1lKDI4MCwgNzAsIDU1LCA3MCksIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzApLCAvLzkganVtcCByaWdodFxuICAgIG5ldyBGcmFtZSgxMDAsIDEzMywgNTUsIDcwKSwgbmV3IEZyYW1lKDE2NCwgMTMzLCA1NSwgNzApLCBuZXcgRnJhbWUoMjI1LCAxMzMsIDU1LCA3MCksIG5ldyBGcmFtZSgyODUsIDEzMywgNTUsIDcwKSwgbmV3IEZyYW1lKDMzNSwgMTMzLCA1NSwgNzApLCBuZXcgRnJhbWUoMCwgMjEyLCA1NSwgNzApLCBuZXcgRnJhbWUoNjIsIDIxMiwgNTUsIDcwKSwgLy8xMiBydW5ubmluZyByaWdodFxuICAgIG5ldyBGcmFtZSgxMTUsIDIxMiwgNTUsIDcwKSwgbmV3IEZyYW1lKDE3MCwgMjEyLCA1NSwgNzApLCBuZXcgRnJhbWUoMjI1LCAyMTIsIDU1LCA3MCksIG5ldyBGcmFtZSgyNzcsIDIxMiwgNTUsIDcwKSwgbmV3IEZyYW1lKDMyNSwgMjEyLCA1NSwgNzApLCBuZXcgRnJhbWUoNCwgMjkyLCA1NSwgNzApLCBuZXcgRnJhbWUoNzUsIDI5MiwgNTUsIDcwKSxcbiAgICBuZXcgRnJhbWUoMjgzLCAyOTIsIDU1LCA3MCksIG5ldyBGcmFtZSgwLCAzODAsIDEwMCwgNzApLCBuZXcgRnJhbWUoMTI4LCAzODQsIDEwMCwgNzAsKSwgbmV3IEZyYW1lKDIyNywgMzgyLCA1NSwgNzApICAgLy8yNiBiYXNpYyBhdHRhY2sgcmlnaHRcbl1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRyYXcgfSBmcm9tIFwiLi9zY3JpcHRzL2JvYXJkXCJcblxuXG5cblxuY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChkcmF3LCAyMDApIl0sInNvdXJjZVJvb3QiOiIifQ==