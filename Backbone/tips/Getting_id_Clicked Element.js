//http://lostechies.com/derickbailey/2011/10/11/backbone-js-getting-the-model-for-a-clicked-element/
//I have an HTML element rendered for each model in my collection. How do I get the model for the item that I clicked?

//in html
<script id="item-template" type="text/x-jquery-tmpl">
    <li><a href="#" data-id="${id}">${name}</a></li>
</script>


//in js
events: {
    "click a": "clicked"
},

clicked: function(e){
    e.preventDefault();
    
    var id = $(e.currentTarget).data("id"); //pass the id to model
    
    var item = this.collection.get(id);
    var name = item.get("name");
    alert(name);
},
