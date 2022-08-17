<?php

class legifrance extends Plugins {
	public function enableAction (&$context, &$error) {
		if(!parent::_checkRights(LEVEL_ADMINLODEL)) { return; }
	}

	public function disableAction (&$context, &$error) {
		if(!parent::_checkRights(LEVEL_ADMINLODEL)) { return; }
	}

	public function postview (&$context) {
		$authurl = $this->_config['authurl']['value'];
		$apiurl = $this->_config['apiurl']['value'];
		$clientid = $this->_config['clientid']['value'];
		$clientsecret = $this->_config['clientsecret']['value'];
		if(!parent::_checkRights(LEVEL_REDACTOR) || !$authurl || !$apiurl ||!$clientid || !$clientsecret || $context['view']['tpl'] !== 'edit_entities_edition' || $context['type']['class'] !== 'decisions' || $context['type']['type'] !== 'decision') return;
		$page = View::$page;
		$shareurl = $context['shareurl'];
		$script = '<script type="text/javascript" src="' . $shareurl . '/plugins/custom/legifrance/legifrance.js" data-authurl="' . $authurl . '" data-apiurl="' . $apiurl . '" data-clientid="' . $clientid . '" data-clientsecret="' . $clientsecret . '"></script>';
		$re = '/<\/body>/';
		$replacement = $script . '</body>';
		$page = preg_replace($re, $replacement, $page);
		View::$page = $page;
	}
}
?>
