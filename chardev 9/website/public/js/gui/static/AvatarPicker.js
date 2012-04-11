/**
 * @constructor
 * @param {string} parentId
 * @param {string} currentAvatar
 */
function AvatarPicker( parentId, currentAvatar ) {
	this.parent = DOM.get(parentId);
	this.currentAvatar = currentAvatar;
	
	this.showCurrent();
}

AvatarPicker.prototype = {
	parent: "",
	currentAvatar: "",
	page: 1,
	pick: function( page ) {
		Ajax.request("api/icons.php"+TextIO.queryString({'page':page}), new Handler(this.__callback, this), []);
		Tooltip.showLoading();
	},
	__callback: function(response){
		try  {
			var obj = Ajax.getResponseObject(response);
			
			var srcs = obj[0];
			var tot = obj[1];
			var pp = obj[2];
			var mp = Math.ceil(tot / pp);
			this.page = obj[3];
			
			
			var div = DOM.create('div',{'class':'ui_avatar_container'});
			

			var cl = DOM.createAt(div,'a', {"class":"close ui_avatar_close", "href": "javascript:;"});
			Listener.add(cl, 'click', Tooltip.enable, Tooltip, []);
			
			var imgDiv = DOM.createAt(div, 'div',{'class': 'ui_avatar_img_container'});
			for( var k in srcs ) {
				var a = DOM.createAt( imgDiv, 'a', {'title': srcs[k], 'href': 'javascript:;'});
				DOM.createAt(a,'img', {'class': 'ui_avatar_preview_img', 'src': '/images/icons/large/'+srcs[k]+'.png'});
				Listener.add(a,'click',this.__select,this,[srcs[k]]);
			}
			
			var lp = DOM.createAt(div, 'div',{'class':'ui_avatar_container_lf'});
			var cp = DOM.createAt(div, 'div',{'class':'ui_avatar_container_c'});
			var rp = DOM.createAt(div, 'div',{'class':'ui_avatar_container_rf'});
			
			if( this.page > 1 ) { 
				var pb = DOM.createAt(lp, 'a', { 'href': 'javascript:;','class': 'button button_light ui_avatar_page_btn', 'text': locale['previous']});
				Listener.add(pb, 'click', this.pick, this, [this.page - 1]);
			}
			
			DOM.createAt(cp, 'span', {'text': this.page+" "+locale['of']+" "+mp});
			
			if( this.page < mp ) { 
				var nb = DOM.createAt(rp, 'a', {'href': 'javascript:;','class': 'button button_light ui_avatar_page_btn', 'text': locale['next']});
				Listener.add(nb, 'click', this.pick, this, [this.page + 1]);
			}
			
			DOM.clear(div);
			
			DOM.createAt(div,'div', {"class":"tt_note", "text": "Press Escape to return"});
			
			Tooltip.showDisabled(div);
		}
		catch( e ) {
			Tooltip.showError(e);
		}
		
	},
	__select: function(avatar) {
		Tooltip.showLoading();
		Ajax.request("api/user.php"+TextIO.queryString({'Avatar':avatar}), new Handler(this.__select_callback, this), []);
	},
	__select_callback: function(response) {
		this.currentAvatar = Ajax.getResponseObject(response);
		this.showCurrent();
		Tooltip.enable();
	},
	showCurrent: function() {

		DOM.truncate(this.parent);
		
		var a = DOM.createAt( this.parent, 'a', {'href': 'javascript:;'});
		Listener.add(a,'click', this.pick, this, [0]);
		
		if( this.currentAvatar) {
			DOM.createAt(a, 'img', {'class': 'ui_avatar_img', 'src': '/images/icons/large/'+this.currentAvatar+'.png'});
		}
		else {
			DOM.createAt(a, 'span', {'text': 'Select an avatar'});
		}
	}
};