import React, { useState } from "react";
import { Button } from "./ui/button";

export const Sidebar = ({ str }: { str?: string }) => {
  const [count, setCount] = useState(0);
  return (
    <div className="font-bold">
      Sidebar from React {str}
      <Button onClick={() => setCount(count + 1)}>test {count}</Button>
    </div>
  );
};
