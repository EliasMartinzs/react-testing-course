import { useState } from "react";

export type ItemCategory = "urgent" | "important" | "normal" | "low";

export type Item = {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
};

export type ItemWithoutId = Omit<Item, "id">;

export const useFlowManager = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (newItems: ItemWithoutId) => {
    setItems([...items, { ...newItems, id: Date.now().toString() }]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return { items, handleAddItem, handleDeleteItem };
};
