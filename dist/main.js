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
  function Player(frameSet, delay) {
    _classCallCheck(this, Player);

    this.count = 0;
    this.delay = 1;
    this.frameIndex = 0;
    this.frameSet = frameSet;
    this.frameValue = frameSet[0];
    this.mode = "loop";
  }

  _createClass(Player, [{
    key: "frameValue",
    value: function frameValue() {
      return this.frameValue;
    }
  }, {
    key: "changeFrameSet",
    value: function changeFrameSet(frameset, mode) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var frame_index = arguments.length > 3 ? arguments[3] : undefined;
    }
  }, {
    key: "animate",
    value: function animate() {
      switch (this.mode) {
        case "loop":
          this.loop();
          break;

        case "pause":
          break;
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
    jumpLeft: [9, 10, 11]
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
  if (leftpressed && idle === true) {
    idle = false;
    velocity_x = -20;
    lastpressed = "left"; // rightpressed = false

    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);

    if (uppressed) {
      player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.run.runRight);
    }
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, 80, 100); // ctx.drawImage(img, 120, 212, 55, 70, x, y, 80, 100)
    // ctx.drawImage(img, 272, 133, 55, 70, x, y, 80, 100)
    // ctx.drawImage(img, 62, 212, 55, 70, x, y, 80, 100)
    // ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, 80, 100)
  }; // gravity


  y += 25; // collision control

  if (x + 2 > canvas.width - 80) x = canvas.width - 80;
  if (x - 2 < 0) x = 0;
  if (y + 8 > canvas.height - 100) y = canvas.height - 100; // collision control
  //  moving right and left

  if (leftpressed) x += velocity_x;
  if (rightpressed) x += velocity_x;

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
new Frame(272, 212, 55, 70), new Frame(280, 70, 55, 70), new Frame(280, 70, 55, 70) //19 runnning left
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9mcmFtZXMuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGxheWVyIiwiZnJhbWVTZXQiLCJkZWxheSIsImNvdW50IiwiZnJhbWVJbmRleCIsImZyYW1lVmFsdWUiLCJtb2RlIiwiZnJhbWVzZXQiLCJmcmFtZV9pbmRleCIsImxvb3AiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwiYW5pbWF0ZSIsImFsbEZyYW1lU2V0cyIsInJpZ2h0IiwiaWRsZVJpZ2h0IiwianVtcFJpZ2h0IiwicnVuUmlnaHQiLCJsZWZ0IiwiaWRsZUxlZnQiLCJqdW1wTGVmdCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwieCIsInkiLCJoZWlnaHQiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJpZ2h0cHJlc3NlZCIsImxlZnRwcmVzc2VkIiwibGFzdHByZXNzZWQiLCJ1cHByZXNzZWQiLCJpZGxlIiwicGxheWVyIiwic2V0SWRsZSIsInJ1bm5pbmdSaWdodCIsImp1bXBpbmciLCJzZXRUaW1lb3V0IiwicnVubmluZ0xlZnQiLCJydW4iLCJkcmF3IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJmcmFtZSIsImZyYW1lcyIsInVwZGF0ZUFuaW1hdGlvbiIsIm9ubG9hZCIsImNsZWFyUmVjdCIsIndpZHRoIiwiZHJhd0ltYWdlIiwia2V5RG93bkhhbmRsZXIiLCJlIiwia2V5Iiwia2V5VXBIYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkZyYW1lIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBS01BLE07QUFDRixrQkFBWUMsUUFBWixFQUFzQkMsS0FBdEIsRUFBNkI7QUFBQTs7QUFDckIsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLRCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtFLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLSCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtJLFVBQUwsR0FBa0JKLFFBQVEsQ0FBQyxDQUFELENBQTFCO0FBQ0EsU0FBS0ssSUFBTCxHQUFZLE1BQVo7QUFFUDs7OztXQUVELHNCQUFhO0FBQ1QsYUFBTyxLQUFLRCxVQUFaO0FBQ0g7OztXQUVELHdCQUFlRSxRQUFmLEVBQXlCRCxJQUF6QixFQUF3RDtBQUFBLFVBQXpCSixLQUF5Qix1RUFBakIsRUFBaUI7QUFBQSxVQUFiTSxXQUFhO0FBRXZEOzs7V0FFRCxtQkFBVTtBQUNOLGNBQVEsS0FBS0YsSUFBYjtBQUNJLGFBQUssTUFBTDtBQUNJLGVBQUtHLElBQUw7QUFDQTs7QUFDSixhQUFLLE9BQUw7QUFDSTtBQUxSO0FBUUg7OztXQUVELGdCQUFPO0FBQ0gsV0FBS04sS0FBTDtBQUVBTyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLVixRQUFqQjtBQUNBUyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLUixLQUFqQjtBQUVBLFdBQUtDLFVBQUws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QlA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLDZDQUE2Qyx3REFBd0QsRTs7Ozs7V0NBckc7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBS0EsSUFBTUMsUUFBUSxHQUFHQyxXQUFXLENBQUNsQixnREFBRCxFQUFPLEdBQVAsQ0FBNUIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJhbWVzIH0gZnJvbSBcIi4vZnJhbWVzXCJcblxuXG5cblxuY2xhc3MgUGxheWVyIHsgXG4gICAgY29uc3RydWN0b3IoZnJhbWVTZXQsIGRlbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMFxuICAgICAgICAgICAgdGhpcy5kZWxheSA9IDFcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJbmRleCA9IDBcbiAgICAgICAgICAgIHRoaXMuZnJhbWVTZXQgPSBmcmFtZVNldFxuICAgICAgICAgICAgdGhpcy5mcmFtZVZhbHVlID0gZnJhbWVTZXRbMF1cbiAgICAgICAgICAgIHRoaXMubW9kZSA9IFwibG9vcFwiXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZyYW1lVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lVmFsdWVcbiAgICB9XG5cbiAgICBjaGFuZ2VGcmFtZVNldChmcmFtZXNldCwgbW9kZSwgZGVsYXkgPSAxMCwgZnJhbWVfaW5kZXgpIHtcblxuICAgIH1cblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9vcFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubG9vcCgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGF1c2VcIjpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCsrXG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mcmFtZVNldClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3VudClcblxuICAgICAgICB0aGlzLmZyYW1lSW5kZXggPSAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkgPyB0aGlzLmNvdW50ID0gMCA6IHRoaXMuZnJhbWVJbmRleCArIDFcblxuICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSB0aGlzLmZyYW1lU2V0W3RoaXMuZnJhbWVJbmRleF1cblxuICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9hbmltYXRvclwiXG5pbXBvcnQgeyBmcmFtZXMgfSBmcm9tIFwiLi9mcmFtZXNcIlxuXG5jb25zdCBhbGxGcmFtZVNldHMgPSB7XG4gICAgcmlnaHQ6IHtcbiAgICAgICAgaWRsZVJpZ2h0OiBbMCwgMSwgMl0sXG4gICAgICAgIGp1bXBSaWdodDogWzYsIDcsIDhdLFxuICAgICAgICBydW5SaWdodDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4XVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgICBpZGxlTGVmdDogWzMsIDQsIDVdLFxuICAgICAgICBqdW1wTGVmdDogWzksIDEwLCAxMV1cbiAgICB9LFxufVxuXG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5sZXQgeCA9IDUwO1xubGV0IHkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwO1xubGV0IHZlbG9jaXR5X3ggPSAwXG5sZXQgdmVsb2NpdHlfeSA9IDBcblxubGV0IHJpZ2h0cHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgbGVmdHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGxhc3RwcmVzc2VkID0gZmFsc2VcblxubGV0IHVwcHJlc3NlZCA9IGZhbHNlXG5cbmxldCBpZGxlID0gdHJ1ZVxuXG5cbmxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cbmNvbnN0IHNldElkbGUgPSAoKSA9PiB7XG4gICAgaWYgKHZlbG9jaXR5X3ggPT09IDAgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiICYmIGlkbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIiAmJiBpZGxlID09PSBmYWxzZSkge1xuICAgICAgICBpZGxlID0gdHJ1ZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZWxvY2l0eV94ID09PSAwICYmIGxhc3RwcmVzc2VkID09IGZhbHNlICYmIGlkbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG59XG5cbmNvbnN0IHJ1bm5pbmdSaWdodCA9ICgpID0+IHtcbiAgIFxuICAgIGlmIChyaWdodHByZXNzZWQgJiYgaWRsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IDIwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgICAgICBpZiAodXBwcmVzc2VkKSB7XG4gICAgICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICAgICAgfVxuICAgIH0gXG59XG5cbmNvbnN0IGp1bXBpbmcgPSAoKSA9PiB7XG4gICAgaWYgKHVwcHJlc3NlZCApIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIC8vIHVwcHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IGxhc3RwcmVzc2VkID09PSBcImxlZnRcIiA/IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuanVtcExlZnQpIDogbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuanVtcFJpZ2h0KVxuXG4gICAgICAgIGlmICh5IDw9IGNhbnZhcy5oZWlnaHQgLSAxMDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgICAgIHBsYXllciA9IGxhc3RwcmVzc2VkID09PSBcImxlZnRcIiA/IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpIDogbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLCAxMDApXG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVsc2UgaWYgKGxhc3RwcmVzc2VkID09PSBcImxlZnRcIikge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5pZGxlTGVmdClcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgICAgICAsIDEwMClcblxuICAgICAgICAvLyB9XG5cbiAgICB9XG5cbn1cblxuY29uc3QgcnVubmluZ0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT09IHRydWUpIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICAgICAgaWYgKHVwcHJlc3NlZCkge1xuICAgICAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucnVuLnJ1blJpZ2h0KVxuICAgICAgICB9XG4gICAgfSBcbn1cblxuZXhwb3J0IGNvbnN0IGRyYXcgPSAoKSA9PiB7XG5cbiAgICBzZXRJZGxlKClcblxuICAgIC8vcnVubmluZyBhbmQgbG9va2luZyByaWdodFxuICAgIHJ1bm5pbmdSaWdodCgpXG4gICAgY29uc29sZS5sb2cobGFzdHByZXNzZWQpXG4gICAgLy8ganVtcGluZyBcbiAgICBqdW1waW5nKClcbiAgXG4gICAgLy9ydW5uaW5nIGFuZCBsb29raW5nIGxlZnRcbiAgICBydW5uaW5nTGVmdCgpXG4gICAgXG4gXG4gICAgY29uc29sZS5sb2cocGxheWVyLmZyYW1lVmFsdWUpXG4gICAgLy8gZHJhd2luZyB0aGUgcGxheWVyIFxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGltZy5zcmMgPSBcInNyYy9pbWFnZXMvdGFuamlyb19zcHJpdGUucG5nXCI7XG4gICAgICAgIC8vIHBpY2tzIHRoZSBjb3JyZWN0IG51bWJlciBvZiBmcmFtZXNcbiAgICBsZXQgZnJhbWUgPSBmcmFtZXNbcGxheWVyLmZyYW1lVmFsdWVdXG4gICAgICAgIC8vIHN0YXJ0cyBhbmltYXRpb25cbiAgICBwbGF5ZXIudXBkYXRlQW5pbWF0aW9uKClcblxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIC8vIHBsYXllci51cGRhdGVBbmltYXRpb25cbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCBmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0LCB4LCB5LCA4MCwgMTAwKVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgMTIwLCAyMTIsIDU1LCA3MCwgeCwgeSwgODAsIDEwMClcbiAgICAgICAgLy8gY3R4LmRyYXdJbWFnZShpbWcsIDI3MiwgMTMzLCA1NSwgNzAsIHgsIHksIDgwLCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoaW1nLCA2MiwgMjEyLCA1NSwgNzAsIHgsIHksIDgwLCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoaW1nLCBmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0LCB4LCB5LCA4MCwgMTAwKVxuICAgICAgICBcbiAgICB9XG4gICAgICAgIC8vIGdyYXZpdHlcbiAgICAgICAgeSArPSAyNSBcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbGxpc2lvbiBjb250cm9sXG4gICAgaWYgKHggKyAyID4gY2FudmFzLndpZHRoIC0gODApICh4ID0gY2FudmFzLndpZHRoIC0gODApXG5cbiAgICBpZiAoeCAtIDIgPCAwKSAoeCA9IDApXG5cbiAgICBpZiAoeSArIDggPiBjYW52YXMuaGVpZ2h0IC0gMTAwICkgeSA9IGNhbnZhcy5oZWlnaHQtMTAwXG4gICAgICAgICAvLyBjb2xsaXNpb24gY29udHJvbFxuXG4gICAgICAgIC8vICBtb3ZpbmcgcmlnaHQgYW5kIGxlZnRcbiAgICBpZiAobGVmdHByZXNzZWQpIHggKz0gdmVsb2NpdHlfeFxuICAgIGlmIChyaWdodHByZXNzZWQpIHggKz0gdmVsb2NpdHlfeFxuICAgIGlmICh1cHByZXNzZWQgJiYgeSA9PT0gY2FudmFzLmhlaWdodC0xMDApIHtcbiAgICAgICAgeSAtPTgwXG5cbiAgICB9XG4gICAgICAgICAgICAvLyAgbW92aW5nIHJpZ2h0IGFuZCBsZWZ0XG59XG5cblxuY29uc3Qga2V5RG93bkhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIFxuICAgIFxuICAgIGlmIChlLmtleSA9PSBcIlJpZ2h0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgcmlnaHRwcmVzc2VkID0gdHJ1ZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMjBcbiAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoKGUua2V5ID09IFwiVXBcIiB8fCBlLmtleSA9PSBcIkFycm93VXBcIikgJiYgKHVwcHJlc3NlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwcHJlc3NlZCA9IHRydWVcblxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIGxlZnRwcmVzc2VkID0gdHJ1ZVxuICAgICAgICB2ZWxvY2l0eV94ID0gLTIwXG4gICAgfVxuXG4gICAgXG59XG5cbmNvbnN0IGtleVVwSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMFxuICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIlVwXCIgfHwgZS5rZXkgPT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgdXBwcmVzc2VkID0gZmFsc2VcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAwXG4gICAgICAgIGxlZnRwcmVzc2VkID0gZmFsc2VcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd25IYW5kbGVyLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5VXBIYW5kbGVyLCBmYWxzZSk7IiwiXG4gICAgY2xhc3MgRnJhbWUge1xuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4IFxuICAgICAgICAgICAgdGhpcy55ID0geSBcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgfVxuICAgICAgICB4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueFxuICAgICAgICB9XG4gICAgICAgIHkoKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnlcbiAgICAgICAgfVxuXG4gICAgICAgIGhlaWdodCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0XG4gICAgICAgIH0gXG4gICAgICAgIHdpZHRoKCl7XG4gICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoXG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCBjb25zdCBmcmFtZXMgPSBbXG4gICAgbmV3IEZyYW1lKDAsIDUsIDYwLCA3MCwgMTAwLCAxMTApLCBuZXcgRnJhbWUoNjIsIDUsIDYwLCA3MCksIG5ldyBGcmFtZSgxMjUsIDUsIDYwLCA3MCksICAvLyAwIGlkbGUgcmlnaHRcbiAgICBuZXcgRnJhbWUoMTk3LCA1LCA2MCwgNzApLCBuZXcgRnJhbWUoMjU4LCA1LCA2MCwgNzApLG5ldyBGcmFtZSggMzIwLCA1LCA2MCwgNzApLCAvLyAzIGlkbGUgbGVmdFxuICAgIG5ldyBGcmFtZSg0MCwgNzAsIDU1LCA3MCksIG5ldyBGcmFtZSg0MCwgNzAsIDU1LCA3MCksIG5ldyBGcmFtZSg0MCwgNzAsIDU1LCA3MCksIC8vNiBqdW1wIHJpZ2h0XG4gICAgbmV3IEZyYW1lKDI4MCwgNzAsIDU1LCA3MCksIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzApLCBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwKSwgLy85IGp1bXAgcmlnaHRcbiAgICBuZXcgRnJhbWUoMTAwLCAxMzMsIDU1LCA3MCksIG5ldyBGcmFtZSgxNjQsIDEzMywgNTUsIDcwKSwgbmV3IEZyYW1lKDIyNSwgMTMzLCA1NSwgNzApLCBuZXcgRnJhbWUoMjg1LCAxMzMsIDU1LCA3MCksIG5ldyBGcmFtZSgzMzUsIDEzMywgNTUsIDcwKSwgbmV3IEZyYW1lKDAsIDIxMiwgNTUsIDcwKSwgbmV3IEZyYW1lKDYyLCAyMTIsIDU1LCA3MCksIC8vMTIgcnVubm5pbmcgcmlnaHRcbiAgICBuZXcgRnJhbWUoMjcyLCAyMTIsIDU1LCA3MCksIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzApLCBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwKSwgLy8xOSBydW5ubmluZyBsZWZ0XG5cblxuXVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhdyB9IGZyb20gXCIuL3NjcmlwdHMvYm9hcmRcIlxuXG5cblxuXG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGRyYXcsIDIwMCkiXSwic291cmNlUm9vdCI6IiJ9