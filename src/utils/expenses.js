class Item {
  constructor(name, amount, id = null) {
    this.name = name;
    this.amount = amount;
    this.id = id;
  }
}

class Expenses {
  constructor(name, items = []) {
    this.name = name;
    this.items = items;
  }

  addItem(newItem) {
    if (!(newItem instanceof Item)) {
      console.error("Invalid item format. Must be an instance of Item.");
      return;
    }

    const existingItemIndex = this.items.findIndex(item => item.name === newItem.name);

    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].amount += newItem.amount;
    } else {
      this.items.push(newItem);
    }
  }

  updateItemAmount(name, newAmount) {
    if (newAmount <= 0) {
      console.error("Amount must be greater than zero.");
      return;
    }

    const itemToUpdate = this.items.find(item => item.name === name);

    if (itemToUpdate) {
      itemToUpdate.amount = newAmount;
    } else {
      console.error(`Item '${name}' not found in expenses.`);
    }
  }

  removeItem(name) {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.name !== name);

    if (this.items.length === initialLength) {
      console.error(`Item '${name}' not found in expenses.`);
    }
  }
}

export { Item, Expenses };
