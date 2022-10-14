export type PurchaseEvent = BuyGroceriesEvent | ReturnGroceriesEvent;

export type BuyGroceriesEvent = {
  action: 'buyGroceries';
  items: string[];
};

type GroceryReturn = {
  itemName: string;
  reason: string;
};

export type ReturnGroceriesEvent = {
  action: 'returnGroceries';
  returns: GroceryReturn[];
};
