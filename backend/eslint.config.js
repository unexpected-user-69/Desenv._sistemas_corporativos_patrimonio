const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          args: 'after-used',
        },
      ],
      'no-unused-vars': 'off', // Use TypeScript version instead
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'no-undef': 'off', // TypeScript handles this
    },
  },
  {
    // Ignorar warnings de console em migrations e arquivos de setup de testes (aceitável)
    // Migrations podem usar console para feedback durante execução
    // Arquivos de setup de testes também podem usar console para logs
    files: [
      '**/migrations/**/*.ts',
      '**/database/migrations/**/*.ts',
      'src/migrations/**/*.ts',
      '**/test/setup.ts',
      '**/test/**/setup.ts',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  {
    // Ignorar warnings de `any` em arquivos de teste (aceitável)
    // Em testes, é comum usar `any` para mocks e simplicidade
    files: ['**/*.spec.ts', '**/*.test.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
