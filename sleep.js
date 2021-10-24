var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Simplified logging
 */
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
    return;
};
/**
 * The most versatile man himself
 */
var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.prototype.operate = function () {
        var decision = this.manage();
        return "Used myself to manage out a good decision: " + decision.brainstorm();
    };
    return Manager;
}());
/**
 * Concrete decisions
 */
var SpecificDecision1 = /** @class */ (function () {
    function SpecificDecision1() {
    }
    SpecificDecision1.prototype.brainstorm = function () {
        return 'decision1 - this one was straight up bad';
    };
    return SpecificDecision1;
}());
var SpecificDecision2 = /** @class */ (function () {
    function SpecificDecision2() {
    }
    SpecificDecision2.prototype.brainstorm = function () {
        return 'decision2 - wow, a suprisingly good idea!';
    };
    return SpecificDecision2;
}());
/**
 * Much more narrow guys
 */
var SpecificManager1 = /** @class */ (function (_super) {
    __extends(SpecificManager1, _super);
    function SpecificManager1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecificManager1.prototype.manage = function () {
        return new SpecificDecision1();
    };
    return SpecificManager1;
}(Manager));
var SpecificManager2 = /** @class */ (function (_super) {
    __extends(SpecificManager2, _super);
    function SpecificManager2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecificManager2.prototype.manage = function () {
        return new SpecificDecision2();
    };
    return SpecificManager2;
}(Manager));
/**
 * the main code of the fictional app, won't think of a topic now, improvise
 * oh, got it: managers of team of: developers, designers, ...
 * one team, different people with different tasks, one manager:
 * developer/code decision, design decisions, etc.
 */
var run = function (manager) {
    log('idk, it\'s 03:00');
    log('run this hot garbo: ', manager.operate());
};
log('run the app with a specific master/creator/manager №1');
run(new SpecificManager1());
log();
log('run the app with a specific master/creator/... №2');
run(new SpecificManager2);
