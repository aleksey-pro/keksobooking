'use strict';

/**
 * Универсальная фунция синхронизации полей въезда-выезда
 * @param {Element} elemInp
 * @param {Element} elemOut
 * @param {Array} arrInp
 * @param {Array} arrOut
 * @param {Function} funcSyncValues
 */

window.synchronizeFields = function (elemInp, elemOut, arrInp, arrOut, funcSyncValues) {
  var index = arrInp.indexOf(elemInp.value);
  var elemOutVal = arrOut[index];
  funcSyncValues(elemOut, elemOutVal);
};
