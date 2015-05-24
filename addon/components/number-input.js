import Ember from 'ember';

export default Ember.TextField.extend({
  getNewValue: function(e) {
    let keyCode = e.keyCode || e.which;

    return Ember.$(e.currentTarget).val() + String.fromCharCode(keyCode);
  },

  validKeys: [
    8, //backspace
    9, //tab
    38, //left arrow
    39 //right arrow
  ],

  isValidKey: function(keyCode) {
    _.contains(this.validKeys, keyCode);
  },

  moreThanTwoDecimals: function(e) {
    return this.getNewValue(e).countDecimals() > 2;
  },

  isInvalidValue: function(e) {
    let keyCode = e.keyCode || e.which;

    if (this.isValidKey(keyCode)) {return true;}

    var value = this.getNewValue(e);
    return isNaN(value) || value.countDecimals() > 2;
  },

  willInsertElement: function() {
    this.$().asEventStream("keypress")
      .filter(e => this.isInvalidValue(e))
      .onValue(e => e.preventDefault());
  }
});
