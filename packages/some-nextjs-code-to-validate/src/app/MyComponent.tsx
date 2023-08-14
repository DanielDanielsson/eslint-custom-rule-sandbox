/* eslint-disable no-console */
import React from 'react';

export interface MyComponentProps {
  a: string;
  b: string;
  c: string;
  d: string;
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
  return <div>MyComponent</div>;
};
