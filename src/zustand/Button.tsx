import useCountStore from "@/stores/counterStore";

const Button: React.FC = () => {
  const increment = useCountStore((state) => state.increment);

  const incrementClick = () => {
    increment();
  };

  const decrement = useCountStore((state) => state.decrement);

  const decrementClick = () => {
    decrement();
  };

  return (
    <>
      <button className="w-10 h-8 bg-red-400" onClick={decrementClick}>
        -
      </button>
      <button className="w-10 h-8 bg-blue-400" onClick={incrementClick}>
        +
      </button>
    </>
  );
};

export default Button;
