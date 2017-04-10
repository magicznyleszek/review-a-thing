describe('checkboxField', () => {
    let appStore = null;
    let $compile = null;
    let $componentController = null;
    let scope = null;

    beforeEach(() => {
        module('testAppModule');
        module('fieldsModule');
        inject(($injector, $rootScope) => {
            appStore = $injector.get('appStore');
            $compile = $injector.get('$compile');
            $componentController = $injector.get('$componentController');
            scope = $rootScope.$new();
        });
    });

    const getComponent = (html) => {
        const component = $compile(angular.element(html))(scope);
        scope.$digest();
        return component;
    };

    const getComponentCtrl = (attrs) => {
        return $componentController('checkboxField', {
            $scope: {},
            $element: '<checkbox-field></checkbox-field>',
            $attrs: attrs
        });
    };

    it('should throw error if required attributes not provided', () => {
        expect(() => {getComponent('<checkbox-field></checkbox-field>');}).toThrow();
        expect(() => {getComponent('<checkbox-field name="facebook"></checkbox-field>');}).toThrow();
        expect(() => {getComponent('<checkbox-field label="Bar"></checkbox-field>');}).toThrow();
    });

    it('should display label in span', () => {
        const component = getComponent('<checkbox-field name="facebook" label="Facebook"></checkbox-field>');
        expect(component.find('span').text()).toBe('Facebook');
    });

    it('should save value to state on input change', () => {
        const compCtrl = getComponentCtrl({name: 'facebook', label: 'Facebook'});
        compCtrl.value = true;
        compCtrl.onChange();
        const state = appStore.getState();
        expect(state.fields.title.value).toBe(true);
    });
});
