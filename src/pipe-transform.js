'use strict';

const { types: t } = require('@babel/core');

const pipelineOperator = '|>';

module.exports = class PipeTransformer {
  constructor(opts) {
    this.nodes = opts.nodes || [];
    const { scope } = opts.path;
    this.scope = scope;
    const pattern = t.cloneNode(opts.pattern);
    const patternInit = t.cloneNode(opts.patternInit);
    this.init(pattern, patternInit);
  }

  init(pattern, patternInit) {
    if (t.isObjectPattern(pattern)) {
      this.pushObjectPattern(pattern, patternInit);
    }
    if (t.isArrayPattern(pattern)) {
      this.pushArrayPattern(pattern, patternInit);
    }
  }

  pushObjectPattern(pattern, patternInit) {
    const { properties } = pattern;
    if (!properties.length) {
      this.nodes.push(t.VariableDeclarator(pattern, patternInit));
      return;
    }
    let objProps = [];
    let restElement = null;
    properties.forEach(property => {
      if (t.isRestElement(property)) {
        restElement = property;
        return;
      }
      const { key, value } = property;
      if (t.isAssignmentPattern(value)) {
        const { left, right } = value;
        const temp = this.scope.generateUidIdentifier();
        objProps.push(t.objectProperty(key, temp, false, false));
        this.pushAssignmentPattern(left, temp, right);
        return;
      }
      if (t.isPattern(value)) {
        this.init(value, key);
      }
      const patternKey = t.cloneNode(key);
      const patternValue = t.cloneNode(value);
      if (t.isIdentifier(value) && key.name !== value.name) {
        objProps.push(t.objectProperty(patternKey, patternValue, false, false));
      } else {
        objProps.push(t.objectProperty(patternKey, patternKey, false, true));
      }
    });
    // 去重，留 patternKey 与 patternValue 不一致的
    objProps = this.deduplicateArrOfObjectProperty(objProps);
    let initExpression = patternInit;
    if (t.isIdentifier(patternInit)) {
      initExpression = t.logicalExpression('||', patternInit, t.objectExpression([]));
    }
    if (restElement) {
      objProps.push(restElement);
    }
    this.nodes.push(t.VariableDeclarator(t.objectPattern(objProps), initExpression));
  }

  pushArrayPattern(pattern, patternInit) {
    const { elements } = pattern;
    if (!elements.length) {
      this.nodes.push(t.VariableDeclarator(pattern, patternInit));
      return;
    }
    const newEle = elements.map(element => {
      const temp = this.scope.generateUidIdentifier();
      if (t.isArrayPattern(element)) {
        this.pushArrayPattern(element, temp);
        return temp;
      }
      if (t.isObjectPattern(element)) {
        this.pushObjectPattern(element, temp);
        return temp;
      }
      if (t.isAssignmentPattern(element)) {
        const { left, right } = element;
        this.pushAssignmentPattern(left, temp, right);
        return temp;
      }
      return element;
    });
    let initExpression = patternInit;
    if (t.isIdentifier(patternInit)) {
      initExpression = t.logicalExpression('||', patternInit, t.arrayExpression([]));
    }
    const patternExpression = t.arrayPattern(newEle);
    this.nodes.push(t.VariableDeclarator(patternExpression, initExpression));
  }

  pushAssignmentPattern(element, init, defaultInit) {
    const { operator } = defaultInit;
    if (t.isBinaryExpression(defaultInit) && operator === pipelineOperator) {
      this.handleBinaryExpressionPipelineOperator(init, defaultInit);
      this.nodes.push(t.VariableDeclarator(element, defaultInit));
    } else {
      const initExpression = t.logicalExpression('||', init, defaultInit);
      this.nodes.push(t.VariableDeclarator(element, initExpression));
    }
  }

  // 处理 PipelineOperator， 确保传入到 pipelineOperator 的是原始值，其次才是默认值
  handleBinaryExpressionPipelineOperator(init, defaultInit) {
    const { left } = defaultInit;
    if (t.isBinaryExpression(left) && left.operator === pipelineOperator) {
      this.handleBinaryExpressionPipelineOperator(init, left);
    } else {
      defaultInit.left = t.logicalExpression('||', init, left);
    }
  }
  
  reverseNodes() {
    this.nodes.reverse();
  }

  deduplicateArrOfObjectProperty (arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      const { key, value } = arr[i];
      const uniquePropertyKey = this.getObjectPropertyUniqueKey(key);
      if (obj[uniquePropertyKey]) {
        if (!this.isIdentifierDuplicate(key, value)) {
          obj[uniquePropertyKey] = arr[i];
        }
      } else {
        obj[uniquePropertyKey] = arr[i];
      }
    }
    return Object.keys(obj).map(item => obj[item]);
  }

  getObjectPropertyUniqueKey(property) {
    const { type = '', name = '' } = property || {};
    return `${type}@${name}`;
  }

  isIdentifierDuplicate(identifierA, identifierB) {
    const { type: typeA, name: nameA } = identifierA || {};
    const { type: typeB, name: nameB } = identifierB || {};
    return typeA === typeB && nameA === nameB;
  }
}