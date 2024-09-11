import React, { useEffect, useRef, useState } from "react";

/*[목표]
1. requestAnimationFrame으로 요소가 점차 작아지다가 size가 0이 되면 아예 dom에서 사라지게 함
2. waitForElemntTOberemove로 요소가 없어진지 확인
3. 해당 요소는 within 사용해 선택*/

export const RequestAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      let startTime: number | null = null;
      const shrink = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const scale = Math.max(1 - elapsed / 1000, 0); // 1초 동안 0으로 줄어듬

        if (elementRef.current) {
          elementRef.current.style.transform = `scale(${scale})`;
        }

        if (elapsed < 1000) {
          requestAnimationFrame(shrink);
        } else {
          setIsVisible(false); // 요소가 완전히 사라진 후 상태 변경
        }
      };

      requestAnimationFrame(shrink);
    }
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          className="bg-red-200 h-16"
          data-testid="shrinking-element"
          ref={elementRef}
        >
          박스
        </div>
      )}
    </div>
  );
};
