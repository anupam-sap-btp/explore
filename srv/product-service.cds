using {explore.db as db} from '../db/schema';

service ProductService {
    view totals as select from db.Prod;
    type object {
        id          : String;
        event       : String;
        severity    : String;
        description : String;
        details     : array of Integer;
    };

    action UpdateStatus(payload : object) returns String;
    action UpdateStockForAll( payload: array of Products) returns String;

    // @odata.draft.enabled
    entity Products as projection on db.Products

        actions {
            @Core.OperationAvailable: in.addStockEnabled
            @Common.SideEffects     : {
                TargetProperties: [
                    'in/stock',
                    'in/addStockEnabled',
                    'in/criticalityInd'
                ],
                TargetEntities  : ['/ProductService.EntityContainer/Products']
            }
            action AddStock(stock : Integer) returns String;
        };

// @Common.SideEffects: {TargetEntities: ['/ProductService.EntityContainer/Products']}
// action unBoundAction();

}

annotate ProductService.Products with @(UI: {
    HeaderInfo               : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Product',
        TypeNamePlural: 'Products',

    },
    SelectionFields          : [
        id,
        name,
        type,
        stock
    ],
    LineItem.@UI.Criticality : criticalityInd,
    LineItem                 : [
        {
            $Type             : 'UI.DataFieldForAnnotation',
            Target            : '@UI.Chart#stockChart',
            Label             : 'Stock Level'
        },
        {
            $Type: 'UI.DataField',
            Value: id
        },
        {
            $Type: 'UI.DataField',
            Value: name
        },
        {
            $Type: 'UI.DataField',
            Value: type
        },
        {
            $Type: 'UI.DataField',
            Value: price
        },
        {
            $Type: 'UI.DataField',
            Value: stock
        },
        // {
        //    $Type: 'UI.DataFieldForAction',
        //    Action: 'ProductService.EntityContainer/UpdateStockForAll', 
        //    Label: 'Add Stock to All',
        //  },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target: '@UI.FieldGroup#Stock',
            Label : 'Stock'
        },
        {
            $Type: 'UI.DataField',
            Value: unit
        },
    // { Criticality: #Positive, Value: '' }
    //             {
    //     $Type  : 'UI.DataFieldForAction',
    //     Label   : 'Activate',
    //     Action : 'ProductService.EntityContainer/unBoundAction'
    // }

    ],
    DataPoint #stockChart : { 
        Value : stock,
        TargetValue : 20,
        Criticality : stockCriticality,
    },
    Chart #stockChart : {
    Title : 'Stock Chart',
    Description : 'Stock Micro Chart',
    ChartType : #Donut,
    Measures : [stock],
    MeasureAttributes : [{
            $Type : 'UI.ChartMeasureAttributeType',
            Measure : stock,
            Role : #Axis1,
            DataPoint : '@UI.DataPoint#stockChart',
    }]
    },
    HeaderFacets             : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#Header',
        Label : 'Product Information'
    }],
    Facets                   : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#General',
        Label : 'General'
    }],
    FieldGroup #Stock        : {Data: [
        {
            $Type : 'UI.DataFieldForAction',
            Label : '{desc}',
            Action: 'ProductService.AddStock',
            Inline: true
        },
    ]},
    FieldGroup #Header       : {Data: [
        {
            $Type: 'UI.DataField',
            Value: id
        },
        {
            $Type: 'UI.DataField',
            Value: name
        },
        {
            $Type: 'UI.DataField',
            Value: type
        },
    ]},
    FieldGroup #General      : {Data: [
        {
            $Type: 'UI.DataField',
            Value: stock
        },
        {
            $Type: 'UI.DataField',
            Value: unit
        },
        {
            $Type: 'UI.DataField',
            Value: price
        },
    ]},
}) {
    // id    @(Common: {Label: 'Product ID', FilterDefaultValue : 101,});
    id    @(Common: {Label: 'Product ID'});
    name  @(Common: {Label: 'Description'});
    type  @(Common: {Label: 'Category',
    });
    price @(Common: {Label: 'Price',
    });
    stock @(Common: {Label: 'Available Stock',
    });
    unit  @(Common: {Label: 'Unit',
    });
};
