var superagent = require('superagent')
var cheerio = require('cheerio')

var spideUrl = 'https://t10.nuomi.com/pc/t10/index'

superagent
	.get(spideUrl)
	.end(function(err, res){
		if(err){
			return console.error(err)
		}
		console.log(res)
		var foodUrls = []
		var $ = cheerio.load(res.text)
		$('.j-item a').each(function(idx, element){
			var $element = $(element)
			foodUrls.push($element.attr('href'))
		})
		console.log(foodUrls)
	})