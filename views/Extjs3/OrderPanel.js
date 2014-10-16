/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: OrderPanel.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */
 
GO.orders.OrderPanel = Ext.extend(GO.DisplayPanel,{
	model_name : "GO_Orders_Model_Order",
	
	stateId : 'or-order-panel',

	editGoDialogId : 'order',
	
	editHandler : function(){
		GO.orders.showOrderDialog(this.model_id);		
	},	
		
	initComponent : function(){	
		
		this.loadUrl=('orders/order/display');
		
		this.encryptId=Ext.id();
		
		this.template = 

				'<table class="display-panel" cellpadding="0" cellspacing="0" border="0">'+
					'<tr>'+
						'<td colspan="2" class="display-panel-heading">'+GO.orders.lang.order+': #{id}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>'+GO.orders.lang.partner+':</td>'+
						'<td>{partner_name}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>'+GO.orders.lang.cost_price+':</td>'+
						'<td>{cost_price}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>'+GO.orders.lang.sell_price+':</td>'+
						'<td>{sell_price}</td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="2">{content}</td>'+
					'</tr>'+
				'</table>';																		
				
		if(GO.customfields)
		{
			this.template +=GO.customfields.displayPanelTemplate;
		}

		if(GO.tasks)
			this.template +=GO.tasks.TaskTemplate;

		if(GO.calendar)
			this.template += GO.calendar.EventTemplate;
		
		if(GO.workflow)
			this.template +=GO.workflow.WorkflowTemplate;

		this.template += GO.linksTemplate;	
				
		if(GO.files)
		{
			Ext.apply(this.templateConfig, GO.files.filesTemplateConfig);
			this.template += GO.files.filesTemplate;
		}
		Ext.apply(this.templateConfig, GO.linksTemplateConfig);
		
		if(GO.comments)
		{
			this.template += GO.comments.displayPanelTemplate;
		}		

		this.template += GO.createModifyTemplate;

		GO.orders.OrderPanel.superclass.initComponent.call(this);
	}
});
