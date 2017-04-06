describe('titleCtrl', () => {
    let state = null;
    let titleCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('titleModule');
        inject(($injector, $controller) => {
            titleCtrl = $controller('titleCtrl');
            state = $injector.get('state');
        });
    });

    it('should use title from state', () => {
        state.setParam('title', 'Silent Running');
        expect(titleCtrl.text).toBe('Silent Running');
    });
});
