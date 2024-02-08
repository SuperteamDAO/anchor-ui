"use client";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full  flex-col items-center px-4 lg:px-6">
      <div className="py-3 w-full">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight pb-1 ">
          Enter your Program's IDL
        </h1>
        <Separator />
      </div>
      <div className="container">
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
