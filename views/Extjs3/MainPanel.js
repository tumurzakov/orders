/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: MainPanel.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */

 
GO.orders.MainPanel = function(config){
	
	if(!config)
	{
		config = {};
	}

	this.westPanel= new Ext.Panel({
		region:'west',
        id: 'or-west-panel',
		title:GO.orders.lang.filter,
        items:[{
            border: false,
            html: 'Filter'
        }],
		width: 210,
		split:false
	});

	this.centerPanel = new GO.orders.OrdersGrid({
		region:'center',
		id:'no-center-panel',
		border:true
	});
	
	this.centerPanel.on("delayedrowselect",function(grid, rowIndex, r){
		this.eastPanel.load(r.data.id);		
	}, this);

	this.centerPanel.on('rowdblclick', function(grid, rowIndex){
		this.eastPanel.editHandler();
	}, this);
	
	this.eastPanel = new GO.orders.OrderPanel({
		region:'east',
		id:'or-east-panel',
		width:440,
		collapsible:true,
		collapseMode:'mini',
		border:true,
        split: false,
	});
	
	config.tbar=new Ext.Toolbar({
		cls:'go-head-tb',
		items: [{
			grid: this.centerPanel,
			xtype:'addbutton',
			handler: function(b){
				this.eastPanel.reset();

				GO.orders.showOrderDialog(0);
			},
			scope: this
		},{
			xtype:'deletebutton',
			grid:this.centerPanel,
			handler: function(){
				this.centerPanel.deleteSelected({
					callback : this.eastPanel.gridDeleteCallback,
					scope: this.eastPanel
				});
			},
			scope: this
		}
		]
		});

	config.items=[
	this.westPanel,
	this.centerPanel,
	this.eastPanel
	];	
	
	config.layout='border';
	GO.orders.MainPanel.superclass.constructor.call(this, config);	
};


Ext.extend(GO.orders.MainPanel, Ext.Panel, {
	afterRender : function()
	{
		GO.dialogListeners.add('order',{
			scope:this,
			save:function(){
				this.centerPanel.store.reload();
			}
		});

		GO.orders.MainPanel.superclass.afterRender.call(this);
	}
});

GO.orders.showOrderDialog = function(order_id, config){

	if(!GO.orders.orderDialog)
		GO.orders.orderDialog = new GO.orders.OrderDialog();
	
	GO.orders.orderDialog.show(order_id, config);
}


/*
 * This will add the module to the main tabpanel filled with all the modules
 */
 
GO.moduleManager.addModule('orders', GO.orders.MainPanel, {
	title : GO.orders.lang.orders,
	iconCls : 'go-tab-icon-orders'
});
/*
 * If your module has a linkable item, you should add a link handler like this. 
 * The index (no. 1 in this case) should be a unique identifier of your item.
 * See classes/base/links.class.inc for an overview.
 * 
 * Basically this function opens a project window when a user clicks on it from a 
 * panel with links. 
 */

GO.linkHandlers["GO_Orders_Model_Order"]=function(id){
	if(!GO.orders.linkWindow){
		var orderPanel = new GO.orders.OrderPanel();
		GO.orders.linkWindow= new GO.LinkViewWindow({
			title: GO.orders.lang.order,
			items: orderPanel,
			orderPanel: orderPanel,
			closeAction:"hide"
		});
	}
	GO.orders.linkWindow.orderPanel.load(id);
	GO.orders.linkWindow.show();
	return GO.orders.linkWindow;
}

GO.linkPreviewPanels["GO_Orders_Model_Order"]=function(config){
	config = config || {};
	return new GO.orders.OrderPanel(config);
}


/* {LINKHANDLERS} */


GO.newMenuItems.push({
	text: GO.orders.lang.order,
	iconCls: 'go-model-icon-GO_Orders_Model_Order',
	handler:function(item, e){		
		GO.orders.showOrderDialog(0, {
			link_config: item.parentMenu.link_config			
		});
	}
});
/* {NEWMENUITEMS} */
