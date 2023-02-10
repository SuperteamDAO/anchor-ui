import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "../../lib/en";
import { Box } from "@chakra-ui/react";

function JsonEditor() {
  const [inputData, setinputData] = useState({
    version: "0.1.0",
    name: "brianxyz",
    instructions: [],
  });
  return (
    <Box height={"100%"}>
      <JSONInput
        onChange={(v: { jsObject: any }) => console.log("OUTPUT", v)}
        id="idleditor"
        waitAfterKeyPress={200}
        placeholder={inputData}
        confirmGood={false}
        onKeyPressUpdate={false}
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
    </Box>
  );
}

export default JsonEditor;
