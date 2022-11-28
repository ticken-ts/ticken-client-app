declare module 'react-native-dotenv' {
  export const TEST_API_SECRET: string
  export const KEYCLOAK_CLIENT_SECRET: string
  export const KEYCLOAK_CLIENT_ID: string
}

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
