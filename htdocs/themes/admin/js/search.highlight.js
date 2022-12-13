function searchHighlight(searchTerm, selector) {
	
    if (searchTerm) {
	    
        //var wholeWordOnly = new RegExp("\\g"+searchTerm+"\\g","ig"); //matches whole word only
        //var anyCharacter = new RegExp("\\g["+searchTerm+"]\\g","ig"); //matches any word with any of search chars characters
        var selector = selector || "#table_result"; //use body as selector if none provided
        
        var searchTermRegEx = new RegExp(searchTerm, "ig");
        var matches = $(selector).text().match(searchTermRegEx);
        
        if (matches != null && matches.length > 0) {
	        
            $('.highlighted').removeClass('highlighted'); //Remove old search highlights  

            //Remove the previous matches
            $span = $('#table_result span');
            $span.replaceWith($span.html());

		    if (searchTerm === "&") {
			    
		        searchTerm = "&amp;";
		        searchTermRegEx = new RegExp(searchTerm, "ig");
		    }
		    
            $(selector).html($(selector).html().replace(searchTermRegEx, "<span class='match'>" + searchTerm + "</span>"));
            
            $('.match:first').addClass('highlighted');

            var i = 0;

            $('#next_h').off('click').on('click', function () {
                
                i++;

                if (i >= $('.match').length) {
                	i = 0;
				}
				
                $('.match').removeClass('highlighted');
                $('.match').eq(i).addClass('highlighted');
                
                $('.ui-mobile-viewport').animate({
	                
                    scrollTop: $('.match').eq(i).offset().top
                    
                }, 300);
                
            });
            
            $('#previous_h').off('click').on('click', function () {

                i--;

                if (i < 0) {
                	
                	i = $('.match').length - 1;
				}

                $('.match').removeClass('highlighted');
                $('.match').eq(i).addClass('highlighted');
                $('.ui-mobile-viewport').animate({
                    scrollTop: $('.match').eq(i).offset().top
                }, 300);
            });

            if ($('.highlighted:first').length) { //if match found, scroll to where the first one appears
                
                $(window).scrollTop($('.highlighted:first').position().top);
                
                //$("html, body").animate({ scrollTop: 0 }, "slow");
            }
            
            return true;
        }
    }
    
    return false;
}

function searchHtmlHighlight(searchTerm, selector, highlightClass, removePreviousHighlights) {
    
    if(searchTerm) {
        //var wholeWordOnly = new RegExp("\\g"+searchTerm+"\\g","ig"); //matches whole word only
        //var anyCharacter = new RegExp("\\g["+searchTerm+"]\\g","ig"); //matches any word with any of search chars characters
        var selector = selector || "body",                             //use body as selector if none provided
            searchTermRegEx = new RegExp("("+searchTerm+")","gi"),
            //matches = 0,
            matches = $(selector).text().match(searchTermRegEx),
            helper = {};
        	helper.doHighlight = function(node, searchTerm){
        		
            if(node.nodeType === 3) {
            	
                if(node.nodeValue.match(searchTermRegEx)){
                    matches++;
                    var tempNode = document.createElement('span');
                    tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='"+highlightClass+"'>$1</span>");
                    node.parentNode.replaceChild(tempNode, node);
                    
                    //alert($('.highlighted:first').position().top-20);
                    
                    $(window).scrollTop($('.highlighted:first').position().top-65);
                }
            }
            else if(node.nodeType === 1 && node.childNodes && !/(style|script)/i.test(node.tagName)) {
                
                $.each(node.childNodes, function(i,v){
                    helper.doHighlight(node.childNodes[i], searchTerm);
                });
            }
        };
        
        if(removePreviousHighlights) {
            $('.'+highlightClass).each(function(i,v){
                var $parent = $(this).parent();
                $(this).contents().unwrap();
                $parent.get(0).normalize();
            });
        }

        $.each($(selector).children(), function(index,val){
            helper.doHighlight(this, searchTerm);
        });
        
        return true;//return matches;
    }
    
    return false;
}

/*
$(document).ready(function() {
    $('#search-button').on("click",function() {
        if(!searchHtmlHighlight($('#search-term').val(), 'body', 'highlighted', true)) {
            alert("No results found");
        }
    });
});
*/

function searchAndHighlight(searchTerm, selector) {
	
    if (searchTerm) {   
	                
        var selector = selector || "#result_html"; //use body as selector if none provided
        var searchTermRegEx = new RegExp(searchTerm, "ig");
        var matches = $(selector).text().match(searchTermRegEx);
        
        if (matches != null && matches.length > 0) {
	        
            $('.highlighted').removeClass('highlighted'); //Remove old search highlights 

            //Remove the previous matches
            $span = $('#result_html span');
            $span.replaceWith($span.html());

            if (searchTerm === "&") {
	            
                searchTerm = "&amp;";
                searchTermRegEx = new RegExp(searchTerm, "ig");
            }
            
            $(selector).html($(selector).html().replace(searchTermRegEx, "<span class='match'>" + searchTerm + "</span>"));
            
            $('.match:first').addClass('highlighted');

            var i = 0;

            $('.next_h').off('click').on('click', function () {
                i++;

                if (i >= $('.match').length) i = 0;

                $('.match').removeClass('highlighted');
                $('.match').eq(i).addClass('highlighted');
                $('.ui-mobile-viewport').animate({
                    scrollTop: $('.match').eq(i).offset().top
                }, 300);
            });
            
            $('.previous_h').off('click').on('click', function () {

                i--;

                if (i < 0) i = $('.match').length - 1;

                $('.match').removeClass('highlighted');
                $('.match').eq(i).addClass('highlighted');
                $('.ui-mobile-viewport').animate({
                    scrollTop: $('.match').eq(i).offset().top
                }, 300);
            });

            if ($('.highlighted:first').length) { //if match found, scroll to where the first one appears
                
                $(window).scrollTop($('.highlighted:first').position().top);
            }
            
            return true;
        }
    }
    
    return false;
}

function intern_search(value, content_id) {
    // get the html text
    var html_content = $("#"+content_id).html();
    // split value into words
    var value_words = value.split(' ');
    var nr_words = value_words.length;
    
    // check if value is inside a html tag or not
    // if the first angle bracket is a '<' the value is outside of a html tag
    if (nr_words === 1) {
        var regex = new RegExp(value+'(?=[^>]*?(<|$))','gi');
    } else {
        // there can be a html tag between two words
        var regex = value_words[0]+'(?=[^>]*?(<|$))';
        for (var i = 1; i < nr_words; i++) {
           // there can be a space and a whole html tag between two parts 
           regex += '(?: ?)(?:<[^>]*?>)?(?: ?)'+value_words[i]+'(?=[^>]*?(<|$))';     
        }
        var regex = new RegExp(regex,'gi');
    }
    
    var matches = null;
    var positions = [], found = [], add_found_char = [];
    
    while(matches = regex.exec(html_content)) {
      // add this before / after a value part
      var start_tag = '<span class="found">';
      var end_tag = '</span>';
      // if the match contains html tags there need to be a </span>
      // before the html tag starts and a <span if the html tags closes again
       // abc <p>def => abc </span><p><span class="found">def</span>   
      var match = matches[0].replace(/>/g,'>'+start_tag);
      match = match.replace(/<(?!span class="found">)/g,end_tag+'<');
        
      // save the new match with correct html tags    
      found.push(match); 
      // save how many chars have been added 
      add_found_char.push(match.length-matches[0].length);
      // save found position
      positions.push(matches.index); 
    }

    
    var add_nr_chars = 0;
    var new_html_content = html_content;
    // iterate through all positions and add a span tag to mark the query
    for (var i = 0; i < positions.length; i++) {
        // add this before / after the found value
        var start_tag = '<span class="found" id="found_'+i+'">';
        var end_tag = '</span>';
        // string before value
        var content_before = new_html_content.substr(0,positions[i]+add_nr_chars);
        // value and start_tag and end_tag
        var value_and_tags = start_tag + found[i] + end_tag;
        // string after value
        var content_after = new_html_content.substr(positions[i]+add_nr_chars+found[i].length-add_found_char[i]);

        // number of characters which have been added
        add_nr_chars += start_tag.length + end_tag.length + add_found_char[i];
        
        // new content
        new_html_content = content_before + value_and_tags + content_after;
    }
    
    $("#"+content_id).html(new_html_content);                
}

/*
$(document).on('click', '.searchButtonClickText_h', function (event) {
 
    $(".highlighted").removeClass("highlighted").removeClass("match");
    
    if (!searchAndHighlight($('.textSearchvalue_h').val())) {
	    
        alert("No results found");
    }


});
*/