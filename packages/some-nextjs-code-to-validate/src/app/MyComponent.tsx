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

export interface MyComponentProps {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
  f?: string;
  g?: string;
}

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

// TODO: generate error on this line, sort

export const MyComponent = ({
  c = 'default',
  b = 'default',
  d = 'default',
  a = 'default',
  f = 'default',
  e = 'default',
  g = 'default',
}: MyComponentProps) => null;
