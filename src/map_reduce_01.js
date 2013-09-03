// First, we define the map function, registering the full date,
//  the server name and number of times the user logged into the system (more
//   than 100, more than 1000 times

map = function Map() {
	var day = new Date(this.datetime.getYear(),
					   this.datetime.getMonth(),
					   this.datetime.getDate(),
					   this.datetime.getHours());
	
	emit({day: day, server: this.server}, 
		 {count:1, time: this.time});
}

// Second, we define the reduce function

reduce = function Reduce(key, arr_values) {
	var result = {count: 0, countmore100: 0, countmore1000: 0};
	
	for(var i in values) {
		if(values[i].timetaken > 10000) {
			result.countmore100 += values[i].count;
		} else if(values[i].timetaken > 100000) {
			result.countmore1000 += values[i].count;
		}
	}
	return result;
}

// Finally, we send these two functions to the server with the desired
//  filter, specifying where the data must be sent

Loggin.collection.map_reduce(map, reduce, 
	{
		:query => { 
			:datetime => {'$gte' => datefilterfrom}, 
			:datetime => {'$lte' => datefilterto}
		},
		
		:out => { reduce: "queriesbyday"}
	}
)
