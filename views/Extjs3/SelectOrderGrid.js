GO.orders.SelectOrderGrid = function(config) {
    if (!config) {
        config = {};
    }

    GO.orders.SelectOrderGrid.superclass.constructor.call(this, config);
}

GO.orders.SelectOrderGrid = Ext.extend(GO.orders.SelectOrderGrid, GO.orders.OrdersGrid, {});
