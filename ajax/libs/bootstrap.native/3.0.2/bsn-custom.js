/*!
  * Native JavaScript for Bootstrap v3.0.1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.BSN = factory());
}(this, (function () { 'use strict';

  var componentsInit = {};

  var initCallback = function (lookUp){
    lookUp = lookUp || document;
    var initializeDataAPI = function( Constructor, collection ){
      Array.from(collection).map(function (x){ return new Constructor(x); });
    };
    for (var component in componentsInit) {
      initializeDataAPI( componentsInit[component][0], lookUp.querySelectorAll (componentsInit[component][1]) );
    }
  };

  var version = "3.0.1";

  function on (element, event, handler, options) {
    options = options || false;
    element.addEventListener(event, handler, options);
  }

  function off (element, event, handler, options) {
    options = options || false;
    element.removeEventListener(event, handler, options);
  }

  function one (element, event, handler, options) {
    on(element, event, function handlerWrapper(e){
      if (e.target === element) {
        handler(e);
        off(element, event, handlerWrapper, options);
      }
    }, options);
  }

  function hasClass(element,classNAME) {
    return element.classList.contains(classNAME)
  }

  function addClass(element,classNAME) {
    element.classList.add(classNAME);
  }

  function removeClass(element,classNAME) {
    element.classList.remove(classNAME);
  }

  var touchEvents = { start: 'touchstart', end: 'touchend', move:'touchmove', cancel:'touchcancel' };

  var mouseHoverEvents = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

  var supportPassive = (function () {
    var result = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          result = true;
        }
      });
      one(document, 'DOMContentLoaded', function (){}, opts);
    } catch (e) {}
    return result;
  })();

  var passiveHandler = supportPassive ? { passive: true } : false;

  var supportTransition = 'webkitTransition' in document.body.style || 'transition' in document.body.style;

  var transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';

  function getElementTransitionDuration (element) {
    var duration = supportTransition ? window.getComputedStyle(element)[transitionDuration] : 0;
    duration = parseFloat(duration);
    duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
    return duration;
  }

  var transitionEndEvent = 'webkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend';

  function emulateTransitionEnd (element,handler){
    var called = 0, duration = getElementTransitionDuration(element);
    duration ? one(element, transitionEndEvent, function(e){ !called && handler(e), called = 1; })
             : setTimeout(function() { !called && handler(), called = 1; }, 17);
  }

  function isElementInScrollRange(element) {
    var bcr = element.getBoundingClientRect(),
        viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return bcr.top <= viewportHeight && bcr.bottom >= 0;
  }

  function queryElement (selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function tryWrapper (fn,origin){
    try{ fn(); }
    catch(e){
      console.error((origin + ": " + e));
    }
  }

  function bootstrapCustomEvent (eventName, componentName, related) {
    var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
    OriginalCustomEvent.relatedTarget = related;
    return OriginalCustomEvent;
  }
  function dispatchCustomEvent (customEvent){
    this && this.dispatchEvent(customEvent);
  }

  function Carousel (element,options) {
    options = options || {};
    var self = this,
      swipeTimingFunction = 'cubic-bezier(.15,.5,.75,1)',
      cancelEvent,
      isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      canTouch = ('ontouchstart' in window || navigator.msMaxTouchPoints)||false,
      swipeEvents = canTouch && isMobile ? touchEvents
                                         : { start: 'mousedown', end: 'mouseup', move:'mousemove', cancel: 'mouseout' },
      vars, ops,
      slideCustomEvent, slidCustomEvent,
      slides, leftArrow, rightArrow, indicator, indicators;
    function pauseHandler() {
      if ( ops.interval !==false && !hasClass(element,'paused') ) {
        addClass(element,'paused');
        !vars.isSliding && ( clearInterval(vars.timer), vars.timer = null );
      }
    }
    function resumeHandler() {
      if ( ops.interval !== false && hasClass(element,'paused') ) {
        removeClass(element,'paused');
        !vars.isSliding && ( clearInterval(vars.timer), vars.timer = null );
        !vars.isSliding && self.cycle();
      }
    }
    function indicatorHandler(e) {
      e.preventDefault();
      if (vars.isSliding||vars.isTouch) { return; }
      var eventTarget = e.target;
      if ( eventTarget && !hasClass(eventTarget,'active') && eventTarget.getAttribute('data-slide-to') ) {
        vars.index = parseInt( eventTarget.getAttribute('data-slide-to'), 10 );
      } else { return false; }
      self.slideTo( vars.index );
    }
    function controlsHandler(e) {
      e.preventDefault();
      if (vars.isSliding||vars.isTouch) { return; }
      var eventTarget = e.currentTarget || e.srcElement;
      if ( eventTarget === rightArrow ) {
        vars.index++;
      } else if ( eventTarget === leftArrow ) {
        vars.index--;
      }
      self.slideTo( vars.index );
    }
    function keyHandler(ref) {
      var which = ref.which;
      if (vars.isSliding||vars.isTouch) { return; }
      switch (which) {
        case 39:
          vars.index++;
          break;
        case 37:
          vars.index--;
          break;
        default: return;
      }
      self.slideTo( vars.index );
    }
    function toggleEvents(action) {
      if ( ops.pause && ops.interval ) {
        action( element, mouseHoverEvents[0], pauseHandler );
        action( element, mouseHoverEvents[1], resumeHandler );
        action( element, swipeEvents.start, pauseHandler, passiveHandler );
        action( element, swipeEvents.end, resumeHandler, passiveHandler );
      }
      if (ops.touch && slides.length > 2) {
        action( element, swipeEvents.start, touchDownHandler, passiveHandler );
        if ( action === on ) {
          addClass(element,'swipe');
        } else {
          removeClass(element,'swipe');
        }
      }
      rightArrow && action( rightArrow, 'click', controlsHandler );
      leftArrow && action( leftArrow, 'click', controlsHandler );
      indicator && action( indicator, 'click', indicatorHandler );
      ops.keyboard && action( window, 'keydown', keyHandler );
    }
    function toggleSlideStyle (styles,duration){
      var hasStyles = styles && styles instanceof Array && styles.length === 3;
      vars.touchSlides[0].style.transform = hasStyles ? ("translate3d(" + (styles[0]) + "px,0,0)") : '';
      vars.touchSlides[1].style.transform = hasStyles ? ("translate3d(" + (styles[1]) + "px,0,0)") : '';
      vars.touchSlides[2].style.transform = hasStyles ? ("translate3d(" + (styles[2]) + "px,0,0)") : '';
      vars.touchSlides[0].style.transitionProperty = hasStyles ? 'none' : '';
      vars.touchSlides[1].style.transitionProperty = hasStyles ? 'none' : '';
      vars.touchSlides[2].style.transitionProperty = hasStyles ? 'none' : '';
      if (hasStyles) {
        vars.touchSlides[0].style.display = 'block';
        vars.touchSlides[1].style.display = 'block';
        vars.touchSlides[2].style.display = 'block';
        vars.touchSlides[0].style.transitionTimingFunction = swipeTimingFunction;
        vars.touchSlides[1].style.transitionTimingFunction = swipeTimingFunction;
        vars.touchSlides[2].style.transitionTimingFunction = swipeTimingFunction;
        element.style.transitionTimingFunction = swipeTimingFunction;
      }
      if (duration) {
        vars.touchSlides[0].style.transitionDuration = duration + "ms";
        vars.touchSlides[1].style.transitionDuration = duration + "ms";
        vars.touchSlides[2].style.transitionDuration = duration + "ms";
        element.style.transitionDuration = duration + "ms";
      }
    }
    function getTouchSlides (){
      var activeIndex = self.getActiveIndex(),
          leftIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
          rightIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
      return vars.touchSlides = [ slides[leftIndex], slides[activeIndex], slides[rightIndex] ];
    }
    function afterSwipe (){
      if (vars.isTouch||vars.isSliding) {
        vars.touchSlides[0].style.transform = '';
        vars.touchSlides[1].style.transform = '';
        vars.touchSlides[2].style.transform = '';
        vars.touchSlides[0].style.transitionProperty = '';
        vars.touchSlides[1].style.transitionProperty = '';
        vars.touchSlides[2].style.transitionProperty = '';
        vars.touchSlides[0].style.transitionTimingFunction = '';
        vars.touchSlides[1].style.transitionTimingFunction = '';
        vars.touchSlides[2].style.transitionTimingFunction = '';
        vars.touchSlides[0].style.transitionDuration = '';
        vars.touchSlides[1].style.transitionDuration = '';
        vars.touchSlides[2].style.transitionDuration = '';
        vars.touchSlides[0].style.display = '';
        vars.touchSlides[1].style.display = '';
        vars.touchSlides[2].style.display = '';
        removeClass(element,'collapsing');
        setTimeout(function(){
          element.style.transitionTimingFunction = '';
          element.style.transitionDuration = '';
          element.style.height = '';
          vars.isTouch = 0;
          vars.isSliding = 0;
          vars.swipeDirection = null;
          vars.direction = null;
          clearTimeout(vars.timer);
          getTouchSlides();
        },17);
      }
    }
    function toggleTouchEvents (action){
      action( element, swipeEvents.move, touchMoveHandler );
      action( element, swipeEvents.cancel, touchCancelHandler );
      action( element, swipeEvents.end, touchEndHandler );
    }
    function touchEndAction (){
      var nullSlide = vars.swipeDirection === 'left' ? vars.touchSlides[0] : vars.touchSlides[2],
          otherSlide = vars.swipeDirection === 'right' ? vars.touchSlides[0] : vars.touchSlides[2],
          otherSlideTranslate = vars.swipeDirection === 'left' ? element.offsetWidth : -element.offsetWidth;
      toggleSlideStyle();
      nullSlide.style.display = '';
      otherSlide.style.transform = "translate3d(" + otherSlideTranslate + "px,0,0)";
      otherSlide.style.transitionTimingFunction = swipeTimingFunction;
      vars.touchSlides[1].style.transitionTimingFunction = swipeTimingFunction;
      emulateTransitionEnd(vars.touchSlides[1], afterSwipe);
    }
    function touchDownHandler(e) {
      if ( vars.isTouch || vars.isSliding ) { return; }
      vars.touchPosition.startX = parseInt(e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
      vars.touchPosition.startY = parseInt(e.changedTouches ? e.changedTouches[0].pageY : e.pageY);
      if ( e.type === 'mousedown' && e.which !== 1 ) { return }
      if ( element.querySelector('.carousel-inner').contains(e.target)
          && e.target !== leftArrow && !leftArrow.contains(e.target)
          && e.target !== rightArrow && !rightArrow.contains(e.target)
          && !indicator.contains(e.target) ) {
        if (   vars.touchSlides[1].offsetHeight !== vars.touchSlides[0].offsetHeight
            || vars.touchSlides[1].offsetHeight !== vars.touchSlides[2].offsetHeight ) {
          element.style.height = Math.ceil(vars.touchSlides[1].offsetHeight)+'px';
          addClass(element,'collapsing');
        }
        vars.isTouch = 1;
        toggleTouchEvents(on);
      }
    }
    function touchMoveHandler (e) {
      if ( !vars.isTouch ) { return }
      vars.touchPosition.currentX = parseInt(e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
      vars.touchPosition.currentY = parseInt(e.changedTouches ? e.changedTouches[0].pageY : e.pageY);
      var distance = Math.abs(vars.touchPosition.startX - vars.touchPosition.currentX),
          touchInterval = Math.abs(distance),
          translation, translations;
      if ( (e.type === 'touchmove' && e.changedTouches.length > 1) || ( e.type === 'mousemove' && e.which !== 1 ) ) {
        e.preventDefault();
      }
      if ( e.type === 'touchmove' && Math.abs(vars.touchPosition.startY - vars.touchPosition.currentY) < 20 ) {
        e.preventDefault();
      }
      if ( element.contains(e.target) && vars.touchPosition.startX !== vars.touchPosition.currentX ) {
        if ( vars.touchPosition.currentX < vars.touchPosition.startX ) {
          vars.swipeDirection = 'left';
        } else if ( vars.touchPosition.currentX > vars.touchPosition.startX ) {
          vars.swipeDirection = 'right';
        } else {
          vars.swipeDirection = null;
        }
        translation = (vars.swipeDirection === 'left') ? -distance : distance,
        translations = [(translation-element.offsetWidth), translation, (translation+element .offsetWidth)];
        touchInterval = touchInterval < 500 ? 500 : 1000;
        toggleSlideStyle(translations,touchInterval);
      }
    }
    function touchCancelHandler (e) {
      if ( !vars.isTouch ) {return}
      if ( vars.isTouch && e.type === 'mouseout' && ( !element.contains(e.target) || !element.contains(e.relatedTarget) )
        || vars.isTouch && e.type === 'touchcancel' ) {
        touchEndAction();
        toggleTouchEvents(off);
      }
    }
    function touchEndHandler(e) {
      if ( !vars.isTouch || vars.isTouch && e.type === 'mouseup' && e.which !== 1 ) { return }
      vars.touchPosition.endX = parseInt(e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
      if ( vars.touchPosition.endX < vars.touchPosition.startX ) {
        vars.swipeDirection = 'left';
      } else if ( vars.touchPosition.endX > vars.touchPosition.startX ) {
        vars.swipeDirection = 'right';
      } else {
        vars.swipeDirection = null;
      }
      var distance = Math.abs(vars.touchPosition.startX - vars.touchPosition.endX);
      if (distance >= 75) {
        vars.index += vars.swipeDirection === 'left' ? 1 : -1;
        toggleTouchEvents(off);
        touchEndAction();
        toggleSlideStyle();
        self.slideTo(vars.index);
      } else if ( distance && distance < 75 ) {
          cancelEvent = new Event(swipeEvents.cancel);
          element.dispatchEvent(cancelEvent);
      } else {
        afterSwipe();
      }
    }
    function setActivePage(pageIndex) {
      Array.from(indicators).map(function (x){removeClass(x,'active');});
      indicators[pageIndex] && addClass(indicators[pageIndex], 'active');
    }
    function transitionEndHandler(e){
      if (vars.isSliding){
        var next = vars.index,
            direction = vars.direction,
            activeItem = self.getActiveIndex(),
            orientation = direction === 'left' ? 'next' : 'prev';
        if (vars.direction){
          addClass(slides[next],'active');
          removeClass(slides[activeItem],'active');
          removeClass(slides[next],("carousel-item-" + orientation));
          removeClass(slides[next],("carousel-item-" + direction));
          removeClass(slides[activeItem],("carousel-item-" + direction));
          dispatchCustomEvent.call(element, slidCustomEvent);
          if ( !document.hidden && ops.interval && !hasClass(element,'paused') ) {
            self.cycle();
          }
          afterSwipe();
        }
      }
    }
    self.cycle = function () {
      if (vars.timer) {
        clearInterval(vars.timer);
        vars.timer = null;
      }
      vars.timer = setInterval(function () {
        var idx = vars.index || self.getActiveIndex();
        isElementInScrollRange(element) && (idx++, self.slideTo( idx ) );
      }, ops.interval);
    };
    self.slideTo = function (next) {
      if (vars.isSliding) { return; }
      var activeItem = self.getActiveIndex(), orientation;
      if ( activeItem === next ) {
        return;
      } else if  ( (activeItem < next ) || (activeItem === 0 && next === slides.length -1 ) ) {
        vars.direction = 'left';
      } else if  ( (activeItem > next) || (activeItem === slides.length - 1 && next === 0 ) ) {
        vars.direction = 'right';
      }
      if ( next < 0 ) { next = slides.length - 1; }
      else if ( next >= slides.length ){ next = 0; }
      orientation = vars.direction === 'left' ? 'next' : 'prev';
      slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', slides[next]);
      slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', slides[next]);
      dispatchCustomEvent.call(element, slideCustomEvent);
      if (slideCustomEvent.defaultPrevented) { return; }
      vars.index = next;
      vars.isSliding = 1;
      clearInterval(vars.timer);
      vars.timer = null;
      setActivePage( next );
      if ( getElementTransitionDuration(slides[next]) && hasClass(element,'slide') ) {
        addClass(slides[next],("carousel-item-" + orientation));
        slides[next].offsetWidth;
        addClass(slides[next],("carousel-item-" + (vars.direction)));
        addClass(slides[activeItem],("carousel-item-" + (vars.direction)));
        emulateTransitionEnd(slides[next], transitionEndHandler);
      } else {
        addClass(slides[next],'active');
        slides[next].offsetWidth;
        removeClass(slides[activeItem],'active');
        setTimeout(function () {
          vars.isSliding = 0;
          vars.isTouch = 0;
          if ( ops.interval && element && !hasClass(element,'paused') ) {
            self.cycle();
          }
          dispatchCustomEvent.call(element, slidCustomEvent);
        }, 100 );
      }
    };
    self.getActiveIndex = function () { return Array.from(slides).indexOf(element.getElementsByClassName('carousel-item active')[0]) || 0; };
    self.dispose = function () {
      var itemClasses = ['left','right','prev','next'];
      Array.from(slides).map(function (slide,idx) {
        hasClass(slide,'active') && setActivePage( idx );
        itemClasses.map(function (cls) { return removeClass(slide,("carousel-item-" + cls)); });
      });
      clearInterval(vars.timer);
      toggleEvents(off);
      toggleTouchEvents(off);
      afterSwipe();
      vars = {};
      delete element.Carousel;
    };
    tryWrapper(function (){
      element = queryElement( element );
      element.Carousel && element.Carousel.dispose();
      slides = element.getElementsByClassName('carousel-item');
      leftArrow = element.getElementsByClassName('carousel-control-prev')[0];
      rightArrow = element.getElementsByClassName('carousel-control-next')[0];
      indicator = element.getElementsByClassName('carousel-indicators')[0];
      indicators = indicator && indicator.getElementsByTagName( "LI" ) || [];
      if (slides.length < 2) { return; }
      var
        intervalAttribute = element.getAttribute('data-interval'),
        touchData = element.getAttribute('data-touch') === 'false' ? 0 : 1,
        intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
        pauseData = element.getAttribute('data-pause') === 'hover' || false,
        keyboardData = element.getAttribute('data-keyboard') === 'true' || false,
        intervalOption = options.interval,
        touchOption = options.touch;
      ops = {};
      ops.keyboard = options.keyboard === true || keyboardData;
      ops.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false;
      ops.touch = touchOption || touchData;
      ops.interval = typeof intervalOption === 'number' ? intervalOption
                  : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                  : isNaN(intervalData) ? 5000
                  : intervalData;
      if (self.getActiveIndex()<0) {
        slides.length && addClass(slides[0],'active');
        indicators.length && setActivePage(0);
      }
      vars = {};
      vars.direction = null;
      vars.swipeDirection = null;
      vars.index = 0;
      vars.timer = null;
      vars.isSliding = 0;
      vars.isTouch = 0;
      vars.touchSlides = [];
      vars.touchPosition = {
        startX : 0,
        currentX : 0,
        endX : 0
      };
      getTouchSlides();
      toggleEvents(on);
      if ( ops.interval ){ self.cycle(); }
      element.Carousel = self;
    },"BSN.Carousel");
  }

  componentsInit.Carousel = [ Carousel, '[data-ride="carousel"]' ];
  document.body ? initCallback() : one( document, 'DOMContentLoaded', initCallback );
  var index_custom = {
    Carousel: Carousel,
    Version: version
  };

  return index_custom;

})));
