const plugin = (opts = {}) => ({
  postcssPlugin: "PLUGIN NAME",
  prepare(result) {
    const tag = opts.tag;
    const tagWithSelector = `.${tag}`
    return {
      Rule(rule) {
        if (rule.selector.startsWith(tagWithSelector) && rule.selector !== tagWithSelector) {
          rule.selector = rule.selector.replace(tagWithSelector, '&');
        }
        if (rule.selector === tagWithSelector) {
          rule.selector = `styled.${tag}` + '`';
        }
      },
      Declaration(decl) {
        decl.value = decl.value.replace('`', '&#96;')
      },
    }
  }
})
plugin.postcss = true

module.exports = plugin;
