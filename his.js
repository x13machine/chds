
global.fs = require('fs');
global.jsdom = require("jsdom");
global.jquery = fs.readFileSync("/jquery.js", "utf-8");

String.prototype.Replace = function(a,b){
	return this.split(a || ',').join(b || '');
}

var coin = process.argv[2] || 'bitcoin';

jsdom.env({
	url: 'https://coinmarketcap.com/currencies/' + coin + '/historical-data/?start=20000101&end=30000101',
	src: [jquery],
	headers: {
		'User-Agent' : 'test'
	},
	done: function (err, window) {
		var $ = window.$;
		//console.log($('body').text())
		var result = [];
		var first = []
		$('table tr').each(function( index ) {
			var row = [];
			
			$(this).text().split('\n').forEach(function(col,i){
				var dat = col.trim();
				if(dat !== '' && index !== 0)row.push(row.length === 0 ? new Date(dat) : dat.Replace(',') * 1);
				if(dat !== '' && index === 0)row.push(row.length === 0 ? dat : dat.Replace(' '));
			});
			
			var obj = {};
			row.forEach(function(col,i){
				obj[first[i]] = col;
			});
			
			if(index === 0){
				first = row;
			}else{
				result.push(obj);
			}
		});
		fs.writeFile('json/' + coin + '.json', JSON.stringify(result),function(){});
	}
});

