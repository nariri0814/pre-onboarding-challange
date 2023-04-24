import { useCallback, useEffect, useRef, useState } from "react";
import ItemList from "../components/ItemList";

import { getAllItems } from "../api/login";

import { Item } from "../types/user";

const AdminPage = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const isUserItemsFetched = useRef(false);

  const fetchUserItems = useCallback(async () => {
    const userItems = await getAllItems();

    if (userItems !== null) setItems(userItems);

    isUserItemsFetched.current = true;
  }, []);

  useEffect(() => {
    if (!isUserItemsFetched.current) fetchUserItems();
  }, []);

  return (
    <div>
      <h1>AdminPage</h1>
      <p>
        roles 배열 안에 'admin'을 가진 유저에게만 접근을 허용합니다. 또한, 모든
        아이템 목록을 가져옵니다. (어드민 전용 API)
      </p>
      <ItemList items={items} />
    </div>
  );
};

export default AdminPage;
