/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';
import { parse } from '@typescript-eslint/typescript-estree';

export type MyType = {
  blonde: string;
  funny: string;
  smart: string;
  kind: string;
};

export enum MyEnum {
  b = 'b',
  a = 'a',
  c = 'c',
}

export interface MyComponentProps {
  b?: string;
  a?: string;
  c?: string;
  d?: string;
  f?: string;
  e?: string;
  g?: string;
}

export const MyComponent = ({
  a = 'default',
  b = 'default',
  d = 'default',
  c = 'default',
  e = 'default',
  f = 'default',
  g = 'default',
}: MyComponentProps) => null;

const tempArray = ['a', 'b', 'c', 'd', 'f', 'e', 'g'];

const fixes = tempArray.map((index, a) => console.log(index, a));

export const MyComponent2 = (c: string, b: string, a: string) => null;
