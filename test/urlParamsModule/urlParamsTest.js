describe('urlParams', () => {
    let urlParams = null;
    let $location = null;

    beforeEach(() => {
        module('testAppModule');
        module('urlParamsModule');
        inject(($injector) => {
            urlParams = $injector.get('urlParams');
            $location = $injector.get('$location');
        });
    });

    it('should return existing search parameter value', () => {
        $location.search('conan', 'the barbarian');
        const paramValue = urlParams.getParam('conan');
        expect(paramValue).toBe('the barbarian');
    });

    it('should return null for nonexistent parameters', () => {
        $location.search('one', '1');
        const paramValue = urlParams.getParam('two');
        expect(paramValue).toBe(null);
    });
});
