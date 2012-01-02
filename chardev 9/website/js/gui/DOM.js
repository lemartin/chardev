var DOM = {
	/**
	 * @param tag
	 * @param obj
	 * @returns {Element}
	 */
	create: function( tag, obj ) {
		var e = document.createElement(tag);
		if( obj ) {
			for( var k in obj ) {
				if( k == 'class' ) { e.className = obj[k]; }
				else if( k == 'action' ) { e.action = obj[k]; } 
				else if( k == 'clear') {e.style.clear = obj[k];}
				else if( k == 'display') {e.style.display = obj[k];}
				else if( k == 'href') {e.href = obj[k];}
				else if( k == 'src') {e.src = obj[k];}
				else if( k == 'target') {e.target = obj[k];}
				else if( k == 'name') {e.name = obj[k];}
				else if( k == 'id') {e.id = obj[k];}
				else if( k == 'backgroundImage') {
					if( obj[k].toLowerCase() === 'none' || obj[k].toLowerCase() === 'inherit' ) {
						e.style.backgroundImage = obj[k];
					}
					else {
						e.style.backgroundImage = 'url(' + obj[k] + ')';
					}
				}
				else if( k == 'text') {
					if( tag === 'input' ) {
						e.value = obj[k];
					}
					else {
						e.innerHTML = obj[k];
					}
				}
				else if( k == 'type') {e.type = obj[k];}
				else if( k == 'value') {e.value = obj[k];}
				else if( k == 'title') {e.title = obj[k];}
				else if( k == 'checked') {e.checked = obj[k];}
				else throw Error("Unknown parameter "+k+" with value "+obj[k]);
			}
		}
		return e;
	},
	/**
	 * @param parent
	 * @param tag
	 * @param obj
	 * @returns {Element}
	 */
	createAt: function ( parent, tag, obj ) {
		var e = DOM.create(tag,obj);
		if( typeof parent == 'string' ) {
			document.getElementById(parent).appendChild(e);
		}
		else {
			parent.appendChild(e);
		}
		return e;
	},
	addClass: function( element, className ) {
		DOM.removeClass(element, className);
		element.className = (element.className?element.className+' ':'') + className;
		return element;
	},
	removeClass: function( element, className ) {
		if( typeof element === 'string' ) {
			element = document.getElementById(element);
		}
		if( element ) {
			if( className instanceof RegExp ) {
				DOM.__removeClassRegExp(element, className);
			}
			else {	
				DOM.__removeClassString(element, className);
			}
		}
	},
	__removeClassString: function( element, className ) {
		var cs = element.className.split(" ");
		var n = cs.length;
		for( var i=0; i<n; i++ ) {
			if( cs[i] === className ) {
				cs[i] = cs[n-1];
				cs.pop();
				element.className = cs.join(" "); 
				return;
			}
		}
	},
	__removeClassRegExp: function( element, regExpClassName ) {
		var cs = element.className.split(" ");
		var n = cs.length;
		for( var i=0; i<n; i++ ) {
			if( regExpClassName.exec(cs[i]) !== null ) {
				cs[i] = cs[n-1];
				cs.pop();
				element.className = cs.join(" "); 
				return;
			}
		}
	},
	set: function( n1, n2 ) {
		if( typeof n1 === 'string' ) {
			n1 = document.getElementById(n1);
		}
		if( typeof n2 === 'string' ) {
			n1.innerHTML += n2;
		}
		else {
			while(n1.firstChild) {
				n1.removeChild(n1.firstChild);
			}
			n1.appendChild(n2);
		}
	},
	clear: function( n ) {
		n.appendChild(DOM.create('div', {'clear': 'both'}));
	},
	get: function( id ) {
		return document.getElementById(id);
	},
	append: function( n1, n2 ) {
		if( typeof n1 === 'string' ) {
			n1 = document.getElementById(n1);
		}
		if( typeof n2 === 'string' ) {
			n1.innerHTML += n2;
		}
		else {
			n1.appendChild(n2);
		}
		return n1;
	},
	appendAll: function( n1, ns ) {
		for( var k in ns ) {
			n1.appendChild(ns[k]);
		}
		return n1;
	},
	truncate: function( n ) {
		while(n.firstChild) {
			n.removeChild(n.firstChild);
		}
	},
	/**
	 * @param {Element|string} n
	 * @returns {string|null}
	 */
	getValue: function( n ) {
		if( typeof n === 'string' ) {
			n = document.getElementById(n);
		}
		if( n != null ) {
			var nn = n.nodeName.toLowerCase();
			if( nn  === 'input' && n.type == 'checkbox' ){
				return n.checked;
			}
			else if( nn  === 'input' || nn == 'textarea' ) {
				return n.value;
			}
			else if( nn === 'select' ){
				return n.selectedIndex != -1 ? n.options[n.selectedIndex].value : null;
			}
		}
		return null;
	}
};

var ChardevHTML = {
	getInfo: function( html ) {
		var info = DOM.create('a', {'class': 'info', 'href': 'javascript:'});
		
		Listener.add( info, 'mouseover', Tooltip.showMovable, Tooltip, [html]);
		Listener.add( info, 'mouseout', Tooltip.hide, Tooltip, []);
		Listener.add( info, 'mousemove', Tooltip.move, Tooltip, []);
		
		return info;
	},
	createWithInfo: function( tag, obj, infoHtml) {
		return DOM.append(DOM.create(tag, obj), ChardevHTML.getInfo( infoHtml ));
	},
	addTooltip: function( node, html ) {
		Listener.add( node, 'mousemove', Tooltip.move, Tooltip, [] );
		Listener.add( node, 'mouseout', Tooltip.hide, Tooltip, [] );
		Listener.add( node, 'mouseover', Tooltip.showMovable, Tooltip, [html] );
	},
	shadow: function( node, text ) {
		var s = DOM.createAt( node, 'span', {});
		s.innerHTML = "<span style='position: absolute'>" + text + "<span style='color: #808080; position: absolute; top: -1px; left: 1px;'>"+text+"</span></span>";
	},
	buttonLightStyleFor: function( node ) {
		Tools.jsCssClassHandler( node, { 
			'default': "button button_light li_filter_search_btn", 
			'focus': "button_light_focus", 
			'hover': "button_light_hover"
		});
	}
};