import React, { useState } from "react";
import { AsyncSelect } from '@grafana/ui';
import { SelectableValue } from "@grafana/data";

export function CameraSelector() {

  const [value, setValue] = useState<SelectableValue<string>>();

  const loadAsyncOptions = () => {
    return new Promise<Array<SelectableValue<string>>>((resolve) => {
      setTimeout(() => {
        resolve([{label: "Option 1", value: "0"}, {label: "Option 2", value: "1"}]);
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
      }}
    />
  );
};

