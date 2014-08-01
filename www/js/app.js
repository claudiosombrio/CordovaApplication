var service;

function initDb() {
    service = new EmployeeService();
    service.initialize().done(function() {
        console.log("Service initialized");
//        $('body').html(new HomeView(service).render().$el);
        router.addRoute('', function() {
            $('body').html(new HomeView(service).render().$el);
        });

        router.addRoute('employees/:id', function(id) {
            service.findById(parseInt(id)).done(function(employee) {
                $('body').html(new EmployeeView(employee).render().$el);
            });
        });

        router.start();
    });
}

document.addEventListener('deviceready', ready(), false);

function ready() {
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    dialogsModifier();
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

function getVersion() {
    service.getVersion().done(function(version) {
        $('.versao').append('<h3>Versão: ' + version + '</h3>');
    });
}

//(function() {
//}());