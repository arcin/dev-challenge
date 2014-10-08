// You can use CoffeScript in tasks.js.coffee if you'd rather.

//### Add complete support
$(document).ready(function(){
  TaskHelper.bindListeners();
});


// very easy to change selector names with dependency injection
var dependencies = {
  checkBox: '.complete-box'
};

// TaskHelper Module for code organization/encapsulation
var TaskHelper = (function(d){
  var _prepareTask = function(checkBox){
    var task = {}
    checkBox.checked ? task.complete = true : task.complete = false
    return task
  }

  var _submitAjax = function(){
      var taskId = $(this).val(),
          input = this;

      $.ajax({
        type: "PUT",
        url: '/tasks/'+taskId,
        data: { id: taskId, task: _prepareTask(input) },
        dataType: 'script'
      })
  }

  return {
    bindListeners: function(){
      $(d["checkBox"]).on('change', _submitAjax);
    }
  }
})(dependencies) // inject dependencies