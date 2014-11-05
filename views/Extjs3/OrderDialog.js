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
			titleField:'id',
			goDialogId:'order',
			title:GO.orders.lang.order,
			height: 560,
			formControllerUrl: 'orders/order'
		});
		
		GO.orders.OrderDialog.superclass.initComponent.call(this);	
	},
	
	buildForm : function () {

        this.selectCompanyId = new Ext.form.Hidden({
            name: 'partner_id'
        });

        this.selectCompany = new GO.addressbook.SelectCompany({
            name: 'partner_name',
            fieldLabel: GO.orders.lang.partner,
            anchor:'100%'
        });

        this.selectCompany.on('change', function() {
            this.selectCompanyId.setValue(this.selectCompany.getValue());
        }, this);
		
		this.selectLinkField = new GO.form.SelectLink({
			anchor:'100%'
		});

		this.propertiesPanel = new Ext.Panel({
			title:GO.lang['strProperties'],
			cls:'go-form-panel',
			layout:'form',
			labelWidth:160,
			items:[{
				xtype: 'hidden',
				name: 'name'
			}, this.selectLinkField,
            this.selectCompanyId,
            this.selectCompany, {
				xtype: 'textfield',
				name: 'cost_price',
				width: 300,
				anchor: '100%',
				maxLength: 100,
				allowBlank:false,
				fieldLabel: GO.orders.lang.cost_price
			}, {
				xtype: 'textfield',
				name: 'sell_price',
				width: 300,
				anchor: '100%',
				maxLength: 100,
				allowBlank:false,
				fieldLabel: GO.orders.lang.sell_price
			}, {
				xtype: 'checkbox',
				name: 'active',
				anchor: '100%',
				fieldLabel: GO.orders.lang.active
			},

			this.contentField = new Ext.form.TextArea({
				name: 'content',
				anchor: '100%',
				height: 280,
				hideLabel:true
			}), {
                xtype: 'button',
                handler: this.fillHandler,
                text: GO.orders.lang.fill,
                scope: this
            }]
		});

		this.addPanel(this.propertiesPanel);
	},

    fillHandler: function() {
        this.selectOrderDialog = new GO.orders.SelectOrderDialog({});
        this.selectOrderDialog.show();
        this.selectOrderDialog.on('order_selected', this.orderSelectedHandler, this);
    },

    orderSelectedHandler: function(order) {
        console.log(order);
        this.formPanel.form.setValues(order);
    }

});
