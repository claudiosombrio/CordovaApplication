function onLoad() {
    $(document).ready(onDeviceReady);
    
//    document.addEventListener("ready", onDeviceReady, false);
}

function onDeviceReady() {
    /* ---------------------------------- Local Variables ---------------------------------- */
    alert("Application ready");

    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });
    
    var service = new EmployeeService();
    service.initialize().done(function() {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    $('.search-key').on('keyup', findByName);
}

/* ---------------------------------- Local Functions ---------------------------------- */
function findByName() {
    service.findByName($('.search-key').val()).done(function(employees) {
        var l = employees.length;
        var e;
        $('.employee-list').empty();
        for (var i = 0; i < l; i++) {
            e = employees[i];
            $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
        }
    });
}
