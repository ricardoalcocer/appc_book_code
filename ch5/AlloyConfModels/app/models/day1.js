exports.definition = {
	config: {
		columns: {
		    "time"	 	 	: "TEXT",
		    "room"			: "TEXT",
		    "title"			: "TEXT",
		    "speaker"		: "TEXT",
		    "description"	: "TEXT",
		    "speakerbio"	: "TEXT",
        "myindex"       : "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "day1"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};