(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  //var PAYMENT_SELETOR = '[data-coffee-payment="payment"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  //var Payment = App.Payment;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck; // export it as global namespace

  //var formHandler = new FormHandler(FORM_SELECTOR);


  // bind requires you to have a reference to the intended owner of the invocation
  // – a reference that must be available outside of the method body.
  // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  // console.log(formHandler);

  // define CheckList object in checklist.js
  var CheckList = App.CheckList;
  // Instantiate a new CheckList
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  // calling addClickHandler
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  //formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

  // This will not do what you want!
  //formHandler.addSubmitHandler(checkList.addRow.bind(checkList));

  formHandler.addSubmitHandler(function (data) {
      myTruck.createOrder.call(myTruck, data);
      checkList.addRow.call(checkList, data);
    });
})(window);
