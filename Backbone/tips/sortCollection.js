/*
http://stackoverflow.com/questions/9865804/proper-way-to-sort-a-backbone-js-collection-on-the-fly

I would try a variant on the strategy pattern here. You could create a hash of sorting functions, 
then set comparator based on the selected member of the hash:
*/



var SomeCollection = Backbone.Collection.extend({
    comparator: function (property) {
        return selectedStrategy.apply(myModel.get(property));
    },
    strategies: {
        firstName: function (person) { return person.get("firstName"); }, 
        lastName: function (person) { return person.get("lastName"); },
    },
    changeSort: function (sortProperty) {
        this.comparator = this.strategies[sortProperty];
    },
    initialize: function () {
        this.changeSort("lastName");
        console.log(this.comparator);
        this.changeSort("firstName");
        console.log(this.comparator);        
    }                                                                                        
});

var myCollection = new SomeCollection;
