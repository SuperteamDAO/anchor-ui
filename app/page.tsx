"use client";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full  flex-col items-center  ">
      <div className="flex flex-row justify-between items-center  py-2 w-full px-4">
        <h1 className="scroll-m-20  text-xl font-bold tracking-tight pb-1 ">
          Enter your Program's IDL
        </h1>
        <Button variant={"secondary"}>
          <Send className="mr-2 h-4 w-4" />
          Generate UI
        </Button>
      </div>
      <Separator />
      <div className="container pt-2">
        <Label htmlFor="program id">Your program ID</Label>
        <Input placeholder="Program Name" className=" flex-1 p-4 my-2 " />
        <Label htmlFor="program idl">Your program IDL</Label>
        <Textarea
          placeholder="Your Program's IDL"
          className="min-h-[200px] flex-1 p-4 md:min-h-[500px] my-2 lg:min-h-[500px]"
        />
      </div>
    </main>
  );
}
