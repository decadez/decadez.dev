import {
  LinkButton as UiLinkButton,
  type LinkButtonProps,
} from "@decadez/web-dev-ui";

const LinkButton: React.FC<Omit<LinkButtonProps, "basePath">> = (props) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return <UiLinkButton {...props} basePath={basePath} />;
};

export default LinkButton;
