// components/CounterDisplay.tsx
import useCountStore from "@/stores/counterStore";

const Display: React.FC = () => {
  const count = useCountStore((state) => state.count);

  return (
    <div className="">
      <h1 className="text-2xl font-medium">Count: {count}</h1>
    </div>
  );
};

export default Display;
