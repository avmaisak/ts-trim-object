/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert, expect } from 'chai';
import 'mocha';
import { DateUtils } from '../lib/date-utils';
import '../lib/trim-object';
import { TrimObject } from '../lib/trim-object';

describe('Main test', () => {

	it('Simple object check ', () => {
		const obj = { item: 'TestName' };
		const actual = TrimObject.trimProps(obj);
		expect(obj === actual).equal(true);
	});

	it('Simple object check ', () => {
		const obj = { item: 'TestName' };
		const actual = TrimObject.trimProps(obj);
		expect(obj === actual).equal(true);
	});

	it('Simple object check (trim)', () => {
		const obj = { item: '        ', field: 'field' };
		const actual = TrimObject.trimProps(obj);
		const expected = { field: 'field' };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Simple object check with trim left - right', () => {
		const obj = { item: '             TestName               ' };
		const actual = JSON.stringify(TrimObject.trimProps(obj));
		const expected = JSON.stringify({ item: 'TestName' });
		expect(expected === actual).equal(true);
	});

	it('Object check (with array)', () => {
		const obj = { item: 'TestName    ', item2: '', products: [{ name: 'Product1', price: 3, location: '' }] };
		const actual = TrimObject.trimProps(obj);
		const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3 }] };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check (with nested array)', () => {
		const obj = { item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: 3, location: '' }] }] };
		const actual = TrimObject.trimProps(obj);
		const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1', price: 3 }] }] };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check (with nested array)', () => {
		const obj = { test: null, item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: null, location: '' }] }] };
		const actual = TrimObject.trimProps(obj);
		const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1' }] }] };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check (with nested array)', () => {
		const obj = { test: Object, item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: null, location: '' }] }] };
		const actual = TrimObject.trimProps(obj);
		const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1' }] }] };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check (with nested nullable array and Date type)', () => {
		const d = new Date();
		const obj = { test: Object, date: d, items: [] };
		const actual = TrimObject.trimProps(obj);
		const expected = { date: DateUtils.convertDateToUTC(d) };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check nullable', () => {
		const obj = { name: null };
		const actual = TrimObject.trimProps(obj);
		const expected = null;
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check nullable array', () => {
		const obj = { name: null, array: [] };
		const actual = TrimObject.trimProps(obj);
		const expected = null;
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

	it('Object check nullable array object', () => {
		const obj = { name: null, array: [{ name: '', test: 'test' }] };
		const actual = TrimObject.trimProps(obj);
		const expected = { array: [{ test: 'test' }] };
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});


	it('Object check nullable array object', () => {
		const actualObject = {
			id: 205,
			name: 'Водитель',
			organization: {
				id: 3,
				name: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЛОГИСТ\"',
				shortName: '',
				itn: 4824015309,
				iec: 222301001
			},
			createdBySystem: false,
			scope: 'User',
			permissions: [
				'',
				'user.drivers.view',
				'user.mobile.driver',
				'user.org-structure.view',
				'user.roles.view',
				'user.title1.delete',
				'user.title1.export',
				'user.title1.read',
				'user.title1.sign',
				'user.title1.write',
				'user.title2.ses',
				'user.title2.write',
				'user.title4.ses',
				'user.title4.write',
				'user.title5.signature',
				'user.title5.write',
				'user.title6.ses',
				'user.users.view'
			],
			usersCount: 3
		};

		const expectedObject = {
			id: 205,
			name: 'Водитель',
			organization: {
				id: 3,
				name: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЛОГИСТ\"',
				itn: 4824015309,
				iec: 222301001
			},
			createdBySystem: false,
			scope: 'User',
			permissions: [
				'user.drivers.view',
				'user.mobile.driver',
				'user.org-structure.view',
				'user.roles.view',
				'user.title1.delete',
				'user.title1.export',
				'user.title1.read',
				'user.title1.sign',
				'user.title1.write',
				'user.title2.ses',
				'user.title2.write',
				'user.title4.ses',
				'user.title4.write',
				'user.title5.signature',
				'user.title5.write',
				'user.title6.ses',
				'user.users.view'
			],
			usersCount: 3
		};

		const actual = TrimObject.trimProps(actualObject);
		const expected = expectedObject;
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});


	it('Object check nullable array object', () => {
		const actualObject = {
			needDriver: true,
			needTransport: false,
			transportFacility: {
				certificateNumber: '',
				regNumber: ''
			},
			relay: {},
			driver: {
				firstName: 'Василий',
				lastName: 'Рулев',
				middleName: 'Игориевич',
				phoneNumber: '+79111234567',
				licenseSeries: '222',
				licenseNumber: '222',
				licenseDate: '2020-09-12T00:00:00',
				licenseDateEnd: '2020-09-11T00:00:00'
			}
		};

		const expectedObject = {
			needDriver: true,
			needTransport: false,
			transportFacility: null,
			relay: null,
			driver: {
				firstName: 'Василий',
				lastName: 'Рулев',
				middleName: 'Игориевич',
				phoneNumber: '+79111234567',
				licenseSeries: '222',
				licenseNumber: '222',
				licenseDate: '2020-09-12T00:00:00',
				licenseDateEnd: '2020-09-11T00:00:00'
			}
		};

		const actual = TrimObject.trimProps(actualObject);
		const expected = expectedObject;
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});


	it('Object check nullable array object', () => {
		const actualObject = {
			needDriver: true,
			needTransport: false,
			transportFacility: {
				certificateNumber: '',
				regNumber: '',
				arr: [null]
			},
			relay: {},
			driver: {
				firstName: 'Василий',
				lastName: 'Рулев',
				middleName: 'Игориевич',
				phoneNumber: '+79111234567',
				licenseSeries: '222',
				licenseNumber: '222',
				licenseDate: '2020-09-12T00:00:00',
				licenseDateEnd: '2020-09-11T00:00:00'
			}
		};

		const expectedObject = {
			needDriver: true,
			needTransport: false,
			transportFacility: null,
			relay: null,
			driver: {
				firstName: 'Василий',
				lastName: 'Рулев',
				middleName: 'Игориевич',
				phoneNumber: '+79111234567',
				licenseSeries: '222',
				licenseNumber: '222',
				licenseDate: '2020-09-12T00:00:00',
				licenseDateEnd: '2020-09-11T00:00:00'
			}
		};

		const actual = TrimObject.trimProps(actualObject);
		const expected = expectedObject;
		assert.equal(JSON.stringify(actual), JSON.stringify(expected));
	});

});
