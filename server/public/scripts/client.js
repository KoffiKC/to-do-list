console.log('js');

$(readyNow)

function readyNow() {
    console.log('JQ');
    getTasks()
    $('#add-task').on('click', addTask)
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo'
      }).then(function(response) {
        console.log(response);
        // renderKoalas(response);
      }).catch(function(error){
        console.log('error in GET', error);
      });
}

function addTask() {

    let task = $('#task-in').val();

    $.ajax({
        method: 'POST',
        url: '/todo',
        data: {
          task: task
        }
       }).then(function(response){
         console.log(response);
         getTasks();
       }).catch(function(error) {
         console.log('error in todo POST', error );
        alert("error adding task")
       })
}