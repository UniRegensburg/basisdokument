import cx from "classnames";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { FloppyDisk, ImageSquare, PencilSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Button } from "../Button";
import { IEvidence } from "../../types";
import { useEvidence } from "../../contexts/EvidenceContext";
import { PopupContainer } from "../moveable-popups/PopupContainer";
import { ImageViewerPopup } from "../entry/ImageViewerPopup";
import { EvidencesPopup } from "../moveable-popups/EvidencePopup";

const toolbarOptions = {
  options: ["blockType", "inline", "list", "textAlign"],
  blockType: {
    inDropdown: true,
    options: ["Normal", "H3"],
    className: ["!mb-0 hover:shadow-none rounded text-black"],
  },
  inline: {
    className: ["!mb-0"],
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  list: {
    className: ["!mb-0"],
    options: ["unordered", "ordered"],
  },
  textAlign: {
    className: ["!mb-0"],
    options: ["left", "center", "right", "justify"],
  },
};

interface MetaDataFormProps {
  onAbort: (plainText: string, rawHtml: string) => void;
  onSave: (
    plainText: string,
    rawHtml: string,
    attachments: IEvidence[],
    plaintiffVolume: number,
    defendantVolume: number
  ) => void;
  defaultContent?: string;
  attachments: IEvidence[];
  isPlaintiff: boolean;
}

export const MetaDataForm: React.FC<MetaDataFormProps> = ({
  onAbort,
  onSave,
  defaultContent,
  attachments,
  isPlaintiff,
}) => {
  const [hidePlaceholder, setHidePlaceholder] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHtml = htmlToDraft(defaultContent || "");
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    return EditorState.createWithContent(contentState);
  });

  const contentState = editorState.getCurrentContent();
  //evidences from evidencePopup -> to save at onSave if there is no cancellation
  const [attachmentsToSave, setAttachmentsToSave] =
    useState<IEvidence[]>(attachments);
  const { plaintiffFileVolume, defendantFileVolume } = useEvidence();
  //fileVolumes from evidencePopup -> to save at onSave if there is no cancellation
  const [plaintiffFileVolumeToSave, setPlaintiffFileVolumeToSave] =
    useState<number>(plaintiffFileVolume);
  const [defendantFileVolumeToSave, setDefendantFileVolumeToSave] =
    useState<number>(defendantFileVolume);

  const [evidencePopupVisible, setEvidencePopupVisible] =
    useState<boolean>(false);

  const [imagePopupFilename, setImagePopupFilename] = useState<string>("");
  const [imagePopupData, setImagePopupData] = useState<string>("");
  const [imagePopupAttachment, setImagePopupAttachment] = useState<string>("");
  const [imagePopupTitle, setImagePopupTitle] = useState<string>("");
  const [imagePopupVisible, setImagePopupVisible] = useState<boolean>(false);

  useEffect(() => {
    setHidePlaceholder(
      () => contentState.getBlockMap().first().getType() !== "unstyled"
    );
  }, [contentState]);

  const showImage = (
    filedata: string,
    filename: string,
    attId: string,
    title: string
  ) => {
    setImagePopupVisible(!imagePopupVisible);
    setImagePopupData(filedata);
    setImagePopupAttachment(attId);
    setImagePopupFilename(filename);
    setImagePopupTitle(title);
  };

  return (
    <div
      className={cx("rounded-b-lg bg-white", {
        "RichEditor-hidePlaceholder": hidePlaceholder,
      })}>
      <Editor
        localization={{
          locale: "de",
          translations: {
            "components.controls.blocktype.normal": "Text",
            "components.controls.blocktype.h3": "Überschrift",
          },
        }}
        defaultEditorState={editorState}
        stripPastedStyles={true}
        onEditorStateChange={setEditorState}
        wrapperClassName={cx("w-full focus:outline-none")}
        editorClassName="p-6 min-h-[160px] overflow-visible"
        placeholder="Text eingeben..."
        toolbarClassName={cx(
          "p-2 relative rounded-none border border-x-0 border-t-0 border-lightGrey leading-none"
        )}
        toolbar={toolbarOptions}
      />
      <div className="flex border-t border-lightGrey rounded-b-lg px-3 py-2 items-center gap-2 justify-between">
        {attachmentsToSave && attachmentsToSave.length <= 0 ? (
          <div
            className="flex flex-col gap-2 items-center cursor-pointer"
            onClick={(e) => {
              setEvidencePopupVisible(true);
              e.stopPropagation();
            }}>
            <span className="italic">Keine Anlagen</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="ml-1 font-bold">
              {(attachmentsToSave.length === 1 ? "Anlage" : "Anlagen") + ":"}
            </span>
            <div className="flex flex-col flex-wrap gap-1">
              {attachmentsToSave &&
                attachmentsToSave.map((attachment, index) => (
                  <div className="flex flex-row items-center px-1" key={index}>
                    <div className="flex flex-row gap-2">
                      {attachmentsToSave.length !== 1 && (
                        <span className="w-4">{index + 1 + "."}</span>
                      )}
                      {attachment.hasAttachment ? (
                        <span className="break-words font-medium">
                          {attachment.name}
                          <b> als Anlage {attachment.attachmentId}</b>
                        </span>
                      ) : (
                        <span className="break-words font-medium">
                          {attachment.name}
                        </span>
                      )}
                      {attachment.hasImageFile && (
                        <ImageSquare
                          size={20}
                          className="text-mediumGrey hover:text-black"
                          onClick={() => {
                            showImage(
                              attachment.imageFile!,
                              attachment.imageFilename!,
                              attachment.attachmentId!,
                              attachment.name
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <Button
          icon={<PencilSimple size={20} />}
          onClick={() => {
            setEvidencePopupVisible(true);
          }}
          size="sm"
          bgColor="bg-offWhite hover:bg-lightGrey"
          textColor="font-bold text-darkGrey"></Button>
      </div>
      <div className="flex justify-end gap-2 p-3 pt-2 border-t border-lightGrey">
        <Button
          icon={<X size={20} />}
          onClick={() => {
            const plainText = editorState.getCurrentContent().getPlainText();
            const newHtml = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );

            onAbort(plainText, newHtml);
          }}
          size="sm"
          bgColor="bg-lightRed hover:bg-darkRed"
          textColor="font-bold text-darkRed hover:text-white">
          Abbrechen
        </Button>
        <Button
          icon={<FloppyDisk size={20} />}
          onClick={() => {
            const plainText = editorState.getCurrentContent().getPlainText();
            const newHtml = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );

            onSave(
              plainText,
              newHtml,
              attachmentsToSave,
              plaintiffFileVolumeToSave,
              defendantFileVolumeToSave
            );
          }}
          size="sm"
          bgColor="bg-lightGreen hover:bg-darkGreen"
          textColor="font-bold text-darkGreen hover:text-white">
          Speichern
        </Button>
      </div>
      {evidencePopupVisible && (
        <PopupContainer
          title={"Anlagen"}
          isVisible={evidencePopupVisible}
          setIsVisible={setEvidencePopupVisible}
          width={60}
          height={75}
          children={
            <EvidencesPopup
              isVisible={evidencePopupVisible}
              setIsVisible={setEvidencePopupVisible}
              isPlaintiff={isPlaintiff}
              isAttachmentInRubrum={true}
              evidences={attachmentsToSave}
              setEvidencesToSave={setAttachmentsToSave}
              setPlaintiffFileVolumeToSave={setPlaintiffFileVolumeToSave}
              setDefendantFileVolumeToSave={
                setDefendantFileVolumeToSave
              }></EvidencesPopup>
          }></PopupContainer>
      )}
      {imagePopupVisible && (
        <ImageViewerPopup
          isVisible={imagePopupVisible}
          filedata={imagePopupData}
          filename={imagePopupFilename}
          title={imagePopupTitle}
          attachmentId={imagePopupAttachment}
          setIsVisible={setImagePopupVisible}></ImageViewerPopup>
      )}
    </div>
  );
};
