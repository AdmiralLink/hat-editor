(function () {
  'use strict';

  /* eslint-disable */

  let Sortable = function() {  
      function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function (obj) {
            return typeof obj;
          };
        } else {
          _typeof = function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
        }
    
        return _typeof(obj);
      }
    
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
    
        return obj;
      }
    
      function _extends() {
        _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
    
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
    
          return target;
        };
    
        return _extends.apply(this, arguments);
      }
    
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          var ownKeys = Object.keys(source);
    
          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
              return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
          }
    
          ownKeys.forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        }
    
        return target;
      }
    
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
    
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }
    
        return target;
      }
    
      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};
    
        var target = _objectWithoutPropertiesLoose(source, excluded);
    
        var key, i;
    
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    
          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }
    
        return target;
      }
    
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
      }
    
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
    
          return arr2;
        }
      }
    
      function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
      }
    
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }
    
      var version = "1.10.2";
    
      function userAgent(pattern) {
        if (typeof window !== 'undefined' && window.navigator) {
          return !!
          /*@__PURE__*/
          navigator.userAgent.match(pattern);
        }
      }
    
      var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
      var Edge = userAgent(/Edge/i);
      var FireFox = userAgent(/firefox/i);
      var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
      var IOS = userAgent(/iP(ad|od|hone)/i);
      var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
    
      var captureMode = {
        capture: false,
        passive: false
      };
    
      function on(el, event, fn) {
        el.addEventListener(event, fn, !IE11OrLess && captureMode);
      }
    
      function off(el, event, fn) {
        el.removeEventListener(event, fn, !IE11OrLess && captureMode);
      }
    
      function matches(
      /**HTMLElement*/
      el,
      /**String*/
      selector) {
        if (!selector) return;
        selector[0] === '>' && (selector = selector.substring(1));
    
        if (el) {
          try {
            if (el.matches) {
              return el.matches(selector);
            } else if (el.msMatchesSelector) {
              return el.msMatchesSelector(selector);
            } else if (el.webkitMatchesSelector) {
              return el.webkitMatchesSelector(selector);
            }
          } catch (_) {
            return false;
          }
        }
    
        return false;
      }
    
      function getParentOrHost(el) {
        return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
      }
    
      function closest(
      /**HTMLElement*/
      el,
      /**String*/
      selector,
      /**HTMLElement*/
      ctx, includeCTX) {
        if (el) {
          ctx = ctx || document;
    
          do {
            if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
              return el;
            }
    
            if (el === ctx) break;
            /* jshint boss:true */
          } while (el = getParentOrHost(el));
        }
    
        return null;
      }
    
      var R_SPACE = /\s+/g;
    
      function toggleClass(el, name, state) {
        if (el && name) {
          if (el.classList) {
            el.classList[state ? 'add' : 'remove'](name);
          } else {
            var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
            el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
          }
        }
      }
    
      function css(el, prop, val) {
        var style = el && el.style;
    
        if (style) {
          if (val === void 0) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
              val = document.defaultView.getComputedStyle(el, '');
            } else if (el.currentStyle) {
              val = el.currentStyle;
            }
    
            return prop === void 0 ? val : val[prop];
          } else {
            if (!(prop in style) && prop.indexOf('webkit') === -1) {
              prop = '-webkit-' + prop;
            }
    
            style[prop] = val + (typeof val === 'string' ? '' : 'px');
          }
        }
      }
    
      function matrix(el, selfOnly) {
        var appliedTransforms = '';
    
        if (typeof el === 'string') {
          appliedTransforms = el;
        } else {
          do {
            var transform = css(el, 'transform');
    
            if (transform && transform !== 'none') {
              appliedTransforms = transform + ' ' + appliedTransforms;
            }
            /* jshint boss:true */
    
          } while (!selfOnly && (el = el.parentNode));
        }
    
        var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
        /*jshint -W056 */
    
        return matrixFn && new matrixFn(appliedTransforms);
      }
    
      function find(ctx, tagName, iterator) {
        if (ctx) {
          var list = ctx.getElementsByTagName(tagName),
              i = 0,
              n = list.length;
    
          if (iterator) {
            for (; i < n; i++) {
              iterator(list[i], i);
            }
          }
    
          return list;
        }
    
        return [];
      }
    
      function getWindowScrollingElement() {
        var scrollingElement = document.scrollingElement;
    
        if (scrollingElement) {
          return scrollingElement;
        } else {
          return document.documentElement;
        }
      }
      /**
       * Returns the "bounding client rect" of given element
       * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
       * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
       * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
       * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
       * @param  {[HTMLElement]} container              The parent the element will be placed in
       * @return {Object}                               The boundingClientRect of el, with specified adjustments
       */
    
    
      function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
        if (!el.getBoundingClientRect && el !== window) return;
        var elRect, top, left, bottom, right, height, width;
    
        if (el !== window && el !== getWindowScrollingElement()) {
          elRect = el.getBoundingClientRect();
          top = elRect.top;
          left = elRect.left;
          bottom = elRect.bottom;
          right = elRect.right;
          height = elRect.height;
          width = elRect.width;
        } else {
          top = 0;
          left = 0;
          bottom = window.innerHeight;
          right = window.innerWidth;
          height = window.innerHeight;
          width = window.innerWidth;
        }
    
        if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
          // Adjust for translate()
          container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
          // Not needed on <= IE11
    
          if (!IE11OrLess) {
            do {
              if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
                var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container
    
                top -= containerRect.top + parseInt(css(container, 'border-top-width'));
                left -= containerRect.left + parseInt(css(container, 'border-left-width'));
                bottom = top + elRect.height;
                right = left + elRect.width;
                break;
              }
              /* jshint boss:true */
    
            } while (container = container.parentNode);
          }
        }
    
        if (undoScale && el !== window) {
          // Adjust for scale()
          var elMatrix = matrix(container || el),
              scaleX = elMatrix && elMatrix.a,
              scaleY = elMatrix && elMatrix.d;
    
          if (elMatrix) {
            top /= scaleY;
            left /= scaleX;
            width /= scaleX;
            height /= scaleY;
            bottom = top + height;
            right = left + width;
          }
        }
    
        return {
          top: top,
          left: left,
          bottom: bottom,
          right: right,
          width: width,
          height: height
        };
      }
      /**
       * Checks if a side of an element is scrolled past a side of its parents
       * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
       * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
       * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
       * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
       */
    
    
      function isScrolledPast(el, elSide, parentSide) {
        var parent = getParentAutoScrollElement(el, true),
            elSideVal = getRect(el)[elSide];
        /* jshint boss:true */
    
        while (parent) {
          var parentSideVal = getRect(parent)[parentSide],
              visible = void 0;
    
          if (parentSide === 'top' || parentSide === 'left') {
            visible = elSideVal >= parentSideVal;
          } else {
            visible = elSideVal <= parentSideVal;
          }
    
          if (!visible) return parent;
          if (parent === getWindowScrollingElement()) break;
          parent = getParentAutoScrollElement(parent, false);
        }
    
        return false;
      }
      /**
       * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
       * and non-draggable elements
       * @param  {HTMLElement} el       The parent element
       * @param  {Number} childNum      The index of the child
       * @param  {Object} options       Parent Sortable's options
       * @return {HTMLElement}          The child at index childNum, or null if not found
       */
    
    
      function getChild(el, childNum, options) {
        var currentChild = 0,
            i = 0,
            children = el.children;
    
        while (i < children.length) {
          if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
            if (currentChild === childNum) {
              return children[i];
            }
    
            currentChild++;
          }
    
          i++;
        }
    
        return null;
      }
      /**
       * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
       * @param  {HTMLElement} el       Parent element
       * @param  {selector} selector    Any other elements that should be ignored
       * @return {HTMLElement}          The last child, ignoring ghostEl
       */
    
    
      function lastChild(el, selector) {
        var last = el.lastElementChild;
    
        while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
          last = last.previousElementSibling;
        }
    
        return last || null;
      }
      /**
       * Returns the index of an element within its parent for a selected set of
       * elements
       * @param  {HTMLElement} el
       * @param  {selector} selector
       * @return {number}
       */
    
    
      function index(el, selector) {
        var index = 0;
    
        if (!el || !el.parentNode) {
          return -1;
        }
        /* jshint boss:true */
    
    
        while (el = el.previousElementSibling) {
          if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
            index++;
          }
        }
    
        return index;
      }
      /**
       * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
       * The value is returned in real pixels.
       * @param  {HTMLElement} el
       * @return {Array}             Offsets in the format of [left, top]
       */
    
    
      function getRelativeScrollOffset(el) {
        var offsetLeft = 0,
            offsetTop = 0,
            winScroller = getWindowScrollingElement();
    
        if (el) {
          do {
            var elMatrix = matrix(el),
                scaleX = elMatrix.a,
                scaleY = elMatrix.d;
            offsetLeft += el.scrollLeft * scaleX;
            offsetTop += el.scrollTop * scaleY;
          } while (el !== winScroller && (el = el.parentNode));
        }
    
        return [offsetLeft, offsetTop];
      }
      /**
       * Returns the index of the object within the given array
       * @param  {Array} arr   Array that may or may not hold the object
       * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
       * @return {Number}      The index of the object in the array, or -1
       */
    
    
      function indexOfObject(arr, obj) {
        for (var i in arr) {
          if (!arr.hasOwnProperty(i)) continue;
    
          for (var key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
          }
        }
    
        return -1;
      }
    
      function getParentAutoScrollElement(el, includeSelf) {
        // skip to window
        if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
        var elem = el;
        var gotSelf = false;
    
        do {
          // we don't need to get elem css if it isn't even overflowing in the first place (performance)
          if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
            var elemCSS = css(elem);
    
            if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
              if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
              if (gotSelf || includeSelf) return elem;
              gotSelf = true;
            }
          }
          /* jshint boss:true */
    
        } while (elem = elem.parentNode);
    
        return getWindowScrollingElement();
      }
    
      function extend(dst, src) {
        if (dst && src) {
          for (var key in src) {
            if (src.hasOwnProperty(key)) {
              dst[key] = src[key];
            }
          }
        }
    
        return dst;
      }
    
      function isRectEqual(rect1, rect2) {
        return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
      }
    
      var _throttleTimeout;
    
      function throttle(callback, ms) {
        return function () {
          if (!_throttleTimeout) {
            var args = arguments,
                _this = this;
    
            if (args.length === 1) {
              callback.call(_this, args[0]);
            } else {
              callback.apply(_this, args);
            }
    
            _throttleTimeout = setTimeout(function () {
              _throttleTimeout = void 0;
            }, ms);
          }
        };
      }
    
      function cancelThrottle() {
        clearTimeout(_throttleTimeout);
        _throttleTimeout = void 0;
      }
    
      function scrollBy(el, x, y) {
        el.scrollLeft += x;
        el.scrollTop += y;
      }
    
      function clone(el) {
        var Polymer = window.Polymer;
        var $ = window.jQuery || window.Zepto;
    
        if (Polymer && Polymer.dom) {
          return Polymer.dom(el).cloneNode(true);
        } else if ($) {
          return $(el).clone(true)[0];
        } else {
          return el.cloneNode(true);
        }
      }
    
      function setRect(el, rect) {
        css(el, 'position', 'absolute');
        css(el, 'top', rect.top);
        css(el, 'left', rect.left);
        css(el, 'width', rect.width);
        css(el, 'height', rect.height);
      }
    
      function unsetRect(el) {
        css(el, 'position', '');
        css(el, 'top', '');
        css(el, 'left', '');
        css(el, 'width', '');
        css(el, 'height', '');
      }
    
      var expando = 'Sortable' + new Date().getTime();
    
      function AnimationStateManager() {
        var animationStates = [],
            animationCallbackId;
        return {
          captureAnimationState: function captureAnimationState() {
            animationStates = [];
            if (!this.options.animation) return;
            var children = [].slice.call(this.el.children);
            children.forEach(function (child) {
              if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
              animationStates.push({
                target: child,
                rect: getRect(child)
              });
    
              var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation
    
    
              if (child.thisAnimationDuration) {
                var childMatrix = matrix(child, true);
    
                if (childMatrix) {
                  fromRect.top -= childMatrix.f;
                  fromRect.left -= childMatrix.e;
                }
              }
    
              child.fromRect = fromRect;
            });
          },
          addAnimationState: function addAnimationState(state) {
            animationStates.push(state);
          },
          removeAnimationState: function removeAnimationState(target) {
            animationStates.splice(indexOfObject(animationStates, {
              target: target
            }), 1);
          },
          animateAll: function animateAll(callback) {
            var _this = this;
    
            if (!this.options.animation) {
              clearTimeout(animationCallbackId);
              if (typeof callback === 'function') callback();
              return;
            }
    
            var animating = false,
                animationTime = 0;
            animationStates.forEach(function (state) {
              var time = 0,
                  target = state.target,
                  fromRect = target.fromRect,
                  toRect = getRect(target),
                  prevFromRect = target.prevFromRect,
                  prevToRect = target.prevToRect,
                  animatingRect = state.rect,
                  targetMatrix = matrix(target, true);
    
              if (targetMatrix) {
                // Compensate for current animation
                toRect.top -= targetMatrix.f;
                toRect.left -= targetMatrix.e;
              }
    
              target.toRect = toRect;
    
              if (target.thisAnimationDuration) {
                // Could also check if animatingRect is between fromRect and toRect
                if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
                (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
                  // If returning to same place as started from animation and on same axis
                  time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
                }
              } // if fromRect != toRect: animate
    
    
              if (!isRectEqual(toRect, fromRect)) {
                target.prevFromRect = fromRect;
                target.prevToRect = toRect;
    
                if (!time) {
                  time = _this.options.animation;
                }
    
                _this.animate(target, animatingRect, toRect, time);
              }
    
              if (time) {
                animating = true;
                animationTime = Math.max(animationTime, time);
                clearTimeout(target.animationResetTimer);
                target.animationResetTimer = setTimeout(function () {
                  target.animationTime = 0;
                  target.prevFromRect = null;
                  target.fromRect = null;
                  target.prevToRect = null;
                  target.thisAnimationDuration = null;
                }, time);
                target.thisAnimationDuration = time;
              }
            });
            clearTimeout(animationCallbackId);
    
            if (!animating) {
              if (typeof callback === 'function') callback();
            } else {
              animationCallbackId = setTimeout(function () {
                if (typeof callback === 'function') callback();
              }, animationTime);
            }
    
            animationStates = [];
          },
          animate: function animate(target, currentRect, toRect, duration) {
            if (duration) {
              css(target, 'transition', '');
              css(target, 'transform', '');
              var elMatrix = matrix(this.el),
                  scaleX = elMatrix && elMatrix.a,
                  scaleY = elMatrix && elMatrix.d,
                  translateX = (currentRect.left - toRect.left) / (scaleX || 1),
                  translateY = (currentRect.top - toRect.top) / (scaleY || 1);
              target.animatingX = !!translateX;
              target.animatingY = !!translateY;
              css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
              repaint(target); // repaint
    
              css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
              css(target, 'transform', 'translate3d(0,0,0)');
              typeof target.animated === 'number' && clearTimeout(target.animated);
              target.animated = setTimeout(function () {
                css(target, 'transition', '');
                css(target, 'transform', '');
                target.animated = false;
                target.animatingX = false;
                target.animatingY = false;
              }, duration);
            }
          }
        };
      }
    
      function repaint(target) {
        return target.offsetWidth;
      }
    
      function calculateRealTime(animatingRect, fromRect, toRect, options) {
        return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
      }
    
      var plugins = [];
      var defaults = {
        initializeByDefault: true
      };
      var PluginManager = {
        mount: function mount(plugin) {
          // Set default static properties
          for (var option in defaults) {
            if (defaults.hasOwnProperty(option) && !(option in plugin)) {
              plugin[option] = defaults[option];
            }
          }
    
          plugins.push(plugin);
        },
        pluginEvent: function pluginEvent(eventName, sortable, evt) {
          var _this = this;
    
          this.eventCanceled = false;
    
          evt.cancel = function () {
            _this.eventCanceled = true;
          };
    
          var eventNameGlobal = eventName + 'Global';
          plugins.forEach(function (plugin) {
            if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable
    
            if (sortable[plugin.pluginName][eventNameGlobal]) {
              sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
                sortable: sortable
              }, evt));
            } // Only fire plugin event if plugin is enabled in this sortable,
            // and plugin has event defined
    
    
            if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
              sortable[plugin.pluginName][eventName](_objectSpread({
                sortable: sortable
              }, evt));
            }
          });
        },
        initializePlugins: function initializePlugins(sortable, el, defaults, options) {
          plugins.forEach(function (plugin) {
            var pluginName = plugin.pluginName;
            if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
            var initialized = new plugin(sortable, el, sortable.options);
            initialized.sortable = sortable;
            initialized.options = sortable.options;
            sortable[pluginName] = initialized; // Add default options from plugin
    
            _extends(defaults, initialized.defaults);
          });
    
          for (var option in sortable.options) {
            if (!sortable.options.hasOwnProperty(option)) continue;
            var modified = this.modifyOption(sortable, option, sortable.options[option]);
    
            if (typeof modified !== 'undefined') {
              sortable.options[option] = modified;
            }
          }
        },
        getEventProperties: function getEventProperties(name, sortable) {
          var eventProperties = {};
          plugins.forEach(function (plugin) {
            if (typeof plugin.eventProperties !== 'function') return;
    
            _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
          });
          return eventProperties;
        },
        modifyOption: function modifyOption(sortable, name, value) {
          var modifiedValue;
          plugins.forEach(function (plugin) {
            // Plugin must exist on the Sortable
            if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin
    
            if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
              modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
            }
          });
          return modifiedValue;
        }
      };
    
      function dispatchEvent(_ref) {
        var sortable = _ref.sortable,
            rootEl = _ref.rootEl,
            name = _ref.name,
            targetEl = _ref.targetEl,
            cloneEl = _ref.cloneEl,
            toEl = _ref.toEl,
            fromEl = _ref.fromEl,
            oldIndex = _ref.oldIndex,
            newIndex = _ref.newIndex,
            oldDraggableIndex = _ref.oldDraggableIndex,
            newDraggableIndex = _ref.newDraggableIndex,
            originalEvent = _ref.originalEvent,
            putSortable = _ref.putSortable,
            extraEventProperties = _ref.extraEventProperties;
        sortable = sortable || rootEl && rootEl[expando];
        if (!sortable) return;
        var evt,
            options = sortable.options,
            onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature
    
        if (window.CustomEvent && !IE11OrLess && !Edge) {
          evt = new CustomEvent(name, {
            bubbles: true,
            cancelable: true
          });
        } else {
          evt = document.createEvent('Event');
          evt.initEvent(name, true, true);
        }
    
        evt.to = toEl || rootEl;
        evt.from = fromEl || rootEl;
        evt.item = targetEl || rootEl;
        evt.clone = cloneEl;
        evt.oldIndex = oldIndex;
        evt.newIndex = newIndex;
        evt.oldDraggableIndex = oldDraggableIndex;
        evt.newDraggableIndex = newDraggableIndex;
        evt.originalEvent = originalEvent;
        evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;
    
        var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));
    
        for (var option in allEventProperties) {
          evt[option] = allEventProperties[option];
        }
    
        if (rootEl) {
          rootEl.dispatchEvent(evt);
        }
    
        if (options[onName]) {
          options[onName].call(sortable, evt);
        }
      }
    
      var pluginEvent = function pluginEvent(eventName, sortable) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            originalEvent = _ref.evt,
            data = _objectWithoutProperties(_ref, ["evt"]);
    
        PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
          dragEl: dragEl,
          parentEl: parentEl,
          ghostEl: ghostEl,
          rootEl: rootEl,
          nextEl: nextEl,
          lastDownEl: lastDownEl,
          cloneEl: cloneEl,
          cloneHidden: cloneHidden,
          dragStarted: moved,
          putSortable: putSortable,
          activeSortable: Sortable.active,
          originalEvent: originalEvent,
          oldIndex: oldIndex,
          oldDraggableIndex: oldDraggableIndex,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          hideGhostForTarget: _hideGhostForTarget,
          unhideGhostForTarget: _unhideGhostForTarget,
          cloneNowHidden: function cloneNowHidden() {
            cloneHidden = true;
          },
          cloneNowShown: function cloneNowShown() {
            cloneHidden = false;
          },
          dispatchSortableEvent: function dispatchSortableEvent(name) {
            _dispatchEvent({
              sortable: sortable,
              name: name,
              originalEvent: originalEvent
            });
          }
        }, data));
      };
    
      function _dispatchEvent(info) {
        dispatchEvent(_objectSpread({
          putSortable: putSortable,
          cloneEl: cloneEl,
          targetEl: dragEl,
          rootEl: rootEl,
          oldIndex: oldIndex,
          oldDraggableIndex: oldDraggableIndex,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex
        }, info));
      }
    
      var dragEl,
          parentEl,
          ghostEl,
          rootEl,
          nextEl,
          lastDownEl,
          cloneEl,
          cloneHidden,
          oldIndex,
          newIndex,
          oldDraggableIndex,
          newDraggableIndex,
          activeGroup,
          putSortable,
          awaitingDragStarted = false,
          ignoreNextClick = false,
          sortables = [],
          tapEvt,
          touchEvt,
          lastDx,
          lastDy,
          tapDistanceLeft,
          tapDistanceTop,
          moved,
          lastTarget,
          lastDirection,
          pastFirstInvertThresh = false,
          isCircumstantialInvert = false,
          targetMoveDistance,
          // For positioning ghost absolutely
      ghostRelativeParent,
          ghostRelativeParentInitialScroll = [],
          // (left, top)
      _silent = false,
          savedInputChecked = [];
      /** @const */
    
      var documentExists = typeof document !== 'undefined',
          PositionGhostAbsolutely = IOS,
          CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
          // This will not pass for IE9, because IE9 DnD only works on anchors
      supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
          supportCssPointerEvents = function () {
        if (!documentExists) return; // false when <= IE11
    
        if (IE11OrLess) {
          return false;
        }
    
        var el = document.createElement('x');
        el.style.cssText = 'pointer-events:auto';
        return el.style.pointerEvents === 'auto';
      }(),
          _detectDirection = function _detectDirection(el, options) {
        var elCSS = css(el),
            elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
            child1 = getChild(el, 0, options),
            child2 = getChild(el, 1, options),
            firstChildCSS = child1 && css(child1),
            secondChildCSS = child2 && css(child2),
            firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
            secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    
        if (elCSS.display === 'flex') {
          return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
        }
    
        if (elCSS.display === 'grid') {
          return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
        }
    
        if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
          var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
          return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
        }
    
        return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
      },
          _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
        var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
            dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
            dragElOppLength = vertical ? dragRect.width : dragRect.height,
            targetS1Opp = vertical ? targetRect.left : targetRect.top,
            targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
            targetOppLength = vertical ? targetRect.width : targetRect.height;
        return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
      },
    
      /**
       * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
       * @param  {Number} x      X position
       * @param  {Number} y      Y position
       * @return {HTMLElement}   Element of the first found nearest Sortable
       */
      _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
        var ret;
        sortables.some(function (sortable) {
          if (lastChild(sortable)) return;
          var rect = getRect(sortable),
              threshold = sortable[expando].options.emptyInsertThreshold,
              insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
              insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    
          if (threshold && insideHorizontally && insideVertically) {
            return ret = sortable;
          }
        });
        return ret;
      },
          _prepareGroup = function _prepareGroup(options) {
        function toFn(value, pull) {
          return function (to, from, dragEl, evt) {
            var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
    
            if (value == null && (pull || sameGroup)) {
              // Default pull value
              // Default pull and put value if same group
              return true;
            } else if (value == null || value === false) {
              return false;
            } else if (pull && value === 'clone') {
              return value;
            } else if (typeof value === 'function') {
              return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
            } else {
              var otherGroup = (pull ? to : from).options.group.name;
              return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
            }
          };
        }
    
        var group = {};
        var originalGroup = options.group;
    
        if (!originalGroup || _typeof(originalGroup) != 'object') {
          originalGroup = {
            name: originalGroup
          };
        }
    
        group.name = originalGroup.name;
        group.checkPull = toFn(originalGroup.pull, true);
        group.checkPut = toFn(originalGroup.put);
        group.revertClone = originalGroup.revertClone;
        options.group = group;
      },
          _hideGhostForTarget = function _hideGhostForTarget() {
        if (!supportCssPointerEvents && ghostEl) {
          css(ghostEl, 'display', 'none');
        }
      },
          _unhideGhostForTarget = function _unhideGhostForTarget() {
        if (!supportCssPointerEvents && ghostEl) {
          css(ghostEl, 'display', '');
        }
      }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position
    
    
      if (documentExists) {
        document.addEventListener('click', function (evt) {
          if (ignoreNextClick) {
            evt.preventDefault();
            evt.stopPropagation && evt.stopPropagation();
            evt.stopImmediatePropagation && evt.stopImmediatePropagation();
            ignoreNextClick = false;
            return false;
          }
        }, true);
      }
    
      var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
        if (dragEl) {
          evt = evt.touches ? evt.touches[0] : evt;
    
          var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    
          if (nearest) {
            // Create imitation event
            var event = {};
    
            for (var i in evt) {
              if (evt.hasOwnProperty(i)) {
                event[i] = evt[i];
              }
            }
    
            event.target = event.rootEl = nearest;
            event.preventDefault = void 0;
            event.stopPropagation = void 0;
    
            nearest[expando]._onDragOver(event);
          }
        }
      };
    
      var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
        if (dragEl) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        }
      };
      /**
       * @class  Sortable
       * @param  {HTMLElement}  el
       * @param  {Object}       [options]
       */
    
    
      function Sortable(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
          throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
        }
    
        this.el = el; // root element
    
        this.options = options = _extends({}, options); // Export instance
    
        el[expando] = this;
        var defaults = {
          group: null,
          sort: true,
          disabled: false,
          store: null,
          handle: null,
          draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
          swapThreshold: 1,
          // percentage; 0 <= x <= 1
          invertSwap: false,
          // invert always
          invertedSwapThreshold: null,
          // will be set to same as swapThreshold if default
          removeCloneOnHide: true,
          direction: function direction() {
            return _detectDirection(el, this.options);
          },
          ghostClass: 'sortable-ghost',
          chosenClass: 'sortable-chosen',
          dragClass: 'sortable-drag',
          ignore: 'a, img',
          filter: null,
          preventOnFilter: true,
          animation: 0,
          easing: null,
          setData: function setData(dataTransfer, dragEl) {
            dataTransfer.setData('Text', dragEl.textContent);
          },
          dropBubble: false,
          dragoverBubble: false,
          dataIdAttr: 'data-id',
          delay: 0,
          delayOnTouchOnly: false,
          touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
          forceFallback: false,
          fallbackClass: 'sortable-fallback',
          fallbackOnBody: false,
          fallbackTolerance: 0,
          fallbackOffset: {
            x: 0,
            y: 0
          },
          supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
          emptyInsertThreshold: 5
        };
        PluginManager.initializePlugins(this, el, defaults); // Set default options
    
        for (var name in defaults) {
          !(name in options) && (options[name] = defaults[name]);
        }
    
        _prepareGroup(options); // Bind all private methods
    
    
        for (var fn in this) {
          if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
            this[fn] = this[fn].bind(this);
          }
        } // Setup drag mode
    
    
        this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    
        if (this.nativeDraggable) {
          // Touch start threshold cannot be greater than the native dragstart threshold
          this.options.touchStartThreshold = 1;
        } // Bind events
    
    
        if (options.supportPointer) {
          on(el, 'pointerdown', this._onTapStart);
        } else {
          on(el, 'mousedown', this._onTapStart);
          on(el, 'touchstart', this._onTapStart);
        }
    
        if (this.nativeDraggable) {
          on(el, 'dragover', this);
          on(el, 'dragenter', this);
        }
    
        sortables.push(this.el); // Restore sorting
    
        options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager
    
        _extends(this, AnimationStateManager());
      }
    
      Sortable.prototype =
      /** @lends Sortable.prototype */
      {
        constructor: Sortable,
        _isOutsideThisEl: function _isOutsideThisEl(target) {
          if (!this.el.contains(target) && target !== this.el) {
            lastTarget = null;
          }
        },
        _getDirection: function _getDirection(evt, target) {
          return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
        },
        _onTapStart: function _onTapStart(
        /** Event|TouchEvent */
        evt) {
          if (!evt.cancelable) return;
    
          var _this = this,
              el = this.el,
              options = this.options,
              preventOnFilter = options.preventOnFilter,
              type = evt.type,
              touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
              target = (touch || evt).target,
              originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
              filter = options.filter;
    
          _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
    
    
          if (dragEl) {
            return;
          }
    
          if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
            return; // only left button and enabled
          } // cancel dnd if original target is content editable
    
    
          if (originalTarget.isContentEditable) {
            return;
          }
    
          target = closest(target, options.draggable, el, false);
    
          if (target && target.animated) {
            return;
          }
    
          if (lastDownEl === target) {
            // Ignoring duplicate `down`
            return;
          } // Get the index of the dragged element within its parent
    
    
          oldIndex = index(target);
          oldDraggableIndex = index(target, options.draggable); // Check filter
    
          if (typeof filter === 'function') {
            if (filter.call(this, evt, target, this)) {
              _dispatchEvent({
                sortable: _this,
                rootEl: originalTarget,
                name: 'filter',
                targetEl: target,
                toEl: el,
                fromEl: el
              });
    
              pluginEvent('filter', _this, {
                evt: evt
              });
              preventOnFilter && evt.cancelable && evt.preventDefault();
              return; // cancel dnd
            }
          } else if (filter) {
            filter = filter.split(',').some(function (criteria) {
              criteria = closest(originalTarget, criteria.trim(), el, false);
    
              if (criteria) {
                _dispatchEvent({
                  sortable: _this,
                  rootEl: criteria,
                  name: 'filter',
                  targetEl: target,
                  fromEl: el,
                  toEl: el
                });
    
                pluginEvent('filter', _this, {
                  evt: evt
                });
                return true;
              }
            });
    
            if (filter) {
              preventOnFilter && evt.cancelable && evt.preventDefault();
              return; // cancel dnd
            }
          }
          if (options.handle && !closest(originalTarget, options.handle, el, false)) {
            return;
          } // Prepare `dragstart`
    
    
          this._prepareDragStart(evt, touch, target);
        },
        _prepareDragStart: function _prepareDragStart(
        /** Event */
        evt,
        /** Touch */
        touch,
        /** HTMLElement */
        target) {
          var _this = this,
              el = _this.el,
              options = _this.options,
              ownerDocument = el.ownerDocument,
              dragStartFn;
    
          if (target && !dragEl && target.parentNode === el) {
            var dragRect = getRect(target);
            rootEl = el;
            dragEl = target;
            parentEl = dragEl.parentNode;
            nextEl = dragEl.nextSibling;
            lastDownEl = target;
            activeGroup = options.group;
            Sortable.dragged = dragEl;
            tapEvt = {
              target: dragEl,
              clientX: (touch || evt).clientX,
              clientY: (touch || evt).clientY
            };
            tapDistanceLeft = tapEvt.clientX - dragRect.left;
            tapDistanceTop = tapEvt.clientY - dragRect.top;
            this._lastX = (touch || evt).clientX;
            this._lastY = (touch || evt).clientY;
            dragEl.style['will-change'] = 'all';
    
            dragStartFn = function dragStartFn() {
              pluginEvent('delayEnded', _this, {
                evt: evt
              });
    
              if (Sortable.eventCanceled) {
                _this._onDrop();
    
                return;
              } // Delayed drag has been triggered
              // we can re-enable the events: touchmove/mousemove
    
    
              _this._disableDelayedDragEvents();
    
              if (!FireFox && _this.nativeDraggable) {
                dragEl.draggable = true;
              } // Bind the events: dragstart/dragend
    
    
              _this._triggerDragStart(evt, touch); // Drag start event
    
    
              _dispatchEvent({
                sortable: _this,
                name: 'choose',
                originalEvent: evt
              }); // Chosen item
    
    
              toggleClass(dragEl, options.chosenClass, true);
            }; // Disable "draggable"
    
    
            options.ignore.split(',').forEach(function (criteria) {
              find(dragEl, criteria.trim(), _disableDraggable);
            });
            on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
            on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
            on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
            on(ownerDocument, 'mouseup', _this._onDrop);
            on(ownerDocument, 'touchend', _this._onDrop);
            on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)
    
            if (FireFox && this.nativeDraggable) {
              this.options.touchStartThreshold = 4;
              dragEl.draggable = true;
            }
    
            pluginEvent('delayStart', this, {
              evt: evt
            }); // Delay is impossible for native DnD in Edge or IE
    
            if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
              if (Sortable.eventCanceled) {
                this._onDrop();
    
                return;
              } // If the user moves the pointer or let go the click or touch
              // before the delay has been reached:
              // disable the delayed drag
    
    
              on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
              on(ownerDocument, 'touchend', _this._disableDelayedDrag);
              on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
              on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
              on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
              options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
              _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
            } else {
              dragStartFn();
            }
          }
        },
        _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
        /** TouchEvent|PointerEvent **/
        e) {
          var touch = e.touches ? e.touches[0] : e;
    
          if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
            this._disableDelayedDrag();
          }
        },
        _disableDelayedDrag: function _disableDelayedDrag() {
          dragEl && _disableDraggable(dragEl);
          clearTimeout(this._dragStartTimer);
    
          this._disableDelayedDragEvents();
        },
        _disableDelayedDragEvents: function _disableDelayedDragEvents() {
          var ownerDocument = this.el.ownerDocument;
          off(ownerDocument, 'mouseup', this._disableDelayedDrag);
          off(ownerDocument, 'touchend', this._disableDelayedDrag);
          off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
          off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
          off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
          off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
        },
        _triggerDragStart: function _triggerDragStart(
        /** Event */
        evt,
        /** Touch */
        touch) {
          touch = touch || evt.pointerType == 'touch' && evt;
    
          if (!this.nativeDraggable || touch) {
            if (this.options.supportPointer) {
              on(document, 'pointermove', this._onTouchMove);
            } else if (touch) {
              on(document, 'touchmove', this._onTouchMove);
            } else {
              on(document, 'mousemove', this._onTouchMove);
            }
          } else {
            on(dragEl, 'dragend', this);
            on(rootEl, 'dragstart', this._onDragStart);
          }
    
          try {
            if (document.selection) {
              // Timeout neccessary for IE9
              _nextTick(function () {
                document.selection.empty();
              });
            } else {
              window.getSelection().removeAllRanges();
            }
          } catch (err) {}
        },
        _dragStarted: function _dragStarted(fallback, evt) {
    
          awaitingDragStarted = false;
    
          if (rootEl && dragEl) {
            pluginEvent('dragStarted', this, {
              evt: evt
            });
    
            if (this.nativeDraggable) {
              on(document, 'dragover', _checkOutsideTargetEl);
            }
    
            var options = this.options; // Apply effect
    
            !fallback && toggleClass(dragEl, options.dragClass, false);
            toggleClass(dragEl, options.ghostClass, true);
            Sortable.active = this;
            fallback && this._appendGhost(); // Drag start event
    
            _dispatchEvent({
              sortable: this,
              name: 'start',
              originalEvent: evt
            });
          } else {
            this._nulling();
          }
        },
        _emulateDragOver: function _emulateDragOver() {
          if (touchEvt) {
            this._lastX = touchEvt.clientX;
            this._lastY = touchEvt.clientY;
    
            _hideGhostForTarget();
    
            var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
            var parent = target;
    
            while (target && target.shadowRoot) {
              target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
              if (target === parent) break;
              parent = target;
            }
    
            dragEl.parentNode[expando]._isOutsideThisEl(target);
    
            if (parent) {
              do {
                if (parent[expando]) {
                  var inserted = void 0;
                  inserted = parent[expando]._onDragOver({
                    clientX: touchEvt.clientX,
                    clientY: touchEvt.clientY,
                    target: target,
                    rootEl: parent
                  });
    
                  if (inserted && !this.options.dragoverBubble) {
                    break;
                  }
                }
    
                target = parent; // store last element
              }
              /* jshint boss:true */
              while (parent = parent.parentNode);
            }
    
            _unhideGhostForTarget();
          }
        },
        _onTouchMove: function _onTouchMove(
        /**TouchEvent*/
        evt) {
          if (tapEvt) {
            var options = this.options,
                fallbackTolerance = options.fallbackTolerance,
                fallbackOffset = options.fallbackOffset,
                touch = evt.touches ? evt.touches[0] : evt,
                ghostMatrix = ghostEl && matrix(ghostEl, true),
                scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
                scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
                relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
                dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
                dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging
    
            if (!Sortable.active && !awaitingDragStarted) {
              if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
                return;
              }
    
              this._onDragStart(evt, true);
            }
    
            if (ghostEl) {
              if (ghostMatrix) {
                ghostMatrix.e += dx - (lastDx || 0);
                ghostMatrix.f += dy - (lastDy || 0);
              } else {
                ghostMatrix = {
                  a: 1,
                  b: 0,
                  c: 0,
                  d: 1,
                  e: dx,
                  f: dy
                };
              }
    
              var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
              css(ghostEl, 'webkitTransform', cssMatrix);
              css(ghostEl, 'mozTransform', cssMatrix);
              css(ghostEl, 'msTransform', cssMatrix);
              css(ghostEl, 'transform', cssMatrix);
              lastDx = dx;
              lastDy = dy;
              touchEvt = touch;
            }
    
            evt.cancelable && evt.preventDefault();
          }
        },
        _appendGhost: function _appendGhost() {
          // Bug if using scale(): https://stackoverflow.com/questions/2637058
          // Not being adjusted for
          if (!ghostEl) {
            var container = this.options.fallbackOnBody ? document.body : rootEl,
                rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
                options = this.options; // Position absolutely
    
            if (PositionGhostAbsolutely) {
              // Get relatively positioned parent
              ghostRelativeParent = container;
    
              while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
                ghostRelativeParent = ghostRelativeParent.parentNode;
              }
    
              if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
                if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
                rect.top += ghostRelativeParent.scrollTop;
                rect.left += ghostRelativeParent.scrollLeft;
              } else {
                ghostRelativeParent = getWindowScrollingElement();
              }
    
              ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
            }
    
            ghostEl = dragEl.cloneNode(true);
            toggleClass(ghostEl, options.ghostClass, false);
            toggleClass(ghostEl, options.fallbackClass, true);
            toggleClass(ghostEl, options.dragClass, true);
            css(ghostEl, 'transition', '');
            css(ghostEl, 'transform', '');
            css(ghostEl, 'box-sizing', 'border-box');
            css(ghostEl, 'margin', 0);
            css(ghostEl, 'top', rect.top);
            css(ghostEl, 'left', rect.left);
            css(ghostEl, 'width', rect.width);
            css(ghostEl, 'height', rect.height);
            css(ghostEl, 'opacity', '0.8');
            css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
            css(ghostEl, 'zIndex', '100000');
            css(ghostEl, 'pointerEvents', 'none');
            Sortable.ghost = ghostEl;
            container.appendChild(ghostEl); // Set transform-origin
    
            css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
          }
        },
        _onDragStart: function _onDragStart(
        /**Event*/
        evt,
        /**boolean*/
        fallback) {
          var _this = this;
    
          var dataTransfer = evt.dataTransfer;
          var options = _this.options;
          pluginEvent('dragStart', this, {
            evt: evt
          });
    
          if (Sortable.eventCanceled) {
            this._onDrop();
    
            return;
          }
    
          pluginEvent('setupClone', this);
    
          if (!Sortable.eventCanceled) {
            cloneEl = clone(dragEl);
            cloneEl.draggable = false;
            cloneEl.style['will-change'] = '';
    
            this._hideClone();
    
            toggleClass(cloneEl, this.options.chosenClass, false);
            Sortable.clone = cloneEl;
          } // #1143: IFrame support workaround
    
    
          _this.cloneId = _nextTick(function () {
            pluginEvent('clone', _this);
            if (Sortable.eventCanceled) return;
    
            if (!_this.options.removeCloneOnHide) {
              rootEl.insertBefore(cloneEl, dragEl);
            }
    
            _this._hideClone();
    
            _dispatchEvent({
              sortable: _this,
              name: 'clone'
            });
          });
          !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events
    
          if (fallback) {
            ignoreNextClick = true;
            _this._loopId = setInterval(_this._emulateDragOver, 50);
          } else {
            // Undo what was set in _prepareDragStart before drag started
            off(document, 'mouseup', _this._onDrop);
            off(document, 'touchend', _this._onDrop);
            off(document, 'touchcancel', _this._onDrop);
    
            if (dataTransfer) {
              dataTransfer.effectAllowed = 'move';
              options.setData && options.setData.call(_this, dataTransfer, dragEl);
            }
    
            on(document, 'drop', _this); // #1276 fix:
    
            css(dragEl, 'transform', 'translateZ(0)');
          }
    
          awaitingDragStarted = true;
          _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
          on(document, 'selectstart', _this);
          moved = true;
    
          if (Safari) {
            css(document.body, 'user-select', 'none');
          }
        },
        // Returns true - if no further action is needed (either inserted or another condition)
        _onDragOver: function _onDragOver(
        /**Event*/
        evt) {
          var el = this.el,
              target = evt.target,
              dragRect,
              targetRect,
              revert,
              options = this.options,
              group = options.group,
              activeSortable = Sortable.active,
              isOwner = activeGroup === group,
              canSort = options.sort,
              fromSortable = putSortable || activeSortable,
              vertical,
              _this = this,
              completedFired = false;
    
          if (_silent) return;
    
          function dragOverEvent(name, extra) {
            pluginEvent(name, _this, _objectSpread({
              evt: evt,
              isOwner: isOwner,
              axis: vertical ? 'vertical' : 'horizontal',
              revert: revert,
              dragRect: dragRect,
              targetRect: targetRect,
              canSort: canSort,
              fromSortable: fromSortable,
              target: target,
              completed: completed,
              onMove: function onMove(target, after) {
                return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
              },
              changed: changed
            }, extra));
          } // Capture animation state
    
    
          function capture() {
            dragOverEvent('dragOverAnimationCapture');
    
            _this.captureAnimationState();
    
            if (_this !== fromSortable) {
              fromSortable.captureAnimationState();
            }
          } // Return invocation when dragEl is inserted (or completed)
    
    
          function completed(insertion) {
            dragOverEvent('dragOverCompleted', {
              insertion: insertion
            });
    
            if (insertion) {
              // Clones must be hidden before folding animation to capture dragRectAbsolute properly
              if (isOwner) {
                activeSortable._hideClone();
              } else {
                activeSortable._showClone(_this);
              }
    
              if (_this !== fromSortable) {
                // Set ghost class to new sortable's ghost class
                toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
                toggleClass(dragEl, options.ghostClass, true);
              }
    
              if (putSortable !== _this && _this !== Sortable.active) {
                putSortable = _this;
              } else if (_this === Sortable.active && putSortable) {
                putSortable = null;
              } // Animation
    
    
              if (fromSortable === _this) {
                _this._ignoreWhileAnimating = target;
              }
    
              _this.animateAll(function () {
                dragOverEvent('dragOverAnimationComplete');
                _this._ignoreWhileAnimating = null;
              });
    
              if (_this !== fromSortable) {
                fromSortable.animateAll();
                fromSortable._ignoreWhileAnimating = null;
              }
            } // Null lastTarget if it is not inside a previously swapped element
    
    
            if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
              lastTarget = null;
            } // no bubbling and not fallback
    
    
            if (!options.dragoverBubble && !evt.rootEl && target !== document) {
              dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted
    
    
              !insertion && nearestEmptyInsertDetectEvent(evt);
            }
    
            !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
            return completedFired = true;
          } // Call when dragEl has been inserted
    
    
          function changed() {
            newIndex = index(dragEl);
            newDraggableIndex = index(dragEl, options.draggable);
    
            _dispatchEvent({
              sortable: _this,
              name: 'change',
              toEl: el,
              newIndex: newIndex,
              newDraggableIndex: newDraggableIndex,
              originalEvent: evt
            });
          }
    
          if (evt.preventDefault !== void 0) {
            evt.cancelable && evt.preventDefault();
          }
    
          target = closest(target, options.draggable, el, true);
          dragOverEvent('dragOver');
          if (Sortable.eventCanceled) return completedFired;
    
          if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
            return completed(false);
          }
    
          ignoreNextClick = false;
    
          if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
          : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
            vertical = this._getDirection(evt, target) === 'vertical';
            dragRect = getRect(dragEl);
            dragOverEvent('dragOverValid');
            if (Sortable.eventCanceled) return completedFired;
    
            if (revert) {
              parentEl = rootEl; // actualization
    
              capture();
    
              this._hideClone();
    
              dragOverEvent('revert');
    
              if (!Sortable.eventCanceled) {
                if (nextEl) {
                  rootEl.insertBefore(dragEl, nextEl);
                } else {
                  rootEl.appendChild(dragEl);
                }
              }
    
              return completed(true);
            }
    
            var elLastChild = lastChild(el, options.draggable);
    
            if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
              // If already at end of list: Do not insert
              if (elLastChild === dragEl) {
                return completed(false);
              } // assign target only if condition is true
    
    
              if (elLastChild && el === evt.target) {
                target = elLastChild;
              }
    
              if (target) {
                targetRect = getRect(target);
              }
    
              if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
                capture();
                el.appendChild(dragEl);
                parentEl = el; // actualization
    
                changed();
                return completed(true);
              }
            } else if (target.parentNode === el) {
              targetRect = getRect(target);
              var direction = 0,
                  targetBeforeFirstSwap,
                  differentLevel = dragEl.parentNode !== el,
                  differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
                  side1 = vertical ? 'top' : 'left',
                  scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
                  scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
    
              if (lastTarget !== target) {
                targetBeforeFirstSwap = targetRect[side1];
                pastFirstInvertThresh = false;
                isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
              }
    
              direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
              var sibling;
    
              if (direction !== 0) {
                // Check if target is beside dragEl in respective direction (ignoring hidden elements)
                var dragIndex = index(dragEl);
    
                do {
                  dragIndex -= direction;
                  sibling = parentEl.children[dragIndex];
                } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
              } // If dragEl is already beside target: Do not insert
    
    
              if (direction === 0 || sibling === target) {
                return completed(false);
              }
    
              lastTarget = target;
              lastDirection = direction;
              var nextSibling = target.nextElementSibling,
                  after = false;
              after = direction === 1;
    
              var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
    
              if (moveVector !== false) {
                if (moveVector === 1 || moveVector === -1) {
                  after = moveVector === 1;
                }
    
                _silent = true;
                setTimeout(_unsilent, 30);
                capture();
    
                if (after && !nextSibling) {
                  el.appendChild(dragEl);
                } else {
                  target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
                } // Undo chrome's scroll adjustment (has no effect on other browsers)
    
    
                if (scrolledPastTop) {
                  scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
                }
    
                parentEl = dragEl.parentNode; // actualization
                // must be done before animation
    
                if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
                  targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
                }
    
                changed();
                return completed(true);
              }
            }
    
            if (el.contains(dragEl)) {
              return completed(false);
            }
          }
    
          return false;
        },
        _ignoreWhileAnimating: null,
        _offMoveEvents: function _offMoveEvents() {
          off(document, 'mousemove', this._onTouchMove);
          off(document, 'touchmove', this._onTouchMove);
          off(document, 'pointermove', this._onTouchMove);
          off(document, 'dragover', nearestEmptyInsertDetectEvent);
          off(document, 'mousemove', nearestEmptyInsertDetectEvent);
          off(document, 'touchmove', nearestEmptyInsertDetectEvent);
        },
        _offUpEvents: function _offUpEvents() {
          var ownerDocument = this.el.ownerDocument;
          off(ownerDocument, 'mouseup', this._onDrop);
          off(ownerDocument, 'touchend', this._onDrop);
          off(ownerDocument, 'pointerup', this._onDrop);
          off(ownerDocument, 'touchcancel', this._onDrop);
          off(document, 'selectstart', this);
        },
        _onDrop: function _onDrop(
        /**Event*/
        evt) {
          var el = this.el,
              options = this.options; // Get the index of the dragged element within its parent
    
          newIndex = index(dragEl);
          newDraggableIndex = index(dragEl, options.draggable);
          pluginEvent('drop', this, {
            evt: evt
          });
          parentEl = dragEl && dragEl.parentNode; // Get again after plugin event
    
          newIndex = index(dragEl);
          newDraggableIndex = index(dragEl, options.draggable);
    
          if (Sortable.eventCanceled) {
            this._nulling();
    
            return;
          }
    
          awaitingDragStarted = false;
          isCircumstantialInvert = false;
          pastFirstInvertThresh = false;
          clearInterval(this._loopId);
          clearTimeout(this._dragStartTimer);
    
          _cancelNextTick(this.cloneId);
    
          _cancelNextTick(this._dragStartId); // Unbind events
    
    
          if (this.nativeDraggable) {
            off(document, 'drop', this);
            off(el, 'dragstart', this._onDragStart);
          }
    
          this._offMoveEvents();
    
          this._offUpEvents();
    
          if (Safari) {
            css(document.body, 'user-select', '');
          }
    
          css(dragEl, 'transform', '');
    
          if (evt) {
            if (moved) {
              evt.cancelable && evt.preventDefault();
              !options.dropBubble && evt.stopPropagation();
            }
    
            ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
    
            if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
              // Remove clone(s)
              cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
            }
    
            if (dragEl) {
              if (this.nativeDraggable) {
                off(dragEl, 'dragend', this);
              }
    
              _disableDraggable(dragEl);
    
              dragEl.style['will-change'] = ''; // Remove classes
              // ghostClass is added in dragStarted
    
              if (moved && !awaitingDragStarted) {
                toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
              }
    
              toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event
    
              _dispatchEvent({
                sortable: this,
                name: 'unchoose',
                toEl: parentEl,
                newIndex: null,
                newDraggableIndex: null,
                originalEvent: evt
              });
    
              if (rootEl !== parentEl) {
                if (newIndex >= 0) {
                  // Add event
                  _dispatchEvent({
                    rootEl: parentEl,
                    name: 'add',
                    toEl: parentEl,
                    fromEl: rootEl,
                    originalEvent: evt
                  }); // Remove event
    
    
                  _dispatchEvent({
                    sortable: this,
                    name: 'remove',
                    toEl: parentEl,
                    originalEvent: evt
                  }); // drag from one list and drop into another
    
    
                  _dispatchEvent({
                    rootEl: parentEl,
                    name: 'sort',
                    toEl: parentEl,
                    fromEl: rootEl,
                    originalEvent: evt
                  });
    
                  _dispatchEvent({
                    sortable: this,
                    name: 'sort',
                    toEl: parentEl,
                    originalEvent: evt
                  });
                }
    
                putSortable && putSortable.save();
              } else {
                if (newIndex !== oldIndex) {
                  if (newIndex >= 0) {
                    // drag & drop within the same list
                    _dispatchEvent({
                      sortable: this,
                      name: 'update',
                      toEl: parentEl,
                      originalEvent: evt
                    });
    
                    _dispatchEvent({
                      sortable: this,
                      name: 'sort',
                      toEl: parentEl,
                      originalEvent: evt
                    });
                  }
                }
              }
    
              if (Sortable.active) {
                /* jshint eqnull:true */
                if (newIndex == null || newIndex === -1) {
                  newIndex = oldIndex;
                  newDraggableIndex = oldDraggableIndex;
                }
    
                _dispatchEvent({
                  sortable: this,
                  name: 'end',
                  toEl: parentEl,
                  originalEvent: evt
                }); // Save sorting
    
    
                this.save();
              }
            }
          }
    
          this._nulling();
        },
        _nulling: function _nulling() {
          pluginEvent('nulling', this);
          rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
          savedInputChecked.forEach(function (el) {
            el.checked = true;
          });
          savedInputChecked.length = lastDx = lastDy = 0;
        },
        handleEvent: function handleEvent(
        /**Event*/
        evt) {
          switch (evt.type) {
            case 'drop':
            case 'dragend':
              this._onDrop(evt);
    
              break;
    
            case 'dragenter':
            case 'dragover':
              if (dragEl) {
                this._onDragOver(evt);
    
                _globalDragOver(evt);
              }
    
              break;
    
            case 'selectstart':
              evt.preventDefault();
              break;
          }
        },
    
        /**
         * Serializes the item into an array of string.
         * @returns {String[]}
         */
        toArray: function toArray() {
          var order = [],
              el,
              children = this.el.children,
              i = 0,
              n = children.length,
              options = this.options;
    
          for (; i < n; i++) {
            el = children[i];
    
            if (closest(el, options.draggable, this.el, false)) {
              order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
            }
          }
    
          return order;
        },
    
        /**
         * Sorts the elements according to the array.
         * @param  {String[]}  order  order of the items
         */
        sort: function sort(order) {
          var items = {},
              rootEl = this.el;
          this.toArray().forEach(function (id, i) {
            var el = rootEl.children[i];
    
            if (closest(el, this.options.draggable, rootEl, false)) {
              items[id] = el;
            }
          }, this);
          order.forEach(function (id) {
            if (items[id]) {
              rootEl.removeChild(items[id]);
              rootEl.appendChild(items[id]);
            }
          });
        },
    
        /**
         * Save the current sorting
         */
        save: function save() {
          var store = this.options.store;
          store && store.set && store.set(this);
        },
    
        /**
         * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
         * @param   {HTMLElement}  el
         * @param   {String}       [selector]  default: `options.draggable`
         * @returns {HTMLElement|null}
         */
        closest: function closest$1(el, selector) {
          return closest(el, selector || this.options.draggable, this.el, false);
        },
    
        /**
         * Set/get option
         * @param   {string} name
         * @param   {*}      [value]
         * @returns {*}
         */
        option: function option(name, value) {
          var options = this.options;
    
          if (value === void 0) {
            return options[name];
          } else {
            var modifiedValue = PluginManager.modifyOption(this, name, value);
    
            if (typeof modifiedValue !== 'undefined') {
              options[name] = modifiedValue;
            } else {
              options[name] = value;
            }
    
            if (name === 'group') {
              _prepareGroup(options);
            }
          }
        },
    
        /**
         * Destroy
         */
        destroy: function destroy() {
          pluginEvent('destroy', this);
          var el = this.el;
          el[expando] = null;
          off(el, 'mousedown', this._onTapStart);
          off(el, 'touchstart', this._onTapStart);
          off(el, 'pointerdown', this._onTapStart);
    
          if (this.nativeDraggable) {
            off(el, 'dragover', this);
            off(el, 'dragenter', this);
          } // Remove draggable attributes
    
    
          Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
            el.removeAttribute('draggable');
          });
    
          this._onDrop();
    
          this._disableDelayedDragEvents();
    
          sortables.splice(sortables.indexOf(this.el), 1);
          this.el = el = null;
        },
        _hideClone: function _hideClone() {
          if (!cloneHidden) {
            pluginEvent('hideClone', this);
            if (Sortable.eventCanceled) return;
            css(cloneEl, 'display', 'none');
    
            if (this.options.removeCloneOnHide && cloneEl.parentNode) {
              cloneEl.parentNode.removeChild(cloneEl);
            }
    
            cloneHidden = true;
          }
        },
        _showClone: function _showClone(putSortable) {
          if (putSortable.lastPutMode !== 'clone') {
            this._hideClone();
    
            return;
          }
    
          if (cloneHidden) {
            pluginEvent('showClone', this);
            if (Sortable.eventCanceled) return; // show clone at dragEl or original position
    
            if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
              rootEl.insertBefore(cloneEl, dragEl);
            } else if (nextEl) {
              rootEl.insertBefore(cloneEl, nextEl);
            } else {
              rootEl.appendChild(cloneEl);
            }
    
            if (this.options.group.revertClone) {
              this.animate(dragEl, cloneEl);
            }
    
            css(cloneEl, 'display', '');
            cloneHidden = false;
          }
        }
      };
    
      function _globalDragOver(
      /**Event*/
      evt) {
        if (evt.dataTransfer) {
          evt.dataTransfer.dropEffect = 'move';
        }
    
        evt.cancelable && evt.preventDefault();
      }
    
      function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
        var evt,
            sortable = fromEl[expando],
            onMoveFn = sortable.options.onMove,
            retVal; // Support for new CustomEvent feature
    
        if (window.CustomEvent && !IE11OrLess && !Edge) {
          evt = new CustomEvent('move', {
            bubbles: true,
            cancelable: true
          });
        } else {
          evt = document.createEvent('Event');
          evt.initEvent('move', true, true);
        }
    
        evt.to = toEl;
        evt.from = fromEl;
        evt.dragged = dragEl;
        evt.draggedRect = dragRect;
        evt.related = targetEl || toEl;
        evt.relatedRect = targetRect || getRect(toEl);
        evt.willInsertAfter = willInsertAfter;
        evt.originalEvent = originalEvent;
        fromEl.dispatchEvent(evt);
    
        if (onMoveFn) {
          retVal = onMoveFn.call(sortable, evt, originalEvent);
        }
    
        return retVal;
      }
    
      function _disableDraggable(el) {
        el.draggable = false;
      }
    
      function _unsilent() {
        _silent = false;
      }
    
      function _ghostIsLast(evt, vertical, sortable) {
        var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
        var spacer = 10;
        return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
      }
    
      function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
        var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
            targetLength = vertical ? targetRect.height : targetRect.width,
            targetS1 = vertical ? targetRect.top : targetRect.left,
            targetS2 = vertical ? targetRect.bottom : targetRect.right,
            invert = false;
    
        if (!invertSwap) {
          // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
          if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
            // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
            // check if past first invert threshold on side opposite of lastDirection
            if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
              // past first invert threshold, do not restrict inverted threshold to dragEl shadow
              pastFirstInvertThresh = true;
            }
    
            if (!pastFirstInvertThresh) {
              // dragEl shadow (target move distance shadow)
              if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
              : mouseOnAxis > targetS2 - targetMoveDistance) {
                return -lastDirection;
              }
            } else {
              invert = true;
            }
          } else {
            // Regular
            if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
              return _getInsertDirection(target);
            }
          }
        }
    
        invert = invert || invertSwap;
    
        if (invert) {
          // Invert of regular
          if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
            return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
          }
        }
    
        return 0;
      }
      /**
       * Gets the direction dragEl must be swapped relative to target in order to make it
       * seem that dragEl has been "inserted" into that element's position
       * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
       * @return {Number}                   Direction dragEl must be swapped
       */
    
    
      function _getInsertDirection(target) {
        if (index(dragEl) < index(target)) {
          return 1;
        } else {
          return -1;
        }
      }
      /**
       * Generate id
       * @param   {HTMLElement} el
       * @returns {String}
       * @private
       */
    
    
      function _generateId(el) {
        var str = el.tagName + el.className + el.src + el.href + el.textContent,
            i = str.length,
            sum = 0;
    
        while (i--) {
          sum += str.charCodeAt(i);
        }
    
        return sum.toString(36);
      }
    
      function _saveInputCheckedState(root) {
        savedInputChecked.length = 0;
        var inputs = root.getElementsByTagName('input');
        var idx = inputs.length;
    
        while (idx--) {
          var el = inputs[idx];
          el.checked && savedInputChecked.push(el);
        }
      }
    
      function _nextTick(fn) {
        return setTimeout(fn, 0);
      }
    
      function _cancelNextTick(id) {
        return clearTimeout(id);
      } // Fixed #973:
    
    
      if (documentExists) {
        on(document, 'touchmove', function (evt) {
          if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
            evt.preventDefault();
          }
        });
      } // Export utils
    
    
      Sortable.utils = {
        on: on,
        off: off,
        css: css,
        find: find,
        is: function is(el, selector) {
          return !!closest(el, selector, el, false);
        },
        extend: extend,
        throttle: throttle,
        closest: closest,
        toggleClass: toggleClass,
        clone: clone,
        index: index,
        nextTick: _nextTick,
        cancelNextTick: _cancelNextTick,
        detectDirection: _detectDirection,
        getChild: getChild
      };
      /**
       * Get the Sortable instance of an element
       * @param  {HTMLElement} element The element
       * @return {Sortable|undefined}         The instance of Sortable
       */
    
      Sortable.get = function (element) {
        return element[expando];
      };
      /**
       * Mount a plugin to Sortable
       * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
       */
    
    
      Sortable.mount = function () {
        for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
          plugins[_key] = arguments[_key];
        }
    
        if (plugins[0].constructor === Array) plugins = plugins[0];
        plugins.forEach(function (plugin) {
          if (!plugin.prototype || !plugin.prototype.constructor) {
            throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
          }
    
          if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
          PluginManager.mount(plugin);
        });
      };
      /**
       * Create sortable instance
       * @param {HTMLElement}  el
       * @param {Object}      [options]
       */
    
    
      Sortable.create = function (el, options) {
        return new Sortable(el, options);
      }; // Export
    
    
      Sortable.version = version;
    
      var autoScrolls = [],
          scrollEl,
          scrollRootEl,
          scrolling = false,
          lastAutoScrollX,
          lastAutoScrollY,
          touchEvt$1,
          pointerElemChangedInterval;
    
      function AutoScrollPlugin() {
        function AutoScroll() {
          this.defaults = {
            scroll: true,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            bubbleScroll: true
          }; // Bind all private methods
    
          for (var fn in this) {
            if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
              this[fn] = this[fn].bind(this);
            }
          }
        }
    
        AutoScroll.prototype = {
          dragStarted: function dragStarted(_ref) {
            var originalEvent = _ref.originalEvent;
    
            if (this.sortable.nativeDraggable) {
              on(document, 'dragover', this._handleAutoScroll);
            } else {
              if (this.options.supportPointer) {
                on(document, 'pointermove', this._handleFallbackAutoScroll);
              } else if (originalEvent.touches) {
                on(document, 'touchmove', this._handleFallbackAutoScroll);
              } else {
                on(document, 'mousemove', this._handleFallbackAutoScroll);
              }
            }
          },
          dragOverCompleted: function dragOverCompleted(_ref2) {
            var originalEvent = _ref2.originalEvent;
    
            // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
            if (!this.options.dragOverBubble && !originalEvent.rootEl) {
              this._handleAutoScroll(originalEvent);
            }
          },
          drop: function drop() {
            if (this.sortable.nativeDraggable) {
              off(document, 'dragover', this._handleAutoScroll);
            } else {
              off(document, 'pointermove', this._handleFallbackAutoScroll);
              off(document, 'touchmove', this._handleFallbackAutoScroll);
              off(document, 'mousemove', this._handleFallbackAutoScroll);
            }
    
            clearPointerElemChangedInterval();
            clearAutoScrolls();
            cancelThrottle();
          },
          nulling: function nulling() {
            touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
            autoScrolls.length = 0;
          },
          _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
            this._handleAutoScroll(evt, true);
          },
          _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
            var _this = this;
    
            var x = (evt.touches ? evt.touches[0] : evt).clientX,
                y = (evt.touches ? evt.touches[0] : evt).clientY,
                elem = document.elementFromPoint(x, y);
            touchEvt$1 = evt; // IE does not seem to have native autoscroll,
            // Edge's autoscroll seems too conditional,
            // MACOS Safari does not have autoscroll,
            // Firefox and Chrome are good
    
            if (fallback || Edge || IE11OrLess || Safari) {
              autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change
    
              var ogElemScroller = getParentAutoScrollElement(elem, true);
    
              if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
                pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour
    
                pointerElemChangedInterval = setInterval(function () {
                  var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
    
                  if (newElem !== ogElemScroller) {
                    ogElemScroller = newElem;
                    clearAutoScrolls();
                  }
    
                  autoScroll(evt, _this.options, newElem, fallback);
                }, 10);
                lastAutoScrollX = x;
                lastAutoScrollY = y;
              }
            } else {
              // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
              if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
                clearAutoScrolls();
                return;
              }
    
              autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
            }
          }
        };
        return _extends(AutoScroll, {
          pluginName: 'scroll',
          initializeByDefault: true
        });
      }
    
      function clearAutoScrolls() {
        autoScrolls.forEach(function (autoScroll) {
          clearInterval(autoScroll.pid);
        });
        autoScrolls = [];
      }
    
      function clearPointerElemChangedInterval() {
        clearInterval(pointerElemChangedInterval);
      }
    
      var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
        // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
        if (!options.scroll) return;
        var x = (evt.touches ? evt.touches[0] : evt).clientX,
            y = (evt.touches ? evt.touches[0] : evt).clientY,
            sens = options.scrollSensitivity,
            speed = options.scrollSpeed,
            winScroller = getWindowScrollingElement();
        var scrollThisInstance = false,
            scrollCustomFn; // New scroll root, set scrollEl
    
        if (scrollRootEl !== rootEl) {
          scrollRootEl = rootEl;
          clearAutoScrolls();
          scrollEl = options.scroll;
          scrollCustomFn = options.scrollFn;
    
          if (scrollEl === true) {
            scrollEl = getParentAutoScrollElement(rootEl, true);
          }
        }
    
        var layersOut = 0;
        var currentParent = scrollEl;
    
        do {
          var el = currentParent,
              rect = getRect(el),
              top = rect.top,
              bottom = rect.bottom,
              left = rect.left,
              right = rect.right,
              width = rect.width,
              height = rect.height,
              canScrollX = void 0,
              canScrollY = void 0,
              scrollWidth = el.scrollWidth,
              scrollHeight = el.scrollHeight,
              elCSS = css(el),
              scrollPosX = el.scrollLeft,
              scrollPosY = el.scrollTop;
    
          if (el === winScroller) {
            canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
            canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
          } else {
            canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
            canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
          }
    
          var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
          var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    
          if (!autoScrolls[layersOut]) {
            for (var i = 0; i <= layersOut; i++) {
              if (!autoScrolls[i]) {
                autoScrolls[i] = {};
              }
            }
          }
    
          if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
            autoScrolls[layersOut].el = el;
            autoScrolls[layersOut].vx = vx;
            autoScrolls[layersOut].vy = vy;
            clearInterval(autoScrolls[layersOut].pid);
    
            if (vx != 0 || vy != 0) {
              scrollThisInstance = true;
              /* jshint loopfunc:true */
    
              autoScrolls[layersOut].pid = setInterval(function () {
                // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
                if (isFallback && this.layer === 0) {
                  Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely
    
                }
    
                var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
                var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
    
                if (typeof scrollCustomFn === 'function') {
                  if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
                    return;
                  }
                }
    
                scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
              }.bind({
                layer: layersOut
              }), 24);
            }
          }
    
          layersOut++;
        } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
    
        scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
      }, 30);
    
      var drop = function drop(_ref) {
        var originalEvent = _ref.originalEvent,
            putSortable = _ref.putSortable,
            dragEl = _ref.dragEl,
            activeSortable = _ref.activeSortable,
            dispatchSortableEvent = _ref.dispatchSortableEvent,
            hideGhostForTarget = _ref.hideGhostForTarget,
            unhideGhostForTarget = _ref.unhideGhostForTarget;
        if (!originalEvent) return;
        var toSortable = putSortable || activeSortable;
        hideGhostForTarget();
        var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
        var target = document.elementFromPoint(touch.clientX, touch.clientY);
        unhideGhostForTarget();
    
        if (toSortable && !toSortable.el.contains(target)) {
          dispatchSortableEvent('spill');
          this.onSpill({
            dragEl: dragEl,
            putSortable: putSortable
          });
        }
      };
    
      function Revert() {}
    
      Revert.prototype = {
        startIndex: null,
        dragStart: function dragStart(_ref2) {
          var oldDraggableIndex = _ref2.oldDraggableIndex;
          this.startIndex = oldDraggableIndex;
        },
        onSpill: function onSpill(_ref3) {
          var dragEl = _ref3.dragEl,
              putSortable = _ref3.putSortable;
          this.sortable.captureAnimationState();
    
          if (putSortable) {
            putSortable.captureAnimationState();
          }
    
          var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    
          if (nextSibling) {
            this.sortable.el.insertBefore(dragEl, nextSibling);
          } else {
            this.sortable.el.appendChild(dragEl);
          }
    
          this.sortable.animateAll();
    
          if (putSortable) {
            putSortable.animateAll();
          }
        },
        drop: drop
      };
    
      _extends(Revert, {
        pluginName: 'revertOnSpill'
      });
    
      function Remove() {}
    
      Remove.prototype = {
        onSpill: function onSpill(_ref4) {
          var dragEl = _ref4.dragEl,
              putSortable = _ref4.putSortable;
          var parentSortable = putSortable || this.sortable;
          parentSortable.captureAnimationState();
          dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
          parentSortable.animateAll();
        },
        drop: drop
      };
    
      _extends(Remove, {
        pluginName: 'removeOnSpill'
      });
    
      var lastSwapEl;
    
      function SwapPlugin() {
        function Swap() {
          this.defaults = {
            swapClass: 'sortable-swap-highlight'
          };
        }
    
        Swap.prototype = {
          dragStart: function dragStart(_ref) {
            var dragEl = _ref.dragEl;
            lastSwapEl = dragEl;
          },
          dragOverValid: function dragOverValid(_ref2) {
            var completed = _ref2.completed,
                target = _ref2.target,
                onMove = _ref2.onMove,
                activeSortable = _ref2.activeSortable,
                changed = _ref2.changed,
                cancel = _ref2.cancel;
            if (!activeSortable.options.swap) return;
            var el = this.sortable.el,
                options = this.options;
    
            if (target && target !== el) {
              var prevSwapEl = lastSwapEl;
    
              if (onMove(target) !== false) {
                toggleClass(target, options.swapClass, true);
                lastSwapEl = target;
              } else {
                lastSwapEl = null;
              }
    
              if (prevSwapEl && prevSwapEl !== lastSwapEl) {
                toggleClass(prevSwapEl, options.swapClass, false);
              }
            }
    
            changed();
            completed(true);
            cancel();
          },
          drop: function drop(_ref3) {
            var activeSortable = _ref3.activeSortable,
                putSortable = _ref3.putSortable,
                dragEl = _ref3.dragEl;
            var toSortable = putSortable || this.sortable;
            var options = this.options;
            lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
    
            if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
              if (dragEl !== lastSwapEl) {
                toSortable.captureAnimationState();
                if (toSortable !== activeSortable) activeSortable.captureAnimationState();
                swapNodes(dragEl, lastSwapEl);
                toSortable.animateAll();
                if (toSortable !== activeSortable) activeSortable.animateAll();
              }
            }
          },
          nulling: function nulling() {
            lastSwapEl = null;
          }
        };
        return _extends(Swap, {
          pluginName: 'swap',
          eventProperties: function eventProperties() {
            return {
              swapItem: lastSwapEl
            };
          }
        });
      }
    
      function swapNodes(n1, n2) {
        var p1 = n1.parentNode,
            p2 = n2.parentNode,
            i1,
            i2;
        if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
        i1 = index(n1);
        i2 = index(n2);
    
        if (p1.isEqualNode(p2) && i1 < i2) {
          i2++;
        }
    
        p1.insertBefore(n2, p1.children[i1]);
        p2.insertBefore(n1, p2.children[i2]);
      }
    
      var multiDragElements = [],
          multiDragClones = [],
          lastMultiDragSelect,
          // for selection with modifier key down (SHIFT)
      multiDragSortable,
          initialFolding = false,
          // Initial multi-drag fold when drag started
      folding = false,
          // Folding any other time
      dragStarted = false,
          dragEl$1,
          clonesFromRect,
          clonesHidden;
    
      function MultiDragPlugin() {
        function MultiDrag(sortable) {
          // Bind all private methods
          for (var fn in this) {
            if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
              this[fn] = this[fn].bind(this);
            }
          }
    
          if (sortable.options.supportPointer) {
            on(document, 'pointerup', this._deselectMultiDrag);
          } else {
            on(document, 'mouseup', this._deselectMultiDrag);
            on(document, 'touchend', this._deselectMultiDrag);
          }
    
          on(document, 'keydown', this._checkKeyDown);
          on(document, 'keyup', this._checkKeyUp);
          this.defaults = {
            selectedClass: 'sortable-selected',
            multiDragKey: null,
            setData: function setData(dataTransfer, dragEl) {
              var data = '';
    
              if (multiDragElements.length && multiDragSortable === sortable) {
                multiDragElements.forEach(function (multiDragElement, i) {
                  data += (!i ? '' : ', ') + multiDragElement.textContent;
                });
              } else {
                data = dragEl.textContent;
              }
    
              dataTransfer.setData('Text', data);
            }
          };
        }
    
        MultiDrag.prototype = {
          multiDragKeyDown: false,
          isMultiDrag: false,
          delayStartGlobal: function delayStartGlobal(_ref) {
            var dragged = _ref.dragEl;
            dragEl$1 = dragged;
          },
          delayEnded: function delayEnded() {
            this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
          },
          setupClone: function setupClone(_ref2) {
            var sortable = _ref2.sortable,
                cancel = _ref2.cancel;
            if (!this.isMultiDrag) return;
    
            for (var i = 0; i < multiDragElements.length; i++) {
              multiDragClones.push(clone(multiDragElements[i]));
              multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
              multiDragClones[i].draggable = false;
              multiDragClones[i].style['will-change'] = '';
              toggleClass(multiDragClones[i], this.options.selectedClass, false);
              multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
            }
    
            sortable._hideClone();
    
            cancel();
          },
          clone: function clone(_ref3) {
            var sortable = _ref3.sortable,
                rootEl = _ref3.rootEl,
                dispatchSortableEvent = _ref3.dispatchSortableEvent,
                cancel = _ref3.cancel;
            if (!this.isMultiDrag) return;
    
            if (!this.options.removeCloneOnHide) {
              if (multiDragElements.length && multiDragSortable === sortable) {
                insertMultiDragClones(true, rootEl);
                dispatchSortableEvent('clone');
                cancel();
              }
            }
          },
          showClone: function showClone(_ref4) {
            var cloneNowShown = _ref4.cloneNowShown,
                rootEl = _ref4.rootEl,
                cancel = _ref4.cancel;
            if (!this.isMultiDrag) return;
            insertMultiDragClones(false, rootEl);
            multiDragClones.forEach(function (clone) {
              css(clone, 'display', '');
            });
            cloneNowShown();
            clonesHidden = false;
            cancel();
          },
          hideClone: function hideClone(_ref5) {
            var _this = this;
    
            var sortable = _ref5.sortable,
                cloneNowHidden = _ref5.cloneNowHidden,
                cancel = _ref5.cancel;
            if (!this.isMultiDrag) return;
            multiDragClones.forEach(function (clone) {
              css(clone, 'display', 'none');
    
              if (_this.options.removeCloneOnHide && clone.parentNode) {
                clone.parentNode.removeChild(clone);
              }
            });
            cloneNowHidden();
            clonesHidden = true;
            cancel();
          },
          dragStartGlobal: function dragStartGlobal(_ref6) {
            var sortable = _ref6.sortable;
    
            if (!this.isMultiDrag && multiDragSortable) {
              multiDragSortable.multiDrag._deselectMultiDrag();
            }
    
            multiDragElements.forEach(function (multiDragElement) {
              multiDragElement.sortableIndex = index(multiDragElement);
            }); // Sort multi-drag elements
    
            multiDragElements = multiDragElements.sort(function (a, b) {
              return a.sortableIndex - b.sortableIndex;
            });
            dragStarted = true;
          },
          dragStarted: function dragStarted(_ref7) {
            var _this2 = this;
    
            var sortable = _ref7.sortable;
            if (!this.isMultiDrag) return;
    
            if (this.options.sort) {
              // Capture rects,
              // hide multi drag elements (by positioning them absolute),
              // set multi drag elements rects to dragRect,
              // show multi drag elements,
              // animate to rects,
              // unset rects & remove from DOM
              sortable.captureAnimationState();
    
              if (this.options.animation) {
                multiDragElements.forEach(function (multiDragElement) {
                  if (multiDragElement === dragEl$1) return;
                  css(multiDragElement, 'position', 'absolute');
                });
                var dragRect = getRect(dragEl$1, false, true, true);
                multiDragElements.forEach(function (multiDragElement) {
                  if (multiDragElement === dragEl$1) return;
                  setRect(multiDragElement, dragRect);
                });
                folding = true;
                initialFolding = true;
              }
            }
    
            sortable.animateAll(function () {
              folding = false;
              initialFolding = false;
    
              if (_this2.options.animation) {
                multiDragElements.forEach(function (multiDragElement) {
                  unsetRect(multiDragElement);
                });
              } // Remove all auxiliary multidrag items from el, if sorting enabled
    
    
              if (_this2.options.sort) {
                removeMultiDragElements();
              }
            });
          },
          dragOver: function dragOver(_ref8) {
            var target = _ref8.target,
                completed = _ref8.completed,
                cancel = _ref8.cancel;
    
            if (folding && ~multiDragElements.indexOf(target)) {
              completed(false);
              cancel();
            }
          },
          revert: function revert(_ref9) {
            var fromSortable = _ref9.fromSortable,
                rootEl = _ref9.rootEl,
                sortable = _ref9.sortable,
                dragRect = _ref9.dragRect;
    
            if (multiDragElements.length > 1) {
              // Setup unfold animation
              multiDragElements.forEach(function (multiDragElement) {
                sortable.addAnimationState({
                  target: multiDragElement,
                  rect: folding ? getRect(multiDragElement) : dragRect
                });
                unsetRect(multiDragElement);
                multiDragElement.fromRect = dragRect;
                fromSortable.removeAnimationState(multiDragElement);
              });
              folding = false;
              insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
            }
          },
          dragOverCompleted: function dragOverCompleted(_ref10) {
            var sortable = _ref10.sortable,
                isOwner = _ref10.isOwner,
                insertion = _ref10.insertion,
                activeSortable = _ref10.activeSortable,
                parentEl = _ref10.parentEl,
                putSortable = _ref10.putSortable;
            var options = this.options;
    
            if (insertion) {
              // Clones must be hidden before folding animation to capture dragRectAbsolute properly
              if (isOwner) {
                activeSortable._hideClone();
              }
    
              initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location
    
              if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
                // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
                var dragRectAbsolute = getRect(dragEl$1, false, true, true);
                multiDragElements.forEach(function (multiDragElement) {
                  if (multiDragElement === dragEl$1) return;
                  setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
                  // while folding, and so that we can capture them again because old sortable will no longer be fromSortable
    
                  parentEl.appendChild(multiDragElement);
                });
                folding = true;
              } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out
    
    
              if (!isOwner) {
                // Only remove if not folding (folding will remove them anyways)
                if (!folding) {
                  removeMultiDragElements();
                }
    
                if (multiDragElements.length > 1) {
                  var clonesHiddenBefore = clonesHidden;
    
                  activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden
    
    
                  if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                    multiDragClones.forEach(function (clone) {
                      activeSortable.addAnimationState({
                        target: clone,
                        rect: clonesFromRect
                      });
                      clone.fromRect = clonesFromRect;
                      clone.thisAnimationDuration = null;
                    });
                  }
                } else {
                  activeSortable._showClone(sortable);
                }
              }
            }
          },
          dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
            var dragRect = _ref11.dragRect,
                isOwner = _ref11.isOwner,
                activeSortable = _ref11.activeSortable;
            multiDragElements.forEach(function (multiDragElement) {
              multiDragElement.thisAnimationDuration = null;
            });
    
            if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
              clonesFromRect = _extends({}, dragRect);
              var dragMatrix = matrix(dragEl$1, true);
              clonesFromRect.top -= dragMatrix.f;
              clonesFromRect.left -= dragMatrix.e;
            }
          },
          dragOverAnimationComplete: function dragOverAnimationComplete() {
            if (folding) {
              folding = false;
              removeMultiDragElements();
            }
          },
          drop: function drop(_ref12) {
            var evt = _ref12.originalEvent,
                rootEl = _ref12.rootEl,
                parentEl = _ref12.parentEl,
                sortable = _ref12.sortable,
                dispatchSortableEvent = _ref12.dispatchSortableEvent,
                oldIndex = _ref12.oldIndex,
                putSortable = _ref12.putSortable;
            var toSortable = putSortable || this.sortable;
            if (!evt) return;
            var options = this.options,
                children = parentEl.children; // Multi-drag selection
    
            if (!dragStarted) {
              if (options.multiDragKey && !this.multiDragKeyDown) {
                this._deselectMultiDrag();
              }
    
              toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
    
              if (!~multiDragElements.indexOf(dragEl$1)) {
                multiDragElements.push(dragEl$1);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: dragEl$1,
                  originalEvt: evt
                }); // Modifier activated, select from last to dragEl
    
                if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
                  var lastIndex = index(lastMultiDragSelect),
                      currentIndex = index(dragEl$1);
    
                  if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                    // Must include lastMultiDragSelect (select it), in case modified selection from no selection
                    // (but previous selection existed)
                    var n, i;
    
                    if (currentIndex > lastIndex) {
                      i = lastIndex;
                      n = currentIndex;
                    } else {
                      i = currentIndex;
                      n = lastIndex + 1;
                    }
    
                    for (; i < n; i++) {
                      if (~multiDragElements.indexOf(children[i])) continue;
                      toggleClass(children[i], options.selectedClass, true);
                      multiDragElements.push(children[i]);
                      dispatchEvent({
                        sortable: sortable,
                        rootEl: rootEl,
                        name: 'select',
                        targetEl: children[i],
                        originalEvt: evt
                      });
                    }
                  }
                } else {
                  lastMultiDragSelect = dragEl$1;
                }
    
                multiDragSortable = toSortable;
              } else {
                multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
                lastMultiDragSelect = null;
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'deselect',
                  targetEl: dragEl$1,
                  originalEvt: evt
                });
              }
            } // Multi-drag drop
    
    
            if (dragStarted && this.isMultiDrag) {
              // Do not "unfold" after around dragEl if reverted
              if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
                var dragRect = getRect(dragEl$1),
                    multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
                if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
                toSortable.captureAnimationState();
    
                if (!initialFolding) {
                  if (options.animation) {
                    dragEl$1.fromRect = dragRect;
                    multiDragElements.forEach(function (multiDragElement) {
                      multiDragElement.thisAnimationDuration = null;
    
                      if (multiDragElement !== dragEl$1) {
                        var rect = folding ? getRect(multiDragElement) : dragRect;
                        multiDragElement.fromRect = rect; // Prepare unfold animation
    
                        toSortable.addAnimationState({
                          target: multiDragElement,
                          rect: rect
                        });
                      }
                    });
                  } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
                  // properly they must all be removed
    
    
                  removeMultiDragElements();
                  multiDragElements.forEach(function (multiDragElement) {
                    if (children[multiDragIndex]) {
                      parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
                    } else {
                      parentEl.appendChild(multiDragElement);
                    }
    
                    multiDragIndex++;
                  }); // If initial folding is done, the elements may have changed position because they are now
                  // unfolding around dragEl, even though dragEl may not have his index changed, so update event
                  // must be fired here as Sortable will not.
    
                  if (oldIndex === index(dragEl$1)) {
                    var update = false;
                    multiDragElements.forEach(function (multiDragElement) {
                      if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                        update = true;
                        return;
                      }
                    });
    
                    if (update) {
                      dispatchSortableEvent('update');
                    }
                  }
                } // Must be done after capturing individual rects (scroll bar)
    
    
                multiDragElements.forEach(function (multiDragElement) {
                  unsetRect(multiDragElement);
                });
                toSortable.animateAll();
              }
    
              multiDragSortable = toSortable;
            } // Remove clones if necessary
    
    
            if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
              multiDragClones.forEach(function (clone) {
                clone.parentNode && clone.parentNode.removeChild(clone);
              });
            }
          },
          nullingGlobal: function nullingGlobal() {
            this.isMultiDrag = dragStarted = false;
            multiDragClones.length = 0;
          },
          destroyGlobal: function destroyGlobal() {
            this._deselectMultiDrag();
    
            off(document, 'pointerup', this._deselectMultiDrag);
            off(document, 'mouseup', this._deselectMultiDrag);
            off(document, 'touchend', this._deselectMultiDrag);
            off(document, 'keydown', this._checkKeyDown);
            off(document, 'keyup', this._checkKeyUp);
          },
          _deselectMultiDrag: function _deselectMultiDrag(evt) {
            if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable
    
            if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable
    
            if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click
    
            if (evt && evt.button !== 0) return;
    
            while (multiDragElements.length) {
              var el = multiDragElements[0];
              toggleClass(el, this.options.selectedClass, false);
              multiDragElements.shift();
              dispatchEvent({
                sortable: this.sortable,
                rootEl: this.sortable.el,
                name: 'deselect',
                targetEl: el,
                originalEvt: evt
              });
            }
          },
          _checkKeyDown: function _checkKeyDown(evt) {
            if (evt.key === this.options.multiDragKey) {
              this.multiDragKeyDown = true;
            }
          },
          _checkKeyUp: function _checkKeyUp(evt) {
            if (evt.key === this.options.multiDragKey) {
              this.multiDragKeyDown = false;
            }
          }
        };
        return _extends(MultiDrag, {
          // Static methods & properties
          pluginName: 'multiDrag',
          utils: {
            /**
             * Selects the provided multi-drag item
             * @param  {HTMLElement} el    The element to be selected
             */
            select: function select(el) {
              var sortable = el.parentNode[expando];
              if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;
    
              if (multiDragSortable && multiDragSortable !== sortable) {
                multiDragSortable.multiDrag._deselectMultiDrag();
    
                multiDragSortable = sortable;
              }
    
              toggleClass(el, sortable.options.selectedClass, true);
              multiDragElements.push(el);
            },
    
            /**
             * Deselects the provided multi-drag item
             * @param  {HTMLElement} el    The element to be deselected
             */
            deselect: function deselect(el) {
              var sortable = el.parentNode[expando],
                  index = multiDragElements.indexOf(el);
              if (!sortable || !sortable.options.multiDrag || !~index) return;
              toggleClass(el, sortable.options.selectedClass, false);
              multiDragElements.splice(index, 1);
            }
          },
          eventProperties: function eventProperties() {
            var _this3 = this;
    
            var oldIndicies = [],
                newIndicies = [];
            multiDragElements.forEach(function (multiDragElement) {
              oldIndicies.push({
                multiDragElement: multiDragElement,
                index: multiDragElement.sortableIndex
              }); // multiDragElements will already be sorted if folding
    
              var newIndex;
    
              if (folding && multiDragElement !== dragEl$1) {
                newIndex = -1;
              } else if (folding) {
                newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
              } else {
                newIndex = index(multiDragElement);
              }
    
              newIndicies.push({
                multiDragElement: multiDragElement,
                index: newIndex
              });
            });
            return {
              items: _toConsumableArray(multiDragElements),
              clones: [].concat(multiDragClones),
              oldIndicies: oldIndicies,
              newIndicies: newIndicies
            };
          },
          optionListeners: {
            multiDragKey: function multiDragKey(key) {
              key = key.toLowerCase();
    
              if (key === 'ctrl') {
                key = 'Control';
              } else if (key.length > 1) {
                key = key.charAt(0).toUpperCase() + key.substr(1);
              }
    
              return key;
            }
          }
        });
      }
    
      function insertMultiDragElements(clonesInserted, rootEl) {
        multiDragElements.forEach(function (multiDragElement, i) {
          var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    
          if (target) {
            rootEl.insertBefore(multiDragElement, target);
          } else {
            rootEl.appendChild(multiDragElement);
          }
        });
      }
      /**
       * Insert multi-drag clones
       * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
       * @param  {HTMLElement} rootEl
       */
    
    
      function insertMultiDragClones(elementsInserted, rootEl) {
        multiDragClones.forEach(function (clone, i) {
          var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];
    
          if (target) {
            rootEl.insertBefore(clone, target);
          } else {
            rootEl.appendChild(clone);
          }
        });
      }
    
      function removeMultiDragElements() {
        multiDragElements.forEach(function (multiDragElement) {
          if (multiDragElement === dragEl$1) return;
          multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
        });
      }
    
      Sortable.mount(new AutoScrollPlugin());
      Sortable.mount(Remove, Revert);
    
      Sortable.mount(new SwapPlugin());
      Sortable.mount(new MultiDragPlugin());
    
      return Sortable;
    
    }();

  class DomEl { 
      constructor(creationString) {
          this.elType = creationString.match(/^(\w+)*/g);
          this.classes = creationString.match(/\.(?![^[]*])([^\s\.\#\[]*)/g);
          this.id = creationString.match(/\#([^\s\.\[]*)/g);
          this.attributes = creationString.match(/\[([^\]]*)/g);
          if (this.elType) {
              this.el = document.createElement(this.elType);
              if (this.classes && this.classes.length > 0) {
                  for (var className of this.classes) {
                      this.el.classList.add(className.replace('.',''));
                  }
              }
              if (this.attributes && this.attributes.length > 0) {
                  for (var attributeString of this.attributes) {
                      let attribute = attributeString.split('=');
                      if (attribute.length == 1) {
                          attribute.push('');
                      } else {
                          attribute[1] = attribute[1].replace(/"/g,'');
                      }
                      attribute[0] = attribute[0].replace('[','');
                      if (['title','href'].indexOf(attribute[0]) > -1) {
                          this.el[attribute[0]] = attribute[1];
                      }
                      this.el.setAttribute(attribute[0],attribute[1]);
                  }
              }
              if (this.id && this.id.length == 1) {
                  this.el.id = this.id[0].replace('#','');
              }
              return this.el;
          }   
      }
  }

  let Hat = function(containerEl) {
      let Blocks = [];
      let BlockCount = 0;
      let Elements = {
          blockHolder: false,
          container: false
      };
      let Events = {
          fire: function(eventName, element=Elements.blockHolder) {
              element.dispatchEvent(new Event(eventName));
          }
      };
      let Internal = {
          blockCount: 0,
          insertAddBlockButton: function() {
              var a = new DomEl('a.block[title="Add a new block (and select it)][href="javascript:void(0)"]');
              var icon = new DomEl('i.fas.fa-plus-square');
              a.innerHTML = icon.outerHTML + ' Add block';
              a.addEventListener('click', function() {
                  //TODO: Show block list
                  Interface.addBlock();
              });
              Elements.container.append(a);
          },
          initialize: function(containerEl) {
              Elements.container = containerEl;
              Elements.blockHolder = document.createElement('div');
              Elements.container.append(Elements.blockHolder);
              Internal.insertAddBlockButton();
              Interface.addBlock();
              Internal.manageSorting();
              document.execCommand('defaultParagraphSeparator', false, 'p');
          },
          manageSorting: function() {
              Internal.sorting = Sortable.create(Elements.blockHolder, { animation: 150, group: 'blocks', handle: 'button.handle', draggable: '.block', onEnd: function() { Events.fire('blockChanged');} });
              Elements.blockHolder.addEventListener('blockChanged',function() {
                  if (BlockCount == 1) {
                      Internal.sorting.option('sorting', false);
                  } else {
                      Internal.sorting.option('sorting', true);
                  }
              });
          } 
      };
      let Interface = {
          addBlock: function(focus=true,position=false, type='paragraph') {
              let blockClass = window.HatRack.getBlock(type);
              let block = new blockClass(this);
              block.el.id = 'block' + new Date().getTime();
              if (position === false) {
                  Elements.blockHolder.appendChild(block.el);
              } else {
                  Elements.blockHolder.children[position].after(block.el);
              }
              if (focus) {
                  block.focus();
              }
              Blocks[block.el.id] = block;
              BlockCount++;
              Events.fire('blockChanged');
          },
          fireEvent: function(eventName, element=Elements.blockHolder) {
              Events.fire(eventName, element);
          },
          getBlockContainer: function() {
              return Elements.blockHolder;
          },
          getBlockPosition: function(blockEl) {
              let blocks = Elements.blockHolder.querySelectorAll('.block');
              let position = { count: BlockCount };
              if (position.count == 1) {
                  position.first = true;
                  position.last = true;
              } else {
                  position.first = (blocks[0] == blockEl);
                  position.last = (blocks[BlockCount-1] == blockEl);
              }
              return position;
          },
          removeBlock: function(block) {
              var blockId = block.el.id;
              if (BlockCount > 1){
                  if (Blocks.hasOwnProperty(blockId)) {
                      block.getPosition();
                      let newFocus = (block.position.first) ? block.el.nextSibling.id : block.el.previousSibling.id;
                      Blocks[newFocus].focus();
                      block.el.remove();
                      Blocks.splice(blockId);
                      BlockCount--;
                      Events.fire('blockChanged');
                  }
              }
          },
          getContainer: function() {
              return Elements.container;
          }
      };
      Internal.initialize(containerEl);
      return Interface;
  };

  class DomButton { 
      constructor(title, icon, btnClass, text) {
          let btn = (btnClass) ? 'button.' + btnClass : 'button';
          let buttonEl = new DomEl(btn + '[title="' + title + '"]');
          if (text) {
              buttonEl.innerText = text;
          }
          if (icon) {
              buttonEl.append(new DomEl('i.fas.fa-' + icon));
          }
          return buttonEl
      }
  }

  class MiniModal {
      constructor(content, childClass=false) {
          if (!childClass) {
              return this.constructModal(content);
          }
      }

      addClickHandlers() {
          let modal = this;
          this.backgroundDiv.addEventListener('click', function() {
              modal.cancel();
          });
          if (this.options.closeX) {
              this.closeBtn.addEventListener('click', function() {
                  modal.cancel();
              });
          }
          if (this.options.confirm) {
              this.cancelBtn.addEventListener('click', function() {
                  modal.cancel();        
              });
          }
          this.confirmBtn.addEventListener('click', function() {
              modal.confirm();
          });
          this.modalContainer.addEventListener('keydown', function(e) {
              let option = this.options;
              if (e.keyCode == 13) {
                  e.preventDefault();
                  if (modal.options.enterConfirms) {
                      modal.confirm();
                  }
              }
          });
      }

      addKeyboardHandlers() {
          let modal = this;
          this.modalContainer.addEventListener('keyup', function(e) {
              if (e.which == 27) {
                  modal.cancel();
              }
          });
      }

      buildOptions(content) {
          this.getDefaultOptions();
          if (typeof(content) == 'string') {
              this.options.content = content;
          } else {
              for (let [key,value] of Object.entries(content)) {
                  this.options[key] = value;
              }
          }
      }

      buildModal() {
          this.backgroundDiv = new DomEl('div.miniModal-background');
          this.modalContainer = new DomEl('div.miniModal-container');
          if (this.options.modalClass) {
              if (this.options.modalClass == 'string') {
                  this.options.modalClass = [this.options.modalClass];
              }
              this.options.modalClass.forEach((className) => {
                  this.backgroundDiv.classList.add(className);
                  this.modalContainer.classList.add(className);
              });
          }
          this.header = new DomEl('div.modal-header');
          if (this.options.header) {
              let h2 = new DomEl('h2');
              h2.text = this.options.header;
              this.header.append(h2);
          }
          if (this.options.closeX) {
              this.closeBtn = new DomButton('Close modal', 'times-circle', 'closeBtn');
              this.header.append(this.closeBtn);
          }
          this.modalContainer.append(this.header);
          this.modalContent = new DomEl('div.modal-content');
          if (this.options.contentType == 'text') {
              this.modalContent.innerText = this.options.content;
          } else if (this.options.contentType == 'node') {
              this.modalContent.append(this.options.content);
          } else {
              this.modalContent.innerHTML = this.options.content;
          }
          this.modalContainer.append(this.modalContent);
          let buttonBar = new DomEl('div.modal-buttons');
          if (this.options.confirm) {
              this.cancelBtn = new DomButton(this.options.cancelButtonTitle, false, this.options.cancelButtonClass, this.options.cancelButtonText);
              buttonBar.append(this.cancelBtn);
          } else {
              buttonBar.style.textAlign = 'center';
          }
          this.confirmBtn = new DomButton(this.options.confirmButtonTitle, false, this.options.confirmButtonClass, this.options.confirmButtonText);
          buttonBar.append(this.confirmBtn);
          this.modalContainer.append(buttonBar);
      }

      cancel() {
          if (this.options.confirm) {
              this.modalContainer.dispatchEvent(new Event('canceled'));
          }
          this.close();
      }

      close() {
          this.backgroundDiv.classList.remove('show');
          this.modalContainer.classList.remove('show');
          let modal = this;
          setTimeout(function() {
              modal.backgroundDiv.remove();
              modal.modalContainer.remove();
          }, 750);
      }

      confirm() {
          if (this.options.confirm) {
              this.modalContainer.dispatchEvent(new Event('confirmed'));
          }
          this.close();
      }

      constructModal(content) {
          this.buildOptions(content);
          this.buildModal();
          this.addClickHandlers();
          this.addKeyboardHandlers();
          this.show();
          return this.modalContainer;
      }

      getDefaultOptions() {
          this.options = {
              cancelButtonClass: 'btnCancel',
              cancelButtonText: 'Cancel',
              cancelButtonTitle: 'Cancel action',
              confirmButtonClass: 'btnConfirm',
              confirmButtonText: 'OK',
              confirmButtonTitle: 'Proceed with action',
              closeOnBackgroundClick: true,
              closeX: true,
              confirm: false,
              content: false,
              contentType: 'text',
              enterConfirms: true,
              focusTarget: false,
              header: false,
              modalClass: false
          };
      }

      show() {
          document.body.append(this.backgroundDiv);
          document.body.append(this.modalContainer);
          this.backgroundDiv.classList.add('show');
          this.modalContainer.classList.add('show');
          if (this.options.focusTarget) {
              this.options.focusTarget.focus();
          } else {
              if (this.options.confirm) {
                  this.cancelBtn.focus();
              } else {
                  this.confirmBtn.focus();
              }
          }
      }
  }

  class Block {
      constructor(hat) {
          this.setup();
          this.editor = hat;
          this.createElement();
          this.registerSettings();
          this.blockRegistration();
          this.addGlobalEvents();
          this.addEvents();
      }

      addBlockControls() {
          this.upButton = new DomEl('button[aria-label="Move block up one position"]');
          let upArrow = new DomEl('i.fas.fa-chevron-up');
          this.upButton.append(upArrow);
          this.moveButton = new DomEl('button[aria-label="Click and drag to move block"].handle');
          let gripIcon = new DomEl('i.fas.fa-grip-horizontal');
          this.moveButton.append(gripIcon); 
          this.downButton = new DomEl('button[aria-label="Move block down one position]');
          let downArrow = new DomEl('i.fas.fa-chevron-down');
          this.downButton.append(downArrow);
          this.blockControlsContainer.append(this.upButton);
          this.blockControlsContainer.append(this.moveButton);
          this.blockControlsContainer.append(this.downButton);

          this.deleteButton = new DomButton('Delete block', 'trash-alt', 'deleteBtn');
          this.settingsContainer.append(this.deleteButton);
      }
      
      addGlobalEvents() {
          var block = this;
          this.el.addEventListener('keydown', function(e) {
              block.checkKeyboardShortcuts(e);
          });
          let blockContainer = this.editor.getBlockContainer();
          blockContainer.addEventListener('blockChanged', function() {
              block.checkBlockSettingsControls();
          });
          this.upButton.addEventListener('click', function() {
              block.moveBlock('up');
          });
          this.downButton.addEventListener('click', function() {
              block.moveBlock('down');
          });

          this.deleteButton.addEventListener('click', function() {
              let modal = new MiniModal({
                  cancelButtonTitle: 'Do not delete this block',
                  confirmButtonClass: 'deleteBtn',
                  confirmButtonText: 'Delete',
                  confirmButtonTitle: 'Yes, delete the block',
                  closeX: false,
                  content: 'Are you sure you want to delete this block?',
                  confirm: true
              });
              modal.addEventListener('confirmed', function() {
                  block.delete();
              });
              modal.addEventListener('canceled', function() {
                  block.focus();
              });
          });
      }

      addEvents() {}

      addInfoButton() {
          var infoButton = new DomEl('button.settings[aria-role="tab"][title="Open block settings dialog"][aria-selected="false"][tabindex="-1"][aria-controls="settings-info"]');
          var iconEl = new DomEl('i.fas.fa-info');
          infoButton.append(iconEl);
          this.settingsContainer.append(infoButton);
      }

      blockRegistration() {}

      checkBlockSettingsControls() {
          this.getPosition();
          let up = this.upButton;
          let down = this.downButton;
          let grip = this.moveButton;
          if (this.position.first) {
              up.setAttribute('disabled','');
          } else {
              up.removeAttribute('disabled');
          }
          if (this.position.last) {
              down.setAttribute('disabled','');
          } else {
              down.removeAttribute('disabled');
          }
          if (this.position.count == 1) {
              this.deleteButton.setAttribute('disabled', '');
              grip.setAttribute('disabled','');
          } else {
              this.deleteButton.removeAttribute('disabled');
              grip.removeAttribute('disabled');
          }
      }

      checkKeyboardShortcuts(e) {
          if (e.ctrlKey | e.metaKey) {
              if (e.shiftKey) {
                  switch (e.keyCode) {
                      case 38:
                          this.moveBlock('up');
                          break;
                      case 40:
                          this.moveBlock('down');
                          break;
                  }
              } else {
                  switch (e.keyCode) {
                      case 8:
                      case 46:
                          this.delete();
                          break;
                  }
              }
          }
          this.keyboardShortcuts(e);
      }

      createElement() {}

      delete() {
          this.editor.removeBlock(this);
      }

      focus() {
          this.contentEl.focus();
      }

      getElement() {
          return this.el;
      }

      getContent() {
          return this.contentEl.innerHtml();
      }

      getPosition() {
          this.position = this.editor.getBlockPosition(this.el);
      }

      keyboardShortcuts(e) {}

      moveBlock(direction) {
          this.getPosition();
          if (this.position.count == 1 || this.position.first && direction == 'up' || this.position.last && direction == 'down') {
              return false;
          }
          var block = this;
          let opposite = (direction == 'up') ? 'down' : 'up';
          let target = (direction == 'up') ? block.el.previousSibling : block.el.nextSibling;
          let insertPoint = (direction == 'up') ? block.el.previousSibling : block.el.nextSibling.nextSibling;
          block.el.classList.add('moving-' + direction);
          target.classList.add('moving-' + opposite);
          setTimeout(function() {
              block.el.classList.remove('moving-' + direction);
              target.classList.remove('moving-' + opposite);
              block.editor.getBlockContainer().insertBefore(block.el, insertPoint);
              block.editor.fireEvent('blockChanged');
              block.focus();
          }, 200);
      }

      registerSettings() {}

      setup() {
          this.keysDown = [];
          this.el = new DomEl('div.block');
          this.blockControlsContainer = new DomEl('div[aria-label="Block Controls"]');
          this.contentContainer = new DomEl('div');
          this.settingsContainer = new DomEl('div[aria-role="tablist"][aria-label="Block settings]');
          this.el.append(this.blockControlsContainer);
          this.el.append(this.contentContainer);
          this.el.append(this.settingsContainer);
          this.addBlockControls();
      }
  }

  class CursorFocus {
      constructor(el) {
          el.focus();
          el.innerHTML = '<br>';
          let sel = window.getSelection();
          let range = document.createRange();
          range.setStart(el, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
      }
  }

  class SelectionWrapper {
      constructor(tag, view) {
          this.tag = tag;
          let sel = window.getSelection();
          if (sel.rangeCount) {
              if (view == 'content') {
                  if (typeof(tag) == 'object') {
                      switch (tag[0]) {
                          case 'ol':
                              var command = 'insertOrderedList';
                              break;
                          case 'ul':
                              var command = 'insertUnorderedList';
                              break;
                      }
                      document.execCommand(command);
                      let nearestP = sel.anchorNode.parentElement.closest('p');
                      if (nearestP && nearestP.childNodes[0].nodeName.toLowerCase() == tag[0]) {
                          let ul = nearestP.childNodes[0];
                          nearestP.parentNode.insertBefore(ul, nearestP);
                          nearestP.remove();
                          new CursorFocus(ul.childNodes[0]);
                      }
                  } else {
                      var badTag = false;
                      var commandTag = false;
                      switch (tag) {
                          case 'strong':
                              var badTag = 'b';
                              var command = 'bold';
                              break;
                          case 'em':
                              var badTag = 'i';
                              var command = 'italic';
                              break;
                          case 'u':
                              var badTag = false;
                              var command = 'underline';
                              break;
                          case 'h1':
                          case 'h2':
                          case 'h3':
                          case 'h4':
                              var command = 'formatBlock';
                              commandTag = tag;
                              break;
                      } 
                      document.execCommand(command, false, commandTag);
                      if (badTag) {
                          let badClose = '</' + badTag + '>';
                          let goodClose = '</' + tag + '>';
                          let badOpen = badClose.replace('/','');
                          let goodOpen = goodClose.replace('/','');
                          sel.anchorNode.parentElement.outerHTML = sel.anchorNode.parentElement.outerHTML.replace(badOpen, goodOpen).replace(badClose, goodClose);
                      }
                  }
              } else {
                  let range = sel.getRangeAt(0);
                  if (typeof(tag) == 'object') {
                      document.execCommand('insertText', false, '<' + tag[0] + '><' + tag[1] + '>' + range.toString() + '</' + tag[1] + '></' + tag[0] + '>');
                  } else {
                      document.execCommand('insertText', false, '<' + tag + '>' + range.toString() + '</' + tag + '>');
                  }
              }
          }
      }
  }

  class BrowserFormattingButton {
      constructor(title, icon, tag, parentBlock) {
          let button = new DomButton(title, icon);
          button.addEventListener('click', function() {
              new SelectionWrapper(tag, parentBlock.view);       
          });
          return button;
      }
  }

  class ErrorModal extends MiniModal {
      constructor(errorMessage) {
          let errorDiv = new DomEl('div.error');
          errorDiv.append(new DomEl('i.fas.fa-exclamation-circle'));
          errorDiv.append(new DomEl('br'));
          errorDiv.append(new DomEl('p').innerText = errorMessage);
          super({
              closeX: false,
              confirmButtonClass: false,
              contentType: 'node',
              content: errorDiv,
              header: 'Error',
              special: 'super'
          });
      }
  }

  class Ajax {
      constructor(url, data, progressBar) {
          this.xhr = new XMLHttpRequest();
          let fd = new FormData();
          for (let [key,value] of Object.entries(data)) {
              fd.append(key, value);
          }
          var xhr = new XMLHttpRequest();
          if (progressBar) {
              xhr.upload.addEventListener('progress', function(e) {
                  progressBar.update( Math.round( (e.loaded * 100) /e.total) );
              });
          }
          let eventEl = new DomEl('div');
          xhr.responseType = 'json';
          xhr.open('POST', url);
          xhr.send(fd);
          xhr.onerror = () => { new ErrorModal('An error occurred during upload.'); };
          let ajax = this;
          xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                      if (xhr.response.type == 'error') {
                          new ErrorModal(xhr.response.message);
                          ajax.throwError(eventEl, progressBar);
                      } else {
                          for (let [key, value] of Object.entries(xhr.response)) {
                              eventEl.setAttribute(key, value);
                          }
                          if (progressBar) {
                              progressBar.update(100);
                          }
                          eventEl.dispatchEvent(new Event('success'));
                      }
                  } else if (xhr.status == 410 || xhr.status === 404 || xhr.status == 403 || xhr.status === 401 ) {
                      new ErrorModal(xhr.status + ', check your upload URL');
                      ajax.throwError(eventEl, progressBar);
                  } else if (xhr.status === 431 || xhr.status === 413) {
                      new ErrorModal(xhr.status + ', check your server settings');
                      ajax.throwError(eventEl, progressBar);
                  } else {
                      new ErrorModal('Upload returned a ' + xhr.status + ' error');
                      ajax.throwError(eventEl, progressBar);
                  }
              }
          };
          return eventEl;
      }

      throwError(eventEl, progressBar) {
          if (this.progressBar) {
              progressBar.update('failure');
          }
          eventEl.dispatchEvent(new Event('failure'));
      }
  }

  class InputField {
      constructor(id, labelName, placeholder, type) {
          type = type || 'text';
          let inputString = 'input#' + id + '[name="' + id + '"][type="'+ type + '"]';
          if (placeholder) {
              inputString += '[placeholder="' + placeholder + '"]';
          }
          let input = new DomEl(inputString);
          let label = new DomEl('label[for="' + id + '"]');
          label.innerText = labelName;
          label.append(input);
          return label; 
      }
  }

  class ProgressBar {
      constructor(target, removeOnCompletion, type) {
          this.type = type || 'Upload';
          this.removeOnCompletion = removeOnCompletion;
          let notificationId = 'progress' + new Date().getMilliseconds();
          this.notification = new DomEl('div.sr-only[tab-index=0][aria-hidden=true][aria-live=assertive][aria-atomic=additions]#' + notificationId);
          this.notification.innerText = 'Press spacebar to get current value';
          this.track = new DomEl('div.progressBar[tab-index=1][role=progressbar][aria-describedby=' + notificationId + '][aria-valuenow=0]');
          let theBar = this;
          this.track.addEventListener('keydown', function(e) {
              if (e.keyCode == 32) {
                  theBar.notify();
              }
          });
          this.bar = new DomEl('div.bar[tab-index=0]');
          this.track.append(this.bar);
          target.append(this.track);
          target.append(this.notification);
      }

      notify(num) {
          if (num == 'failure') {
              this.track.setAttribute('tab-index',0);
              this.notification.innerText = this.type + ' failed';
          } else if (num == 100) {
              this.track.setAttribute('tab-index',0);
              this.notification.innerText = this.type + ' Complete';
              if (this.removeOnCompletion) {
                  let theBar = this;
                  setTimeout(() => { 
                      theBar.track.remove();
                      theBar.notification.remove(); 
                  }, 500);
              }
          } else {
              this.notification.innerText = num + '%';
          }
      }

      update(num) {
          this.bar.style.width = num + '%';
          if (num == 100) {
              this.bar.classList.add('done');
              this.notify(num);
          }
      }
  }

  class ImageUploadModal extends MiniModal {
      constructor() {
          super(false, true);
          this.uploading = false;
          this.createElements();
          this.addEvents();
          this.constructModal(this.getModalOptions());
      }

      acceptFile(file) {
          if (file) {
              if (!file.type.match(/image.*/)) {
                  new ErrorModal('File is not a valid image');
              } else {    
                  this.preview.src = window.URL.createObjectURL(file);
                  this.fileData = file;
                  if (!this.label.classList.contains('previewing')) {
                      this.label.classList.add('previewing');
                  }
              }
          }
      }

      addEvents() {
          let uploadModal = this;
          let label = this.label;
          ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
              label.addEventListener(eventName, function(e){e.preventDefault(); e.stopPropagation();}, false );
          });
          ['dragenter','dragover'].forEach(eventName => {
              label.addEventListener(eventName, function(e){ label.classList.add('hovered');});
          });
          ['dragleave','drop'].forEach(eventName=> {
              label.addEventListener(eventName, function(e) { label.classList.remove('hovered');});
          });
          this.label.addEventListener('keydown', function(e) {
              if (e.keyCode == 13) {
                  e.preventDefault();
                  e.stopPropagation();
                  this.click();
              }
          });
          this.form.addEventListener('keydown', function(e) {
              if (e.keyCode == 13) {
                  uploadModal.confirm();
              }
          });
          this.input.addEventListener('change', function(e) {
              uploadModal.acceptFile(this.files[0]);
          });
          label.addEventListener('drop', function(e) {
              uploadModal.acceptFile(e.dataTransfer.files[0]);
          });
      }

      confirm() {
          if (!this.uploading) {
              this.uploading = true;
              if (HatRack.options.imageUploadUrl) {
                  let url = HatRack.options.imageUploadUrl;
                  if (this.fileData && this.altText.value) {
                      let data = {
                          image: this.fileData,
                          altText: this.altText.value
                      };
                      this.form.style.display = 'none';
                      let bar = new ProgressBar(this.modalContent);
                      let upload = new Ajax(url, data, bar);
                      upload.addEventListener('success', (e) => {
                          bar.track.classList.add('success');
                          this.imageEl = new DomEl('img[src=' + e.target.getAttribute('imageUrl') + '][alt=' + e.target.getAttribute('altText') + ']');
                          this.modalContainer.dispatchEvent(new Event('uploaded'));
                          this.close();
                      });
                      upload.addEventListener('failure', (e) => {  
                          bar.track.classList.add('failure');
                          this.uploading = false;
                          bar.track.remove();
                          this.form.style.display = 'block';
                      });
                  } else {
                      new ErrorModal('You must have both an image and alt text to upload');
                      this.uploading = false;
                  }
              } else {
                  new ErrorModal('Upload URL is not set');
                  this.uploading = false;
              }
          }
      }

      createElements() {
          this.fileData = false;
          this.form = new DomEl('div#imageUpload');
          this.input = new DomEl('input[type=file][name="uploader"]#uploader');
          let span = new DomEl('span');
          span.innerText = 'Click here to browse or drop the image you want to upload';
          let icon = new DomEl('i.fas.fa-file-image');
          this.label = new DomEl('label.imageUploader[for="uploader"][tab-index="1"][title="Hit enter to browse for an image to upload"]');
          this.preview = new DomEl('img.preview'); 
          this.label.append(icon);
          this.label.append(this.preview);
          this.label.append(document.createElement('br'));
          this.label.append(span);
          this.label.append(this.input);
          this.form.append(this.label);
          let altLabel = new InputField('altText','Alternative text for accessibility','A description of the photo');
          this.form.append(altLabel);
          this.altText = altLabel.children[0];
      }

      getModalOptions() {
          return {
              contentType: 'node',
              content: this.form,
              confirm: true,
              enterConfirms: false,
              focusTarget: this.label,
          };
      }
  }

  class ParagraphToolbar {
      constructor(paragraphBlock) {
          this.parentBlock = paragraphBlock;
          this.container = new DomEl('div.toolbar[aria-label="Paragraph block toolbar"]');
          this.addFormattingButtons();
          this.addHeaderButton();
          this.addImageButton();
          this.addHtmlView();
          this.addFocusShield();
          paragraphBlock.contentContainer.insertBefore(this.container, paragraphBlock.contentEl);
      }

      addFocusShield() {
          let toolbar = this;
          var timeout = false; 
          this.parentBlock.contentContainer.addEventListener('focusin', function() {
              if (timeout) {
                  clearTimeout(timeout);
              }
              toolbar.contextButtons.forEach(el => {
                  el.removeAttribute('disabled');
              });
          });
          this.parentBlock.contentContainer.addEventListener('focusout', function() {
              /* Focusout will detect child focus outs (good), but even if we switch to another child, e.g., a button.
              We therefore check if the container contains the active element; if not, that means we disable the buttons.
              But focusout fires before the next focusin, so we delay slightly */
              timeout = setTimeout(function() {
                  if (!toolbar.parentBlock.contentContainer.contains(document.activeElement)) {
                      toolbar.contextButtons.forEach(el => {
                          el.setAttribute('disabled', 'disabled');
                      });
                  }
              }, 1);
          });
      }

      addFormattingButtons() {
          let bold = new BrowserFormattingButton('Make selected text bold', 'bold', 'strong', this.parentBlock);
          this.container.append(bold);
          let italic = new BrowserFormattingButton('Make selected text italic', 'italic', 'em', this.parentBlock);
          this.container.append(italic);
          let underline = new BrowserFormattingButton('Make selected text underlined', 'underline', 'u', this.parentBlock);
          this.container.append(underline);
          let ul = new BrowserFormattingButton('Create ordered list', 'list-ul', ['ul', 'li'], this.parentBlock);
          this.container.append(ul);
          let ol = new BrowserFormattingButton('Create ordered list', 'list-ol', ['ol', 'li'], this.parentBlock);
          this.container.append(ol);
          this.contextButtons = [bold, italic, underline, ul, ol];
      }

      addHeaderButton() {
          let toolbar = this; 
          ['h1','h2','h3','h4'].forEach(function(header) {
              let btn = new DomButton('Insert/convert to ' + header, false, 'textBtn', header);
              btn.addEventListener('click', function() {
                  new SelectionWrapper(header, toolbar.parentBlock.view);
              });
              toolbar.contextButtons.push(btn);
              toolbar.container.append(btn);
          });
      }

      addHtmlView() {
          let toolbar = this;
          let el = new DomButton('View HTML', 'laptop-code');
          el.addEventListener('click', function() {
              toolbar.toggleHtmlView();
          });
          toolbar.container.append(el);
      }

      addImage() {
          let sel = window.getSelection();
          let range = sel.getRangeAt(0);
          let image = new ImageUploadModal();
          let toolbar = this;
          image.modalContainer.addEventListener('uploaded', (e) => {
              if (toolbar.parentBlock.view == 'content') {
                  toolbar.parentBlock.contentEl.focus();
                  sel.removeAllRanges();
                  sel.addRange(range);
                  document.execCommand('insertHTML', false, image.imageEl.outerHTML);
              } else {
                  toolbar.parhtmlEl.focus();
                  sel.removeAllRanges();
                  sel.addRange(range);
                  document.execCommand('insertText', false, image.imageEl.outerHTML);
              }
          });
      }

      addImageButton() {
          let toolbar = this;
          let el = new DomButton('Insert image', 'image');
          el.addEventListener('click', function() {
              toolbar.addImage();
          });
          this.contextButtons.push(el);
          toolbar.container.append(el);
      }

      toggleHtmlView() {
          if (this.parentBlock.view == 'content') {
              let code = this.parentBlock.getHtmlFromContent();
              this.parentBlock.htmlEl.innerText = code;
              this.parentBlock.view = 'html';
          } else {
              let html = this.parentBlock.getContentFromHtml();
              this.parentBlock.editEl.innerHTML = html;
              if (this.parentBlock.editEl.children) {
                  for (let el of this.parentBlock.editEl.children) {
                      if (!el.innerHTML) {
                          el.innerHTML = '<br>';
                      }
                  }
              }
              this.parentBlock.view = 'content';
          }
          this.parentBlock.editEl.classList.toggle('flip');
          this.parentBlock.htmlEl.classList.toggle('flip');
          this.parentBlock.focus();
      }
  }

  class ParagraphBlock extends Block {
      createElement() {
          this.el.classList.add('paragraph');
          this.contentEl = new DomEl('div.contentContainer');
          this.editEl = new DomEl('div[contentEditable=true].editContainer');
          this.htmlEl = new DomEl('div.htmlView[contentEditable=true].flip');
          this.contentEl.appendChild(this.editEl);
          this.contentEl.appendChild(this.htmlEl);
          this.contentContainer.appendChild(this.contentEl);
          this.toolbar = new ParagraphToolbar(this);
      }

      focus() {
          if (this.view == undefined) {
              this.view = 'content';
              let starterP = new DomEl('p');
              this.editEl.append(starterP);
              new CursorFocus(starterP);
          } else if (this.view == 'content') {
              this.editEl.focus();
          } else {
              this.htmlEl.focus();
          }
      }

      getContent() {
          if (this.view == 'content') {
              return this.getHtmlFromContent();
          } else {
              return this.getContentFromHtml();
          }
      }

      getHtmlFromContent() {
          return this.editEl.innerHTML;
      }

      getContentFromHtml() {
          return this.htmlEl.innerText;
      }

      keyboardShortcuts(e) {
          if (e.ctrlKey || e.metaKey) {
              if (e.shiftKey) {
                  switch(e.keyCode) {
                      case 79:
                          new SelectionWrapper(['ol', 'li'], this.view);
                          break;
                      case 85:
                          new SelectionWrapper(['ul','li'], this.view);
                          break;
                      case 73:
                          this.toolbar.addImage();
                          break;
                      case 49:
                          new SelectionWrapper('h1', this.view);
                          break;
                      case 50:
                          new SelectionWrapper('h2', this.view);
                          break;
                      case 51:
                          new SelectionWrapper('h3', this.view);
                          break;
                      case 52:
                          new SelectionWrapper('h4', this.view);
                          break;
                  }
              }
              switch (e.keyCode) {
                  case 66:
                  case 98: 
                      e.preventDefault();
                      new SelectionWrapper('strong', this.view);
                      return false;
                  case 73:
                  case 105: 
                      e.preventDefault();
                      new SelectionWrapper('em', this.view);
                      return false;
                  case 85:
                  case 117: 
                      e.preventDefault();
                      new SelectionWrapper('u', this.view);
                      return false;
              }
          }
      }
  }

  window.HatRack = function(querySelector, options) {
      let EditorRegistry = {
          add: function(hatInstance) {
              this.editors[hatInstance.getContainer()] = hatInstance;
          },
          editors: new Map()
      };
      let BlockRegistry = {
          default: false,
          names: ['paragraph'],
          objects: {
              paragraph: ParagraphBlock
          }
      };
      let Interface = {   
          getBlock: function(blockName) {
              if (Interface.hasBlock(blockName)) {
                  return BlockRegistry.objects[blockName];
              }
          },
          getBlocks: function() {
              return BlockRegistry.objects;
          },
          getEditor: function(el) {
              if (this.hasEditor(el)) {
                  return EditorRegistry.editors[el];
              } else {
                  return false;
              }
          },
          hasBlock: function(blockName) {
              return (BlockRegistry.names.indexOf(blockName) > -1);
          },
          hasEditor: function(el) {
              return (EditorRegistry.editors[el]);
          },
          registerBlock: function(name, slug, blockObj) {
              BlockRegistry.names.push(slug);
              BlockRegistry.objects[slug] = blockObj;
          },
          start: function(querySelector, options) {
              let query = querySelector || '.hat-editor';
              Interface.options = options || {};
              for (var el of document.querySelectorAll(query)) {
                  EditorRegistry.add(new Hat(el));
              }
          }
      };
      return Interface;
  }();

}());
