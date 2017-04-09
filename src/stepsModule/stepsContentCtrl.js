// -----------------------------------------------------------------------------
// stepsContentCtrl -- handles displaying steps content.
// -----------------------------------------------------------------------------

class StepsContentController {
    static initClass() {
        StepsContentController.$inject = ['reviewStore'];
    }

    constructor(reviewStore) {
        this.currentStepId = null;
        reviewStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(reviewStore.getState());
    }

    _onStateChange(state) {
        this.currentStepId = state.currentStepId;
    }
}

StepsContentController.initClass();

angular.module('stepsModule').controller(
    'stepsContentCtrl',
    StepsContentController
);
