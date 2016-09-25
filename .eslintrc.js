module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "no-console": "off",
      "import/no-extraneous-dependencies": ["error", {"devDependencies": ['**/spec/*']}]
    }
};