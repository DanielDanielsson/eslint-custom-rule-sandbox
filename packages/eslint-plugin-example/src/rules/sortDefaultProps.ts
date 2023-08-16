/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { JSONSchema4 } from '@typescript-eslint/utils/json-schema';
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createSortReporter } from './utils/plugin';
import { createRule, RuleMetaData } from './utils/rule';
import {
  sortingOrderOptionSchema,
  SortingOrder,
  ErrorMessage,
  SortingOrderOption,
  SortingParamsOptions,
} from './common/options';

const getObjectBody = (node: TSESTree.ArrowFunctionExpression) =>
  node.type === AST_NODE_TYPES.ArrowFunctionExpression && node.params;

/**
 * The name of this rule.
 */
export const name = 'type' as const;

type SortingParams = SortingParamsOptions['caseSensitive'] &
  SortingParamsOptions['natural'] &
  SortingParamsOptions['requiredFirst'];

/**
 * The options this rule can take.
 */
export type Options =
  | [SortingOrderOption]
  | [SortingOrderOption, Partial<SortingParams>];

const sortingParamsOptionSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    caseSensitive: {
      type: 'boolean',
    },
    natural: {
      type: 'boolean',
    },
    requiredFirst: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
};

/**
 * The schema for the rule options.
 */
const schema: JSONSchema4[] = [
  sortingOrderOptionSchema,
  sortingParamsOptionSchema,
];

/**
 * The default options for the rule.
 */
const defaultOptions: Options = [
  SortingOrder.Ascending,
  { caseSensitive: true, natural: false, requiredFirst: false },
];

/**
 * The meta data for this rule.
 */
const meta: RuleMetaData<'invalidOrder'> = {
  type: 'suggestion',
  docs: {
    description: 'require type keys to be sorted',
    recommended: 'recommended',
  },
  messages: {
    invalidOrder: ErrorMessage.DefaultPropsInvalidOrder,
  },
  fixable: 'code',
  schema,
};

/**
 * Create the rule.
 */
export const sortDefaultProps = createRule<'invalidOrder', Options>({
  name,
  meta,
  defaultOptions,

  create(context) {
    return {
      ArrowFunctionExpression(node) {
        if (node.params.length <= 1) {
          return;
        }

        const params = node.params.map((param) => {
          if (param.type === 'AssignmentPattern') {
            return param.left.name;
          }
          return param.name;
        });

        const sortedParams = [...params].sort();

        if (params.join(',') !== sortedParams.join(',')) {
          context.report({
            node,
            message: 'Arrow function parameters should be sorted.',
            fix(fixer) {
              const sourceCode = context.getSourceCode();

              const paramTokens = node.params.map((param) => {
                if (param.type === 'AssignmentPattern') {
                  return sourceCode.getTokenBefore(param.left);
                }
                return sourceCode.getTokenBefore(param);
              });

              const firstParamToken = paramTokens[0];

              const replacements = sortedParams.map((param, index) => {
                const paramToken = paramTokens[index];
                return fixer.replaceTextRange(
                  [paramToken.range[0], paramToken.range[1]],
                  param,
                );
              });

              return [
                fixer.replaceTextRange(
                  [firstParamToken.range[0], firstParamToken.range[1]],
                  '',
                ),
                ...replacements,
              ];
            },
          });
        }
      },
    };
  },
  // const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
  //   loc,
  //   messageId: 'invalidOrder',
  // }));

  // return {
  //   TSArrowFunctionExpression(node) {
  //     // pass parameters of the arrowfunction to compareNodeListAndReport function. Make sure to pass the correct type of parameters and add that type to TStypes in plugin.ts

  //     const body = getObjectBody(node);

  //     return compareNodeListAndReport(body);
  //   },
  //       }
  //     },
  //   };
  // },
});
