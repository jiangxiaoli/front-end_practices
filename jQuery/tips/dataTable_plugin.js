//dataTables plugin - https://datatables.net/

//in html
<!-- dataTable plugin -->
<table id="store_table" class="display" cellspacing="0" width="100%">
    <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>NameCn</th>
            <th>isOurClient</th>
        </tr>
    </thead>
</table>

//in js

//call get stores api with merchant_id
//get the table data from getJSON
$.getJSON(all_merchant_url, function (data) {

    var storeGetJSON = data.merchants;//test data with merchant list, should be json arrays

    var storeJSON = [];

    //add DT_RowId to each row - add id to each row
    $.each(storeGetJSON, function (i, item) {
        storeJSON.push({
            "DT_RowId": item.id,
            "name":item.name,
            "nameCn" : item.nameCn,
            "id": item.id,
            "isOurClient" : item.isOurClient
        });
    });

    //selected store id array
    var selected = [];

    $('#store_table').dataTable( {
        
        //select buttons - must include dataTables.tableTools.js
        dom: 'T<"clear ">lfrtip',
        tableTools: {
            "sRowSelect": "multi",
            "aButtons": [
                "select_all",
                "select_none",
                {
                    "sExtends":    "select",
                    "sButtonText": "Select Filtered",
                    "fnClick": function (nButton, oConfig, oFlash) {
                        var oTT = TableTools.fnGetInstance('store_table');
                        oTT.fnSelectAll(true); //True = Select only filtered rows (true). Optional - default false.
                    }
                }
            ]
        },
        
        //assign JSON data to table
        "aaData": storeJSON,
        "aoColumns": [
            { "mDataProp": "id" },
            { "mDataProp": "name" },
            { "mDataProp": "nameCn" },
            { "mDataProp": "isOurClient" }
        ]

    } );
    
    //row click event
    $('#store_table tbody').on('click', 'tr', function () {

        //get the row id
        var id = this.id;

        console.log("id: "+id);

        var index = $.inArray(id, selected);//search id in selected, if not found return -1

        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }

        $(this).toggleClass('selected');
        console.log("selected:"+ selected.toString());

    } );

    //press select button, save selected results to input
    $("#select_store_btn").click(function (e) {
        e.preventDefault();

        //put selected array to input
        $("#c_stores").attr("value", selected.toString());

        //close modal
        $('#addStoreModal').modal('toggle');

    });
});

//Warning: Cannot reinitialise Data issue
var table;
var loadTableOnce = false;

//click the button to send ajax call and load the form, could change and reload
$("#add_store_btn").click(function () {

    if(loadTableOnce){
        table.destroy();
    }
    
    loadTableOnce = true;
    
    table = $('#store_table').DataTable( {});
});

