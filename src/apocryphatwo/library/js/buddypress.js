var siteurl=(window.location.host=="localhost")?"http://localhost/tamrielfoundry/":"http://tamrielfoundry.com/";var ajaxurl=siteurl+"wp-admin/admin-ajax.php";var jq=jQuery;var bp_ajax_request=null;jq(document).ready(function(){bp_init_activity();var a=["members","groups","blogs","forums"];bp_init_objects(a);if(jq.query.get("r")&&jq("body.activity textarea#whats-new").length){jq("#whats-new-options").animate({height:"40px"});jq("form#whats-new-form textarea").animate({height:"50px"});jq.scrollTo(jq("textarea#whats-new"),500,{offset:-125,easing:"easeOutQuad"});jq("textarea#whats-new").focus()}else{if(jq.query.get("r")&&jq("form#send_message_form").length){jq.scrollTo(jq("form#send_message_form"),500)}}jq("form#whats-new-form").hide();jq("a.update-status-button").click(function(){jq("form#whats-new-form").slideToggle("fast",function(){jq("textarea#whats-new").focus().animate({height:"50px"})})});jq("#whats-new").focus(function(){jq("#whats-new-options").animate({height:"40px"});jq("form#whats-new-form textarea").animate({height:"50px"});jq("#aw-whats-new-submit").prop("disabled",false);var b=jq("form#whats-new-form");if(b.hasClass("submitted")){b.removeClass("submitted")}});jq("#whats-new").blur(function(){if(!this.value.match(/\S+/)){this.value="";jq("#whats-new-options").animate({height:"40px"});jq("form#whats-new-form textarea").animate({height:"20px"});jq("#aw-whats-new-submit").prop("disabled",true)}});jq("button#aw-whats-new-submit").click(function(){var d=jq(this);var f=d.closest("form#whats-new-form");f.children().each(function(){if(jq.nodeName(this,"textarea")||jq.nodeName(this,"input")){jq(this).prop("disabled",true)}});jq("div.error").remove();d.html('<i class="icon-spinner icon-spin"></i>Submitting');d.prop("disabled",true);f.addClass("submitted");var c="";var b=jq("#whats-new-post-in").val();var e=jq("textarea#whats-new").val();if(b>0){c=jq("#whats-new-post-object").val()}jq.post(ajaxurl,{action:"post_update",cookie:bp_get_cookies(),_wpnonce_post_update:jq("input#_wpnonce_post_update").val(),content:e,object:c,item_id:b,_bp_as_nonce:jq("#_bp_as_nonce").val()||""},function(i){f.children().each(function(){if(jq.nodeName(this,"textarea")||jq.nodeName(this,"input")){jq(this).prop("disabled",false)}});if(i[0]+i[1]=="-1"){f.prepend(i.substr(2,i.length));jq("form#"+f.attr("id")+" div.error").hide().fadeIn(200)}else{if(0==jq("ul#activity-stream").length){jq("div.error").slideUp(100).remove();jq("div#message").slideUp(100).remove();jq("div#activity-directory").append('<ul id="activity-stream" class="activity-list item-list">')}jq("ul#activity-stream").prepend(i);jq("ul#activity-stream li:first").addClass("new-update just-posted");if(0!=jq("ul#activity-stream").length){var g=jq("ul#activity-stream li.new-update .activity-content .activity-inner p").html();var h=jq("ul#activity-stream li.new-update .activity-content .activity-header p a.view").attr("href");var k=jq("ul#activity-stream li.new-update .activity-content .activity-inner p").text();var j="";if(k!=""){j=g+" "}jq("#latest-update").slideUp(300,function(){jq("#latest-update").html(j);jq("#latest-update").slideDown(300)})}if(0!=jq("#profile-status").length){jq("#profile-status").slideUp(300,function(){jq("#profile-status span#latest-status").html(e);jq("#profile-status").slideDown(300)})}jq("li.new-update").hide().slideDown(300);jq("li.new-update").removeClass("new-update");jq("textarea#whats-new").val("")}jq("#whats-new-options").animate({height:"0px"});jq("form#whats-new-form textarea").animate({height:"20px"});jq("#aw-whats-new-submit").prop("disabled",true).html('<i class="icon-pencil"></i>Post Update')});return false});jq("nav.activity-type-tabs").click(function(d){var e=jq(d.target).parent();if(d.target.nodeName=="STRONG"||d.target.nodeName=="SPAN"){e=e.parent()}else{if(d.target.nodeName!="A"){return false}}jq.cookie("bp-activity-oldestpage",1,{path:"/"});var c=e.attr("id").substr(9,e.attr("id").length);var b=jq("#activity-filter-select select").val();if(c=="mentions"){jq("li#"+e.attr("id")+" a strong").remove()}jq("ul#directory-actions li").removeClass("selected");e.addClass("selected");jq("li.selected a").prepend('<i class="icon-spinner icon-spin"></i>');bp_activity_request(c,b);jq("li.selected a i").delay(1000).fadeOut(400,function(){jq("li.selected a i").remove()});return false});jq("#activity-filter-select select").change(function(){var d=jq("nav.activity-type-tabs li.selected");if(!d.length){var c=null}else{var c=d.attr("id").substr(9,d.attr("id").length)}var b=jq(this).val();bp_activity_request(c,b);jq("li.selected a i").delay(1000).fadeOut(400,function(){jq("li.selected a i").remove()});return false});jq("div.activity").click(function(b){var i=jq(b.target);if(i.hasClass("acomment-reply")){var c=i.attr("id");ids=c.split("-");var g=ids[2];var l=i.attr("href").substr(10,i.attr("href").length);var d=jq("#ac-form-"+g);d.css("display","none");d.removeClass("root");jq("form.ac-form").hide();d.children("div").each(function(){if(jq(this).hasClass("error")){jq(this).hide()}});if(ids[1]!="comment"){jq(".activity-comments li#acomment-"+l).append(d)}else{jq("li#activity-"+g+" .activity-comments").append(d)}if(d.parent().hasClass("activity-comments")){d.addClass("root")}d.slideDown(200);jq.scrollTo(d,500,{offset:-100,easing:"easeOutQuad"});jq("#ac-form-"+ids[2]+" textarea").focus();return false}if(i.hasClass("delete-activity")){var j=i.parents("div.activity ul li");var c=j.attr("id").substr(9,j.attr("id").length);var f=i.attr("href");var h=f.split("_wpnonce=");h=h[1];i.html('<i class="icon-spinner icon-spin"></i>Deleting');jq.post(ajaxurl,{action:"delete_activity",cookie:bp_get_cookies(),id:c,_wpnonce:h},function(m){if(m[0]+m[1]=="-1"){j.prepend(m.substr(2,m.length));j.children("div#message").hide().fadeIn(300)}else{j.slideUp(300)}});return false}if(i.parent().hasClass("load-more")){jq("#activity-stream li.load-more a").html('<i class="icon-spinner icon-spin"></i>Loading');if(null==jq.cookie("bp-activity-oldestpage")){jq.cookie("bp-activity-oldestpage",1,{path:"/"})}var k=(jq.cookie("bp-activity-oldestpage")*1)+1;var e=[];jq(".activity-list li.just-posted").each(function(){e.push(jq(this).attr("id").replace("activity-",""))});jq.post(ajaxurl,{action:"activity_get_older_updates",cookie:bp_get_cookies(),page:k,exclude_just_posted:e.join(",")},function(m){jq("#activity-stream li.load-more a").html('<i class="icon-expand-alt"></i>Load More');jq.cookie("bp-activity-oldestpage",k,{path:"/"});jq("#content ul.activity-list").append(m.contents);i.parent().hide()},"json");return false}});jq(".activity-read-more a").on("click",function(d){var g=jq(d.target);var f=g.parent().attr("id").split("-");var h=f[3];var c=f[0];var b=c=="acomment"?"acomment-content":"activity-content";var e=jq("li#"+c+"-"+h+" ."+b+":first");jq(g).text("[Loading...]");jq.post(ajaxurl,{action:"get_single_activity_content",activity_id:h},function(i){jq(e).slideUp(300).html(i).slideDown(300)});return false});jq("form.ac-form").hide();if(jq(".activity-comments").length){bp_dtheme_hide_comments()}jq("div.activity-comments").click(function(b){var h=jq(b.target);if(h.attr("name")=="ac_form_submit"){var c=h.parents("form");var m=c.parent();var k=c.attr("id").split("-");if(!m.hasClass("activity-comments")){var i=m.attr("id").split("-");var d=i[1]}else{var d=k[2]}jq("form#"+c.attr("id")+" div.error").hide();h.prop("disabled",true).html('<i class="icon-spinner icon-spin"></i>Submitting');var j={action:"new_activity_comment",cookie:bp_get_cookies(),_wpnonce_new_activity_comment:jq("input#_wpnonce_new_activity_comment").val(),comment_id:d,form_id:k[2],content:jq("form#"+c.attr("id")+" textarea").val()};var f=jq("#_bp_as_nonce_"+d).val();if(f){j["_bp_as_nonce_"+d]=f}jq.post(ajaxurl,j,function(n){h.removeClass("loading");if(n[0]+n[1]=="-1"){c.append(jq(n.substr(2,n.length)).hide().fadeIn(200))}else{var p=c.parent();c.fadeOut(200,function(){if(0==p.children("ul").length){if(p.hasClass("activity-comments")){p.prepend("<ul></ul>")}else{p.append("<ul></ul>")}}var r=jq.trim(n);p.children("ul").append(jq(r).hide().fadeIn(200));c.children("textarea").val("");p.parent().addClass("has-comments");jq("form.ac-form").hide()});jq("form#"+c.attr("id")+" textarea").val("");jq("li#activity-"+k[2]+" a.acomment-reply span").html(Number(jq("li#activity-"+k[2]+" a.acomment-reply span").html())+1);var q=p.find(".show-all").find("a");if(q){var o=jq("li#activity-"+k[2]+" a.acomment-reply span").html(o)}}jq(h).prop("disabled",false).html('<i class="icon-pencil"></i>Post Comment')});return false}if(h.hasClass("acomment-delete")){var e=h.attr("href");var l=h.parent().parent().parent();var c=l.parents("div.activity-comments").children("form");var g=e.split("_wpnonce=");g=g[1];var d=e.split("cid=");d=d[1].split("&");d=d[0];h.html('<i class="icon-spinner icon-spin"></i>Deleting');jq(".activity-comments ul .error").remove();l.parents(".activity-comments").append(c);jq.post(ajaxurl,{action:"delete_activity_comment",cookie:bp_get_cookies(),_wpnonce:g,id:d},function(o){if(o[0]+o[1]=="-1"){l.prepend(jq(o.substr(2,o.length)).hide().fadeIn(200))}else{var q=jq("li#"+l.attr("id")+" ul").children("li");var n=0;jq(q).each(function(){if(!jq(this).is(":hidden")){n++}});l.fadeOut(200,function(){l.remove()});var r=jq("li#"+l.parents("ul#activity-stream > li").attr("id")+" a.acomment-reply span");var p=r.html()-(1+n);r.html(p);var s=l.siblings(".show-all").find("a");if(s){}if(0==p){jq(l.parents("ul#activity-stream > li")).removeClass("has-comments")}}});return false}if(h.parent().hasClass("show-all")){h.parent().addClass("loading");setTimeout(function(){h.parent().parent().children("li").fadeIn(200,function(){h.parent().remove()})},600);return false}});jq(document).keydown(function(c){c=c||window.event;if(c.target){element=c.target}else{if(c.srcElement){element=c.srcElement}}if(element.nodeType==3){element=element.parentNode}if(c.ctrlKey==true||c.altKey==true||c.metaKey==true){return}var b=(c.keyCode)?c.keyCode:c.which;if(b==27){if(element.tagName=="TEXTAREA"){if(jq(element).hasClass("ac-input")){jq(element).parent().parent().parent().slideUp(200)}}}});jq("nav.dir-list-tabs").click(function(f){if(jq(this).hasClass("no-ajax")){return}var h=(f.target.nodeName=="SPAN")?f.target.parentNode:f.target;var g=jq(h).parent();if("LI"==g[0].nodeName&&!g.hasClass("last")){var i=g.attr("id").split("-");var c=i[0];if("activity"==c){return false}jq("nav.dir-list-tabs li").removeClass("selected");g.addClass("selected");jq("li.selected a").prepend('<i class="icon-spinner icon-spin"></i>');var e=i[1];var d=jq("#"+c+"-order-select select").val();var b=jq("#"+c+"_search").val();bp_filter_request(c,d,e,"div."+c,b,1,jq.cookie("bp-"+c+"-extras"));jq("li.selected a i").delay(1000).fadeOut(400,function(){jq("li.selected a i").remove()});return false}});jq("div.filter select").change(function(){if(jq(".dir-list-tabs li.selected").length){var f=jq(".dir-list-tabs li.selected")}else{var f=jq(this)}var g=f.attr("id").split("-");var c=g[0];var e=g[1];var d=jq(this).val();var b=false;if(jq(".dir-search input").length){b=jq(".directory-search input").val()}if("friends"==c){c="members"}jq("li.selected a").prepend('<i class="icon-spinner icon-spin"></i>');bp_filter_request(c,d,e,"div."+c,b,1,jq.cookie("bp-"+c+"-extras"));jq("li.selected a i").delay(1000).fadeOut(400,function(){jq("li.selected a i").remove()});return false});jq("div#content").click(function(f){var g=jq(f.target);if(g.hasClass("button")){return true}if(g.parents("nav.pagination").length!=0&&!g.parents("nav.pagination").hasClass("no-ajax")){if(g.hasClass("dots")||g.hasClass("current")){return false}if(jq(".dir-list-tabs li.selected").length){var e=jq(".dir-list-tabs li.selected")}else{var e=jq("div.filter select")}var c=1;var h=e.attr("id").split("-");var d=h[0];var b=false;if(jq("div.directory-search input").length){b=jq(".directory-search input").val()}if(jq(g).hasClass("next")){var c=Number(jq(".pagination span.current").html())+1}else{if(jq(g).hasClass("prev")){var c=Number(jq(".pagination span.current").html())-1}else{var c=Number(jq(g).html())}}bp_filter_request(d,jq.cookie("bp-"+d+"-filter"),jq.cookie("bp-"+d+"-scope"),"div."+d,b,c,jq.cookie("bp-"+d+"-extras"));return false}});jq("div#invite-list input").click(function(){jq(".ajax-loader").toggle();var c=jq(this).val();if(jq(this).prop("checked")==true){var b="invite"}else{var b="uninvite"}jq("#invited-list h3").prepend('<i class="icon-spinner icon-spin"></i>');jq.post(ajaxurl,{action:"groups_invite_user",friend_action:b,cookie:bp_get_cookies(),_wpnonce:jq("input#_wpnonce_invite_uninvite_user").val(),friend_id:c,group_id:jq("input#group_id").val()},function(d){if(jq("#message")){jq("#message").hide()}jq(".ajax-loader").toggle();if(b=="invite"){jq("#friend-list").append(d)}else{if(b=="uninvite"){jq("#friend-list li#uid-"+c).remove()}}jq("#invited-list h3").text("Selected Friends")})});jq("#friend-list").on("click","li a.remove",function(){jq(".ajax-loader").toggle();var b=jq(this).attr("id");b=b.split("-");b=b[1];jq("#invited-list h3").prepend('<i class="icon-spinner icon-spin"></i>');jq.post(ajaxurl,{action:"groups_invite_user",friend_action:"uninvite",cookie:bp_get_cookies(),_wpnonce:jq("input#_wpnonce_invite_uninvite_user").val(),friend_id:b,group_id:jq("input#group_id").val()},function(c){jq(".ajax-loader").toggle();jq("#friend-list li#uid-"+b).remove();jq("#invite-list input#f-"+b).prop("checked",false)});jq("#invited-list h3").text("Selected Friends");return false});jq("ul#friend-request-list a.accept, ul#friend-request-list a.reject").click(function(){var d=jq(this);var b=jq(this).parents("ul#friend-request-list li");var c=jq(this).parents("li div.actions");var i=b.attr("id").substr(11,b.attr("id").length);var g=d.attr("href");var f=g.split("_wpnonce=");f=f[1];if(jq(this).hasClass("accepted")||jq(this).hasClass("rejected")){return false}if(jq(this).hasClass("accept")){var h="accept_friendship";c.children("a.reject").fadeOut()}else{var h="reject_friendship";c.children("a.accept").fadeOut()}var e=d.children("i").attr("class");d.children("i").attr("class","icon-spinner icon-spin");jq.post(ajaxurl,{action:h,cookie:bp_get_cookies(),id:i,_wpnonce:f},function(j){if(j[0]+j[1]=="-1"){b.prepend(j.substr(2,j.length));b.children("div#message").hide().fadeIn(200)}else{if(jq(this).hasClass("accept")){c.children("a.reject").hide();d.html('<i class="icon-ok"></i>Accepted')}else{c.children("a.accept").hide();d.html('<i class="icon-remove"></i>Rejected')}var k=jq("#requests-personal-li span.activity-count");var l=k.text().split("+");l=l[1]-1;if(l>0){k.text("+"+l)}else{k.fadeOut()}}});return false});jq("#members-dir-list").on("click","a.friendship-button",function(){var d=jq(this).attr("id");d=d.split("-");d=d[1];var c=jq(this).attr("href");c=c.split("?_wpnonce=");c=c[1].split("&");c=c[0];var b=jq(this);b.children("i").attr("class","icon-spinner icon-spin");jq.post(ajaxurl,{action:"addremove_friend",cookie:bp_get_cookies(),fid:d,_wpnonce:c},function(f){var g=b.attr("rel");var e=b.parent();if(g=="add"){jq(e).fadeOut(200,function(){b.removeClass("add_friend").addClass("pending_friend");e.fadeIn(200).html(f);e.children("a").addClass("friendship-button button").prepend('<i class="icon-remove"></i>')})}else{if(g=="remove"){jq(e).fadeOut(200,function(){b.removeClass("remove_friend").addClass("add");e.fadeIn(200).html(f);e.children("a").addClass("friendship-button button").prepend('<i class="icon-male"></i>')})}}});return false});jq("#groups-dir-list").on("click","a.group-button",function(){var e=jq(this).parents("li.group").attr("id");e=e.split("-");e=e[1];var d=jq(this).attr("href");d=d.split("?_wpnonce=");d=d[1].split("&");d=d[0];var c=jq(this);var b=c.parent();c.children("i").attr("class","icon-spinner icon-spin");jq.post(ajaxurl,{action:"joinleave_group",cookie:bp_get_cookies(),gid:e,_wpnonce:d},function(f){if(!jq("body.directory").length){location.href=location.href}else{var g=c.hasClass("join-group")?"join":"leave";jq(b).fadeOut(200,function(){b.fadeIn(200).html(f);if("join"==g){b.children("a").addClass("group-button button").prepend('<i class="icon-remove"></i>')}else{b.children("a").addClass("group-button button").prepend('<i class="icon-group"></i>')}})}});return false});jq("a.confirm").click(function(){if(confirm("Are you sure?")){return true}else{return false}});jq(".pending").click(function(){return false});jq("form#search-message-form").submit(function(){if(jq(this).hasClass("no-ajax")){return}var c=jq("input#messages_search");var b="messages";bp_filter_request(b,jq.cookie("bp-"+b+"-filter"),jq.cookie("bp-"+b+"-scope"),"div."+b,c.val(),1,jq.cookie("bp-"+b+"-extras"));return false});jq("button#send_reply_button").click(function(){var b=jq("#messages_order").val()||"ASC";var c=jq(this);c.attr("disabled","disabled").children("i").attr("class","icon-spinner icon-spin");tinyMCE.triggerSave();jq.post(ajaxurl,{action:"apoc_private_message_reply",cookie:bp_get_cookies(),_wpnonce:jq("input#send_message_nonce").val(),content:jq("#message_content").val(),send_to:jq("input#send_to").val(),subject:jq("input#subject").val(),thread_id:jq("input#thread_id").val()},function(d){if(d[0]+d[1]=="-1"){jq("form#send-reply").prepend(d.substr(2,d.length))}else{jq("form#send-reply div#message").remove();if("ASC"==b){jq("ol#message-thread").append(d)}else{jq("ol#message-thread").prepend(d);jq(window).scrollTop()}jq(".new-message").hide().slideDown(200,function(){jq(".new-message").removeClass("new-message")});tinyMCE.activeEditor.setContent("");tinyMCE.triggerSave()}c.removeAttr("disabled").children("i").attr("class","icon-envelope-alt")});return false});jq("a#mark_as_read, a#mark_as_unread").click(function(){var i="";var f=jq("#message-threads li input[type='checkbox']");if("mark_as_unread"==jq(this).attr("id")){var d="read";var h="unread";var b=1;var c=0;var g="inline";var e="messages_markunread"}else{var d="unread";var h="read";var b=0;var c=1;var g="none";var e="messages_markread"}f.each(function(j){if(jq(this).is(":checked")){if(jq("li#m-"+jq(this).attr("value")).hasClass(d)){i+=jq(this).attr("value");jq("li#m-"+jq(this).attr("value")).removeClass(d);jq("li#m-"+jq(this).attr("value")).addClass(h);if(b>0){jq("li#m-"+jq(this).attr("value")+" span.unread-count").hide().html("&rarr; "+b+" Unread Message").fadeIn()}else{jq("li#m-"+jq(this).attr("value")+" span.unread-count").fadeOut()}var k=jq("li.unread").length;jq("a#user-messages span").html(k);if(k>0){jq("li#inbox-personal-li span.activity-count").html("+"+k).fadeIn()}else{jq("li#inbox-personal-li span.activity-count").fadeOut()}if(j!=f.length-1){i+=","}}}});jq.post(ajaxurl,{action:e,thread_ids:i});return false});jq("select#message-type-select").change(function(){var b=jq("select#message-type-select").val();var c=jq("li.message input[type='checkbox']");c.each(function(d){c[d].checked=""});switch(b){case"unread":var c=jq("li.unread input[type='checkbox']");break;case"read":var c=jq("li.read input[type='checkbox']");break}if(b!=""){c.each(function(d){c[d].checked="checked"})}else{c.each(function(d){c[d].checked=""})}});jq("a#delete_inbox_messages, a#delete_sentbox_messages").click(function(){checkboxes_tosend="";checkboxes=jq("ol#message-threads li input[type='checkbox']");jq("div#message").remove();jq(this).children("i").attr("class","icon-spinner icon-spin");jq(checkboxes).each(function(b){if(jq(this).is(":checked")){checkboxes_tosend+=jq(this).attr("value")+","}});if(""==checkboxes_tosend){jq(this).children("i").attr("class","icon-trash");return false}jq.post(ajaxurl,{action:"messages_delete",thread_ids:checkboxes_tosend},function(b){if(b[0]+b[1]=="-1"){jq("#profile-body").prepend(b.substr(2,b.length))}else{jq("#profile-body").prepend('<div id="message" class="updated"><p>'+b+"</p></div>");jq(checkboxes).each(function(e){if(jq(this).is(":checked")){jq(this).parents("li.message").fadeOut(150).remove()}})}jq("div#message").hide().slideDown(150);var d=jq("li.unread").length;jq("a#user-messages span").html(d);if(d>0){jq("li#inbox-personal-li span.activity-count").html("+"+d).fadeIn()}else{jq("li#inbox-personal-li span.activity-count").fadeOut()}var c=jq("ol#message-threads");if(jq("ol#message-threads li").length==0){jq("div#private-messages").html('<p class="no-results"><i class="icon-inbox"></i>Your inbox is empty!</p>').hide().fadeIn()}jq("a#delete_inbox_messages, a#delete_sentbox_messages").children("i").attr("class","icon-trash")});return false});jq("a.delete-single-message").click(function(){var c=jq(this);var d=c.parents("li.message");var b=d.attr("id");b=b.split("-");b=b[1];c.children("i").attr("class","icon-spinner icon-spin");jq.post(ajaxurl,{action:"messages_delete",thread_ids:b},function(e){if(e[0]+e[1]=="-1"){jq("#profile-body").prepend(e.substr(2,e.length))}else{jq("#profile-body").prepend('<div id="message" class="updated"><p>'+e+"</p></div>");d.fadeOut(150).remove()}jq("div#message").hide().slideDown(150);var g=jq("li.unread").length;jq("a#user-messages span").html(g);if(g>0){jq("li#inbox-personal-li span.activity-count").html("+"+g).fadeIn()}else{jq("li#inbox-personal-li span.activity-count").fadeOut()}var f=jq("ol#message-threads");if(jq("ol#message-threads li").length==0){jq("div#private-messages").html('<p class="no-results"><i class="icon-inbox"></i>Your inbox is empty!</p>').hide().fadeIn()}});return false});jq("form#send_message_form").submit(function(){var b=jq("button#send");b.children("i").attr("class","icon-spinner icon-spin")});jq("a.logout").click(function(){jq.cookie("bp-activity-scope",null,{path:"/"});jq.cookie("bp-activity-filter",null,{path:"/"});jq.cookie("bp-activity-oldestpage",null,{path:"/"});var b=["members","groups","blogs","forums"];jq(b).each(function(c){jq.cookie("bp-"+b[c]+"-scope",null,{path:"/"});jq.cookie("bp-"+b[c]+"-filter",null,{path:"/"});jq.cookie("bp-"+b[c]+"-extras",null,{path:"/"})})})});function bp_init_activity(){jq.cookie("bp-activity-oldestpage",1,{path:"/"});if(null!=jq.cookie("bp-activity-filter")&&jq("#activity-filter-select").length){jq('#activity-filter-select select option[value="'+jq.cookie("bp-activity-filter")+'"]').prop("selected",true)}if(null!=jq.cookie("bp-activity-scope")&&jq(".activity-type-tabs").length){jq(".activity-type-tabs li").each(function(){jq(this).removeClass("selected")});jq("li#activity-"+jq.cookie("bp-activity-scope")+", .activity-type-tabs li.current").addClass("selected")}}function bp_init_objects(a){jq(a).each(function(b){if(null!=jq.cookie("bp-"+a[b]+"-filter")&&jq("div#"+a[b]+"-order-select select").length){jq("div#"+a[b]+'-order-select select option[value="'+jq.cookie("bp-"+a[b]+"-filter")+'"]').prop("selected",true)}if(null!=jq.cookie("bp-"+a[b]+"-scope")&&jq("div."+a[b]).length){jq(".dir-list-tabs li").each(function(){jq(this).removeClass("selected")});jq(".dir-list-tabs li#"+a[b]+"-"+jq.cookie("bp-"+a[b]+"-scope")+", div.dir-list-tabs#object-nav li.current").addClass("selected")}})}function bp_filter_request(b,e,d,g,a,f,c){if("activity"==b){return false}if(jq.query.get("s")&&!a){a=jq.query.get("s")}if(null==d){d="all"}jq.cookie("bp-"+b+"-scope",d,{path:"/"});jq.cookie("bp-"+b+"-filter",e,{path:"/"});jq.cookie("bp-"+b+"-extras",c,{path:"/"});jq(".dir-list-tabs li").each(function(){jq(this).removeClass("selected")});jq(".dir-list-tabs li#"+b+"-"+d+", .dir-list-tabs#object-nav li.current").addClass("selected");jq(".dir-list-tabs li.selected").addClass("loading");jq('.dir-list-tabs select option[value="'+e+'"]').prop("selected",true);if("friends"==b){b="members"}if(bp_ajax_request){bp_ajax_request.abort()}bp_ajax_request=jq.post(ajaxurl,{action:b+"_filter",cookie:bp_get_cookies(),object:b,filter:e,search_terms:a,scope:d,page:f,extras:c},function(h){jq(g).fadeOut(100,function(){jq(this).html(h);jq(this).fadeIn(100)});jq(".dir-list-tabs li.selected").removeClass("loading")})}function bp_activity_request(b,a){jq.cookie("bp-activity-scope",b,{path:"/"});jq.cookie("bp-activity-filter",a,{path:"/"});jq.cookie("bp-activity-oldestpage",1,{path:"/"});jq(".activity-type-tabs li").each(function(){jq(this).removeClass("selected loading")});jq("li#activity-"+b+", .activity-type-tabs li.current").addClass("selected");jq("#object-nav.activity-type-tabs li.selected, div.activity-type-tabs li.selected").addClass("loading");jq('#activity-filter-select select option[value="'+a+'"]').prop("selected",true);jq(".widget_bp_activity_widget h2 span.ajax-loader").show();if(bp_ajax_request){bp_ajax_request.abort()}bp_ajax_request=jq.post(ajaxurl,{action:"activity_widget_filter",cookie:bp_get_cookies(),_wpnonce_activity_filter:jq("input#_wpnonce_activity_filter").val(),scope:b,filter:a},function(c){jq(".widget_bp_activity_widget h2 span.ajax-loader").hide();jq("div.activity").fadeOut(100,function(){jq(this).html(c.contents);jq(this).fadeIn(100);bp_dtheme_hide_comments()});if(null!=c.feed_url){jq(".directory #subnav li.feed a, .home-page #subnav li.feed a").attr("href",c.feed_url)}jq(".activity-type-tabs li.selected").removeClass("loading")},"json")}function bp_dtheme_hide_comments(){var a=jq("div.activity-comments");if(!a.length){return false}a.each(function(){if(jq(this).children("ul").children("li").length<5){return}var c=jq(this);var e=c.parents("ul#activity-stream > li");var d=jq(this).children("ul").children("li");var b=" ";if(jq("li#"+e.attr("id")+" a.acomment-reply span").length){var b=jq("li#"+e.attr("id")+" a.acomment-reply span").html()}d.each(function(f){if(f<d.length-5){jq(this).addClass("hidden");jq(this).toggle();if(!f){console.log(jq(this));jq(this).before('<li class="show-all"><a class="button" href="#'+e.attr("id")+'/show-all/" title="Show Older Comments">Show Older Comments</a></li>')}}})})}function checkAll(){var b=document.getElementsByTagName("input");for(var a=0;a<b.length;a++){if(b[a].type=="checkbox"){if($("check_all").checked==""){b[a].checked=""}else{b[a].checked="checked"}}}}function clear(a){if(!document.getElementById(a)){return}var a=document.getElementById(a);if(radioButtons=a.getElementsByTagName("INPUT")){for(var b=0;b<radioButtons.length;b++){radioButtons[b].checked=""}}if(options=a.getElementsByTagName("OPTION")){for(var b=0;b<options.length;b++){options[b].selected=false}}return}function bp_get_cookies(){var c=document.cookie.split(";");var g={};var a="bp-";for(var f=0;f<c.length;f++){var e=c[f];var b=e.indexOf("=");var d=unescape(e.slice(0,b)).trim();var h=unescape(e.slice(b+1));if(d.indexOf(a)==0){g[d]=h}}return encodeURIComponent(jq.param(g))}(function(c){var b=c.scrollTo=function(e,d,f){c(window).scrollTo(e,d,f)};b.defaults={axis:"xy",duration:parseFloat(c.fn.jquery)>=1.3?0:1,limit:true};b.window=function(d){return c(window)._scrollable()};c.fn._scrollable=function(){return this.map(function(){var e=this,f=!e.nodeName||c.inArray(e.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!f){return e}var d=(e.contentWindow||e).document||e.ownerDocument||e;return/webkit/i.test(navigator.userAgent)||d.compatMode=="BackCompat"?d.body:d.documentElement})};c.fn.scrollTo=function(i,h,d){if(typeof h=="object"){d=h;h=0}if(typeof d=="function"){d={onAfter:d}}if(i=="max"){i=9000000000}d=c.extend({},b.defaults,d);h=h||d.duration;d.queue=d.queue&&d.axis.length>1;if(d.queue){h/=2}d.offset=a(d.offset);d.over=a(d.over);return this._scrollable().each(function(){if(i==null){return}var m=this,j=c(m),k=i,g,e={},l=j.is("html,body");switch(typeof k){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(k)){k=a(k);break}k=c(k,this);if(!k.length){return}case"object":if(k.is||k.style){g=(k=c(k)).offset()}}c.each(d.axis.split(""),function(s,q){var o=q=="x"?"Left":"Top",u=o.toLowerCase(),r="scroll"+o,p=m[r],n=b.max(m,q);if(g){e[r]=g[u]+(l?0:p-j.offset()[u]);if(d.margin){e[r]-=parseInt(k.css("margin"+o))||0;e[r]-=parseInt(k.css("border"+o+"Width"))||0}e[r]+=d.offset[u]||0;if(d.over[u]){e[r]+=k[q=="x"?"width":"height"]()*d.over[u]}}else{var t=k[u];e[r]=t.slice&&t.slice(-1)=="%"?parseFloat(t)/100*n:t}if(d.limit&&/^\d+$/.test(e[r])){e[r]=e[r]<=0?0:Math.min(e[r],n)}if(!s&&d.queue){if(p!=e[r]){f(d.onAfterFirst)}delete e[r]}});f(d.onAfter);function f(n){j.animate(e,h,d.easing,n&&function(){n.call(this,i,d)})}}).end()};b.max=function(h,g){var k=g=="x"?"Width":"Height",f="scroll"+k;if(!c(h).is("html,body")){return h[f]-c(h)[k.toLowerCase()]()}var j="client"+k,i=h.ownerDocument.documentElement,e=h.ownerDocument.body;return Math.max(i[f],e[f])-Math.min(i[j],e[j])};function a(d){return typeof d=="object"?d:{top:d,left:d}}})(jQuery);jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(j,i,b,c,d){return jQuery.easing[jQuery.easing.def](j,i,b,c,d)},easeInQuad:function(j,i,b,c,d){return c*(i/=d)*i+b},easeOutQuad:function(j,i,b,c,d){return -c*(i/=d)*(i-2)+b},easeInOutQuad:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i+b}return -c/2*((--i)*(i-2)-1)+b},easeInCubic:function(j,i,b,c,d){return c*(i/=d)*i*i+b},easeOutCubic:function(j,i,b,c,d){return c*((i=i/d-1)*i*i+1)+b},easeInOutCubic:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i*i+b}return c/2*((i-=2)*i*i+2)+b},easeInQuart:function(j,i,b,c,d){return c*(i/=d)*i*i*i+b},easeOutQuart:function(j,i,b,c,d){return -c*((i=i/d-1)*i*i*i-1)+b},easeInOutQuart:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i*i*i+b}return -c/2*((i-=2)*i*i*i-2)+b},easeInQuint:function(j,i,b,c,d){return c*(i/=d)*i*i*i*i+b},easeOutQuint:function(j,i,b,c,d){return c*((i=i/d-1)*i*i*i*i+1)+b},easeInOutQuint:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i*i*i*i+b}return c/2*((i-=2)*i*i*i*i+2)+b},easeInSine:function(j,i,b,c,d){return -c*Math.cos(i/d*(Math.PI/2))+c+b},easeOutSine:function(j,i,b,c,d){return c*Math.sin(i/d*(Math.PI/2))+b},easeInOutSine:function(j,i,b,c,d){return -c/2*(Math.cos(Math.PI*i/d)-1)+b},easeInExpo:function(j,i,b,c,d){return(i==0)?b:c*Math.pow(2,10*(i/d-1))+b},easeOutExpo:function(j,i,b,c,d){return(i==d)?b+c:c*(-Math.pow(2,-10*i/d)+1)+b},easeInOutExpo:function(j,i,b,c,d){if(i==0){return b}if(i==d){return b+c}if((i/=d/2)<1){return c/2*Math.pow(2,10*(i-1))+b}return c/2*(-Math.pow(2,-10*--i)+2)+b},easeInCirc:function(j,i,b,c,d){return -c*(Math.sqrt(1-(i/=d)*i)-1)+b},easeOutCirc:function(j,i,b,c,d){return c*Math.sqrt(1-(i=i/d-1)*i)+b},easeInOutCirc:function(j,i,b,c,d){if((i/=d/2)<1){return -c/2*(Math.sqrt(1-i*i)-1)+b}return c/2*(Math.sqrt(1-(i-=2)*i)+1)+b},easeInElastic:function(o,m,p,a,b){var d=1.70158;var c=0;var n=a;if(m==0){return p}if((m/=b)==1){return p+a}if(!c){c=b*0.3}if(n<Math.abs(a)){n=a;var d=c/4}else{var d=c/(2*Math.PI)*Math.asin(a/n)}return -(n*Math.pow(2,10*(m-=1))*Math.sin((m*b-d)*(2*Math.PI)/c))+p},easeOutElastic:function(o,m,p,a,b){var d=1.70158;var c=0;var n=a;if(m==0){return p}if((m/=b)==1){return p+a}if(!c){c=b*0.3}if(n<Math.abs(a)){n=a;var d=c/4}else{var d=c/(2*Math.PI)*Math.asin(a/n)}return n*Math.pow(2,-10*m)*Math.sin((m*b-d)*(2*Math.PI)/c)+a+p},easeInOutElastic:function(o,m,p,a,b){var d=1.70158;var c=0;var n=a;if(m==0){return p}if((m/=b/2)==2){return p+a}if(!c){c=b*(0.3*1.5)}if(n<Math.abs(a)){n=a;var d=c/4}else{var d=c/(2*Math.PI)*Math.asin(a/n)}if(m<1){return -0.5*(n*Math.pow(2,10*(m-=1))*Math.sin((m*b-d)*(2*Math.PI)/c))+p}return n*Math.pow(2,-10*(m-=1))*Math.sin((m*b-d)*(2*Math.PI)/c)*0.5+a+p},easeInBack:function(l,k,b,c,d,j){if(j==undefined){j=1.70158}return c*(k/=d)*k*((j+1)*k-j)+b},easeOutBack:function(l,k,b,c,d,j){if(j==undefined){j=1.70158}return c*((k=k/d-1)*k*((j+1)*k+j)+1)+b},easeInOutBack:function(l,k,b,c,d,j){if(j==undefined){j=1.70158}if((k/=d/2)<1){return c/2*(k*k*(((j*=(1.525))+1)*k-j))+b}return c/2*((k-=2)*k*(((j*=(1.525))+1)*k+j)+2)+b},easeInBounce:function(j,i,b,c,d){return c-jQuery.easing.easeOutBounce(j,d-i,0,c,d)+b},easeOutBounce:function(j,i,b,c,d){if((i/=d)<(1/2.75)){return c*(7.5625*i*i)+b}else{if(i<(2/2.75)){return c*(7.5625*(i-=(1.5/2.75))*i+0.75)+b}else{if(i<(2.5/2.75)){return c*(7.5625*(i-=(2.25/2.75))*i+0.9375)+b}else{return c*(7.5625*(i-=(2.625/2.75))*i+0.984375)+b}}}},easeInOutBounce:function(j,i,b,c,d){if(i<d/2){return jQuery.easing.easeInBounce(j,i*2,0,c,d)*0.5+b}return jQuery.easing.easeOutBounce(j,i*2-d,0,c,d)*0.5+c*0.5+b}});jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};eval(function(h,b,j,f,g,i){g=function(a){return(a<b?"":g(parseInt(a/b)))+((a=a%b)>35?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){while(j--){i[g(j)]=f[j]||g(j)}f=[function(a){return i[a]}];g=function(){return"\\w+"};j=1}while(j--){if(f[j]){h=h.replace(new RegExp("\\b"+g(j)+"\\b","g"),f[j])}}return h}('M 6(A){4 $11=A.11||\'&\';4 $V=A.V===r?r:j;4 $1p=A.1p===r?\'\':\'[]\';4 $13=A.13===r?r:j;4 $D=$13?A.D===j?"#":"?":"";4 $15=A.15===r?r:j;v.1o=M 6(){4 f=6(o,t){8 o!=1v&&o!==x&&(!!t?o.1t==t:j)};4 14=6(1m){4 m,1l=/\\[([^[]*)\\]/g,T=/^([^[]+)(\\[.*\\])?$/.1r(1m),k=T[1],e=[];19(m=1l.1r(T[2]))e.u(m[1]);8[k,e]};4 w=6(3,e,7){4 o,y=e.1b();b(I 3!=\'X\')3=x;b(y===""){b(!3)3=[];b(f(3,L)){3.u(e.h==0?7:w(x,e.z(0),7))}n b(f(3,1a)){4 i=0;19(3[i++]!=x);3[--i]=e.h==0?7:w(3[i],e.z(0),7)}n{3=[];3.u(e.h==0?7:w(x,e.z(0),7))}}n b(y&&y.T(/^\\s*[0-9]+\\s*$/)){4 H=1c(y,10);b(!3)3=[];3[H]=e.h==0?7:w(3[H],e.z(0),7)}n b(y){4 H=y.B(/^\\s*|\\s*$/g,"");b(!3)3={};b(f(3,L)){4 18={};1w(4 i=0;i<3.h;++i){18[i]=3[i]}3=18}3[H]=e.h==0?7:w(3[H],e.z(0),7)}n{8 7}8 3};4 C=6(a){4 p=d;p.l={};b(a.C){v.J(a.Z(),6(5,c){p.O(5,c)})}n{v.J(1u,6(){4 q=""+d;q=q.B(/^[?#]/,\'\');q=q.B(/[;&]$/,\'\');b($V)q=q.B(/[+]/g,\' \');v.J(q.Y(/[&;]/),6(){4 5=1e(d.Y(\'=\')[0]||"");4 c=1e(d.Y(\'=\')[1]||"");b(!5)8;b($15){b(/^[+-]?[0-9]+\\.[0-9]*$/.1d(c))c=1A(c);n b(/^[+-]?[0-9]+$/.1d(c))c=1c(c,10)}c=(!c&&c!==0)?j:c;b(c!==r&&c!==j&&I c!=\'1g\')c=c;p.O(5,c)})})}8 p};C.1H={C:j,1G:6(5,1f){4 7=d.Z(5);8 f(7,1f)},1h:6(5){b(!f(5))8 d.l;4 K=14(5),k=K[0],e=K[1];4 3=d.l[k];19(3!=x&&e.h!=0){3=3[e.1b()]}8 I 3==\'1g\'?3:3||""},Z:6(5){4 3=d.1h(5);b(f(3,1a))8 v.1E(j,{},3);n b(f(3,L))8 3.z(0);8 3},O:6(5,c){4 7=!f(c)?x:c;4 K=14(5),k=K[0],e=K[1];4 3=d.l[k];d.l[k]=w(3,e.z(0),7);8 d},w:6(5,c){8 d.N().O(5,c)},1s:6(5){8 d.O(5,x).17()},1z:6(5){8 d.N().1s(5)},1j:6(){4 p=d;v.J(p.l,6(5,7){1y p.l[5]});8 p},1F:6(Q){4 D=Q.B(/^.*?[#](.+?)(?:\\?.+)?$/,"$1");4 S=Q.B(/^.*?[?](.+?)(?:#.+)?$/,"$1");8 M C(Q.h==S.h?\'\':S,Q.h==D.h?\'\':D)},1x:6(){8 d.N().1j()},N:6(){8 M C(d)},17:6(){6 F(G){4 R=I G=="X"?f(G,L)?[]:{}:G;b(I G==\'X\'){6 1k(o,5,7){b(f(o,L))o.u(7);n o[5]=7}v.J(G,6(5,7){b(!f(7))8 j;1k(R,5,F(7))})}8 R}d.l=F(d.l);8 d},1B:6(){8 d.N().17()},1D:6(){4 i=0,U=[],W=[],p=d;4 16=6(E){E=E+"";b($V)E=E.B(/ /g,"+");8 1C(E)};4 1n=6(1i,5,7){b(!f(7)||7===r)8;4 o=[16(5)];b(7!==j){o.u("=");o.u(16(7))}1i.u(o.P(""))};4 F=6(R,k){4 12=6(5){8!k||k==""?[5].P(""):[k,"[",5,"]"].P("")};v.J(R,6(5,7){b(I 7==\'X\')F(7,12(5));n 1n(W,12(5),7)})};F(d.l);b(W.h>0)U.u($D);U.u(W.P($11));8 U.P("")}};8 M C(1q.S,1q.D)}}(v.1o||{});',62,106,"|||target|var|key|function|value|return|||if|val|this|tokens|is||length||true|base|keys||else||self||false|||push|jQuery|set|null|token|slice|settings|replace|queryObject|hash|str|build|orig|index|typeof|each|parsed|Array|new|copy|SET|join|url|obj|search|match|queryString|spaces|chunks|object|split|get||separator|newKey|prefix|parse|numbers|encode|COMPACT|temp|while|Object|shift|parseInt|test|decodeURIComponent|type|number|GET|arr|EMPTY|add|rx|path|addFields|query|suffix|location|exec|REMOVE|constructor|arguments|undefined|for|empty|delete|remove|parseFloat|compact|encodeURIComponent|toString|extend|load|has|prototype".split("|"),0,{}));