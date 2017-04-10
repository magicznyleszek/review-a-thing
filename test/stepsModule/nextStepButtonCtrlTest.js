describe('nextStepButtonCtrl', () => {
    let nextStepButtonCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('stepsModule');
        inject(($injector, $controller) => {
            nextStepButtonCtrl = $controller('nextStepButtonCtrl');
        });
    });

    it('should not throw when clicked', () => {
        expect(() => {nextStepButtonCtrl.tryGoNext();}).not.toThrow();
    });
});
