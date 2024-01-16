import React, { useState } from "react";
import { AsyncSelect } from '@grafana/ui';
import { SelectableValue } from "@grafana/data";

export const CameraSelector = () => {
  const [value, setValue] = useState<SelectableValue<string>>();
  const options: SelectableValue<any>[] = [{ label: 'Basic option', value: 0 }]

  const loadAsyncOptions = () => {
    return new Promise<Array<SelectableValue<any>>>((resolve) => {
      setTimeout(() => {
        resolve(options);
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

