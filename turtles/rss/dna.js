(function($) {
	
	var collection = Backbone.Collection.extend({
		initialize : function(models, options) {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "refresh");
			
			// fetch data when born
			this.bind("born", this.fetch);
			this.bind("refresh", this.refresh);
			
			// default error value
			options.error = false;
			
			// default limit
			if (!options.limit)
				options.limit = 5;
			
			// automatic collection refresh each minute, this will 
			// trigger the reset event
			refreshInterval = window.setInterval(this.refresh, 60000);
		},
		refresh : function() {
			var self = this;
			self.fetch({
				error : function(jqXHR, textStatus, errorThrown) {
					// will allow the view to detect errors
					self.options.error = true;
					
					// if there are no previous items to show, display error message
					if (self.length == 0)
						self.trigger("reset");
				}
			});
		},
		url : function() {
			// remote source url
			return "http://www.google.com/reader/public/javascript/feed/" + this.options.feed + "?callback=?";
		},
		parse : function(json) {
			this.options.source = json.title;
			var items = json.items.slice(0, this.options.limit - 1);
			
			for (var i in items) {
				var time = new Date(items[i].published * 1000);
				items[i].time = this.formatTime(time);
			}
			
			// return only limited number if items
			return items;
		},
		formatTime : function(time) {
			var hours = time.getHours();
			var minutes = time.getMinutes();
			return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
		}
	});

	var view = Backbone.View.extend({
		initialize : function() {
			// prevents loss of 'this' inside methods
			_.bindAll(this, "render");

			// bind render to collection reset
			this.collection.bind("reset", this.render);
			
			// pre-fetch template file and render when ready
			var self = this;
			if(this.template == null) {
				$.get("turtles/rss/views/widget.html", function(template) {
					self.template = template;
					self.render();
				});
			}
		},
		render : function() {
			// only render when template file is loaded
			if (this.template) {
				var data = {
					error : this.options.error,
					source : this.options.source,
					entries : this.collection.toJSON()
				};
				
				// add html to container
				this.$el.html(Mustache.render(this.template, data));
			}
		}
	});

	// register turtle
	Turtles.register("rss", {
		collection : collection,
		view : view
	});

})(jQuery);