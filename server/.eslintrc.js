export default {
    "env": {
        "es2022": true,
        "node": true
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".ts"],
                "paths": ["src"]
            }
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts"]
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript"
    ],
    "overrides": [
        {
            "files": ["**/*.ts"],
            "plugins": ["@typescript-eslint", "unused-imports", "simple-import-sort"],
            "extends": ["plugin:prettier/recommended"],
            "parserOptions": {
                "project": "./tsconfig.json"
            },
            "rules": {
                "prettier/prettier": [
                    "error",
                    {
                        "singleQuote": true,
                        "endOfLine": "auto",
                        "trailingComma": "all",
                        "tabWidth": 4,
                        "printWidth": 120
                    }
                ],
                "@typescript-eslint/comma-dangle": "off",
                "@typescript-eslint/consistent-type-imports": "error",
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-unused-vars": "off",
                "import/prefer-default-export": "off",
                "simple-import-sort/exports": "error",
                "simple-import-sort/imports": "error",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
        "indent": ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "endOfLine": "auto",
                "trailingComma": "all",
                "tabWidth": 4,
                "printWidth": 120
            }
        ],
        "quotes": ["error", "single"],
        "semi": ["error", "never"]
    }
}
