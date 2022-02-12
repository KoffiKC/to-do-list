console.log('js');

$(readyNow)

function readyNow() {
    console.log('JQ');
    getTasks()
    $('#add-task').on('click', addTask)
    $('#note-pad').on('click', '.check-off', checkTask)
    $('#note-pad').on('click', '.remove-task', removeTask)
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo'
      }).then(function(response) {
        console.log(response);
        renderTasks(response);
      }).catch(function(error){
        console.log('error in GET', error);
      });
}

function renderTasks(taskArr) {
    console.log('so much to do');

    $('#note-pad').empty()

    for (let task of taskArr) {
        $('#note-pad').append(`
        <div class="note-pad-item" data-id=${task.id}>
            <button class="check-off">check off list</button>
            <p>${task.task}</p>
            <button class="remove-task">remove task</button>
        </div>
        `)
    }
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

function checkTask() {
    console.log('donzo!');
    
}

function removeTask() {
    console.log('gonzo!');
    
    let id = $(this).closest('div').data().id; // wrap table id from button clicked(this) inside of variable
    console.log(id); 
    
    $.ajax({ //send delete request
        method: 'DELETE',
        url: `/todo/${id}`
    }).then(response => {
        console.log('they gone!');
        getTasks() // call a GET request to refresh the DOM 
    }).catch(err => {
        console.log('worse than papercut', err);
    })
}  


