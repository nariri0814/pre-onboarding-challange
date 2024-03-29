import { useCallback, useEffect, useRef, useState } from "react";

import ItemList from "../components/ItemList";
import { getItems } from "../api/login";
import { Item } from "../types/user";

const PageA = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const isUserItemsFetched = useRef(false);

  const fetchUserItems = useCallback(async () => {
    const userItems = await getItems();

    if (userItems !== null) setItems(userItems);

    isUserItemsFetched.current = true;
  }, []);

  useEffect(() => {
    if (!isUserItemsFetched.current) fetchUserItems();
  }, []);

  return (
    <div>
      <h1>Page A</h1>
      <ItemList items={items} />
    </div>
  );
};

export default PageA;
