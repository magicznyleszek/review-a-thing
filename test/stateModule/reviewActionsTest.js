describe('reviewActions', () => {
    let reviewActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('stateModule');
        inject(($injector) => {
            reviewActions = $injector.get('reviewActions');
        });
    });

    describe('setField', () => {
        it('should update field value in state', () => {

        });

        it('should throw for unknown field', () => {

        });
    });
});
