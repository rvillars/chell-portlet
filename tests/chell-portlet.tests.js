'use strict';

describe('PortletController', function() {
    var scope;//we'll use this scope in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('chell-portlet'));
    // tests start here

    it('just a dummy test', function() {
        var state = false;
        expect(state).toBe(false);
    });
});