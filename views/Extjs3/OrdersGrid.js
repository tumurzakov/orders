/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: OrdersGrid.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */
 
GO.orders.OrdersGrid = function(config){
	
	if(!config)
	{
		config = {};
	}
	
	config.title = GO.orders.lang.orders;
	config.layout='fit';
	config.autoScroll=true;
	config.split=true;
	config.store = new GO.data.JsonStore({
		url: GO.url('orders/order/store'),		
		root: 'results',
		id: 'id',
		totalProperty:'total',
		fields: ['id','user_name','ctime','mtime','name','content'],
		remoteSort: true,
		model:"GO_Orders_Model_Order"
	});

	config.store.on('load', function()
	{
		if(config.store.reader.jsonData.feedback)
		{
			alert(config.store.reader.jsonData.feedback);
		}
	},this)

	config.paging=true;

	config.columns=[
		{
			header: GO.lang.strName,
			dataIndex: 'name',
			sortable: true
		},
		{
			header: GO.lang.strOwner,
			dataIndex: 'user_name',
			sortable: false,
			hidden:true
		},		{
			header: GO.lang.strCtime,
			dataIndex: 'ctime',
			hidden:true,
			sortable: true
		},		{
			header: GO.lang.strMtime,
			dataIndex: 'mtime',
			sortable: true
		}
		];
	
	config.view=new Ext.grid.GridView({
		autoFill: true,
		forceFit: true,
		emptyText: GO.lang['strNoItems']		
	});
	
	config.sm=new Ext.grid.RowSelectionModel();
	config.loadMask=true;
	
	this.searchField = new GO.form.SearchField({
		store: config.store,
		width:320
	});
		    	
	config.tbar = [GO.lang['strSearch'] + ':', this.searchField];
	
	GO.orders.OrdersGrid.superclass.constructor.call(this, config);
};


Ext.extend(GO.orders.OrdersGrid, GO.grid.GridPanel,{
	
});
