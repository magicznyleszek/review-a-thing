// -----------------------------------------------------------------------------
// stepsMenuCtrl -- handles displaying tabs and changing current tab.
// -----------------------------------------------------------------------------

class StepsMenuController {
    static initClass() {
        StepsMenuController.$inject = ['appStore', 'appActions'];
    }

    constructor(appStore, appActions) {
        this._appActions = appActions;

        this.options = [];

        appStore.registerStateObserver(this._onStateChange.bind(this));
        // get initial state
        this._onStateChange(appStore.getState());
    }

    _onStateChange(state) {
        this.options = [];

        state.steps.forEach((stepData, stepId) => {
            stepData.id = stepId;
            stepData.show = () => {
                this._appActions.setCurrentStepId(stepId);
            };
            this.options.push(stepData);
        });
    }
}

StepsMenuController.initClass();

angular.module('stepsModule').controller('stepsMenuCtrl', StepsMenuController);
