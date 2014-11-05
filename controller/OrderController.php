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
 * 
 * The Note controller
 * 
 */
class GO_Orders_Controller_Order extends GO_Base_Controller_AbstractModelController{
	
	protected $model = 'GO_Orders_Model_Order';
	
	protected function beforeStoreStatement(array &$response, array &$params, 
        GO_Base_Data_AbstractStore &$store, GO_Base_Db_FindParams $storeParams) {

        $columns = $store->getColumnModel()->getColumns();

        $filter = false;
        $criteria = GO_Base_Db_FindCriteria::newInstance();
        foreach($params as $name=>$value) {
            if (trim($value) !== "") {
                $filter = true;
                if (isset($columns[$name])) {
                    $criteria->addCondition($name, $value, '=', 'cf');
                }

                if ($name == 'partner') {
                    $storeParams->joinModel(array(
                        'model'=>'GO_Addressbook_Model_Company',
                        'localTableAlias'=>'t',
                        'localField'=>'partner_id', 
                        'foreignField'=>'id', 
                        'tableAlias'=>'p', 
                        'type'=>'LEFT'
                    ));
                    $criteria->addCondition('name', "%$value%", 'LIKE', 'p');
                }

                if ($name == 'from') {
                    $criteria->addCondition('mtime', strtotime($value), '>=');
                }

                if ($name == 'to') {
                    $criteria->addCondition('mtime', strtotime($value), '<=');
                }
            }
        }

        if ($filter) {
            $storeParams->criteria($criteria);
        }

		return parent::beforeStoreStatement($response, $params, $store, $storeParams);
	}

	protected function formatColumns(GO_Base_Data_ColumnModel $columnModel) {
		$columnModel->formatColumn('user_name','$model->user->name',array(),'user_id');
		$columnModel->formatColumn('partner_name','$model->partner->name',array(),'partner_id');
		return parent::formatColumns($columnModel);
	}

	protected function afterSubmit(&$response, &$model, &$params, $modifiedAttributes) {		
            if(GO::modules()->files){
                $f = new GO_Files_Controller_Folder();
                $f->processAttachments($response, $model, $params);
            }		
            return parent::afterSubmit($response, $model, $params, $modifiedAttributes);
	}
	
	protected function beforeSubmit(&$response, &$model, &$params) {
            $params['active'] = @$params['active'] == 'on' ? 1 : 0;
            return parent::beforeSubmit($response, $model, $params);
	}
	
	protected function beforeLoad(&$response, &$model, &$params) {		
		return parent::beforeLoad($response, $model, $params);
	}
	
	protected function afterLoad(&$response, &$model, &$params) {
        if ($model->partner) $response['data']['partner_name'] = $model->partner->name;
		return parent::afterLoad($response, $model, $params);
	}
	
	protected function beforeDisplay(&$response, &$model, &$params) {
        if ($model->partner) $response['data']['partner_name'] = $model->partner->name;
		return $response;
	}
	
	protected function afterDisplay(&$response, &$model, &$params) {
		return parent::afterDisplay($response, $model, $params);
	}
}

