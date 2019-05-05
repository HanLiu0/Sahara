var register = function(Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        stars: function(n) {
            var accum = '';
            var i = 0;
            for(; i < n; ++i)
                accum += '<span class="fa fa-star checked"></span>';
            return accum;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);