(function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;    // importing jQuery, assign to $

  function FormHandler(selector){
      // code go here
      if(!selector)
        throw new Error('No selector provided');

      this.$formElement = $(selector);
      if (this.$formElement.length === 0) {
        throw new Error('Could not find element with selector: ' + selector);
      }
  }

  //to listen to the submit event
  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    // 'on' method similar to addEventListener
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};  //$(this) reference to form element
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data); // function handle the submit event of this.$formElement
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
