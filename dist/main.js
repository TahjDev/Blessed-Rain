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
    runRight: [12, 13, 14, 15, 16, 17, 18],
    basicAR: [26, 27, 28, 29]
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
var basicAttackRight = false;
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

var basicAttackingRight = function basicAttackingRight() {
  if (basicAttackRight && idle == true) {
    lastpressed = "attack";
    idle = false; // velocity_x = -100

    player = new _animator__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.basicAR);
  }
};

var draw = function draw() {
  setIdle(); //running and looking right

  runningRight();
  console.log(lastpressed); // jumping 

  jumping(); //running and looking left

  runningLeft();
  basicAttackingRight();
  console.log(player.frameValue); // drawing the player 

  var img = new Image();
  img.src = "src/images/tanjiro_sprite.png"; // picks the correct number of frames

  var frame = _frames__WEBPACK_IMPORTED_MODULE_1__.frames[player.frameValue]; // starts animation

  player.updateAnimation();

  img.onload = function () {
    // player.updateAnimation
    ctx.clearRect(0, 0, canvas.width, canvas.height); // ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, frame.canvasWidth, frame.canvasHeight)

    ctx.drawImage(img, 310, 388, 60, 70, x, y, 80, 100);
    ctx.drawImage(img, 4, 470, 100, 70, x, y, 140, 100); // ctx.drawImage(img, 135, 384, 100, 70, x, y, 140, 100)
    // ctx.drawImage(img, 233, 382, 100, 70, x, y, 140, 100)
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
  } else if ((e.key == "Up" || e.key == "ArrowUp") && uppressed === false) {
    uppressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftpressed = true;
  } else if (e.key == "a" || e.key == "KeyA") {
    basicAttackRight = true;
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
  } else if (e.key == "a" || e.key === "KeyA") {
    basicAttackRight = false;
    setTimeout(function () {
      return lastpressed = false;
    }, 400);
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
  function Frame(x, y, width, height, cWidth, cHeight) {
    _classCallCheck(this, Frame);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.canvasWidth = cWidth;
    this.canvasHeight = cHeight;
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
  }, {
    key: "canvasWidth",
    value: function canvasWidth() {
      return this.canvasWidth;
    }
  }, {
    key: "canvasHeight",
    value: function canvasHeight() {
      return this.canvasHeight;
    }
  }]);

  return Frame;
}();

var frames = [new Frame(0, 5, 60, 70, 80, 100), new Frame(62, 5, 60, 70, 80, 100), new Frame(125, 5, 60, 70, 80, 100), // 0 idle right
new Frame(197, 5, 60, 70, 80, 100), new Frame(258, 5, 60, 70, 80, 100), new Frame(320, 5, 60, 70, 80, 100), // 3 idle left
new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), //6 jump right
new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), //9 jump right
new Frame(100, 133, 55, 70, 80, 100), new Frame(164, 133, 55, 70, 80, 100), new Frame(225, 133, 55, 70, 80, 100), new Frame(285, 133, 55, 70, 80, 100), new Frame(335, 133, 55, 70, 80, 100), new Frame(0, 212, 55, 70, 80, 100), new Frame(62, 212, 55, 70, 80, 100), //12 runnning right
new Frame(115, 212, 55, 70, 80, 100), new Frame(170, 212, 55, 70, 80, 100), new Frame(225, 212, 55, 70, 80, 100), new Frame(277, 212, 55, 70, 80, 100), new Frame(325, 212, 55, 70, 80, 100), new Frame(4, 292, 55, 70, 80, 100), new Frame(75, 292, 55, 70, 80, 100), // 19 attackleft
new Frame(295, 292, 55, 70, 80, 100), new Frame(6, 380, 100, 70, 140, 100), new Frame(135, 384, 100, 70, 140, 100), new Frame(233, 382, 100, 70, 140, 100) //26 basic attack right
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9mcmFtZXMuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGxheWVyIiwiZnJhbWVTZXQiLCJtb2RlIiwiY291bnQiLCJkZWxheSIsImZyYW1lSW5kZXgiLCJmcmFtZVZhbHVlIiwibG9vcCIsInBsYXkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiYW5pbWF0ZSIsImFsbEZyYW1lU2V0cyIsInJpZ2h0IiwiaWRsZVJpZ2h0IiwianVtcFJpZ2h0IiwicnVuUmlnaHQiLCJiYXNpY0FSIiwibGVmdCIsImlkbGVMZWZ0IiwianVtcExlZnQiLCJydW5MZWZ0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJ4IiwieSIsImhlaWdodCIsInZlbG9jaXR5X3giLCJ2ZWxvY2l0eV95IiwicmlnaHRwcmVzc2VkIiwibGVmdHByZXNzZWQiLCJsYXN0cHJlc3NlZCIsInVwcHJlc3NlZCIsImlkbGUiLCJiYXNpY0F0dGFja1JpZ2h0IiwicGxheWVyIiwic2V0SWRsZSIsInJ1bm5pbmdSaWdodCIsImp1bXBpbmciLCJzZXRUaW1lb3V0IiwicnVubmluZ0xlZnQiLCJiYXNpY0F0dGFja2luZ1JpZ2h0IiwiZHJhdyIsImltZyIsIkltYWdlIiwic3JjIiwiZnJhbWUiLCJmcmFtZXMiLCJ1cGRhdGVBbmltYXRpb24iLCJvbmxvYWQiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImRyYXdJbWFnZSIsImtleURvd25IYW5kbGVyIiwiZSIsImtleSIsImtleVVwSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJGcmFtZSIsImNXaWR0aCIsImNIZWlnaHQiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUtNQSxNO0FBQ0Ysa0JBQVlDLFFBQVosRUFBcUM7QUFBQSxRQUFmQyxJQUFlLHVFQUFSLE1BQVE7O0FBQUE7O0FBQzdCLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0osUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLSyxVQUFMLEdBQWtCTCxRQUFRLENBQUMsQ0FBRCxDQUExQjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUVQOzs7O1dBRUQsc0JBQWE7QUFDVCxhQUFPLEtBQUtJLFVBQVo7QUFDSDs7O1dBRUQsbUJBQVU7QUFDTixjQUFRLEtBQUtKLElBQWI7QUFDSSxhQUFLLE1BQUw7QUFDSSxlQUFLSyxJQUFMO0FBQ0E7O0FBQ0osYUFBSyxNQUFMO0FBQ0ksZUFBS0MsSUFBTDtBQUNBOztBQUNKLGFBQUssT0FBTDtBQUNJO0FBUlI7QUFXSDs7O1dBRUQsZ0JBQU87QUFDSCxXQUFLTCxLQUFMO0FBRUEsV0FBS0UsVUFBTDs7QUFFQSxVQUFJLEtBQUtGLEtBQUwsR0FBYSxLQUFL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QWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FQMUQsRUFPa0csSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLEVBQXpCLEVBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBUGxHLENBTzJJO0FBUDNJLENBQWYsQzs7Ozs7O1VDaENQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUtBLElBQU1LLFFBQVEsR0FBR0MsV0FBVyxDQUFDdEIsZ0RBQUQsRUFBTyxHQUFQLENBQTVCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyYW1lcyB9IGZyb20gXCIuL2ZyYW1lc1wiXG5cblxuXG5cbmNsYXNzIFBsYXllciB7IFxuICAgIGNvbnN0cnVjdG9yKGZyYW1lU2V0LCBtb2RlID0gXCJsb29wXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAwXG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gMVxuICAgICAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gMFxuICAgICAgICAgICAgdGhpcy5mcmFtZVNldCA9IGZyYW1lU2V0XG4gICAgICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSBmcmFtZVNldFswXVxuICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmcmFtZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZVZhbHVlXG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sb29wKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgICAgICAgICAgICBcImJyZWFrXCJcbiAgICAgICAgICAgIGNhc2UgXCJwYXVzZVwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmNvdW50ICsrXG5cbiAgICAgICAgdGhpcy5mcmFtZUluZGV4KytcblxuICAgICAgICBpZiAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgXG4gICAgICAgIH0gIFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVWYWx1ZVt0aGlzLmZyYW1lSW5kZXhdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCsrXG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mcmFtZVNldClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3VudClcblxuICAgICAgICB0aGlzLmZyYW1lSW5kZXggPSAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkgPyB0aGlzLmNvdW50ID0gMCA6IHRoaXMuZnJhbWVJbmRleCArIDFcblxuICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSB0aGlzLmZyYW1lU2V0W3RoaXMuZnJhbWVJbmRleF1cblxuICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9hbmltYXRvclwiXG5pbXBvcnQgeyBmcmFtZXMgfSBmcm9tIFwiLi9mcmFtZXNcIlxuXG5jb25zdCBhbGxGcmFtZVNldHMgPSB7XG4gICAgcmlnaHQ6IHtcbiAgICAgICAgaWRsZVJpZ2h0OiBbMCwgMSwgMl0sXG4gICAgICAgIGp1bXBSaWdodDogWzYsIDcsIDhdLFxuICAgICAgICBydW5SaWdodDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4XSxcbiAgICAgICAgYmFzaWNBUjogWzI2LCAyNywgMjgsIDI5XVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgICBpZGxlTGVmdDogWzMsIDQsIDVdLFxuICAgICAgICBqdW1wTGVmdDogWzksIDEwLCAxMV0sXG4gICAgICAgIHJ1bkxlZnQ6IFsxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNV1cbiAgICB9LFxufVxuXG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5sZXQgeCA9IDUwO1xubGV0IHkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwO1xubGV0IHZlbG9jaXR5X3ggPSAwO1xubGV0IHZlbG9jaXR5X3kgPSAwO1xuXG5sZXQgcmlnaHRwcmVzc2VkID0gZmFsc2U7XG5cbmxldCBsZWZ0cHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgbGFzdHByZXNzZWQgPSBmYWxzZTtcblxubGV0IHVwcHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgaWRsZSA9IHRydWU7XG5cbmxldCBiYXNpY0F0dGFja1JpZ2h0ID0gZmFsc2U7XG5cblxubGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcblxuY29uc3Qgc2V0SWRsZSA9ICgpID0+IHtcbiAgICBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcInJpZ2h0XCIgJiYgaWRsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZWxvY2l0eV94ID09PSAwICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiICYmIGlkbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgfVxuICAgIGVsc2UgaWYgKHZlbG9jaXR5X3ggPT09IDAgJiYgbGFzdHByZXNzZWQgPT0gZmFsc2UgJiYgaWRsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuICAgIH1cbn1cblxuY29uc3QgcnVubmluZ1JpZ2h0ID0gKCkgPT4ge1xuICAgXG4gICAgaWYgKHJpZ2h0cHJlc3NlZCAmJiBpZGxlID09PSB0cnVlKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMjBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQucnVuUmlnaHQpXG4gICAgICAgIGlmICh1cHByZXNzZWQpIHtcbiAgICAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgICAgICB9XG4gICAgfSBcbiAgICBlbHNlIGlmIChyaWdodHByZXNzZWQgJiYgaWRsZSA9PSBmYWxzZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gLTIwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgIH1cbn1cblxuY29uc3QganVtcGluZyA9ICgpID0+IHtcbiAgICBpZiAodXBwcmVzc2VkICkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgLy8gdXBwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5qdW1wTGVmdCkgOiBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5qdW1wUmlnaHQpXG5cbiAgICAgICAgaWYgKHkgPD0gY2FudmFzLmhlaWdodCAtIDEwMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICBpZGxlID0gdHJ1ZVxuICAgICAgICAgICAgcGxheWVyID0gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5pZGxlTGVmdCkgOiBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsIDEwMClcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWxzZSBpZiAobGFzdHByZXNzZWQgPT09IFwibGVmdFwiKSB7XG4gICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgICAgICwgMTAwKVxuXG4gICAgICAgIC8vIH1cblxuICAgIH1cblxufVxuXG5jb25zdCBydW5uaW5nTGVmdCA9ICgpID0+IHtcbiAgICBpZiAobGVmdHByZXNzZWQgJiYgaWRsZSA9PSB0cnVlICkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IC0yNVxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwibGVmdFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQucnVuTGVmdClcbiAgICAgICAgaWYgKHVwcHJlc3NlZCkge1xuICAgICAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5ydW5MZWZ0KVxuICAgICAgICB9XG4gICAgfSBcbiAgICBlbHNlIGlmIChsZWZ0cHJlc3NlZCAmJiBpZGxlID09IGZhbHNlICYmIGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gLTI1XG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5ydW5MZWZ0KVxuICAgIH1cbn1cblxuY29uc3QgYmFzaWNBdHRhY2tpbmdSaWdodCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgaWYgKGJhc2ljQXR0YWNrUmlnaHQgJiYgaWRsZSA9PSB0cnVlKSB7XG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJhdHRhY2tcIlxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgLy8gdmVsb2NpdHlfeCA9IC0xMDBcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuYmFzaWNBUilcblxuICAgIH1cblxuICAgIFxufVxuXG5leHBvcnQgY29uc3QgZHJhdyA9ICgpID0+IHtcblxuICAgIHNldElkbGUoKVxuXG4gICAgLy9ydW5uaW5nIGFuZCBsb29raW5nIHJpZ2h0XG4gICAgcnVubmluZ1JpZ2h0KClcbiAgICBjb25zb2xlLmxvZyhsYXN0cHJlc3NlZClcbiAgICAvLyBqdW1waW5nIFxuICAgIGp1bXBpbmcoKVxuICBcbiAgICAvL3J1bm5pbmcgYW5kIGxvb2tpbmcgbGVmdFxuICAgIHJ1bm5pbmdMZWZ0KClcblxuICAgIGJhc2ljQXR0YWNraW5nUmlnaHQoKVxuICAgIFxuIFxuICAgIGNvbnNvbGUubG9nKHBsYXllci5mcmFtZVZhbHVlKVxuICAgIC8vIGRyYXdpbmcgdGhlIHBsYXllciBcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gXCJzcmMvaW1hZ2VzL3Rhbmppcm9fc3ByaXRlLnBuZ1wiO1xuICAgICAgICAvLyBwaWNrcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgZnJhbWVzXG4gICAgbGV0IGZyYW1lID0gZnJhbWVzW3BsYXllci5mcmFtZVZhbHVlXVxuICAgICAgICAvLyBzdGFydHMgYW5pbWF0aW9uXG4gICAgcGxheWVyLnVwZGF0ZUFuaW1hdGlvbigpXG5cbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAvLyBwbGF5ZXIudXBkYXRlQW5pbWF0aW9uXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgZnJhbWUueCwgZnJhbWUueSwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCwgeCwgeSwgZnJhbWUuY2FudmFzV2lkdGgsIGZyYW1lLmNhbnZhc0hlaWdodClcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDMxMCwgMzg4LCA2MCwgNzAsIHgsIHksIDgwLCAxMDApXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCA0LCA0NzAsIDEwMCwgNzAsIHgsIHksIDE0MCwgMTAwKVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgMTM1LCAzODQsIDEwMCwgNzAsIHgsIHksIDE0MCwgMTAwKVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgMjMzLCAzODIsIDEwMCwgNzAsIHgsIHksIDE0MCwgMTAwKVxuICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICAgICAgLy8gZ3Jhdml0eVxuICAgICAgICB5ICs9IDI1IFxuICAgICAgICBcbiAgICAgICAgLy8gY29sbGlzaW9uIGNvbnRyb2xcbiAgICBpZiAoeCArIDIgPiBjYW52YXMud2lkdGggLSA4MCkgKHggPSBjYW52YXMud2lkdGggLSA4MClcblxuICAgIGlmICh4IC0gMiA8IDApICh4ID0gMClcblxuICAgIGlmICh5ICsgOCA+IGNhbnZhcy5oZWlnaHQgLSAxMDAgKSB5ID0gY2FudmFzLmhlaWdodC0xMDBcbiAgICAgICAgIC8vIGNvbGxpc2lvbiBjb250cm9sXG5cbiAgICAgICAgLy8gIG1vdmluZyByaWdodCBhbmQgbGVmdFxuICAgIGlmIChsZWZ0cHJlc3NlZCAmJiByaWdodHByZXNzZWQgPT09IGZhbHNlKSB4ICs9IHZlbG9jaXR5X3hcbiAgICBpZiAocmlnaHRwcmVzc2VkICYmIGxlZnRwcmVzc2VkID09PSBmYWxzZSkgeCArPSB2ZWxvY2l0eV94XG4gICAgaWYgKHVwcHJlc3NlZCAmJiB5ID09PSBjYW52YXMuaGVpZ2h0LTEwMCkge1xuICAgICAgICB5IC09ODBcblxuICAgIH1cbiAgICAgICAgICAgIC8vICBtb3ZpbmcgcmlnaHQgYW5kIGxlZnRcbn1cblxuXG5jb25zdCBrZXlEb3duSGFuZGxlciA9IChlKSA9PiB7XG4gICAgXG4gICAgXG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSB0cnVlXG4gICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKChlLmtleSA9PSBcIlVwXCIgfHwgZS5rZXkgPT0gXCJBcnJvd1VwXCIpICYmICh1cHByZXNzZWQgPT09IGZhbHNlKSkge1xuICAgICAgICB1cHByZXNzZWQgPSB0cnVlXG5cbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJMZWZ0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICBsZWZ0cHJlc3NlZCA9IHRydWVcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcImFcIiB8fCBlLmtleSA9PSBcIktleUFcIikge1xuICAgICAgICBiYXNpY0F0dGFja1JpZ2h0ID0gdHJ1ZVxuXG4gICAgfVxuXG4gICAgXG59XG5cbmNvbnN0IGtleVVwSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMFxuICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIlVwXCIgfHwgZS5rZXkgPT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgdXBwcmVzc2VkID0gZmFsc2VcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAwXG4gICAgICAgIGxlZnRwcmVzc2VkID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJhXCIgfHwgZS5rZXkgPT09IFwiS2V5QVwiKSB7XG4gICAgICAgIGJhc2ljQXR0YWNrUmlnaHQgPSBmYWxzZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGxhc3RwcmVzc2VkID0gZmFsc2UsIDQwMClcbiAgICB9XG5cbiAgICBcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGZhbHNlKTsiLCJcbiAgICBjbGFzcyBGcmFtZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNXaWR0aCwgY0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ID0geCBcbiAgICAgICAgICAgIHRoaXMueSA9IHkgXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gY1dpZHRoXG4gICAgICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgICB4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueFxuICAgICAgICB9XG4gICAgICAgIHkoKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnlcbiAgICAgICAgfVxuXG4gICAgICAgIGhlaWdodCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0XG4gICAgICAgIH0gXG4gICAgICAgIHdpZHRoKCl7XG4gICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBjYW52YXNXaWR0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhc1dpZHRoXG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzSGVpZ2h0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzSGVpZ2h0XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCBjb25zdCBmcmFtZXMgPSBbXG4gICAgbmV3IEZyYW1lKDAsIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg2MiwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDEyNSwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgIC8vIDAgaWRsZSByaWdodFxuICAgIG5ldyBGcmFtZSgxOTcsIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyNTgsIDUsIDYwLCA3MCwgODAsIDEwMCksbmV3IEZyYW1lKCAzMjAsIDUsIDYwLCA3MCwgODAsIDEwMCksIC8vIDMgaWRsZSBsZWZ0XG4gICAgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgLy82IGp1bXAgcmlnaHRcbiAgICBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDI4MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCAvLzkganVtcCByaWdodFxuICAgIG5ldyBGcmFtZSgxMDAsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDE2NCwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjI1LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyODUsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDMzNSwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMCwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNjIsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgLy8xMiBydW5ubmluZyByaWdodFxuICAgIG5ldyBGcmFtZSgxMTUsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDE3MCwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjI1LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyNzcsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDMyNSwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNCwgMjkyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNzUsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgLy8gMTkgYXR0YWNrbGVmdFxuICAgIG5ldyBGcmFtZSgyOTUsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDYsIDM4MCwgMTAwLCA3MCwgMTQwLCAxMDApLCBuZXcgRnJhbWUoMTM1LCAzODQsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IEZyYW1lKDIzMywgMzgyLCAxMDAsIDcwLCAxNDAsIDEwMCkgICAvLzI2IGJhc2ljIGF0dGFjayByaWdodFxuXVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhdyB9IGZyb20gXCIuL3NjcmlwdHMvYm9hcmRcIlxuXG5cblxuXG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGRyYXcsIDIwMCkiXSwic291cmNlUm9vdCI6IiJ9