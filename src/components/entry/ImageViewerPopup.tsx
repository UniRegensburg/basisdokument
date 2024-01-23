import { CornersIn, CornersOut, X } from "phosphor-react";
import { useEvidence } from "../../contexts/EvidenceContext";
import { useState } from "react";
import cx from "classnames";

interface ImageViewerPopupProps {
  filename: string;
  filedata: string;
  attachmentId: string;
  title: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImageViewerPopup: React.FC<ImageViewerPopupProps> = ({
  filename,
  filedata,
  attachmentId,
  title,
  isVisible,
  setIsVisible,
}) => {
  const { getFileSize } = useEvidence();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  if (!isVisible) {
    return null;
  }

  const filetype = filedata.substring(
    filedata.indexOf(":") + 1,
    filedata.indexOf(";")
  );

  // source: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  const getFileDataBlob = (base64: string, base64Type: string) => {
    const base64Marker = ";base64,";
    const parts = base64.split(base64Marker);
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: base64Type });
  };

  const filedataurl =
    getFileSize(filedata) > 2000000
      ? URL.createObjectURL(getFileDataBlob(filedata, filetype))
      : filedata;

  return (
    <>
      <div className="opacity-25 fixed inset-0 z-50 bg-black !m-0" />
      <div className="w-fit h-fit justify-center -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 flex bg-white overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-5 rounded-md shadow-md">
        <div className="my-6 mx-auto">
          <div className="flex justify-between mb-5">
            <span className="font-bold text-xl self-end">{title}</span>
            <div className="flex gap-2 items-start">
              <button
                onClick={() => {
                  setIsFullscreen(!isFullscreen);
                }}
                className="text-darkGrey bg-offWhite p-1 rounded-md hover:bg-lightGrey">
                {isFullscreen ? (
                  <CornersIn size={24} />
                ) : (
                  <CornersOut size={24} />
                )}
              </button>
              <button
                onClick={() => {
                  setIsVisible(false);
                  URL.revokeObjectURL(filedataurl);
                }}
                className="text-darkGrey bg-offWhite p-1 rounded-md hover:bg-lightGrey">
                <X size={24} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-center w-full overflow-auto mb-3">
              <embed
                className={cx("", {
                  "w-[40vw] h-[50vh]": !isFullscreen,
                  "w-[90vw] h-[80vh]": isFullscreen,
                })}
                src={filedataurl + "#navpanes=0"} // hide the nav-panel of pdf-embed at first
                type={filetype}
                title={filename}></embed>
            </div>
            <span className="text-sm text-darkGrey opacity-80">{`${
              filetype.includes("image") ? "TIFF" : "PDF"
            } zu Anlage ${attachmentId}: ${filename}`}</span>
          </div>
          <span
            hidden={!filetype.includes("tiff")}
            className="text-xs pt-4 text-red-600">
            Hinweis: Eine TIFF-Vorschau ist derzeit leider nicht für alle
            Browser möglich. <br /> Bitte laden Sie das Basisdokument herunter,
            um alle Anlagen zu überprüfen.
          </span>
        </div>
      </div>
    </>
  );
};
