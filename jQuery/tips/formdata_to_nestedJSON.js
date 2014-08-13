//to initialize the plugins (datetimepicker, etc) for added input group
function initializeThings(){
  $('.autosize').autosize();      
      $('input, textarea').placeholder();
      $('.datetimepickaa').datetimepicker({
          pickTime: false
      });
      $('.selectpicker').selectpicker();
   // Remove the specific row
      $("button.removee").click(function(){
          $(this).closest(".conteiner").remove();
      });
}

$(document).ready(function() {

  initializeThings();

  // ADD FUNCTIONALITY
  $("#add").click(function() {
  
      var row = '\
             <div class="form-group conteiner">\
                 <div class="row">\
                     <div class="col-md-2">\
                         <label for="date">Date:</label>\
                         <div class="input-group date datetimepickaa"  id="datetimepickerloop" data-date-format="YYYY/MM/DD">\
                             <input type="text" class="form-control datetimepickaa" placeholder="Enter the date..." data-date-format="YYYY/MM/DD" />\
                             <span class="input-group-addon">\
                                 <span class="glyphicon glyphicon-calendar"></span>\
                             </span>\
                         </div>\
                     </div>\
                     <div class="col-md-9">\
                         <label for="notes">Notes:</label>\
                         <textarea class="form-control autosize" id="" name=""></textarea>\
                     </div>\
                     <div style="" class="col-md-1">\
                         <button type="button" class="removee btn btn-primary btn-md pull-right" style="margin-top:25px">\
                             <span class="glyphicon glyphicon-remove"></span> Delete\
                         </button>\
                     </div>\
                 </div>\
             </div>';
  
      $("#wrapper").append(row);
  
      initializeThings();
  
  });
}
