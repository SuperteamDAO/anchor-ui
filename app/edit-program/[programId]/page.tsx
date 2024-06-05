"use client";
import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useCurrentProgramStore } from "@/hooks/useCurrentProgram";
import { useClusterStore } from "@/hooks/useClusterStore";
import * as anchor from "@coral-xyz/anchor";
import CodeMirror from "@uiw/react-codemirror";
import { use, useEffect, useState } from "react";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { json } from "@codemirror/lang-json";
import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { formatJsonata } from "@stedi/prettier-plugin-jsonata/dist/lib";
import { useProgramsListStore } from "@/hooks/useProgramsList";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { programId: string } }) {
  const programs = useProgramsListStore((state) => state.programs);
  const editProgram = useProgramsListStore((state) => state.editProgram);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { cluster, getRpcUrl } = useClusterStore();
  const router = useRouter();
  const currentProgram = programs.find(
    (p) => p.programId.toString() === params.programId
  );

  useEffect(() => {
    const initializeInput = async () => {
      if (currentProgram && currentProgram.idl) {
        const formattedIdl = await formatJsonata(
          JSON.stringify(currentProgram.idl)
        );
        setInput(formattedIdl);
      }
    };
    initializeInput();
  }, [params.programId, currentProgram]);

  function onSubmit() {
    setLoading(true);
    const RPC = getRpcUrl(cluster);
    anchor.setProvider({
      connection: new anchor.web3.Connection(RPC),
    });
    const provider = anchor.getProvider() as anchor.AnchorProvider;
    const program = new anchor.Program(JSON.parse(input), provider);

    editProgram(params.programId, program);
    setLoading(false);
    toast({
      title: "Program IDL Updated",
      description: `You have updated IDL for ${program.programId}!`,
    });
    router.push("/");
  }

  const handleChange = async (value: string) => {
    if (value !== "" && value.startsWith("{") && value.endsWith("}")) {
      const formattedCode = await formatJsonata(value);
      setInput(formattedCode ?? "");
    }
  };

  return (
    <main className="flex h-full min-h-[89vh] w-full   flex-col  items-center">
      <div className="w-70vw flex flex-col items-center gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col ">
            <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Add your IDL
            </p>
            <p className="text-sm text-muted-foreground">
              {" "}
              we use the latest IDL specification to generate the UI.
            </p>
          </div>

          <Button
            variant={"default"}
            onClick={onSubmit}
            disabled={loading || input === "{}" || input === ""}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Anchor className="mr-2 h-4 w-4" />
            )}
            Edit Program
          </Button>
        </div>
        <CodeMirror
          value={input}
          width="70vw"
          height="75vh"
          theme={githubDark}
          extensions={[json()]}
          lang="json"
          basicSetup={{
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            tabSize: 2,
          }}
          onChange={handleChange}
        />
      </div>
    </main>
  );
}
