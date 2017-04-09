// -----------------------------------------------------------------------------
// reviewFormErrorCtrl -- handles displaying error message.
// -----------------------------------------------------------------------------

class ReviewFormErrorController {
    static initClass() {
        ReviewFormErrorController.stepId = 'form';
        ReviewFormErrorController.$inject = ['reviewStore'];
    }

    constructor(reviewStore) {
        this.isVisible = null;
        reviewStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(reviewStore.getState());
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
