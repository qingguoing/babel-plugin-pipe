'use strict';

const { types: t } = require('@babel/core');

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
    if (!t.isObjectExpression(patternInit)) {
      initExpression = t.logicalExpression('||', patternInit, t.objectExpression([]));
    }
    if (restElement) {
      objProps.push(restElement);
    }
    this.nodes.push(t.VariableDeclarator(t.objectPattern(objProps), initExpression));
  }

  pushArrayPattern(pattern, patternInit, defaultNode) {
    const { elements } = pattern;
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
    if (!t.isArrayExpression(patternInit)) {
      initExpression = t.logicalExpression('||', patternInit, t.arrayExpression([]));
    }
    const patternExpression = t.arrayPattern(newEle);
    this.nodes.push(t.VariableDeclarator(patternExpression, initExpression));
  }

  pushAssignmentPattern(element, init, defaultInit) {
    const initExpression = t.logicalExpression('||', init, defaultInit);
    this.nodes.push(t.VariableDeclarator(element, initExpression));
    // const { key, value } = property;
    // const { left: patternLeft, right: patternRight } = value;
    // if (t.isBinaryExpression(patternRight)) {
    //   const temp = this.scope.generateUidIdentifierBasedOnNode(patternLeft);
    //   this.filterFnArr = [];
    //   const defaultValue = this.pushBinaryExpression(patternRight);
    //   this.handleFilterFun(patternLeft, temp);
    //   const assignPattern = t.assignmentPattern(temp, defaultValue);
    //   const objProp = t.objectProperty(key, assignPattern, false, false);
    //   objProps.push(objProp);
    // } else {
    // }
  }

  // pushBinaryExpression(patternRight) {
  //   const { left, right } = patternRight;
  //   this.filterFnArr.push(right.value);
  //   if (t.isBinaryExpression(left)) {
  //     return this.pushBinaryExpression(left);
  //   }
  //   return left;
  // }

  // handleFilterFun(origin, temp) {
  //   const len = this.filterFnArr.length;
  //   let tempCenter = origin;
  //   let tempParam = temp;
  //   this.filterFnArr.forEach((filterFn, i) => {
  //     const fnArr = filterFn.split(' ');
  //     const fnName = fnArr.shift();
  //     const fnParams = fnArr.map(str => t.stringLiteral(str));
  //     tempParam = i === len - 1 ? temp : this.scope.generateUidIdentifierBasedOnNode(tempParam);
  //     const fun = t.callExpression(t.identifier(fnName), [tempParam, ...fnParams]);
  //     this.nodes.push(t.VariableDeclarator(tempCenter, fun));
  //     tempCenter = tempParam;
  //     if (i === len - 1) {
  //       tempParam = temp;
  //     }
  //   });
  // }
  
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