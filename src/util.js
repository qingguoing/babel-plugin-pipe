'use strict'
const { types: t } = require('@babel/core');

const enableFileRegexp = /@pipe\b/g;
const disableNextLineRegexp = /@pipe-next-line-disabled\b/g;
const disableLineRegexp = /@pipe-line-disabled\b/g;

function hasDisableLineComments(comments = []) {
  for (let i = 0; i < comments.length; i++) {
    let { value = '' } = comments[i];
    value = value.trim();
    if (disableNextLineRegexp.test(value) || disableLineRegexp.test(value)) {
      return true;
    }
  }
  return false;
}

function variableDeclarationHasPattern(node) {
  for (const declar of node.declarations) {
    if (t.isPattern(declar.id)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  enableFileRegexp,
  hasDisableLineComments,
  variableDeclarationHasPattern,
};