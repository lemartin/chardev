<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="icon" href="images/site/favico.png" type="image/png" />
<title>chardev 8 - Cataclysm Beta</title>

<?php
	include('php/locale/en.php');
	
	echo "
<script type='text/javascript'>
	var locale=".json_encode($locale).";
</script>";
?>

<script src="js/chardev_lib/Listener.js" type="text/javascript"></script>
<script src="js/chardev_lib/Tools.js" type="text/javascript"></script>
<script src="js/DoubleEndedQueue.js" type="text/javascript"></script>
<script src="js/gui_lib/FilterManager.js" type="text/javascript"></script>
<script src="js/gui_lib/SingleSelect.js" type="text/javascript"></script>
<script type="text/javascript">
	var filter;
	var F_VAR_USABLEBYCLASS = "usablebyclass";
	var F_VAR_ISSOCKETABLEGEM = "issocketablegem";
	var F_VAR_SLOT = "slot";
	var F_VAR_ISENCHANT = "isenchant";
	var F_VAR_SUBCLASS = "subclass";
	var F_VAR_REQUIREDLEVEL = "reqlvl";
	var F_VAR_DESCRIPTION = "description";
	
	var F_CLASS_OPTS = [
	                	[1,locale['a_class'][0]],
	                	[2,locale['a_class'][1]],
	                	[4,locale['a_class'][2]],
	                	[8,locale['a_class'][3]],
	                	[16,locale['a_class'][4]],
	                	[32,locale['a_class'][5]],
	                	[64,locale['a_class'][6]],
	                	[128,locale['a_class'][7]],
	                	[256,locale['a_class'][8]],
	                	[1024,locale['a_class'][10]]
	                ];
	
	function ItemFilter() {
		this._filterManager = new FilterManager(this._customFilterOptions);
		this._node = document.createElement("form");
		this._customFilterParent = document.createElement("div");
		
		this._addFilterBtn = document.createElement("input");
		this._addFilterBtn.value = locale['F_AddFilter'];
		this._addFilterBtn.type = "button";
		
		this._searchBtn = document.createElement("input");
		this._searchBtn.value = locale['F_Search'];
		this._searchBtn.type = "submit";
		
		this._node.appendChild(this._filterManager._customFilterParent);
		this._node.appendChild(this._searchBtn);
		this._node.appendChild(this._addFilterBtn);
		this._node.onsubmit = new Function("return false;");
		this._node.action = "#";
		this._node.method = 'post';
		
		Listener.add(this._addFilterBtn,"click",this.addCustomFilter,this,null);
		Listener.add(this._node,"submit",this._onSubmit,this,null);
	}
	ItemFilter.prototype._filterManager = null;
	ItemFilter.prototype._customFilterOptions = [
    	[FM_OPT_EMPTY],
   		[FM_OPT_GROUP,locale['F_General']],
   		[FM_OPT,locale['F_ItemLevel'],['lvl',FM_IN,FM_NUMERIC]],
   		[FM_OPT_GROUP,locale['F_Stats']],
   		[FM_OPT,locale['CS_Stats'][1][0],['str',FM_IN,FM_NUMERIC]],
   		[FM_OPT,locale['CS_Stats'][1][1],['agi',FM_IN,FM_NUMERIC]],
   		[FM_OPT,locale['CS_Stats'][1][2],['sta',FM_IN,FM_NUMERIC]],
   		[FM_OPT,locale['CS_Stats'][1][3],['int',FM_IN,FM_NUMERIC]],
   		[FM_OPT,locale['CS_Stats'][1][4],['spi',FM_IN,FM_NUMERIC]],
   		[FM_OPT_GROUP,locale['F_Requirements']],
   		[FM_OPT,"Usable by ",["usablebyclass",FM_SEL,F_CLASS_OPTS]],
   		[FM_OPT,locale['F_RequiredLevel'],["reqlvl",FM_IN,FM_NUMERIC]],
   		[FM_OPT,locale['F_RequiresReputation'],["reqrepu",FM_SEL,[[1,locale['F_Yes']],[0,locale['F_No']]]]],
   		[FM_OPT_GROUP,locale['F_Miscellaneous']],
   		[FM_OPT,locale['F_SocketableGem'],["issocketablegem",FM_SEL,[[1,locale['F_Yes']],[0,locale['F_No']]]]],
   	];
	ItemFilter.prototype._node = null;
	ItemFilter.prototype._addFilterBtn = null;
	ItemFilter.prototype._searchBtn = null;
	
	ItemFilter.prototype._onSubmit = function() {
		var args = this._filterManager.buildArgumentString();
		document.body.appendChild(document.createTextNode(args));
		this.set(args);
	};
	
	ItemFilter.prototype.addCustomFilter = function() {
		var div = document.createElement("div");
		this._filterManager.addCustomFilter(div, null, null);
		this._customFilterParent.appendChild(div);
	};
	
	ItemFilter.prototype.set = function( arguments ) {
		this._filterManager.buildCustomFilters(arguments);
	};
	
	function g_onLoad() {
		filter = new ItemFilter();

		document.getElementById('parent').appendChild(filter._node);
		filter.set('lvl.ge.333;int.gt.0;');
	}
</script>

</head>
<body onload="g_onLoad();">
	<div id='parent'></div>
</body>
</html>