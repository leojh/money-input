import Ember from 'ember';

export default Ember.TextField.extend({
  isValidKeyCode: function(keyCode) {
    //46 = . char
    //48...57 = 0...9 chars
    return keyCode === 46  || (keyCode >= 48 && keyCode <= 57);
  },

  getNewValue: function(e) {
    let keyCode = e.keyCode || e.which;
    var newChar = this.isValidKeyCode(keyCode) ? String.fromCharCode(keyCode) : "";

    return Ember.$(e.currentTarget).val() + newChar;
  },

  moreThanTwoDecimals: function(e) {
    return this.getNewValue(e).countDecimals() > 2;
  },

  isTab: function(keyCode) {
    return keyCode === 9;
  },

  isInvalidValue: function(e) {
    var value = this.getNewValue(e);

    if (!value) {
      return !this.isTab(e.keyCode);
    }

    return isNaN(value) || value.countDecimals() > 2;
  },

  willInsertElement: function() {
    this.$().asEventStream("keypress")
      .filter(e => this.isInvalidValue(e))
      .onValue(e => e.preventDefault());
  }
});
