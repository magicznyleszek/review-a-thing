// -----------------------------------------------------------------------------
// reviewActions is a service that has all methods for updating reviewStore
// state partials.
// -----------------------------------------------------------------------------

class ReviewActionsService {
    static initClass() {
        ReviewActionsService.$inject = ['reviewStore'];
    }

    constructor(reviewStore) {
        this._reviewStore = reviewStore;
    }

    setField(fieldName, value) {
        // set value
        // validate
        // set areFieldsValid by checking all fields
        // check unlock step two
    }

    setSocial(socialName, isChecked) {
        // set value
    }

    setReviewError() {
        // set step one error
    }

    setCurrentStepId(stepId) {
        // set current step id
    }
}

ReviewActionsService.initClass();

angular.module('stateModule').service('reviewActions', ReviewActionsService);
