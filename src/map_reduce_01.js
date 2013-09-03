// First, we define the map function

map = function Map() {
	var day = new Date(this.datetime.getFullYear(),
					   this.datetime.getMonth(),
					   this.datetime.getDate(),
					   this.datetime.getHours());
	
	emit({day: day, servername: this.servername}, 
		 {count:1, timetaken: this.timetaken});
}

// Second, we define the reduce function

reduce = function Reduce(key, arr_values) {
	var result = {count: 0, countmore5: 0, countmore10: 0};
	
	for(var i in arr_values) {
		if(arr_values[i].timetaken > 5000) {
			result.countmore5 += arr_values[i].count;
		} else if(arr_values[i].timetaken > 10000) {
			result.countmore10 += arr_values[i].count;
		}
	}
	return result;
}

// Finally, we send these two functions to the server with the desided
//  filter, specifying where do we want the data to be sent

WebLog.collection.map_reduce(map, reduce, 
	{
		:query => { 
			:datetime => {'$gte' => datefilterfrom}, 
			:datetime => {'$lte' => datefilterto}
		},
		
		:out => { reduce: "requestbyday"}
	}
)
