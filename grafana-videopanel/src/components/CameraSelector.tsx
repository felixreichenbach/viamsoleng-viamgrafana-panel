import React, { useState } from "react";
import { AsyncSelect } from '@grafana/ui';
import { SelectableValue } from "@grafana/data";
import { RobotClient } from "@viamrobotics/sdk";

interface Props {
  client: RobotClient | undefined;
  setCamera(name: string): void;
}

export const CameraSelector: React.FC<Props> = ({ client, setCamera }) => {
  const [value, setValue] = useState<SelectableValue<string>>();
  function handleChange(value: SelectableValue<string>) {
    setCamera(value.label ?? "")
  }

  async function getCameras(client: RobotClient): Promise<Array<SelectableValue<string>>> {
    const resources = await client.resourceNames()
    const cameras = resources.filter((resource)=> {return resource.subtype === "camera"})
    const selectableCameras = cameras.map((camera)=>{return {label: camera.name}})
    return  selectableCameras
  }

  const loadAsyncOptions = () => {
    return new Promise<Array<SelectableValue<string>>>((resolve) => {
      setTimeout(() => {
        if (client !== undefined) {
          resolve(getCameras(client));
        }
      }, 2000);
    });
  };

  return (
    <AsyncSelect
      width={"auto"}
      loadOptions={loadAsyncOptions}
      defaultOptions
      value={value}
      onChange={v => {
        setValue(v);
        handleChange(v)
      }}
    />
  );
};

