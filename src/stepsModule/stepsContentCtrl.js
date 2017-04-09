// -----------------------------------------------------------------------------
// stepsContentCtrl -- handles displaying steps content.
// -----------------------------------------------------------------------------

class StepsContentController {
    static initClass() {
        StepsContentController.$inject = ['appStore'];
    }

    constructor(appStore) {
        this.currentStepId = null;
        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
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
