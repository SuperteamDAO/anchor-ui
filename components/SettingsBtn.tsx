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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  clusterSlug: z.enum(["mainnet-beta", "testnet", "devnet", "custom"], {
    required_error: "Incorrect Cluster type",
  }),
});

export function SettingsBtn() {
  const { cluster, setCluster } = useClusterStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="clusterSlug"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg">RPC Endpoint</FormLabel>
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
                            <FormItem
                              key={cluster}
                              className="flex items-center space-x-2"
                            >
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
