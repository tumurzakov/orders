GO.orders.FilterPanel = function(config) {
    if (!config) {
        config = {};
    }

    config.items = [];

    var panels = GO.customfields.types['GO_Orders_Model_Order'].panels
    for(var i=0; i<panels.length; i++) {
        config.items.push(Ext.apply({
            layout: 'fit',
            animCollapse: false,
            collapsible: true,
            autoWidth: true,
            titleCollapse: true,
            collapseFirst: false,
            collapsed: true
        }, panels[i]));
    }

    config.items.push({
        layout: 'form',
        bodyStyle: 'padding: 10px;',
        title: 'Generic',
        border: false,
        items: [{
            xtype: 'textfield', 
            name: 'partner', 
            fieldLabel: 'Partner'
        },{
            xtype: 'datefield',
            name: 'from', 
            fieldLabel: 'From'
        },{
            xtype: 'datefield',
            name: 'to', 
            fieldLabel: 'To'
        },{
            layout: 'table',
            layoutConfig: {columns: 2},
            border: false,
            items:[{
                xtype: 'button',
                text: 'Search',
                scope: this,
                style: 'padding: 5px',
                handler: this.searchHandler
            },{
                xtype: 'button',
                text: 'Reset',
                scope: this,
                style: 'padding: 5px',
                handler: this.resetHandler
            }]
        }]
    });

	GO.orders.FilterPanel.superclass.constructor.call(this, config);	
}

GO.orders.FilterPanel = Ext.extend(GO.orders.FilterPanel, Ext.Panel, {
    title: GO.orders.lang.filter,
    collapsible:true,
    collapseMode:'mini',
    border:true,
    split:true,

    searchHandler: function() {
        this.relatedStore.baseParams = this.getParams();
        this.relatedStore.load();
    },

    resetHandler: function() {
        this.items.each(function(panel) {
            if (panel.items) {
                panel.items.each(function(item) {
                    if (item.getValue) {
                        item.setValue("");
                    }
                });
            }
        });
        this.searchHandler();
    },

    getParams: function() {
        var params = {};
        this.items.each(function(panel) {
            if (panel.items) {
                panel.items.each(function(item) {
                    if (item.getValue) {
                        params[item.name] = item.getValue();
                    }
                });
            }
        });
        return params;
    }
});
