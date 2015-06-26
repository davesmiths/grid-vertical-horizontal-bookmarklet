

/* Grid Vertical Horizontal Bookmarklet */
(function(context) {

	'use strict';

	var doStuff,$,script,firstScript,loaded,makeColsGrid;

	if (window.gridVerticalHorizontalBookmarklet === undefined) {

    	/* Load jQuery and get started */
        script = document.createElement('script');
        firstScript = document.getElementsByTagName('script')[0];

        script.type = 'text/javascript';
        script.async = true;
        script.onreadystatechange = script.onload = function(e) {
    		if (!loaded && (!this.readyState || this.readyState === 'complete' || this.readyState === 'loaded')) {
    			this.onreadystatechange = null;
    			loaded = 1;


                /* jQuery no conflict */
                jQuery.noConflict();

                $ = jQuery;

	            doStuff();

            }
        };
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
        firstScript.parentNode.insertBefore(script, firstScript);
	}
	else {
    	window.gridVerticalHorizontalBookmarklet();
	}


    /* Do Stuff */
    doStuff = function() {

        context.gridRowsColumnsDaveSmith = context.gridRowsColumnsDaveSmith || {view:0};

        var makeRowsGrid,removeGrid;

        makeRowsGrid = function() {

	        var numberOfRows,rowsBase,rowsHTML,i;

	        numberOfRows = 1000;
        	rowsBase = 10;
        	rowsHTML = '';

	        for (i = 1; i < numberOfRows; i += 1) {
		        rowsHTML += '<div class="gridverticalhorizontal-row-line" style="top:' + ((i * rowsBase)) + 'px"></div>';
	        }

	        $(function() {

	        	/* Append the styles */
		        $('head').append('<style class="gridverticalhorizontal gridrows">.gridverticalhorizontal-row-line {position:absolute;left:0;height:1px;width:100%;background:#000;opacity:.1;z-index:100;}');

		        /* Append the HTML */
		        $('body').append('<div class="gridverticalhorizontal gridrows">' + rowsHTML + '</div>');

	        });

        };

        /* Needs work here, as I'm not sure how to detect the left edge of a page */
        makeColsGrid = function() {

	        var numberOfRows,rowsBase,rowsHTML,i,htmlWidth,$el,$maxWidth,width,$wideElements,offset,offsetted;

	        numberOfRows = 1000;
        	rowsBase = 10;
        	rowsHTML = '';


	        htmlWidth = $('html').width();

		    $el = $('body');

	        /* Get all elements with max-width set */
	        $maxWidth = $('*').filter(function() {
	        	if ($(this).css('maxWidth') != 'none') {
		        	return true;
	        	}
	        });


	        /* Get the widest element that isn't as wide as body */
	        width = 0;
	        $wideElements = $('*').each(function() {
				var $this,w;
		        $this = $(this);
		        w = $this.innerWidth();
		        if (w < htmlWidth && w > width) {
			        width = w;
			        $el = $this;
		        }
	        });

	        offset = rowsBase - ($el.offset().left % rowsBase);


	        offsetted = $el.offset().left + offset;


	        for (i = 1; i < numberOfRows; i += 1) {
		        rowsHTML += '<div class="gridverticalhorizontal-col-line" style="left:' + ((i * rowsBase)) + 'px;';
	        	if (offsetted === (i * rowsBase)) {
	        		rowsHTML += 'opacity:.3;';
	        	}
		        rowsHTML += '"></div>';
	        }

	        $(function() {

		        $('head').append('<style class="gridverticalhorizontal gridcols">.gridverticalhorizontal-col-line {position:absolute;top:0;height:3000px;width:1px;background:#000;opacity:.1;z-index:100;}');

		        $('body').append('<div class="gridverticalhorizontal gridcols" style="position:absolute;top:0;left:-'+offset+'px;width:100%;height:3000px;">' + rowsHTML + '</div>');

	        });

        };

        removeGrid = function() {

        	$('.gridverticalhorizontal').remove();

        };


        $(document)
        	.on('keyup', function(e) {
				if (e.which === 107) {
					/* + */
					base += 1;
				}
				else if (e.which === 109) {
					/* - */
					base -= 1;
				}
				console.log(e.which);
			})
			.on('mousedown', function() {
	            /*removeGrid();*/
            })
            .on('mouseup', function() {
	            /*makeRowsGrid();*/
            });


        /*
        	Make this work so that, clicking the bookmarklet goes through the following cycle:
        	1. Show rows
        	2. Show columns left flush
        	3. Show columns right flush
        	4. Off
         */

        if (context.gridRowsColumnsDaveSmith.view === 0) {
        	removeGrid();
        	makeRowsGrid();
        	context.gridRowsColumnsDaveSmith.view = context.gridRowsColumnsDaveSmith.view + 1;
        }
        else if (context.gridRowsColumnsDaveSmith.view === 1) {
        	removeGrid();
        	makeColsGrid();
        	context.gridRowsColumnsDaveSmith.view = context.gridRowsColumnsDaveSmith.view + 1;
        }
        else {
        	removeGrid();
        	context.gridRowsColumnsDaveSmith.view = 0;
        }
    };

	context.gridVerticalHorizontalBookmarklet = doStuff;


})(this);
