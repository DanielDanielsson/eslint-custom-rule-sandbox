import { JSONSchema4 } from '@typescript-eslint/utils/json-schema';
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createReporter } from './utils/plugin';
import { createRule, RuleMetaData } from './utils/rule';
import {
  sortingOrderOptionSchema,
  SortingOrder,
  ErrorMessage,
  SortingOrderOption,
  SortingParamsOptions,
} from './common/options';

const getObjectBody = (node: TSESTree.ArrowFunctionExpression) =>
  node.type === AST_NODE_TYPES.ArrowFunctionExpression && node.params

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
    const compareNodeListAndReport = createReporter(context, ({ loc }) => ({
      loc,
      messageId: 'invalidOrder',
    }));

    return {
      TSArrowFunctionExpression(node) {

        // pass parameters of the arrowfunction to compareNodeListAndReport function. Make sure to pass the correct type of parameters and add that type to TStypes in plugin.ts

        const body = getObjectBody(node);

        console.log('body', body);

        return null;

        // return compareNodeListAndReport(body);
      },
    };
  },
});
