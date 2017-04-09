;(function () {
'use strict';

// -----------------------------------------------------------------------------
// productReviewAppModule is our single ngApp module for whole web app
// -----------------------------------------------------------------------------

angular.module('productReviewAppModule', ['titleModule', 'stepsModule', 'reviewFormModule']);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// starsField component with such attr-options as:
// - name (required attribute)
// - label
// - required
// -----------------------------------------------------------------------------

var StarsFieldController = function () {
    _createClass(StarsFieldController, null, [{
        key: 'initClass',
        value: function initClass() {
            StarsFieldController.getTemplate = function () {
                return '\n                <label i-starsField="[[$ctrl.getValidModifier()]] [[::$ctrl.isRequired?\'required\':\'\']]">\n                    <span\n                        i-starsField-label\n                        ng-if="::$ctrl.label"\n                        ng-bind="::$ctrl.label"\n                    ></span>\n\n                    <button\n                        ng-repeat="number in [1, 2, 3, 4, 5]"\n                        i-starsField-star\n                        ng-click="$ctrl.setValue(number)"\n                        ng-bind="$ctrl.getStarText(number)"\n                    ></button>\n                </label>\n            ';
            };

            StarsFieldController.$inject = ['$attrs', 'appStore', 'appActions'];
        }
    }]);

    function StarsFieldController($attrs, appStore, appActions) {
        _classCallCheck(this, StarsFieldController);

        if (typeof $attrs.name === 'undefined') {
            throw new Error('starsField requires name attribute to work!');
        }

        this._appActions = appActions;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
        this.isRequired = typeof $attrs.required !== 'undefined';
        this._isValid = null;

        appStore.registerStateObserver(this._onStateChange.bind(this));
    }

    _createClass(StarsFieldController, [{
        key: '_onStateChange',
        value: function _onStateChange(state) {
            this._isValid = state.fields[this.name].isValid;
        }
    }, {
        key: 'setValue',
        value: function setValue(number) {
            this.value = number;
            this._appActions.setField(this.name, this.value);
        }
    }, {
        key: 'getStarText',
        value: function getStarText(number) {
            if (number > this.value) {
                return '☆';
            } else {
                return '★';
            }
        }
    }, {
        key: 'getValidModifier',
        value: function getValidModifier() {
            if (this._isValid === true) {
                return 'valid';
            } else if (this._isValid === false) {
                return 'error';
            } else {
                return '';
            }
        }
    }]);

    return StarsFieldController;
}();

StarsFieldController.initClass();

angular.module('fieldsModule').component('starsField', {
    controller: StarsFieldController,
    template: StarsFieldController.getTemplate
});
'use strict';

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

            TextFieldController.$inject = ['$attrs', 'appStore', 'appActions'];
        }
    }]);

    function TextFieldController($attrs, appStore, appActions) {
        _classCallCheck(this, TextFieldController);

        if (typeof $attrs.name === 'undefined') {
            throw new Error('textField requires name attribute to work!');
        }

        this._appActions = appActions;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
        this.isRequired = typeof $attrs.required !== 'undefined';
        this._isValid = null;

        appStore.registerStateObserver(this._onStateChange.bind(this));
    }

    _createClass(TextFieldController, [{
        key: '_onStateChange',
        value: function _onStateChange(state) {
            this._isValid = state.fields[this.name].isValid;
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            this._appActions.setField(this.name, this.value);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this._appActions.setField(this.name, this.value);
        }
    }, {
        key: 'getValidModifier',
        value: function getValidModifier() {
            if (this._isValid === true) {
                return 'valid';
            } else if (this._isValid === false) {
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

angular.module('reviewFormModule', ['fieldsModule', 'stateModule']);
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
            ReviewFormErrorController.stepId = 'review';
            ReviewFormErrorController.$inject = ['appStore'];
        }
    }]);

    function ReviewFormErrorController(appStore) {
        _classCallCheck(this, ReviewFormErrorController);

        this.isVisible = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _createClass(ReviewFormErrorController, [{
        key: '_onStateChange',
        value: function _onStateChange(state) {
            this.isVisible = state.steps.get('review').isErrorVisible;
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
// reviewFormNextButtonCtrl -- handles a button for going to next step.
// -----------------------------------------------------------------------------

var ReviewFormNextButtonController = function () {
    _createClass(ReviewFormNextButtonController, null, [{
        key: 'initClass',
        value: function initClass() {
            ReviewFormNextButtonController.$inject = ['appStore', 'appActions'];
        }
    }]);

    function ReviewFormNextButtonController(appStore, appActions) {
        _classCallCheck(this, ReviewFormNextButtonController);

        this._appStore = appStore;
        this._appActions = appActions;
    }

    _createClass(ReviewFormNextButtonController, [{
        key: 'tryGoNext',
        value: function tryGoNext() {
            var state = this._appStore.getState();

            var areAllRequiredFieldsValid = true;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(state.fields)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var fieldName = _step.value;

                    if (state.fields[fieldName].isRequired && state.fields[fieldName].isValid !== true) {
                        areAllRequiredFieldsValid = false;
                        break;
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

            if (areAllRequiredFieldsValid) {
                this._appActions.setCurrentStepId('socials');
            } else {
                this._appActions.setReviewError(true);
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

angular.module('stateModule', ['observableModule', 'validatorModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// appActions is a service that has all methods for updating appStore
// state partials.
// -----------------------------------------------------------------------------

var appActionsService = function () {
    _createClass(appActionsService, null, [{
        key: 'initClass',
        value: function initClass() {
            appActionsService.$inject = ['appStore', 'validator'];
        }
    }]);

    function appActionsService(appStore, validator) {
        _classCallCheck(this, appActionsService);

        this._appStore = appStore;
        this._validator = validator;
    }

    _createClass(appActionsService, [{
        key: 'setProductTitle',
        value: function setProductTitle(title) {
            var state = this._appStore.getState();

            state.productTitle = title;

            this._appStore.setState(state);
        }
    }, {
        key: 'setField',
        value: function setField(fieldName, value) {
            var state = this._appStore.getState();

            if (typeof state.fields[fieldName] === 'undefined') {
                throw new Error('Unknown field: "' + fieldName + '"!');
            }

            state.fields[fieldName].value = value;

            // set areFieldsValid by checking all fields
            // check unlock step two

            this._appStore.setState(state);

            this._validateField(fieldName);
        }
    }, {
        key: '_validateField',
        value: function _validateField(fieldName) {
            var state = this._appStore.getState();
            var field = state.fields[fieldName];

            if (typeof field === 'undefined') {
                throw new Error('Unknown field: "' + fieldName + '"!');
            }

            if (field.isRequired) {
                if (field.validityType === 'text') {
                    field.isValid = this._validator.isNonEmptyString(field.value);
                } else if (field.validityType === 'rating') {
                    field.isValid = this._validator.isIntegerInRange(field.value, 1, 5);
                }
            } else {
                field.isValid = true;
            }

            this._appStore.setState(state);
        }
    }, {
        key: '_validateAllFields',
        value: function _validateAllFields() {
            var state = this._appStore.getState();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(state.fields)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var fieldName = _step.value;

                    this._validateField(fieldName);
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
        key: 'setSocial',
        value: function setSocial(socialName, isChecked) {
            var state = this._appStore.getState();

            if (typeof state.socials[socialName] === 'undefined') {
                throw new Error('Unknown social: "' + socialName + '"!');
            }

            state.socials[socialName] = isChecked;

            this._appStore.setState(state);
        }
    }, {
        key: 'setReviewError',
        value: function setReviewError(isErrored) {
            var state = this._appStore.getState();
            state.steps.get('review').isErrorVisible = isErrored;

            this._appStore.setState(state);

            this._validateAllFields();
        }
    }, {
        key: 'setCurrentStepId',
        value: function setCurrentStepId(stepId) {
            var state = this._appStore.getState();

            if (typeof state.steps.get(stepId) === 'undefined') {
                throw new Error('Unknown step: "' + stepId + '"!');
            }

            state.currentStepId = stepId;

            this._appStore.setState(state);
        }
    }]);

    return appActionsService;
}();

appActionsService.initClass();

angular.module('stateModule').service('appActions', appActionsService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// appStore is a service that keeps global state data.
// -----------------------------------------------------------------------------

var appStoreService = function () {
    _createClass(appStoreService, null, [{
        key: 'initClass',
        value: function initClass() {
            appStoreService.$inject = ['Observable', 'initialAppState'];
        }
    }]);

    function appStoreService(Observable, initialAppState) {
        _classCallCheck(this, appStoreService);

        this._state = _.cloneDeep(initialAppState);
        this._stateObservable = new Observable();
    }

    _createClass(appStoreService, [{
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

    return appStoreService;
}();

appStoreService.initClass();

angular.module('stateModule').service('appStore', appStoreService);
'use strict';

angular.module('stateModule').constant('initialAppState', {
    productTitle: null,
    currentStepId: null,
    steps: new Map([['review', {
        name: 'Step 1',
        isVisibleInMenu: true,
        isUnlocked: false,
        isErrorVisible: false
    }], ['socials', {
        name: 'Step 2',
        isVisibleInMenu: true,
        isUnlocked: false
    }], ['summary', {
        name: 'Step 3',
        isVisibleInMenu: true,
        isUnlocked: false
    }], ['final', {
        name: null,
        isVisibleInMenu: false,
        isUnlocked: false
    }]]),
    fields: {
        yourName: {
            value: null,
            isRequired: true,
            validityType: 'text',
            isValid: null
        },
        title: {
            value: null,
            isRequired: false,
            isValid: true
        },
        reviewText: {
            value: null,
            isRequired: true,
            validityType: 'text',
            isValid: null
        },
        stars: {
            value: null,
            isRequired: true,
            validityType: 'rating',
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

// -----------------------------------------------------------------------------
// stepsModule is for displaying steps.
// -----------------------------------------------------------------------------

angular.module('stepsModule', ['stateModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// stepsContentCtrl -- handles displaying steps content.
// -----------------------------------------------------------------------------

var StepsContentController = function () {
    _createClass(StepsContentController, null, [{
        key: 'initClass',
        value: function initClass() {
            StepsContentController.$inject = ['appStore'];
        }
    }]);

    function StepsContentController(appStore) {
        _classCallCheck(this, StepsContentController);

        this.currentStepId = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _createClass(StepsContentController, [{
        key: '_onStateChange',
        value: function _onStateChange(state) {
            this.currentStepId = state.currentStepId;
        }
    }]);

    return StepsContentController;
}();

StepsContentController.initClass();

angular.module('stepsModule').controller('stepsContentCtrl', StepsContentController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// stepsMenuCtrl -- handles displaying tabs and changing current tab.
// -----------------------------------------------------------------------------

var StepsMenuController = function () {
    _createClass(StepsMenuController, null, [{
        key: 'initClass',
        value: function initClass() {
            StepsMenuController.$inject = ['appStore', 'appActions'];
        }
    }]);

    function StepsMenuController(appStore, appActions) {
        _classCallCheck(this, StepsMenuController);

        this._appActions = appActions;

        this.options = [];

        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _createClass(StepsMenuController, [{
        key: '_onStateChange',
        value: function _onStateChange(state) {
            var _this = this;

            this.options = [];

            state.steps.forEach(function (stepData, stepId) {
                stepData.id = stepId;
                stepData.show = function () {
                    _this._appActions.setCurrentStepId(stepId);
                };
                _this.options.push(stepData);
            });
        }
    }]);

    return StepsMenuController;
}();

StepsMenuController.initClass();

angular.module('stepsModule').controller('stepsMenuCtrl', StepsMenuController);
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
            TitleService.$inject = ['appStore', 'appActions', 'urlParams'];
        }
    }]);

    function TitleService(appStore, appActions, urlParams) {
        _classCallCheck(this, TitleService);

        // set initial title state from url params
        appActions.setProductTitle(urlParams.getParam('product'));
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
            TitleController.$inject = ['appStore'];
        }
    }]);

    function TitleController(appStore) {
        _classCallCheck(this, TitleController);

        this.text = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _createClass(TitleController, [{
        key: '_onStateChange',
        value: function _onStateChange(state) {
            this.text = state.productTitle;
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
