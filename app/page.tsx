"use client";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import { useClusterStore } from "@/hooks/useClusterStore";
import * as anchor from "@coral-xyz/anchor";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { json } from "@codemirror/lang-json";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { formatJsonata } from "@stedi/prettier-plugin-jsonata/dist/lib";

export default function Home() {
  const { setIdl, setProgram, idl } = useAnchorStore();
  const { cluster, getRpcUrl } = useClusterStore();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeInput = async () => {
      const formattedIdl = await formatJsonata(JSON.stringify(idl));

      setInput(formattedIdl);
    };
    initializeInput();
  }, [idl]);

  const handleChange = async (value: string) => {
    if (value !== "" && value.startsWith("{") && value.endsWith("}")) {
      const formattedCode = await formatJsonata(value);
      setInput(formattedCode ?? "");
    }
  };

  function onSubmit() {
    setLoading(true);
    const RPC = getRpcUrl(cluster);
    console.log("RPC", RPC);

    setIdl(JSON.parse(input));
    anchor.setProvider({
      connection: new anchor.web3.Connection(RPC),
    });
    const provider = anchor.getProvider() as anchor.AnchorProvider;
    setProgram(provider);
    setLoading(false);
    toast({
      title: "Program IDL Set",
      description: "Your program IDL has been set successfully!",
      action: <ToastAction altText="Goto Explorer">Accounts</ToastAction>,
    });
  }
  return (
    <main className="flex h-full min-h-[89vh] w-full   flex-col  items-center">
      <div className="w-70vw flex flex-col items-center gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Paste your IDL below
          </p>
          <p>{idl && idl.address}</p>
          <Button variant={"default"} onClick={onSubmit} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Generate UI
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
        <div className="flex flex-row justify-start w-full">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            we use the latest IDL specification to generate the UI.
          </p>
        </div>
      </div>
    </main>
  );
}

{
  /* <Form {...form}>
<form
  onSubmit={form.handleSubmit(onSubmit)}
  className="w-full flex flex-col h-full items-center"
>
  <div className="w-4/6 flex flex-col gap-4 ">
    <FormField
      control={form.control}
      name="idl"
      defaultValue={idl.toString()}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Your Program IDL</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Your Program's IDL"
              className="min-h-[200px] w-full p-4 md:min-h-[500px]  lg:min-h-[500px]"
              {...field}
            />
          </FormControl>
          <FormDescription>
            This is the IDL of your Program.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    {/* // TODO: disable this button if the wallet is not connected */
}
//   </div>
//   <Button
//     variant={"default"}
//     type="submit"
//     disabled={form.formState.isSubmitting}
//   >
//     {form.formState.isSubmitting ? (
//       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//     ) : (
//       <Send className="mr-2 h-4 w-4" />
//     )}
//     Generate UI
//   </Button>
// </form>
// </Form> */}
