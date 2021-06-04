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
    ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, x, y, frame.canvasWidth, frame.canvasHeight); // ctx.drawImage(img, 98, 467, 120, 70, x, y, 160, 100)
    // ctx.drawImage(img, 2, 467, 76, 72, x, y, 96, 100)
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
new Frame(189, 5, 60, 70, 80, 100), new Frame(250, 5, 60, 70, 80, 100), new Frame(312, 5, 60, 70, 80, 100), // 3 idle left
new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), new Frame(40, 70, 55, 70, 80, 100), //6 jump right
new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), new Frame(280, 70, 55, 70, 80, 100), //9 jump right
new Frame(100, 133, 55, 70, 80, 100), new Frame(164, 133, 55, 70, 80, 100), new Frame(225, 133, 55, 70, 80, 100), new Frame(285, 133, 55, 70, 80, 100), new Frame(335, 133, 55, 70, 80, 100), new Frame(0, 212, 55, 70, 80, 100), new Frame(62, 212, 55, 70, 80, 100), //12 runnning right
new Frame(115, 212, 55, 70, 80, 100), new Frame(170, 212, 55, 70, 80, 100), new Frame(225, 212, 55, 70, 80, 100), new Frame(277, 212, 55, 70, 80, 100), new Frame(325, 212, 55, 70, 80, 100), new Frame(4, 292, 55, 70, 80, 100), new Frame(75, 292, 55, 70, 80, 100), // 19 attackleft
new Frame(295, 292, 55, 70, 80, 100), new Frame(6, 380, 100, 70, 140, 100), new Frame(135, 384, 100, 70, 140, 100), new Frame(233, 382, 100, 70, 140, 100), //26 basic attack right
new Frame(2, 467, 76, 72, 96, 100), new Frame(98, 467, 120, 70, 160, 100), new Frame(199, 467, 100, 70, 140, 100), new Frame(297, 467, 100, 70, 140, 100) //30 basic attack left
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2ZyYW1lcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImFsbEZyYW1lU2V0cyIsInJpZ2h0IiwiaWRsZVJpZ2h0IiwianVtcFJpZ2h0IiwicnVuUmlnaHQiLCJiYXNpY0FSIiwibGVmdCIsImlkbGVMZWZ0IiwianVtcExlZnQiLCJydW5MZWZ0IiwiYmFzaWNBTCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwieCIsInkiLCJoZWlnaHQiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJpZ2h0cHJlc3NlZCIsImxlZnRwcmVzc2VkIiwibGFzdHByZXNzZWQiLCJ1cHByZXNzZWQiLCJpZGxlIiwiYmFzaWNBdHRhY2siLCJwbGF5ZXIiLCJQbGF5ZXIiLCJzZXRJZGxlIiwicnVubmluZ1JpZ2h0IiwianVtcGluZyIsInNldFRpbWVvdXQiLCJydW5uaW5nTGVmdCIsImJhc2ljQXR0YWNraW5nIiwiZHJhdyIsImNvbnNvbGUiLCJsb2ciLCJmcmFtZVZhbHVlIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJmcmFtZSIsImZyYW1lcyIsInVwZGF0ZUFuaW1hdGlvbiIsIm9ubG9hZCIsImNsZWFyUmVjdCIsIndpZHRoIiwiZHJhd0ltYWdlIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJrZXlEb3duSGFuZGxlciIsImUiLCJrZXkiLCJrZXlVcEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiRnJhbWUiLCJjV2lkdGgiLCJjSGVpZ2h0IiwiZnJhbWVTZXQiLCJtb2RlIiwiY291bnQiLCJkZWxheSIsImZyYW1lSW5kZXgiLCJsb29wIiwicGxheSIsImxlbmd0aCIsImFuaW1hdGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLFlBQVksR0FBRztBQUNqQkMsT0FBSyxFQUFFO0FBQ0hDLGFBQVMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQURSO0FBRUhDLGFBQVMsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZSO0FBR0hDLFlBQVEsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsQ0FIUDtBQUlIQyxXQUFPLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiO0FBSk4sR0FEVTtBQU9qQkMsTUFBSSxFQUFFO0FBQ0ZDLFlBQVEsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQURSO0FBRUZDLFlBQVEsRUFBRSxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQUZSO0FBR0ZDLFdBQU8sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsQ0FIUDtBQUlGQyxXQUFPLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiO0FBSlA7QUFQVyxDQUFyQjtBQWdCQSxJQUFNQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFmO0FBQ0EsSUFBTUMsR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUVBLElBQUlDLENBQUMsR0FBRyxFQUFSO0FBQ0EsSUFBSUMsQ0FBQyxHQUFHTixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsR0FBeEI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakI7QUFFQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFFQSxJQUFJQyxXQUFXLEdBQUcsS0FBbEI7QUFFQSxJQUFJQyxXQUFXLEdBQUcsT0FBbEI7QUFFQSxJQUFJQyxTQUFTLEdBQUcsS0FBaEI7QUFFQSxJQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUVBLElBQUlDLFdBQVcsR0FBRyxLQUFsQjtBQUdBLElBQUlDLE1BQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXNUIsWUFBWSxDQUFDQyxLQUFiLENBQW1CQyxTQUE5QixDQUFiOztBQUVBLElBQU0yQixPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0FBQ2xCLE1BQUlWLFVBQVUsS0FBSyxDQUFmLElBQW9CSSxXQUFXLElBQUksT0FBbkMsSUFBOENFLElBQUksS0FBSyxLQUF2RCxJQUFnRUMsV0FBVyxJQUFJLEtBQW5GLEVBQTJGO0FBQ3ZGRCxRQUFJLEdBQUcsSUFBUDtBQUNBRSxVQUFNLEdBQUcsSUFBSUMsNENBQUosQ0FBVzVCLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkMsU0FBOUIsQ0FBVDtBQUNILEdBSEQsTUFJSyxJQUFJaUIsVUFBVSxLQUFLLENBQWYsSUFBb0JJLFdBQVcsSUFBSSxNQUFuQyxJQUE2Q0UsSUFBSSxLQUFLLEtBQXRELElBQStEQyxXQUFXLElBQUksS0FBbEYsRUFBeUY7QUFDMUZELFFBQUksR0FBRyxJQUFQO0FBQ0FFLFVBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXNUIsWUFBWSxDQUFDTSxJQUFiLENBQWtCQyxRQUE3QixDQUFUO0FBQ0g7QUFDSixDQVREOztBQVdBLElBQU11QixZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBRXZCLE1BQUlULFlBQVksSUFBSUksSUFBSSxLQUFLLElBQTdCLEVBQW1DO0FBQy9CQSxRQUFJLEdBQUcsS0FBUDtBQUNBTixjQUFVLEdBQUcsRUFBYjtBQUNBSSxlQUFXLEdBQUcsT0FBZCxDQUgrQixDQUkvQjs7QUFDQUksVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVc1QixZQUFZLENBQUNDLEtBQWIsQ0FBbUJHLFFBQTlCLENBQVQ7O0FBQ0EsUUFBSW9CLFNBQUosRUFBZTtBQUNYRyxZQUFNLEdBQUcsSUFBSUMsNENBQUosQ0FBVzVCLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkcsUUFBOUIsQ0FBVDtBQUNIO0FBQ0osR0FURCxNQVVLLElBQUlpQixZQUFZLElBQUlJLElBQUksSUFBSSxLQUF4QixJQUFpQ0YsV0FBVyxJQUFJLE1BQXBELEVBQTREO0FBQzdESixjQUFVLEdBQUcsQ0FBQyxFQUFkO0FBQ0FJLGVBQVcsR0FBRyxPQUFkLENBRjZELENBRzdEOztBQUNBSSxVQUFNLEdBQUcsSUFBSUMsNENBQUosQ0FBVzVCLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkcsUUFBOUIsQ0FBVDtBQUNIO0FBQ0osQ0FsQkQ7O0FBb0JBLElBQU0yQixPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0FBQ2xCLE1BQUlQLFNBQUosRUFBZ0I7QUFDWkMsUUFBSSxHQUFHLEtBQVAsQ0FEWSxDQUVaOztBQUNBRSxVQUFNLEdBQUdKLFdBQVcsS0FBSyxNQUFoQixHQUF5QixJQUFJSyw0Q0FBSixDQUFXNUIsWUFBWSxDQUFDTSxJQUFiLENBQWtCRSxRQUE3QixDQUF6QixHQUFrRSxJQUFJb0IsNENBQUosQ0FBVzVCLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkUsU0FBOUIsQ0FBM0U7O0FBRUEsUUFBSWMsQ0FBQyxJQUFJTixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsR0FBekIsRUFBOEI7QUFDMUJjLGdCQUFVLENBQUMsWUFBTTtBQUNkUCxZQUFJLEdBQUcsSUFBUDtBQUNIRSxjQUFNLEdBQUdKLFdBQVcsS0FBSyxNQUFoQixHQUF5QixJQUFJSyw0Q0FBSixDQUFXNUIsWUFBWSxDQUFDTSxJQUFiLENBQWtCQyxRQUE3QixDQUF6QixHQUFrRSxJQUFJcUIsNENBQUosQ0FBVzVCLFlBQVksQ0FBQ0MsS0FBYixDQUFtQkMsU0FBOUIsQ0FBM0U7QUFFQyxPQUpTLEVBS0osR0FMSSxDQUFWO0FBT0gsS0FiVyxDQWVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFSDtBQUVKLENBMUJEOztBQTRCQSxJQUFNK0IsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN0QixNQUFJWCxXQUFXLElBQUlHLElBQUksSUFBSSxJQUEzQixFQUFrQztBQUM5QkEsUUFBSSxHQUFHLEtBQVA7QUFDQU4sY0FBVSxHQUFHLENBQUMsRUFBZDtBQUNBSSxlQUFXLEdBQUcsTUFBZCxDQUg4QixDQUk5Qjs7QUFDQUksVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVc1QixZQUFZLENBQUNNLElBQWIsQ0FBa0JHLE9BQTdCLENBQVQ7O0FBQ0EsUUFBSWUsU0FBSixFQUFlO0FBQ1hHLFlBQU0sR0FBRyxJQUFJQyw0Q0FBSixDQUFXNUIsWUFBWSxDQUFDTSxJQUFiLENBQWtCRyxPQUE3QixDQUFUO0FBQ0g7QUFDSixHQVRELE1BVUssSUFBSWEsV0FBVyxJQUFJRyxJQUFJLElBQUksS0FBdkIsSUFBZ0NGLFdBQVcsSUFBSSxPQUFuRCxFQUE0RDtBQUM3REosY0FBVSxHQUFHLENBQUMsRUFBZDtBQUNBSSxlQUFXLEdBQUcsTUFBZCxDQUY2RCxDQUc3RDs7QUFDQUksVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVc1QixZQUFZLENBQUNNLElBQWIsQ0FBa0JHLE9BQTdCLENBQVQ7QUFDSDtBQUNKLENBakJEOztBQW1CQSxJQUFNeUIsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFNO0FBRXpCLE1BQUlSLFdBQVcsSUFBSUQsSUFBSSxJQUFJLElBQXZCLElBQStCRixXQUFXLElBQUksTUFBbEQsRUFBMEQ7QUFDdEQ7QUFDQUEsZUFBVyxHQUFHLE1BQWQ7QUFFQUUsUUFBSSxHQUFHLEtBQVA7QUFDQUUsVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVc1QixZQUFZLENBQUNNLElBQWIsQ0FBa0JJLE9BQTdCLENBQVQ7QUFFSCxHQVBELE1BUUssSUFBSWdCLFdBQVcsSUFBSUQsSUFBSSxJQUFJLElBQXZCLElBQWdDRixXQUFXLElBQUksT0FBbkQsRUFBOEQ7QUFDL0Q7QUFDQUEsZUFBVyxHQUFHLE9BQWQ7QUFDQUUsUUFBSSxHQUFHLEtBQVA7QUFDQUUsVUFBTSxHQUFHLElBQUlDLDRDQUFKLENBQVc1QixZQUFZLENBQUNDLEtBQWIsQ0FBbUJJLE9BQTlCLENBQVQ7QUFDSDtBQUdKLENBbEJEOztBQW9CTyxJQUFNOEIsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUV0Qk4sU0FBTyxHQUZlLENBSXRCOztBQUNBQyxjQUFZO0FBQ1pNLFNBQU8sQ0FBQ0MsR0FBUixDQUFZZCxXQUFaLEVBTnNCLENBT3RCOztBQUNBUSxTQUFPLEdBUmUsQ0FVdEI7O0FBQ0FFLGFBQVc7QUFFWEMsZ0JBQWM7QUFHZEUsU0FBTyxDQUFDQyxHQUFSLENBQVlWLE1BQU0sQ0FBQ1csVUFBbkIsRUFoQnNCLENBaUJ0Qjs7QUFDQSxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsS0FBSixFQUFWO0FBRUFELEtBQUcsQ0FBQ0UsR0FBSixHQUFVLCtCQUFWLENBcEJzQixDQXFCbEI7O0FBQ0osTUFBSUMsS0FBSyxHQUFHQywyQ0FBTSxDQUFDaEIsTUFBTSxDQUFDVyxVQUFSLENBQWxCLENBdEJzQixDQXVCbEI7O0FBQ0pYLFFBQU0sQ0FBQ2lCLGVBQVA7O0FBRUFMLEtBQUcsQ0FBQ00sTUFBSixHQUFhLFlBQU07QUFDZjtBQUNBL0IsT0FBRyxDQUFDZ0MsU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JuQyxNQUFNLENBQUNvQyxLQUEzQixFQUFrQ3BDLE1BQU0sQ0FBQ08sTUFBekM7QUFDQUosT0FBRyxDQUFDa0MsU0FBSixDQUFjVCxHQUFkLEVBQW1CRyxLQUFLLENBQUMxQixDQUF6QixFQUE0QjBCLEtBQUssQ0FBQ3pCLENBQWxDLEVBQXFDeUIsS0FBSyxDQUFDSyxLQUEzQyxFQUFrREwsS0FBSyxDQUFDeEIsTUFBeEQsRUFBZ0VGLENBQWhFLEVBQW1FQyxDQUFuRSxFQUFzRXlCLEtBQUssQ0FBQ08sV0FBNUUsRUFBeUZQLEtBQUssQ0FBQ1EsWUFBL0YsRUFIZSxDQUlmO0FBQ0E7QUFDQTtBQUNBO0FBR0gsR0FWRCxDQTFCc0IsQ0FxQ2xCOzs7QUFDQWpDLEdBQUMsSUFBSSxFQUFMLENBdENrQixDQXdDbEI7O0FBQ0osTUFBSUQsQ0FBQyxHQUFHLENBQUosR0FBUUwsTUFBTSxDQUFDb0MsS0FBUCxHQUFlLEVBQTNCLEVBQWdDL0IsQ0FBQyxHQUFHTCxNQUFNLENBQUNvQyxLQUFQLEdBQWUsRUFBcEI7QUFFL0IsTUFBSS9CLENBQUMsR0FBRyxDQUFKLEdBQVEsQ0FBWixFQUFnQkEsQ0FBQyxHQUFHLENBQUw7QUFFZixNQUFJQyxDQUFDLEdBQUcsQ0FBSixHQUFRTixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsR0FBNUIsRUFBa0NELENBQUMsR0FBR04sTUFBTSxDQUFDTyxNQUFQLEdBQWMsR0FBbEIsQ0E3Q1osQ0E4Q2pCO0FBRUQ7O0FBQ0osTUFBSUksV0FBVyxJQUFJRCxZQUFZLEtBQUssS0FBcEMsRUFBMkNMLENBQUMsSUFBSUcsVUFBTDtBQUMzQyxNQUFJRSxZQUFZLElBQUlDLFdBQVcsS0FBSyxLQUFwQyxFQUEyQ04sQ0FBQyxJQUFJRyxVQUFMOztBQUMzQyxNQUFJSyxTQUFTLElBQUlQLENBQUMsS0FBS04sTUFBTSxDQUFDTyxNQUFQLEdBQWMsR0FBckMsRUFBMEM7QUFDdENELEtBQUMsSUFBRyxFQUFKO0FBRUgsR0F0RHFCLENBdURkOztBQUNYLENBeERNOztBQTJEUCxJQUFNa0MsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxDQUFELEVBQU87QUFHMUIsTUFBSUEsQ0FBQyxDQUFDQyxHQUFGLElBQVMsT0FBVCxJQUFvQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsWUFBakMsRUFBK0M7QUFDM0NoQyxnQkFBWSxHQUFHLElBQWY7QUFFSCxHQUhELE1BSUssSUFBSSxDQUFDK0IsQ0FBQyxDQUFDQyxHQUFGLElBQVMsSUFBVCxJQUFpQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsU0FBM0IsS0FBMEM3QixTQUFTLEtBQUssS0FBNUQsRUFBb0U7QUFDckVBLGFBQVMsR0FBRyxJQUFaO0FBRUgsR0FISSxNQUlBLElBQUk0QixDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUFULElBQW1CRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxXQUFoQyxFQUE2QztBQUM5Qy9CLGVBQVcsR0FBRyxJQUFkO0FBQ0gsR0FGSSxNQUlBLElBQUk4QixDQUFDLENBQUNDLEdBQUYsSUFBUyxHQUFULElBQWdCRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxNQUE3QixFQUFxQztBQUN0QzNCLGVBQVcsR0FBRyxJQUFkO0FBRUg7QUFHSixDQXJCRDs7QUF1QkEsSUFBTTRCLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNGLENBQUQsRUFBTztBQUN4QixNQUFJQSxDQUFDLENBQUNDLEdBQUYsSUFBUyxPQUFULElBQW9CRCxDQUFDLENBQUNDLEdBQUYsSUFBUyxZQUFqQyxFQUErQztBQUMzQ2hDLGdCQUFZLEdBQUcsS0FBZjtBQUNBRixjQUFVLEdBQUcsQ0FBYjtBQUVILEdBSkQsTUFLSyxJQUFJaUMsQ0FBQyxDQUFDQyxHQUFGLElBQVMsSUFBVCxJQUFpQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsU0FBOUIsRUFBeUM7QUFDMUM3QixhQUFTLEdBQUcsS0FBWjtBQUNILEdBRkksTUFJQSxJQUFJNEIsQ0FBQyxDQUFDQyxHQUFGLElBQVMsTUFBVCxJQUFtQkQsQ0FBQyxDQUFDQyxHQUFGLElBQVMsV0FBaEMsRUFBNkM7QUFDOUNsQyxjQUFVLEdBQUcsQ0FBYjtBQUNBRyxlQUFXLEdBQUcsS0FBZDtBQUNILEdBSEksTUFJQSxJQUFJOEIsQ0FBQyxDQUFDQyxHQUFGLElBQVMsR0FBVCxJQUFnQkQsQ0FBQyxDQUFDQyxHQUFGLEtBQVUsTUFBOUIsRUFBc0M7QUFDdkMzQixlQUFXLEdBQUcsS0FBZCxDQUR1QyxDQUUzQztBQUNBO0FBQ0M7QUFHSixDQXJCRDs7QUF1QkFkLFFBQVEsQ0FBQzJDLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDSixjQUFyQyxFQUFxRCxLQUFyRDtBQUNBdkMsUUFBUSxDQUFDMkMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNELFlBQW5DLEVBQWlELEtBQWpELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDclBVRSxLO0FBQ0YsaUJBQVl4QyxDQUFaLEVBQWVDLENBQWYsRUFBa0I4QixLQUFsQixFQUF5QjdCLE1BQXpCLEVBQWlDdUMsTUFBakMsRUFBeUNDLE9BQXpDLEVBQWtEO0FBQUE7O0FBQzlDLFNBQUsxQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLNkIsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0UsV0FBTCxHQUFtQlEsTUFBbkI7QUFDQSxTQUFLUCxZQUFMLEdBQW9CUSxPQUFwQjtBQUNIOzs7O1dBQ0QsYUFBSTtBQUNBLGFBQU8sS0FBSzFDLENBQVo7QUFDSDs7O1dBQ0QsYUFBSTtBQUNELGFBQU8sS0FBS0MsQ0FBWjtBQUNGOzs7V0FFRCxrQkFBUztBQUNOLGFBQU8sS0FBS0MsTUFBWjtBQUNGOzs7V0FDRCxpQkFBTztBQUNKLGFBQU8sS0FBSzZCLEtBQVo7QUFDRjs7O1dBRUQsdUJBQWM7QUFDVixhQUFPLEtBQUtFLFdBQVo7QUFDSDs7O1dBQ0Qsd0JBQWU7QUFDWCxhQUFPLEtBQUtDLFlBQVo7QUFDSDs7Ozs7O0FBR0YsSUFBTVAsTUFBTSxHQUFHLENBQ2xCLElBQUlhLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixHQUE1QixDQURrQixFQUNnQixJQUFJQSxLQUFKLENBQVUsRUFBVixFQUFjLENBQWQsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsQ0FEaEIsRUFDbUQsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEdBQTlCLENBRG5ELEVBQ3dGO0FBQzFHLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixFQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixHQUE5QixDQUZrQixFQUVrQixJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FGbEIsRUFFcUQsSUFBSUEsS0FBSixDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsRUFBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsRUFBK0IsR0FBL0IsQ0FGckQsRUFFMEY7QUFDNUcsSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEdBQTlCLENBSGtCLEVBR2tCLElBQUlBLEtBQUosQ0FBVSxFQUFWLEVBQWMsRUFBZCxFQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixFQUE4QixHQUE5QixDQUhsQixFQUdzRCxJQUFJQSxLQUFKLENBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FIdEQsRUFHMEY7QUFDNUcsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxFQUFmLEVBQW1CLEVBQW5CLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLEVBQStCLEdBQS9CLENBSmtCLEVBSW1CLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsRUFBZixFQUFtQixFQUFuQixFQUF1QixFQUF2QixFQUEyQixFQUEzQixFQUErQixHQUEvQixDQUpuQixFQUl3RCxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEVBQWYsRUFBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsRUFBK0IsR0FBL0IsQ0FKeEQsRUFJNkY7QUFDL0csSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTGtCLEVBS29CLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQUxwQixFQUswRCxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FMMUQsRUFLZ0csSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTGhHLEVBS3NJLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQUx0SSxFQUs0SyxJQUFJQSxLQUFKLENBQVUsQ0FBVixFQUFhLEdBQWIsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FMNUssRUFLZ04sSUFBSUEsS0FBSixDQUFVLEVBQVYsRUFBYyxHQUFkLEVBQW1CLEVBQW5CLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLEVBQStCLEdBQS9CLENBTGhOLEVBS3FQO0FBQ3ZRLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQU5rQixFQU1vQixJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FOcEIsRUFNMEQsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEdBQWhDLENBTjFELEVBTWdHLElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxHQUFoQyxDQU5oRyxFQU1zSSxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FOdEksRUFNNEssSUFBSUEsS0FBSixDQUFVLENBQVYsRUFBYSxHQUFiLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEdBQTlCLENBTjVLLEVBTWdOLElBQUlBLEtBQUosQ0FBVSxFQUFWLEVBQWMsR0FBZCxFQUFtQixFQUFuQixFQUF1QixFQUF2QixFQUEyQixFQUEzQixFQUErQixHQUEvQixDQU5oTixFQU1xUDtBQUN2USxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsR0FBaEMsQ0FQa0IsRUFPb0IsSUFBSUEsS0FBSixDQUFVLENBQVYsRUFBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQXVCLEVBQXZCLEVBQTJCLEdBQTNCLEVBQWdDLEdBQWhDLENBUHBCLEVBTzBELElBQUlBLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixHQUE3QixFQUFrQyxHQUFsQyxDQVAxRCxFQU9rRyxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FQbEcsRUFPNEk7QUFDOUosSUFBSUEsS0FBSixDQUFVLENBQVYsRUFBYSxHQUFiLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEdBQTlCLENBUmtCLEVBUWtCLElBQUlBLEtBQUosQ0FBVSxFQUFWLEVBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixFQUF4QixFQUE0QixHQUE1QixFQUFpQyxHQUFqQyxDQVJsQixFQVF5RCxJQUFJQSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FSekQsRUFRaUcsSUFBSUEsS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLEVBQXpCLEVBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBUmpHLENBUTBJO0FBUjFJLENBQWYsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENQOztJQUtNNUIsTTtBQUNGLGtCQUFZK0IsUUFBWixFQUFxQztBQUFBLFFBQWZDLElBQWUsdUVBQVIsTUFBUTs7QUFBQTs7QUFDN0IsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLSixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtyQixVQUFMLEdBQWtCcUIsUUFBUSxDQUFDLENBQUQsQ0FBMUI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFFUDs7OztXQUVELHNCQUFhO0FBQ1QsYUFBTyxLQUFLdEIsVUFBWjtBQUNIOzs7V0FFRCxtQkFBVTtBQUNOLGNBQVEsS0FBS3NCLElBQWI7QUFDSSxhQUFLLE1BQUw7QUFDSSxlQUFLSSxJQUFMO0FBQ0E7O0FBQ0osYUFBSyxNQUFMO0FBQ0ksZUFBS0MsSUFBTDtBQUNBOztBQUNKLGFBQUssT0FBTDtBQUNJO0FBUlI7QUFXSDs7O1dBRUQsZ0JBQU87QUFDSCxXQUFLSixLQUFMO0FBRUEsV0FBS0UsVUFBTDs7QUFFQSxVQUFJLEtBQUtGLEtBQUwsR0FBYSxLQUFLRixRQUFMLENBQWNPLE1BQWQsR0FBdUIsQ0FBeEMsRUFBMkM7QUFDdkMsZUFBTyxJQUFQO0FBQ0gsT0FGRCxNQUdLO0FBQ0QsYUFBSzVCLFVBQUwsQ0FBZ0IsS0FBS3lCLFVBQXJCO0FBQ0g7QUFFSjs7O1dBRUQsZ0JBQU87QUFDSCxXQUFLRixLQUFMO0FBRUF6QixhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLc0IsUUFBakI7QUFDQXZCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt3QixLQUFqQjtBQUVBLFdBQUtFLFVBQUwsR0FBbUIsS0FBS0YsS0FBTCxHQUFhLEtBQUtGLFFBQUwsQ0FBY08sTUFBZCxHQUF1QixDQUFyQyxHQUEwQyxLQUFLTCxLQUFMLEdBQWEsQ0FBdkQsR0FBMkQsS0FBS0UsVUFBTCxHQUFrQixDQUEvRjtBQUVBLFdBQUt6QixVQUFMLEdBQWtCLEtBQUtxQixRQUFMLENBQWMsS0FBS0ksVUFBbkIsQ0FBbEI7QUFJSDs7O1dBRUQsMkJBQWtCO0FBQ2QsV0FBS0ksT0FBTDtBQUNIOzs7Ozs7QUFTTCwrREFBZXZDLE1BQWYsRTs7Ozs7O1VDekVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUtBLElBQU13QyxRQUFRLEdBQUdDLFdBQVcsQ0FBQ2xDLG1EQUFELEVBQU8sR0FBUCxDQUE1QixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiXG5pbXBvcnQgeyBmcmFtZXMgfSBmcm9tIFwiLi9mcmFtZXNcIlxuXG5jb25zdCBhbGxGcmFtZVNldHMgPSB7XG4gICAgcmlnaHQ6IHtcbiAgICAgICAgaWRsZVJpZ2h0OiBbMCwgMSwgMl0sXG4gICAgICAgIGp1bXBSaWdodDogWzYsIDcsIDhdLFxuICAgICAgICBydW5SaWdodDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4XSxcbiAgICAgICAgYmFzaWNBUjogWzI2LCAyNywgMjgsIDI5XVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgICBpZGxlTGVmdDogWzMsIDQsIDVdLFxuICAgICAgICBqdW1wTGVmdDogWzksIDEwLCAxMV0sXG4gICAgICAgIHJ1bkxlZnQ6IFsxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNV0sXG4gICAgICAgIGJhc2ljQUw6IFszMCwgMzEsIDMyLCAzM11cbiAgICB9LFxufVxuXG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5sZXQgeCA9IDUwO1xubGV0IHkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwO1xubGV0IHZlbG9jaXR5X3ggPSAwO1xubGV0IHZlbG9jaXR5X3kgPSAwO1xuXG5sZXQgcmlnaHRwcmVzc2VkID0gZmFsc2U7XG5cbmxldCBsZWZ0cHJlc3NlZCA9IGZhbHNlO1xuXG5sZXQgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCI7XG5cbmxldCB1cHByZXNzZWQgPSBmYWxzZTtcblxubGV0IGlkbGUgPSB0cnVlO1xuXG5sZXQgYmFzaWNBdHRhY2sgPSBmYWxzZTtcblxuXG5sZXQgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuXG5jb25zdCBzZXRJZGxlID0gKCkgPT4ge1xuICAgIGlmICh2ZWxvY2l0eV94ID09PSAwICYmIGxhc3RwcmVzc2VkID09IFwicmlnaHRcIiAmJiBpZGxlID09PSBmYWxzZSAmJiBiYXNpY0F0dGFjayA9PSBmYWxzZSkgIHtcbiAgICAgICAgaWRsZSA9IHRydWVcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQuaWRsZVJpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmICh2ZWxvY2l0eV94ID09PSAwICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiICYmIGlkbGUgPT09IGZhbHNlICYmIGJhc2ljQXR0YWNrID09IGZhbHNlKSB7XG4gICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgfVxufVxuXG5jb25zdCBydW5uaW5nUmlnaHQgPSAoKSA9PiB7XG4gICBcbiAgICBpZiAocmlnaHRwcmVzc2VkICYmIGlkbGUgPT09IHRydWUpIHtcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHZlbG9jaXR5X3ggPSAyMFxuICAgICAgICBsYXN0cHJlc3NlZCA9IFwicmlnaHRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5yaWdodC5ydW5SaWdodClcbiAgICAgICAgaWYgKHVwcHJlc3NlZCkge1xuICAgICAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQucnVuUmlnaHQpXG4gICAgICAgIH1cbiAgICB9IFxuICAgIGVsc2UgaWYgKHJpZ2h0cHJlc3NlZCAmJiBpZGxlID09IGZhbHNlICYmIGxhc3RwcmVzc2VkID09IFwibGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjBcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMucmlnaHQucnVuUmlnaHQpXG4gICAgfVxufVxuXG5jb25zdCBqdW1waW5nID0gKCkgPT4ge1xuICAgIGlmICh1cHByZXNzZWQgKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICAvLyB1cHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0Lmp1bXBMZWZ0KSA6IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0Lmp1bXBSaWdodClcblxuICAgICAgICBpZiAoeSA8PSBjYW52YXMuaGVpZ2h0IC0gMTAwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgIGlkbGUgPSB0cnVlXG4gICAgICAgICAgICBwbGF5ZXIgPSBsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIgPyBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LmlkbGVMZWZ0KSA6IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmlkbGVSaWdodClcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgMTAwKVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbHNlIGlmIChsYXN0cHJlc3NlZCA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLmxlZnQuaWRsZUxlZnQpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICAgICAgLCAxMDApXG5cbiAgICAgICAgLy8gfVxuXG4gICAgfVxuXG59XG5cbmNvbnN0IHJ1bm5pbmdMZWZ0ID0gKCkgPT4ge1xuICAgIGlmIChsZWZ0cHJlc3NlZCAmJiBpZGxlID09IHRydWUgKSB7XG4gICAgICAgIGlkbGUgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gLTI1XG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcbiAgICAgICAgLy8gcmlnaHRwcmVzc2VkID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5ydW5MZWZ0KVxuICAgICAgICBpZiAodXBwcmVzc2VkKSB7XG4gICAgICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgICAgIH1cbiAgICB9IFxuICAgIGVsc2UgaWYgKGxlZnRwcmVzc2VkICYmIGlkbGUgPT0gZmFsc2UgJiYgbGFzdHByZXNzZWQgPT0gXCJyaWdodFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAtMjVcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcImxlZnRcIlxuICAgICAgICAvLyByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGFsbEZyYW1lU2V0cy5sZWZ0LnJ1bkxlZnQpXG4gICAgfVxufVxuXG5jb25zdCBiYXNpY0F0dGFja2luZyA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgaWYgKGJhc2ljQXR0YWNrICYmIGlkbGUgPT0gdHJ1ZSAmJiBsYXN0cHJlc3NlZCA9PSBcImxlZnRcIikge1xuICAgICAgICAvLyBiYXNpY0F0dGFjayA9IGZhbHNlXG4gICAgICAgIGxhc3RwcmVzc2VkID0gXCJsZWZ0XCJcblxuICAgICAgICBpZGxlID0gZmFsc2VcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihhbGxGcmFtZVNldHMubGVmdC5iYXNpY0FMKVxuXG4gICAgfSBcbiAgICBlbHNlIGlmIChiYXNpY0F0dGFjayAmJiBpZGxlID09IHRydWUgJiYgKGxhc3RwcmVzc2VkID09IFwicmlnaHRcIikgKSB7XG4gICAgICAgIC8vIGJhc2ljQXR0YWNrID0gZmFsc2VcbiAgICAgICAgbGFzdHByZXNzZWQgPSBcInJpZ2h0XCJcbiAgICAgICAgaWRsZSA9IGZhbHNlXG4gICAgICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoYWxsRnJhbWVTZXRzLnJpZ2h0LmJhc2ljQVIpXG4gICAgfVxuXG4gICAgXG59XG5cbmV4cG9ydCBjb25zdCBkcmF3ID0gKCkgPT4ge1xuXG4gICAgc2V0SWRsZSgpXG5cbiAgICAvL3J1bm5pbmcgYW5kIGxvb2tpbmcgcmlnaHRcbiAgICBydW5uaW5nUmlnaHQoKVxuICAgIGNvbnNvbGUubG9nKGxhc3RwcmVzc2VkKVxuICAgIC8vIGp1bXBpbmcgXG4gICAganVtcGluZygpXG4gIFxuICAgIC8vcnVubmluZyBhbmQgbG9va2luZyBsZWZ0XG4gICAgcnVubmluZ0xlZnQoKVxuXG4gICAgYmFzaWNBdHRhY2tpbmcoKVxuICAgIFxuIFxuICAgIGNvbnNvbGUubG9nKHBsYXllci5mcmFtZVZhbHVlKVxuICAgIC8vIGRyYXdpbmcgdGhlIHBsYXllciBcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gXCJzcmMvaW1hZ2VzL3Rhbmppcm9fc3ByaXRlLnBuZ1wiO1xuICAgICAgICAvLyBwaWNrcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgZnJhbWVzXG4gICAgbGV0IGZyYW1lID0gZnJhbWVzW3BsYXllci5mcmFtZVZhbHVlXVxuICAgICAgICAvLyBzdGFydHMgYW5pbWF0aW9uXG4gICAgcGxheWVyLnVwZGF0ZUFuaW1hdGlvbigpXG5cbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAvLyBwbGF5ZXIudXBkYXRlQW5pbWF0aW9uXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgZnJhbWUueCwgZnJhbWUueSwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCwgeCwgeSwgZnJhbWUuY2FudmFzV2lkdGgsIGZyYW1lLmNhbnZhc0hlaWdodClcbiAgICAgICAgLy8gY3R4LmRyYXdJbWFnZShpbWcsIDk4LCA0NjcsIDEyMCwgNzAsIHgsIHksIDE2MCwgMTAwKVxuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKGltZywgMiwgNDY3LCA3NiwgNzIsIHgsIHksIDk2LCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoaW1nLCAxOTksIDQ2NywgMTAwLCA3MCwgeCwgeSwgMTQwLCAxMDApXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoaW1nLCAyOTcsIDQ2NywgMTAwLCA3MCwgeCwgeSwgMTQwLCAxMDApXG4gICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgICAgICAvLyBncmF2aXR5XG4gICAgICAgIHkgKz0gMjUgXG4gICAgICAgIFxuICAgICAgICAvLyBjb2xsaXNpb24gY29udHJvbFxuICAgIGlmICh4ICsgMiA+IGNhbnZhcy53aWR0aCAtIDgwKSAoeCA9IGNhbnZhcy53aWR0aCAtIDgwKVxuXG4gICAgaWYgKHggLSAyIDwgMCkgKHggPSAwKVxuXG4gICAgaWYgKHkgKyA4ID4gY2FudmFzLmhlaWdodCAtIDEwMCApIHkgPSBjYW52YXMuaGVpZ2h0LTEwMFxuICAgICAgICAgLy8gY29sbGlzaW9uIGNvbnRyb2xcblxuICAgICAgICAvLyAgbW92aW5nIHJpZ2h0IGFuZCBsZWZ0XG4gICAgaWYgKGxlZnRwcmVzc2VkICYmIHJpZ2h0cHJlc3NlZCA9PT0gZmFsc2UpIHggKz0gdmVsb2NpdHlfeFxuICAgIGlmIChyaWdodHByZXNzZWQgJiYgbGVmdHByZXNzZWQgPT09IGZhbHNlKSB4ICs9IHZlbG9jaXR5X3hcbiAgICBpZiAodXBwcmVzc2VkICYmIHkgPT09IGNhbnZhcy5oZWlnaHQtMTAwKSB7XG4gICAgICAgIHkgLT04MFxuXG4gICAgfVxuICAgICAgICAgICAgLy8gIG1vdmluZyByaWdodCBhbmQgbGVmdFxufVxuXG5cbmNvbnN0IGtleURvd25IYW5kbGVyID0gKGUpID0+IHtcbiAgICBcbiAgICBcbiAgICBpZiAoZS5rZXkgPT0gXCJSaWdodFwiIHx8IGUua2V5ID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgIHJpZ2h0cHJlc3NlZCA9IHRydWVcbiAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAoKGUua2V5ID09IFwiVXBcIiB8fCBlLmtleSA9PSBcIkFycm93VXBcIikgJiYgKHVwcHJlc3NlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwcHJlc3NlZCA9IHRydWVcblxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIGxlZnRwcmVzc2VkID0gdHJ1ZVxuICAgIH1cblxuICAgIGVsc2UgaWYgKGUua2V5ID09IFwiYVwiIHx8IGUua2V5ID09IFwiS2V5QVwiKSB7XG4gICAgICAgIGJhc2ljQXR0YWNrID0gdHJ1ZVxuXG4gICAgfVxuXG4gICAgXG59XG5cbmNvbnN0IGtleVVwSGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09IFwiUmlnaHRcIiB8fCBlLmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICByaWdodHByZXNzZWQgPSBmYWxzZVxuICAgICAgICB2ZWxvY2l0eV94ID0gMFxuICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIlVwXCIgfHwgZS5rZXkgPT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgdXBwcmVzc2VkID0gZmFsc2VcbiAgICB9XG5cbiAgICBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIHZlbG9jaXR5X3ggPSAwXG4gICAgICAgIGxlZnRwcmVzc2VkID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT0gXCJhXCIgfHwgZS5rZXkgPT09IFwiS2V5QVwiKSB7XG4gICAgICAgIGJhc2ljQXR0YWNrID0gZmFsc2VcbiAgICAvLyAgICBsZXQgZmFjaW5nID0gbGFzdHByZXNzZWQgPT0gXCJsZWZ0XCIgPyBcImxlZnRcIiA6IFwicmlnaHRcIlxuICAgIC8vICAgIHNldFRpbWVvdXQoKCkgPT4gbGFzdHByZXNzZWQgPSBmYWNpbmcsIDEwMClcbiAgICB9XG5cbiAgICBcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGZhbHNlKTsiLCJcbiAgICBjbGFzcyBGcmFtZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNXaWR0aCwgY0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ID0geCBcbiAgICAgICAgICAgIHRoaXMueSA9IHkgXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gY1dpZHRoXG4gICAgICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgICB4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueFxuICAgICAgICB9XG4gICAgICAgIHkoKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnlcbiAgICAgICAgfVxuXG4gICAgICAgIGhlaWdodCgpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0XG4gICAgICAgIH0gXG4gICAgICAgIHdpZHRoKCl7XG4gICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBjYW52YXNXaWR0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhc1dpZHRoXG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzSGVpZ2h0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzSGVpZ2h0XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCBjb25zdCBmcmFtZXMgPSBbXG4gICAgbmV3IEZyYW1lKDAsIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSg2MiwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDEyNSwgNSwgNjAsIDcwLCA4MCwgMTAwKSwgIC8vIDAgaWRsZSByaWdodFxuICAgIG5ldyBGcmFtZSgxODksIDUsIDYwLCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyNTAsIDUsIDYwLCA3MCwgODAsIDEwMCksbmV3IEZyYW1lKCAzMTIsIDUsIDYwLCA3MCwgODAsIDEwMCksIC8vIDMgaWRsZSBsZWZ0XG4gICAgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDQwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgLy82IGp1bXAgcmlnaHRcbiAgICBuZXcgRnJhbWUoMjgwLCA3MCwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDI4MCwgNzAsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyODAsIDcwLCA1NSwgNzAsIDgwLCAxMDApLCAvLzkganVtcCByaWdodFxuICAgIG5ldyBGcmFtZSgxMDAsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDE2NCwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjI1LCAxMzMsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyODUsIDEzMywgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDMzNSwgMTMzLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMCwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNjIsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgLy8xMiBydW5ubmluZyByaWdodFxuICAgIG5ldyBGcmFtZSgxMTUsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDE3MCwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoMjI1LCAyMTIsIDU1LCA3MCwgODAsIDEwMCksIG5ldyBGcmFtZSgyNzcsIDIxMiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDMyNSwgMjEyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNCwgMjkyLCA1NSwgNzAsIDgwLCAxMDApLCBuZXcgRnJhbWUoNzUsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgLy8gMTkgYXR0YWNrbGVmdFxuICAgIG5ldyBGcmFtZSgyOTUsIDI5MiwgNTUsIDcwLCA4MCwgMTAwKSwgbmV3IEZyYW1lKDYsIDM4MCwgMTAwLCA3MCwgMTQwLCAxMDApLCBuZXcgRnJhbWUoMTM1LCAzODQsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IEZyYW1lKDIzMywgMzgyLCAxMDAsIDcwLCAxNDAsIDEwMCksICAgLy8yNiBiYXNpYyBhdHRhY2sgcmlnaHRcbiAgICBuZXcgRnJhbWUoMiwgNDY3LCA3NiwgNzIsIDk2LCAxMDApLCBuZXcgRnJhbWUoOTgsIDQ2NywgMTIwLCA3MCwgMTYwLCAxMDApLCBuZXcgRnJhbWUoMTk5LCA0NjcsIDEwMCwgNzAsIDE0MCwgMTAwKSwgbmV3IEZyYW1lKDI5NywgNDY3LCAxMDAsIDcwLCAxNDAsIDEwMCkgICAvLzMwIGJhc2ljIGF0dGFjayBsZWZ0XG5dXG4iLCJpbXBvcnQgeyBmcmFtZXMgfSBmcm9tIFwiLi9mcmFtZXNcIlxuXG5cblxuXG5jbGFzcyBQbGF5ZXIgeyBcbiAgICBjb25zdHJ1Y3RvcihmcmFtZVNldCwgbW9kZSA9IFwibG9vcFwiKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMFxuICAgICAgICAgICAgdGhpcy5kZWxheSA9IDFcbiAgICAgICAgICAgIHRoaXMuZnJhbWVJbmRleCA9IDBcbiAgICAgICAgICAgIHRoaXMuZnJhbWVTZXQgPSBmcmFtZVNldFxuICAgICAgICAgICAgdGhpcy5mcmFtZVZhbHVlID0gZnJhbWVTZXRbMF1cbiAgICAgICAgICAgIHRoaXMubW9kZSA9IG1vZGVcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnJhbWVWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVWYWx1ZVxuICAgIH1cblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9vcFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubG9vcCgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxheVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpXG4gICAgICAgICAgICAgICAgXCJicmVha1wiXG4gICAgICAgICAgICBjYXNlIFwicGF1c2VcIjpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5jb3VudCArK1xuXG4gICAgICAgIHRoaXMuZnJhbWVJbmRleCsrXG5cbiAgICAgICAgaWYgKHRoaXMuY291bnQgPiB0aGlzLmZyYW1lU2V0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsIFxuICAgICAgICB9ICBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lVmFsdWVbdGhpcy5mcmFtZUluZGV4XVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvb3AoKSB7XG4gICAgICAgIHRoaXMuY291bnQrK1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnJhbWVTZXQpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpXG5cbiAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gKHRoaXMuY291bnQgPiB0aGlzLmZyYW1lU2V0Lmxlbmd0aCAtIDEpID8gdGhpcy5jb3VudCA9IDAgOiB0aGlzLmZyYW1lSW5kZXggKyAxXG5cbiAgICAgICAgdGhpcy5mcmFtZVZhbHVlID0gdGhpcy5mcmFtZVNldFt0aGlzLmZyYW1lSW5kZXhdXG5cbiAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdXBkYXRlQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGUoKVxuICAgIH1cblxuXG59XG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRyYXcgfSBmcm9tIFwiLi9zY3JpcHRzL2FuaW1hdG9yXCJcblxuXG5cblxuY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChkcmF3LCAyMDApIl0sInNvdXJjZVJvb3QiOiIifQ==