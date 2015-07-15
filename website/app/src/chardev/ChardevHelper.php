<?php

namespace chardev;

use chardev\backend\entities\User;

class ChardevHelper {
	public static function getUserUrl( User $user, $category = "") {
		return TemplateHelper::getBasePath() . 'user/' . FormatHelper::verboseUrl($user->getId(),$user->getName()) . ( $category ? '/' . $category : '' ) . '.html';
	}
}