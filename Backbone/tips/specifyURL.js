window.MyModel = Backbone.Model.extend({
  // ... other stuff ...

  url: '/myapipath/special-path/?code=ABC',

  methodUrl: {
    'create': '/myapipath/special-path/',
    'delete': '/myapipath/itemtype/id/'
  },

  sync: function(method, model, options) {
    if (model.methodUrl && model.methodUrl[method.toLowerCase()]) {
      options = options || {};
      options.url = model.methodUrl[method.toLowerCase()];
    }
    Backbone.sync(method, model, options);
  }
}

/**

http://stackoverflow.com/questions/6986914/how-do-i-specify-various-urls-in-a-backbone-app

Conceptually the url of a Backbone model is the primary GET url of the resource. 
To use a different url for some of the actions, override the model's sync function.

Backbone destory() call DELETE http request to url by default


**/
