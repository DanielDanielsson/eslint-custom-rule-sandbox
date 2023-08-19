/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { JSONSchema4 } from '@typescript-eslint/utils/json-schema';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { createRule, RuleMetaData } from './utils/rule';
import {
  sortingOrderOptionSchema,
  SortingOrder,
  ErrorMessage,
  SortingOrderOption,
  SortingParamsOptions,
} from './common/options';
import { createSortReporter } from './utils/plugin';

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
    const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
      loc,
      messageId: 'invalidOrder',
    }));

    return {
      ArrowFunctionExpression(node) {
        const body = getObjectBody(node);

        if (body[0].type === AST_NODE_TYPES.ObjectPattern) {
          const propertyArray: TSESTree.Property[] = [];

          // Make sure all properties are of type Property and have a key of type Identifier
          body[0].properties.forEach((subProperty) => {
            if (
              subProperty.type === 'Property' &&
              subProperty.key.type === 'Identifier'
            ) {
              propertyArray.push(subProperty);
            }
          });

          return compareNodeListAndReport(propertyArray);
        }

        return null;
      },
    };
  },
});
