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
var playerX = 50;
var playerY = canvas.height - 100;
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

    if (playerY <= canvas.height - 100) {
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
    player = new _frame_handler__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.specialAL);
    idle = false;
  } else if (specialAttack && idle == true && lastpressed == "right") {
    // basicAttack = false
    lastpressed = "right";
    idle = false;
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
  var enemyImg = new Image();
  playerImg.src = "src/images/tanjiro_sprite.png"; // picks the correct number of frames

  enemyImg.src = "src/images/enemy_sprites.png";
  var frame = _player_frames__WEBPACK_IMPORTED_MODULE_1__.frames[player.frameValue]; // starts animation

  player.updateAnimation(); // lastpressed === "left" ? specialPos = (x - frame.offsetX + 50) : specialPos = (x - frame.offsetX - 50) 

  playerImg.onload = function () {
    // player.updateAnimation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImg, frame.x, frame.y, frame.width, frame.height, playerX - frame.offsetX, playerY - frame.offsetY, frame.canvasWidth, frame.canvasHeight); // ctx.drawImage(enemyImg, 15, 15, 60, 70, x, y,80, 100)
    // ctx.drawImage(enemyImg, 80, 100)
  }; // gravity


  playerY += 25; // collision control

  if (playerX + 30 > canvas.width - 80) playerX = canvas.width - 100;
  if (specialAttack && basicAttack === false && lastpressed === "right") playerX += 50;
  if (specialAttack && basicAttack === false && lastpressed === "left") playerX -= 50;
  if (playerX - 2 < 0) playerX = 0;
  if (playerY + 8 > canvas.height - 120) playerY = canvas.height - 120; // collision control
  //  moving right and left

  if (leftpressed || rightpressed) playerX += velocity_x; // if (rightpressed && leftpressed === false) x += velocity_x

  if (uppressed && playerY === canvas.height - 120) {
    playerY -= 80;
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
/* harmony default export */ __webpack_exports__["default"] = (PlayerFrame);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2ZyYW1lX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL3BsYXllcl9mcmFtZXMuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYWxsRnJhbWVTZXRzIiwicmlnaHQiLCJpZGxlUmlnaHQiLCJqdW1wUmlnaHQiLCJydW5SaWdodCIsImJhc2ljQVIiLCJzcGVjaWFsQVIiLCJsZWZ0IiwiaWRsZUxlZnQiLCJqdW1wTGVmdCIsInJ1bkxlZnQiLCJiYXNpY0FMIiwic3BlY2lhbEFMIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJwbGF5ZXJYIiwicGxheWVyWSIsImhlaWdodCIsInZlbG9jaXR5X3giLCJ2ZWxvY2l0eV95IiwicmlnaHRwcmVzc2VkIiwibGVmdHByZXNzZWQiLCJsYXN0cHJlc3NlZCIsInVwcHJlc3NlZCIsImlkbGUiLCJiYXNpY0F0dGFjayIsInNwZWNpYWxBdHRhY2siLCJ0aGVuIiwic3BlY2lhbFBvcyIsInBsYXllciIsIkZyYW1lSGFuZGxlciIsInNldElkbGUiLCJydW5uaW5nUmlnaHQiLCJqdW1waW5nIiwic2V0VGltZW91dCIsInJ1bm5pbmdMZWZ0IiwiYmFzaWNBdHRhY2tpbmciLCJzcGVjaWFsQXR0YWNraW5nIiwiZHJhdyIsImNvbnNvbGUiLCJsb2ciLCJmcmFtZVZhbHVlIiwiYmFja2dyb3VuZEltZyIsIkltYWdlIiwic3JjIiwicGxheWVySW1nIiwiZW5lbXlJbWciLCJmcmFtZSIsImZyYW1lcyIsInVwZGF0ZUFuaW1hdGlvbiIsIm9ubG9hZCIsImNsZWFyUmVjdCIsIndpZHRoIiwiZHJhd0ltYWdlIiwieCIsInkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwidGltZSIsImtleURvd25IYW5kbGVyIiwiZSIsImtleSIsImtleVVwSGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJmcmFtZVNldCIsIm1vZGUiLCJjb3VudCIsImRlbGF5IiwiZnJhbWVJbmRleCIsImxlbmd0aCIsImxvb3AiLCJwbGF5IiwiYW5pbWF0ZSIsIlBsYXllckZyYW1lIiwiY1dpZHRoIiwiY0hlaWdodCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHO0FBQ2pCQyxPQUFLLEVBQUU7QUFDSEMsYUFBUyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRFI7QUFFSEMsYUFBUyxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRlI7QUFHSEMsWUFBUSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixDQUhQO0FBSUhDLFdBQU8sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsQ0FKTjtBQUtIQyxhQUFTLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCO0FBTFIsR0FEVTtBQVFqQkMsTUFBSSxFQUFFO0FBQ0ZDLFlBQVEsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQURSO0FBRUZDLFlBQVEsRUFBRSxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQUZSO0FBR0ZDLFdBQU8sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsQ0FIUDtBQUlGQyxXQUFPLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLENBSlA7QUFLRkMsYUFBUyxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQjtBQUxUO0FBUlcsQ0FBckI7QUFrQkEsSUFBTUMsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBZjtBQUNBLElBQU1DLEdBQUcsR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFFQSxJQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLElBQUlDLE9BQU8sR0FBR04sTUFBTSxDQUFDTyxNQUFQLEdBQWdCLEdBQTlCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLENBQWpCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLENBQWpCO0FBRUEsSUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBRUEsSUFBSUMsV0FBVyxHQUFHLEtBQWxCO0FBRUEsSUFBSUMsV0FBVyxHQUFHLE9BQWxCO0FBRUEsSUFBSUMsU0FBUyxHQUFHLEtBQWhCO0FBRUEsSUFBSUMsSUFBSSxHQUFHLElBQVg7QUFFQSxJQUFJQyxXQUFXLEdBQUcsS0FBbEI7QUFFQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxJQUFKO0FBQ0EsSUFBSUMsVUFBSjtBQUdBLElBQUlDLE1BQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkMsU0FBcEMsQ0FBYjs7QUFHQSxJQUFNZ0MsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtBQUNsQixNQUFJYixVQUFVLEtBQUssQ0FBZixJQUFvQkksV0FBVyxJQUFJLE9BQW5DLElBQThDRSxJQUFJLEtBQUssS0FBdkQsSUFBZ0UsQ0FBQ0MsV0FBakUsSUFBZ0YsQ0FBQ0MsYUFBckYsRUFBc0c7QUFDbEdGLFFBQUksR0FBRyxJQUFQO0FBQ0FLLFVBQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkMsU0FBcEMsQ0FBVDtBQUNILEdBSEQsTUFJSyxJQUFJbUIsVUFBVSxLQUFLLENBQWYsSUFBb0JJLFdBQVcsSUFBSSxNQUFuQyxJQUE2Q0UsSUFBSSxLQUFLLEtBQXRELElBQStELENBQUNDLFdBQWhFLElBQStFLENBQUNDLGFBQXBGLEVBQW9HO0FBQ3JHRixRQUFJLEdBQUcsSUFBUDtBQUNBSyxVQUFNLEdBQUcsSUFBSUMsbURBQUosQ0FBaUJqQyxZQUFZLENBQUNPLElBQWIsQ0FBa0JDLFFBQW5DLENBQVQ7QUFDSDtBQUNKLENBVEQ7O0FBV0EsSUFBTTJCLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFFdkIsTUFBSVosWUFBWSxJQUFJSSxJQUFJLEtBQUssSUFBN0IsRUFBbUM7QUFDL0JBLFFBQUksR0FBRyxLQUFQO0FBQ0FOLGNBQVUsR0FBRyxFQUFiO0FBQ0FJLGVBQVcsR0FBRyxPQUFkLENBSCtCLENBSS9COztBQUNBTyxVQUFNLEdBQUcsSUFBSUMsbURBQUosQ0FBaUJqQyxZQUFZLENBQUNDLEtBQWIsQ0FBbUJHLFFBQXBDLENBQVQ7QUFFSCxHQVBELE1BUUssSUFBSW1CLFlBQVksSUFBSUksSUFBSSxJQUFJLEtBQXhCLElBQWlDRixXQUFXLElBQUksTUFBcEQsRUFBNEQ7QUFDN0RKLGNBQVUsR0FBRyxDQUFDLEVBQWQ7QUFDQUksZUFBVyxHQUFHLE9BQWQsQ0FGNkQsQ0FHN0Q7O0FBQ0FPLFVBQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkcsUUFBcEMsQ0FBVDtBQUNIO0FBQ0osQ0FoQkQ7O0FBa0JBLElBQU1nQyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0FBQ2xCLE1BQUlWLFNBQUosRUFBZ0I7QUFDWkMsUUFBSSxHQUFHLEtBQVAsQ0FEWSxDQUVaOztBQUNBSyxVQUFNLEdBQUdQLFdBQVcsS0FBSyxNQUFoQixHQUF5QixJQUFJUSxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ08sSUFBYixDQUFrQkUsUUFBbkMsQ0FBekIsR0FBd0UsSUFBSXdCLG1EQUFKLENBQWlCakMsWUFBWSxDQUFDQyxLQUFiLENBQW1CRSxTQUFwQyxDQUFqRjs7QUFFQSxRQUFJZ0IsT0FBTyxJQUFJTixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsR0FBL0IsRUFBb0M7QUFDaENpQixnQkFBVSxDQUFDLFlBQU07QUFDZFYsWUFBSSxHQUFHLElBQVA7QUFDSEssY0FBTSxHQUFHUCxXQUFXLEtBQUssTUFBaEIsR0FBeUIsSUFBSVEsbURBQUosQ0FBaUJqQyxZQUFZLENBQUNPLElBQWIsQ0FBa0JDLFFBQW5DLENBQXpCLEdBQXdFLElBQUl5QixtREFBSixDQUFpQmpDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkMsU0FBcEMsQ0FBakY7QUFFQyxPQUpTLEVBS0osR0FMSSxDQUFWO0FBT0gsS0FiVyxDQWVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFSDtBQUVKLENBMUJEOztBQThCQSxJQUFNb0MsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN0QixNQUFJZCxXQUFXLElBQUlHLElBQUksSUFBSSxJQUEzQixFQUFrQztBQUM5QkEsUUFBSSxHQUFHLEtBQVA7QUFDQU4sY0FBVSxHQUFHLENBQUMsRUFBZDtBQUNBSSxlQUFXLEdBQUcsTUFBZCxDQUg4QixDQUk5Qjs7QUFDQU8sVUFBTSxHQUFHLElBQUlDLG1EQUFKLENBQWlCakMsWUFBWSxDQUFDTyxJQUFiLENBQWtCRyxPQUFuQyxDQUFUO0FBQ0gsR0FORCxNQU9LLElBQUljLFdBQVcsSUFBSUcsSUFBSSxJQUFJLEtBQXZCLElBQWdDRixXQUFXLElBQUksT0FBbkQsRUFBNEQ7QUFDN0RKLGNBQVUsR0FBRyxDQUFDLEVBQWQ7QUFDQUksZUFBVyxHQUFHLE1BQWQsQ0FGNkQsQ0FHN0Q7O0FBQ0FPLFVBQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ08sSUFBYixDQUFrQkcsT0FBbkMsQ0FBVDtBQUNIO0FBQ0osQ0FkRDs7QUFnQkEsSUFBTTZCLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUV6QixNQUFJWCxXQUFXLElBQUlELElBQUksSUFBSSxJQUF2QixJQUErQkYsV0FBVyxJQUFJLE1BQWxELEVBQTBEO0FBQ3REO0FBQ0FBLGVBQVcsR0FBRyxNQUFkO0FBRUFFLFFBQUksR0FBRyxLQUFQO0FBQ0FLLFVBQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ08sSUFBYixDQUFrQkksT0FBbkMsQ0FBVDtBQUVILEdBUEQsTUFRSyxJQUFJaUIsV0FBVyxJQUFJRCxJQUFJLElBQUksSUFBdkIsSUFBZ0NGLFdBQVcsSUFBSSxPQUFuRCxFQUE4RDtBQUMvRDtBQUNBQSxlQUFXLEdBQUcsT0FBZDtBQUVBRSxRQUFJLEdBQUcsS0FBUDtBQUNBSyxVQUFNLEdBQUcsSUFBSUMsbURBQUosQ0FBaUJqQyxZQUFZLENBQUNDLEtBQWIsQ0FBbUJJLE9BQXBDLENBQVQ7QUFDSDtBQUdKLENBbkJEOztBQXFCQSxJQUFNbUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixHQUFNO0FBQzNCLE1BQUlYLGFBQWEsSUFBSUYsSUFBSSxJQUFJLElBQXpCLElBQWlDRixXQUFXLElBQUksTUFBcEQsRUFBNEQ7QUFDeERBLGVBQVcsR0FBRyxNQUFkO0FBRUFPLFVBQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ08sSUFBYixDQUFrQkssU0FBbkMsQ0FBVDtBQUNBZSxRQUFJLEdBQUcsS0FBUDtBQUNILEdBTEQsTUFNSyxJQUFJRSxhQUFhLElBQUlGLElBQUksSUFBSSxJQUF6QixJQUFrQ0YsV0FBVyxJQUFJLE9BQXJELEVBQStEO0FBQ2hFO0FBQ0FBLGVBQVcsR0FBRyxPQUFkO0FBQ0FFLFFBQUksR0FBRyxLQUFQO0FBQ0FLLFVBQU0sR0FBRyxJQUFJQyxtREFBSixDQUFpQmpDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkssU0FBcEMsQ0FBVDtBQUNIO0FBRUosQ0FkRDs7QUFnQk8sSUFBTW1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFFdEJQLFNBQU8sR0FGZSxDQUl0Qjs7QUFDQUMsY0FBWTtBQUNaTyxTQUFPLENBQUNDLEdBQVIsQ0FBWWxCLFdBQVosRUFOc0IsQ0FPdEI7O0FBQ0FXLFNBQU8sR0FSZSxDQVV0Qjs7QUFDQUUsYUFBVztBQUVYQyxnQkFBYztBQUVkQyxrQkFBZ0I7QUFHaEJFLFNBQU8sQ0FBQ0MsR0FBUixDQUFZWCxNQUFNLENBQUNZLFVBQW5CLEVBbEJzQixDQW1CdEI7O0FBRUEsTUFBSUMsYUFBYSxHQUFHLElBQUlDLEtBQUosRUFBcEI7QUFDQUQsZUFBYSxDQUFDRSxHQUFkLEdBQW9CLDJCQUFwQjtBQUNBLE1BQUlDLFNBQVMsR0FBRyxJQUFJRixLQUFKLEVBQWhCO0FBQ0EsTUFBSUcsUUFBUSxHQUFHLElBQUlILEtBQUosRUFBZjtBQUNBRSxXQUFTLENBQUNELEdBQVYsR0FBZ0IsK0JBQWhCLENBekJzQixDQTBCbEI7O0FBQ0pFLFVBQVEsQ0FBQ0YsR0FBVCxHQUFlLDhCQUFmO0FBQ0EsTUFBSUcsS0FBSyxHQUFHQyxrREFBTSxDQUFDbkIsTUFBTSxDQUFDWSxVQUFSLENBQWxCLENBNUJzQixDQTZCbEI7O0FBQ0paLFFBQU0sQ0FBQ29CLGVBQVAsR0E5QnNCLENBZ0N0Qjs7QUFDQUosV0FBUyxDQUFDSyxNQUFWLEdBQW1CLFlBQU07QUFDckI7QUFDQXJDLE9BQUcsQ0FBQ3NDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CekMsTUFBTSxDQUFDMEMsS0FBM0IsRUFBa0MxQyxNQUFNLENBQUNPLE1BQXpDO0FBQ0FKLE9BQUcsQ0FBQ3dDLFNBQUosQ0FBY1gsYUFBZCxFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQ2hDLE1BQU0sQ0FBQzBDLEtBQTFDLEVBQWlEMUMsTUFBTSxDQUFDTyxNQUF4RDtBQUNBSixPQUFHLENBQUN3QyxTQUFKLENBQWNSLFNBQWQsRUFBeUJFLEtBQUssQ0FBQ08sQ0FBL0IsRUFBa0NQLEtBQUssQ0FBQ1EsQ0FBeEMsRUFBMkNSLEtBQUssQ0FBQ0ssS0FBakQsRUFBd0RMLEtBQUssQ0FBQzlCLE1BQTlELEVBQXNFRixPQUFPLEdBQUdnQyxLQUFLLENBQUNTLE9BQXRGLEVBQStGeEMsT0FBTyxHQUFHK0IsS0FBSyxDQUFDVSxPQUEvRyxFQUF3SFYsS0FBSyxDQUFDVyxXQUE5SCxFQUEySVgsS0FBSyxDQUFDWSxZQUFqSixFQUpxQixDQUtyQjtBQUNBO0FBQ0gsR0FQRCxDQWpDc0IsQ0EwQ2xCOzs7QUFDQTNDLFNBQU8sSUFBSSxFQUFYLENBM0NrQixDQTZDbEI7O0FBQ0osTUFBSUQsT0FBTyxHQUFHLEVBQVYsR0FBZUwsTUFBTSxDQUFDMEMsS0FBUCxHQUFlLEVBQWxDLEVBQXVDckMsT0FBTyxHQUFHTCxNQUFNLENBQUMwQyxLQUFQLEdBQWUsR0FBMUI7QUFFdEMsTUFBSTFCLGFBQWEsSUFBSUQsV0FBVyxLQUFLLEtBQWpDLElBQTBDSCxXQUFXLEtBQUssT0FBOUQsRUFBMEVQLE9BQU8sSUFBSSxFQUFiO0FBQ3hFLE1BQUlXLGFBQWEsSUFBSUQsV0FBVyxLQUFLLEtBQWpDLElBQTBDSCxXQUFXLEtBQUssTUFBOUQsRUFBd0VQLE9BQU8sSUFBSSxFQUFiO0FBRXRFLE1BQUlBLE9BQU8sR0FBRyxDQUFWLEdBQWMsQ0FBbEIsRUFBc0JBLE9BQU8sR0FBRyxDQUFYO0FBRXJCLE1BQUlDLE9BQU8sR0FBRyxDQUFWLEdBQWNOLE1BQU0sQ0FBQ08sTUFBUCxHQUFnQixHQUFsQyxFQUF3Q0QsT0FBTyxHQUFHTixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsR0FBMUIsQ0FyRGxCLENBc0RqQjtBQUVEOztBQUNKLE1BQUlJLFdBQVcsSUFBSUQsWUFBbkIsRUFBaUNMLE9BQU8sSUFBSUcsVUFBWCxDQXpEWCxDQTBEdEI7O0FBQ0EsTUFBSUssU0FBUyxJQUFJUCxPQUFPLEtBQUtOLE1BQU0sQ0FBQ08sTUFBUCxHQUFjLEdBQTNDLEVBQWdEO0FBQzVDRCxXQUFPLElBQUcsRUFBVjtBQUVIOztBQUNELE1BQUk0QyxJQUFKLENBL0RzQixDQWdFdEI7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FyQixTQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaO0FBQ0FELFNBQU8sQ0FBQ0MsR0FBUixDQUFZWCxNQUFNLENBQUNZLFVBQW5CLEVBckVzQixDQTJFZDtBQUNYLENBNUVNOztBQStFUCxJQUFNb0IsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxDQUFELEVBQU87QUFHMUIsTUFBSUEsQ0FBQyxDQUFDQyxHQUFGLElBQVMsT0FBVCxJQUFvQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsWUFBakMsRUFBK0M7QUFDM0MzQyxnQkFBWSxHQUFHLElBQWY7QUFFSCxHQUhELE1BSUssSUFBSSxDQUFDMEMsQ0FBQyxDQUFDQyxHQUFGLElBQVMsSUFBVCxJQUFpQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsU0FBM0IsS0FBMEN4QyxTQUFTLEtBQUssS0FBNUQsRUFBb0U7QUFDckVBLGFBQVMsR0FBRyxJQUFaO0FBRUgsR0FISSxNQUlBLElBQUl1QyxDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUFULElBQW1CRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxXQUFoQyxFQUE2QztBQUM5QzFDLGVBQVcsR0FBRyxJQUFkO0FBQ0gsR0FGSSxNQUlBLElBQUl5QyxDQUFDLENBQUNDLEdBQUYsSUFBUyxHQUFULElBQWdCRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUE3QixFQUFxQztBQUN0Q3RDLGVBQVcsR0FBRyxJQUFkO0FBRUgsR0FISSxNQUtBLElBQUlxQyxDQUFDLENBQUNDLEdBQUYsSUFBUyxHQUFULElBQWdCRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUE3QixFQUFxQztBQUN0Q3JDLGlCQUFhLEdBQUcsSUFBaEI7QUFFSDtBQUdKLENBMUJEOztBQTRCQSxJQUFNc0MsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0YsQ0FBRCxFQUFPO0FBQ3hCLE1BQUlBLENBQUMsQ0FBQ0MsR0FBRixJQUFTLE9BQVQsSUFBb0JELENBQUMsQ0FBQ0MsR0FBRixJQUFTLFlBQWpDLEVBQStDO0FBQzNDM0MsZ0JBQVksR0FBRyxLQUFmO0FBQ0FGLGNBQVUsR0FBRyxDQUFiO0FBRUgsR0FKRCxNQUtLLElBQUk0QyxDQUFDLENBQUNDLEdBQUYsSUFBUyxJQUFULElBQWlCRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxTQUE5QixFQUF5QztBQUMxQ3hDLGFBQVMsR0FBRyxLQUFaO0FBQ0gsR0FGSSxNQUlBLElBQUl1QyxDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUFULElBQW1CRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxXQUFoQyxFQUE2QztBQUM5QzdDLGNBQVUsR0FBRyxDQUFiO0FBQ0FHLGVBQVcsR0FBRyxLQUFkO0FBQ0gsR0FISSxNQUlBLElBQUl5QyxDQUFDLENBQUNDLEdBQUYsSUFBUyxHQUFULElBQWdCRCxDQUFDLENBQUNDLEdBQUYsS0FBVSxNQUE5QixFQUFzQztBQUN2Q3RDLGVBQVcsR0FBRyxLQUFkLENBRHVDLENBRTNDO0FBQ0E7QUFDQyxHQUpJLE1BTUEsSUFBSXFDLENBQUMsQ0FBQ0MsR0FBRixJQUFTLEdBQVQsSUFBZ0JELENBQUMsQ0FBQ0MsR0FBRixJQUFTLE1BQTdCLEVBQXFDO0FBQ3RDckMsaUJBQWEsR0FBRyxLQUFoQjtBQUVIO0FBRUosQ0F6QkQ7O0FBMkJBZixRQUFRLENBQUNzRCxnQkFBVCxDQUEwQixTQUExQixFQUFxQ0osY0FBckMsRUFBcUQsS0FBckQ7QUFDQWxELFFBQVEsQ0FBQ3NELGdCQUFULENBQTBCLE9BQTFCLEVBQW1DRCxZQUFuQyxFQUFpRCxLQUFqRCxFOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3ZTTWxDLFk7QUFDRix3QkFBWW9DLFFBQVosRUFBcUM7QUFBQSxRQUFmQyxJQUFlLHVFQUFSLE1BQVE7O0FBQUE7O0FBQzdCLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0osUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLekIsVUFBTCxHQUFrQnlCLFFBQVEsQ0FBQyxDQUFELENBQTFCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBRVA7Ozs7V0FFRCxzQkFBYTtBQUNULGFBQU8sS0FBSzFCLFVBQVo7QUFDSDs7O1dBRUQsMEJBQWlCO0FBQ2IsYUFBTyxLQUFLeUIsUUFBTCxDQUFjSyxNQUFyQjtBQUNIOzs7V0FFRCxtQkFBVTtBQUNOLGNBQVEsS0FBS0osSUFBYjtBQUNJLGFBQUssTUFBTDtBQUNJLGVBQUtLLElBQUw7QUFDQTs7QUFDSixhQUFLLE1BQUw7QUFDSSxlQUFLQyxJQUFMO0FBQ0E7O0FBQ0osYUFBSyxPQUFMO0FBQ0k7QUFSUjtBQVdIOzs7V0FHRCxnQkFBTztBQUNILFdBQUtMLEtBQUw7QUFFQTdCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUswQixRQUFqQjtBQUNBM0IsYUFBTyxDQUFDQyxHQUFSLENBQVksS0FBSzRCLEtBQWpCO0FBRUEsV0FBS0UsVUFBTCxHQUFtQixLQUFLRixLQUFMLEdBQWEsS0FBS0YsUUFBTCxDQUFjSyxNQUFkLEdBQXVCLENBQXJDLEdBQTBDLEtBQUtILEtBQUwsR0FBYSxDQUF2RCxHQUEyRCxLQUFLRSxVQUFMLEdBQWtCLENBQS9GO0FBRUEsV0FBSzdCLFVBQUwsR0FBa0IsS0FBS3lCLFFBQUwsQ0FBYyxLQUFLSSxVQUFuQixDQUFsQjtBQUlIOzs7V0FFRCxpQkFBUTtBQUNKLGFBQU8sS0FBS0YsS0FBWjtBQUNIOzs7V0FFRCwyQkFBa0I7QUFDZCxXQUFLTSxPQUFMO0FBQ0g7Ozs7OztBQVNMLCtEQUFlNUMsWUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQy9EVTZDLFc7QUFDRix1QkFBWXJCLENBQVosRUFBZUMsQ0FBZixFQUFrQkgsS0FBbEIsRUFBeUJuQyxNQUF6QixFQUFpQzJELE1BQWpDLEVBQXlDQyxPQUF6QyxFQUE0RTtBQUFBLFFBQTFCckIsT0FBMEIsdUVBQWhCLENBQWdCO0FBQUEsUUFBYkMsT0FBYSx1RUFBSCxDQUFHOztBQUFBOztBQUN4RSxTQUFLSCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLdEMsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS21DLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtNLFdBQUwsR0FBbUJrQixNQUFuQjtBQUNBLFNBQUtqQixZQUFMLEdBQW9Ca0IsT0FBcEI7QUFDQSxTQUFLckIsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBRUg7Ozs7V0FFRCxhQUFJO0FBQ0EsYUFBTyxLQUFLSCxDQUFaO0FBQ0g7OztXQUNELGFBQUk7QUFDRCxhQUFPLEtBQUtDLENBQVo7QUFDRjs7O1dBRUQsa0JBQVM7QUFDTixhQUFPLEtBQUt0QyxNQUFaO0FBQ0Y7OztXQUNELGlCQUFPO0FBQ0osYUFBTyxLQUFLbUMsS0FBWjtBQUNGOzs7V0FFRCx1QkFBYztBQUNWLGFBQU8sS0FBS00sV0FBWjtBQUNIOzs7V0FDRCx3QkFBZTtBQUNYLGFBQU8sS0FBS0MsWUFBWjtBQUNIOzs7V0FFRCxtQkFBVTtBQUNOLGFBQU8sS0FBS0gsT0FBWjtBQUNIOzs7V0FDRCxtQkFBVTtBQUNOLGFBQU8sS0FBS0MsT0FBWjtBQUNIOzs7Ozs7QUFJRixJQUFNVCxNQUFNLEdBQUcsQ0FDbEIsSUFBSTJCLFdBQUosQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsR0FBbEMsQ0FEa0IsRUFDc0IsSUFBSUEsV0FBSixDQUFnQixFQUFoQixFQUFvQixDQUFwQixFQUF1QixFQUF2QixFQUEyQixFQUEzQixFQUErQixFQUEvQixFQUFtQyxHQUFuQyxDQUR0QixFQUMrRCxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLENBQXJCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEdBQXBDLENBRC9ELEVBQzBHO0FBQzVILElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsQ0FBckIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsR0FBcEMsQ0FGa0IsRUFFd0IsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixDQUFyQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxFQUFoQyxFQUFvQyxHQUFwQyxDQUZ4QixFQUVpRSxJQUFJQSxXQUFKLENBQWlCLEdBQWpCLEVBQXNCLENBQXRCLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLEVBQWpDLEVBQXFDLEdBQXJDLENBRmpFLEVBRTRHO0FBQzlILElBQUlBLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsR0FBcEMsQ0FIa0IsRUFHd0IsSUFBSUEsV0FBSixDQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxFQUFoQyxFQUFvQyxHQUFwQyxDQUh4QixFQUdrRSxJQUFJQSxXQUFKLENBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEdBQXBDLENBSGxFLEVBRzRHO0FBQzlILElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsRUFBcUMsR0FBckMsQ0FKa0IsRUFJeUIsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxHQUFyQyxDQUp6QixFQUlvRSxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLEVBQWpDLEVBQXFDLEdBQXJDLENBSnBFLEVBSStHO0FBQ2pJLElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsRUFBbEMsRUFBc0MsR0FBdEMsQ0FMa0IsRUFLMEIsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxHQUF0QyxDQUwxQixFQUtzRSxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEdBQXRDLENBTHRFLEVBS2tILElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsRUFBbEMsRUFBc0MsR0FBdEMsQ0FMbEgsRUFLOEosSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxHQUF0QyxDQUw5SixFQUswTSxJQUFJQSxXQUFKLENBQWdCLENBQWhCLEVBQW1CLEdBQW5CLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEdBQXBDLENBTDFNLEVBS29QLElBQUlBLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsRUFBcUMsR0FBckMsQ0FMcFAsRUFLK1I7QUFDalQsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxHQUF0QyxDQU5rQixFQU0wQixJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEdBQXRDLENBTjFCLEVBTXNFLElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsRUFBbEMsRUFBc0MsR0FBdEMsQ0FOdEUsRUFNa0gsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixFQUExQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxHQUF0QyxDQU5sSCxFQU04SixJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEdBQXRDLENBTjlKLEVBTTBNLElBQUlBLFdBQUosQ0FBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsR0FBcEMsQ0FOMU0sRUFNb1AsSUFBSUEsV0FBSixDQUFnQixFQUFoQixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxHQUFyQyxDQU5wUCxFQU0rUjtBQUNqVCxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEdBQXRDLENBUGtCLEVBTzBCLElBQUlBLFdBQUosQ0FBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkIsRUFBN0IsRUFBaUMsR0FBakMsRUFBc0MsR0FBdEMsQ0FQMUIsRUFPc0UsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixFQUEvQixFQUFtQyxHQUFuQyxFQUF3QyxHQUF4QyxDQVB0RSxFQU9vSCxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEVBQS9CLEVBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLENBUHBILEVBT29LO0FBQ3RMLElBQUlBLFdBQUosQ0FBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsR0FBcEMsQ0FSa0IsRUFRd0IsSUFBSUEsV0FBSixDQUFnQixFQUFoQixFQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixFQUE5QixFQUFrQyxHQUFsQyxFQUF1QyxHQUF2QyxDQVJ4QixFQVFxRSxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEVBQS9CLEVBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLENBUnJFLEVBUW1ILElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsRUFBL0IsRUFBbUMsR0FBbkMsRUFBd0MsR0FBeEMsQ0FSbkgsRUFRbUs7QUFDckwsSUFBSUEsV0FBSixDQUFnQixDQUFDLEVBQWpCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEVBQS9CLEVBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLEVBQTZDLEVBQTdDLEVBQWlELEVBQWpELENBVGtCLEVBU29DLElBQUlBLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsRUFBdUMsR0FBdkMsRUFBNEMsRUFBNUMsRUFBZ0QsRUFBaEQsQ0FUcEMsRUFTMEYsSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixFQUEvQixFQUFtQyxHQUFuQyxFQUF3QyxHQUF4QyxFQUE2QyxFQUE3QyxFQUFpRCxFQUFqRCxDQVQxRixFQVNnSixJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEVBQS9CLEVBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLEVBQTZDLEVBQTdDLEVBQWlELEVBQWpELENBVGhKLEVBU3NNLElBQUlBLFdBQUosQ0FBZ0IsQ0FBQyxFQUFqQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixFQUEvQixFQUFtQyxHQUFuQyxFQUF3QyxHQUF4QyxFQUE2QyxFQUE3QyxFQUFpRCxFQUFqRCxDQVR0TSxFQVM0UCxJQUFJQSxXQUFKLENBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEVBQTlCLEVBQWtDLEdBQWxDLEVBQXVDLEdBQXZDLEVBQTRDLEVBQTVDLEVBQWdELEVBQWhELENBVDVQLEVBU2tUO0FBQ3BVLElBQUlBLFdBQUosQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsRUFBL0IsRUFBbUMsR0FBbkMsRUFBd0MsR0FBeEMsRUFBNkMsRUFBN0MsRUFBaUQsRUFBakQsQ0FWa0IsRUFVb0MsSUFBSUEsV0FBSixDQUFnQixDQUFDLENBQWpCLEVBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEVBQTlCLEVBQWtDLEdBQWxDLEVBQXVDLEdBQXZDLEVBQTRDLEVBQTVDLEVBQWdELEVBQWhELENBVnBDLEVBVXlGLElBQUlBLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsRUFBOUIsRUFBa0MsR0FBbEMsRUFBdUMsR0FBdkMsRUFBNEMsRUFBNUMsRUFBZ0QsRUFBaEQsQ0FWekYsRUFVOEksSUFBSUEsV0FBSixDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixFQUEvQixFQUFtQyxHQUFuQyxFQUF3QyxHQUF4QyxFQUE2QyxFQUE3QyxFQUFpRCxFQUFqRCxDQVY5SSxFQVVvTSxJQUFJQSxXQUFKLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEVBQS9CLEVBQW1DLEdBQW5DLEVBQXdDLEdBQXhDLEVBQTZDLEVBQTdDLEVBQWlELEVBQWpELENBVnBNLEVBVTBQLElBQUlBLFdBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsRUFBOUIsRUFBa0MsR0FBbEMsRUFBdUMsR0FBdkMsRUFBNEMsRUFBNUMsRUFBZ0QsRUFBaEQsQ0FWMVAsQ0FVK1M7QUFWL1MsQ0FBZjtBQWFQLCtEQUFlQSxXQUFmLEU7Ozs7OztVQ3pEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQSxJQUFNakUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBZjtBQUNBLElBQU1DLEdBQUcsR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFFQSxJQUFJNEIsYUFBYSxHQUFHLElBQUlDLEtBQUosRUFBcEI7QUFDQUQsYUFBYSxDQUFDRSxHQUFkLEdBQW9CLDJCQUFwQjs7QUFDQUYsYUFBYSxDQUFDUSxNQUFkLEdBQXVCLFlBQU0sQ0FFNUIsQ0FGRDs7QUFRQSxJQUFNNEIsUUFBUSxHQUFHQyxXQUFXLENBQUN6QyxtREFBRCxFQUFPLEdBQVAsQ0FBNUIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZyYW1lSGFuZGxlciBmcm9tIFwiLi9mcmFtZV9oYW5kbGVyXCJcbmltcG9ydCB7IGZyYW1lcyB9IGZyb20gXCIuL3BsYXllcl9mcmFtZXNcIlxuXG5jb25zdCBhbGxGcmFtZVNldHMgPSB7XG4gICAgcmlnaHQ6IHtcbiAgICAgICAgaWRsZVJpZ2h0OiBbMCwgMSwgMl0sXG4gICAgICAgIGp1bXBSaWdodDogWzYsIDcsIDhdLFxuICAgICAgICBydW5SaWdodDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4XSxcbiAgICAgICAgYmFzaWNBUjogWzI2LCAyNywgMjgsIDI5XSxcbiAgICAgICAgc3BlY2lhbEFSOiBbMzQsIDM1LCAzNiwgMzcsIDM4LCAzOV1cbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgICAgaWRsZUxlZnQ6IFszLCA0LCA1XSxcbiAgICAgICAganVtcExlZnQ6IFs5LCAxMCwgMTFdLFxuICAgICAgICBydW5MZWZ0OiBbMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjVdLFxuICAgICAgICBiYXNpY0FMOiBbMzAsIDMxLCAzMiwgMzNdLFxuICAgICAgICBzcGVjaWFsQUw6IFs0MCwgNDEsIDQyLCA0MywgNDQsIDQ1XVxuICAgIH0sXG59XG5cblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLWNhbnZhc1wiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbmxldCBwbGF5ZXJYID0gNTA7XG5sZXQgcGxheWVyWSA9IGNhbnZhcy5oZWlnaHQgLSAxMDA7XG5sZXQgdmVsb2NpdHlfeCA9IDA7XG5sZXQgdmVsb2NpdHlfeSA9IDA7XG5cbmxldCByaWdodHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGxlZnRwcmVzc2VkID0gZmFsc2U7XG5cbmxldCBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIjtcblxubGV0IHVwcHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgaWRsZSA9IHRydWU7XG5cbmxldCBiYXNpY0F0dGFjayA9IGZhbHNlO1xuXG5sZXQgc3BlY2lhbEF0dGFjayA9IGZhbHNlO1xubGV0IHRoZW47XG5sZXQgc3BlY2lhbFBvcztcblxuXG5sZXQgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuXG5cbmNvbnN0IHNldElkbGUgPSAoKSA9PiB7XG4gICAgaWYgKHZlbG9jaXR5X3ggPT09IDAgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiICYmIGlkbGUgPT09IGZhbHNlICYmICFiYXNpY0F0dGFjayAmJiAhc3BlY2lhbEF0dGFjayApICB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIiAmJiBpZGxlID09PSBmYWxzZSAmJiAhYmFzaWNBdHRhY2sgJiYgIXNwZWNpYWxBdHRhY2sgKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgfVxufVxuXG5jb25zdCBydW5uaW5nUmlnaHQgPSAoKSA9PiB7XG4gICBcbiAgICBpZiAocmlnaHRwcmVzc2VkICYmIGlkbGUgPT09IHRydWUpIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAzMFxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICAgICAgXG4gICAgfSBcbiAgICBlbHNlIGlmIChyaWdodHByZXNzZWQgJiYgaWRsZSA9PSBmYWxzZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gLTMwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBGcmFtZUhhbmRsZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgIH1cbn1cblxuY29uc3QganVtcGluZyA9ICgpID0+IHtcbiAgICBpZiAodXBwcmVzc2VkICkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgLy8gdXBwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5qdW1wTGVmdCkgOiBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5yaWdodC5qdW1wUmlnaHQpXG5cbiAgICAgICAgaWYgKHBsYXllclkgPD0gY2FudmFzLmhlaWdodCAtIDEwMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICBpZGxlID0gdHJ1ZVxuICAgICAgICAgICAgcGxheWVyID0gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5pZGxlTGVmdCkgOiBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsIDEwMClcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWxzZSBpZiAobGFzdHByZXNzZWQgPT09IFwibGVmdFwiKSB7XG4gICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgICAgICwgMTAwKVxuXG4gICAgICAgIC8vIH1cblxuICAgIH1cblxufVxuXG5cblxuY29uc3QgcnVubmluZ0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT0gdHJ1ZSApIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMzBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgfSBcbiAgICBlbHNlIGlmIChsZWZ0cHJlc3NlZCAmJiBpZGxlID09IGZhbHNlICYmIGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gLTMwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5ydW5MZWZ0KVxuICAgIH1cbn1cblxuY29uc3QgYmFzaWNBdHRhY2tpbmcgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgIGlmIChiYXNpY0F0dGFjayAmJiBpZGxlID09IHRydWUgJiYgbGFzdHByZXNzZWQgPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgLy8gYmFzaWNBdHRhY2sgPSBmYWxzZVxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwibGVmdFwiXG4gICAgICAgIFxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5iYXNpY0FMKVxuXG4gICAgfSBcbiAgICBlbHNlIGlmIChiYXNpY0F0dGFjayAmJiBpZGxlID09IHRydWUgJiYgKGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikgKSB7XG4gICAgICAgIC8vIGJhc2ljQXR0YWNrID0gZmFsc2VcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcblxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMucmlnaHQuYmFzaWNBUilcbiAgICB9XG5cbiAgICBcbn1cblxuY29uc3Qgc3BlY2lhbEF0dGFja2luZyA9ICgpID0+IHtcbiAgICBpZiAoc3BlY2lhbEF0dGFjayAmJiBpZGxlID09IHRydWUgJiYgbGFzdHByZXNzZWQgPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICBcbiAgICAgICAgcGxheWVyID0gbmV3IEZyYW1lSGFuZGxlcihhbGxGcmFtZVNldHMubGVmdC5zcGVjaWFsQUwpXG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgIH1cbiAgICBlbHNlIGlmIChzcGVjaWFsQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiAobGFzdHByZXNzZWQgPT0gXCJyaWdodFwiKSkge1xuICAgICAgICAvLyBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgRnJhbWVIYW5kbGVyKGFsbEZyYW1lU2V0cy5yaWdodC5zcGVjaWFsQVIpXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBkcmF3ID0gKCkgPT4ge1xuICAgIFxuICAgIHNldElkbGUoKVxuXG4gICAgLy9ydW5uaW5nIGFuZCBsb29raW5nIHJpZ2h0XG4gICAgcnVubmluZ1JpZ2h0KClcbiAgICBjb25zb2xlLmxvZyhsYXN0cHJlc3NlZClcbiAgICAvLyBqdW1waW5nIFxuICAgIGp1bXBpbmcoKVxuICBcbiAgICAvL3J1bm5pbmcgYW5kIGxvb2tpbmcgbGVmdFxuICAgIHJ1bm5pbmdMZWZ0KClcblxuICAgIGJhc2ljQXR0YWNraW5nKClcblxuICAgIHNwZWNpYWxBdHRhY2tpbmcoKVxuXG4gXG4gICAgY29uc29sZS5sb2cocGxheWVyLmZyYW1lVmFsdWUpXG4gICAgLy8gZHJhd2luZyB0aGUgcGxheWVyIFxuXG4gICAgbGV0IGJhY2tncm91bmRJbWcgPSBuZXcgSW1hZ2U7XG4gICAgYmFja2dyb3VuZEltZy5zcmMgPSBcInNyYy9pbWFnZXMvQmFja2dyb3VuZC5wbmdcIlxuICAgIGxldCBwbGF5ZXJJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBsZXQgZW5lbXlJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBwbGF5ZXJJbWcuc3JjID0gXCJzcmMvaW1hZ2VzL3Rhbmppcm9fc3ByaXRlLnBuZ1wiO1xuICAgICAgICAvLyBwaWNrcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgZnJhbWVzXG4gICAgZW5lbXlJbWcuc3JjID0gXCJzcmMvaW1hZ2VzL2VuZW15X3Nwcml0ZXMucG5nXCI7XG4gICAgbGV0IGZyYW1lID0gZnJhbWVzW3BsYXllci5mcmFtZVZhbHVlXVxuICAgICAgICAvLyBzdGFydHMgYW5pbWF0aW9uXG4gICAgcGxheWVyLnVwZGF0ZUFuaW1hdGlvbigpXG4gICAgXG4gICAgLy8gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gc3BlY2lhbFBvcyA9ICh4IC0gZnJhbWUub2Zmc2V0WCArIDUwKSA6IHNwZWNpYWxQb3MgPSAoeCAtIGZyYW1lLm9mZnNldFggLSA1MCkgXG4gICAgcGxheWVySW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgLy8gcGxheWVyLnVwZGF0ZUFuaW1hdGlvblxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcbiAgICAgICAgY3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kSW1nLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UocGxheWVySW1nLCBmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0LCBwbGF5ZXJYIC0gZnJhbWUub2Zmc2V0WCwgcGxheWVyWSAtIGZyYW1lLm9mZnNldFksIGZyYW1lLmNhbnZhc1dpZHRoLCBmcmFtZS5jYW52YXNIZWlnaHQpXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoZW5lbXlJbWcsIDE1LCAxNSwgNjAsIDcwLCB4LCB5LDgwLCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoZW5lbXlJbWcsIDgwLCAxMDApXG4gICAgfVxuXG4gICAgICAgIC8vIGdyYXZpdHlcbiAgICAgICAgcGxheWVyWSArPSAyNSBcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbGxpc2lvbiBjb250cm9sXG4gICAgaWYgKHBsYXllclggKyAzMCA+IGNhbnZhcy53aWR0aCAtIDgwKSAocGxheWVyWCA9IGNhbnZhcy53aWR0aCAtIDEwMClcblxuICAgIGlmIChzcGVjaWFsQXR0YWNrICYmIGJhc2ljQXR0YWNrID09PSBmYWxzZSAmJiBsYXN0cHJlc3NlZCA9PT0gXCJyaWdodFwiICkgKCBwbGF5ZXJYICs9IDUwKVxuICAgIGlmIChzcGVjaWFsQXR0YWNrICYmIGJhc2ljQXR0YWNrID09PSBmYWxzZSAmJiBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIpICggcGxheWVyWCAtPSA1MClcblxuICAgIGlmIChwbGF5ZXJYIC0gMiA8IDApIChwbGF5ZXJYID0gMClcblxuICAgIGlmIChwbGF5ZXJZICsgOCA+IGNhbnZhcy5oZWlnaHQgLSAxMjAgKSBwbGF5ZXJZID0gY2FudmFzLmhlaWdodCAtIDEyMFxuICAgICAgICAgLy8gY29sbGlzaW9uIGNvbnRyb2xcblxuICAgICAgICAvLyAgbW92aW5nIHJpZ2h0IGFuZCBsZWZ0XG4gICAgaWYgKGxlZnRwcmVzc2VkIHx8IHJpZ2h0cHJlc3NlZCkgcGxheWVyWCArPSB2ZWxvY2l0eV94XG4gICAgLy8gaWYgKHJpZ2h0cHJlc3NlZCAmJiBsZWZ0cHJlc3NlZCA9PT0gZmFsc2UpIHggKz0gdmVsb2NpdHlfeFxuICAgIGlmICh1cHByZXNzZWQgJiYgcGxheWVyWSA9PT0gY2FudmFzLmhlaWdodC0xMjApIHtcbiAgICAgICAgcGxheWVyWSAtPTgwXG5cbiAgICB9XG4gICAgbGV0IHRpbWU7XG4gICAgLy8gY29uc29sZS5sb2coc3BlY2lhbFBvcylcbiAgICAvLyBjb25zb2xlLmxvZyhzcGVjaWFsQ291bnQpXG4gICAgLy8gY29uc29sZS5sb2cocGxheWVyLmZyYW1lU2V0bGVuZ3RoKCkpXG4gICAgLy8gY29uc29sZS5sb2cocGxheWVyLmNvdW50KVxuICAgIGNvbnNvbGUubG9nKFwiZnJhbWV2YWx1ZVwiKVxuICAgIGNvbnNvbGUubG9nKHBsYXllci5mcmFtZVZhbHVlKVxuICBcblxuXG5cbiAgICAgICBcbiAgICAgICAgICAgIC8vICBtb3ZpbmcgcmlnaHQgYW5kIGxlZnRcbn1cblxuXG5jb25zdCBrZXlEb3duSGFuZGxlciA9IChlKSA9PiB7XG4gICAgXG4gICAgXG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSB0cnVlXG4gICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKChlLmtleSA9PSBcIlVwXCIgfHwgZS5rZXkgPT0gXCJBcnJvd1VwXCIpICYmICh1cHByZXNzZWQgPT09IGZhbHNlKSkge1xuICAgICAgICB1cHByZXNzZWQgPSB0cnVlXG5cbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJMZWZ0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICBsZWZ0cHJlc3NlZCA9IHRydWVcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcImFcIiB8fCBlLmtleSA9PSBcIktleUFcIikge1xuICAgICAgICBiYXNpY0F0dGFjayA9IHRydWVcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJzXCIgfHwgZS5rZXkgPT0gXCJLZXlTXCIpIHtcbiAgICAgICAgc3BlY2lhbEF0dGFjayA9IHRydWVcblxuICAgIH1cblxuICAgIFxufVxuXG5jb25zdCBrZXlVcEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PSBcIlJpZ2h0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IDBcbiAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJVcFwiIHx8IGUua2V5ID09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgIHVwcHJlc3NlZCA9IGZhbHNlXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJMZWZ0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gMFxuICAgICAgICBsZWZ0cHJlc3NlZCA9IGZhbHNlXG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiYVwiIHx8IGUua2V5ID09PSBcIktleUFcIikge1xuICAgICAgICBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgLy8gICAgbGV0IGZhY2luZyA9IGxhc3RwcmVzc2VkID09IFwibGVmdFwiID8gXCJsZWZ0XCIgOiBcInJpZ2h0XCJcbiAgICAvLyAgICBzZXRUaW1lb3V0KCgpID0+IGxhc3RwcmVzc2VkID0gZmFjaW5nLCAxMDApXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJzXCIgfHwgZS5rZXkgPT0gXCJLZXlTXCIpIHtcbiAgICAgICAgc3BlY2lhbEF0dGFjayA9IGZhbHNlXG5cbiAgICB9XG4gICAgXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd25IYW5kbGVyLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5VXBIYW5kbGVyLCBmYWxzZSk7IiwiXG5jbGFzcyBGcmFtZUhhbmRsZXIgeyBcbiAgICBjb25zdHJ1Y3RvcihmcmFtZVNldCwgbW9kZSA9IFwibG9vcFwiKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMFxuICAgICAgICAgICAgdGhpcy5kZWxheSA9IDFcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJbmRleCA9IDBcbiAgICAgICAgICAgIHRoaXMuZnJhbWVTZXQgPSBmcmFtZVNldFxuICAgICAgICAgICAgdGhpcy5mcmFtZVZhbHVlID0gZnJhbWVTZXRbMF1cbiAgICAgICAgICAgIHRoaXMubW9kZSA9IG1vZGVcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnJhbWVWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVWYWx1ZVxuICAgIH1cblxuICAgIGZyYW1lU2V0bGVuZ3RoICgpe1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZVNldC5sZW5ndGhcbiAgICB9XG5cbiAgICBhbmltYXRlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSBcImxvb3BcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxvb3AoKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYXlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKVxuICAgICAgICAgICAgICAgIFwiYnJlYWtcIlxuICAgICAgICAgICAgY2FzZSBcInBhdXNlXCI6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCsrXG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mcmFtZVNldClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3VudClcblxuICAgICAgICB0aGlzLmZyYW1lSW5kZXggPSAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkgPyB0aGlzLmNvdW50ID0gMCA6IHRoaXMuZnJhbWVJbmRleCArIDFcblxuICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSB0aGlzLmZyYW1lU2V0W3RoaXMuZnJhbWVJbmRleF1cblxuICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnRcbiAgICB9XG5cbiAgICB1cGRhdGVBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBGcmFtZUhhbmRsZXI7IiwiXG4gICAgY2xhc3MgUGxheWVyRnJhbWUge1xuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjV2lkdGgsIGNIZWlnaHQsIG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCkge1xuICAgICAgICAgICAgdGhpcy54ID0geCBcbiAgICAgICAgICAgIHRoaXMueSA9IHkgXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gY1dpZHRoXG4gICAgICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNIZWlnaHRcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IG9mZnNldFhcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IG9mZnNldFlcbiAgIFxuICAgICAgICB9XG5cbiAgICAgICAgeCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhcbiAgICAgICAgfVxuICAgICAgICB5KCkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy55XG4gICAgICAgIH1cblxuICAgICAgICBoZWlnaHQoKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodFxuICAgICAgICB9IFxuICAgICAgICB3aWR0aCgpe1xuICAgICAgICAgICByZXR1cm4gdGhpcy53aWR0aFxuICAgICAgICB9XG5cbiAgICAgICAgY2FudmFzV2lkdGgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXNXaWR0aFxuICAgICAgICB9XG4gICAgICAgIGNhbnZhc0hlaWdodCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhc0hlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgb2Zmc2V0WCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9mZnNldFhcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXRZKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0WVxuICAgICAgICB9XG5cbiAgICB9XG5cbmV4cG9ydCBjb25zdCBmcmFtZXMgPSBbXG4gICAgbmV3IFBsYXllckZyYW1lKDAsIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSg2MiwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDEyNSwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgIC8vIDAgaWRsZSByaWdodFxuICAgIG5ldyBQbGF5ZXJGcmFtZSgxODksIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyNTAsIDUsIDYwLCA3MCwgODAsIDEwMCksbmV3IFBsYXllckZyYW1lKCAzMTIsIDUsIDYwLCA3MCwgODAsIDEwMCksIC8vIDMgaWRsZSBsZWZ0XG4gICAgbmV3IFBsYXllckZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgLy82IGp1bXAgcmlnaHRcbiAgICBuZXcgUGxheWVyRnJhbWUoMjgwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDI4MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyODAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCAvLzkganVtcCByaWdodFxuICAgIG5ldyBQbGF5ZXJGcmFtZSgxMDAsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDE2NCwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjI1LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyODUsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDMzNSwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMCwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoNjIsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgLy8xMiBydW5ubmluZyByaWdodFxuICAgIG5ldyBQbGF5ZXJGcmFtZSgxMTUsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDE3MCwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoMjI1LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyNzcsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDMyNSwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoNCwgMjkyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgUGxheWVyRnJhbWUoNzUsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgLy8gMTkgcnVubmluZyBsZWZ0IGF0dGFja2xlZnRcbiAgICBuZXcgUGxheWVyRnJhbWUoMjk1LCAyOTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSg2LCAzODAsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDEzNSwgMzg0LCAxMDAsIDcwLCAxNDAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyMzMsIDM4MiwgMTAwLCA3MCwgMTQwLCAxMDApLCAgIC8vMjYgYmFzaWMgYXR0YWNrIHJpZ2h0XG4gICAgbmV3IFBsYXllckZyYW1lKDIsIDQ2NywgNzYsIDcyLCA5NiwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDk4LCA0NjcsIDEyMCwgNzAsIDE2MCwgMTAwKSwgbmV3IFBsYXllckZyYW1lKDE5OSwgNDY3LCAxMDAsIDcwLCAxNDAsIDEwMCksIG5ldyBQbGF5ZXJGcmFtZSgyOTcsIDQ2NywgMTAwLCA3MCwgMTQwLCAxMDApLCAgIC8vMzAgYmFzaWMgYXR0YWNrIGxlZnRcbiAgICBuZXcgUGxheWVyRnJhbWUoLTMzLCA1NDUsIDEwMCwgNzAsIDE0MCwgMTAwLCA1MCwgMjUpLCBuZXcgUGxheWVyRnJhbWUoNjAsIDUzMCwgNzYsIDEwMCwgMTAwLCAxMjAsIDEwLCAyNSksICBuZXcgUGxheWVyRnJhbWUoMTQwLCA1NTAsIDEwMCwgNzAsIDE0MCwgMTAwLCAxMCwgMTgpLCBuZXcgUGxheWVyRnJhbWUoMjQwLCA1NDcsIDEwMCwgNzAsIDE0MCwgMTAwLCAxMCwgMTgpLCBuZXcgUGxheWVyRnJhbWUoLTI1LCA2MzAsIDEwMCwgNzAsIDE0MCwgMTAwLCAyMCwgMTgpLCBuZXcgUGxheWVyRnJhbWUoNzYsIDYzNywgMTAwLCA3MCwgMTQwLCAxMDAsIDQwLCAxOCksICAvLzM0IHNwZWNpYWwgYXR0YWNrIHJpZ2h0XG4gICAgbmV3IFBsYXllckZyYW1lKDIyMCwgNjMzLCAxMDAsIDcwLCAxNDAsIDEwMCwgMTAsIDI1KSwgbmV3IFBsYXllckZyYW1lKC05LCA3MjAsIDEwMCwgNzAsIDE0MCwgMTAwLCAxMCwgMTgpLCBuZXcgUGxheWVyRnJhbWUoOTAsIDcyMCwgMTAwLCA3MCwgMTQwLCAxMDAsIDEwLCAxOCksIG5ldyBQbGF5ZXJGcmFtZSgxNzAsIDcyMCwgMTAwLCA3MCwgMTQwLCAxMDAsIDQ1LCAxOCksIG5ldyBQbGF5ZXJGcmFtZSgyNzAsIDcyMCwgMTAwLCA3MCwgMTQwLCAxMDAsIDYwLCAxOCksIG5ldyBQbGF5ZXJGcmFtZSgyMCwgODA1LCAxMDAsIDcwLCAxNDAsIDEwMCwgNDAsIDE4KSAgLy80MCBzcGVjaWFsIGF0dGFjayBsZWZ0XG5dXG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllckZyYW1lIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhdyB9IGZyb20gXCIuL3NjcmlwdHMvYW5pbWF0b3JcIlxuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtY2FudmFzXCIpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxubGV0IGJhY2tncm91bmRJbWcgPSBuZXcgSW1hZ2U7XG5iYWNrZ3JvdW5kSW1nLnNyYyA9IFwic3JjL2ltYWdlcy9CYWNrZ3JvdW5kLnBuZ1wiXG5iYWNrZ3JvdW5kSW1nLm9ubG9hZCA9ICgpID0+IHtcblxufVxuXG5cblxuXG5cbmNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZHJhdywgMjAwKSJdLCJzb3VyY2VSb290IjoiIn0=