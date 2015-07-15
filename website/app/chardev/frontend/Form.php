<?php

namespace chardev\frontend;

class Form {
	protected static $counter = 0;
	protected $html = "";
	protected $ctrls = array();
	protected $id = "";
	protected $tabIndex = 0;
	protected $action = "";
	
	public function __construct( $action = "") {
		$this->id = "__chardev_form_" . ( self::$counter ++ );
		$this->action = $action;
	}
	
	public function addInput( $title, $postVar, $restrictions = "") {
		return $this->add(array('type' => 'input', 'post_var' => $postVar, 'title' => $title, 'restrictions' => $restrictions));	
	}
	
	public function addSecret( $title, $postVar, $restrictions = "") {
		return $this->add(array('type' => 'secret', 'post_var' => $postVar, 'title' => $title, 'restrictions' => $restrictions));	
	}
	
	public function addPassword( $title, $postVar, $restrictions = "") {
		return $this->add(array('type' => 'password', 'post_var' => $postVar, 'title' => $title, 'restrictions' => $restrictions));	
	}
	
	public function addCheckbox( $title, $postVar, $checked = true ) {
		return $this->add(array('type' => 'checkbox', 'post_var' => $postVar, 'title' => $title, 'checked' => $checked));
	}
	
	private function add($arr) {
		$n = count($this->ctrls);
		$arr['id'] = $this->id . '_ctrl_' . count($this->ctrls);
		$arr['tab_index'] = self::$counter * 1000 + ($this->tabIndex ++);
		$this->ctrls[$n] = $arr;
		return $n;
	}
	
	public function addSelect( $title, $postVar, $options) {
		return $this->add(array( 'type' => 'select', 'post_var' => $postVar, 'title' => $title, 'options' => $options));
	}
	
	public function addSubmit( $title ) {
		return $this->add(array('type' => 'submit', 'title' => $title ));	
	}
	
	public function addHidden( $postVar, $value ) {
		$n = count($this->ctrls);
		$this->ctrls[$n] = array('type' => 'hidden', 'post_var' => $postVar, 'value' => $value);
		return $n;
	}
	
	public function addError( $str ) {
		$n = count($this->ctrls);
		$this->ctrls[$n] = array('type' => 'error', 'text' => $str);
		return $n;
	}
	
	protected function compile() {
?>		
		<script type="text/javascript">
		<!--
		$(function() {
			var id = "<?php echo $this->id ?>";
			$('#' + id).submit(function() {
				var ctrls = <?php echo json_encode($this->ctrls)?>;
				var valid = true;
				for( var k in ctrls) {
					valid = FormValidator.validate( ctrls[k], ctrls) && valid;
				}
				return valid;
			});
		});
		//-->
		</script>
		<form id="<?php echo $this->id?>" action='<?php echo $this->action ?>' method='post'>
			<div class='im_sa_p'>
				<?php 
					foreach( $this->ctrls as $ctrl ): 
						switch( $ctrl['type'] ):
							case 'input':
							case 'password':
							case 'checkbox':
							case 'secret':
							case 'select':
				?>
				<div class='im_sa_r'>
					<div class='im_sa_left'><?php echo $ctrl['title'] ?></div>
					<div class='im_sa_right'>
				<?php 
								if( $ctrl['type'] == 'input' ||  $ctrl['type'] == 'secret' ) :
				?>
						<input 
							tabindex='<?php echo $ctrl['tab_index'] ?>' 
							class='input im_sa_in' 
							<?php echo $ctrl['type'] == 'secret' ? 'type="password"' : "" ?>
							id='<?php echo $ctrl['id'] ?>' 
							name='<?php echo $ctrl['post_var']?>' 
							value='<?php echo isset($_POST[$ctrl['post_var']]) ? htmlspecialchars($_POST[$ctrl['post_var']]) : "" ?>' 
						/>
				<?php 
								elseif( $ctrl['type'] == 'checkbox' ) :
				?>
						<input 
							tabindex='<?php echo $ctrl['tab_index'] ?>' 
							class='checkbox im_sa_check' 
							id='<?php echo $ctrl['id'] ?>' 
							name='<?php echo $ctrl['post_var']?>' 
							checked='<?php echo $ctrl['checked'] ? 'checked' : '' ?>' 
							type='checkbox'
						/>
				<?php 
								elseif( $ctrl['type'] == 'select' ) :
				?>
						<select
							tabindex='<?php echo $ctrl['tab_index'] ?>' 
							class='select im_sa_select' 
							id='<?php echo $ctrl['id'] ?>' 
							name='<?php echo $ctrl['post_var']?>' 
						>
						<?php 
								foreach( $ctrl['options'] as $key => $value ):
						?>
							<option value="<?php echo $key?>"><?php echo $value?></option>
						<?php 
								endforeach;
						?>
						
						</select>
				<?php 
								else:
				?>
						<input 
							tabindex='<?php echo $ctrl['tab_index'] ?>' 
							class='input im_sa_in' 
							type='password' 
							id='<?php echo $ctrl['id'] . '_plain' ?>'
						/>
						<input 
							class='input im_sa_in' 
							type='hidden' 
							id='<?php echo $ctrl['id'] . '_hash' ?>' 
							name='<?php echo $ctrl['post_var']?>'
						/>
				<?php 
								endif;
				?>
					</div>
				</div>
				<div class='clear_both'></div>
				<?php 
							break;
							case 'submit': ?>
				<div class='im_sa_b'><input class='button button_light' type='submit' tabindex='<?php echo $ctrl['tab_index'] ?>'  value='<?php echo $ctrl['title']?>' /></div>
				<?php  
							break;
							case 'hidden': ?>
				<input name='<?php echo $ctrl['post_var']?>' type='hidden' value='<?php echo htmlspecialchars($ctrl['value']) ?>'/>
				<?php  
							break;
							case 'error': ?>
				<div class='im_sa_e'><?php echo $ctrl['text'] ?></div>
				<?php  
							break;
						endswitch;
					endforeach;
				?>
			</div>
		</form>
<?php
	}
	
	public function getHtml() {
		if( ! $this->html ) {
			ob_start();
			$this->compile();
			$this->html = ob_get_contents();
			ob_end_clean();
		}
		return $this->html;
	}
	
	public function getId() {
		return $this->id;
	}
}