// -----------------------------------------------------------------------------
// state is a service that keeps global state data (user input and other stuff).
// -----------------------------------------------------------------------------

class StateService {
    static initClass() {
        StateService.$inject = ['Observable'];
    }

    constructor(Observable) {
        this._state = {};
        this._stateObservable = new Observable();
    }

    registerStateObserver(observer) {
        return this._stateObservable.register(observer);
    }

    setParam(paramName, paramValue) {
        if (!_.isEqual(this._state[paramName], paramValue)) {
            this._state[paramName] = paramValue;
            this._stateObservable.notify();
        }
    }

    getParam(paramName) {
        const stateParam = this._state[paramName];
        if (typeof stateParam === 'undefined') {
            return null;
        } else {
            return _.cloneDeep(this._state[paramName]);
        }
    }

    get() {
        return _.cloneDeep(this._state);
    }
}

StateService.initClass();

angular.module('stateModule').service('state', StateService);

// WIP

const initialState = {
    currentStepId: null,
    steps: [
        {
            id: 'review',
            isUnlocked: false,
            isErrorVisible: false
        },
        {
            id: 'socials',
            isUnlocked: false
        },
        {
            id: 'summary',
            isUnlocked: false
        },
        {
            id: 'final',
            isUnlocked: false
        }
    ],
    areFieldsValid: null,
    fields: {
        yourName: {
            value: null,
            isRequired: true,
            isValid: null
        },
        title: {
            value: null,
            isRequired: false,
            isValid: null
        },
        review: {
            value: null,
            isRequired: true,
            isValid: null
        },
        stars: {
            value: null,
            isRequired: true,
            isValid: null
        }
    },
    socials: {
        facebook: false,
        twitter: false,
        linkedIn: false
    }
};

const actions = {
    updateField(fieldName, value) {
        // set value
        // validate
        // set areFieldsValid by checking all fields
        // check unlock step two
    },
    updateSocial(socialName, isChecked) {
        // set value
    },
    showStepOneError() {
        // set step one error
    },
    showStep(stepId) {
        // set current step id
    }
};
