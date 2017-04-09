// -----------------------------------------------------------------------------
// socialFormNextButtonCtrl -- handles a button for going to next step.
// -----------------------------------------------------------------------------

class SocialFormNextButtonController {
    static initClass() {
        SocialFormNextButtonController.$inject = ['appActions'];
    }

    constructor(appActions) {
        this._appActions = appActions;
    }

    tryGoNext() {
        this._appActions.setCurrentStepId('summary');
    }
}

SocialFormNextButtonController.initClass();

angular.module('socialFormModule').controller(
    'socialFormNextButtonCtrl',
    SocialFormNextButtonController
);
