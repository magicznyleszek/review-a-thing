// -----------------------------------------------------------------------------
// appActions is a service that has all methods for updating appStore
// state partials.
// -----------------------------------------------------------------------------

class appActionsService {
    static initClass() {
        appActionsService.$inject = ['appStore', 'validator'];
    }

    constructor(appStore, validator) {
        this._appStore = appStore;
        this._validator = validator;
    }

    setProductTitle(title) {
        const state = this._appStore.getState();

        state.productTitle = title;

        this._appStore.setState(state);
    }

    // -------------------------------------------------------------------------
    // managing fields
    // -------------------------------------------------------------------------

    setField(fieldName, value) {
        const state = this._appStore.getState();

        if (typeof state.fields[fieldName] === 'undefined') {
            throw new Error(`Unknown field: "${fieldName}"!`);
        }

        state.fields[fieldName].value = value

        // set areFieldsValid by checking all fields
        // check unlock step two

        this._appStore.setState(state);

        this.validateField(fieldName);
    }

    validateField(fieldName) {
        const state = this._appStore.getState();
        const field = state.fields[fieldName];

        if (typeof field === 'undefined') {
            throw new Error(`Unknown field: "${fieldName}"!`);
        }

        if (field.isRequired) {
            if (field.validityType === 'text') {
                field.isValid = this._validator.isNonEmptyString(field.value);
            } else if (field.validityType === 'rating') {
                field.isValid = this._validator.isIntegerInRange(field.value, 1, 5);
            }
        } else {
            field.isValid = true;
        }

        this._appStore.setState(state);
    }

    validateAllFields() {
        const state = this._appStore.getState();
        for (const fieldName of Object.keys(state.fields)) {
            this.validateField(fieldName);
        }
    }

    setReviewError(isErrored) {
        const state = this._appStore.getState();
        state.steps.get('review').isErrorVisible = isErrored;

        this._appStore.setState(state);

        this.validateAllFields();
    }

    // -------------------------------------------------------------------------
    // managing steps
    // -------------------------------------------------------------------------

    setCurrentStepId(stepId) {
        const state = this._appStore.getState();

        if (typeof state.steps.get(stepId) === 'undefined') {
            throw new Error(`Unknown step: "${stepId}"!`);
        }

        state.currentStepId = stepId;

        let areUnlocked = true;
        state.steps.forEach((loopStepData, loopStepId) => {
            loopStepData.isUnlocked = areUnlocked;
            if (loopStepId === state.currentStepId) {
                areUnlocked = false;
            }
        });

        this._appStore.setState(state);
    }

    lockAllSteps() {
        const state = this._appStore.getState();
        state.steps.forEach((step) => {
            step.isUnlocked = false;
        });
        this._appStore.setState(state);
    }

    tryGoNextStep() {
        const state = this._appStore.getState();

        switch (state.currentStepId) {
            case 'review': {
                let areAllRequiredFieldsValid = true;

                for (const fieldName of Object.keys(state.fields)) {
                    if (
                        state.fields[fieldName].isRequired &&
                        state.fields[fieldName].isValid !== true
                    ) {
                        areAllRequiredFieldsValid = false;
                        break;
                    }
                }

                if (areAllRequiredFieldsValid) {
                    this.setReviewError(false);
                    this.setCurrentStepId('socials');
                } else {
                    this.setReviewError(true);
                }
                break;
            }
            case 'socials': {
                this.setCurrentStepId('summary');
                break;
            }
            case 'summary': {
                this.setCurrentStepId('final');
                this.lockAllSteps();
                break;
            }
            default: {
                this.setCurrentStepId('review');
            }
        }
    }
}

appActionsService.initClass();

angular.module('stateModule').service('appActions', appActionsService);
