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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _frames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frames */ "./src/scripts/frames.js");


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
var player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);

var setIdle = function setIdle() {
  if (velocity_x === 0 && lastpressed == "right" && idle === false && !basicAttack && !specialAttack) {
    idle = true;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
  } else if (velocity_x === 0 && lastpressed == "left" && idle === false && !basicAttack && !specialAttack) {
    idle = true;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.idleLeft);
  }
};

var runningRight = function runningRight() {
  if (rightpressed && idle === true) {
    idle = false;
    velocity_x = 20;
    lastpressed = "right"; // rightpressed = false

    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
  } else if (rightpressed && idle == false && lastpressed == "left") {
    velocity_x = -20;
    lastpressed = "right"; // rightpressed = false

    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
  }
};

var jumping = function jumping() {
  if (uppressed) {
    idle = false; // uppressed = false

    player = lastpressed === "left" ? new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.jumpLeft) : new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.jumpRight);

    if (y <= canvas.height - 100) {
      setTimeout(function () {
        idle = true;
        player = lastpressed === "left" ? new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.idleLeft) : new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
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

    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
  } else if (leftpressed && idle == false && lastpressed == "right") {
    velocity_x = -25;
    lastpressed = "left"; // rightpressed = false

    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
  }
};

var basicAttacking = function basicAttacking() {
  if (basicAttack && idle == true && lastpressed == "left") {
    // basicAttack = false
    lastpressed = "left";
    console.log(idle);
    idle = false;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.basicAL);
  } else if (basicAttack && idle == true && lastpressed == "right") {
    // basicAttack = false
    lastpressed = "right";
    idle = false;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.basicAR);
  }
};

var specialAttacking = function specialAttacking() {
  if (specialAttack && idle == true && lastpressed == "left") {
    lastpressed = "left";
    console.log(idle);
    idle = false;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.specialAL);
    then = Date.now();
  } else if (specialAttack && idle == true && lastpressed == "right") {
    // basicAttack = false
    lastpressed = "right";
    idle = false;
    then = Date.now();
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.specialAR);
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

  var frame = _frames__WEBPACK_IMPORTED_MODULE_1__.frames[player.frameValue]; // starts animation

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
    var offsetX = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var offsetY = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

    _classCallCheck(this, Frame);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.canvasWidth = cWidth;
    this.canvasHeight = cHeight;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
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

  return Frame;
}();

var frames = [new Frame(0, 5, 60, 70, 80, 100), new Frame(62, 5, 60, 70, 80, 100), new Frame(125, 5, 60, 70, 80, 100), // 0 idle right
new Frame(189, 5, 60, 70, 80, 100), new Frame(250, 5, 60, 70, 80, 100), new Frame(312, 5, 60, 70, 80, 100), // 3 idle left
new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), //6 jump right
new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), //9 jump right
new Frame(100, 133, 55, 70, 80, 100), new Frame(164, 133, 55, 70, 80, 100), new Frame(225, 133, 55, 70, 80, 100), new Frame(285, 133, 55, 70, 80, 100), new Frame(335, 133, 55, 70, 80, 100), new Frame(0, 212, 55, 70, 80, 100), new Frame(62, 212, 55, 70, 80, 100), //12 runnning right
new Frame(115, 212, 55, 70, 80, 100), new Frame(170, 212, 55, 70, 80, 100), new Frame(225, 212, 55, 70, 80, 100), new Frame(277, 212, 55, 70, 80, 100), new Frame(325, 212, 55, 70, 80, 100), new Frame(4, 292, 55, 70, 80, 100), new Frame(75, 292, 55, 70, 80, 100), // 19 running left attackleft
new Frame(295, 292, 55, 70, 80, 100), new Frame(6, 380, 100, 70, 140, 100), new Frame(135, 384, 100, 70, 140, 100), new Frame(233, 382, 100, 70, 140, 100), //26 basic attack right
new Frame(2, 467, 76, 72, 96, 100), new Frame(98, 467, 120, 70, 160, 100), new Frame(199, 467, 100, 70, 140, 100), new Frame(297, 467, 100, 70, 140, 100), //30 basic attack left
new Frame(-33, 545, 100, 70, 140, 100, 50, 25), new Frame(60, 530, 76, 100, 100, 120, 10, 25), new Frame(140, 550, 100, 70, 140, 100, 10, 18), new Frame(240, 547, 100, 70, 140, 100, 10, 18), new Frame(-25, 630, 100, 70, 140, 100, 20, 18), new Frame(76, 637, 100, 70, 140, 100, 40, 18), //34 special attack right
new Frame(220, 633, 100, 70, 140, 100, 10, 25), new Frame(-9, 720, 100, 70, 140, 100, 10, 18), new Frame(90, 720, 100, 70, 140, 100, 10, 18), new Frame(170, 720, 100, 70, 140, 100, 45, 18), new Frame(270, 720, 100, 70, 140, 100, 60, 18), new Frame(20, 805, 100, 70, 140, 100, 40, 18) //40 special attack left
];

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
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

  return Player;
}();

/* harmony default export */ __webpack_exports__["default"] = (Player);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2ZyYW1lcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImFsbEZyYW1lU2V0cyIsInJpZ2h0IiwiaWRsZVJpZ2h0IiwianVtcFJpZ2h0IiwicnVuUmlnaHQiLCJiYXNpY0FSIiwic3BlY2lhbEFSIiwibGVmdCIsImlkbGVMZWZ0IiwianVtcExlZnQiLCJydW5MZWZ0IiwiYmFzaWNBTCIsInNwZWNpYWxBTCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwieCIsInkiLCJoZWlnaHQiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJpZ2h0cHJlc3NlZCIsImxlZnRwcmVzc2VkIiwibGFzdHByZXNzZWQiLCJ1cHByZXNzZWQiLCJpZGxlIiwiYmFzaWNBdHRhY2siLCJzcGVjaWFsQXR0YWNrIiwidGhlbiIsInNwZWNpYWxQb3MiLCJwbGF5ZXIiLCJQbGF5ZXIiLCJzZXRJZGxlIiwicnVubmluZ1JpZ2h0IiwianVtcGluZyIsInNldFRpbWVvdXQiLCJydW5uaW5nTGVmdCIsImJhc2ljQXR0YWNraW5nIiwiY29uc29sZSIsImxvZyIsInNwZWNpYWxBdHRhY2tpbmciLCJEYXRlIiwibm93IiwiZHJhdyIsImZyYW1lVmFsdWUiLCJiYWNrZ3JvdW5kSW1nIiwiSW1hZ2UiLCJzcmMiLCJwbGF5ZXJJbWciLCJmcmFtZSIsImZyYW1lcyIsInVwZGF0ZUFuaW1hdGlvbiIsIm9ubG9hZCIsImNsZWFyUmVjdCIsIndpZHRoIiwiZHJhd0ltYWdlIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsInRpbWUiLCJrZXlEb3duSGFuZGxlciIsImUiLCJrZXkiLCJrZXlVcEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiRnJhbWUiLCJjV2lkdGgiLCJjSGVpZ2h0IiwiZnJhbWVTZXQiLCJtb2RlIiwiY291bnQiLCJkZWxheSIsImZyYW1lSW5kZXgiLCJsZW5ndGgiLCJsb29wIiwicGxheSIsImFuaW1hdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLFlBQVksR0FBRztBQUNqQkMsT0FBSyxFQUFFO0FBQ0hDLGFBQVMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQURSO0FBRUhDLGFBQVMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZSO0FBR0hDLFlBQVEsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsQ0FIUDtBQUlIQyxXQUFPLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLENBSk47QUFLSEMsYUFBUyxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQjtBQUxSLEdBRFU7QUFRakJDLE1BQUksRUFBRTtBQUNGQyxZQUFRLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FEUjtBQUVGQyxZQUFRLEVBQUUsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsQ0FGUjtBQUdGQyxXQUFPLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLEVBQXlCLEVBQXpCLENBSFA7QUFJRkMsV0FBTyxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUpQO0FBS0ZDLGFBQVMsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckI7QUFMVDtBQVJXLENBQXJCO0FBa0JBLElBQU1DLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLENBQWY7QUFDQSxJQUFNQyxHQUFHLEdBQUdILE1BQU0sQ0FBQ0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBRUEsSUFBSUMsQ0FBQyxHQUFHLEVBQVI7QUFDQSxJQUFJQyxDQUFDLEdBQUdOLE1BQU0sQ0FBQ08sTUFBUCxHQUFnQixHQUF4QjtBQUNBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUVBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtBQUVBLElBQUlDLFdBQVcsR0FBRyxLQUFsQjtBQUVBLElBQUlDLFdBQVcsR0FBRyxPQUFsQjtBQUVBLElBQUlDLFNBQVMsR0FBRyxLQUFoQjtBQUVBLElBQUlDLElBQUksR0FBRyxJQUFYO0FBRUEsSUFBSUMsV0FBVyxHQUFHLEtBQWxCO0FBRUEsSUFBSUMsYUFBYSxHQUFHLEtBQXBCO0FBQ0EsSUFBSUMsSUFBSjtBQUNBLElBQUlDLFVBQUo7QUFHQSxJQUFJQyxNQUFNLEdBQUcsSUFBSUMsNENBQUosQ0FBV2pDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkMsU0FBOUIsQ0FBYjs7QUFHQSxJQUFNZ0MsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtBQUNsQixNQUFJYixVQUFVLEtBQUssQ0FBZixJQUFvQkksV0FBVyxJQUFJLE9BQW5DLElBQThDRSxJQUFJLEtBQUssS0FBdkQsSUFBZ0UsQ0FBQ0MsV0FBakUsSUFBZ0YsQ0FBQ0MsYUFBckYsRUFBc0c7QUFDbEdGLFFBQUksR0FBRyxJQUFQO0FBQ0FLLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXakMsWUFBWSxDQUFDQyxLQUFiLENBQW1CQyxTQUE5QixDQUFUO0FBQ0gsR0FIRCxNQUlLLElBQUltQixVQUFVLEtBQUssQ0FBZixJQUFvQkksV0FBVyxJQUFJLE1BQW5DLElBQTZDRSxJQUFJLEtBQUssS0FBdEQsSUFBK0QsQ0FBQ0MsV0FBaEUsSUFBK0UsQ0FBQ0MsYUFBcEYsRUFBb0c7QUFDckdGLFFBQUksR0FBRyxJQUFQO0FBQ0FLLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXakMsWUFBWSxDQUFDTyxJQUFiLENBQWtCQyxRQUE3QixDQUFUO0FBQ0g7QUFDSixDQVREOztBQVdBLElBQU0yQixZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBRXZCLE1BQUlaLFlBQVksSUFBSUksSUFBSSxLQUFLLElBQTdCLEVBQW1DO0FBQy9CQSxRQUFJLEdBQUcsS0FBUDtBQUNBTixjQUFVLEdBQUcsRUFBYjtBQUNBSSxlQUFXLEdBQUcsT0FBZCxDQUgrQixDQUkvQjs7QUFDQU8sVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVdqQyxZQUFZLENBQUNDLEtBQWIsQ0FBbUJHLFFBQTlCLENBQVQ7QUFFSCxHQVBELE1BUUssSUFBSW1CLFlBQVksSUFBSUksSUFBSSxJQUFJLEtBQXhCLElBQWlDRixXQUFXLElBQUksTUFBcEQsRUFBNEQ7QUFDN0RKLGNBQVUsR0FBRyxDQUFDLEVBQWQ7QUFDQUksZUFBVyxHQUFHLE9BQWQsQ0FGNkQsQ0FHN0Q7O0FBQ0FPLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXakMsWUFBWSxDQUFDQyxLQUFiLENBQW1CRyxRQUE5QixDQUFUO0FBQ0g7QUFDSixDQWhCRDs7QUFrQkEsSUFBTWdDLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07QUFDbEIsTUFBSVYsU0FBSixFQUFnQjtBQUNaQyxRQUFJLEdBQUcsS0FBUCxDQURZLENBRVo7O0FBQ0FLLFVBQU0sR0FBR1AsV0FBVyxLQUFLLE1BQWhCLEdBQXlCLElBQUlRLDRDQUFKLENBQVdqQyxZQUFZLENBQUNPLElBQWIsQ0FBa0JFLFFBQTdCLENBQXpCLEdBQWtFLElBQUl3Qiw0Q0FBSixDQUFXakMsWUFBWSxDQUFDQyxLQUFiLENBQW1CRSxTQUE5QixDQUEzRTs7QUFFQSxRQUFJZ0IsQ0FBQyxJQUFJTixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsR0FBekIsRUFBOEI7QUFDMUJpQixnQkFBVSxDQUFDLFlBQU07QUFDZFYsWUFBSSxHQUFHLElBQVA7QUFDSEssY0FBTSxHQUFHUCxXQUFXLEtBQUssTUFBaEIsR0FBeUIsSUFBSVEsNENBQUosQ0FBV2pDLFlBQVksQ0FBQ08sSUFBYixDQUFrQkMsUUFBN0IsQ0FBekIsR0FBa0UsSUFBSXlCLDRDQUFKLENBQVdqQyxZQUFZLENBQUNDLEtBQWIsQ0FBbUJDLFNBQTlCLENBQTNFO0FBRUMsT0FKUyxFQUtKLEdBTEksQ0FBVjtBQU9ILEtBYlcsQ0FlWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUg7QUFFSixDQTFCRDs7QUE4QkEsSUFBTW9DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLEdBQU07QUFDdEIsTUFBSWQsV0FBVyxJQUFJRyxJQUFJLElBQUksSUFBM0IsRUFBa0M7QUFDOUJBLFFBQUksR0FBRyxLQUFQO0FBQ0FOLGNBQVUsR0FBRyxDQUFDLEVBQWQ7QUFDQUksZUFBVyxHQUFHLE1BQWQsQ0FIOEIsQ0FJOUI7O0FBQ0FPLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXakMsWUFBWSxDQUFDTyxJQUFiLENBQWtCRyxPQUE3QixDQUFUO0FBQ0gsR0FORCxNQU9LLElBQUljLFdBQVcsSUFBSUcsSUFBSSxJQUFJLEtBQXZCLElBQWdDRixXQUFXLElBQUksT0FBbkQsRUFBNEQ7QUFDN0RKLGNBQVUsR0FBRyxDQUFDLEVBQWQ7QUFDQUksZUFBVyxHQUFHLE1BQWQsQ0FGNkQsQ0FHN0Q7O0FBQ0FPLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXakMsWUFBWSxDQUFDTyxJQUFiLENBQWtCRyxPQUE3QixDQUFUO0FBQ0g7QUFDSixDQWREOztBQWdCQSxJQUFNNkIsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFNO0FBRXpCLE1BQUlYLFdBQVcsSUFBSUQsSUFBSSxJQUFJLElBQXZCLElBQStCRixXQUFXLElBQUksTUFBbEQsRUFBMEQ7QUFDdEQ7QUFDQUEsZUFBVyxHQUFHLE1BQWQ7QUFDQWUsV0FBTyxDQUFDQyxHQUFSLENBQVlkLElBQVo7QUFDQUEsUUFBSSxHQUFHLEtBQVA7QUFDQUssVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVdqQyxZQUFZLENBQUNPLElBQWIsQ0FBa0JJLE9BQTdCLENBQVQ7QUFFSCxHQVBELE1BUUssSUFBSWlCLFdBQVcsSUFBSUQsSUFBSSxJQUFJLElBQXZCLElBQWdDRixXQUFXLElBQUksT0FBbkQsRUFBOEQ7QUFDL0Q7QUFDQUEsZUFBVyxHQUFHLE9BQWQ7QUFFQUUsUUFBSSxHQUFHLEtBQVA7QUFDQUssVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVdqQyxZQUFZLENBQUNDLEtBQWIsQ0FBbUJJLE9BQTlCLENBQVQ7QUFDSDtBQUdKLENBbkJEOztBQXFCQSxJQUFNcUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixHQUFNO0FBQzNCLE1BQUliLGFBQWEsSUFBSUYsSUFBSSxJQUFJLElBQXpCLElBQWlDRixXQUFXLElBQUksTUFBcEQsRUFBNEQ7QUFFeERBLGVBQVcsR0FBRyxNQUFkO0FBQ0FlLFdBQU8sQ0FBQ0MsR0FBUixDQUFZZCxJQUFaO0FBQ0FBLFFBQUksR0FBRyxLQUFQO0FBQ0FLLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXakMsWUFBWSxDQUFDTyxJQUFiLENBQWtCSyxTQUE3QixDQUFUO0FBQ0FrQixRQUFJLEdBQUdhLElBQUksQ0FBQ0MsR0FBTCxFQUFQO0FBRUgsR0FSRCxNQVNLLElBQUlmLGFBQWEsSUFBSUYsSUFBSSxJQUFJLElBQXpCLElBQWtDRixXQUFXLElBQUksT0FBckQsRUFBK0Q7QUFDaEU7QUFDQUEsZUFBVyxHQUFHLE9BQWQ7QUFDQUUsUUFBSSxHQUFHLEtBQVA7QUFDQUcsUUFBSSxHQUFHYSxJQUFJLENBQUNDLEdBQUwsRUFBUDtBQUNBWixVQUFNLEdBQUcsSUFBSUMsNENBQUosQ0FBV2pDLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkssU0FBOUIsQ0FBVDtBQUNIO0FBRUosQ0FsQkQ7O0FBb0JPLElBQU11QyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBRXRCWCxTQUFPLEdBRmUsQ0FJdEI7O0FBQ0FDLGNBQVk7QUFDWkssU0FBTyxDQUFDQyxHQUFSLENBQVloQixXQUFaLEVBTnNCLENBT3RCOztBQUNBVyxTQUFPLEdBUmUsQ0FVdEI7O0FBQ0FFLGFBQVc7QUFFWEMsZ0JBQWM7QUFFZEcsa0JBQWdCO0FBTWhCRixTQUFPLENBQUNDLEdBQVIsQ0FBWVQsTUFBTSxDQUFDYyxVQUFuQixFQXJCc0IsQ0FzQnRCOztBQUVBLE1BQUlDLGFBQWEsR0FBRyxJQUFJQyxLQUFKLEVBQXBCO0FBQ0FELGVBQWEsQ0FBQ0UsR0FBZCxHQUFvQiwyQkFBcEI7QUFDQSxNQUFJQyxTQUFTLEdBQUcsSUFBSUYsS0FBSixFQUFoQjtBQUVBRSxXQUFTLENBQUNELEdBQVYsR0FBZ0IsK0JBQWhCLENBNUJzQixDQTZCbEI7O0FBQ0osTUFBSUUsS0FBSyxHQUFHQywyQ0FBTSxDQUFDcEIsTUFBTSxDQUFDYyxVQUFSLENBQWxCLENBOUJzQixDQStCbEI7O0FBQ0pkLFFBQU0sQ0FBQ3FCLGVBQVAsR0FoQ3NCLENBa0N0Qjs7QUFDQUgsV0FBUyxDQUFDSSxNQUFWLEdBQW1CLFlBQU07QUFDckI7QUFDQXRDLE9BQUcsQ0FBQ3VDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CMUMsTUFBTSxDQUFDMkMsS0FBM0IsRUFBa0MzQyxNQUFNLENBQUNPLE1BQXpDO0FBQ0FKLE9BQUcsQ0FBQ3lDLFNBQUosQ0FBY1YsYUFBZCxFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQ2xDLE1BQU0sQ0FBQzJDLEtBQTFDLEVBQWlEM0MsTUFBTSxDQUFDTyxNQUF4RDtBQUNBSixPQUFHLENBQUN5QyxTQUFKLENBQWNQLFNBQWQsRUFBeUJDLEtBQUssQ0FBQ2pDLENBQS9CLEVBQWtDaUMsS0FBSyxDQUFDaEMsQ0FBeEMsRUFBMkNnQyxLQUFLLENBQUNLLEtBQWpELEVBQXdETCxLQUFLLENBQUMvQixNQUE5RCxFQUFzRUYsQ0FBQyxHQUFHaUMsS0FBSyxDQUFDTyxPQUFoRixFQUF5RnZDLENBQUMsR0FBR2dDLEtBQUssQ0FBQ1EsT0FBbkcsRUFBNEdSLEtBQUssQ0FBQ1MsV0FBbEgsRUFBK0hULEtBQUssQ0FBQ1UsWUFBckk7QUFLSCxHQVRELENBbkNzQixDQThDbEI7OztBQUNBMUMsR0FBQyxJQUFJLEVBQUwsQ0EvQ2tCLENBaURsQjs7QUFDSixNQUFJRCxDQUFDLEdBQUcsQ0FBSixHQUFRTCxNQUFNLENBQUMyQyxLQUFQLEdBQWUsRUFBM0IsRUFBZ0N0QyxDQUFDLEdBQUdMLE1BQU0sQ0FBQzJDLEtBQVAsR0FBZSxFQUFwQjtBQUUvQixNQUFJM0IsYUFBYSxJQUFJSixXQUFXLEtBQUssT0FBckMsRUFBZ0RQLENBQUMsSUFBSSxFQUFQO0FBQzlDLE1BQUlXLGFBQWEsSUFBSUosV0FBVyxLQUFLLE1BQXJDLEVBQStDUCxDQUFDLElBQUksRUFBUDtBQUU3QyxNQUFJQSxDQUFDLEdBQUcsQ0FBSixHQUFRLENBQVosRUFBZ0JBLENBQUMsR0FBRyxDQUFMO0FBRWYsTUFBSUMsQ0FBQyxHQUFHLENBQUosR0FBUU4sTUFBTSxDQUFDTyxNQUFQLEdBQWdCLEdBQTVCLEVBQWtDRCxDQUFDLEdBQUdOLE1BQU0sQ0FBQ08sTUFBUCxHQUFnQixHQUFwQixDQXpEWixDQTBEakI7QUFFRDs7QUFDSixNQUFJSSxXQUFXLElBQUlELFlBQW5CLEVBQWlDTCxDQUFDLElBQUlHLFVBQUwsQ0E3RFgsQ0E4RHRCOztBQUNBLE1BQUlLLFNBQVMsSUFBSVAsQ0FBQyxLQUFLTixNQUFNLENBQUNPLE1BQVAsR0FBYyxHQUFyQyxFQUEwQztBQUN0Q0QsS0FBQyxJQUFHLEVBQUo7QUFFSDs7QUFDRCxNQUFJMkMsSUFBSixDQW5Fc0IsQ0FvRXRCO0FBQ0E7QUFDQTtBQUNBOztBQUNBdEIsU0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUNBRCxTQUFPLENBQUNDLEdBQVIsQ0FBWVQsTUFBTSxDQUFDYyxVQUFuQixFQXpFc0IsQ0ErRWQ7QUFDWCxDQWhGTTs7QUFtRlAsSUFBTWlCLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsQ0FBRCxFQUFPO0FBRzFCLE1BQUlBLENBQUMsQ0FBQ0MsR0FBRixJQUFTLE9BQVQsSUFBb0JELENBQUMsQ0FBQ0MsR0FBRixJQUFTLFlBQWpDLEVBQStDO0FBQzNDMUMsZ0JBQVksR0FBRyxJQUFmO0FBRUgsR0FIRCxNQUlLLElBQUksQ0FBQ3lDLENBQUMsQ0FBQ0MsR0FBRixJQUFTLElBQVQsSUFBaUJELENBQUMsQ0FBQ0MsR0FBRixJQUFTLFNBQTNCLEtBQTBDdkMsU0FBUyxLQUFLLEtBQTVELEVBQW9FO0FBQ3JFQSxhQUFTLEdBQUcsSUFBWjtBQUVILEdBSEksTUFJQSxJQUFJc0MsQ0FBQyxDQUFDQyxHQUFGLElBQVMsTUFBVCxJQUFtQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsV0FBaEMsRUFBNkM7QUFDOUN6QyxlQUFXLEdBQUcsSUFBZDtBQUNILEdBRkksTUFJQSxJQUFJd0MsQ0FBQyxDQUFDQyxHQUFGLElBQVMsR0FBVCxJQUFnQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsTUFBN0IsRUFBcUM7QUFDdENyQyxlQUFXLEdBQUcsSUFBZDtBQUVILEdBSEksTUFLQSxJQUFJb0MsQ0FBQyxDQUFDQyxHQUFGLElBQVMsR0FBVCxJQUFnQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsTUFBN0IsRUFBcUM7QUFDdENwQyxpQkFBYSxHQUFHLElBQWhCO0FBRUg7QUFHSixDQTFCRDs7QUE0QkEsSUFBTXFDLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNGLENBQUQsRUFBTztBQUN4QixNQUFJQSxDQUFDLENBQUNDLEdBQUYsSUFBUyxPQUFULElBQW9CRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxZQUFqQyxFQUErQztBQUMzQzFDLGdCQUFZLEdBQUcsS0FBZjtBQUNBRixjQUFVLEdBQUcsQ0FBYjtBQUVILEdBSkQsTUFLSyxJQUFJMkMsQ0FBQyxDQUFDQyxHQUFGLElBQVMsSUFBVCxJQUFpQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsU0FBOUIsRUFBeUM7QUFDMUN2QyxhQUFTLEdBQUcsS0FBWjtBQUNILEdBRkksTUFJQSxJQUFJc0MsQ0FBQyxDQUFDQyxHQUFGLElBQVMsTUFBVCxJQUFtQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsV0FBaEMsRUFBNkM7QUFDOUM1QyxjQUFVLEdBQUcsQ0FBYjtBQUNBRyxlQUFXLEdBQUcsS0FBZDtBQUNILEdBSEksTUFJQSxJQUFJd0MsQ0FBQyxDQUFDQyxHQUFGLElBQVMsR0FBVCxJQUFnQkQsQ0FBQyxDQUFDQyxHQUFGLEtBQVUsTUFBOUIsRUFBc0M7QUFDdkNyQyxlQUFXLEdBQUcsS0FBZCxDQUR1QyxDQUUzQztBQUNBO0FBQ0MsR0FKSSxNQU1BLElBQUlvQyxDQUFDLENBQUNDLEdBQUYsSUFBUyxHQUFULElBQWdCRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUE3QixFQUFxQztBQUN0Q3BDLGlCQUFhLEdBQUcsS0FBaEI7QUFFSDtBQUVKLENBekJEOztBQTJCQWYsUUFBUSxDQUFDcUQsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNKLGNBQXJDLEVBQXFELEtBQXJEO0FBQ0FqRCxRQUFRLENBQUNxRCxnQkFBVCxDQUEwQixPQUExQixFQUFtQ0QsWUFBbkMsRUFBaUQsS0FBakQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUMvU1VFLEs7QUFDRixpQkFBWWxELENBQVosRUFBZUMsQ0FBZixFQUFrQnFDLEtBQWxCLEVBQXlCcEMsTUFBekIsRUFBaUNpRCxNQUFqQyxFQUF5Q0MsT0FBekMsRUFBNEU7QUFBQSxRQUExQlosT0FBMEIsdUVBQWhCLENBQWdCO0FBQUEsUUFBYkMsT0FBYSx1RUFBSCxDQUFHOztBQUFBOztBQUN4RSxTQUFLekMsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS29DLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtJLFdBQUwsR0FBbUJTLE1BQW5CO0FBQ0EsU0FBS1IsWUFBTCxHQUFvQlMsT0FBcEI7QUFDQSxTQUFLWixPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFFSDs7OztXQUVELGFBQUk7QUFDQSxhQUFPLEtBQUt6QyxDQUFaO0FBQ0g7OztXQUNELGFBQUk7QUFDRCxhQUFPLEtBQUtDLENBQVo7QUFDRjs7O1dBRUQsa0JBQVM7QUFDTixhQUFPLEtBQUtDLE1BQVo7QUFDRjs7O1dBQ0QsaUJBQU87QUFDSixhQUFPLEtBQUtvQyxLQUFaO0FBQ0Y7OztXQUVELHVCQUFjO0FBQ1YsYUFBTyxLQUFLSSxXQUFaO0FBQ0g7OztXQUNELHdCQUFlO0FBQ1gsYUFBTyxLQUFLQyxZQUFaO0FBQ0g7OztXQUVELG1CQUFVO0FBQ04sYUFBTyxLQUFLSCxPQUFaO0FBQ0g7OztXQUNELG1CQUFVO0FBQ04sYUFBTyxLQUFLQyxPQUFaO0FBQ0g7Ozs7OztBQUlGLElBQU1QLE1BQU0sR0FBRyxDQUNsQixJQUFJZ0IsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEdBQTVCLENBRGtCLEVBQ2dCLElBQUlBLEtBQUosQ0FBVSxFQUFWLEVBQWMsQ0FBZCxFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixDQURoQixFQUNtRCxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FEbkQsRUFDd0Y7QUFDMUcsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEdBQTlCLENBRmtCLEVBRWtCLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixFQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixHQUE5QixDQUZsQixFQUVxRCxJQUFJQSxLQUFKLENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQixFQUFuQixFQUF1QixFQUF2QixFQUEyQixFQUEzQixFQUErQixHQUEvQixDQUZyRCxFQUUwRjtBQUM1RyxJQUFJQSxLQUFKLENBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FIa0IsRUFHa0IsSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEdBQTlCLENBSGxCLEVBR3NELElBQUlBLEtBQUosQ0FBVSxFQUFWLEVBQWMsRUFBZCxFQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixHQUE5QixDQUh0RCxFQUcwRjtBQUM1RyxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEVBQWYsRUFBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsRUFBK0IsR0FBL0IsQ0FKa0IsRUFJbUIsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxFQUFmLEVBQW1CLEVBQW5CLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLEVBQStCLEdBQS9CLENBSm5CLEVBSXdELElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsRUFBZixFQUFtQixFQUFuQixFQUF1QixFQUF2QixFQUEyQixFQUEzQixFQUErQixHQUEvQixDQUp4RCxFQUk2RjtBQUMvRyxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FMa0IsRUFLb0IsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTHBCLEVBSzBELElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQUwxRCxFQUtnRyxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FMaEcsRUFLc0ksSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTHRJLEVBSzRLLElBQUlBLEtBQUosQ0FBVSxDQUFWLEVBQWEsR0FBYixFQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixHQUE5QixDQUw1SyxFQUtnTixJQUFJQSxLQUFKLENBQVUsRUFBVixFQUFjLEdBQWQsRUFBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsRUFBK0IsR0FBL0IsQ0FMaE4sRUFLcVA7QUFDdlEsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTmtCLEVBTW9CLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQU5wQixFQU0wRCxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FOMUQsRUFNZ0csSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTmhHLEVBTXNJLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQU50SSxFQU00SyxJQUFJQSxLQUFKLENBQVUsQ0FBVixFQUFhLEdBQWIsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FONUssRUFNZ04sSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxHQUFkLEVBQW1CLEVBQW5CLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLEVBQStCLEdBQS9CLENBTmhOLEVBTXFQO0FBQ3ZRLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQVBrQixFQU9vQixJQUFJQSxLQUFKLENBQVUsQ0FBVixFQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUIsRUFBdkIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FQcEIsRUFPMEQsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLEVBQXpCLEVBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBUDFELEVBT2tHLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQVBsRyxFQU80STtBQUM5SixJQUFJQSxLQUFKLENBQVUsQ0FBVixFQUFhLEdBQWIsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FSa0IsRUFRa0IsSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxHQUFkLEVBQW1CLEdBQW5CLEVBQXdCLEVBQXhCLEVBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLENBUmxCLEVBUXlELElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQVJ6RCxFQVFpRyxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FSakcsRUFRMkk7QUFDN0osSUFBSUEsS0FBSixDQUFVLENBQUMsRUFBWCxFQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsQ0FUa0IsRUFTOEIsSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxHQUFkLEVBQW1CLEVBQW5CLEVBQXVCLEdBQXZCLEVBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLEVBQXNDLEVBQXRDLEVBQTBDLEVBQTFDLENBVDlCLEVBUzhFLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixFQUFrQyxHQUFsQyxFQUF1QyxFQUF2QyxFQUEyQyxFQUEzQyxDQVQ5RSxFQVM4SCxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsQ0FUOUgsRUFTOEssSUFBSUEsS0FBSixDQUFVLENBQUMsRUFBWCxFQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsQ0FUOUssRUFTOE4sSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxHQUFkLEVBQW1CLEdBQW5CLEVBQXdCLEVBQXhCLEVBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLEVBQXNDLEVBQXRDLEVBQTBDLEVBQTFDLENBVDlOLEVBUzhRO0FBQ2hTLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixFQUFrQyxHQUFsQyxFQUF1QyxFQUF2QyxFQUEyQyxFQUEzQyxDQVZrQixFQVU4QixJQUFJQSxLQUFKLENBQVUsQ0FBQyxDQUFYLEVBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixFQUF4QixFQUE0QixHQUE1QixFQUFpQyxHQUFqQyxFQUFzQyxFQUF0QyxFQUEwQyxFQUExQyxDQVY5QixFQVU2RSxJQUFJQSxLQUFKLENBQVUsRUFBVixFQUFjLEdBQWQsRUFBbUIsR0FBbkIsRUFBd0IsRUFBeEIsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsRUFBc0MsRUFBdEMsRUFBMEMsRUFBMUMsQ0FWN0UsRUFVNEgsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLEVBQXpCLEVBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLEVBQXVDLEVBQXZDLEVBQTJDLEVBQTNDLENBVjVILEVBVTRLLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixFQUFrQyxHQUFsQyxFQUF1QyxFQUF2QyxFQUEyQyxFQUEzQyxDQVY1SyxFQVU0TixJQUFJQSxLQUFKLENBQVUsRUFBVixFQUFjLEdBQWQsRUFBbUIsR0FBbkIsRUFBd0IsRUFBeEIsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsRUFBc0MsRUFBdEMsRUFBMEMsRUFBMUMsQ0FWNU4sQ0FVMlE7QUFWM1EsQ0FBZixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q1A7O0lBS01uQyxNO0FBQ0Ysa0JBQVlzQyxRQUFaLEVBQXFDO0FBQUEsUUFBZkMsSUFBZSx1RUFBUixNQUFROztBQUFBOztBQUM3QixTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtKLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS3pCLFVBQUwsR0FBa0J5QixRQUFRLENBQUMsQ0FBRCxDQUExQjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUVQOzs7O1dBRUQsc0JBQWE7QUFDVCxhQUFPLEtBQUsxQixVQUFaO0FBQ0g7OztXQUVELDBCQUFpQjtBQUNiLGFBQU8sS0FBS3lCLFFBQUwsQ0FBY0ssTUFBckI7QUFDSDs7O1dBRUQsbUJBQVU7QUFDTixjQUFRLEtBQUtKLElBQWI7QUFDSSxhQUFLLE1BQUw7QUFDSSxlQUFLSyxJQUFMO0FBQ0E7O0FBQ0osYUFBSyxNQUFMO0FBQ0ksZUFBS0MsSUFBTDtBQUNBOztBQUNKLGFBQUssT0FBTDtBQUNJO0FBUlI7QUFXSDs7O1dBR0QsZ0JBQU87QUFDSCxXQUFLTCxLQUFMO0FBRUFqQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLOEIsUUFBakI7QUFDQS9CLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtnQyxLQUFqQjtBQUVBLFdBQUtFLFVBQUwsR0FBbUIsS0FBS0YsS0FBTCxHQUFhLEtBQUtGLFFBQUwsQ0FBY0ssTUFBZCxHQUF1QixDQUFyQyxHQUEwQyxLQUFLSCxLQUFMLEdBQWEsQ0FBdkQsR0FBMkQsS0FBS0UsVUFBTCxHQUFrQixDQUEvRjtBQUVBLFdBQUs3QixVQUFMLEdBQWtCLEtBQUt5QixRQUFMLENBQWMsS0FBS0ksVUFBbkIsQ0FBbEI7QUFJSDs7O1dBRUQsaUJBQVE7QUFDSixhQUFPLEtBQUtGLEtBQVo7QUFDSDs7O1dBRUQsMkJBQWtCO0FBQ2QsV0FBS00sT0FBTDtBQUNIOzs7Ozs7QUFTTCwrREFBZTlDLE1BQWYsRTs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU1wQixNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUVBLElBQUk4QixhQUFhLEdBQUcsSUFBSUMsS0FBSixFQUFwQjtBQUNBRCxhQUFhLENBQUNFLEdBQWQsR0FBb0IsMkJBQXBCOztBQUNBRixhQUFhLENBQUNPLE1BQWQsR0FBdUIsWUFBTSxDQUk1QixDQUpEOztBQVVBLElBQU0wQixRQUFRLEdBQUdDLFdBQVcsQ0FBQ3BDLG1EQUFELEVBQU8sR0FBUCxDQUE1QixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgeyBmcmFtZXMgfSBmcm9tIFwiLi9mcmFtZXNcIlxuXG5jb25zdCBhbGxGcmFtZVNldHMgPSB7XG4gICAgcmlnaHQ6IHtcbiAgICAgICAgaWRsZVJpZ2h0OiBbMCwgMSwgMl0sXG4gICAgICAgIGp1bXBSaWdodDogWzYsIDcsIDhdLFxuICAgICAgICBydW5SaWdodDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4XSxcbiAgICAgICAgYmFzaWNBUjogWzI2LCAyNywgMjgsIDI5XSxcbiAgICAgICAgc3BlY2lhbEFSOiBbMzQsIDM1LCAzNiwgMzcsIDM4LCAzOV1cbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgICAgaWRsZUxlZnQ6IFszLCA0LCA1XSxcbiAgICAgICAganVtcExlZnQ6IFs5LCAxMCwgMTFdLFxuICAgICAgICBydW5MZWZ0OiBbMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjVdLFxuICAgICAgICBiYXNpY0FMOiBbMzAsIDMxLCAzMiwgMzNdLFxuICAgICAgICBzcGVjaWFsQUw6IFs0MCwgNDEsIDQyLCA0MywgNDQsIDQ1XVxuICAgIH0sXG59XG5cblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLWNhbnZhc1wiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbmxldCB4ID0gNTA7XG5sZXQgeSA9IGNhbnZhcy5oZWlnaHQgLSAxMDA7XG5sZXQgdmVsb2NpdHlfeCA9IDA7XG5sZXQgdmVsb2NpdHlfeSA9IDA7XG5cbmxldCByaWdodHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGxlZnRwcmVzc2VkID0gZmFsc2U7XG5cbmxldCBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIjtcblxubGV0IHVwcHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgaWRsZSA9IHRydWU7XG5cbmxldCBiYXNpY0F0dGFjayA9IGZhbHNlO1xuXG5sZXQgc3BlY2lhbEF0dGFjayA9IGZhbHNlO1xubGV0IHRoZW47XG5sZXQgc3BlY2lhbFBvcztcblxuXG5sZXQgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuXG5cbmNvbnN0IHNldElkbGUgPSAoKSA9PiB7XG4gICAgaWYgKHZlbG9jaXR5X3ggPT09IDAgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiICYmIGlkbGUgPT09IGZhbHNlICYmICFiYXNpY0F0dGFjayAmJiAhc3BlY2lhbEF0dGFjayApICB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIiAmJiBpZGxlID09PSBmYWxzZSAmJiAhYmFzaWNBdHRhY2sgJiYgIXNwZWNpYWxBdHRhY2sgKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgfVxufVxuXG5jb25zdCBydW5uaW5nUmlnaHQgPSAoKSA9PiB7XG4gICBcbiAgICBpZiAocmlnaHRwcmVzc2VkICYmIGlkbGUgPT09IHRydWUpIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAyMFxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICAgICAgXG4gICAgfSBcbiAgICBlbHNlIGlmIChyaWdodHByZXNzZWQgJiYgaWRsZSA9PSBmYWxzZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gLTIwXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJyaWdodFwiXG4gICAgICAgIC8vIHJpZ2h0cHJlc3NlZCA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgIH1cbn1cblxuY29uc3QganVtcGluZyA9ICgpID0+IHtcbiAgICBpZiAodXBwcmVzc2VkICkge1xuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgLy8gdXBwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5qdW1wTGVmdCkgOiBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5qdW1wUmlnaHQpXG5cbiAgICAgICAgaWYgKHkgPD0gY2FudmFzLmhlaWdodCAtIDEwMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICBpZGxlID0gdHJ1ZVxuICAgICAgICAgICAgcGxheWVyID0gbGFzdHByZXNzZWQgPT09IFwibGVmdFwiID8gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5pZGxlTGVmdCkgOiBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsIDEwMClcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWxzZSBpZiAobGFzdHByZXNzZWQgPT09IFwibGVmdFwiKSB7XG4gICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgICAgICwgMTAwKVxuXG4gICAgICAgIC8vIH1cblxuICAgIH1cblxufVxuXG5cblxuY29uc3QgcnVubmluZ0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT0gdHJ1ZSApIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjVcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgfSBcbiAgICBlbHNlIGlmIChsZWZ0cHJlc3NlZCAmJiBpZGxlID09IGZhbHNlICYmIGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gLTI1XG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5ydW5MZWZ0KVxuICAgIH1cbn1cblxuY29uc3QgYmFzaWNBdHRhY2tpbmcgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgIGlmIChiYXNpY0F0dGFjayAmJiBpZGxlID09IHRydWUgJiYgbGFzdHByZXNzZWQgPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgLy8gYmFzaWNBdHRhY2sgPSBmYWxzZVxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwibGVmdFwiXG4gICAgICAgIGNvbnNvbGUubG9nKGlkbGUpXG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmJhc2ljQUwpXG5cbiAgICB9IFxuICAgIGVsc2UgaWYgKGJhc2ljQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiAobGFzdHByZXNzZWQgPT0gXCJyaWdodFwiKSApIHtcbiAgICAgICAgLy8gYmFzaWNBdHRhY2sgPSBmYWxzZVxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIlxuXG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5iYXNpY0FSKVxuICAgIH1cblxuICAgIFxufVxuXG5jb25zdCBzcGVjaWFsQXR0YWNraW5nID0gKCkgPT4ge1xuICAgIGlmIChzcGVjaWFsQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICAgXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgY29uc29sZS5sb2coaWRsZSlcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuc3BlY2lhbEFMKVxuICAgICAgICB0aGVuID0gRGF0ZS5ub3coKVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoc3BlY2lhbEF0dGFjayAmJiBpZGxlID09IHRydWUgJiYgKGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikpIHtcbiAgICAgICAgLy8gYmFzaWNBdHRhY2sgPSBmYWxzZVxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIlxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgdGhlbiA9IERhdGUubm93KClcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuc3BlY2lhbEFSKVxuICAgIH1cblxufVxuXG5leHBvcnQgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICBcbiAgICBzZXRJZGxlKClcblxuICAgIC8vcnVubmluZyBhbmQgbG9va2luZyByaWdodFxuICAgIHJ1bm5pbmdSaWdodCgpXG4gICAgY29uc29sZS5sb2cobGFzdHByZXNzZWQpXG4gICAgLy8ganVtcGluZyBcbiAgICBqdW1waW5nKClcbiAgXG4gICAgLy9ydW5uaW5nIGFuZCBsb29raW5nIGxlZnRcbiAgICBydW5uaW5nTGVmdCgpXG5cbiAgICBiYXNpY0F0dGFja2luZygpXG5cbiAgICBzcGVjaWFsQXR0YWNraW5nKClcblxuICAgXG4gICAgXG4gICAgXG4gXG4gICAgY29uc29sZS5sb2cocGxheWVyLmZyYW1lVmFsdWUpXG4gICAgLy8gZHJhd2luZyB0aGUgcGxheWVyIFxuXG4gICAgbGV0IGJhY2tncm91bmRJbWcgPSBuZXcgSW1hZ2U7XG4gICAgYmFja2dyb3VuZEltZy5zcmMgPSBcInNyYy9pbWFnZXMvQmFja2dyb3VuZC5wbmdcIlxuICAgIGxldCBwbGF5ZXJJbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIHBsYXllckltZy5zcmMgPSBcInNyYy9pbWFnZXMvdGFuamlyb19zcHJpdGUucG5nXCI7XG4gICAgICAgIC8vIHBpY2tzIHRoZSBjb3JyZWN0IG51bWJlciBvZiBmcmFtZXNcbiAgICBsZXQgZnJhbWUgPSBmcmFtZXNbcGxheWVyLmZyYW1lVmFsdWVdXG4gICAgICAgIC8vIHN0YXJ0cyBhbmltYXRpb25cbiAgICBwbGF5ZXIudXBkYXRlQW5pbWF0aW9uKClcbiAgICBcbiAgICAvLyBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBzcGVjaWFsUG9zID0gKHggLSBmcmFtZS5vZmZzZXRYICsgNTApIDogc3BlY2lhbFBvcyA9ICh4IC0gZnJhbWUub2Zmc2V0WCAtIDUwKSBcbiAgICBwbGF5ZXJJbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAvLyBwbGF5ZXIudXBkYXRlQW5pbWF0aW9uXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgICBjdHguZHJhd0ltYWdlKGJhY2tncm91bmRJbWcsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcbiAgICAgICAgY3R4LmRyYXdJbWFnZShwbGF5ZXJJbWcsIGZyYW1lLngsIGZyYW1lLnksIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQsIHggLSBmcmFtZS5vZmZzZXRYLCB5IC0gZnJhbWUub2Zmc2V0WSwgZnJhbWUuY2FudmFzV2lkdGgsIGZyYW1lLmNhbnZhc0hlaWdodClcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgICAgICAvLyBncmF2aXR5XG4gICAgICAgIHkgKz0gMjUgXG4gICAgICAgIFxuICAgICAgICAvLyBjb2xsaXNpb24gY29udHJvbFxuICAgIGlmICh4ICsgMiA+IGNhbnZhcy53aWR0aCAtIDgwKSAoeCA9IGNhbnZhcy53aWR0aCAtIDgwKVxuXG4gICAgaWYgKHNwZWNpYWxBdHRhY2sgJiYgbGFzdHByZXNzZWQgPT09IFwicmlnaHRcIikgKCB4ICs9IDUwKVxuICAgIGlmIChzcGVjaWFsQXR0YWNrICYmIGxhc3RwcmVzc2VkID09PSBcImxlZnRcIikgKCB4IC09IDUwKVxuXG4gICAgaWYgKHggLSAyIDwgMCkgKHggPSAwKVxuXG4gICAgaWYgKHkgKyA4ID4gY2FudmFzLmhlaWdodCAtIDEyMCApIHkgPSBjYW52YXMuaGVpZ2h0IC0gMTIwXG4gICAgICAgICAvLyBjb2xsaXNpb24gY29udHJvbFxuXG4gICAgICAgIC8vICBtb3ZpbmcgcmlnaHQgYW5kIGxlZnRcbiAgICBpZiAobGVmdHByZXNzZWQgfHwgcmlnaHRwcmVzc2VkKSB4ICs9IHZlbG9jaXR5X3hcbiAgICAvLyBpZiAocmlnaHRwcmVzc2VkICYmIGxlZnRwcmVzc2VkID09PSBmYWxzZSkgeCArPSB2ZWxvY2l0eV94XG4gICAgaWYgKHVwcHJlc3NlZCAmJiB5ID09PSBjYW52YXMuaGVpZ2h0LTEyMCkge1xuICAgICAgICB5IC09ODBcblxuICAgIH1cbiAgICBsZXQgdGltZTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcGVjaWFsUG9zKVxuICAgIC8vIGNvbnNvbGUubG9nKHNwZWNpYWxDb3VudClcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIuZnJhbWVTZXRsZW5ndGgoKSlcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIuY291bnQpXG4gICAgY29uc29sZS5sb2coXCJmcmFtZXZhbHVlXCIpXG4gICAgY29uc29sZS5sb2cocGxheWVyLmZyYW1lVmFsdWUpXG4gIFxuXG5cblxuICAgICAgIFxuICAgICAgICAgICAgLy8gIG1vdmluZyByaWdodCBhbmQgbGVmdFxufVxuXG5cbmNvbnN0IGtleURvd25IYW5kbGVyID0gKGUpID0+IHtcbiAgICBcbiAgICBcbiAgICBpZiAoZS5rZXkgPT0gXCJSaWdodFwiIHx8IGUua2V5ID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgIHJpZ2h0cHJlc3NlZCA9IHRydWVcbiAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoKGUua2V5ID09IFwiVXBcIiB8fCBlLmtleSA9PSBcIkFycm93VXBcIikgJiYgKHVwcHJlc3NlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwcHJlc3NlZCA9IHRydWVcblxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIGxlZnRwcmVzc2VkID0gdHJ1ZVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiYVwiIHx8IGUua2V5ID09IFwiS2V5QVwiKSB7XG4gICAgICAgIGJhc2ljQXR0YWNrID0gdHJ1ZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcInNcIiB8fCBlLmtleSA9PSBcIktleVNcIikge1xuICAgICAgICBzcGVjaWFsQXR0YWNrID0gdHJ1ZVxuXG4gICAgfVxuXG4gICAgXG59XG5cbmNvbnN0IGtleVVwSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMFxuICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIlVwXCIgfHwgZS5rZXkgPT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgdXBwcmVzc2VkID0gZmFsc2VcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAwXG4gICAgICAgIGxlZnRwcmVzc2VkID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJhXCIgfHwgZS5rZXkgPT09IFwiS2V5QVwiKSB7XG4gICAgICAgIGJhc2ljQXR0YWNrID0gZmFsc2VcbiAgICAvLyAgICBsZXQgZmFjaW5nID0gbGFzdHByZXNzZWQgPT0gXCJsZWZ0XCIgPyBcImxlZnRcIiA6IFwicmlnaHRcIlxuICAgIC8vICAgIHNldFRpbWVvdXQoKCkgPT4gbGFzdHByZXNzZWQgPSBmYWNpbmcsIDEwMClcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcInNcIiB8fCBlLmtleSA9PSBcIktleVNcIikge1xuICAgICAgICBzcGVjaWFsQXR0YWNrID0gZmFsc2VcblxuICAgIH1cbiAgICBcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGZhbHNlKTsiLCJcbiAgICBjbGFzcyBGcmFtZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNXaWR0aCwgY0hlaWdodCwgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4IFxuICAgICAgICAgICAgdGhpcy55ID0geSBcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgICAgIHRoaXMuY2FudmFzV2lkdGggPSBjV2lkdGhcbiAgICAgICAgICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gY0hlaWdodFxuICAgICAgICAgICAgdGhpcy5vZmZzZXRYID0gb2Zmc2V0WFxuICAgICAgICAgICAgdGhpcy5vZmZzZXRZID0gb2Zmc2V0WVxuICAgXG4gICAgICAgIH1cblxuICAgICAgICB4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueFxuICAgICAgICB9XG4gICAgICAgIHkoKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnlcbiAgICAgICAgfVxuXG4gICAgICAgIGhlaWdodCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0XG4gICAgICAgIH0gXG4gICAgICAgIHdpZHRoKCl7XG4gICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBjYW52YXNXaWR0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhc1dpZHRoXG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzSGVpZ2h0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzSGVpZ2h0XG4gICAgICAgIH1cblxuICAgICAgICBvZmZzZXRYKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0WFxuICAgICAgICB9XG4gICAgICAgIG9mZnNldFkoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXRZXG4gICAgICAgIH1cblxuICAgIH1cblxuZXhwb3J0IGNvbnN0IGZyYW1lcyA9IFtcbiAgICBuZXcgRnJhbWUoMCwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDYyLCA1LCA2MCwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMTI1LCA1LCA2MCwgNzAsIDgwLCAxMDApLCAgLy8gMCBpZGxlIHJpZ2h0XG4gICAgbmV3IEZyYW1lKDE4OSwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDI1MCwgNSwgNjAsIDcwLCA4MCwgMTAwKSxuZXcgRnJhbWUoIDMxMiwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgLy8gMyBpZGxlIGxlZnRcbiAgICBuZXcgRnJhbWUoNDAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNDAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNDAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCAvLzYganVtcCByaWdodFxuICAgIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDI4MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIC8vOSBqdW1wIHJpZ2h0XG4gICAgbmV3IEZyYW1lKDEwMCwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMTY0LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyMjUsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDI4NSwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMzM1LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgwLCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg2MiwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCAvLzEyIHJ1bm5uaW5nIHJpZ2h0XG4gICAgbmV3IEZyYW1lKDExNSwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMTcwLCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyMjUsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDI3NywgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMzI1LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg0LCAyOTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg3NSwgMjkyLCA1NSwgNzAsIDgwLCAxMDApLCAvLyAxOSBydW5uaW5nIGxlZnQgYXR0YWNrbGVmdFxuICAgIG5ldyBGcmFtZSgyOTUsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDYsIDM4MCwgMTAwLCA3MCwgMTQwLCAxMDApLCBuZXcgRnJhbWUoMTM1LCAzODQsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IEZyYW1lKDIzMywgMzgyLCAxMDAsIDcwLCAxNDAsIDEwMCksICAgLy8yNiBiYXNpYyBhdHRhY2sgcmlnaHRcbiAgICBuZXcgRnJhbWUoMiwgNDY3LCA3NiwgNzIsIDk2LCAxMDApLCBuZXcgRnJhbWUoOTgsIDQ2NywgMTIwLCA3MCwgMTYwLCAxMDApLCBuZXcgRnJhbWUoMTk5LCA0NjcsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IEZyYW1lKDI5NywgNDY3LCAxMDAsIDcwLCAxNDAsIDEwMCksICAgLy8zMCBiYXNpYyBhdHRhY2sgbGVmdFxuICAgIG5ldyBGcmFtZSgtMzMsIDU0NSwgMTAwLCA3MCwgMTQwLCAxMDAsIDUwLCAyNSksIG5ldyBGcmFtZSg2MCwgNTMwLCA3NiwgMTAwLCAxMDAsIDEyMCwgMTAsIDI1KSwgIG5ldyBGcmFtZSgxNDAsIDU1MCwgMTAwLCA3MCwgMTQwLCAxMDAsIDEwLCAxOCksIG5ldyBGcmFtZSgyNDAsIDU0NywgMTAwLCA3MCwgMTQwLCAxMDAsIDEwLCAxOCksIG5ldyBGcmFtZSgtMjUsIDYzMCwgMTAwLCA3MCwgMTQwLCAxMDAsIDIwLCAxOCksIG5ldyBGcmFtZSg3NiwgNjM3LCAxMDAsIDcwLCAxNDAsIDEwMCwgNDAsIDE4KSwgIC8vMzQgc3BlY2lhbCBhdHRhY2sgcmlnaHRcbiAgICBuZXcgRnJhbWUoMjIwLCA2MzMsIDEwMCwgNzAsIDE0MCwgMTAwLCAxMCwgMjUpLCBuZXcgRnJhbWUoLTksIDcyMCwgMTAwLCA3MCwgMTQwLCAxMDAsIDEwLCAxOCksIG5ldyBGcmFtZSg5MCwgNzIwLCAxMDAsIDcwLCAxNDAsIDEwMCwgMTAsIDE4KSwgbmV3IEZyYW1lKDE3MCwgNzIwLCAxMDAsIDcwLCAxNDAsIDEwMCwgNDUsIDE4KSwgbmV3IEZyYW1lKDI3MCwgNzIwLCAxMDAsIDcwLCAxNDAsIDEwMCwgNjAsIDE4KSwgbmV3IEZyYW1lKDIwLCA4MDUsIDEwMCwgNzAsIDE0MCwgMTAwLCA0MCwgMTgpICAvLzQwIHNwZWNpYWwgYXR0YWNrIGxlZnRcbl1cbiIsImltcG9ydCB7IGZyYW1lcyB9IGZyb20gXCIuL2ZyYW1lc1wiXG5cblxuXG5cbmNsYXNzIFBsYXllciB7IFxuICAgIGNvbnN0cnVjdG9yKGZyYW1lU2V0LCBtb2RlID0gXCJsb29wXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAwXG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gMVxuICAgICAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gMFxuICAgICAgICAgICAgdGhpcy5mcmFtZVNldCA9IGZyYW1lU2V0XG4gICAgICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSBmcmFtZVNldFswXVxuICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmcmFtZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZVZhbHVlXG4gICAgfVxuXG4gICAgZnJhbWVTZXRsZW5ndGggKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lU2V0Lmxlbmd0aFxuICAgIH1cblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9vcFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubG9vcCgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxheVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpXG4gICAgICAgICAgICAgICAgXCJicmVha1wiXG4gICAgICAgICAgICBjYXNlIFwicGF1c2VcIjpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBsb29wKCkge1xuICAgICAgICB0aGlzLmNvdW50KytcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZyYW1lU2V0KVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvdW50KVxuXG4gICAgICAgIHRoaXMuZnJhbWVJbmRleCA9ICh0aGlzLmNvdW50ID4gdGhpcy5mcmFtZVNldC5sZW5ndGggLSAxKSA/IHRoaXMuY291bnQgPSAwIDogdGhpcy5mcmFtZUluZGV4ICsgMVxuXG4gICAgICAgIHRoaXMuZnJhbWVWYWx1ZSA9IHRoaXMuZnJhbWVTZXRbdGhpcy5mcmFtZUluZGV4XVxuXG4gICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3VudFxuICAgIH1cblxuICAgIHVwZGF0ZUFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlKClcbiAgICB9XG5cblxufVxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkcmF3IH0gZnJvbSBcIi4vc2NyaXB0cy9hbmltYXRvclwiXG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5sZXQgYmFja2dyb3VuZEltZyA9IG5ldyBJbWFnZTtcbmJhY2tncm91bmRJbWcuc3JjID0gXCJzcmMvaW1hZ2VzL0JhY2tncm91bmQucG5nXCJcbmJhY2tncm91bmRJbWcub25sb2FkID0gKCkgPT4ge1xuICAgXG5cblxufVxuXG5cblxuXG5cbmNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZHJhdywgMjAwKSJdLCJzb3VyY2VSb290IjoiIn0=