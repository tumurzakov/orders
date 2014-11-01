GO.orders.SelectOrderDialog = function(config) {
    if (!config) {
        config = {};
    }

	this.centerPanel = new GO.orders.SelectOrderGrid({
		region:'center',
		id:'or-select-order-panel',
		border:true,
        height: 400
	});

	this.westPanel= new GO.orders.FilterPanel({
		region:'west',
        id: 'or-select-filter-panel',
		width: 300,
        collapsible: false,
		border: true,
		split: true,
        height: 400,
		relatedStore: this.centerPanel.store
	});

    this.panel = new Ext.Panel({
        layout: 'border',
        items: [this.westPanel, this.centerPanel]
    });

    config.items = this.panel;

    config.buttons = [{
        xtype: 'button',
        text: GO.orders.lang.select,
        handler: this.selectHandler,
        scope: this
    },{
        xtype: 'button',
        text: GO.orders.lang.cancel,
        handler: this.cancelHandler,
        scope: this
    }]

	GO.orders.SelectOrderDialog.superclass.constructor.call(this, config);	
}

GO.orders.SelectOrderDialog = Ext.extend(GO.orders.SelectOrderDialog, Ext.Window, {
    layout: 'fit',
    width: 1000,
    height: 430,
    selectHandler: function() {
        var selected = this.centerPanel.getSelectionModel().getSelected();
        if (selected) {
            var order = selected.data;
            delete order.id;
            delete order.active;
            delete order.ctime;
            delete order.mtime;
            this.fireEvent('order_selected', order);
            this.close();
        }
    },
    cancelHandler: function() {
        this.close();
    }
});
