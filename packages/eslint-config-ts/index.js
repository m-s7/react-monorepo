module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint',
    ],
    'rules': {
        'react/jsx-space-before-closing': 'error',
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-closing-bracket-location': ['error', 'after-props'],
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-max-props-per-line': ['error', { maximum: { single: 1, multi: 1 }}],
        'react/jsx-handler-names': ['error', { eventHandlerPrefix: 'on', eventHandlerPropPrefix: 'on' }],
        // 'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
        'react/jsx-closing-tag-location': 'error',
        // 'react/jsx-no-literals': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-wrap-multilines': ['error', { return: 'parens-new-line' }],
        'indent': 'off',
        '@typescript-eslint/indent':  ['error', 4, { 'SwitchCase': 1 }],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'no-console': 'warn',
        'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'ignore' }],
        'space-before-blocks': ['error'],
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'space-infix-ops': 'off',
        '@typescript-eslint/space-infix-ops': ['warn', { 'int32Hint': false }],
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['warn', 'always', { arraysInObjects: true, objectsInObjects: false }],
        'object-shorthand': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'arrow-parens': ['warn', 'as-needed'],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: { delimiter: 'comma', requireLast: true },
            singleline: { delimiter: 'comma', requireLast: false },
        }],
        'keyword-spacing': ['warn',
            {
                before: true,
                after: true,
                overrides: {
                    if: { after: false },
                    for: { after: false },
                    while: { after: false },
                    switch: { after: false },
                    catch: { after: false },
                },
            },
        ],
        'array-bracket-spacing': ['warn', 'never'],
        'generator-star-spacing': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
}
