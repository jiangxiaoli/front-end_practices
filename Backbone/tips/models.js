/**
 * Created by Corn on 7/28/14.
 */

//video subset sources
app.Source = Backbone.Model.extend({
    initialize: function () {
        console.log("in source init");

        this.url = this.get("url");

        console.log("title url: " + this.url);
    }
});
app.Sources = Backbone.Collection.extend({ model: app.Source });

//series subset videos
app.Video = Backbone.Model.extend({
    url:null,
    parse: function (response) {
        return response;
    },
    initialize: function () {
    }
});

app.Videos = Backbone.Collection.extend({
    videosRootUrl: null,
    model: app.Video,
    parse: function (response) {
        return response;
    },
    initialize: function (response) {
        $.each(response, function (i, item) {
            this.video = new app.Video();
            this.video.url = videosRootUrl + item;
            //this.video.fetch();
        })
        /*console.log("in Videos parse");
        console.log("serial type:" + response.type);
        if (response.type == "episode"){
            console.log("serial Videos:" + response.videos);
            this.models = response.videos;
        } else {
            console.log("serial Video:" + response.video);
            this.models = response.video;
        }
        console.log("in video collection init");
        console.log("in video collection, length: " + this.models.length);*/
    }
});

//title - contains subset videos
app.Title = Backbone.Model.extend({
    parse: function (response) {
        console.log("title response: " + response);
        return response;
    },
    initialize:function () {
        this.id = this.get("id");
        this.seriesType = this.get("seriesType");
        this.serial = this.get("series");
        
        if (this.serial.type == "episode"){
            //console.log("serial Videos:" + this.serial.videos);
            //this.models = this.serial.videos;
            videosRootUrl = "/rstudio/api/titles/" + this.id+ "/videos/";

            this.videos = new app.Videos(this.serial.videos);
            //this.videos.fetch();

        } else {
            this.videoId = this.serial.video;
            console.log("serial Video:" + this.videoId);
            //this.video = new app.Video({url: "/rstudio/api/titles/" + this.id + "/videos/" + this.videoId});
            videoUrl = "/rstudio/api/titles/" + this.id + "/videos/" + this.videoId;
            this.video = new app.Video();
            this.video.url = videoUrl;
            //this.video.fetch();
        }

        //this.fetch_success();
        //_.bindAll(this, "fetch_success");
        //this.bind("change", this.fetch_success);
    },
    url: function () {
        url = "/rstudio/api/titles/" + this.id;
        return url;
    },
    fetch_success: function () {
        //console.log("in title fetch_success");

    }
});


app.TitleCollection = Backbone.Collection.extend({
    model: app.Title,
    url:"/rstudio/api/titles/",
    parse: function (response) {
        console.log("in model-rest, collection parse");
        console.log(response.result);
        return response.result;
    },
    initialize:function () {
        console.log("in model-rest, collection init");
    },

    filterMoive: function () {
        console.log("in filter movie");

        var filtered = this.filter(function(data) {
            return data.get("category") === "MOVIE";
        });
        return new app.TitleCollection(filtered);
    },
    filterSerial: function () {
        console.log("in filter serial");

        var filtered =  this.filter(function(data) {
            return data.get("category") === "SERIAL";
        });
        return new app.TitleCollection(filtered);
    },
    filterShow: function () {
        console.log("in filter show");

        var filtered = this.filter(function(data) {
            return data.get("category") === "SHOW";
        });
        return new app.TitleCollection(filtered);
    },
    filterClip: function () {
        console.log("in filter clip");

        var filtered = this.filter(function(data) {
            return data.get("category") === "CLIP";
        });
        return new app.TitleCollection(filtered);
    }
});

