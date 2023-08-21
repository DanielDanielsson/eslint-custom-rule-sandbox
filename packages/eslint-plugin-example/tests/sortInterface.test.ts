/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RuleTester } from '@typescript-eslint/rule-tester';
// import { parse } from 'flatted';
import { sortInterface } from '../src/rules/sortInterface';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run('sort-interface', sortInterface as any, {
  valid: [
    'interface Foo { a: string; b: string;}',
    'interface Foo { a: string; b: string; c: string;}',
    `interface Foo { a: string; b: string; c: string; d: string;}`,
    `interface Foo { a: string; b: string; c: string;}`,
  ],
  invalid: [
    {
      code: `interface Foo {
        b: string;
        a: string;
        c: string;
        d: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: `interface Foo {
        a: string;
        b: string;
        c: string;
        d: string;
      }`,
    },
  ],
});
