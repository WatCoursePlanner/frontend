import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@rmwc/button";
import { Column, HorizontalLine, Row } from "@watcourses/constants/layout";
import { schedule } from "@watcourses/paths";
import { SignInModalStore } from "@watcourses/stores/SignInModalStore";
import { UserStore } from "@watcourses/stores/UserStore";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { Spacer } from "../Spacer";

@observer
export class SignUpModal extends React.Component {

  @observable
  private showPassword: boolean = false;

  @observable
  private _password: string = "";

  @observable
  private _email: string = "";

  @observable
  private _pending: boolean = false;

  @observable
  private _error: string | null = null;

  @observable
  private _firstName: string = "";

  @observable
  private _lastName: string = "";

  @computed
  private get password() {
    return this._password;
  }

  @action
  private setPassword = (password: string) => {
    this._password = password;
  };

  @computed
  private get email() {
    return this._email;
  }

  @action
  private setEmail = (email: string) => {
    this._email = email;
  };

  @computed
  private get pending() {
    return this._pending;
  }

  @action
  private setPending = (pending: boolean) => {
    this._pending = pending;
  };

  @computed
  private get error() {
    return this._error;
  }

  @action
  private setError = (error: string | null) => {
    this._error = error;
  };

  @computed
  private get firstName() {
    return this._firstName;
  }

  @action
  private setFirstName = (firstName: string) => {
    this._firstName = firstName;
  };

  @computed
  private get lastName() {
    return this._lastName;
  }

  @action
  private setLastName = (lastName: string) => {
    this._lastName = lastName;
  };

  @action
  private toggleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  @action
  private handleSignUp = async () => {
    this.setError(null);
    this.setPending(true);
    const result = await UserStore.get().signUp({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
    this.setPending(false);
    if (result.success) {
      window.location.replace(schedule.home());
    } else {
      this.setError(result.error ? `${result.error}.` : "Unknown error.");
    }
  };

  @action
  private handleGoogleSignIn = async (googleUser: any) => {
    this.setError(null);
    this.setPending(true);
    const result = await UserStore.get().googleSignIn(
      {token: googleUser.getAuthResponse().id_token},
    );
    this.setPending(false);
    if (result.success) {
      window.location.replace(schedule.home());
    } else {
      this.setError(result.error ? `${result.error}.` : "Unknown error.");
    }
  };

  constructor(props: any) {
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
    return (
      <ContentWrapper>
        <Title>Sign Up</Title>
        <Spacer height={32}/>
        <Row>
          <TextField
            label="First name"
            value={this.firstName}
            onChange={event => this.setFirstName(event.target.value)}
            variant="outlined"
          />
          <Spacer width={16}/>
          <TextField
            label="Last name"
            value={this.lastName}
            onChange={event => this.setLastName(event.target.value)}
            variant="outlined"
          />
        </Row>
        <Spacer height={16}/>
        <TextField
          label="Email"
          value={this.email}
          onChange={event => this.setEmail(event.target.value)}
          variant="outlined"
        />
        <Spacer height={16}/>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={this.showPassword ? "text" : "password"}
            value={this.password}
            onChange={event => this.setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.toggleShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {this.showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        {this.error
          ? (<>
            <Spacer height={20}/>
            <Caption color={red["500"]}>
              {this.error}
            </Caption>
            <Spacer height={20}/>
          </>)
          : <Spacer height={24}/>}
        <Row justify={"flex-end"}>
          <Button raised onClick={this.handleSignUp}>
            {this.pending ? "LOADING" : "Create Account"}
          </Button>
        </Row>
        <Spacer height={24}/>
        <Caption>
          Already have an account?{" "}
          <span onClick={e => {
            e.preventDefault();
            SignInModalStore.get().showSignIn();
          }}>
            Sign in
          </span>
          .
        </Caption>
        <Spacer height={24}/>
        <Separator>OR</Separator>
        <Spacer height={24}/>
        <div id="g-signin2" data-onsuccess={this.handleGoogleSignIn}/>
      </ContentWrapper>
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

const Caption = styled.span<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color ?? "black"};
  opacity: ${props => props.color ? 1 : .47};

  span {
    text-decoration: underline;
    cursor: pointer;
    color: ${props => props.color ?? "black"};
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
