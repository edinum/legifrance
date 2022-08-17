<?php

class legifrance extends Plugins {
	public function enableAction (&$context, &$error) {
		if(!parent::_checkRights(LEVEL_ADMINLODEL)) { return; }
	}

	public function disableAction (&$context, &$error) {
		if(!parent::_checkRights(LEVEL_ADMINLODEL)) { return; }
	}

	public function postview (&$context) {
		$api_key = $this->_config['api_key']['value'];
		if(!parent::_checkRights(LEVEL_REDACTOR) || !$api_key || $context['view']['tpl'] !== 'edit_entities_edition' || $context['type']['class'] !== 'decisions' || $context['type']['type'] !== 'decision') return;
		$page = View::$page;
		$shareurl = $context['shareurl'];
		$script = '<script type="text/javascript" src="' . $shareurl . '/plugins/custom/legifrance/legifrance.js" data-apikey="' . $api_key . '"></script>';
		$re = '/<\/body>/';
		$replacement = $script . '</body>';
		$page = preg_replace($re, $replacement, $page);
		View::$page = $page;
	}
}
?>
