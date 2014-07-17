/**
 * Created by Xiaoli on 7/14/14.
 * code school Backbone.js - 2
 */
/****************** 2-level 1 More Models ******************/
//parsing non-standard JSON into model
    todoItem.fetch();//response: {todo:{id:1, description:"pick up", status:"incomplete"}}

    var TodoItem = Backbone.Model.extend({
        //overwrite parse method
        parse: function (response) {
            return response.todo;//parse response todo into
        }
    });
    var todoItem = new TodoItem(
        { todo:{id:1,description:"pick up", status:"incomplete"}},
        { parse: true}
    );
    todoItem.attributes;//get JSON data

//JSON with different attr name
    // response: {todo:{id:1, desc:"pick up", status:"incomplete"}}
    var TodoItem = Backbone.Model.extend({
        parse: function (response) {
            response = response.todo;
            response.description = response.desc; //chang attr name
            delete response.desc;
            return response;//default
        }
    });

    var todoItem = new TodoItem(
        { todo:{id:1,description:"pick up", status:"incomplete"}},
        { parse: true}
    );
    todoItem.attributes;//get JSON data

//modify JSON before sending to the server
    var TodoItem = Backbone.Model.extend({
        //overwrite toJSON
        toJSON: function () {
            //return _.clone(this.attributes);//default
            //return {todo: _.clone(this.attributes)}; //wrap the content with todo
            //to change the "desc" name
            var attrs = _.clone(this.attributes);
            attrs.desc = attrs.description;
            attrs = _.pick(attrs, "desc", "status");
            return {todo: attrs};
        }
    });

    todoItem.toJSON();//get the new format of JSON

//render view with attributes
    var TodoView = Backbone.View.extend({
        render: function () {
            //this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

// unconventional id attribute
    var todoItem = new TodoItem({id:1});
    todoItem.fetch(); //{_id:1,description:"pick up", status:"incomplete"}
    todoItem.id; //undefined

    //redefine the idAttribute in class
    var TodoItem = Backbone.Model.extend({
        idAttribute: "_id"
    });
    todoItem.id; //ok

/****************** 2-level 2 customizing collections ******************/
//non-standard response
//{
//    "total": 25, "per_page":10, "page": 2,
//    "todos" :[{"id":1},{"id":2}]
//}

var TodoItems = Backbone.Collection.extend({
    parse: function (response) {
        this.perPage = response.per_page; //call todoItems.perPage
        this.page = response.page;
        this.total = response.total;
        return response.todos;
    }
});
todoItems.toJSON(); //[{id:1, description:''...}]

//fetch with extra params
todoItems.fetch({data: {page : 6}}); //GET /todos?page=6
appointments.fetch({data: {since: "2013-01-01", per_page: 10}});///appointments?since=2013-01-01&per_page=10

//get next page
todoItems.page //1
todoItems.fetch({data:{page:todoItems.page + 1}}); //GET /todos?page=2

//how to put next page link
    // collection view
    var TodosView = Backbone.View.extend({

       //template for button
        template: _.template('<a href="#/todos/p<$= page%>">next page</a>'),
        //double params <a href="#/appointments/p<%= page %>/pp<%= per_page %>">

        inithialize: function () {
            this.collection.on("reset",this.render,this);
        },
        render: function () {
            this.addAll();

            //pass page attr
            this.$el.append(this.template({page: this.collection.page +1}));
            //double params this.template({page:this.collection.page + 1, per_page:this.collection.per_page }))

            return this;
        }
    });
    //in router
    var TodoApp = new (Backbone.Router.extend({
        routes: {
            "todos/p:page":"page",//add page url
            "":"index"
        },

        //add page func
        page: function (page) {
            this.todoItems.fetch({data: {page: page}});
        },

        initialize: function () {
            this.todoItems = new TodoItems();
            this.todosView = new TodosView({collection: this.todoItems});
            this.todosView.render();
            $("#app").append(this.todosView.el);
        },
        index: function () {
            this.todoItems.fetch();
        }
    }));

//sorting by comparator
    var TodoItems = Backbone.Collection.extend({
        comparator: "status"
    });
    todoItems.fetch(); //sort by status
    //sort by function
    var TodoItems = Backbone.Collection.extend({
        comparator: function (todo1, todo2) {
            return todo1.get("status") < todo2.get("status");//sort by status, reverse order
        }
    });

//aggregate values
var TodoItems = Backbone.Collection.extend({
    completedCount: function () {
        return this.where({status: "complete"}).length;//return filtered array of models
    }
});
todoItems.completedCount();//get number 1

    //double params
    var AppointmentListView = Backbone.View.extend({
        template: _.template('<a href="#/appointments/p<%= page %>/pp<%= per_page %>">View Next</a>'),
        initialize: function(){
            this.collection.on('reset', this.render, this);
        },
        render: function(){
            this.$el.empty();
            this.collection.forEach(this.addOne, this);
            this.$el.append(this.template({page:this.collection.page + 1, per_page:this.collection.per_page }));
        },
        addOne: function(model){
            var appointmentView = new AppointmentView({model: model});
            appointmentView.render();
            this.$el.append(appointmentView.el);
        }
    });

/****************** 2-level 3 real routes ******************/
//optional routes
    var TodoRouter = new (Backbone.Router.extend({
        routes: {
            "search/:query(/p:page)(/)" : "search" //optional route part
        },
        search: function (query, page) {
            page = page || 0;
            console.log(query);
            console.log(page);
        }
    }));
    //call url
    TodoRouter.navigate("search/milk",{trigger:true}); //"milk", 0
    TodoRouter.navigate("search/milk/p2",{trigger:true}); //"milk", 2
    TodoRouter.navigate("search/milk/p2/",{trigger:true}); //"milk", 2

    //URI with space gotcha
    TodoRouter.navigate("search/hello%20World/p2",{trigger:true});
        search: function(query, page) {
            page = page || 0;
            query = decodeURIComponent(query);//decode
            console.log(query);
            console.log(page);
        }

//regex in routes
    var TodoRouter = new (Backbone.Router.extend({
        routes: {
            "todos/id" : "show" //restrict params to numeric input
        },
        show: function (id) {
            console.log("id=" + id);
        }
    }));

    //put regex in Router
    TodoRouter.route(/^todos\/(\d+)$/, "show"); //each regex capture group becomes a param
    var TodoRouter = new (Backbone.Router.extend({
        initialize:function() {
            this.route(/^todos\/(\d+)$/, "show"); //restrict params to numeric input
        },
        show: function (id) {
            console.log("id=" + id);
        }
    }));

//catch-all routes
    var TodoRouter = new (Backbone.Router.extend({
        routes: {
            "*path" : "notFound" //restrict params to numeric input
        },
        notFound: function () {
            alert("sorry, there is nothing here.");
        }
    }));
    TodoRouter.navigate("nothinghere",{trigger:true});

//file path route
    var TodoRouter = new (Backbone.Router.extend({
        routes: {
            "file/*path" : "file" //restrict params to numeric input
        },
        file: function (path) {
            var parts = path.split("/");
            console.log(parts);
        }
    }));
    TodoRouter.navigate("file/this/is/a/file.txt",{trigger:true});
                        //["this","is","a","file.txt"]
