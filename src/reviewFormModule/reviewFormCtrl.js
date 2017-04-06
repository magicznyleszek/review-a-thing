// -----------------------------------------------------------------------------
// reviewFormCtrl -- handles displaying inputs and updating the values.
// -----------------------------------------------------------------------------

class ReviewFormController {
    static initClass() {
        ReviewFormController.$inject = [];
    }

    constructor() {
        this.hi = true;
    }
}

ReviewFormController.initClass();

angular.module('reviewFormModule').controller(
    'reviewFormCtrl',
    ReviewFormController
);
