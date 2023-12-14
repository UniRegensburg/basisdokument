import { useRef } from "react";
import { useOnDrag } from "../../hooks/use-on-drag";
import { ArrowsOutCardinal, X } from "phosphor-react";

interface PopupContainerProps {
  title: String;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export const PopupContainer: React.FC<PopupContainerProps> = ({
  title,
  isVisible,
  setIsVisible,
  width,
  height,
  children,
}) => {
  const popupRef = useRef(null);
  const moveIconRef = useRef(null);
  useOnDrag(moveIconRef, popupRef);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="opacity-25 fixed inset-0 z-40 bg-black !m-0" />
      <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
        <div
          ref={popupRef}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[${width}vw] h-[${height}vh]`}>
          <div
            ref={moveIconRef}
            className="float-right text-darkGrey bg-lightGrey rounded-sm opacity-50 hover:opacity-100 p-[2px] items-center -m-[20px]">
            <ArrowsOutCardinal size={18} />
          </div>
          <div className="bg-white rounded-lg content-center shadow-lg space-y-8 p-8 overflow-y-auto w-full h-full">
            <div className="flex items-start justify-between rounded-lg ">
              <h3>{title}</h3>

              <button
                onClick={() => {
                  setIsVisible(false);
                }}
                className="text-darkGrey bg-offWhite p-1 rounded-md hover:bg-lightGrey">
                <X size={24} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
