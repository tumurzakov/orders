<?php

/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: File.class.inc.php 7607 2011-06-15 09:17:42Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */

/**
 * The Note model
 * 
 * @property int $id
 * @property int $files_folder_id
 * @property string $content
 * @property string $name
 * @property int $mtime
 * @property int $muser_id
 * @property int $ctime
 * @property int $user_id
 * 
 */
class GO_Orders_Model_Order extends GO_Base_Db_ActiveRecord {
	
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}
	
	protected function init() {
		$this->columns['name']['required']=true;
		
		return parent::init();
	}
	
	public function getLocalizedName(){
		return GO::t('order','orders');
	}
	
	public function tableName(){
		return 'or_orders';
	}
	
	public function hasFiles(){
		return true;
	}

	public function hasLinks() {
		return true;
	}

	public function customfieldsModel(){
		return "GO_Orders_Customfields_Model_Order";
	}

	public function relations(){
		return array();
	}

	protected function getCacheAttributes() {
		return array(
				'name' => $this->name,
				'description'=>''
		);
	}
	
	public function buildFilesPath() {
		return 'orders/' . GO_Base_Fs_Base::stripInvalidChars($this->category->name) . 
            '/' . date('Y', $this->ctime) . '/' . GO_Base_Fs_Base::stripInvalidChars($this->name).' ('.$this->id.')';
	}
	
}
