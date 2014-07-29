function initDb() {
    var service = new EmployeeService();
    service.initialize().done(function() {
        console.log("Service initialized");
        renderHomeView();
    });
}

document.addEventListener('deviceready', ready(), false);

function ready() {
//    eventRegistration();
    dialogsModifier();
}

function eventRegistration() {
    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });
}

function dialogsModifier() {
    if (navigator.notification) { // Override default HTML alert with native dialog
        window.alert = function(message) {
            navigator.notification.alert(
                    message, // message
                    null, // callback
                    "Workshop", // title
                    'OK'        // buttonName
                    );
        };
    }
}

function renderHomeView() {
    var html = "<div class='header'><h1>Directory</h1></div>" +
            "<div class='search-view'>" +
            "<input class='search-key' type='search' placeholder='Enter name'/>" +
            "<ul class='list employee-list'></ul>" +
            "</div>";
    $('body').html(html);

    $('.search-key').on('keyup', findByName);
}

function findByName() {
    service.findByName($('.search-key').val()).done(function(employees) {
        var l = employees.length;
        var e;
        $('.employee-list').empty();
        for (var i = 0; i < l; i++) {
            e = employees[i];
//                    $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            $('.employee-list').append('<li><a href="#employees/' + e.sqlite_version + '">' + e.sqlite_version + '</a></li>');
        }
    });
}

//(function() {

//}());