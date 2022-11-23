import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";
// import { withKnobs } from "@storybook/addon-knobs";

addDecorator((story) => (
  <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
));
// addDecorator(withKnobs);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
