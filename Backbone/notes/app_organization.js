//Create a single global object where everything is stored

//Create instance without creating a class
var App = Backbone.View.extend({
  Models: {},
  Views: {},
  Collections: {},
  events: {
    'click a': function(e){
      e.preventDefault();
      Backbone.history.navigate(e.target.pathname, {trigger: true});
    }
  },
  start: function(){
    Backbone.history.start({pushState:true});
  }
}))({el: document.body});

$(function(){ App.start(); })

//Store one-off objects on App
App.Models.TodoItem = Backbone.Model.extend({}); 
App.Views.TodoItem = Backbone.View.extend({});
App.Collections.TodoItems = Backbone.Collection.extend({}); 
App.Views.TodoItems = Backbone.View.extend({});
App.TodoRouter = Backbone.Router.extend({});

//Reference classes with the namespace
var todoItem = new App.Models.TodoItem({...})

//Captures only the links we want it to
￼<ul>
  <li><a href="/completed" data-internal="true">Show Completed</a></li>
  <li><a href="/support">Support</a></li>
</ul>

￼events: {
'click a[data-internal]': function(e){
    e.preventDefault();
    Backbone.history.navigate(e.target.pathname, {trigger: true});
  }
}

//Add Initial HTML to the body
￼
var App = new (Backbone.View.extend({
  ...
  template: _.template('<h1>ToDo List!</h1>' +
    '<div id="app"></div>'),
  render: function(){
    this.$el.html(this.template());
  }
}))({el: document.body});

$(function(){
  App.render();
  App.start();
})

//Object initialization
  var App = new (Backbone.View.extend({ 
    start: function(bootstrap){
      var todos = new App.Collections.TodoItems(bootstrap.todos); 
      var todosView = new App.Views.TodoItems({collection: todos});
      this.$el.append(todosView.render().el);
    }
  }))({el: document.body});
  
  //Bootstrap data comes from rendered HTML page
  var bootstrap = {
    todos: [
      {id: 1, description: "Pickup Milk.", status: "complete"},
      {id: 2, description: "Pickup Kids.", status: "incomplete"},
    ]
  }
  
  //Pass in data to start
  $(function(){ App.start(bootstrap);})
￼
