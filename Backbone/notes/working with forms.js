//code school 2-5 work with forms

//1. build form view
var TodoForm = Backbone.View.extend({
  template: _.template('<form>' + 
    '<input name=description value="<%= description %>" />' +
    '<button>Save</button></form>'),
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  events: {
    submit: 'save' //Will call save on either click or pressing Enter/Return
  },
  save: function(e) {
    e.preventDefault();
    var newDescription = this.$('input[name=description]').val();
    this.model.save({description: newDescription});
  }
});

//2. build todoItem model
var todoItem = new TodoItem({description: "What do you need to do?"});

//3. pass model to form
var todoForm = new TodoForm({model: todoItem});

//4. render form
$('#app').html(todoForm.render().el);

//<form><input name=description value="What do you need to do?" />
//<button>Save</button></form>

/********Edit form*********/
//1. Get existing TodoItem from already fetched collection
var todoItem = todoItems.get(1);

//2. Pass in existing model
var editTodoForm = new TodoForm({model: todoItem});

//3. Replace #app with the HTML of the form
$('#app').html(editTodoForm.render().el);

//4. Add Route to render New Form

var TodoApp = new (Backbone.Router.extend({
  routes: {
    "": "index",
    "todos/:id/edit": "edit",
    "todos/new": "newTodo",
  },
  initialize: function(){
    this.todoItems = new TodoItems();
    this.todosView = new TodosView({collection: this.todoItems});
  },
  index: function(){
    this.todoItems.fetch();
    $('#app').html(this.todosView.render().el);
  },
  newTodo: function(){
    var todoItem = new TodoItem({description: "What do you have to do?"});
    var todoForm = new TodoForm({model: todoItem});
    $('#app').append(todoForm.render().el);
  },
  edit: function(id){
    var todoForm = new TodoForm({model: this.todoItems.get(id) });
    $('#app').html(todoForm.render().el);
}));

//Get Back to the List after saving
var TodoForm = Backbone.View.extend({
  ...
  save: function(e) {
    e.preventDefault();
    var newDescription = this.$('input[name=description]').val();
    
    this.model.save({description: newDescription}, {
      success: function(model, response, options){
        Backbone.history.navigate('', { trigger: true });
      },
      error: function(model, xhr, options){
        var errors = JSON.parse(xhr.responseText).errors;
        alert('Oops, something went wrong with saving the TodoItem: ' + errors);
      }
      
    });
  }
});
    
