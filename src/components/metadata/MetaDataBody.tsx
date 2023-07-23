import cx from "classnames";
import { getTheme } from "../../themes/getTheme";

interface MetaDataBodyProps {
  isPlaintiff: boolean;
  selectedTheme: string;
  children: React.ReactNode;
}

export const MetaDataBody: React.FC<MetaDataBodyProps> = ({
  isPlaintiff,
  selectedTheme,
  children,
}) => {
  return (
    <div
      className={cx("p-2 rounded-lg shadow w-full m-auto", {
        [`bg-${
          getTheme(selectedTheme)?.secondaryPlaintiff
        } border-darkPurple/25`]: isPlaintiff,
        [`bg-${
          getTheme(selectedTheme)?.secondaryDefendant
        } border-darkPetrol/25`]: !isPlaintiff,
      })}>
      {children}
    </div>
  );
};
