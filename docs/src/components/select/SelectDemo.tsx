/*
 * @jsxImportSource react
 */

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";

const SelectDemo = () => {
  return (
    //@ts-ignore
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label="Select an animal" className="max-w-xs">
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectDemo;
