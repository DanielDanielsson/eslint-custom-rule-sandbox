import {myFirstRule} from './rules/my-first-rule';
import { fooBarRule }  from './rules/fooBarRule';
import {sortKeys} from './rules/sortKeys';
import {sortInterface} from './rules/sortInterface';

const rules = {
  'my-first-rule': myFirstRule,
  'foo-bar-rule': fooBarRule,
  'sort-keys': sortKeys,
  'sort-interface': sortInterface,
};

export default rules;
