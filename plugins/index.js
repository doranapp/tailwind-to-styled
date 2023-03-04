const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require('autoprefixer')
const mergeRules = require('postcss-combine-duplicated-selectors');
const css = require('./css');

module.exports = function () {
  function convertToStyled(tree) {
    const node = tree[0];

    const classes = node.attrs.class;

    const tag = node.tag;

    const output = postcss([mergeRules(), autoprefixer(), tailwindcss(), css({ tag })])
      .process(`.${tag} { @apply ${classes} }`)
      .css;

    return output.replace('}', '').replace('{', '').replace('tag-replace-me', tag) + '\n`';
  }

  return convertToStyled;
};
