// -----------------------------------------------------------------------------
// reviewFormNextButtonCtrl -- handles a button for going to next step.
// -----------------------------------------------------------------------------

class ReviewFormNextButtonController {
    static initClass() {
        ReviewFormNextButtonController.$inject = [
            'appStore',
            'appActions'
        ];
    }

    constructor(appStore, appActions) {
        this._appStore = appStore;
        this._appActions = appActions;
    }

    tryGoNext() {
        console.log('tryGoNext');
    }
}

ReviewFormNextButtonController.initClass();

angular.module('reviewFormModule').controller(
    'reviewFormNextButtonCtrl',
    ReviewFormNextButtonController
);
