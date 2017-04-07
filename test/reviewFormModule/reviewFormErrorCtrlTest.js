describe('reviewFormErrorCtrl', () => {
    let reviewFormErrorCtrl = null;
    let state = null;

    beforeEach(() => {
        module('testAppModule');
        module('reviewFormModule');
        inject(($injector, $controller) => {
            reviewFormErrorCtrl = $controller('reviewFormErrorCtrl');
            state = $injector.get('state');
        });
    });

    it('should be visible if any field from state is invalid', () => {
        state.setParam('textFields', {
            fieldOne: {isValid: false, value: ''}
        });

        expect(reviewFormErrorCtrl.isVisible).toBeTruthy();
    });

    it('should be hidden if all fields from state are valid', () => {
        state.setParam('textFields', {
            foo: {isValid: true, value: 'abc'},
            bar: {isValid: true, value: 'qwerty'}
        });

        expect(reviewFormErrorCtrl.isVisible).toBeFalsy();
    });

    it('should be hidden if all fields from state are virgin', () => {
        state.setParam('textFields', {
            foo: {isValid: null, value: ''},
            bar: {isValid: null, value: ''}
        });

        expect(reviewFormErrorCtrl.isVisible).toBeFalsy();
    });
});
