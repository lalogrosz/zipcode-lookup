import { ZipCode } from "../providers/appProvider";
import cn from "classnames";

const cardType = {
  big: {
    width: "max-w-sm",
    title: "text-3xl",
    subtitle: "text-2xl",
    text: "text-xl"
  },
  small: {
    width: "max-w-xs",
    title: "text-lg",
    subtitle: "text-xs",
    text: "text-xs"
  }
};

interface Props extends ZipCode {
  type: "big" | "small";
  className?: string;
}

const ZipcodeCard = (props: Props) => {
  const sizes = props.type === "big" ? cardType.big : cardType.small;
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700",
        sizes.width,
        props.className
      )}
    >
      <div className="p-5">
        <a href="#">
          <h5 className={cn("mb-2 font-bold tracking-tight text-gray-900 dark:text-white", sizes.title)}>
            Zip code {props?.zipcode}
          </h5>
          <h6 className={cn("mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white", sizes.subtitle)}>
            {props?.country}
          </h6>
        </a>
        <p className={cn("mb-3 font-normal text-gray-700 dark:text-gray-400", sizes.text)}>
          {props?.city}, {props?.state}
        </p>
      </div>
    </div>
  );
};

export default ZipcodeCard;
