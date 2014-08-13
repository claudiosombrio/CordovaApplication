var service;

function initDb() {
    service = new EmployeeService();
    service.initialize().done(function() {
        console.log("Service initialized");
//        $('body').html(new HomeView(service).render().$el);
        var slider = new PageSlider($('body'));
        router.addRoute('', function() {
            slider.slidePage(new HomeView(service).render().$el);
        });

        router.addRoute('employees/:id', function(id) {
            service.findById(parseInt(id)).done(function(employee) {
                slider.slidePage(new EmployeeView(employee).render().$el);
            });
        });

        router.start();
    });
}

if (typeof CDV === 'undefined') {
    alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
}
if (typeof FB === 'undefined') {
    alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
}
document.addEventListener('deviceready', ready(), false);

function ready() {
//    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
//    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
//    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
//    dialogsModifier();
    alert('iniciando facebook');
    try {
        FB.init({
            appId: "204305149755784",
            nativeInterface: CDV.FB,
            useCachedDialogs: false
        });
    } catch (e) {
        alert(e);
    }    
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