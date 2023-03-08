import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "../../lib/en";

import { Box } from "@chakra-ui/react";
import { useIDLStore } from "../../store";

function JsonEditor() {
  const idl = useIDLStore((state) => state.idl);
  console.log("SEE IDL", idl);
  const setIdl = useIDLStore((state) => state.setIdl);

  return (
    <JSONInput
      onChange={(v: { jsObject: any }) => {
        if (v.jsObject !== null || v.jsObject !== undefined) {
          setIdl(v.jsObject);
        }
      }}
      id="idleditor"
      waitAfterKeyPress={200}
      placeholder={idl}
      confirmGood={false}
      onKeyPressUpdate={true}
      locale={locale}
      colors={{
        background: "#151515",
      }}
      style={{
        contentBox: {
          fontSize: "16px",
          fontWeight: "500",
        },
        labels: {
          fontSize: "16px",
        },
      }}
    />
  );
}

export default JsonEditor;
