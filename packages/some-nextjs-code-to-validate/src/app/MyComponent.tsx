/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';
import { parse } from '@typescript-eslint/typescript-estree';

export type MyType = {
  blonde: string;
  funny: string;
  kind: string;
  smart: string;
};

export enum MyEnum {
  a = 'a',
  b = 'b',
  c = 'c',
}

export interface MyComponentProps {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
}

export const MyComponent = ({
  a = 'default',
  b = 'default',
  c = 'default',
  d = 'default',
}: MyComponentProps) => null;

// const tempArray = ['a', 'b', 'c', 'd', 'f', 'e', 'g'];

// const fixes = tempArray.map((index, a) => console.log(index, a));

// export const MyComponent2 = (c: string, b: string, a: string) => null;
