/* eslint-disable */
import { fireEvent } from "@testing-library/react"; // jeff added
import React from "React";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";

import App from "../client/App";
import CreateGarden from "../client/components/LabeledText";
import LoginForm from "../client/components/Market";
import SignUp from '../../client/components/SignUp.jsx'
import store from "../client/store";

describe('unit testing react components', () => {
    describe('LoginForm', () => {
        let text;
        const props = {
            label: "Mega",
            text: "Markets",
        };
    })
})