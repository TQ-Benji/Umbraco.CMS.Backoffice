import { expect, fixture, html } from '@open-wc/testing';
//TODO: Test has been commented out while we figure out how to setup import maps for the test environment
// import { UmbPickerUserGroupElement } from './picker-user-group.element';
// import { defaultA11yConfig } from '@umbraco-cms/test-utils';

// describe('UmbPickerLayoutUserGroupElement', () => {
// 	let element: UmbPickerUserGroupElement;
// 	beforeEach(async () => {
// 		element = await fixture(html`<umb-input-user-group></umb-input-user-group>`);
// 	});

// 	it('is defined with its own instance', () => {
// 		expect(element).to.be.instanceOf(UmbPickerUserGroupElement);
// 	});

// 	it('passes the a11y audit', async () => {
// 		await expect(element).shadowDom.to.be.accessible(defaultA11yConfig);
// 	});
// });