'use strict';

window.formFunctions = (function () {

  return {
    getSelected: function (slectElem) {
      for (var s = 0; s < slectElem.options.length; s++) {
        var option = slectElem.options[s];
        if (option.selected) {
          return option.value;
        }
      }
      return null;
    },
    setSelected: function (slectElem, value) {
      for (var s = 0; s < slectElem.options.length; s++) {
        var option = slectElem.options[s];
        if (option.value === value) {
          option.selected = true;
        }
      }
    },
    setMinValue: function (slectElem, value) {
      if (value === 'flat') {
        slectElem.setAttribute('min', 1000);
      } else if (value === 'bungalo') {
        slectElem.setAttribute('min', 0);
      } else if (value === 'house') {
        slectElem.setAttribute('min', 5000);
      } else if (value === 'palace') {
        slectElem.setAttribute('min', 10000);
      }
    },
    changeCapacity: function (targetEl, value) {
      for (var c = 0; c < targetEl.options.length; c++) {
        if (value === '1') {
          targetEl.options[c].disabled = true;
          targetEl.options[2].selected = true;
          targetEl.options[2].disabled = false;
        } else if (value === '2') {
          targetEl.options[c].disabled = true;
          targetEl.options[1].selected = true;
          targetEl.options[1].disabled = false;
          targetEl.options[2].disabled = false;
        } else if (value === '3') {
          targetEl.options[c].disabled = true;
          targetEl.options[0].selected = true;
          targetEl.options[0].disabled = false;
          targetEl.options[1].disabled = false;
          targetEl.options[2].disabled = false;
        } else if (value === '100') {
          targetEl.options[c].disabled = true;
          targetEl.options[3].disabled = false;
          targetEl.options[3].selected = true;
        }
      }
    }
  };

})();

