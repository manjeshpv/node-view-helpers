
/**
 * Module dependencies.
 */

var url = require('url')
  , qs = require('querystring')

/**
 * Helpers method
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

function helpers (name) {
  return function (req, res, next) {
    res.locals.appName = name || 'App'
    res.locals.title = name || 'App'
    res.locals.req = req
    res.locals.isActive = function (link) {
      if (link === '/' ) {
        return req.url === '/' ? 'active' : ''
      } else {
        return req.url.indexOf(link) !== -1 ? 'active' : ''
      }
    }
    res.locals.formatDate = formatDate
    res.locals.formatDatetime = formatDatetime
    res.locals.stripScript = stripScript
    res.locals.createPagination = createPagination(req)

    if (typeof req.flash !== 'undefined') {
      res.locals.info = req.flash('info')
      res.locals.errors = req.flash('error')
      res.locals.success = req.flash('success')
      res.locals.warning = req.flash('warning')
    }

    /**
     * Render mobile views
     *
     * If the request is coming from a mobile/tablet device, it will check if
     * there is a .mobile.ext file and it that exists it tries to render it.
     *
     * Refer https://github.com/madhums/nodejs-express-mongoose-demo/issues/39
     * For the implementation refer the above app
     */

    // For backward compatibility check if `app` param has been passed
    var ua = req.header('user-agent')
    var fs = require('fs')

    res._render = res.render
    req.isMobile = /mobile/i.test(ua)

    res.render = function (template, locals, cb) {
      var view = template + '.mobile.' + req.app.get('view engine')
      var file = req.app.get('views') + '/' + view

      if (/mobile/i.test(ua) && fs.existsSync(file)) {
        res._render(view, locals, cb)
      } else {
        res._render(template, locals, cb)
      }
    }

    next()
  }
}

module.exports = helpers

/**
 * Pagination helper
 *
 * @param {Number} pages
 * @param {Number} page
 * @return {String}
 * @api private
 */

function createPagination (req) {
  return function createPagination (pages, page) {
    
	  
	  
	  var params = qs.parse(url.parse(req.url).query)
   var params_first_last = true;
		        var params_prev_next = true;
		        var params_class ="class";
		        var params_link_class ="link_class";
		        var params_first_text ="First";
		        var params_prev_text ="Prev";
		        var params_next_text ="Next";
		        var params_last_text = "Last";
		        var params_show_label = true;
		        var params_mid_size = 10;
		        var params_page = page;
		        var params_total =pages;
    
    var returnHTML = "";
    function pods_var_update(id) {
    	return "?page=" + id;
    }
    returnHTML += '<ul class="pagination ' + params_class + '">';
    if (1 === params_show_label) {
    	returnHTML += '<li><a class="pods-pagination-label"> ' + params_label + '</a></li>';
    }
    if (1 < params_page) {

    	if (params_first_last) {
    		returnHTML += '<li><a href="' + pods_var_update(1) + ' class="pods-pagination-number pods-pagination-first ' + params_link_class + '">' + params_first_text + '</a></li>';
    	}
    	if (params_prev_next) {
    		returnHTML += '<li><a href="' + pods_var_update(params_page - 1) + ' class="pods-pagination-number pods-pagination-prev ' + params_link_class + '>' + params_prev_text + ' </a> </li>';
    	}
    	returnHTML += '<li><a href="' + pods_var_update(1) + ' class="pods-pagination-number pods-pagination-first ' + params_link_class + '">1</a> </li>';
    }
    if (1 < (params_page - 100)) {
    	returnHTML += '<li><a href="' + pods_var_update(params_page - 100) + ' class="pods-pagination-number pods-pagination-' + (params_page - 100) + ' ' + params_link_class + '">' + (params_page - 100) + ' </a> </li>';
    }
    if (1 < (params_page - 10)) {
    	returnHTML += '<li><a href="' + pods_var_update(params_page - 10) + ' class="pods-pagination-number pods-pagination-' + (params_page - 10) + ' ' + params_link_class + '">' + (params_page - 10) + ' </a> </li>';
    }
    var params_mid_size_pre;
    var params_mid_size_post;
    
    /*if(params_page < 10){
    	params_mid_size_pre =  params_page;
    	params_mid_size_post = params_mid_size - params_page;
    }
    if(params_page > (params_total -10)){
    	params_mid_size_post = params_total - params_page;
    	params_mid_size_pre = (params_total - params_page)-10;
    	
    } */
	    for (i = params_mid_size; i > 0; i--) {
	    	if (1 < (params_page - i)) {
	    		returnHTML += '<li><a href="' + pods_var_update(params_page - i) + ' class="pods-pagination-number pods-pagination-' + (params_page - i) + ' ' + params_link_class + '">' + (params_page - i) + '</a></li>';
	    	}
	    }
   
    returnHTML += '<li class="active"><a class="pods-pagination-number pods-pagination-current active ' + params_link_class + '">' + params_page + '</a></li>';
    
	    for (i = 1; i <= params_mid_size-1; i++) {
	    	if ((params_page + i) < params_total) {
	    		returnHTML += '<li><a href="' + pods_var_update(params_page + i) + '" class="pods-pagination-number pods-pagination-' + (params_page + i) + ' ' + params_link_class + '">' + (params_page + i) + ' </a></li>';
	    	}
	    }
 
    if ((params_page + 10) < params_total) {
    	returnHTML += '<li><a href="' + pods_var_update(params_page + 10) + '" class="pods-pagination-number pods-pagination-' + (params_page + 10) + ' ' + params_link_class + '">' + (params_page + 10) + '</a></li>';
    }
    if ((params_page + 100) < params_total) {
    	returnHTML += '<li><a href="' + pods_var_update(params_page + 100) + '" class="pods-pagination-number pods-pagination-' + (params_page + 100) + ' ' + params_link_class + '">' + (params_page + 100) + '</a></li>';
    }
    if (params_page < params_total) {
    	returnHTML += '<li><a href="' + pods_var_update(params_total) + '" class="pods-pagination-number pods-pagination-last ' + params_link_class + '">' + params_total + '</a></li>';
    	if (params_prev_next) {
    		returnHTML += '<li><a href="' + pods_var_update(params_page + 1) + '" class="pods-pagination-number pods-pagination-next ' + params_link_class + '">' + params_next_text + '</a></li>';
    	}
    	if (params_first_last) {
    		returnHTML += '<li><a href="' + pods_var_update(params_total) + '" class="pods-pagination-number pods-pagination-last ' + params_link_class + '">' + params_last_text + '</a></li>';
    	}
    }
    returnHTML += '</ul>';
    return returnHTML;
    
    
    /*var str = ''

    params.page = 1
    var clas = page == 1 ? "active" : "no"

    for (var p = 1; p <= pages; p++) {
      params.page = p
      clas = page == p ? "active" : "no"

      var href = '?' + qs.stringify(params)

      str += '<li class="'+clas+'"><a href="'+ href +'">'+ p +'</a></li>'
    }
    //console.log(str)
    return str*/
    
  }
}

/**
 * Format date helper
 *
 * @param {Date} date
 * @return {String}
 * @api private
 */

function formatDate (date) {
  date = new Date(date)
  var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  return monthNames[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()
}

/**
 * Format date time helper
 *
 * @param {Date} date
 * @return {String}
 * @api private
 */

function formatDatetime (date) {
  date = new Date(date)
  var hour = date.getHours();
  var minutes = date.getMinutes() < 10
    ? '0' + date.getMinutes().toString()
    : date.getMinutes();

  return formatDate(date) + ' ' + hour + ':' + minutes;
}

/**
 * Strip script tags
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function stripScript (str) {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}
