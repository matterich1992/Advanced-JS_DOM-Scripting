(function() {
  $ = function(selector) {};

  $.extend = function(target, object) { // takes second object arg properties and copies them into the target object
    for(var prop in object){
        if(object.hasOwnProperty(prop)){
      target[prop] = object[prop];
    }
  }
    return target;
  };

  // Static methods
  var isArrayLike = function(obj) {
    if(typeof obj.length === 'number'){
      if(obj.length=== 0){
        return true;
      } else if(obj.length > 0){
        return (obj.length - 1) in obj; // making sure that there is a property at the end

      }
   }
   return false;
  };

  $.extend($, {
    
    isArray: function(obj) {
     
      return Object.prototype.toString.call(obj)==='[object Array]';
    },

    each: function(collection, cb) {
      if(isArrayLike(collection)){
        for(var i =0;i<collection.length;i++){
          cb.call(collection[i], i, collection[i]);
        }
      } else {
        for (var key in collection){
          if(collection.hasOwnProperty(key)){
          cb.call(collection[key], key, collection[key]);
        }
       }
      }
      return collection;
    },
    makeArray: function(arr) {
      var array = [];
      $.each(arr, function(i,value){
        array.push(value);
      });
      return array;
    },
    proxy: function(fn, context) {
      return function(){
        return fn.apply(context,arguments)
      };
    }
  });

  $.extend($.prototype, {
    html: function(newHtml) {},
    val: function(newVal) {},
    text: function(newText) {},
    find: function(selector) {},
    next: function() {},
    prev: function() {},
    parent: function() {},
    children: function() {},
    attr: function(attrName, value) {},
    css: function(cssPropName, value) {},
    width: function() {},
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    hide: function() {},
    show: function() {},

    // Events
    bind: function(eventName, handler) {},
    unbind: function(eventName, handler) {},
    has: function(selector) {
      var elements = [];
	
      $.each(this, function(i, el) {
        if(el.matches(selector)) {
          elements.push(el);
        }
      });
    
      return $( elements );
    },
    on: function(eventType, selector, handler) {
      return this.bind(eventType, function(ev){
        var cur = ev.target;
        do {
          if ($([ cur ]).has(selector).length) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      });
    },
    off: function(eventType, selector, handler) {},
    data: function(propName, data) {},

    // Extra
    addClass: function(className) {},
    removeClass: function(className) {},
    append: function(element) {}
  });

  $.buildFragment = function(html) {};
})();