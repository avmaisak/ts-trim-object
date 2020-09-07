/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert, expect } from 'chai';
import 'mocha';
import { TrimObject } from '../lib/trim-object';

describe('Main test', () => {

  it('Helper - only spaces. Test 1 ', () => {
    const str = '                                   ';
    const actual = TrimObject.hasOnlySpaces(str);
    expect(true).equal(actual);
  });

  it('Helper - only spaces. Test 2 ', () => {
    const str = '               as      adasd             as  ';
    const actual = TrimObject.hasOnlySpaces(str);
    expect(false).equal(actual);
  });

  it('Helper - only spaces. Test 3 ', () => {
    const str = 'test';
    const actual = TrimObject.hasOnlySpaces(str);
    expect(false).equal(actual);
  });

  it('Helper - only spaces. Test 4 ', () => {
    const str = ' test';
    const actual = TrimObject.hasOnlySpaces(str);
    expect(false).equal(actual);
  });

  it('Helper - only spaces. Test 5 ', () => {
    const str = ' test     ';
    const actual = TrimObject.hasOnlySpaces(str);
    expect(false).equal(actual);
  });

  it('Helper - only spaces. Test 6 ', () => {
    const str = ' ';
    const actual = TrimObject.hasOnlySpaces(str);
    expect(true).equal(actual);
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
    const obj = { item: 'TestName    ', item2: '', products: [{ name: 'Product1', price: 3, location: '' }] } as any;
    const actual = TrimObject.trimProps(obj);
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3 }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested array)', () => {
    const obj = { item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: 3, location: '' }] }] } as any;
    const actual = TrimObject.trimProps(obj);
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1', price: 3 }] }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested array)', () => {
    const obj = { test: null, item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: null, location: '' }] }] } as any;
    const actual = TrimObject.trimProps(obj);
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1' }] }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested array)', () => {
    const obj = { test: Object, item: 'TestName    ', item2: '', products: [{ name: 'Product1                  ', price: 3, location: '', items: [{ name: 'Product1', price: null, location: '' }] }] } as any;
    const actual = TrimObject.trimProps(obj);
    const expected = { item: 'TestName', products: [{ name: 'Product1', price: 3, items: [{ name: 'Product1' }] }] };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check (with nested nullable array and Date type)', () => {
    const d = new Date();
    const obj = { test: Object, date: d, items: [] } as any;
    const actual = TrimObject.trimProps(obj);
    const expected = { date: d };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check nullable', () => {
    const obj = { name: null } as any;
    const actual = TrimObject.trimProps(obj);
    const expected = {};
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

  it('Object check nullable [returnNullIfEmpty]', () => {
    const obj = { name: null } as any;
    const actual = TrimObject.trimProps(obj, true);
    const expected = null;
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });


  it('Object check nullable nested object', () => {
    const obj = { name: 'nested Object', object: { name: '' } } as any;
    const actual = TrimObject.trimProps(obj, true);
    const expected = JSON.stringify({ name: 'nested Object', object: {} } as any);
    assert.equal(JSON.stringify(actual), expected);
  });

  it('Object check nullable nested object with array', () => {
    const obj = { name: 'nested Object', object: { name: '', arr: [{ name1: 'name name' }] } } as any;
    const actual = TrimObject.trimProps(obj, true);
    const expected = JSON.stringify({ name: 'nested Object', object: { arr: [{ name1: 'name name' }] } } as any);
    assert.equal(JSON.stringify(actual), expected);
  });


  it('Object check boolean', () => {
    const obj = { name: null, deleted: false } as any;
    const actual = TrimObject.trimProps(obj, true);
    const expected = { deleted: false };
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });

});
