module.exports = {
    extends: [
      'airbnb',
      'airbnb/hooks',
      'eslint:recommended',
      'plugin:react/recommended',
  
      'plugin:@typescript-eslint/recommended',
      'plugin:jsx-a11y/recommended',
  
      'plugin:testing-library/react',
  
      'plugin:prettier/recommended',
  
      'plugin:jest/recommended',
    ],
    plugins: [
      'jest',
      'prettier',
      'react-hooks',
      'import-helpers',
      'fp',
      'react',
      '@typescript-eslint/eslint-plugin',
      'jsx-a11y',
      'testing-library',
    ],
    rules: {
      'max-depth': [2, 2],
      eqeqeq: [2, 'always'],
      'max-lines': [2, { max: 200, skipBlankLines: true }],
      complexity: [2, { max: 10 }],
      'dot-notation': 2,
      'no-undef-init': 2,
      'no-undefined': 2,
      'max-params': [2, 3],
      'no-implicit-coercion': [2, { boolean: true, number: true, string: true }],
      'no-unneeded-ternary': 2,
      'no-console': 2,
      'no-use-before-define': [0, { functions: false, classes: true }],
      'newline-before-return': 2,
      'newline-after-var': 2,
      'padding-line-between-statements': [
        2,
        {
          blankLine: 'always',
          prev: '*',
          next: ['multiline-const', 'multiline-let'],
        },
        {
          blankLine: 'always',
          prev: ['multiline-const', 'multiline-let'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-expression',
          next: '*',
        },
      ],
      'react/function-component-definition': [0],
      'testing-library/await-async-query': 2,
      'testing-library/await-async-utils': 2,
      'testing-library/no-await-sync-query': 2,
      'testing-library/no-debugging-utils': 2,
      'testing-library/no-wait-for-empty-callback': 2,
      'testing-library/prefer-presence-queries': 2,
      'testing-library/prefer-explicit-assert': 2,
      'testing-library/prefer-wait-for': 2,
  
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 1,
  
      'react/display-name': 2,
      'react/prop-types': 0,
      'react/boolean-prop-naming': [
        1,
        { rule: '^(is|has|can)[A-Z]([A-Za-z0-9]?)+' },
      ],
  
      'react/jsx-props-no-spreading': 2,
      'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
      'react/jsx-sort-props': [
        2,
        {
          reservedFirst: true,
          callbacksLast: true,
          shorthandFirst: true,
        },
      ],
  
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'import/prefer-default-export': 0,
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.js', '**/*.spec.js'],
        },
      ],
      'import-helpers/order-imports': [
        1,
        {
          groups: ['/^react/', '/^components/'],
        },
      ],
  
      'fp/no-arguments': 2,
      'fp/no-get-set': 2,
      'fp/no-loops': 1,
      'fp/no-rest-parameters': 1,
      'fp/no-this': 1,
      'fp/no-valueof-field': 2,
      'fp/no-mutating-assign': 2,
      'fp/no-mutating-methods': 1,
      'fp/no-mutation': [1, { exceptions: [{ object: 'errors' }] }],
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],
    },
    overrides: [
      {
        files: ['src/**/__tests__/*', 'src/**/__fixtures__/*', '*.test.*'],
        rules: {
          'jest/prefer-spy-on': 1,
          'jest/require-top-level-describe': 2,
          'jest/no-hooks': 2,
          'jest/prefer-strict-equal': 2,
          'jest/prefer-to-have-length': 2,
          'jest/no-disabled-tests': 1,
          'jest/no-test-prefixes': 1,
          'jest/no-mocks-import': 0,
          'jest/no-conditional-expect': 1,
          'react/display-name': 0,
          'react/jsx-props-no-spreading': 0,
          'fp/no-this': 0,
          'fp/no-mutation': 0,
          'fp/no-mutating-methods': 0,
          '@typescript-eslint/no-empty-function': 2,
          'max-lines': 0,
        },
      },
    ],
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    parser: '@typescript-eslint/parser',
  };
  