import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    primaryColor: string;
    secondaryColor: string;
    contentColor: string;
  }
  export interface BrightTheme {
    textColor: string;
    bgColor: string;
    primaryColor: string;
    secondaryColor: string;
    contentColor: string;
  }
}
