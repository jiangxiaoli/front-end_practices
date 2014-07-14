/*
 created 07/08/14
 Xiaoli
 code school Backbone.js
 */

/****************** 1-level 1 intro ******************/
//data transfer in DOM manipulation - we need an object to maintain the data
//don't lose the data in the DOM
    //- provide cline-side app structure
    //- models to represent dat
    //- views to hook up models to the DOM
    //- sync data to/from server

//create a model class - first letter captilized
    var TodoItem = Backbone.Model.extend({});
    //create a model instance
    var todoItem = new TodoItem(
        { description:"Pick up milk", status:"incomplete", id:1}
    );

    todoItem.get("description");
    todoItem.set({status:"complete"});
    todoItem.save(); //sync to the server

//view - provided the data by models
    var TodoView = Backbone.View.extend({
        //method to render the DOM
        render: function () {
            var html = "<h3>" + this.model.get("description")+"</h3>";
            //every view has a top level EL element
            $(this.el).html(html);
        }

    });
    var todoView = new TodoView({ model: todoItem});
    todoView.render();
    console.log(todoView.el);


/**************** 1-level 2 Models ******************/
//models to get JSON
    var todoItem = new TodoItem();
    todoItem.url = "/todos"; //url to get JSON
    todoItem.fetch(); //populate model from server
    todoItem.get("description");

//fetch data from server - better url
                                        //RESTful web service
    var TodoItem = Backbone.Model.extend({urlRoot:"/todos"});
    var todoItem = new TodoItem({id:1}); //fetch todos with id=1
    todoItem.fetch(); //GET /todos/1
    todoItem.set({description:"Pick up cookies"});
    todoItem.save();  //PUT /todos/1 with JSON params

//creating & destroying a new todos
    var todoItem = new TodoItem();
    todoItem.set({description:"Fill prescription"});
    todoItem.save();    //POST /todos
    todoItem.get("id"); //id = 2
    todoItem.destroy(); //DELETE /todos/2
    todoItem.toJSON();  //get JSON from model

//default values
    var TodoItem = Backbone.Model.extend({
        defaults: {
            description: "Empty todo...",
            status:"incomplete"
        }
    });
    var todoItem = new TodoItem();
    todoItem.get("description");
    todoItem.get("status");

    //wrap default to a function
    // defaults to get evaluated every time a new instance is created
    var Appointment = Backbone.Model.extend({
        defaults: function() {
            return {
                title: 'Checkup',
                date: new Date()
            }
        }
    });

//models can have events
    //to listen for an event on a model
    todoItem.on("event-name", function () {
        alert("event-name happened");
    });
    //run the event
    todoItem.trigger("event-name");

//to listen for changes
    todoItem.on("change", doThing);//var doThing = function(){};
    //event triggered on change
    todoItem.set({description:"Fill prescription"});
    //set without triggering event
    todoItem.set({description:"Fill prescription"},{silent:true});
    //remove event lisenter
    todoItem.off("change", doThing);

//build-in events
"change"        //when an attribute is modified
"change:<attr>" //when <attr> is modified
"destroy"       //when a model is destroyed
"sync"          //whenever successfully synced
"error"         //when model save or validation failed
"all"           //any triggered event

/**************** 1-level 3 Views ******************/
//more on the view element - setting the el element
    var TodoView = Backbone.View.extend({
        tagName: "article",
        id: "todo-view",
        className: "todo"
    });
    var todoView = new TodoView();
    console.log(todoView.el); //<article id=‘todo-view’ class="todo"></article>

//use a jQuery method
    $(todoView.el).html();
    todoView.$el.html(); //shortcut, good since the el's id may be dynamic

//using a template
var TodoView = Backbone.View.extend({
    //underscore library
    template: _.template("<h3><%= description %></h3>"),

    render: function(){
        var attributes = this.model.toJSON();
        this.$el.html(this.template(attributes));
    }
});

//adding view events
var TodoView = Backbone.View.extend({
    events: {
      "click h3": "alertStatus"//"<event> <selector>":"<method>"
    },

    alertStatus: function(e){
        alert("hey, you clicked h3!");//h3 is scoped to the el
    },
    somefunc: function(){
        this.$el.delegate("h3","click",alertStatus);
    }
});

//more events
var TodoView = Backbone.View.extend({
    events: {
        "click h3": "alertStatus",//"<event> <selector>":"<method>"
        "dblclick": "open",
        "click .icon.doc":"select",
        "mouseover .title .date":"showTooltip"
    }
});

/**************** 1-level 4 Models & Views ******************/
//adding a checkbox - change the data from view to model
 var TodoView = Backbone.View.extend({
    template: _.template("<h3 class='<%= status %'>"+
        "<% if(status === 'incomplete') print('checked') %>/>"+
        "<%= description %></h3>"),
    events:{
        "change input": "toggleStatus"//listen to input
    },

    //listen to any model change, third "this" set to todoView, if not set to window
    initialize:function(){
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.remove, this);
    },

    toggleStatus: function(){
        this.model.toggleStatus(); //connect to model
    },

    render: function () {
        this.$el.(this.template(this.model.toJSON()));
    },
    remove:function(){
        this.$el.remove();
    }
});

var TodoItem = Backbone.Model.extend({
    toggleStatus: function(){
        if(this.get("status") === "incomplete" ){
            this.set({"status": "complete"});
        }else{
            this.set({"status":"incomplete"});
        }
        this.save(); //PUT /todos/1
    }
});

/**************** 1-level 5 collections ******************/
//set of models
var TodoList = Backbone.Collection.extend({
    model: TodoItem
});
var todoList = new TodoList();

todoList.length;//get number of models
todoList.add(todoItem1);//add a model
todoList.at(0); //get model instance at index 0
todoList.get(1); // get by id 1
todoList.remove(todoItem1); //remove a model instance

//fetch data from server
var TodoList = Backbone.Collection.extend({
    url:"/todos"
});
todoList.fetch();// GET /todos

//collection events - add, remove, reset
todoList.on("reset", doThing);
//event triggered on reset& fetch
todoList.fetch();
todoList.reset();
//without notification
todoList.fetch({silent:true});
todoList.reset({silent:true});
//remove event listener
todoList.off("reset", doThing);
//model events - change, change:<attr>, destroy, sync, error, all
//events triggered on a model in a collection will also be triggered
//on the collection

todoList.on("add", function (todoItem) {
    console.log(todoItem.get("description"));
});

//Iteration
todoList.forEach(function (todoItem) {
    alert(todoItem.get("description"));
});
//map- build an array of descriptions
todoList.map(function (todoItem) {
    return todoItem.get("description");
});
//filter
todoList.filter(function () {
   return todoItem.get("status")==="incomplete";
});
//others - provided by underscore library
//forEach, reduce, reduceRight, find, filter, reject, every, all
//some, include, invoke, max, min, sortBy, groupBy, sortedIndex
//shuffle, toArray, size, first, initial, rest, last, without,
//indexOf, lastIndexOf, isEmpty, chain

/**************** 1-level 6 Collections & Views ******************/
var TodoListView = Backbone.View.extend({});
var todoListView = new TodoListView({collection: todoList});

//render each view, listening to add event
    var TodoListView = Backbone.View.extend({

        initialize: function () {
            //listen to add event
            this.collection.on("add", this.addOne, this);
            //listen to reset event
            this.collection.on("reset", this.addAll, this);
        },
        //add view to each model
        render: function() {
            //this.collection.forEach(this.addOne, this);//second "this", saves context
            this.addAll();
        },

        addOne: function (todoItem) {
            var todoView = new TodoView({model: todoItem});
            this.$el.append(todoView.render().el);
        },

        addAll: function () {
            this.collection.forEach(this.addOne, this);
        }

    });

    var newTodoItem = new TodoItem({
        description:"take out",
        status:"incomplete"
    });
    todoList.add(newTodoItem);
    todoList.fetch();

//problem: remove item from collection, does not remove view
//fix the problem with custom events
    //in todoList collection
    initialize: function() {
        this.on("remove", this.hideModel);
    },
    hideModel: function(model) {
        modeltrigger("hide");
    }
    //in todiItem View
    initialize: function () {
        this.model.on("hide", thie.remove, this);
    }

/**************** 1-level 7 Router & History ******************/
//Router - map URLs to actions
    var router = new Backbone.Router({
        routes:{
            "todos":"index", //url /todos #todos
            "todos/:id":"show" //id - params
        },

        index: function () {},
        show: function(){}
    });

//route matchers
    "search/:query"          search/ruby         (query='ruby')
    "search/:query/p:page"    search/ruby/p2      (query='ruby', page=2)
    "folder/:name-:mode"      folder/foo-r        (name='foo', mode='r')
    "file/*path"              file/hello/world.txt (path='hello/world.txt')
        //wildcard matches everything after file/

//triggering routes with navigating
var router = new AppRouter();
router.navigate("todos/1",{ trigger: true});

//triggering routes
    //hashbangs(#) for saving history - HTML5 pushState
    Backbone.history.start({pushState: true}); //pushState on
    router.navigate("todos/1"); //url /todos/1

//define router class
    var TodoRouter = Backbone.Router.extend({
        routes:{
            "":"index", //root - when hit back button
            "todos/:id":"show" //id - params
        },

        index: function () {
            this.todoList.fetch();
        },
        show: function(id){
            //reset todoList collection to show only the todoItem with id
            //get todoList form initialize
            this.todoList.focusOnTodoItem(id);
        },
        initialize: function (options) {
            //assign the todoList from options
            this.todoList = options.todoList;
        }
    });

//instance touter
    var todoList = new TodoList();
    var TodoApp = new TodoRouter({todoList: todoList});

//app organization
    var TodoApp = new (Backbone.Router.extend({
        routes:{
            "":"index", //root - when hit back button
            "todos/:id":"show" //id - params
        },
        initialize: function () {
            this.todoList = new TodoList();
            this.todosView = new TodoListView({collection: this.todoList});
            $("#app").append(this.todosView.el);
        },
        start: function(){
            Backbone.history.start({pushStatus: true});
        },
        index: function () {
            this.todoList.fetch();
        },
        show: function(id){
            this.todoList.focusOnTodoItem(id);
        }
    }));

//in $(document).ready()
    $(function () {TodoApp.start()}); //start the whole app

//other sample of app organization
    var AppRouter = new (Backbone.Router.extend({
        routes: { "appointments/:id": "show", "": "index" },

        initialize: function(){
            this.appointmentList = new AppointmentList();
        },

        start: function(){
            Backbone.history.start({pushState: true});
        },

        index: function(){
            var appointmentsView = new AppointmentListView({collection: this.appointmentList});
            appointmentsView.render();
            $('#app').html(appointmentsView.el);
            this.appointmentList.fetch();
        },

        show: function(id){
            var appointment = new Appointment({id: id});
            var appointmentView = new AppointmentView({model: appointment});
            appointmentView.render();
            $('#app').html(appointmentView.el);
            appointment.fetch();
        }
    }));

    $(document).ready(function(){
        $(function(){AppRouter.start()});
    });