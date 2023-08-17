/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { JSONSchema4 } from '@typescript-eslint/utils/json-schema';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
// import { createSortReporter } from './utils/plugin';
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

/**
 * Create the rule.
 */
// export const sortDefaultProps = createRule<'invalidOrder', Options>({
//   name,
//   meta,
//   defaultOptions,

//   create(context) {
//     return {
//       ArrowFunctionExpression(node) {
//         if (node.params.length <= 1) {
//           return;
//         }

//         const params = node.params.map((param) => {
//           if (param.type === AST_NODE_TYPES.AssignmentPattern) {
//             return param.left;
//           }

//           if (param.type === AST_NODE_TYPES.ObjectPattern) {
//             return param.properties;
//           }
//           // return param.left;
//           return null;
//         });

//         const sortedParams = [...params].sort();

//         if (params.join(',') !== sortedParams.join(',')) {
//           context.report({
//             node,
//             messageId: 'invalidOrder',
//           });
//         }
//       },
//     };
//   },
// });

// This one works with map functions!!
// export const sortDefaultProps = createRule<'invalidOrder', Options>({
//   name,
//   meta,
//   defaultOptions,

//   create(context) {
//     return {
//       ArrowFunctionExpression(node) {
//         if (node.params.length > 1) {
//           const paramNames = node.params
//             .filter((param) => param.type === 'Identifier')
//             .map((param: any) => param.name);

//           const sortedParamNames = [...paramNames].sort();

//           if (JSON.stringify(paramNames) !== JSON.stringify(sortedParamNames)) {
//             context.report({
//               node,
//               messageId: 'invalidOrder',
//               fix(fixer) {
//                 const fixes = sortedParamNames.map((paramName, index) => {
//                   const paramNode = node.params[index];
//                   return fixer.replaceText(paramNode, paramName);
//                 });

//                 return fixes;
//               },
//             });
//           }
//         }
//       },
//     };
//   },
// });

export const sortDefaultProps = createRule<'invalidOrder', Options>({
  name,
  meta,
  defaultOptions,

  create(context) {
    const checkOrder = (node, params) => {
      if (params.length > 0) {
        // this was the issue (> 1, object has just >= 1 )
        // const paramNames = params
        //   .filter((param) => param.type === 'Identifier')
        //   .map((param) => param.name);

        const propertyNames = [];

        console.log('Arr node', node);

        params.forEach((property) => {
          if (property.type === 'Identifier') {
            // console.log('Found Identifier');
            propertyNames.push(property.name);
          }
          if (property.type === AST_NODE_TYPES.ObjectPattern) {
            console.log('Found ObjectPattern');
          }

          if (property.type === AST_NODE_TYPES.AssignmentPattern) {
            console.log('Found Assignment pattern');
          }

          if (property.type === AST_NODE_TYPES.TSParameterProperty) {
            console.log('Found TSParameterProperty');
          }

          // if (property.type === 'Property' && property.key) {
          //    else if (property.key.type === 'ObjectPattern') {
          //     property.key.properties.forEach((subProperty) => {
          //       if (
          //         subProperty.type === 'Property' &&
          //         subProperty.key.type === 'Identifier'
          //       ) {
          //         propertyNames.push(subProperty.key.name);
          //       }
          //     });
          //   }
          // }
        });

        const sortedParamNames = [...propertyNames].sort();

        if (
          JSON.stringify(propertyNames) !== JSON.stringify(sortedParamNames)
        ) {
          context.report({
            node,
            messageId: 'invalidOrder',
            // fix(fixer) {
            //   const fixes = sortedParamNames.map((index, paramName) => {
            //     const paramNode = params[index];
            //     return fixer.replaceText(paramNode, paramName as any);
            //   });

            //   return fixes;
            // },
          });
        }
      }
    };

    // console.log('node', node);

    return {
      // console.log('node', node);
      // TSDeclareFunction(node) {
      // console.log('Found TSDeclareFunction');
      // console.log('node', node);
      // checkOrder(node, node.params);
      // },

      ArrowFunctionExpression(node) {
        console.log('Found ArrowFunctionExpression');
        console.log('node', node);
        checkOrder(node, node.params);
      },

      // TSFunctionSignatureBase(node) {
      // console.log('Found TSFunctionSignatureBase');
      // console.log('node', node);
      // checkOrder(node, node);
      // },
      // FunctionDeclaration(node) {
      //   checkOrder(node, node.params);
      // },

      // FunctionExpression(node) {
      //   if (node.params.length === 0) {
      //     return;
      //   }
      //   const lastParam = node.params[node.params.length - 1];
      //   if (lastParam.type === 'ObjectPattern' && lastParam.properties) {
      //     checkOrder(node, lastParam.properties);
      //   }
      // },
    };
  },
});

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

// fix(fixer) {
//   const sourceCode = context.getSourceCode();

//   const paramTokens = node.params.map((param) => {
//     if (param.type === "AssignmentPattern") {
//       return sourceCode.getTokenBefore(param.left);
//     }
//     return sourceCode.getTokenBefore(param);
//   });

//   const firstParamToken = paramTokens[0];

//   const replacements = sortedParams.map((param, index) => {
//     const paramToken = paramTokens[index];
//     return fixer.replaceTextRange(
//       [paramToken.range[0], paramToken.range[1]],
//       param
//     );
//   });

//   return [
//     fixer.replaceTextRange(
//       [firstParamToken.range[0], firstParamToken.range[1]],
//       ""
//     ),
//     ...replacements,
//   ];
// },
