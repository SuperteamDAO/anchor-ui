"use client";

import * as React from "react";
import { Radio, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CLUSTERS,
  Cluster,
  DEFAULT_CLUSTER,
  clusterName,
  clusterSlug,
  slugToCluster,
  useClusterStore,
} from "@/hooks/useClusterStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAnchorStore } from "@/hooks/useAnchorStore";
import * as anchor from "@coral-xyz/anchor";

const FormSchema = z.object({
  clusterSlug: z.nativeEnum(Cluster, {
    required_error: "Incorrect Cluster type",
  }),
  customRpc: z.string().optional(),
});

export function SettingsBtn() {
  const { setCluster, setCustomCluster, cluster, getRpcUrl } =
    useClusterStore();
  const { setProgram, programId, idl } = useAnchorStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clusterSlug: cluster,
      customRpc: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCluster(data.clusterSlug);
    if (data.clusterSlug === Cluster.Custom) {
      setCustomCluster(data.customRpc || "");
    }

    if (programId && idl) {
      const RPC = getRpcUrl(data.clusterSlug);
      console.log("RPC", RPC);
      anchor.setProvider({
        connection: new anchor.web3.Connection(RPC),
      });
      const provider = anchor.getProvider() as anchor.AnchorProvider;
      setProgram(provider);
    }

    toast({
      title: "Cluster Set SuccessFully",
    });
  }

  const watchedClusterSlug = form.watch("clusterSlug");
  // console.log("watchedClusterSlug", watchedClusterSlug);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set RPC Endpoint</DialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-4 pt-5"
            >
              <FormField
                control={form.control}
                name="clusterSlug"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {CLUSTERS.map((cluster) => {
                          const slug = clusterSlug(cluster);
                          const name = clusterName(cluster);
                          return (
                            <FormItem key={cluster} className=" space-x-2">
                              <FormControl>
                                <RadioGroupItem value={slug} id={slug} />
                              </FormControl>
                              <Label htmlFor={slug}>{name}</Label>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div
                className={`transition-opacity duration-500 ${
                  watchedClusterSlug === Cluster.Custom
                    ? "opacity-100"
                    : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <FormField
                  control={form.control}
                  name="customRpc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RPC Endpoint</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Custo RPC Endpoint"
                          className="flex-1 p-4 my-2"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the Custom RPC endpoint.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
