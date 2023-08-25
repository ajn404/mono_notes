import React from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";

const NeDemo = () => {
  return (
    <AvatarGroup max={3} total={5}>
      <Avatar src="/imgs/hutao1.webp" />
      <Avatar src="/imgs/hutao2.webp" />
      <Avatar src="/imgs/hutao3.webp" />
      <Avatar src="/imgs/hutao4.webp" />
      <Avatar src="/imgs/hutao5.webp" />
    </AvatarGroup>
  );
};

export default NeDemo;
