// -----------------------------------------------------------------------------
// reviewFormErrorCtrl -- handles displaying error message.
// -----------------------------------------------------------------------------

class ReviewFormErrorController {
    static initClass() {
        ReviewFormErrorController.$inject = ['state'];
    }

    constructor(state) {
        this._state = state;
        this.isVisible = false;
        this._state.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange();
    }

    _onStateChange() {
        const textFieldsState = this._state.getParam('textFields');

        if (textFieldsState !== null) {
            for (const fieldName of Object.keys(textFieldsState)) {
                if (textFieldsState[fieldName].isValid === false) {
                    this.isVisible = true;
                    break;
                }
            }
        }
    }
}

ReviewFormErrorController.initClass();

angular.module('reviewFormModule').controller(
    'reviewFormErrorCtrl',
    ReviewFormErrorController
);
