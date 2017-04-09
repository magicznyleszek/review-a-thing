describe('stepsMenuCtrl', () => {
    let stepsMenuCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('stepsModule');
        inject(($injector, $controller) => {
            stepsMenuCtrl = $controller('stepsMenuCtrl');
        });
    });

    it('should get initial steps state', () => {
        expect(stepsMenuCtrl.options.length > 0).toBeTruthy();
    });
});
