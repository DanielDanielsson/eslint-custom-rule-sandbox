/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';
import { parse } from '@typescript-eslint/typescript-estree';

const code = `const myFunction = ({a: string}) => {return null;}`;
const ast = parse(code, {
  loc: true,
  range: true,
});

console.log('ast', ast);
console.log('__________________');

// const component = `export const MyComponent = ({ b, a, c, d }: MyComponentProps) => {
//   return <div>MyComponent</div>;
// };
// `;
// const astcomponent = parse(component, {
//   // loc: true,
//   // range: true,
// });

// console.log('astcomponent', astcomponent);

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
  e?: string;
  f?: string;
  g?: string;
}

export const MyComponent = ({
  c = 'default',
  b = 'default',
  a = 'default',
  d = 'default',
  f = 'default',
  e = 'default',
  g = 'default',
}: MyComponentProps) => null;

const tempArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

// const fixes = tempArray.map((index, a) => console.log(index, a));

// export const MyComponent2 = (c: string, b: string, a: string) => null;
