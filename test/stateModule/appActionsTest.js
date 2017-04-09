describe('appActions', () => {
    let appActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('stateModule');
        inject(($injector) => {
            appActions = $injector.get('appActions');
        });
    });

    describe('setField', () => {
        it('should update field value in state', () => {

        });

        it('should throw for unknown field', () => {

        });
    });
});
