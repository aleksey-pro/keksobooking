'use strict';

window.synchronizeFields = function (elemInp, elemOut, arrInp, arrOut, funcSyncValues) {
  var index = arrInp.indexOf(elemInp.value);
  var elemOutVal = arrOut[index];
  funcSyncValues(elemOut, elemOutVal);
};
