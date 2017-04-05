// -----------------------------------------------------------------------------
// state is a service that keeps state data (user input and other stuff).
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
        this._state[paramName] = paramValue;
        this._stateObservable.notify();
    }

    getParam(paramName) {
        return _.cloneDeep(this._state[paramName]);
    }

    get() {
        return _.cloneDeep(this._state);
    }
}

StateService.initClass();

angular.module('stateModule').service('state', StateService);
