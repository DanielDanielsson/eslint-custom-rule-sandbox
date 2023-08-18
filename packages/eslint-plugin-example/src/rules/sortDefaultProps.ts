/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { JSONSchema4 } from '@typescript-eslint/utils/json-schema';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule, RuleMetaData } from './utils/rule';
import {
  sortingOrderOptionSchema,
  SortingOrder,
  ErrorMessage,
  SortingOrderOption,
  SortingParamsOptions,
} from './common/options';

// const getObjectBody = (node: TSESTree.ArrowFunctionExpression) =>
//   node.type === AST_NODE_TYPES.ArrowFunctionExpression && node.params;

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

export const sortDefaultProps = createRule<'invalidOrder', Options>({
  name,
  meta,
  defaultOptions,

  create(context) {
    const checkOrder = (node, params) => {
      if (params.length > 0) {
        const propertyNames = [];

        params.forEach((property) => {
          if (property.type === 'Identifier') {
            propertyNames.push(property.name);
          }
          if (property.type === AST_NODE_TYPES.ObjectPattern) {
            property.properties.forEach((subProperty) => {
              if (
                subProperty.type === 'Property' &&
                subProperty.key.type === 'Identifier'
              ) {
                propertyNames.push(subProperty.key.name);
              }
            });
          }
        });

        const sortedParamNames = [...propertyNames].sort();

        if (
          JSON.stringify(propertyNames) !== JSON.stringify(sortedParamNames)
        ) {
          context.report({
            node,
            messageId: 'invalidOrder',
          });
        }
      }
    };

    return {
      ArrowFunctionExpression(node) {
        checkOrder(node, node.params);
      },
    };
  },
});

// fix(fixer) {
//   const fixes = sortedParamNames.map((index, paramName) => {
//     const paramNode = params[index];
//     // return fixer.replaceText(paramNode, paramName as any);
//     return fixer.replaceText(paramNode, paramName as any);
//   });

//   return fixes;
// },
