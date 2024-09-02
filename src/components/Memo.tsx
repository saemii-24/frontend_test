// MemoizedComponent.tsx
import React from "react";

// React.HTMLAttributes<HTMLDivElement>를 확장하여 div의 모든 속성을 포함
interface MemoizedComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

const MemoizedComponent: React.FC<MemoizedComponentProps> = ({
  count,
  ...rest
}) => {
  return (
    <div {...rest} style={{ cursor: "pointer", ...rest.style }}>
      Count: {count}
    </div>
  );
};

export default React.memo(MemoizedComponent);
