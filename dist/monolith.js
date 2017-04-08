;(function () {
'use strict';

// -----------------------------------------------------------------------------
// productReviewAppModule is our single ngApp module for whole web app
// -----------------------------------------------------------------------------

angular.module('productReviewAppModule', ['titleModule', 'tabsModule', 'reviewFormModule']);
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
// fieldsModule is for self-validating form fields components.
// -----------------------------------------------------------------------------

angular.module('fieldsModule', ['stateModule', 'validatorModule']);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// textField component with such attr-options as:
// - name (required attribute)
// - label
// - multiline
// - required
// -----------------------------------------------------------------------------

var TextFieldController = function () {
    _createClass(TextFieldController, null, [{
        key: 'initClass',
        value: function initClass() {
            TextFieldController.getTemplate = function ($attrs) {
                var input = '';
                if (typeof $attrs.multiline === 'string') {
                    input = '\n                    <textarea\n                        i-textField-input="multiline"\n                        placeholder="[[::$ctrl.label]]"\n                        ng-model="$ctrl.value"\n                        ng-change="$ctrl.onChange()"\n                        ng-blur="$ctrl.onBlur()"\n                        rows="4"\n                    ></textarea>\n                ';
                } else {
                    input = '\n                    <input\n                        i-textField-input\n                        placeholder="[[::$ctrl.label]]"\n                        type="text"\n                        ng-model="$ctrl.value"\n                        ng-change="$ctrl.onChange()"\n                        ng-blur="$ctrl.onBlur()"\n                    >\n                ';
                }

                return '\n                <label i-textField="[[$ctrl.getValidModifier()]] [[::$ctrl.isRequired?\'required\':\'\']]">\n                    ' + input + '\n                </label>\n            ';
            };

            TextFieldController.$inject = ['$attrs', 'validator', 'state'];
        }
    }]);

    function TextFieldController($attrs, validator, state) {
        _classCallCheck(this, TextFieldController);

        if (typeof $attrs.name === 'undefined') {
            throw new Error('textField requires name attribute to work!');
        }

        this._validator = validator;
        this._state = state;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
        this.isRequired = typeof $attrs.required !== 'undefined';
        this.isValid = null;
    }

    _createClass(TextFieldController, [{
        key: 'onChange',
        value: function onChange() {
            this._verifyValue();
            this._saveValue();
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this._verifyValue();
            this._saveValue();
        }
    }, {
        key: '_verifyValue',
        value: function _verifyValue() {
            if (this.isRequired) {
                this.isValid = this._validator.isNonEmptyString(this.value);
            }
        }
    }, {
        key: '_saveValue',
        value: function _saveValue() {
            var currentState = this._state.get();
            var textFieldsData = currentState.textFields;
            if ((typeof textFieldsData === 'undefined' ? 'undefined' : _typeof(textFieldsData)) !== 'object') {
                textFieldsData = {};
            }
            textFieldsData[this.name] = {
                value: this.value,
                isValid: this.isValid,
                isRequired: this.isRequired
            };
            this._state.setParam('textFields', textFieldsData);
        }
    }, {
        key: 'getValidModifier',
        value: function getValidModifier() {
            if (this.isValid === true) {
                return 'valid';
            } else if (this.isValid === false) {
                return 'error';
            } else {
                return '';
            }
        }
    }]);

    return TextFieldController;
}();

TextFieldController.initClass();

angular.module('fieldsModule').component('textField', {
    controller: TextFieldController,
    template: TextFieldController.getTemplate
});
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
// reviewFormModule is for managing review form inputs.
// -----------------------------------------------------------------------------

angular.module('reviewFormModule', ['fieldsModule', 'tabsModule']);

angular.module('reviewFormModule').run(['reviewFormChecker', angular.noop]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// reviewFormChecker is a service for managing first tab state.
// -----------------------------------------------------------------------------

var ReviewFormCheckerService = function () {
    _createClass(ReviewFormCheckerService, null, [{
        key: 'initClass',
        value: function initClass() {
            ReviewFormCheckerService.tabId = 's1';
            ReviewFormCheckerService.nextTabId = 's2';
            ReviewFormCheckerService.$inject = ['state', 'tabs'];
        }
    }]);

    function ReviewFormCheckerService(state, tabs) {
        _classCallCheck(this, ReviewFormCheckerService);

        this._state = state;
        this._tabs = tabs;

        this._state.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange();

        // show first tab
        this._tabs.showTab(ReviewFormCheckerService.tabId);
    }

    _createClass(ReviewFormCheckerService, [{
        key: '_onStateChange',
        value: function _onStateChange() {
            var textFieldsState = this._state.getParam('textFields');

            if (textFieldsState !== null) {
                this._tabs.unlockTab(ReviewFormCheckerService.tabId);
                if (typeof textFieldsState.yourName !== 'undefined' && textFieldsState.yourName.isValid === true && typeof textFieldsState.review !== 'undefined' && textFieldsState.review.isValid === true) {
                    this._tabs.unlockTab(ReviewFormCheckerService.nextTabId);
                } else {
                    this._tabs.lockTab(ReviewFormCheckerService.nextTabId);
                }
            }
        }
    }]);

    return ReviewFormCheckerService;
}();

ReviewFormCheckerService.initClass();

angular.module('reviewFormModule').service('reviewFormChecker', ReviewFormCheckerService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// reviewFormErrorCtrl -- handles displaying error message.
// -----------------------------------------------------------------------------

var ReviewFormErrorController = function () {
    _createClass(ReviewFormErrorController, null, [{
        key: 'initClass',
        value: function initClass() {
            ReviewFormErrorController.tabId = 's1';
            ReviewFormErrorController.$inject = ['state'];
        }
    }]);

    function ReviewFormErrorController(state) {
        _classCallCheck(this, ReviewFormErrorController);

        this._state = state;
        this.isVisible = false;
        this._state.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange();
    }

    _createClass(ReviewFormErrorController, [{
        key: '_onStateChange',
        value: function _onStateChange() {
            var tabsState = this._state.getParam('tabs');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tabsState[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tab = _step.value;

                    if (tab.id === ReviewFormErrorController.tabId) {
                        if (!tab.isUnlocked) {
                            return;
                        }
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

            var textFieldsState = this._state.getParam('textFields');
            this.isVisible = false;
            if (textFieldsState !== null) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.keys(textFieldsState)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var fieldName = _step2.value;

                        if (textFieldsState[fieldName].isValid === false) {
                            this.isVisible = true;
                            break;
                        }
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
        }
    }]);

    return ReviewFormErrorController;
}();

ReviewFormErrorController.initClass();

angular.module('reviewFormModule').controller('reviewFormErrorCtrl', ReviewFormErrorController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// reviewFormNextButtonCtrl -- handles displaying error message.
// -----------------------------------------------------------------------------

var ReviewFormNextButtonController = function () {
    _createClass(ReviewFormNextButtonController, null, [{
        key: 'initClass',
        value: function initClass() {
            ReviewFormNextButtonController.tabId = 's1';
            ReviewFormNextButtonController.nextTabId = 's2';
            ReviewFormNextButtonController.$inject = ['state', 'tabs'];
        }
    }]);

    function ReviewFormNextButtonController(state, tabs) {
        _classCallCheck(this, ReviewFormNextButtonController);

        this._state = state;
        this._tabs = tabs;
    }

    _createClass(ReviewFormNextButtonController, [{
        key: 'tryGoNext',
        value: function tryGoNext() {
            this._tabs.unlockTab(ReviewFormNextButtonController.tabId);

            var tabsState = this._state.getParam('tabs');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tabsState[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tab = _step.value;

                    if (tab.id === ReviewFormNextButtonController.nextTabId) {
                        if (tab.isUnlocked) {
                            this._tabs.showTab(ReviewFormNextButtonController.nextTabId);
                        }
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
        }
    }]);

    return ReviewFormNextButtonController;
}();

ReviewFormNextButtonController.initClass();

angular.module('reviewFormModule').controller('reviewFormNextButtonCtrl', ReviewFormNextButtonController);
'use strict';

// -----------------------------------------------------------------------------
// stateModule keeps all the app data.
// -----------------------------------------------------------------------------

angular.module('stateModule', ['observableModule']);
'use strict';

angular.module('stateModule').constant('initialReviewState', {
    currentStepId: null,
    steps: [{
        id: 'review',
        isVisibleInMenu: false,
        isUnlocked: false,
        isErrorVisible: false
    }, {
        id: 'socials',
        isVisibleInMenu: false,
        isUnlocked: false
    }, {
        id: 'summary',
        isVisibleInMenu: false,
        isUnlocked: false
    }, {
        id: 'final',
        isVisibleInMenu: false,
        isUnlocked: false
    }],
    fields: {
        yourName: {
            value: null,
            isRequired: true,
            isValid: null
        },
        title: {
            value: null,
            isRequired: false,
            isValid: null
        },
        review: {
            value: null,
            isRequired: true,
            isValid: null
        },
        stars: {
            value: null,
            isRequired: true,
            isValid: null
        }
    },
    socials: {
        facebook: null,
        twitter: null,
        linkedIn: null
    }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// reviewActions is a service that has all methods for updating reviewStore
// state partials.
// -----------------------------------------------------------------------------

var ReviewActionsService = function () {
    _createClass(ReviewActionsService, null, [{
        key: 'initClass',
        value: function initClass() {
            ReviewActionsService.$inject = ['reviewStore'];
        }
    }]);

    function ReviewActionsService(reviewStore) {
        _classCallCheck(this, ReviewActionsService);

        this._reviewStore = reviewStore;
    }

    _createClass(ReviewActionsService, [{
        key: 'setField',
        value: function setField(fieldName, value) {
            // set value
            // validate
            // set areFieldsValid by checking all fields
            // check unlock step two
        }
    }, {
        key: 'setSocial',
        value: function setSocial(socialName, isChecked) {
            // set value
        }
    }, {
        key: 'setReviewError',
        value: function setReviewError() {
            // set step one error
        }
    }, {
        key: 'setCurrentStepId',
        value: function setCurrentStepId(stepId) {
            // set current step id
        }
    }]);

    return ReviewActionsService;
}();

ReviewActionsService.initClass();

angular.module('stateModule').service('reviewActions', ReviewActionsService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// reviewStore is a service that keeps global state data.
// -----------------------------------------------------------------------------

var ReviewStoreService = function () {
    _createClass(ReviewStoreService, null, [{
        key: 'initClass',
        value: function initClass() {
            ReviewStoreService.$inject = ['Observable', 'initialReviewState'];
        }
    }]);

    function ReviewStoreService(Observable, initialReviewState) {
        _classCallCheck(this, ReviewStoreService);

        this._state = _.cloneDeep(initialReviewState);
        this._stateObservable = new Observable();
    }

    _createClass(ReviewStoreService, [{
        key: 'registerStateObserver',
        value: function registerStateObserver(observer) {
            return this._stateObservable.register(observer);
        }
    }, {
        key: 'getState',
        value: function getState() {
            return _.cloneDeep(this._state);
        }
    }, {
        key: 'setState',
        value: function setState(newState) {
            if (!_.isEqual(newState, this._state)) {
                this._state = newState;
                this._stateObservable.notify(this.getState());
            }
        }
    }]);

    return ReviewStoreService;
}();

ReviewStoreService.initClass();

angular.module('stateModule').service('reviewStore', ReviewStoreService);
'use strict';

// -----------------------------------------------------------------------------
// tabsModule is for displaying and managing tabs.
// -----------------------------------------------------------------------------

angular.module('tabsModule', ['stateModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// tabs is a service for changing current and unlocking tabs.
// -----------------------------------------------------------------------------

var TabsService = function () {
    _createClass(TabsService, null, [{
        key: 'initClass',
        value: function initClass() {
            TabsService.initialTabsState = [{
                id: 's1',
                name: 'Step 1',
                isUnlocked: false,
                isVisible: false
            }, {
                id: 's2',
                name: 'Step 2',
                isUnlocked: false,
                isVisible: false
            }, {
                id: 's3',
                name: 'Step 3',
                isUnlocked: false,
                isVisible: false
            }];

            TabsService.$inject = ['state'];
        }
    }]);

    function TabsService(state) {
        _classCallCheck(this, TabsService);

        this._state = state;
        // set initial tabs state
        this._state.setParam('tabs', TabsService.initialTabsState);
    }

    _createClass(TabsService, [{
        key: 'hideTabs',
        value: function hideTabs() {
            var currentState = this._state.get();
            var tabsData = currentState.tabs;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tabsData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tab = _step.value;

                    this._changeTabProperty(tab.id, 'isVisible', false);
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
        }
    }, {
        key: 'showTab',
        value: function showTab(tabId) {
            var currentState = this._state.get();
            var tabsData = currentState.tabs;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = tabsData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var tab = _step2.value;

                    if (tab.id === tabId) {
                        this._changeTabProperty(tab.id, 'isVisible', true);
                    } else {
                        this._changeTabProperty(tab.id, 'isVisible', false);
                    }
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
        key: 'lockTab',
        value: function lockTab(tabId) {
            this._changeTabProperty(tabId, 'isUnlocked', false);
        }
    }, {
        key: 'unlockTab',
        value: function unlockTab(tabId) {
            this._changeTabProperty(tabId, 'isUnlocked', true);
        }
    }, {
        key: '_changeTabProperty',
        value: function _changeTabProperty(tabId, propertyName, propertyValue) {
            var currentState = this._state.get();
            var tabsData = currentState.tabs;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = tabsData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var tab = _step3.value;

                    if (tab.id === tabId) {
                        tab[propertyName] = propertyValue;
                        break;
                    }
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

            this._state.setParam('tabs', tabsData);
        }
    }]);

    return TabsService;
}();

TabsService.initClass();

angular.module('tabsModule').service('tabs', TabsService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// tabsContentCtrl -- handles displaying tabs content.
// -----------------------------------------------------------------------------

var TabsContentController = function () {
    _createClass(TabsContentController, null, [{
        key: 'initClass',
        value: function initClass() {
            TabsContentController.$inject = ['state'];
        }
    }]);

    function TabsContentController(state) {
        _classCallCheck(this, TabsContentController);

        this._state = state;
        this.areTabsVisible = {};
        this._state.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange();
    }

    _createClass(TabsContentController, [{
        key: '_onStateChange',
        value: function _onStateChange() {
            var tabsState = this._state.getParam('tabs');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tabsState[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tab = _step.value;

                    this.areTabsVisible[tab.id] = tab.isVisible;
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
        }
    }]);

    return TabsContentController;
}();

TabsContentController.initClass();

angular.module('tabsModule').controller('tabsContentCtrl', TabsContentController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// tabsMenuCtrl -- handles displaying tabs and changing current tab.
// -----------------------------------------------------------------------------

var TabsMenuController = function () {
    _createClass(TabsMenuController, null, [{
        key: 'initClass',
        value: function initClass() {
            TabsMenuController.$inject = ['state', 'tabs'];
        }
    }]);

    function TabsMenuController(state, tabs) {
        _classCallCheck(this, TabsMenuController);

        this._state = state;
        this._tabs = tabs;

        this._state.registerStateObserver(this._onStateChange.bind(this));

        this.options = {};

        // get initial state
        this._onStateChange();
    }

    _createClass(TabsMenuController, [{
        key: '_onStateChange',
        value: function _onStateChange() {
            this.options = this._state.getParam('tabs');
        }
    }, {
        key: 'showTab',
        value: function showTab(tabId) {
            this._tabs.showTab(tabId);
        }
    }]);

    return TabsMenuController;
}();

TabsMenuController.initClass();

angular.module('tabsModule').controller('tabsMenuCtrl', TabsMenuController);
'use strict';

// -----------------------------------------------------------------------------
// titleModule is for displaying a title.
// -----------------------------------------------------------------------------

angular.module('titleModule', ['stateModule', 'urlParamsModule']);

angular.module('titleModule').run(['title', angular.noop]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// title is a service for connecting url param with state.
// -----------------------------------------------------------------------------

var TitleService = function () {
    _createClass(TitleService, null, [{
        key: 'initClass',
        value: function initClass() {
            TitleService.$inject = ['state', 'urlParams'];
        }
    }]);

    function TitleService(state, urlParams) {
        _classCallCheck(this, TitleService);

        // set initial title state from url params
        state.setParam('title', urlParams.getParam('product'));
    }

    return TitleService;
}();

TitleService.initClass();

angular.module('titleModule').service('title', TitleService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// titleCtrl -- handles displaying a title.
// -----------------------------------------------------------------------------

var TitleController = function () {
    _createClass(TitleController, null, [{
        key: 'initClass',
        value: function initClass() {
            TitleController.$inject = ['state'];
        }
    }]);

    function TitleController(state) {
        _classCallCheck(this, TitleController);

        this._state = state;
        this._state.registerStateObserver(this._onStateChange.bind(this));

        this.text = null;

        // get initial state
        this._onStateChange();
    }

    _createClass(TitleController, [{
        key: '_onStateChange',
        value: function _onStateChange() {
            this.text = this._state.getParam('title');
        }
    }]);

    return TitleController;
}();

TitleController.initClass();

angular.module('titleModule').controller('titleCtrl', TitleController);
'use strict';

// -----------------------------------------------------------------------------
// urlParamsModule is for reading search params from url.
// -----------------------------------------------------------------------------

angular.module('urlParamsModule', []);

angular.module('urlParamsModule').config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
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
'use strict';

// -----------------------------------------------------------------------------
// validatorModule is for validating inputs.
// -----------------------------------------------------------------------------

angular.module('validatorModule', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// validator checks if given input matches the rules.
// -----------------------------------------------------------------------------

var ValidatorService = function () {
    function ValidatorService() {
        _classCallCheck(this, ValidatorService);
    }

    _createClass(ValidatorService, [{
        key: 'isNonEmptyString',
        value: function isNonEmptyString(string) {
            if (typeof string === 'string') {
                return string.trim().length > 0;
            } else {
                return false;
            }
        }
    }, {
        key: 'isIntegerInRange',
        value: function isIntegerInRange(number, min, max) {
            if (Number.isInteger(number)) {
                return number >= min && number <= max;
            } else {
                return false;
            }
        }
    }]);

    return ValidatorService;
}();

angular.module('validatorModule').service('validator', ValidatorService);
})();
