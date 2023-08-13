/* eslint-disable import/no-default-export */
import { fooBarRule } from './rules/fooBarRule';
import { sortInterface } from './rules/sortInterface';
import { sortType } from './rules/sortType';
import { sortEnum } from './rules/sortEnum';

const rules = {
  'foo-bar-rule': fooBarRule,
  'sort-interface': sortInterface,
  'sort-type': sortType,
  'sort-enum': sortEnum,
};

export default rules;
