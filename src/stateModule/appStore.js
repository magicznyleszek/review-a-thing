// -----------------------------------------------------------------------------
// appStore is a service that keeps global state data.
// -----------------------------------------------------------------------------

class appStoreService {
    static initClass() {
        appStoreService.$inject = ['Observable', 'initialAppState'];
    }

    constructor(Observable, initialAppState) {
        this._state = _.cloneDeep(initialAppState);
        this._stateObservable = new Observable();
    }

    registerStateObserver(observer) {
        return this._stateObservable.register(observer);
    }

    getState() {
        return _.cloneDeep(this._state);
    }

    setState(newState) {
        if (!_.isEqual(newState, this._state)) {
            this._state = newState;
            this._stateObservable.notify(this.getState());
        }
    }
}

appStoreService.initClass();

angular.module('stateModule').service('appStore', appStoreService);
