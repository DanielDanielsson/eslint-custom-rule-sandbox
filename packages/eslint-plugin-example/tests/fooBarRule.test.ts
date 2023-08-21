/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RuleTester } from '@typescript-eslint/rule-tester';

import { fooBarRule } from '../src/rules/fooBarRule';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run('foo-bar-rule', fooBarRule as any, {
  valid: [
    'notFooBar()',
    'const foo = 2',
    'const bar = 2',
    "const testing = 'foo'",
  ],
  invalid: [
    {
      code: 'foo()',
      errors: [{ messageId: 'messageIdForSomeFailure' }],
    },
    {
      code: 'bar()',
      errors: [{ messageId: 'messageIdForSomeOtherFailure' }],
    },
  ],
});
