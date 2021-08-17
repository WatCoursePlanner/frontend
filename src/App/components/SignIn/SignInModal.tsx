import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@rmwc/button";
import { Dialog } from "@rmwc/dialog";
import { TextField } from "@rmwc/textfield";
import { Column, HorizontalLine, Row } from "@watcourses/constants/layout";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { UserStore } from "../../stores/UserStore";

import { Spacer } from "../Spacer";

interface ISignInModalProps {

}

@observer
export class SignInModal extends React.Component<ISignInModalProps> {

  @observable
  private showPassword: boolean = false;

  @observable
  private _password: string = "";

  @computed
  private get password() {
    return this._password;
  }

  @action
  private setPassword = (password: string) => {
    this._password = password;
  };

  @action
  private toggleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  @action
  private handleSignIn = () => {
    UserStore.get().login({
      email: "a@a.com",
      password: "pwd",
    })
  };

  constructor(props: ISignInModalProps) {
    super(props);
    makeObservable(this);
  }

  componentDidMount() {
    gapi.signin2.render("g-signin2", {
      "scope": "profile email",
      "width": 320,
      "height": 50,
      "longtitle": true,
      "theme": "dark",
    });
  }

  render() {
    const {
      showPassword,
      password,
      setPassword,
      toggleShowPassword,
    } = this;
    return (
      <Dialog
        open
        onClose={evt => {

        }}
      >
        <ContentWrapper>
          <Title>Sign In</Title>
          <Spacer height={32}/>
          <TextField
            outlined
            label="Email"
          />
          <Spacer height={16}/>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={event => this.setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Spacer height={24}/>
          <Row justify={"flex-end"}>
            <Button raised onClick={this.handleSignIn}>
              Sign In
            </Button>
          </Row>
          <Spacer height={24}/>
          <Caption>
            New user?{" "}
            <a href={"https://google.com"}>
              Create an account
            </a>
            .
          </Caption>
          <Spacer height={24}/>
          <Separator>OR</Separator>
          <Spacer height={24}/>
          <div id="g-signin2"/>
        </ContentWrapper>
      </Dialog>
    );
  }
}

const Separator: React.FC = (props) => (
  <Row>
    <HorizontalLine margin={"8px 18px 0 0"}/>
    <Caption>{props.children}</Caption>
    <HorizontalLine margin={"8px 0 0 18px"}/>
  </Row>
);

const Caption = styled.span`
  font-size: 14px;
  color: black;
  opacity: .47;

  a {
    color: black;
  }
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

const ContentWrapper = styled(Column)`
  width: 320px;
  padding: 40px;
`;
