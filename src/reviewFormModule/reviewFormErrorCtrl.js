// -----------------------------------------------------------------------------
// reviewFormErrorCtrl -- handles displaying error message.
// -----------------------------------------------------------------------------

class ReviewFormErrorController {
    static initClass() {
        ReviewFormErrorController.stepId = 'form';
        ReviewFormErrorController.$inject = ['appStore'];
    }

    constructor(appStore) {
        this.isVisible = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _onStateChange(state) {
        this.isVisible = state.steps.get('form').isErrorVisible;
    }
}

ReviewFormErrorController.initClass();

angular.module('reviewFormModule').controller(
    'reviewFormErrorCtrl',
    ReviewFormErrorController
);
