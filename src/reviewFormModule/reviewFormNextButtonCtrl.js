// -----------------------------------------------------------------------------
// reviewFormNextButtonCtrl -- handles a button for going to next step.
// -----------------------------------------------------------------------------

class ReviewFormNextButtonController {
    static initClass() {
        ReviewFormNextButtonController.$inject = [
            'reviewStore',
            'reviewActions'
        ];
    }

    constructor(reviewStore, reviewActions) {
        this._reviewStore = reviewStore;
        this._reviewActions = reviewActions;
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
