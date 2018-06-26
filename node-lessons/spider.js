var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');

var cnodeUrl = 'https://www.famulei.com';

superagent.get(cnodeUrl).end(function(err, res){
    if(err){
        return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('.index_right_comment_main').each(function(index, element){
        var $element = $(element);
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        // href= $element.attr('href');
        topicUrls.push(href);
        console.log(href);
    });
    console.log(topicUrls);

    var ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, function(topics){
        topics = topics.map(function(topicPair){
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.tit_tz').text().trim(),
                href: topicUrl,
                comment1: $('.comment_p').eq(0).text().trim(),
            })
        })
        console.log('final:');
        console.log(topics);
    })

    topicUrls.forEach(function(topicUrl){
        superagent.get(topicUrl).end(function(err, res){
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
        })
    })
})

