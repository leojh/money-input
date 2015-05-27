import Ember from 'ember';

export default Ember.TextField.extend({
  getNewValue: function(e) {
    let keyCode = e.keyCode || e.which;
    //var newChar = this.isValidKeyCode(keyCode) ? String.fromCharCode(keyCode) : "";
    var newChar = String.fromCharCode(keyCode);
    return Ember.$(e.currentTarget).val() + newChar;
  },

  moreThanTwoDecimals: function(e) {
    return this.getNewValue(e).countDecimals() > 2;
  },

  isInvalidValue: function(e) {
    if (e.altKey || e.metaKey || e.shiftKey || e.ctrlKey) { return false;}
    if (e.which === 0) {return false;} //arrow keys, etc, in FF
    if (e.which === 8) {return false;} //backspace

    var value = this.getNewValue(e);

    return isNaN(value) || value.countDecimals() > 2;
  },

  willInsertElement: function() {
    this.$().asEventStream("keypress")
      .filter(e => this.isInvalidValue(e))
      .onValue(e => e.preventDefault());
  }
});
