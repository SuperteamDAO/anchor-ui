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
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  clusterSlug: z.nativeEnum(Cluster, {
    required_error: "Incorrect Cluster type",
  }),
  customRpc: z.string().optional(),
});

export function SettingsBtn() {
  const { setCluster, setCustomCluster, cluster, getRpcUrl } =
    useClusterStore();
  console.log("cluster", cluster);
  const { setProgram, programId, idl } = useAnchorStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clusterSlug: cluster,
      customRpc: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setCluster(data.clusterSlug);

      if (data.clusterSlug === Cluster.Custom && data.customRpc === "") {
        throw new Error("Custom RPC is required");
      }

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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
  }

  const watchedClusterSlug = form.watch("clusterSlug");
  console.log("watchedClusterSlug", watchedClusterSlug);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>RPC Endpoint</DialogTitle>
          <DialogDescription>
            Set the RPC endpoint for the cluster you want to connect to.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex-col items-center justify-center space-y-4 pt-5"
            >
              <FormField
                control={form.control}
                name="clusterSlug"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {CLUSTERS.map((formCluster) => {
                          const slug = clusterSlug(formCluster);
                          const name = clusterName(formCluster);
                          return (
                            <FormItem key={formCluster}>
                              <FormControl>
                                <RadioGroupItem
                                  value={slug}
                                  id={slug}
                                  className="sr-only"
                                />
                              </FormControl>
                              <Label
                                className={cn(
                                  "block w-full border cursor-pointer rounded-md p-6 hover:border-primary hover:bg-primary/10 transition-colors",
                                  {
                                    "bg-gray-200": watchedClusterSlug === slug,
                                  }
                                )}
                                htmlFor={slug}
                              >
                                {name}
                                {cluster === slug && (
                                  <p className="text-sm text-muted-foreground ">
                                    Currently Selected
                                  </p>
                                )}
                              </Label>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div
                className={`transition-transform ${
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
