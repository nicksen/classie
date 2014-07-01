
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.classie = factory();
  }
}(this, function(require, exports, module) {

"use strict";

function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var classie, hasClass, addClass, removeClass;

if ("classList" in document.documentElement) {
    hasClass = function (node, className) {
        return node.classList.contains(className);
    };

    addClass = function (node, className) {
        node.classList.add(className);
        return classie;
    };

    removeClass = function (node, className) {
        node.classList.remove(className);
        return classie;
    };
} else {
    hasClass = function (node, className) {
        return classReg(className).test(node.className);
    };

    addClass = function (node, className) {
        if (!hasClass(className)) {
            node.className = node.className + " " + className;
        }

        return classie;
    };

    removeClass = function (node, className) {
        node.className = node.className.replace(classReg(className), " ");
        return classie;
    };
}

function toggleClass(node, className) {
    var fn = hasClass(className) ? removeClass : addClass;
    return fn(node, className);
}

classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,

    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
};

return classie;

}));
