//http://ivaynberg.github.io/select2/
//jquery select 2 plugin
//jQuery based replacement for select boxes. It supports searching, remote data sets, and infinite scrolling of results.

//html
<input id="e10" type="hidden" name="merchant_choose" class="form-control">


//in js

  var selectMerchantArray = new Array();//array to store the get merchant name list, used in select2
  
  //get merchant list from api
  function GetMerchantList() {
    $.ajax({
        type: 'GET',
        url: all_merchant_url,
        dataType: 'json',
        contentType:"application/json;charset=UTF-8",
        error: function(request, errorType, errorMessage) {
            console.log("Error:" + errorType + " , with message: " + errorMessage);
        },
        success:selectMerchantList //pass get data to onLoadMerchantList function
    });
  }

  function selectMerchantList(data) {
    if (data != null) {
        $.each(data.merchants, function (i, item) {
            //add merchant name in the select array
            selectMerchantArray.push({id:i, name: item.name});
        });
    }
  }

//use the data
$(document).ready(function(){

  GetMerchantList();//get merchent list, store the names in array, apply to select2 dropdown plugin

  function format(item) { return item.name; }

  $("#e10").select2({
      data:{ results: selectMerchantArray, text: 'name' },
      formatSelection: format,
      formatResult: format
  });
  
});


