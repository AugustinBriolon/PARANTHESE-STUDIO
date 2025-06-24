module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-css-order"],
  tailwindFunctions: ["clsx"],
  cssDeclarationSorterOrder: "smacss", // alphabetical || smacss || concentric-css
  cssDeclarationSorterKeepOverrides: true,
};
