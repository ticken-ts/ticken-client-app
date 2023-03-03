declare module 'react-native-dotenv' {
  export const TEST_API_SECRET: string
  export const KEYCLOAK_CLIENT_SECRET: string
  export const KEYCLOAK_CLIENT_ID: string
  export const KEYCLOAK_URL: string
  export const EVENTS_URL: string
  export const TICKETS_URL: string
}

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
