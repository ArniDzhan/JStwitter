(function($,S)
{
    S.Tweets = {

        init: function(sTerms)
        {
            String.prototype.toLink=function(){
                return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&;\?\/.=]+/g,function(m){
                    return m.link(m);
                });
            };
            String.prototype.toUser=function(){
                return this.replace(/[@]+[A-Za-z0-9-_]+/g,function(u){
                    return u.link("http://twitter.com/"+u.replace("@",""));
                });
            };
            String.prototype.toTag=function(){
                return this.replace(/[]+[A-Za-z0-9-_]+/,function(t){
                    return t;
                });
            };

            $("#twits").empty();

            //get 50 tweets from Twitter API using user search terms
            $.getJSON("http://search.twitter.com/search.json?q="+encodeURI(sTerms)+"&rpp=50&callback=?", function(data)
            {
                $(data.results).each(function(i,v)
                {

                    var tweetTime=new Date(Date.parse(this.created_at));
                    var currentTime=new Date();
                    var tweetTime=Math.round((currentTime-tweetTime)/360000)+' seconds ago';
                    
                    var details='<a target="_blank" href="http://twitter.com/'+this.from_user+'">@'+this.from_user+'</a> <span>'+tweetTime+'</span>';
                    details=details+' &middot; <a target="_blank" href="http://twitter.com/?status=@'+this.from_user+' &in_reply_to_status_id='+this.id+'&in_reply_to='+this.from_user+'">Reply</a>';
                    details=details+' &middot; <a target="_blank" href="http://twitter.com/'+this.from_user+'/statuses/'+this.id+'">View Tweet</a>';
                    details=details+' &middot; <a target="_blank" href="http://twitter.com/?status=RT @'+this.from_user+' '+escape(this.text.replace(/&quot;/g,'"'))+'&in_reply_to_status_id='+this.id+'&in_reply_to='+this.from_user+'">RT</a>';
                    var tweet='<div><div><a target="_blank" href="http://twitter.com/'+this.from_user+'"><img width="48" height="48" alt="'+this.from_user+' on Twitter" src="'+this.profile_image_url+'" /></a></div><div><p>'+this.text.toLink().toUser().toTag().replace(/<a/g,'<a target="_blank"')+'<br />'+details+'</p></div><br style="clear: both;" /></div>';

                    $("#twits").append(tweet);

                });
            });
        }
    }

})(jQuery,window,document);