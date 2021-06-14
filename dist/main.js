/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/animator.js":
/*!*********************************!*\
  !*** ./src/scripts/animator.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "draw": function() { return /* binding */ draw; }
/* harmony export */ });
/* harmony import */ var _frame_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frame_handler */ "./src/scripts/frame_handler.js");
/* harmony import */ var _player_frames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player_frames */ "./src/scripts/player_frames.js");


var allFrameSets = {
  right: {
    idleRight: [0, 1, 2],
    jumpRight: [6, 7, 8],
    runRight: [12, 13, 14, 15, 16, 17, 18],
    basicAR: [26, 27, 28, 29],
    specialAR: [34, 35, 36, 37, 38, 39]
  },
  left: {
    idleLeft: [3, 4, 5],
    jumpLeft: [9, 10, 11],
    runLeft: [19, 20, 21, 22, 23, 24, 25],
    basicAL: [30, 31, 32, 33],
    specialAL: [40, 41, 42, 43, 44, 45]
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
var lastpressed = "right";
var uppressed = false;
var idle = true;
var basicAttack = false;
var specialAttack = false;
var then;
var specialPos;
var player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);

var setIdle = function setIdle() {
  if (velocity_x === 0 && lastpressed == "right" && idle === false && !basicAttack && !specialAttack) {
    idle = true;
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
  } else if (velocity_x === 0 && lastpressed == "left" && idle === false && !basicAttack && !specialAttack) {
    idle = true;
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.idleLeft);
  }
};

var runningRight = function runningRight() {
  if (rightpressed && idle === true) {
    idle = false;
    velocity_x = 30;
    lastpressed = "right"; // rightpressed = false

    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
  } else if (rightpressed && idle == false && lastpressed == "left") {
    velocity_x = -30;
    lastpressed = "right"; // rightpressed = false

    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
  }
};

var jumping = function jumping() {
  if (uppressed) {
    idle = false; // uppressed = false

    player = lastpressed === "left" ? new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.jumpLeft) : new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.jumpRight);

    if (y <= canvas.height - 100) {
      setTimeout(function () {
        idle = true;
        player = lastpressed === "left" ? new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.idleLeft) : new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
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
    velocity_x = -30;
    lastpressed = "left"; // rightpressed = false

    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
  } else if (leftpressed && idle == false && lastpressed == "right") {
    velocity_x = -30;
    lastpressed = "left"; // rightpressed = false

    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
  }
};

var basicAttacking = function basicAttacking() {
  if (basicAttack && idle == true && lastpressed == "left") {
    // basicAttack = false
    lastpressed = "left";
    console.log(idle);
    idle = false;
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.basicAL);
  } else if (basicAttack && idle == true && lastpressed == "right") {
    // basicAttack = false
    lastpressed = "right";
    idle = false;
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.basicAR);
  }
};

var specialAttacking = function specialAttacking() {
  if (specialAttack && idle == true && lastpressed == "left") {
    lastpressed = "left";
    console.log(idle);
    idle = false;
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.specialAL);
    then = Date.now();
  } else if (specialAttack && idle == true && lastpressed == "right") {
    // basicAttack = false
    lastpressed = "right";
    idle = false;
    then = Date.now();
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.specialAR);
  }
};

var draw = function draw() {
  setIdle(); //running and looking right

  runningRight();
  console.log(lastpressed); // jumping 

  jumping(); //running and looking left

  runningLeft();
  basicAttacking();
  specialAttacking();
  console.log(player.frameValue); // drawing the player 

  var backgroundImg = new Image();
  backgroundImg.src = "src/images/Background.png";
  var playerImg = new Image();
  playerImg.src = "src/images/tanjiro_sprite.png"; // picks the correct number of frames

  var frame = _player_frames__WEBPACK_IMPORTED_MODULE_1__.frames[player.frameValue]; // starts animation

  player.updateAnimation(); // lastpressed === "left" ? specialPos = (x - frame.offsetX + 50) : specialPos = (x - frame.offsetX - 50) 

  playerImg.onload = function () {
    // player.updateAnimation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImg, frame.x, frame.y, frame.width, frame.height, x - frame.offsetX, y - frame.offsetY, frame.canvasWidth, frame.canvasHeight);
  }; // gravity


  y += 25; // collision control

  if (x + 2 > canvas.width - 80) x = canvas.width - 80;
  if (specialAttack && lastpressed === "right") x += 50;
  if (specialAttack && lastpressed === "left") x -= 50;
  if (x - 2 < 0) x = 0;
  if (y + 8 > canvas.height - 120) y = canvas.height - 120; // collision control
  //  moving right and left

  if (leftpressed || rightpressed) x += velocity_x; // if (rightpressed && leftpressed === false) x += velocity_x

  if (uppressed && y === canvas.height - 120) {
    y -= 80;
  }

  var time; // console.log(specialPos)
  // console.log(specialCount)
  // console.log(player.frameSetlength())
  // console.log(player.count)

  console.log("framevalue");
  console.log(player.frameValue); //  moving right and left
};

var keyDownHandler = function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightpressed = true;
  } else if ((e.key == "Up" || e.key == "ArrowUp") && uppressed === false) {
    uppressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftpressed = true;
  } else if (e.key == "a" || e.key == "KeyA") {
    basicAttack = true;
  } else if (e.key == "s" || e.key == "KeyS") {
    specialAttack = true;
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
    basicAttack = false; //    let facing = lastpressed == "left" ? "left" : "right"
    //    setTimeout(() => lastpressed = facing, 100)
  } else if (e.key == "s" || e.key == "KeyS") {
    specialAttack = false;
  }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/***/ }),

/***/ "./src/scripts/frame_handler.js":
/*!**************************************!*\
  !*** ./src/scripts/frame_handler.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FrameHandler = /*#__PURE__*/function () {
  function FrameHandler(frameSet) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "loop";

    _classCallCheck(this, FrameHandler);

    this.count = 0;
    this.delay = 1;
    this.frameIndex = 0;
    this.frameSet = frameSet;
    this.frameValue = frameSet[0];
    this.mode = mode;
  }

  _createClass(FrameHandler, [{
    key: "frameValue",
    value: function frameValue() {
      return this.frameValue;
    }
  }, {
    key: "frameSetlength",
    value: function frameSetlength() {
      return this.frameSet.length;
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
    key: "loop",
    value: function loop() {
      this.count++;
      console.log(this.frameSet);
      console.log(this.count);
      this.frameIndex = this.count > this.frameSet.length - 1 ? this.count = 0 : this.frameIndex + 1;
      this.frameValue = this.frameSet[this.frameIndex];
    }
  }, {
    key: "count",
    value: function count() {
      return this.count;
    }
  }, {
    key: "updateAnimation",
    value: function updateAnimation() {
      this.animate();
    }
  }]);

  return FrameHandler;
}();

/* harmony default export */ __webpack_exports__["default"] = (FrameHandler);

/***/ }),

/***/ "./src/scripts/player_frames.js":
/*!**************************************!*\
  !*** ./src/scripts/player_frames.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "frames": function() { return /* binding */ frames; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PlayerFrame = /*#__PURE__*/function () {
  function PlayerFrame(x, y, width, height, cWidth, cHeight) {
    var offsetX = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var offsetY = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

    _classCallCheck(this, PlayerFrame);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.canvasWidth = cWidth;
    this.canvasHeight = cHeight;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  _createClass(PlayerFrame, [{
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
  }, {
    key: "offsetX",
    value: function offsetX() {
      return this.offsetX;
    }
  }, {
    key: "offsetY",
    value: function offsetY() {
      return this.offsetY;
    }
  }]);

  return PlayerFrame;
}();

var frames = [new PlayerFrame(0, 5, 60, 70, 80, 100), new PlayerFrame(62, 5, 60, 70, 80, 100), new PlayerFrame(125, 5, 60, 70, 80, 100), // 0 idle right
new PlayerFrame(189, 5, 60, 70, 80, 100), new PlayerFrame(250, 5, 60, 70, 80, 100), new PlayerFrame(312, 5, 60, 70, 80, 100), // 3 idle left
new PlayerFrame(40, 70, 55, 70, 80, 100), new PlayerFrame(40, 70, 55, 70, 80, 100), new PlayerFrame(40, 70, 55, 70, 80, 100), //6 jump right
new PlayerFrame(280, 70, 55, 70, 80, 100), new PlayerFrame(280, 70, 55, 70, 80, 100), new PlayerFrame(280, 70, 55, 70, 80, 100), //9 jump right
new PlayerFrame(100, 133, 55, 70, 80, 100), new PlayerFrame(164, 133, 55, 70, 80, 100), new PlayerFrame(225, 133, 55, 70, 80, 100), new PlayerFrame(285, 133, 55, 70, 80, 100), new PlayerFrame(335, 133, 55, 70, 80, 100), new PlayerFrame(0, 212, 55, 70, 80, 100), new PlayerFrame(62, 212, 55, 70, 80, 100), //12 runnning right
new PlayerFrame(115, 212, 55, 70, 80, 100), new PlayerFrame(170, 212, 55, 70, 80, 100), new PlayerFrame(225, 212, 55, 70, 80, 100), new PlayerFrame(277, 212, 55, 70, 80, 100), new PlayerFrame(325, 212, 55, 70, 80, 100), new PlayerFrame(4, 292, 55, 70, 80, 100), new PlayerFrame(75, 292, 55, 70, 80, 100), // 19 running left attackleft
new PlayerFrame(295, 292, 55, 70, 80, 100), new PlayerFrame(6, 380, 100, 70, 140, 100), new PlayerFrame(135, 384, 100, 70, 140, 100), new PlayerFrame(233, 382, 100, 70, 140, 100), //26 basic attack right
new PlayerFrame(2, 467, 76, 72, 96, 100), new PlayerFrame(98, 467, 120, 70, 160, 100), new PlayerFrame(199, 467, 100, 70, 140, 100), new PlayerFrame(297, 467, 100, 70, 140, 100), //30 basic attack left
new PlayerFrame(-33, 545, 100, 70, 140, 100, 50, 25), new PlayerFrame(60, 530, 76, 100, 100, 120, 10, 25), new PlayerFrame(140, 550, 100, 70, 140, 100, 10, 18), new PlayerFrame(240, 547, 100, 70, 140, 100, 10, 18), new PlayerFrame(-25, 630, 100, 70, 140, 100, 20, 18), new PlayerFrame(76, 637, 100, 70, 140, 100, 40, 18), //34 special attack right
new PlayerFrame(220, 633, 100, 70, 140, 100, 10, 25), new PlayerFrame(-9, 720, 100, 70, 140, 100, 10, 18), new PlayerFrame(90, 720, 100, 70, 140, 100, 10, 18), new PlayerFrame(170, 720, 100, 70, 140, 100, 45, 18), new PlayerFrame(270, 720, 100, 70, 140, 100, 60, 18), new PlayerFrame(20, 805, 100, 70, 140, 100, 40, 18) //40 special attack left
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
/* harmony import */ var _scripts_animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/animator */ "./src/scripts/animator.js");

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var backgroundImg = new Image();
backgroundImg.src = "src/images/Background.png";

backgroundImg.onload = function () {};

var interval = setInterval(_scripts_animator__WEBPACK_IMPORTED_MODULE_0__.draw, 200);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2ZyYW1lX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL3BsYXllcl9mcmFtZXMuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYWxsRnJhbWVTZXRzIiwicmlnaHQiLCJpZGxlUmlnaHQiLCJqdW1wUmlnaHQiLCJydW5SaWdodCIsImJhc2ljQVIiLCJzcGVjaWFsQVIiLCJsZWZ0IiwiaWRsZUxlZnQiLCJqdW1wTGVmdCIsInJ1bkxlZnQiLCJiYXNpY0FMIiwic3BlY2lhbEFMIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJ4IiwieSIsImhlaWdodCIsInZlbG9jaXR5X3giLCJ2ZWxvY2l0eV95IiwicmlnaHRwcmVzc2VkIiwibGVmdHByZXNzZWQiLCJsYXN0cHJlc3NlZCIsInVwcHJlc3NlZCIsImlkbGUiLCJiYXNpY0F0dGFjayIsInNwZWNpYWxBdHRhY2siLCJ0aGVuIiwic3BlY2lhbFBvcyIsInBsYXllciIsIkZyYW1lSGFuZGxlciIsInNldElkbGUiLCJydW5uaW5nUmlnaHQiLCJqdW1waW5nIiwic2V0VGltZW91dCIsInJ1bm5pbmdMZWZ0IiwiYmFzaWNBdHRhY2tpbmciLCJjb25zb2xlIiwibG9nIiwic3BlY2lhbEF0dGFja2luZyIsIkRhdGUiLCJub3ciLCJkcmF3IiwiZnJhbWVWYWx1ZSIsImJhY2tncm91bmRJbWciLCJJbWFnZSIsInNyYyIsInBsYXllckltZyIsImZyYW1lIiwiZnJhbWVzIiwidXBkYXRlQW5pbWF0aW9uIiwib25sb2FkIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJkcmF3SW1hZ2UiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwidGltZSIsImtleURvd25IYW5kbGVyIiwiZSIsImtleSIsImtleVVwSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJmcmFtZVNldCIsIm1vZGUiLCJjb3VudCIsImRlbGF5IiwiZnJhbWVJbmRleCIsImxlbmd0aCIsImxvb3AiLCJwbGF5IiwiYW5pbWF0ZSIsIlBsYXllckZyYW1lIiwiY1dpZHRoIiwiY0hlaWdodCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHO0FBQ2pCQyxPQUFLLEVBQUU7QUFDSEMsYUFBUyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRFI7QUFFSEMsYUFBUyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRlI7QUFHSEMsWUFBUSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixDQUhQO0FBSUhDLFdBQU8sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsQ0FKTjtBQUtIQyxhQUFTLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxF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LENBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEVBQTlCLEVBQWtDLEdBQWxDLEVBQXVDLEdBQXZDLEVBQTRDLEVBQTVDLEVBQWdELEVBQWhELENBVjFQLENBVStTO0FBVi9TLENBQWYsQzs7Ozs7O1VDNUNQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU1oRSxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUVBLElBQUk4QixhQUFhLEdBQUcsSUFBSUMsS0FBSixFQUFwQjtBQUNBRCxhQUFhLENBQUNFLEdBQWQsR0FBb0IsMkJBQXBCOztBQUNBRixhQUFhLENBQUNPLE1BQWQsR0FBdUIsWUFBTSxDQUk1QixDQUpEOztBQVVBLElBQU0wQixRQUFRLEdBQUdDLFdBQVcsQ0FBQ3BDLG1EQUFELEVBQU8sR0FBUCxDQUE1QixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnJhbWVIYW5kbGVyIGZyb20gXCIuL2ZyYW1lX2hhbmRsZXJcIlxuaW1wb3J0IHsgZnJhbWVzIH0gZnJvbSBcIi4vcGxheWVyX2ZyYW1lc1wiXG5cbmNvbnN0IGFsbEZyYW1lU2V0cyA9IHtcbiAgICByaWdodDoge1xuICAgICAgICBpZGxlUmlnaHQ6IFswLCAxLCAyXSxcbiAgICAgICAganVtcFJpZ2h0OiBbNiwgNywgOF0sXG4gICAgICAgIHJ1blJpZ2h0OiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMThdLFxuICAgICAgICBiYXNpY0FSOiBbMjYsIDI3LCAyOCwgMjldLFxuICAgICAgICBzcGVjaWFsQVI6IFszNCwgMzUsIDM2LCAzNywgMzgsIDM5XVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgICBpZGxlTGVmdDogWzMsIDQsIDVdLFxuICAgICAgICBqdW1wTGVmdDogWzksIDEwLCAxMV0sXG4gICAgICAgIHJ1bkxlZnQ6IFsxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNV0sXG4gICAgICAgIGJhc2ljQUw6IFszMCwgMzEsIDMyLCAzM10sXG4gICAgICAgIHNwZWNpYWxBTDogWzQwLCA0MSwgNDIsIDQzLCA0NCwgNDVdXG4gICAgfSxcbn1cblxuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtY2FudmFzXCIpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxubGV0IHggPSA1MDtcbmxldCB5ID0gY2FudmFzLmhlaWdodCAtIDEwMDtcbmxldCB2ZWxvY2l0eV94ID0gMDtcbmxldCB2ZWxvY2l0eV95ID0gMDtcblxubGV0IHJpZ2h0cHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgbGVmdHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGxhc3RwcmVzc2VkID0gXCJyaWdodFwiO1xuXG5sZXQgdXBwcmVzc2VkID0gZmFsc2U7XG5cbmxldCBpZGxlID0gdHJ1ZTtcblxubGV0IGJhc2ljQXR0YWNrID0gZmFsc2U7XG5cbmxldCBzcGVjaWFsQXR0YWNrID0gZmFsc2U7XG5sZXQgdGhlbjtcbmxldCBzcGVjaWFsUG9zO1xuXG5cbmxldCBwbGF5ZXIgPSBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cblxuY29uc3Qgc2V0SWRsZSA9ICgpID0+IHtcbiAgICBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcInJpZ2h0XCIgJiYgaWRsZSA9PT0gZmFsc2UgJiYgIWJhc2ljQXR0YWNrICYmICFzcGVjaWFsQXR0YWNrICkgIHtcbiAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZWxvY2l0eV94ID09PSAwICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiICYmIGlkbGUgPT09IGZhbHNlICYmICFiYXNpY0F0dGFjayAmJiAhc3BlY2lhbEF0dGFjayApIHtcbiAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5pZGxlTGVmdClcbiAgICB9XG59XG5cbmNvbnN0IHJ1bm5pbmdSaWdodCA9ICgpID0+IHtcbiAgIFxuICAgIGlmIChyaWdodHByZXNzZWQgJiYgaWRsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IDMwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgICAgICBcbiAgICB9IFxuICAgIGVsc2UgaWYgKHJpZ2h0cHJlc3NlZCAmJiBpZGxlID09IGZhbHNlICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMzBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMucmlnaHQucnVuUmlnaHQpXG4gICAgfVxufVxuXG5jb25zdCBqdW1waW5nID0gKCkgPT4ge1xuICAgIGlmICh1cHByZXNzZWQgKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICAvLyB1cHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5sZWZ0Lmp1bXBMZWZ0KSA6IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLnJpZ2h0Lmp1bXBSaWdodClcblxuICAgICAgICBpZiAoeSA8PSBjYW52YXMuaGVpZ2h0IC0gMTAwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgICAgICBwbGF5ZXIgPSBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KSA6IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgMTAwKVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbHNlIGlmIChsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICAgICAgLCAxMDApXG5cbiAgICAgICAgLy8gfVxuXG4gICAgfVxuXG59XG5cblxuXG5jb25zdCBydW5uaW5nTGVmdCA9ICgpID0+IHtcbiAgICBpZiAobGVmdHByZXNzZWQgJiYgaWRsZSA9PSB0cnVlICkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IC0zMFxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwibGVmdFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLmxlZnQucnVuTGVmdClcbiAgICB9IFxuICAgIGVsc2UgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT0gZmFsc2UgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMzBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgfVxufVxuXG5jb25zdCBiYXNpY0F0dGFja2luZyA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgaWYgKGJhc2ljQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICAvLyBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgY29uc29sZS5sb2coaWRsZSlcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLmxlZnQuYmFzaWNBTClcblxuICAgIH0gXG4gICAgZWxzZSBpZiAoYmFzaWNBdHRhY2sgJiYgaWRsZSA9PSB0cnVlICYmIChsYXN0cHJlc3NlZCA9PSBcInJpZ2h0XCIpICkge1xuICAgICAgICAvLyBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG5cbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmJhc2ljQVIpXG4gICAgfVxuXG4gICAgXG59XG5cbmNvbnN0IHNwZWNpYWxBdHRhY2tpbmcgPSAoKSA9PiB7XG4gICAgaWYgKHNwZWNpYWxBdHRhY2sgJiYgaWRsZSA9PSB0cnVlICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiKSB7XG4gICAgICAgICBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICBjb25zb2xlLmxvZyhpZGxlKVxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5zcGVjaWFsQUwpXG4gICAgICAgIHRoZW4gPSBEYXRlLm5vdygpXG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmIChzcGVjaWFsQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiAobGFzdHByZXNzZWQgPT0gXCJyaWdodFwiKSkge1xuICAgICAgICAvLyBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICB0aGVuID0gRGF0ZS5ub3coKVxuICAgICAgICBwbGF5ZXIgPSBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5yaWdodC5zcGVjaWFsQVIpXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgIFxuICAgIHNldElkbGUoKVxuXG4gICAgLy9ydW5uaW5nIGFuZCBsb29raW5nIHJpZ2h0XG4gICAgcnVubmluZ1JpZ2h0KClcbiAgICBjb25zb2xlLmxvZyhsYXN0cHJlc3NlZClcbiAgICAvLyBqdW1waW5nIFxuICAgIGp1bXBpbmcoKVxuICBcbiAgICAvL3J1bm5pbmcgYW5kIGxvb2tpbmcgbGVmdFxuICAgIHJ1bm5pbmdMZWZ0KClcblxuICAgIGJhc2ljQXR0YWNraW5nKClcblxuICAgIHNwZWNpYWxBdHRhY2tpbmcoKVxuXG4gICBcbiAgICBcbiAgICBcbiBcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIuZnJhbWVWYWx1ZSlcbiAgICAvLyBkcmF3aW5nIHRoZSBwbGF5ZXIgXG5cbiAgICBsZXQgYmFja2dyb3VuZEltZyA9IG5ldyBJbWFnZTtcbiAgICBiYWNrZ3JvdW5kSW1nLnNyYyA9IFwic3JjL2ltYWdlcy9CYWNrZ3JvdW5kLnBuZ1wiXG4gICAgbGV0IHBsYXllckltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgcGxheWVySW1nLnNyYyA9IFwic3JjL2ltYWdlcy90YW5qaXJvX3Nwcml0ZS5wbmdcIjtcbiAgICAgICAgLy8gcGlja3MgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGZyYW1lc1xuICAgIGxldCBmcmFtZSA9IGZyYW1lc1twbGF5ZXIuZnJhbWVWYWx1ZV1cbiAgICAgICAgLy8gc3RhcnRzIGFuaW1hdGlvblxuICAgIHBsYXllci51cGRhdGVBbmltYXRpb24oKVxuICAgIFxuICAgIC8vIGxhc3RwcmVzc2VkID09PSBcImxlZnRcIiA/IHNwZWNpYWxQb3MgPSAoeCAtIGZyYW1lLm9mZnNldFggKyA1MCkgOiBzcGVjaWFsUG9zID0gKHggLSBmcmFtZS5vZmZzZXRYIC0gNTApIFxuICAgIHBsYXllckltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIC8vIHBsYXllci51cGRhdGVBbmltYXRpb25cbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZEltZywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgICBjdHguZHJhd0ltYWdlKHBsYXllckltZywgZnJhbWUueCwgZnJhbWUueSwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCwgeCAtIGZyYW1lLm9mZnNldFgsIHkgLSBmcmFtZS5vZmZzZXRZLCBmcmFtZS5jYW52YXNXaWR0aCwgZnJhbWUuY2FudmFzSGVpZ2h0KVxuICAgICAgICBcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgICAgIC8vIGdyYXZpdHlcbiAgICAgICAgeSArPSAyNSBcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbGxpc2lvbiBjb250cm9sXG4gICAgaWYgKHggKyAyID4gY2FudmFzLndpZHRoIC0gODApICh4ID0gY2FudmFzLndpZHRoIC0gODApXG5cbiAgICBpZiAoc3BlY2lhbEF0dGFjayAmJiBsYXN0cHJlc3NlZCA9PT0gXCJyaWdodFwiKSAoIHggKz0gNTApXG4gICAgaWYgKHNwZWNpYWxBdHRhY2sgJiYgbGFzdHByZXNzZWQgPT09IFwibGVmdFwiKSAoIHggLT0gNTApXG5cbiAgICBpZiAoeCAtIDIgPCAwKSAoeCA9IDApXG5cbiAgICBpZiAoeSArIDggPiBjYW52YXMuaGVpZ2h0IC0gMTIwICkgeSA9IGNhbnZhcy5oZWlnaHQgLSAxMjBcbiAgICAgICAgIC8vIGNvbGxpc2lvbiBjb250cm9sXG5cbiAgICAgICAgLy8gIG1vdmluZyByaWdodCBhbmQgbGVmdFxuICAgIGlmIChsZWZ0cHJlc3NlZCB8fCByaWdodHByZXNzZWQpIHggKz0gdmVsb2NpdHlfeFxuICAgIC8vIGlmIChyaWdodHByZXNzZWQgJiYgbGVmdHByZXNzZWQgPT09IGZhbHNlKSB4ICs9IHZlbG9jaXR5X3hcbiAgICBpZiAodXBwcmVzc2VkICYmIHkgPT09IGNhbnZhcy5oZWlnaHQtMTIwKSB7XG4gICAgICAgIHkgLT04MFxuXG4gICAgfVxuICAgIGxldCB0aW1lO1xuICAgIC8vIGNvbnNvbGUubG9nKHNwZWNpYWxQb3MpXG4gICAgLy8gY29uc29sZS5sb2coc3BlY2lhbENvdW50KVxuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5mcmFtZVNldGxlbmd0aCgpKVxuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5jb3VudClcbiAgICBjb25zb2xlLmxvZyhcImZyYW1ldmFsdWVcIilcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIuZnJhbWVWYWx1ZSlcbiAgXG5cblxuXG4gICAgICAgXG4gICAgICAgICAgICAvLyAgbW92aW5nIHJpZ2h0IGFuZCBsZWZ0XG59XG5cblxuY29uc3Qga2V5RG93bkhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIFxuICAgIFxuICAgIGlmIChlLmtleSA9PSBcIlJpZ2h0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgcmlnaHRwcmVzc2VkID0gdHJ1ZVxuICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmICgoZS5rZXkgPT0gXCJVcFwiIHx8IGUua2V5ID09IFwiQXJyb3dVcFwiKSAmJiAodXBwcmVzc2VkID09PSBmYWxzZSkpIHtcbiAgICAgICAgdXBwcmVzc2VkID0gdHJ1ZVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiTGVmdFwiIHx8IGUua2V5ID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgbGVmdHByZXNzZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJhXCIgfHwgZS5rZXkgPT0gXCJLZXlBXCIpIHtcbiAgICAgICAgYmFzaWNBdHRhY2sgPSB0cnVlXG4gICAgICAgIFxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwic1wiIHx8IGUua2V5ID09IFwiS2V5U1wiKSB7XG4gICAgICAgIHNwZWNpYWxBdHRhY2sgPSB0cnVlXG5cbiAgICB9XG5cbiAgICBcbn1cblxuY29uc3Qga2V5VXBIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT0gXCJSaWdodFwiIHx8IGUua2V5ID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAwXG4gICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiVXBcIiB8fCBlLmtleSA9PSBcIkFycm93VXBcIikge1xuICAgICAgICB1cHByZXNzZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiTGVmdFwiIHx8IGUua2V5ID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgdmVsb2NpdHlfeCA9IDBcbiAgICAgICAgbGVmdHByZXNzZWQgPSBmYWxzZVxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcImFcIiB8fCBlLmtleSA9PT0gXCJLZXlBXCIpIHtcbiAgICAgICAgYmFzaWNBdHRhY2sgPSBmYWxzZVxuICAgIC8vICAgIGxldCBmYWNpbmcgPSBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIiA/IFwibGVmdFwiIDogXCJyaWdodFwiXG4gICAgLy8gICAgc2V0VGltZW91dCgoKSA9PiBsYXN0cHJlc3NlZCA9IGZhY2luZywgMTAwKVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwic1wiIHx8IGUua2V5ID09IFwiS2V5U1wiKSB7XG4gICAgICAgIHNwZWNpYWxBdHRhY2sgPSBmYWxzZVxuXG4gICAgfVxuICAgIFxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleVVwSGFuZGxlciwgZmFsc2UpOyIsIlxuY2xhc3MgRnJhbWVIYW5kbGVyIHsgXG4gICAgY29uc3RydWN0b3IoZnJhbWVTZXQsIG1vZGUgPSBcImxvb3BcIikge1xuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDBcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgPSAxXG4gICAgICAgICAgICB0aGlzLmZyYW1lSW5kZXggPSAwXG4gICAgICAgICAgICB0aGlzLmZyYW1lU2V0ID0gZnJhbWVTZXRcbiAgICAgICAgICAgIHRoaXMuZnJhbWVWYWx1ZSA9IGZyYW1lU2V0WzBdXG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBtb2RlXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZyYW1lVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lVmFsdWVcbiAgICB9XG5cbiAgICBmcmFtZVNldGxlbmd0aCAoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVTZXQubGVuZ3RoXG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sb29wKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgICAgICAgICAgICBcImJyZWFrXCJcbiAgICAgICAgICAgIGNhc2UgXCJwYXVzZVwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGxvb3AoKSB7XG4gICAgICAgIHRoaXMuY291bnQrK1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnJhbWVTZXQpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpXG5cbiAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gKHRoaXMuY291bnQgPiB0aGlzLmZyYW1lU2V0Lmxlbmd0aCAtIDEpID8gdGhpcy5jb3VudCA9IDAgOiB0aGlzLmZyYW1lSW5kZXggKyAxXG5cbiAgICAgICAgdGhpcy5mcmFtZVZhbHVlID0gdGhpcy5mcmFtZVNldFt0aGlzLmZyYW1lSW5kZXhdXG5cbiAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50XG4gICAgfVxuXG4gICAgdXBkYXRlQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGUoKVxuICAgIH1cblxuXG59XG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgRnJhbWVIYW5kbGVyOyIsIlxuICAgIGNsYXNzIFBsYXllckZyYW1lIHtcbiAgICAgICAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCwgY1dpZHRoLCBjSGVpZ2h0LCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggXG4gICAgICAgICAgICB0aGlzLnkgPSB5IFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IGNXaWR0aFxuICAgICAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjSGVpZ2h0XG4gICAgICAgICAgICB0aGlzLm9mZnNldFggPSBvZmZzZXRYXG4gICAgICAgICAgICB0aGlzLm9mZnNldFkgPSBvZmZzZXRZXG4gICBcbiAgICAgICAgfVxuXG4gICAgICAgIHgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54XG4gICAgICAgIH1cbiAgICAgICAgeSgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMueVxuICAgICAgICB9XG5cbiAgICAgICAgaGVpZ2h0KCkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHRcbiAgICAgICAgfSBcbiAgICAgICAgd2lkdGgoKXtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGhcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbnZhc1dpZHRoKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzV2lkdGhcbiAgICAgICAgfVxuICAgICAgICBjYW52YXNIZWlnaHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXNIZWlnaHRcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldFgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXRYXG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0WSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9mZnNldFlcbiAgICAgICAgfVxuXG4gICAgfVxuXG5leHBvcnQgY29uc3QgZnJhbWVzID0gW1xuICAgIG5ldyBQbGF5ZXJGcmFtZSgwLCA1LCA2MCwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoNjIsIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgxMjUsIDUsIDYwLCA3MCwgODAsIDEwMCksICAvLyAwIGlkbGUgcmlnaHRcbiAgICBuZXcgUGxheWVyRnJhbWUoMTg5LCA1LCA2MCwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjUwLCA1LCA2MCwgNzAsIDgwLCAxMDApLG5ldyBQbGF5ZXJGcmFtZSggMzEyLCA1LCA2MCwgNzAsIDgwLCAxMDApLCAvLyAzIGlkbGUgbGVmdFxuICAgIG5ldyBQbGF5ZXJGcmFtZSg0MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSg0MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSg0MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIC8vNiBqdW1wIHJpZ2h0XG4gICAgbmV3IFBsYXllckZyYW1lKDI4MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyODAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjgwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgLy85IGp1bXAgcmlnaHRcbiAgICBuZXcgUGxheWVyRnJhbWUoMTAwLCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgxNjQsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDIyNSwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjg1LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgzMzUsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDAsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDYyLCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIC8vMTIgcnVubm5pbmcgcmlnaHRcbiAgICBuZXcgUGxheWVyRnJhbWUoMTE1LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgxNzAsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDIyNSwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjc3LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgzMjUsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDQsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDc1LCAyOTIsIDU1LCA3MCwgODAsIDEwMCksIC8vIDE5IHJ1bm5pbmcgbGVmdCBhdHRhY2tsZWZ0XG4gICAgbmV3IFBsYXllckZyYW1lKDI5NSwgMjkyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoNiwgMzgwLCAxMDAsIDcwLCAxNDAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgxMzUsIDM4NCwgMTAwLCA3MCwgMTQwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjMzLCAzODIsIDEwMCwgNzAsIDE0MCwgMTAwKSwgICAvLzI2IGJhc2ljIGF0dGFjayByaWdodFxuICAgIG5ldyBQbGF5ZXJGcmFtZSgyLCA0NjcsIDc2LCA3MiwgOTYsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSg5OCwgNDY3LCAxMjAsIDcwLCAxNjAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgxOTksIDQ2NywgMTAwLCA3MCwgMTQwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjk3LCA0NjcsIDEwMCwgNzAsIDE0MCwgMTAwKSwgICAvLzMwIGJhc2ljIGF0dGFjayBsZWZ0XG4gICAgbmV3IFBsYXllckZyYW1lKC0zMywgNTQ1LCAxMDAsIDcwLCAxNDAsIDEwMCwgNTAsIDI1KSwgbmV3IFBsYXllckZyYW1lKDYwLCA1MzAsIDc2LCAxMDAsIDEwMCwgMTIwLCAxMCwgMjUpLCAgbmV3IFBsYXllckZyYW1lKDE0MCwgNTUwLCAxMDAsIDcwLCAxNDAsIDEwMCwgMTAsIDE4KSwgbmV3IFBsYXllckZyYW1lKDI0MCwgNTQ3LCAxMDAsIDcwLCAxNDAsIDEwMCwgMTAsIDE4KSwgbmV3IFBsYXllckZyYW1lKC0yNSwgNjMwLCAxMDAsIDcwLCAxNDAsIDEwMCwgMjAsIDE4KSwgbmV3IFBsYXllckZyYW1lKDc2LCA2MzcsIDEwMCwgNzAsIDE0MCwgMTAwLCA0MCwgMTgpLCAgLy8zNCBzcGVjaWFsIGF0dGFjayByaWdodFxuICAgIG5ldyBQbGF5ZXJGcmFtZSgyMjAsIDYzMywgMTAwLCA3MCwgMTQwLCAxMDAsIDEwLCAyNSksIG5ldyBQbGF5ZXJGcmFtZSgtOSwgNzIwLCAxMDAsIDcwLCAxNDAsIDEwMCwgMTAsIDE4KSwgbmV3IFBsYXllckZyYW1lKDkwLCA3MjAsIDEwMCwgNzAsIDE0MCwgMTAwLCAxMCwgMTgpLCBuZXcgUGxheWVyRnJhbWUoMTcwLCA3MjAsIDEwMCwgNzAsIDE0MCwgMTAwLCA0NSwgMTgpLCBuZXcgUGxheWVyRnJhbWUoMjcwLCA3MjAsIDEwMCwgNzAsIDE0MCwgMTAwLCA2MCwgMTgpLCBuZXcgUGxheWVyRnJhbWUoMjAsIDgwNSwgMTAwLCA3MCwgMTQwLCAxMDAsIDQwLCAxOCkgIC8vNDAgc3BlY2lhbCBhdHRhY2sgbGVmdFxuXVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhdyB9IGZyb20gXCIuL3NjcmlwdHMvYW5pbWF0b3JcIlxuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtY2FudmFzXCIpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxubGV0IGJhY2tncm91bmRJbWcgPSBuZXcgSW1hZ2U7XG5iYWNrZ3JvdW5kSW1nLnNyYyA9IFwic3JjL2ltYWdlcy9CYWNrZ3JvdW5kLnBuZ1wiXG5iYWNrZ3JvdW5kSW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgIFxuXG5cbn1cblxuXG5cblxuXG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGRyYXcsIDIwMCkiXSwic291cmNlUm9vdCI6IiJ9