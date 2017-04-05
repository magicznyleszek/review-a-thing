describe('state', () => {
    let state = null;

    beforeEach(() => {
        module('testAppModule');
        module('stateModule');
        inject(($injector) => {
            state = $injector.get('state');
        });
    });

    it('should be able to set/get a simple param', () => {
        state.setParam('conan', 'barbarian');
        expect(state.getParam('conan')).toBe('barbarian');
    });

    it('should be able to set/get an object param', () => {
        const testValue = {barbarian: true, swordsCount: 1};
        const testName = 'conan';
        state.setParam(testName, testValue);
        expect(_.isEqual(state.getParam(testName), testValue)).toBeTruthy();
    });

    it('should be able to get whole state', () => {
        state.setParam('foo', 1);
        state.setParam('bar', true);
        state.setParam('fum', {baz: 2});

        const expectedState = {
            foo: 1,
            bar: true,
            fum: {
                baz: 2
            }
        };

        const currentState = state.get();

        expect(_.isEqual(expectedState, currentState)).toBeTruthy();
    });

    it('should return unmutable objects', () => {
        state.setParam('foo', {bar: 2});
        const stateOne = state.get();

        stateOne.foo.bar = 4;

        const stateTwo = state.get();

        expect(stateTwo.foo.bar).toBe(2);
    });
});
