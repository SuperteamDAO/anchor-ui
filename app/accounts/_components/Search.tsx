"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type SearchByPubkeyProps = {
  handleSearch: () => void;
  setSearchValue: (value: string) => void;
};

function SearchByPubkey({ setSearchValue, handleSearch }: SearchByPubkeyProps) {
  const [input, setInput] = React.useState("");

  const onClickHandler = () => {
    setSearchValue(input);
    handleSearch();
  };

  return (
    <div className="flex flex-row gap-2 w-5/12">
      <Input
        className="h-8"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by PublicKey"
      />
      <Button
        onClick={onClickHandler}
        size={"sm"}
        className="h-8"
        variant={"outline"}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchByPubkey;
