// -----------------------------------------------------------------------------
// stepsMenuCtrl -- handles displaying tabs and changing current tab.
// -----------------------------------------------------------------------------

class StepsMenuController {
    static initClass() {
        StepsMenuController.$inject = ['reviewStore', 'reviewActions'];
    }

    constructor(reviewStore, reviewActions) {
        this._reviewActions = reviewActions;

        this.options = [];

        reviewStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(reviewStore.getState());
    }

    _onStateChange(state) {
        this.options = [];

        state.steps.forEach((stepData, stepId) => {
            stepData.id = stepId;
            stepData.show = () => {
                this._reviewActions.setCurrentStepId(stepId);
            };
            this.options.push(stepData);
        });
    }
}

StepsMenuController.initClass();

angular.module('stepsModule').controller('stepsMenuCtrl', StepsMenuController);
