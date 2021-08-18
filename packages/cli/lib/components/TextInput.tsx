import React, { VoidFunctionComponent } from "react";
import { Box, Text } from "ink";
import Input from "ink-text-input";
import { CLIComponentEventHandler } from "../types";

export interface TextInputProps {
  value?: string;
  label: string;
  name: string;
  onChange: CLIComponentEventHandler;
  onSubmit: () => void;
}

const TextInput: VoidFunctionComponent<TextInputProps> = ({ label, name, value = "", onChange, onSubmit }) => {
  const handleOnChange = (inputValue: string) => {
    onChange({ name, value: inputValue });
  };

  return (
    <Box>
      <Text>{label}: </Text>
      <Input value={value} onChange={handleOnChange} onSubmit={onSubmit} />
    </Box>
  );
};

export default TextInput;
