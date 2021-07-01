module.exports = {
  root: true,
  env: {
    node: true,
  },
<<<<<<< HEAD
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
=======
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
>>>>>>> feat/API
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
<<<<<<< HEAD
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
=======
    "prettier/prettier": [
      "warn",
      {
        singleQuote: false,
        semi: false,
        trailingComma: "es5",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
}
>>>>>>> feat/API
