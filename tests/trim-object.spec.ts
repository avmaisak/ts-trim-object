/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert, expect } from 'chai';
import 'mocha';
import '../lib/trim-object';

describe('Main test', () => {

  it('Simple object check ', () => {
    const obj = { item: 'TestName' };
    const actual = obj.trimProps();
    expect(obj === actual).equal(true);
  });

  it('Simple object check ', () => {
    const obj = { item: 'TestName' };
    const actual = obj.trimProps();
    expect(obj === actual).equal(true);
  });

  it('Simple object check (trim)', () => {
    const obj = { item: '        ', field: 'field' };
    const actual = obj.trimProps();
    const expected = { field: 'field' };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Simple object check with trim left - right', () => {
    const obj = { item: '             TestName               ' };
    const actual = JSON.stringify(obj.trimProps());
    const expected = JSON.stringify({ item: 'TestName' });
    expect(expected === actual).equal(true);
  });

  it('Object check (with array)', () => {
    const obj = { item: 'TestName    ', item2: '', products: [{ name: 'Product1', price: 3, location: '' }] };
    const actual = obj.trimProps();
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3 }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested array)', () => {
    const obj = { item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: 3, location: '' }] }] };
    const actual = obj.trimProps();
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1', price: 3 }] }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested array)', () => {
    const obj = { test: null, item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: null, location: '' }] }] };
    const actual = obj.trimProps();
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1' }] }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested array)', () => {
    const obj = { test: Object, item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: null, location: '' }] }] };
    const actual = obj.trimProps();
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1' }] }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested nullable array and Date type)', () => {
    const d = new Date();
    const obj = { test: Object, date: d, items: [] };
    const actual = obj.trimProps();
    const expected = { date: d };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check nullable', () => {
    const obj = { name: null };
    const actual = obj.trimProps();
    const expected = {};
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });
});
