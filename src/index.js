'use strict';
const {
  enableFileComment,
  hasDisableLineComments,
  variableDeclarationHasPattern,
} = require('./util');
const PipeTransformer = require('./pipe-transform');

module.exports = function({ types: t }) {
  let enablePipePlugin = false;
  return {
    name: 'pipe',
    visitor: {
      Program() {
        // detect the comment @pipe
        let { value = '' } = this.file.ast.comments[0] || {};
        value = value.trim();
        if (enableFileComment === value) {
          enablePipePlugin = true;
        }
      },
      VariableDeclaration(path) {
        if (!enablePipePlugin) return;
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
    }
  };
}
