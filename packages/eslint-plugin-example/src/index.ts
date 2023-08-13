/* eslint-disable import/no-default-export */
import { fooBarRule } from './rules/fooBarRule';
import { sortInterface } from './rules/sortInterface';

const rules = {
  'foo-bar-rule': fooBarRule,
  'sort-interface': sortInterface,
};

export default rules;
