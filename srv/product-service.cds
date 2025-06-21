using { explore.db as db } from '../db/schema';

service ProductService {

    entity Products as projection on db.Products
    
    actions {
    action AddStock(stock: Integer) returns String;
    }

}

annotate ProductService.Products with @(
    UI: {
        HeaderInfo  : {
            $Type : 'UI.HeaderInfoType',
            TypeName : 'Product',
            TypeNamePlural : 'Products',
            
        },
        SelectionFields  : [
            id, name, type
        ],
        LineItem  : [
            { $Type: 'UI.DataField', Value: id },
            { $Type: 'UI.DataField', Value: name },
            { $Type: 'UI.DataField', Value: type },
            { $Type: 'UI.DataField', Value: price },
            { $Type: 'UI.DataField', Value: stock},
            { $Type: 'UI.DataFieldForAnnotation', Target: '@UI.FieldGroup#Stock', Label: 'Stock'},
            { $Type: 'UI.DataField', Value: unit}
        ],
        HeaderFacets  : [
            { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Header', Label: 'Product Information'}
        ],
        Facets  : [
            { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#General', Label: 'General'}
        ],
        FieldGroup #Stock : {
            Data: [
                { $Type: 'UI.DataField', Value: stock},
                {
                    $Type : 'UI.DataFieldForAction',
                    Label : '{desc}',
                    Action : 'ProductService.AddStock',
                    Inline : true
                },
            ]
        },
        FieldGroup #Header : {
            Data: [
                { $Type: 'UI.DataField', Value: id },
                { $Type: 'UI.DataField', Value: name },
                { $Type: 'UI.DataField', Value: type },
            ]  
        },
        FieldGroup #General : {
            Data: [
                { $Type: 'UI.DataField', Value: stock },
                { $Type: 'UI.DataField', Value: unit },
                { $Type: 'UI.DataField', Value: price },
            ]  
        },
    }
) {
    id @( Common: { Label : 'Product ID' } );
    name @( Common: { Label : 'Description' } );
    type @(Common: {Label : 'Category',});
    price @(Common: {Label : 'Price',});
    stock @(Common: {Label : 'Available Stock',});
    unit @(Common: {Label : 'Unit',});
};