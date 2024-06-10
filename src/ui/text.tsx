import {
  Text as RNText,
  StyleProp,
  TextStyle,
  type TextProps as RNTextProps,
} from "react-native";

import React from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export type TextProps = RNTextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "defaultBold"
    | "subtitle"
    | "link";
  style?: StyleProp<TextStyle>;
  className?: string;
};

const textTv = tv({
  base: "font-satoshi",
  variants: {
    type: {
      default: "",
      title: "text-5xl font-clashMedium",
      defaultSemiBold: "font-satoshiMedium",
      defaultBold: "font-satoshiBold",
      subtitle: "font-clashRegular",
      link: "",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export const Text = ({
  style = {},
  className = "",
  type = "default",
  ...rest
}: TextProps) => {
  return (
    <RNText
      style={[style]}
      className={twMerge(textTv({ type }), className)}
      {...rest}
    />
  );
};
