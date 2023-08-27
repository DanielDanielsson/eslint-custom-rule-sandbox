/* eslint-disable @typescript-eslint/naming-convention */
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

const foo = () => {
  console.log('My foo functions');
};

// foo();

export interface MyComponentProps {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
}

interface someCoolInterface {
  a: string;
  b: string;
  c: string;
  // this is a comment on A
  d: string; // this is a comment on C
}

export const MyComponent = ({
  a = 'default',
  b = 'default',
  c = 'default',
  d = 'default',
}: MyComponentProps) => null;

export const MyComponent2 = (
  {
    a = 'default',
    b = 'default',
    c = 'default',
    d = 'default',
    e = 'default',
    f = 'default',
  },
  aotherParam: string,
  sotherParam2: string,
  gotherParam3: string,
  { a1 = 'sad', b1 = 'default', c1 = 'default', d1 = 'default' },
) => null;

// const tempArray = ['a', 'b', 'c', 'd', 'f', 'e', 'g'];

// const fixes = tempArray.map((index, a) => console.log(index, a));

// export const MyComponent2 = (c: string, b: string, a: string) => null;
