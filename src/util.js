'use strict';

const { types: t } = require('@babel/core');

const enableFileComment = "@pipe";
const disableNextLineComment = "@pipe-next-line-disabled";
const disableLineComment = "@pipe-line-disabled";

function hasDisableLineComments(comments = [], isLeading = false) {
  const len = comments.length;
  let { value = '' } = comments[0] || {};
  let commentPattern = disableLineComment;
  if (isLeading && len > 0) {
    commentPattern = disableNextLineComment;
    value = comments[len - 1].value;
  }
  value = value.trim();
  if (commentPattern === value) {
    return true;
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
  enableFileComment,
  hasDisableLineComments,
  variableDeclarationHasPattern,
};