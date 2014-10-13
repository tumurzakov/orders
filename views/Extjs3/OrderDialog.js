/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: OrderDialog.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author WilmarVB <wilmar@intermesh.nl>
 */
 
GO.orders.OrderDialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	
	customFieldType : "GO_Orders_Model_Order",
	
	initComponent : function(){
		
		Ext.apply(this, {
			titleField:'name',
			goDialogId:'order',
			title:GO.orders.lang.order,
			height: 560,
			formControllerUrl: 'orders/order'
		});
		
		GO.orders.OrderDialog.superclass.initComponent.call(this);	
	},
	
	buildForm : function () {
		
		this.selectLinkField = new GO.form.SelectLink({
			anchor:'100%'
		});

		this.propertiesPanel = new Ext.Panel({
			title:GO.lang['strProperties'],
			cls:'go-form-panel',
			layout:'form',
			labelWidth:160,
			items:[{
				xtype: 'textfield',
				name: 'name',
				width:300,
				anchor: '100%',
				maxLength: 100,
				allowBlank:false,
				fieldLabel: GO.lang.strName
			},
			this.selectLinkField,
			this.contentField = new Ext.form.TextArea({
				name: 'content',
				anchor: '100%',
				height: 280,
				hideLabel:true
			})]				
		});

		this.addPanel(this.propertiesPanel);
	}
});
