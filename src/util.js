'use strict'
const { types: t } = require('@babel/core');

const enableFileRegexp = /@pipeline\b/g;
const disableNextLineRegexp = /@pipeline-next-line-disabled\b/g;
const disableLineRegexp = /@pipeline-line-disabled\b/g;

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