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
}
