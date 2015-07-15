var Dom = {
	/**
	 * @param {string} tag
	 * @param {Object} obj
	 * @returns {Element}
	 */
	create: function( tag, obj ) {
		var e = document.createElement(tag);
		if( obj ) {
			for( var k in obj ) {
				switch(k) {
				case 'class': e.className = obj[k]; break;
				case 'action': e.action = obj[k]; break;
				case 'method': e.method = obj[k]; break; 
				case 'clear':e.style.clear = obj[k]; break;
				case 'display':e.style.display = obj[k]; break;
				case 'href':e.href = obj[k]; break;
				case 'src':e.src = obj[k]; break;
				case 'target':e.target = obj[k]; break;
				case 'name':e.name = obj[k]; break;
				case 'id':e.id = obj[k]; break;
				case 'backgroundImage':
					if( obj[k].toLowerCase() === 'none' || obj[k].toLowerCase() === 'inherit' ) {
						e.style.backgroundImage = obj[k];
					}
					else {
						e.style.backgroundImage = 'url(' + obj[k] + ')';
					}
					break;
				case 'text':
					if( tag === 'input' ) {
						e.value = obj[k];
					}
					else {
						e.innerHTML = obj[k];
					}
					break;
				case 'type':e.type = obj[k]; break;
				case 'value':e.value = obj[k]; break;
				case 'title':e.title = obj[k]; break;
				case 'checked':e.checked = obj[k]; break;
				case 'color':e.style.color = obj[k]; break;
				default: 
					throw new Error("Unknown parameter "+k+" with value "+obj[k]);
				}
			}
		}
		return e;
	},
	/**
	 * @param parent
	 * @param {string} tag
	 * @param {Object} obj
	 * @returns {Element}
	 */
	createAt: function ( parent, tag, obj ) {
		var e = Dom.create(tag,obj);
		if( typeof parent == 'string' ) {
			document.getElementById(parent).appendChild(e);
		}
		else {
			parent.appendChild(e);
		}
		return e;
	},
	addClass: function( element, className ) {
		if( typeof element === 'string' ) {
			element = document.getElementById(element);
		}
		Dom.removeClass(element, className);
		element.className = (element.className?element.className+' ':'') + className;
		return element;
	},
	removeClass: function( element, className ) {
		if( typeof element === 'string' ) {
			element = document.getElementById(element);
		}
		if( element ) {
			if( className instanceof RegExp ) {
				Dom.__removeClassRegExp(element, className);
			}
			else {	
				Dom.__removeClassString(element, className);
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
			n1.innerHTML = n2;
		}
		else {
			while(n1.hasChildNodes()) {
				n1.removeChild(n1.firstChild);
			}
			n1.appendChild(n2);
		}
		return n1;
	},
	clear: function( n ) {
		n.appendChild(Dom.create('div', {'clear': 'both'}));
		return n;
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
		if( typeof n === 'string' ) {
			n = document.getElementById(n);
		}
		while(n.firstChild) {
			n.removeChild(n.firstChild);
		}
		return n;
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
	},
	/**
	 * @param {Element|HTMLDocument} node
	 * @param {string} event
	 * @param {Function} callback
	 * @param {Object} scope
	 * @param {Array} args
	 */
	listen: function(node, event, callback, scope, args) {
		var scopedHandler = function( ev ) {
			if ( args ) {
				callback.apply(scope,args);
			}
			else {
				callback.call(scope,ev);
			}
		};
		
		if (document.addEventListener)  {
			node.addEventListener(event, scopedHandler, false);
		}
		else if (document.attachEvent) {
			node.attachEvent("on" + event, scopedHandler);
		}
	}
};