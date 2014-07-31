//in fetch() callback from parent model
  //in parent Title model
  app.Title = Backbone.Model.extend({
    initialize:function () {
      this.videosList = new app.Videos(); //this: parent model, this.videoList: child model(collection)
      this.videosList.url = "/rstudio/api/titles/videos?titleId=" + this.id;
    }
 });


//in child models Videos
app.Videos = Backbone.Collection.extend({
    model: app.Video,
    parse: function (response) {
        return response.result;
    },
    initialize: function (response) {
    }
});

//in child model Video:
app.Video = Backbone.Model.extend({
    parse: function (response) {
        //use json for collection build
        this.sourcesList = new app.Sources(response.sources);

        return response;
    }
});

//response return jqXHR object, could be transfered to model
//get its attribute use response.result
