namespace explore.db;

entity Products {
    key id: Integer;
    name: String(40);
    type: String(10);
    stock: Integer;
    unit: String(5);
    price: Integer;
    currency: String(5);
    virtual desc: String(20); 
    virtual addStockEnabled: Boolean;
    virtual criticalityInd: Integer;
    virtual stockCriticality: Integer;
}

view Prod as select from Products {
    sum(price) as TotalPrice: Integer,
    key type: String
} group by type;