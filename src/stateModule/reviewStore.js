// -----------------------------------------------------------------------------
// reviewStore is a service that keeps global state data.
// -----------------------------------------------------------------------------

class ReviewStoreService {
    static initClass() {
        ReviewStoreService.$inject = ['Observable', 'initialReviewState'];
    }

    constructor(Observable, initialReviewState) {
        this._state = _.cloneDeep(initialReviewState);
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

ReviewStoreService.initClass();

angular.module('stateModule').service('reviewStore', ReviewStoreService);
