'use strict';

const Response = require('../../../../modules/server/response');
const assert = require('chai').assert;

describe('response', function () {
    it('should create response object with passed-in base', function () {
        const base = { redirect: function () {} };
        const response = new Response(base);
        assert.property(response, 'base');
        assert.property(response.base, 'redirect');
    });
    it('should correctly set view and viewData', function () {
        const response = new Response({});
        response.render('test', { name: 'value' });
        assert.equal(response.view, 'test');
        assert.equal(response.viewData.name, 'value');
    });
    it('should extend viewData', function () {
        const response = new Response({});
        response.setViewData({ name: 'value' });
        response.setViewData({ foo: 'bar' });
        response.render('test', { name: 'test' });
        assert.equal(response.viewData.name, 'test');
        assert.equal(response.viewData.foo, 'bar');
    });
    it('should not extend viewData with non-objects', function () {
        const response = new Response({});
        response.setViewData({ name: 'value' });
        response.setViewData(function () {});
        assert.equal(response.viewData.name, 'value');
    });
    it('should correctly set json', function () {
        const response = new Response({});
        response.json({ name: 'value' });
        assert.isTrue(response.isJson);
        assert.equal(response.viewData.name, 'value');
    });
    it('should correctly set url', function () {
        const response = new Response({});
        response.redirect('hello');
        assert.equal(response.redirectUrl, 'hello');
    });
    it('should set and retrieve data', function () {
        const response = new Response({});
        response.setViewData({ name: 'value' });
        assert.equal(response.getViewData().name, 'value');
    });
    it('should log item', function () {
        const response = new Response({});
        response.log('one', 'two', 'three');
        assert.equal(response.messageLog.length, 1);
        assert.equal(response.messageLog[0], 'one two three');
    });
    it('should convert log item to json', function () {
        const response = new Response({});
        response.log({ name: 'value' });
        assert.equal(response.messageLog.length, 1);
        assert.equal(response.messageLog[0], '{"name":"value"}');
    });
    it('should try to print out a message', function (done) {
        const response = new Response({
            writer: { print: function (value) { assert.equal(value, 'hello'); done(); } }
        });
        response.print('hello');
    });
    it('should set content type', function (done) {
        const response = new Response({
            setContentType: function (type) { assert.equal(type, 'text/html'); done(); }
        });
        response.setContentType('text/html');
    });
});
