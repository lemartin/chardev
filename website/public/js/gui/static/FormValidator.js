var FormValidator = {};

(function() {
	function getElement( ctrl ) {
		return $( '#' + ctrl['id'] + ( ctrl['type'] == 'password' ? '_plain' : '' ));
	}
	
	FormValidator.validate = function( ctrl, ctrls ) {
		var el = getElement(ctrl);
		
		el.parent().children().remove(".fm_in_err_p");
		el.removeClass('fm_in_err_b');
		
		if( ! ctrl["type"].match(/input|password|secret/) ) {
			return true;
		}
		
		var restrictions = ctrl["restrictions"].split(",");
		var value = el.val();
		
		var valid = true;
		
		for( var i = 0; i < restrictions.length; i++ ) {
			switch( restrictions[i] ) {
			case 'alnum':
				if( ! value.match(/^[a-zA-Z0-9]+$/) ) {
					showError(el, "Invalid characters found: " + value.replace(/([^a-zA-Z0-9]+)/g, '<span class="fm_malformed_character">$1</span>'));
					valid = false;
				}
				break;
			case 'alpha':
				if( ! value.match(/^[a-zA-Z]+$/) ) {
					showError(el, "Invalid characters found: " + value.replace(/([^a-zA-Z]+)/g, '<span class="fm_malformed_character">$1</span>'));
					valid = false;
				}
				break;
			case 'num':
				if( ! value.match(/^[0-9]+$/) ) {
					showError(el, "Invalid characters found: " + value.replace(/([^0-9]+)/g, '<span class="fm_malformed_character">$1</span>'));
					valid = false;
				}
				break;
			case 'email':
				if( ! value.match(/^.+@.+\.\w{2,6}$/) ) {
					showError(el, "Invalid e-mail address");
					valid = false;
				}
				break;
			default: 
				var matches;
				if( matches = restrictions[i].match(/^min=(\d+)$/)) {
					if( value.length < matches[1] ) {
						showError(el, "Input is too short - Minimum length: " + matches[1] );
						valid = false;
					}
				}
				else if( matches = restrictions[i].match(/^repeat of (\d+)$/)) {
					var cp = ctrls[matches[1]];
					var cpEl = getElement(cp);
					if( value != cpEl.val()) {
						showError(el, "Input doesn't match " + cp['title']);
						valid = false;
					}
				}
				break;
			}
		}
		
		if( ctrl['type'] == 'password' ) {
			$( '#' + ctrl['id'] + '_hash' ).val(MD5(value));
		}
		
		return valid;
	};
	
	function showError( el, error) {
		var div = $("<div class='fm_in_err_p' />").html(error);
		el.parent().append(div);
		el.addClass('fm_in_err_b');
	}
}());

if( ! window["FormValidator"] ) {
	window["FormValidator"] = {
		"validate": FormValidator.validate 
	};
}