/**
 * @constructor
 */
function BatchOperations() {
	this.ops = {};
	this.node = Dom.create('div', {'class': 'ba_p'});
	
	this.batchCollapsable = new Collapsable();
	this.batchCollapsable.header.appendChild(Dom.create('a', {'href': 'javascript:;', 'text': locale['RF_BatchHeader']}));
	this.batchCollapsable.header.className = "collapse_h ba_collapse_h";
	this.batchCollapsable.content.className = "collapse_c ba_collapse_c";
	this.batchCollapsable.node.className = "collapse ba_collapse";
	
	this.opsContainer = this.batchCollapsable.content;
	
	Dom.append(this.node, this.batchCollapsable.node);
}

BatchOperations.prototype = {
	ops: null,
	batchCollapsable: null, opsContainer: null, node: null,
	addSimple: function( id, title, handler ) {
		var div = Dom.createAt( this.opsContainer, 'div', {'class': 'ba_op_container'});
		var a = Dom.createAt( div , 'a', {
			'text': title,
			'href': 'javascript:;', 
			'class': 'ba_simple_op_link'
		});
		
		Listener.addHandler(a, 'click', handler, [id]);
		this.ops[id] = { 'id': id, 'node': div};
		return this.ops[id];
	},
	addComplex: function( id, title, node, info ) {
		var div, div2;
		
		div = Dom.createAt( this.opsContainer, 'div', {
			'class': 'ba_op_container'
		});
		
		var titleDiv = Dom.createAt( div, 'div', {'class': 'ba_op_title','text': title});
		
		if( info ) {
			Dom.append(titleDiv, ChardevHtml.getInfo(info));
		}
		
		div2 = Dom.createAt( div, 'div', {});
		Dom.append(div2, node);
		this.ops[id] = { 'id': id, 'node': div};
		return this.ops[id];
	},
	remove: function( id ) {
		if( typeof this.ops[id] !== 'undefined' && this.ops[id] !== null ) {
			this.opsContainer.removeChild(this.ops[id]['node']);
			delete this.ops[id];
		}
	},
	show: function(id) {
		this.__testId(id);
		
		this.ops[id].node.display.style = "none";
	},
	hide: function(id) {
		this.__testId(id);
		
		this.ops[id].node.display.style = "";
	},
	__testId: function( id ) {
		if( typeof this.ops[id] === 'undefined' || this.ops[id] === null ) {
			throw new Error("No batch operation with id '"+id+"' found!");
		}
	}
};

/*
this.batch.appendChild(this.batchCollapsable.node);
	this.batchCollapsable.header.appendChild(document.createTextNode(locale['SI_BatchHeader']));
	this.batchCollapsable.header.className = "collapse_h";
	this.batchCollapsable.content.className = "collapse_c";
	this.batchCollapsable.node.className = "ra_group ba_collapse";
	
	a = Dom.createAt( this.batchCollapsable.content, 'a', {'text': locale['SI_RemoveAllGems'],'href': 'javascript:', 'class': 'ba_simple_op_link'});
	Listener.add(a,"click",this.onBatchOperation,this,[SocketInterface.BATCH_OP_REM_ALL]);
	
	this.baOpRemColTitle = Dom.createAt( this.batchCollapsable.content, 'a', {'href': 'javascript:', 'class': 'ba_simple_op_link'});
	Listener.add(this.baOpRemColTitle,"click",this.onBatchOperation,this,[SocketInterface.BATCH_OP_REM_ALL_SAME_GEM]);
	
	this.baOpSocAllTitle = Dom.createAt( this.batchCollapsable.content, 'a', {'href': 'javascript:', 'class': 'ba_simple_op_link'});
	Listener.add(this.baOpSocAllTitle,"click",this.onBatchOperation,this,[SocketInterface.BATCH_OP_SOCK_ALL]);
	
	this.baOpSocColTitle = Dom.createAt( this.batchCollapsable.content, 'a', {'href': 'javascript:', 'class': 'ba_simple_op_link'});
	Listener.add(this.baOpSocColTitle,"click",this.onBatchOperation,this,[SocketInterface.BATCH_OP_SOCK_ALL_COL]);
*/