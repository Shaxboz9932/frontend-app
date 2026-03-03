import { useState } from "react";

export default function InputQuantityCom({qty, handleUpdateQty, id}) {
  const [quantity, setQuantity] = useState(Number(qty));
  const increment = () => {
    const newQty = quantity + 1
    setQuantity(newQty);
    handleUpdateQty(id, newQty)
  };
  const decrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1
      setQuantity(newQty);
      handleUpdateQty(id, newQty)
    }
  };
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
