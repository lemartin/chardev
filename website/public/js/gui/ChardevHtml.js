var ChardevHtml = {
	getInfo: function( html ) {
		var info = Dom.create('a', {'class': 'info', 'href': 'javascript:'});
		
		Listener.add( info, 'mouseover', Tooltip.showMovable, Tooltip, [html]);
		Listener.add( info, 'mouseout', Tooltip.hide, Tooltip, []);
		Listener.add( info, 'mousemove', Tooltip.move, Tooltip, []);
		
		return info;
	},
	createWithInfo: function( tag, obj, infoHtml) {
		return Dom.append(Dom.create(tag, obj), ChardevHtml.getInfo( infoHtml ));
	},
	addTooltip: function( node, html ) {
		if( typeof node === 'string' ) {
			node = document.getElementById(node);
		}
		if( typeof html == 'function' ) {
			html = html();
		}
		Listener.add( node, 'mousemove', Tooltip.move, Tooltip, [] );
		Listener.add( node, 'mouseout', Tooltip.hide, Tooltip, [] );
		Listener.add( node, 'mouseover', Tooltip.showMovable, Tooltip, [html] );
	},
	shadow: function( node, text ) {
		var s = Dom.createAt( node, 'span', {});
		s.innerHTML = "<span style='position: absolute'>" + text + "<span style='color: #808080; position: absolute; top: -1px; left: 1px;'>"+text+"</span></span>";
	},
	buttonLightStyleFor: function( node ) {
		Tools.jsCssClassHandler( node, { 
			'default': "button button_light li_filter_search_btn", 
			'focus': "button_light_focus", 
			'hover': "button_light_hover"
		});
	},
	addInfo: function( node, html ) {
		if( typeof node === 'string' ) {
			node = document.getElementById(node);
		}
		Dom.append( node, ChardevHtml.getInfo(html));
	},
	dynamicBoxBorder: function( node, cssStyleBase ) {
		var sg = new StaticGrid(3,3);
		
		sg.cells[1][1].appendChild(node);
		
		Dom.createAt(sg.cells[0][0], "div", { "class": cssStyleBase + "_lt"});
		Dom.createAt(sg.cells[0][2], "div", { "class": cssStyleBase + "_rt"});
		Dom.createAt(sg.cells[2][0], "div", { "class": cssStyleBase + "_lb"});
		Dom.createAt(sg.cells[2][2], "div", { "class": cssStyleBase + "_rb"});

		sg.cells[0][1].className = cssStyleBase + "_t";
		sg.cells[1][0].className = cssStyleBase + "_l";
		sg.cells[1][2].className = cssStyleBase + "_r";
		sg.cells[2][1].className = cssStyleBase + "_b";
		
		return sg;
	},
	/**
	 * @param {StaticGrid} sg
	 */
	dynamicBoxBorderChangeStyle: function( sg, cssStyleBase ) {
		sg.cells[0][0].firstChild.className = cssStyleBase + "_lt";
		sg.cells[0][2].firstChild.className = cssStyleBase + "_rt";
		sg.cells[2][0].firstChild.className = cssStyleBase + "_lb";
		sg.cells[2][2].firstChild.className = cssStyleBase + "_rb";
		sg.cells[0][1].className = cssStyleBase + "_t";
		sg.cells[1][0].className = cssStyleBase + "_l";
		sg.cells[1][2].className = cssStyleBase + "_r";
		sg.cells[2][1].className = cssStyleBase + "_b";
	}
};

if( ! window['ChardevHtml'] ) {
	window['ChardevHtml'] = {
			'getInfo': ChardevHtml.getInfo,
			'createWithInfo': ChardevHtml.createWithInfo,
			'addTooltip': ChardevHtml.addTooltip,
			'shadow': ChardevHtml.shadow,
			'buttonLightStyleFor': ChardevHtml.buttonLightStyleFor,
			'addInfo': ChardevHtml.addInfo
	};
}