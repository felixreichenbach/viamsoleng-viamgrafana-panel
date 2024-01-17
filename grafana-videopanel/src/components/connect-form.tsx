import React, {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from 'react';

import {
  DISCONNECTED,
  CONNECTING,
  DISCONNECTING,
  CONNECTED,
  type ClientStatus,
} from '../state';

import type { RobotCredentials } from '../client';
import { CameraSelector } from './CameraSelector';
import { RobotClient } from '@viamrobotics/sdk';

export interface ConnectFormProps {
  client: RobotClient | undefined;
  status: ClientStatus;
  onSubmit: (credentials: RobotCredentials) => unknown;
  setCamera: (name: string) => void;
}

const DISABLED_BY_STATUS = {
  [DISCONNECTED]: false,
  [CONNECTING]: true,
  [DISCONNECTING]: true,
  [CONNECTED]: false,
};

const BUTTON_TEXT_BY_STATUS = {
  [DISCONNECTED]: 'Connect',
  [CONNECTING]: 'Connecting...',
  [DISCONNECTING]: 'Disconnecting...',
  [CONNECTED]: 'Disconnect',
};

const INITIAL_HOSTNAME = ''
const INITIAL_SECRET = ''

export const ConnectForm = (props: ConnectFormProps): JSX.Element => {
  const { client, status, onSubmit, setCamera } = props;
  const [hostname, setHostname] = useState(INITIAL_HOSTNAME);
  const [secret, setSecret] = useState(INITIAL_SECRET);
  const disabled = DISABLED_BY_STATUS[status];
  const buttonText = BUTTON_TEXT_BY_STATUS[status];

  const handleHost: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHostname(event.target.value);
  };
  const handleSecret: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSecret(event.target.value);
  };
  const handleSubmit: FormEventHandler = (event) => {
    onSubmit({ hostname, secret });
    event.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit}>
      {status === "connected" ?
        <CameraSelector client={client} setCamera={setCamera} /> : 
        <>
          <label style= {{display: "block", width:150}}>
            Smart Machine Address
            <input
              type="text"
              value={hostname}
              onChange={handleHost}
              disabled={disabled}
            />
          </label>
          <label style= {{display: "block", width:150}}>
            Location Secret
            <input
              type="password"
              value={secret}
              onChange={handleSecret}
              disabled={disabled}
            />
          </label>
        </>
      }
      <button 
        style= {{float: "left", display: "block"}}
        type="submit"
        disabled={disabled}
      >
        {buttonText}
      </button>
    </form>
  );
};

