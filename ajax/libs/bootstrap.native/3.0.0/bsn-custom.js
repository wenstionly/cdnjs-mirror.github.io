/*!
  * Native JavaScript for Bootstrap v3.0.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.BSN = factory());
}(this, (function () { 'use strict';

  var version = "3.0.0";

  var transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';

  var transitionEndEvent = 'webkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend';

  var support3DTransform = 'webkitPerspective' in document.body.style || 'perspective' in document.body.style;

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

  var supportTransform = 'webkitTransform' in document.body.style || 'transform' in document.body.style;

  var supportTransition = 'webkitTransition' in document.body.style || 'transition' in document.body.style;

  function removeClass(element,classNAME) {
    element.classList.remove(classNAME);
  }

  function hasClass(element,classNAME) {
    return element.classList.contains(classNAME)
  }

  function getElementTransitionDuration (element) {
    var duration = supportTransition ? window.getComputedStyle(element)[transitionDuration] : 0;
    duration = parseFloat(duration);
    duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
    return duration;
  }

  function emulateTransitionEnd (element,handler){
    var called = 0, duration = getElementTransitionDuration(element);
    duration ? one(element, transitionEndEvent, function(e){ !called && handler(e), called = 1; })
             : setTimeout(function() { !called && handler(), called = 1; }, 17);
  }

  function queryElement (selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function bootstrapCustomEvent (eventName, componentName, related) {
    var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
    OriginalCustomEvent.relatedTarget = related;
    return OriginalCustomEvent;
  }
  function dispatchCustomEvent (customEvent){
    this && this.dispatchEvent(customEvent);
  }

  function componentInit(fn){
    try{ fn(); }
    catch(e){
      console.error(("BSN: " + e));
    }
  }

  function Alert(element) {
    var self = this,
      alert,
      closeCustomEvent = bootstrapCustomEvent('close','alert'),
      closedCustomEvent = bootstrapCustomEvent('closed','alert');
    function triggerHandler() {
      hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler();
    }
    function clickHandler(e) {
      alert = e && e.target.closest(".alert");
      element = queryElement('[data-dismiss="alert"]',alert);
      element && alert && (element === e.target || element.contains(e.target)) && self.close();
    }
    function transitionEndHandler() {
      off(element, 'click', clickHandler);
      alert.parentNode.removeChild(alert);
      dispatchCustomEvent.call(alert,closedCustomEvent);
    }
    self.close = function () {
      if ( alert && element && hasClass(alert,'show') ) {
        dispatchCustomEvent.call(alert,closeCustomEvent);
        if ( closeCustomEvent.defaultPrevented ) { return; }
        self.dispose();
        removeClass(alert,'show');
        triggerHandler();
      }
    };
    self.dispose = function () {
      off(element, 'click', clickHandler);
      delete element.Alert;
    };
    componentInit(function (){
      element = queryElement(element);
      alert = element.closest('.alert');
      element.Alert && element.Alert.dispose();
      if ( !element.Alert ) {
        on(element, 'click', clickHandler);
      }
      self.element = element;
      element.Alert = self;
    });
  }

  var index_custom = {
    Alert: Alert,
    Version: version
  };

  return index_custom;

})));
