import useCountStore from "@/stores/counterStore";

const Display = () => {
  const count = useCountStore((state) => state.count);

  return (
    <div className="">
      <h1 data-testid="count" className="text-2xl font-medium">
        Count: {count}
      </h1>
    </div>
  );
};

export default Display;
