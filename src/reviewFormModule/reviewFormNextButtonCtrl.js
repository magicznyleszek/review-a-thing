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
        const state = this._appStore.getState();

        let areAllRequiredFieldsValid = true;

        for (const fieldName of Object.keys(state.fields)) {
            if (state.fields[fieldName].isValid !== true) {
                areAllRequiredFieldsValid = false
                break;
            }
        }

        if (areAllRequiredFieldsValid) {
            this._appActions.setCurrentStepId('socials');
        } else {
            this._appActions.setReviewError(true);
        }
    }
}

ReviewFormNextButtonController.initClass();

angular.module('reviewFormModule').controller(
    'reviewFormNextButtonCtrl',
    ReviewFormNextButtonController
);
