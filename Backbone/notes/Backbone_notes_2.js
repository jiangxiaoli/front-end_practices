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