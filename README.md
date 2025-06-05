# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.


## Instructions for this app in BTP
repo
https://anupamduttaroy@dev.azure.com/anupamduttaroy/Explore/_git/testExplore
anupam.duttaroy
dcbw7euwtwmsrrunuetrovzufcjmbdibiabnogn6mpvludewckxa
Om1xM3JqZmx6dGNia2R0c2RmNWdqam8yNDdtc3FsNmJjeWI2enNsYmhldTV4bDN2anppcmE=
-----------------------------------------------------------------------
cds init
schema.cds
namespace explore.db;

entity Products {
    key id: Integer;
    name: String(40);
    type: String(10);
    stock: Integer;
    unit: String(5);
    price: Integer;
    currency: String(5);
}
-----------------------------------------------------------------------
explore.db-Products.csv
id;name;type;stock;unit;price;currency
101;Mobile XX;Mobile;5;PC;15000;INR
201;Laptop XX;Laptop;10;PC;45001;INR
-----------------------------------------------------------------------
product-service.cds
using { explore.db as db } from '../db/schema';

service ProductService {

    entity Products as projection on db.Products;

}
-----------------------------------------------------------------------
cds add hana
package.json
"db": {
        "[production]": {
          "kind": "hana"
        },
        "[development]": {
          "kind": "sql"
        }
      }

npm install passport @sap/xssec @sap/xsenv
-----------------------------------------------------------------------
cds add mta
mta.yaml
	- npm install --production
        - npx -p @sap/cds-dk cds build --production

      disk-quota: 256MB
      memory: 256MB
-----------------------------------------------------------------------
Add managed approuter manually from the template
-----------------------------------------------------------------------
cds add xsuaa
package.json
"requires": {
      "auth": {
        "[production]": {
          "kind": "xsuaa"
        },
        "[development]": {
          "kind": "mocked"
        }
      }

*****21-05-2025---------------------------------------------------*****
The destination for the service is not getting added automatically. Add the following in the resources section
  - name: explore-destination-service
<few lines already available>
              - Authentication: NoAuthentication
                HTML5.DynamicDestination: true
                HTML5.ForwardAuthToken: true
                Name: explore-srv-api
                ProxyType: Internet
                Type: HTTP
                URL: ~{srv-api/srv-url}
<few lines already available>
    requires:
      - name: srv-api
*****21-05-2025---------------------------------------------------*****

----------------------------------------------------------------------
Then create fiori application from template and choose the service instance destination at the end
-----------------------------------------------------------------------

*****21-05-2025---------------------------------------------------*****
The routes in xs-app.json of Fiori app should look like this
  "routes": [
    {
      "source": "^/odata/(.*)$",
      "target": "/odata/$1",
      "destination": "explore-srv-api",
      "authenticationType": "xsuaa",
      "csrfProtection": false
    },
*****21-05-2025---------------------------------------------------*****

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
            { $Type: 'UI.DataField', Value: unit}
        ],
        HeaderFacets  : [
            { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Header', Label: 'Product Information'}
        ],
        Facets  : [
            { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#General', Label: 'General'}
        ],
        
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

*****21-05-2025---------------------------------------------------*****
manifest.json

"crossNavigation": {
      "inbounds": {
        "exploreprodui-inbound": {
          "signature": {
            "parameters": {},
            "additionalParameters": "allowed"
          },
          "semanticObject": "exploreproduct",
          "action": "manage",
          "title": "{{flpTitle}}",
          "subTitle": "{{flpSubtitle}}",
          "icon": "sap-icon://product"
        }
      }
    }
*****21-05-2025---------------------------------------------------*****