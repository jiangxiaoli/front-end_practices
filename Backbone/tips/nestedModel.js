/*
COLLECTIONS OF MODELS WITHIN MODELS
http://deploymentzone.com/2011/08/10/backbone-js-collections-of-models-within-models/
*/

/*
package
|- nodes [0..n]
    |- node
        |- assets [0-n]
        |   |- asset
        |- actions [0-n]
            |- action
*/


window.Action = Backbone.Model.extend({  
  initialize : function() {
    this.fromNodeId = this.get('FromNodeId');
    this.toNodeId = this.get('ToNodeId');
    this.name = this.get('Name');
  },
  nextNode : function(nodes) {
    return nodes.detect(function(node) { return node.id == this.toNodeId}, this);
  },
  previousNode : function(nodes) {
    return nodes.detect(function(node) { return node.id == this.fromNodeId}, this);
  }
});

window.Actions = Backbone.Collection.extend({ model: Action });  

window.Asset = Backbone.Model.extend({  
  initialize : function() {
    this.assetBinaryId = this.get('AssetBinaryId');
    this.data = this.get('Data');
    this.id = this.get('Id');
    this.name = this.get('Name');
  }
});

window.Assets = Backbone.Collection.extend({ model: Asset });  

window.Node = Backbone.Model.extend({  
  initialize: function() {
    this.assets = new Assets(this.get('Assets')); //for nested models
    this.actions = new Actions(this.get('Actions'));
  },
});


window.Nodes = Backbone.Collection.extend({ model: Node });  

window.Package = Backbone.Model.extend({  
  initialize : function() {
    // the following line forces 'this' to refer to the Package instance in the 
    // function `fetch_success`
    _.bindAll(this, 'fetch_success');
    this.bind('change', this.fetch_success);
  },
  // specifying the URL as a function gives us a bit more flexibility
  url : function() {
    return "data/package/" + this.id + ".json"
  },
  // invoked automatically when the change event is invoked which happens when fetch is successful
  fetch_success : function() {
     this.nodes = new Nodes(this.get('Nodes'));
     this.createTime = this.get('CreateTime');
     this.modifyTime = this.get('ModifyTime');
     this.name = this.get('Name');
  }
});

<!-- and... -->
$(document).ready(function() {
  pkg = new Package({id:"10000"});
  
  pkg.fetch({ failure: function(model, response) {
    console.error("ERROR");
    console.log(response);
  }});
  
    window.pkg = pkg;
    console.log(pkg);
};
