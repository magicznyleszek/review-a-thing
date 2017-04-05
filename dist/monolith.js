;(function () {
'use strict';

// -----------------------------------------------------------------------------
// productReviewAppModule is our single ngApp module for whole web app
// -----------------------------------------------------------------------------

angular.module('productReviewAppModule', []);
'use strict';

// -----------------------------------------------------------------------------
// tweak default angular configuration
// -----------------------------------------------------------------------------

angular.module('productReviewAppModule').config(['$interpolateProvider', '$compileProvider', function ($interpolateProvider, $compileProvider) {
    // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    // We're disabling angular debug info - significant performance boost
    $compileProvider.debugInfoEnabled(false);
    // Don't look for directives in comments and classes (~10% boost)
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
}]);
'use strict';

// -----------------------------------------------------------------------------
// observableModule is for managing a list of observers.
// -----------------------------------------------------------------------------

angular.module('observableModule', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// observable is a factory that creates a new instance of observer pattern.
// It handles adding observers, running them and removing.
// Any service that would like to keep a list of observers of some kind, can
// easily use this object for handling common logic of keeping and controlling
// sets of callback (observers) functions.
// -----------------------------------------------------------------------------

var ObservableModel = function () {
    function ObservableModel() {
        _classCallCheck(this, ObservableModel);

        this._observers = [];
        this._amountOfObservers = 0;
        this._observersToRemove = [];
        this._amountToRemove = 0;
        this._stateObservers = [];
        this._isActive = false;
    }

    _createClass(ObservableModel, [{
        key: '_createCancelFunction',
        value: function _createCancelFunction(observerToCancel, afterCancelCallback) {
            return function () {
                afterCancelCallback(observerToCancel);
                observerToCancel = null;
                afterCancelCallback = null;
            };
        }
    }, {
        key: '_afterCancel',
        value: function _afterCancel(observerToRemove) {
            this._amountToRemove = this._observersToRemove.push(observerToRemove);
        }
    }, {
        key: '_cleanRemovedObservers',
        value: function _cleanRemovedObservers() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._observersToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var observerToRemove = _step.value;

                    var indexOf = this._observers.indexOf(observerToRemove);
                    if (indexOf !== -1) {
                        this._observers.splice(indexOf, 1);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._amountOfObservers = this._observers.length;
            this._amountToRemove = 0;
            this._observersToRemove.length = 0;
            this._updateState(this._amountOfObservers > 0);
        }
    }, {
        key: '_updateState',
        value: function _updateState(newActiveState) {
            if (this._isActive === newActiveState) {
                return;
            }

            this._isActive = newActiveState;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._stateObservers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var stateObserver = _step2.value;

                    stateObserver(this._isActive);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'register',
        value: function register(newObserver) {
            this._amountOfObservers = this._observers.push(newObserver);
            this._updateState(true);
            return this._createCancelFunction(newObserver, this._afterCancel.bind(this));
        }
    }, {
        key: 'notify',
        value: function notify() {
            if (this._amountToRemove !== 0) {
                this._cleanRemovedObservers();
            }

            if (!this._isActive) {
                return;
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (this._amountOfObservers === 1) {
                this._observers[0].apply(null, args);
                return;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._observers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var observer = _step3.value;

                    observer.apply(null, args);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'onStateChange',
        value: function onStateChange(stateObserver) {
            return this._stateObservers.push(stateObserver);
        }
    }]);

    return ObservableModel;
}();

angular.module('observableModule').factory('Observable', function () {
    return ObservableModel;
});
'use strict';

// -----------------------------------------------------------------------------
// urlParamsModule is for reading search params from url.
// -----------------------------------------------------------------------------

angular.module('urlParamsModule', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// urlParams reads window location search params
// -----------------------------------------------------------------------------

var UrlParamsService = function () {
    _createClass(UrlParamsService, null, [{
        key: 'initClass',
        value: function initClass() {
            UrlParamsService.$inject = ['$location'];
        }
    }]);

    function UrlParamsService($location) {
        _classCallCheck(this, UrlParamsService);

        this._$location = $location;
    }

    _createClass(UrlParamsService, [{
        key: 'getParam',
        value: function getParam(paramName) {
            var searchParams = this._$location.search();
            if (typeof searchParams[paramName] === 'undefined') {
                return null;
            } else {
                return searchParams[paramName];
            }
        }
    }]);

    return UrlParamsService;
}();

UrlParamsService.initClass();

angular.module('urlParamsModule').service('urlParams', UrlParamsService);
})();
