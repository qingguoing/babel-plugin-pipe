'use strict';

const {
  enableFileComment,
  hasDisableLineComments,
  variableDeclarationHasPattern,
} = require('./util');
const PipeTransformer = require('./pipe-transform');

module.exports = function({ types: t }) {
  return {
    name: 'pipe',
    visitor: {
      Program(path) {
        let { value = '' } = this.file.ast.comments[0] || {};
        value = value.trim();
        if (enableFileComment !== value) {
          return;
        }
        // 避免多个 babel plugin 共同使用而无效
        path.traverse({
          VariableDeclaration(path) {
            const { node, parent } = path;
            if (t.isForXStatement(parent)) return;
            if (!variableDeclarationHasPattern(node)) return;
            if (node._filterPluginPassed) return;
            if (hasDisableLineComments(node.leadingComments, true)) return;
            if (hasDisableLineComments(node.trailingComments, false)) return;

            const nodes = [];
            node.declarations.forEach(declar => {
              const { id: pattern, init: patternInit } = declar;
              if (t.isPattern(pattern)) {
                const pipeline = new PipeTransformer({
                  path,
                  nodes,
                  pattern,
                  patternInit,
                });
                pipeline.reverseNodes();
              } else {
                nodes.push(t.cloneNode(declar));
              }
            });
            const nodeOut = t.VariableDeclaration(node.kind, nodes);
            nodeOut._filterPluginPassed = true;
            path.replaceWith(nodeOut);
          },
        });
      },
    }
  };
}
