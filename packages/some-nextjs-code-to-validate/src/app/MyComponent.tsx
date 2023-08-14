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
export const MyComponent = ({ b, a, c, d }: MyComponentProps) => {
  console.log('a', a);
  console.log('b', b);
  console.log('c', c);
  console.log('d', d);
  // console.log('astcomponent', astcomponent);

  return <div>MyComponent</div>;
};
