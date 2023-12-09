import { useEffect, useRef } from "react";

export const useOnDrag = (
  moveIconRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>
) => {
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const moveIcon = moveIconRef.current;
    if (!moveIcon) return;
    const content = contentRef.current;
    if (!content) return;
    const body = content.parentElement;
    if (!body) return;

    const isWithinLeftBorder = (nextX: number) => {
      return -(content.clientWidth / 2) + moveIcon.clientWidth * 2 < nextX;
    };

    const isWithinRightBorder = (nextX: number) => {
      return nextX < body.clientWidth - content.clientWidth / 2;
    };

    const isWithinTopBorder = (nextY: number) => {
      return content.clientHeight / 2 < nextY;
    };

    const isWithinBottomBorder = (nextY: number) => {
      return (
        nextY <
        body.clientHeight + content.clientHeight / 2 - moveIcon.clientHeight * 2
      );
    };

    // reset to mid of the screen
    const onDoubleClick = () => {
      content.style.top = `${body.clientHeight / 2}px`;
      content.style.left = `${body.clientWidth / 2}px`;
    };

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      coords.current.lastX = content.offsetLeft;
      coords.current.lastY = content.offsetTop;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = content.offsetLeft;
      coords.current.lastY = content.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      // to make sure, moveIcon is still on screen
      if (
        isWithinLeftBorder(nextX) &&
        isWithinRightBorder(nextX) &&
        isWithinTopBorder(nextY) &&
        isWithinBottomBorder(nextY)
      ) {
        content.style.top = `${nextY}px`;
        content.style.left = `${nextX}px`;
      } else {
        onMouseUp();
      }
    };

    moveIcon.addEventListener("dblclick", onDoubleClick);
    moveIcon.addEventListener("mousedown", onMouseDown);
    moveIcon.addEventListener("mouseup", onMouseUp);
    body.addEventListener("mousemove", onMouseMove);
    body.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      moveIcon.removeEventListener("dblclick", onDoubleClick);
      moveIcon.removeEventListener("mousedown", onMouseDown);
      moveIcon.removeEventListener("mouseup", onMouseUp);
      body.removeEventListener("mousemove", onMouseMove);
      body.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [moveIconRef, contentRef]);
};
