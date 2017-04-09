// -----------------------------------------------------------------------------
// publishButtonCtrl -- handles a button for going to final step.
// -----------------------------------------------------------------------------

class PublishButtonController {
    static initClass() {
        PublishButtonController.$inject = ['appActions'];
    }

    constructor(appActions) {
        this._appActions = appActions;
    }

    publish() {
        this._appActions.setCurrentStepId('final');
    }
}

PublishButtonController.initClass();

angular.module('summaryModule').controller(
    'publishButtonCtrl',
    PublishButtonController
);
