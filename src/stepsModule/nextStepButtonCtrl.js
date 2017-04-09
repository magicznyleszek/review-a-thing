// -----------------------------------------------------------------------------
// nextStepButtonCtrl -- handles a button for going to next step.
// -----------------------------------------------------------------------------

class NextStepButtonController {
    static initClass() {
        NextStepButtonController.$inject = ['appActions'];
    }

    constructor(appActions) {
        this._appActions = appActions;
    }

    tryGoNext() {
        this._appActions.tryGoNextStep();
    }
}

NextStepButtonController.initClass();

angular.module('stepsModule').controller(
    'nextStepButtonCtrl',
    NextStepButtonController
);
