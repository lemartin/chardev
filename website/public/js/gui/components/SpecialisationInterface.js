/**
 * @constructor
 */
function SpecialisationInterface() {
	this.node = Dom.create("div", {"class": "spi_node"});
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("click", ["index"]);
}

SpecialisationInterface.prototype = {
		node: null,
		eventMgr: null,
		specNodes: null,
		selected: -1,
		iconSrcs: null,
		update: function( specs ) {
			Dom.truncate(this.node);
			
			if( ! specs ) {
				Dom.append(this.node, "Select a class first!");
				return;
			}

			this.specNodes = [];
			for( var i=0; i<specs.length; i++ ) {
				this._addSpecItem(specs[i], i);
			}
			
			this.select( -1 );
		},
		select: function( index ) {
			if( this.selected !== -1 ) {
				var spec = this.specNodes[this.selected];
				Dom.removeClass(spec.node, "spi_item_active");
				spec.icon.src = "/images/icons/g/half/" + spec.src +  ".png";
				ChardevHtml.dynamicBoxBorderChangeStyle(spec.sg, "spi_item");
			}
			if( index !== -1 ) {
				var spec = this.specNodes[index];
				Dom.addClass(spec.node, "spi_item_active");
				spec.icon.src = "/images/icons/half/" + spec.src +  ".png";
				ChardevHtml.dynamicBoxBorderChangeStyle(spec.sg, "spi_item_active");
			}
			this.selected = index;
		},
		addObserver: function(observer) {
			this.eventMgr.addObserver(observer);
		},
		/**
		 * @param {SpecialisationFacade} spec
         * @param {int} index
		 */
		_addSpecItem: function( spec, index ) {
			var node = Dom.create( "a", {"class": "spi_item", "href": "javascript:;"});
			var sg = ChardevHtml.dynamicBoxBorder(node, "spi_item");
			var icon = Dom.createAt( node, "img", { "src": "/images/icons/g/half/" + spec.icon +  ".png", "class": "spi_icon" });
			
			Dom.createAt(node, "div", {"class": "spi_content", "text": spec.name + "<br/>" + spec.description});
			
			Dom.listen( node, "click", this.eventMgr.fire, this.eventMgr, ["click", {"index": index}]);
			
			Dom.clear(node);
			
			this.specNodes[index] = {
				icon: icon,
				node: node,
				src: spec.icon,
				sg: sg
			};
			
			sg.node.className = "spi_item_w";
			
			Dom.append( this.node, sg.node);
		}
};