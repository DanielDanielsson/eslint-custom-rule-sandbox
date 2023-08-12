

type MessageIds = 'messageIdForSomeFailure' | 'messageIdForSomeOtherFailure';

export const fooBarRule = {
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    messages: {
      messageIdForSomeFailure: 'Error - You cannot use foo!',
      messageIdForSomeOtherFailure: 'Error - You cannot use bar!',
    },
    schema: [], // no options
  },
  create: context => ({
    CallExpression: node => {

      if (node.callee.name === 'foo') {
        return context.report({
          node: node.callee,
          messageId: 'messageIdForSomeFailure',
        });
      }
      if (node.callee.name === 'bar') {
        return context.report({
          node: node.callee,
          messageId: 'messageIdForSomeOtherFailure',
        });
      }

      return;
    },
  }),
};
