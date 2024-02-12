"use client";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import { useClusterStore } from "@/hooks/useClusterStore";
import * as anchor from "@coral-xyz/anchor";

const formSchema = z.object({
  programId: z.string().min(2).max(50),
  idl: z.string().min(2),
});

export default function Home() {
  const { setIdl, setProgramId, setProgram, programId, idl } = useAnchorStore();
  const { cluster, getRpcUrl } = useClusterStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idl: JSON.stringify(idl) === "{}" ? "" : JSON.stringify(idl),
      programId: programId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setProgramId(values.programId);
    const RPC = getRpcUrl(cluster);
    console.log("RPC", RPC);
    console.log("JSON.parse(values.idl)", JSON.parse(values.idl));
    setIdl(JSON.parse(values.idl));
    anchor.setProvider({
      connection: new anchor.web3.Connection(RPC),
    });
    const provider = anchor.getProvider() as anchor.AnchorProvider;
    setProgram(provider);
  }
  return (
    <main className="flex min-h-screen w-full  flex-col items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-row justify-between items-center  py-2 w-full px-4">
            <h1 className="scroll-m-20  text-xl font-bold tracking-tight pb-1 ">
              Enter your Program&apos;s IDL
            </h1>
            <Button
              variant={"default"}
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Generate UI
            </Button>
          </div>
          <Separator />

          <div className="container pt-2">
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your program ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Program Name"
                      className=" flex-1 p-4 my-2 "
                      defaultValue={programId}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idl"
              defaultValue={idl.toString()}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your program IDL</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your Program's IDL"
                      className="min-h-[200px] flex-1 p-4 md:min-h-[500px] my-2 lg:min-h-[500px]"
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
          </div>
        </form>
      </Form>
    </main>
  );
}
