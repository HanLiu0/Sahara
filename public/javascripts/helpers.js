var register = function(Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        stars: function(n) {
            var accum = '';
            var i = 1;
            for(; i <= n; ++i)
                accum += '<span class="checked"><i class="fas fa-star"></i></span>';
            if(n % 1 != 0) {
                accum += '<span class="checked"><i class="fas fa-star-half-alt"></i></span>';
                i++;
            }
            while(i <= 5) {
                accum += '<span class="unchecked"><i class="fas fa-star"></i></span>';
                i++;
            }
            return accum;
        },
        ifeq: function(v1, v2, options){
            if(v1 === v2) {
                return options.fn(this);
            }
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