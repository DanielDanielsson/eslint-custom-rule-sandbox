/**
 * @fileoverview Rule to require object keys to be sorted
 * @author Daniel Danielsson
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------


const naturalCompare = require("natural-compare");
/**
 * Determines whether the given node is a `null` literal.
 * @param {ASTNode} node The node to check
 * @returns {boolean} `true` if the node is a `null` literal
 */
function isNullLiteral(node) {

    /*
     * Checking `node.value === null` does not guarantee that a literal is a null literal.
     * When parsing values that cannot be represented in the current environment (e.g. unicode
     * regexes in Node 4), `node.value` is set to `null` because it wouldn't be possible to
     * set `node.value` to a unicode regex. To make sure a literal is actually `null`, check
     * `node.regex` instead. Also see: https://github.com/eslint/eslint/issues/8020
     */
    return node.type === "Literal" && node.value === null && !node.regex && !node.bigint;
}


/**
 * Returns the result of the string conversion applied to the evaluated value of the given expression node,
 * if it can be determined statically.
 *
 * This function returns a `string` value for all `Literal` nodes and simple `TemplateLiteral` nodes only.
 * In all other cases, this function returns `null`.
 * @param {ASTNode} node Expression node.
 * @returns {string|null} String value if it can be determined. Otherwise, `null`.
 */
function getStaticStringValue(node) {
    switch (node.type) {
        case "Literal":
            if (node.value === null) {
                if (isNullLiteral(node)) {
                    return String(node.value); // "null"
                }
                if (node.regex) {
                    return `/${node.regex.pattern}/${node.regex.flags}`;
                }
                if (node.bigint) {
                    return node.bigint;
                }

                // Otherwise, this is an unknown literal. The function will return null.

            } else {
                return String(node.value);
            }
            break;
        case "TemplateLiteral":
            if (node.expressions.length === 0 && node.quasis.length === 1) {
                return node.quasis[0].value.cooked;
            }
            break;

            // no default
    }

    return null;
}


// const astUtils = require("./utils/ast-utils"),
//     naturalCompare = require("natural-compare");

    /**
 * Gets the property name of a given node.
 * The node can be a MemberExpression, a Property, or a MethodDefinition.
 *
 * If the name is dynamic, this returns `null`.
 *
 * For examples:
 *
 *     a.b           // => "b"
 *     a["b"]        // => "b"
 *     a['b']        // => "b"
 *     a[`b`]        // => "b"
 *     a[100]        // => "100"
 *     a[b]          // => null
 *     a["a" + "b"]  // => null
 *     a[tag`b`]     // => null
 *     a[`${b}`]     // => null
 *
 *     let a = {b: 1}            // => "b"
 *     let a = {["b"]: 1}        // => "b"
 *     let a = {['b']: 1}        // => "b"
 *     let a = {[`b`]: 1}        // => "b"
 *     let a = {[100]: 1}        // => "100"
 *     let a = {[b]: 1}          // => null
 *     let a = {["a" + "b"]: 1}  // => null
 *     let a = {[tag`b`]: 1}     // => null
 *     let a = {[`${b}`]: 1}     // => null
 * @param {ASTNode} node The node to get.
 * @returns {string|null} The property name if static. Otherwise, null.
 */
const getStaticPropertyName = (node)  => {
    let prop;

    switch (node && node.type) {
        case "ChainExpression":
            return getStaticPropertyName(node.expression);

        case "Property":
        case "PropertyDefinition":
        case "MethodDefinition":
            prop = node.key;
            break;

        case "MemberExpression":
            prop = node.property;
            break;

            // no default
    }

    if (prop) {
        if (prop.type === "Identifier" && !node.computed) {
            return prop.name;
        }

        return getStaticStringValue(prop);
    }

    return null;
}

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name
 *   whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns null.
 * @param {ASTNode} node The `Property` node to get.
 * @returns {string|null} The property name or null.
 * @private
 */
function getPropertyName(node) {
    const staticName = getStaticPropertyName(node);

    if (staticName !== null) {
        return staticName;
    }

    return node.key.name || null;
}

/**
 * Functions which check that the given 2 names are in specific order.
 *
 * Postfix `I` is meant insensitive.
 * Postfix `N` is meant natural.
 * @private
 */
const isValidOrders = {
    asc(a, b) {
        return a <= b;
    },
    ascI(a, b) {
        return a.toLowerCase() <= b.toLowerCase();
    },
    ascN(a, b) {
        return naturalCompare(a, b) <= 0;
    },
    ascIN(a, b) {
        return naturalCompare(a.toLowerCase(), b.toLowerCase()) <= 0;
    },
    desc(a, b) {
        return isValidOrders.asc(b, a);
    },
    descI(a, b) {
        return isValidOrders.ascI(b, a);
    },
    descN(a, b) {
        return isValidOrders.ascN(b, a);
    },
    descIN(a, b) {
        return isValidOrders.ascIN(b, a);
    }
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
export const sortKeys = {
    meta: {
        type: "suggestion",

        docs: {
            description: "Require object keys to be sorted",
            recommended: false,
            url: "https://eslint.org/docs/latest/rules/sort-keys"
        },

        schema: [
            {
                enum: ["asc", "desc"]
            },
            {
                type: "object",
                properties: {
                    caseSensitive: {
                        type: "boolean",
                        default: true
                    },
                    natural: {
                        type: "boolean",
                        default: false
                    },
                    minKeys: {
                        type: "integer",
                        minimum: 2,
                        default: 2
                    },
                    allowLineSeparatedGroups: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            sortKeys: "Expected object keys to be in {{natural}}{{insensitive}}{{order}}ending order. '{{thisName}}' should be before '{{prevName}}'."
        }
    },

    create(context) {

        // Parse options.
        const order = context.options[0] || "asc";
        const options = context.options[1];
        const insensitive = options && options.caseSensitive === false;
        const natural = options && options.natural;
        const minKeys = options && options.minKeys;
        const allowLineSeparatedGroups = options && options.allowLineSeparatedGroups || false;
        const isValidOrder = isValidOrders[
            order + (insensitive ? "I" : "") + (natural ? "N" : "")
        ];

        // The stack to save the previous property's name for each object literals.
        let stack = null;
        const sourceCode = context.sourceCode;

        return {
            ObjectExpression(node) {
                stack = {
                    upper: stack,
                    prevNode: null,
                    prevBlankLine: false,
                    prevName: null,
                    numKeys: node.properties.length
                };
            },

            "ObjectExpression:exit"() {
                stack = stack.upper;
            },

            SpreadElement(node) {
                if (node.parent.type === "ObjectExpression") {
                    stack.prevName = null;
                }
            },

            Property(node) {
                if (node.parent.type === "ObjectPattern") {
                    return;
                }

                const prevName = stack.prevName;
                const numKeys = stack.numKeys;
                const thisName = getPropertyName(node);

                // // Get tokens between current node and previous node
                // const tokens = stack.prevNode && sourceCode
                //     .getTokensBetween(stack.prevNode, node, { includeComments: true });

                // let isBlankLineBetweenNodes = stack.prevBlankLine;

                // if (tokens) {

                //     // check blank line between tokens
                //     tokens.forEach((token, index) => {
                //         const previousToken = tokens[index - 1];

                //         if (previousToken && (token.loc.start.line - previousToken.loc.end.line > 1)) {
                //             isBlankLineBetweenNodes = true;
                //         }
                //     });

                //     // check blank line between the current node and the last token
                //     if (!isBlankLineBetweenNodes && (node.loc.start.line - tokens[tokens.length - 1].loc.end.line > 1)) {
                //         isBlankLineBetweenNodes = true;
                //     }

                //     // check blank line between the first token and the previous node
                //     if (!isBlankLineBetweenNodes && (tokens[0].loc.start.line - stack.prevNode.loc.end.line > 1)) {
                //         isBlankLineBetweenNodes = true;
                //     }
                // }

                stack.prevNode = node;

                if (thisName !== null) {
                    stack.prevName = thisName;
                }

                if (allowLineSeparatedGroups && false) {
                    stack.prevBlankLine = thisName === null;
                    return;
                }

                if (prevName === null || thisName === null || numKeys < minKeys) {
                    return;
                }

                if (!isValidOrder(prevName, thisName)) {
                    context.report({
                        node,
                        loc: node.key.loc,
                        messageId: "sortKeys",
                        data: {
                            thisName,
                            prevName,
                            order,
                            insensitive: insensitive ? "insensitive " : "",
                            natural: natural ? "natural " : ""
                        }
                    });
                }
            }
        };
    }
};