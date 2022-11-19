declare module 'react-native-dotenv' {
  export const TEST_API_SECRET: string
}

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
