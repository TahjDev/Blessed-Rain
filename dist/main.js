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
    basicAR: [26, 27, 28, 29]
  },
  left: {
    idleLeft: [3, 4, 5],
    jumpLeft: [9, 10, 11],
    runLeft: [19, 20, 21, 22, 23, 24, 25],
    basicAL: [30, 31, 32, 33]
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
var player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);

var setIdle = function setIdle() {
  if (velocity_x === 0 && lastpressed == "right" && idle === false && basicAttack == false) {
    idle = true;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.idleRight);
  } else if (velocity_x === 0 && lastpressed == "left" && idle === false && basicAttack == false) {
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

    if (uppressed) {
      player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.runRight);
    }

    if (basicAttack) {
      rightpressed = false;
      player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.basicAR);
    }
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

    if (uppressed) {
      player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.runLeft);
    }
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
    idle = false;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.left.basicAL);
  } else if (basicAttack && idle == true && lastpressed == "right") {
    // basicAttack = false
    lastpressed = "right";
    idle = false;
    player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(allFrameSets.right.basicAR);
  }
};

var draw = function draw() {
  setIdle(); //running and looking right

  runningRight();
  console.log(lastpressed); // jumping 

  jumping(); //running and looking left

  runningLeft();
  basicAttacking();
  console.log(player.frameValue); // drawing the player 

  var img = new Image();
  img.src = "src/images/tanjiro_sprite.png"; // picks the correct number of frames

  var frame = _frames__WEBPACK_IMPORTED_MODULE_1__.frames[player.frameValue]; // starts animation

  player.updateAnimation();

  img.onload = function () {
    // player.updateAnimation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y -= frame.offset, frame.canvasWidth, frame.canvasHeight);
    ctx.drawImage(img, -33, 540, 120, 100, x - 15, y - 15, 160, 120); // ctx.drawImage(img, 2, 467, 76, 72, x, y, 96, 100)
    // ctx.drawImage(img, 199, 467, 100, 70, x, y, 140, 100)
    // ctx.drawImage(img, 297, 467, 100, 70, x, y, 140, 100)
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
    basicAttack = true;
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
    var offset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    _classCallCheck(this, Frame);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.canvasWidth = cWidth;
    this.canvasHeight = cHeight;
    this.offset = offset;
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
    key: "offset",
    value: function offset() {
      return this.offset;
    }
  }]);

  return Frame;
}();

var frames = [new Frame(0, 5, 60, 70, 80, 100), new Frame(62, 5, 60, 70, 80, 100), new Frame(125, 5, 60, 70, 80, 100), // 0 idle right
new Frame(189, 5, 60, 70, 80, 100), new Frame(250, 5, 60, 70, 80, 100), new Frame(312, 5, 60, 70, 80, 100), // 3 idle left
new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), //6 jump right
new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), //9 jump right
new Frame(100, 133, 55, 70, 80, 100), new Frame(164, 133, 55, 70, 80, 100), new Frame(225, 133, 55, 70, 80, 100), new Frame(285, 133, 55, 70, 80, 100), new Frame(335, 133, 55, 70, 80, 100), new Frame(0, 212, 55, 70, 80, 100), new Frame(62, 212, 55, 70, 80, 100), //12 runnning right
new Frame(115, 212, 55, 70, 80, 100), new Frame(170, 212, 55, 70, 80, 100), new Frame(225, 212, 55, 70, 80, 100), new Frame(277, 212, 55, 70, 80, 100), new Frame(325, 212, 55, 70, 80, 100), new Frame(4, 292, 55, 70, 80, 100), new Frame(75, 292, 55, 70, 80, 100), // 19 attackleft
new Frame(295, 292, 55, 70, 80, 100), new Frame(6, 380, 100, 70, 140, 100), new Frame(135, 384, 100, 70, 140, 100), new Frame(233, 382, 100, 70, 140, 100), //26 basic attack right
new Frame(2, 467, 76, 72, 96, 100), new Frame(98, 467, 120, 70, 160, 100), new Frame(199, 467, 100, 70, 140, 100), new Frame(297, 467, 100, 70, 140, 100), //30 basic attack left
new Frame(-33, 540, 76, 72, 96, 100), new Frame(98, 467, 120, 70, 160, 100), new Frame(199, 467, 100, 70, 140, 100), new Frame(297, 467, 100, 70, 140, 100) //30 special attack right
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

var interval = setInterval(_scripts_animator__WEBPACK_IMPORTED_MODULE_0__.draw, 200);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2ZyYW1lcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImFsbEZyYW1lU2V0cyIsInJpZ2h0IiwiaWRsZVJpZ2h0IiwianVtcFJpZ2h0IiwicnVuUmlnaHQiLCJiYXNpY0FSIiwibGVmdCIsImlkbGVMZWZ0IiwianVtcExlZnQiLCJydW5MZWZ0IiwiYmFzaWNBTCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwieCIsInkiLCJoZWlnaHQiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJpZ2h0cHJlc3NlZCIsImxlZnRwcmVzc2VkIiwibGFzdHByZXNzZWQiLCJ1cHByZXNzZWQiLCJpZGxlIiwiYmFzaWNBdHRhY2siLCJwbGF5ZXIiLCJQbGF5ZXIiLCJzZXRJZGxlIiwicnVubmluZ1JpZ2h0IiwianVtcGluZyIsInNldFRpbWVvdXQiLCJydW5uaW5nTGVmdCIsImJhc2ljQXR0YWNraW5nIiwiZHJhdyIsImNvbnNvbGUiLCJsb2ciLCJmcmFtZVZhbHVlIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJmcmFtZSIsImZyYW1lcyIsInVwZGF0ZUFuaW1hdGlvbiIsIm9ubG9hZCIsImNsZWFyUmVjdCIsIndpZHRoIiwiZHJhd0ltYWdlIiwib2Zmc2V0IiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJrZXlEb3duSGFuZGxlciIsImUiLCJrZXkiLCJrZXlVcEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiRnJhbWUiLCJjV2lkdGgiLCJjSGVpZ2h0IiwiZnJhbWVTZXQiLCJtb2RlIiwiY291bnQiLCJkZWxheSIsImZyYW1lSW5kZXgiLCJsb29wIiwicGxheSIsImxlbmd0aCIsImFuaW1hdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLFlBQVksR0FBRztBQUNqQkMsT0FBSyxFQUFFO0FBQ0hDLGFBQVMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQURSO0FBRUhDLGFBQVMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZSO0FBR0hDLFlBQVEsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsQ0FIUDtBQUlIQyxXQUFPLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiO0FBSk4sR0FEVTtBQU9qQkMsTUFBSSxFQUFFO0FBQ0ZDLFlBQVEsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQURSO0FBRUZDLFlBQVEsRUFBRSxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQUZSO0FBR0ZDLFdBQU8sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFB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QUN2QyxlQUFPLElBQVA7QUFDSCxPQUZELE1BR0s7QUFDRCxhQUFLN0IsVUFBTCxDQUFnQixLQUFLMEIsVUFBckI7QUFDSDtBQUVKOzs7V0FFRCxnQkFBTztBQUNILFdBQUtGLEtBQUw7QUFFQTFCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt1QixRQUFqQjtBQUNBeEIsYUFBTyxDQUFDQyxHQUFSLENBQVksS0FBS3lCLEtBQWpCO0FBRUEsV0FBS0UsVUFBTCxHQUFtQixLQUFLRixLQUFMLEdBQWEsS0FBS0YsUUFBTCxDQUFjTyxNQUFkLEdBQXVCLENBQXJDLEdBQTBDLEtBQUtMLEtBQUwsR0FBYSxDQUF2RCxHQUEyRCxLQUFLRSxVQUFMLEdBQWtCLENBQS9GO0FBRUEsV0FBSzFCLFVBQUwsR0FBa0IsS0FBS3NCLFFBQUwsQ0FBYyxLQUFLSSxVQUFuQixDQUFsQjtBQUlIOzs7V0FFRCwyQkFBa0I7QUFDZCxXQUFLSSxPQUFMO0FBQ0g7Ozs7OztBQVNMLCtEQUFleEMsTUFBZixFOzs7Ozs7VUN6RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLDZDQUE2Qyx3REFBd0QsRTs7Ozs7V0NBckc7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBS0EsSUFBTXlDLFFBQVEsR0FBR0MsV0FBVyxDQUFDbkMsbURBQUQsRUFBTyxHQUFQLENBQTVCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCJcbmltcG9ydCB7IGZyYW1lcyB9IGZyb20gXCIuL2ZyYW1lc1wiXG5cbmNvbnN0IGFsbEZyYW1lU2V0cyA9IHtcbiAgICByaWdodDoge1xuICAgICAgICBpZGxlUmlnaHQ6IFswLCAxLCAyXSxcbiAgICAgICAganVtcFJpZ2h0OiBbNiwgNywgOF0sXG4gICAgICAgIHJ1blJpZ2h0OiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMThdLFxuICAgICAgICBiYXNpY0FSOiBbMjYsIDI3LCAyOCwgMjldXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICAgIGlkbGVMZWZ0OiBbMywgNCwgNV0sXG4gICAgICAgIGp1bXBMZWZ0OiBbOSwgMTAsIDExXSxcbiAgICAgICAgcnVuTGVmdDogWzE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1XSxcbiAgICAgICAgYmFzaWNBTDogWzMwLCAzMSwgMzIsIDMzXVxuICAgIH0sXG59XG5cblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLWNhbnZhc1wiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbmxldCB4ID0gNTA7XG5sZXQgeSA9IGNhbnZhcy5oZWlnaHQgLSAxMDA7XG5sZXQgdmVsb2NpdHlfeCA9IDA7XG5sZXQgdmVsb2NpdHlfeSA9IDA7XG5cbmxldCByaWdodHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGxlZnRwcmVzc2VkID0gZmFsc2U7XG5cbmxldCBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIjtcblxubGV0IHVwcHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgaWRsZSA9IHRydWU7XG5cbmxldCBiYXNpY0F0dGFjayA9IGZhbHNlO1xuXG5cbmxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5pZGxlUmlnaHQpXG5cblxuY29uc3Qgc2V0SWRsZSA9ICgpID0+IHtcbiAgICBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcInJpZ2h0XCIgJiYgaWRsZSA9PT0gZmFsc2UgJiYgYmFzaWNBdHRhY2sgPT0gZmFsc2UpICB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAodmVsb2NpdHlfeCA9PT0gMCAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIiAmJiBpZGxlID09PSBmYWxzZSAmJiBiYXNpY0F0dGFjayA9PSBmYWxzZSkge1xuICAgICAgICBpZGxlID0gdHJ1ZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KVxuICAgIH1cbn1cblxuY29uc3QgcnVubmluZ1JpZ2h0ID0gKCkgPT4ge1xuICAgXG4gICAgaWYgKHJpZ2h0cHJlc3NlZCAmJiBpZGxlID09PSB0cnVlKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMjBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQucnVuUmlnaHQpXG4gICAgICAgIGlmICh1cHByZXNzZWQpIHtcbiAgICAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LnJ1blJpZ2h0KVxuICAgICAgICB9XG4gICAgICAgIGlmIChiYXNpY0F0dGFjaykge1xuICAgICAgICAgICAgcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmJhc2ljQVIpXG4gICAgICAgIH1cbiAgICB9IFxuICAgIGVsc2UgaWYgKHJpZ2h0cHJlc3NlZCAmJiBpZGxlID09IGZhbHNlICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQucnVuUmlnaHQpXG4gICAgfVxufVxuXG5jb25zdCBqdW1waW5nID0gKCkgPT4ge1xuICAgIGlmICh1cHByZXNzZWQgKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICAvLyB1cHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0Lmp1bXBMZWZ0KSA6IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0Lmp1bXBSaWdodClcblxuICAgICAgICBpZiAoeSA8PSBjYW52YXMuaGVpZ2h0IC0gMTAwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgICAgICBwbGF5ZXIgPSBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KSA6IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgMTAwKVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbHNlIGlmIChsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICAgICAgLCAxMDApXG5cbiAgICAgICAgLy8gfVxuXG4gICAgfVxuXG59XG5cbmNvbnN0IHJ1bm5pbmdMZWZ0ID0gKCkgPT4ge1xuICAgIGlmIChsZWZ0cHJlc3NlZCAmJiBpZGxlID09IHRydWUgKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gLTI1XG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5ydW5MZWZ0KVxuICAgICAgICBpZiAodXBwcmVzc2VkKSB7XG4gICAgICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgICAgIH1cbiAgICB9IFxuICAgIGVsc2UgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT0gZmFsc2UgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjVcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgfVxufVxuXG5jb25zdCBiYXNpY0F0dGFja2luZyA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgaWYgKGJhc2ljQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICAvLyBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcblxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5iYXNpY0FMKVxuXG4gICAgfSBcbiAgICBlbHNlIGlmIChiYXNpY0F0dGFjayAmJiBpZGxlID09IHRydWUgJiYgKGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikgKSB7XG4gICAgICAgIC8vIGJhc2ljQXR0YWNrID0gZmFsc2VcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmJhc2ljQVIpXG4gICAgfVxuXG4gICAgXG59XG5cbmV4cG9ydCBjb25zdCBkcmF3ID0gKCkgPT4ge1xuXG4gICAgc2V0SWRsZSgpXG5cbiAgICAvL3J1bm5pbmcgYW5kIGxvb2tpbmcgcmlnaHRcbiAgICBydW5uaW5nUmlnaHQoKVxuICAgIGNvbnNvbGUubG9nKGxhc3RwcmVzc2VkKVxuICAgIC8vIGp1bXBpbmcgXG4gICAganVtcGluZygpXG4gIFxuICAgIC8vcnVubmluZyBhbmQgbG9va2luZyBsZWZ0XG4gICAgcnVubmluZ0xlZnQoKVxuXG4gICAgYmFzaWNBdHRhY2tpbmcoKVxuICAgIFxuIFxuICAgIGNvbnNvbGUubG9nKHBsYXllci5mcmFtZVZhbHVlKVxuICAgIC8vIGRyYXdpbmcgdGhlIHBsYXllciBcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gXCJzcmMvaW1hZ2VzL3Rhbmppcm9fc3ByaXRlLnBuZ1wiO1xuICAgICAgICAvLyBwaWNrcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgZnJhbWVzXG4gICAgbGV0IGZyYW1lID0gZnJhbWVzW3BsYXllci5mcmFtZVZhbHVlXVxuICAgICAgICAvLyBzdGFydHMgYW5pbWF0aW9uXG4gICAgcGxheWVyLnVwZGF0ZUFuaW1hdGlvbigpXG4gICAgICAgIFxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIC8vIHBsYXllci51cGRhdGVBbmltYXRpb25cbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCBmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0LCB4LCB5IC09IGZyYW1lLm9mZnNldCwgZnJhbWUuY2FudmFzV2lkdGgsIGZyYW1lLmNhbnZhc0hlaWdodClcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIC0zMywgNTQwLCAxMjAsIDEwMCwgeCAtIDE1LCB5IC0gMTUsIDE2MCwgMTIwKVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgMiwgNDY3LCA3NiwgNzIsIHgsIHksIDk2LCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoaW1nLCAxOTksIDQ2NywgMTAwLCA3MCwgeCwgeSwgMTQwLCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoaW1nLCAyOTcsIDQ2NywgMTAwLCA3MCwgeCwgeSwgMTQwLCAxMDApXG4gICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgICAgICAvLyBncmF2aXR5XG4gICAgICAgIHkgKz0gMjUgXG4gICAgICAgIFxuICAgICAgICAvLyBjb2xsaXNpb24gY29udHJvbFxuICAgIGlmICh4ICsgMiA+IGNhbnZhcy53aWR0aCAtIDgwKSAoeCA9IGNhbnZhcy53aWR0aCAtIDgwKVxuXG4gICAgaWYgKHggLSAyIDwgMCkgKHggPSAwKVxuXG4gICAgaWYgKHkgKyA4ID4gY2FudmFzLmhlaWdodCAtIDEwMCApIHkgPSBjYW52YXMuaGVpZ2h0LTEwMFxuICAgICAgICAgLy8gY29sbGlzaW9uIGNvbnRyb2xcblxuICAgICAgICAvLyAgbW92aW5nIHJpZ2h0IGFuZCBsZWZ0XG4gICAgaWYgKGxlZnRwcmVzc2VkICYmIHJpZ2h0cHJlc3NlZCA9PT0gZmFsc2UpIHggKz0gdmVsb2NpdHlfeFxuICAgIGlmIChyaWdodHByZXNzZWQgJiYgbGVmdHByZXNzZWQgPT09IGZhbHNlKSB4ICs9IHZlbG9jaXR5X3hcbiAgICBpZiAodXBwcmVzc2VkICYmIHkgPT09IGNhbnZhcy5oZWlnaHQtMTAwKSB7XG4gICAgICAgIHkgLT04MFxuXG4gICAgfVxuICAgICAgICAgICAgLy8gIG1vdmluZyByaWdodCBhbmQgbGVmdFxufVxuXG5cbmNvbnN0IGtleURvd25IYW5kbGVyID0gKGUpID0+IHtcbiAgICBcbiAgICBcbiAgICBpZiAoZS5rZXkgPT0gXCJSaWdodFwiIHx8IGUua2V5ID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgIHJpZ2h0cHJlc3NlZCA9IHRydWVcbiAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoKGUua2V5ID09IFwiVXBcIiB8fCBlLmtleSA9PSBcIkFycm93VXBcIikgJiYgKHVwcHJlc3NlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwcHJlc3NlZCA9IHRydWVcblxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIGxlZnRwcmVzc2VkID0gdHJ1ZVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiYVwiIHx8IGUua2V5ID09IFwiS2V5QVwiKSB7XG4gICAgICAgIGJhc2ljQXR0YWNrID0gdHJ1ZVxuICAgICAgICBcblxuICAgIH1cblxuICAgIFxufVxuXG5jb25zdCBrZXlVcEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PSBcIlJpZ2h0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgdmVsb2NpdHlfeCA9IDBcbiAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJVcFwiIHx8IGUua2V5ID09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgIHVwcHJlc3NlZCA9IGZhbHNlXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJMZWZ0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICB2ZWxvY2l0eV94ID0gMFxuICAgICAgICBsZWZ0cHJlc3NlZCA9IGZhbHNlXG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiYVwiIHx8IGUua2V5ID09PSBcIktleUFcIikge1xuICAgICAgICBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgLy8gICAgbGV0IGZhY2luZyA9IGxhc3RwcmVzc2VkID09IFwibGVmdFwiID8gXCJsZWZ0XCIgOiBcInJpZ2h0XCJcbiAgICAvLyAgICBzZXRUaW1lb3V0KCgpID0+IGxhc3RwcmVzc2VkID0gZmFjaW5nLCAxMDApXG4gICAgfVxuXG4gICAgXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd25IYW5kbGVyLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5VXBIYW5kbGVyLCBmYWxzZSk7IiwiXG4gICAgY2xhc3MgRnJhbWUge1xuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjV2lkdGgsIGNIZWlnaHQsIG9mZnNldCA9IDApIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggXG4gICAgICAgICAgICB0aGlzLnkgPSB5IFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IGNXaWR0aFxuICAgICAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjSGVpZ2h0XG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuICAgXG4gICAgICAgIH1cblxuICAgICAgICB4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueFxuICAgICAgICB9XG4gICAgICAgIHkoKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnlcbiAgICAgICAgfVxuXG4gICAgICAgIGhlaWdodCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0XG4gICAgICAgIH0gXG4gICAgICAgIHdpZHRoKCl7XG4gICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBjYW52YXNXaWR0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhc1dpZHRoXG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzSGVpZ2h0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzSGVpZ2h0XG4gICAgICAgIH1cblxuICAgICAgICBvZmZzZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXRcbiAgICAgICAgfVxuXG4gICAgfVxuXG5leHBvcnQgY29uc3QgZnJhbWVzID0gW1xuICAgIG5ldyBGcmFtZSgwLCA1LCA2MCwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNjIsIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgxMjUsIDUsIDYwLCA3MCwgODAsIDEwMCksICAvLyAwIGlkbGUgcmlnaHRcbiAgICBuZXcgRnJhbWUoMTg5LCA1LCA2MCwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjUwLCA1LCA2MCwgNzAsIDgwLCAxMDApLG5ldyBGcmFtZSggMzEyLCA1LCA2MCwgNzAsIDgwLCAxMDApLCAvLyAzIGlkbGUgbGVmdFxuICAgIG5ldyBGcmFtZSg0MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg0MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg0MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIC8vNiBqdW1wIHJpZ2h0XG4gICAgbmV3IEZyYW1lKDI4MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgLy85IGp1bXAgcmlnaHRcbiAgICBuZXcgRnJhbWUoMTAwLCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgxNjQsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDIyNSwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjg1LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgzMzUsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDAsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDYyLCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIC8vMTIgcnVubm5pbmcgcmlnaHRcbiAgICBuZXcgRnJhbWUoMTE1LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgxNzAsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDIyNSwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjc3LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgzMjUsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDQsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDc1LCAyOTIsIDU1LCA3MCwgODAsIDEwMCksIC8vIDE5IGF0dGFja2xlZnRcbiAgICBuZXcgRnJhbWUoMjk1LCAyOTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg2LCAzODAsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IEZyYW1lKDEzNSwgMzg0LCAxMDAsIDcwLCAxNDAsIDEwMCksIG5ldyBGcmFtZSgyMzMsIDM4MiwgMTAwLCA3MCwgMTQwLCAxMDApLCAgIC8vMjYgYmFzaWMgYXR0YWNrIHJpZ2h0XG4gICAgbmV3IEZyYW1lKDIsIDQ2NywgNzYsIDcyLCA5NiwgMTAwKSwgbmV3IEZyYW1lKDk4LCA0NjcsIDEyMCwgNzAsIDE2MCwgMTAwKSwgbmV3IEZyYW1lKDE5OSwgNDY3LCAxMDAsIDcwLCAxNDAsIDEwMCksIG5ldyBGcmFtZSgyOTcsIDQ2NywgMTAwLCA3MCwgMTQwLCAxMDApLCAgIC8vMzAgYmFzaWMgYXR0YWNrIGxlZnRcbiAgICBuZXcgRnJhbWUoLTMzLCA1NDAsIDc2LCA3MiwgOTYsIDEwMCksIG5ldyBGcmFtZSg5OCwgNDY3LCAxMjAsIDcwLCAxNjAsIDEwMCksIG5ldyBGcmFtZSgxOTksIDQ2NywgMTAwLCA3MCwgMTQwLCAxMDApLCBuZXcgRnJhbWUoMjk3LCA0NjcsIDEwMCwgNzAsIDE0MCwgMTAwKSAgIC8vMzAgc3BlY2lhbCBhdHRhY2sgcmlnaHRcbl1cbiIsImltcG9ydCB7IGZyYW1lcyB9IGZyb20gXCIuL2ZyYW1lc1wiXG5cblxuXG5cbmNsYXNzIFBsYXllciB7IFxuICAgIGNvbnN0cnVjdG9yKGZyYW1lU2V0LCBtb2RlID0gXCJsb29wXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAwXG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gMVxuICAgICAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gMFxuICAgICAgICAgICAgdGhpcy5mcmFtZVNldCA9IGZyYW1lU2V0XG4gICAgICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSBmcmFtZVNldFswXVxuICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmcmFtZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZVZhbHVlXG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sb29wKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgICAgICAgICAgICBcImJyZWFrXCJcbiAgICAgICAgICAgIGNhc2UgXCJwYXVzZVwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmNvdW50ICsrXG5cbiAgICAgICAgdGhpcy5mcmFtZUluZGV4KytcblxuICAgICAgICBpZiAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgXG4gICAgICAgIH0gIFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVWYWx1ZVt0aGlzLmZyYW1lSW5kZXhdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCsrXG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mcmFtZVNldClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3VudClcblxuICAgICAgICB0aGlzLmZyYW1lSW5kZXggPSAodGhpcy5jb3VudCA+IHRoaXMuZnJhbWVTZXQubGVuZ3RoIC0gMSkgPyB0aGlzLmNvdW50ID0gMCA6IHRoaXMuZnJhbWVJbmRleCArIDFcblxuICAgICAgICB0aGlzLmZyYW1lVmFsdWUgPSB0aGlzLmZyYW1lU2V0W3RoaXMuZnJhbWVJbmRleF1cblxuICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhdyB9IGZyb20gXCIuL3NjcmlwdHMvYW5pbWF0b3JcIlxuXG5cblxuXG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGRyYXcsIDIwMCkiXSwic291cmNlUm9vdCI6IiJ9