<?php

namespace chardev;

class ChardevHelper {
	public static function getUserUrl( \chardev\backend\entities\User $user, $category = "") {
		return \TemplateHelper::getBasePath() . 'user/' . FormatHelper::verboseUrl($user->getId(),$user->getName()) . ( $category ? '/' . $category : '' ) . '.html';
	}
}