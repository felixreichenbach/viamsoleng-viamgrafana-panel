import React, { useState } from "react";
import { AsyncSelect } from '@grafana/ui';
import { SelectableValue } from "@grafana/data";

interface Props {
  change(value: SelectableValue<string>): void
}

export const CameraSelector: React.FC<Props> = ({ change }) => {
  const [value, setValue] = useState<SelectableValue<string>>();

  function handleChange(value: SelectableValue<string>) {
    change(value)
  }

  const loadAsyncOptions = () => {
    return new Promise<Array<SelectableValue<string>>>((resolve) => {
      setTimeout(() => {
        resolve([{ label: "camera" }, { label: "license-plate" }]);
      }, 2000);
    });
  };

  return (
    <AsyncSelect
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

