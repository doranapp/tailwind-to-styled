const posthtml = require('posthtml');
const plugins = require('./plugins');
const prompt = require('prompt');
const { program } = require('commander');
const htmlTags = require('html-tags');

const basic = /\s?<!doctype html>|(<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>)+/i;
const full = new RegExp(htmlTags.map(tag => `<${tag}\\b[^>]*>`).join('|'), 'i');

function isHtml(string) {
  string = string.trim().slice(0, 1000);

  return basic.test(string) || full.test(string);
}

program.name('tailwind-to-styled').description('A simple tool for converting TailwindCSS classes to styled-components')

program.parse();

prompt.start();

prompt.get({
  properties: {
    html: {
      conform: isHtml,
      description: 'eg. <div class="flex items-center"></div>',
      message: 'Write true HTML, eg. <div class="flex items-center"></div>',
      required: true,
    }
  }
}, function (err, result) {
  posthtml()
    .use(plugins())
    .process(result.html)
    .then(result => {
      console.log(result.html);
    })
});
