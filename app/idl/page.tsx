"use client";

import { Textarea } from "@/components/ui/textarea";

export default function IdlEditor() {
  return (
    <div className="container">
      <Textarea
        placeholder="Write a tagline for an ice cream shop"
        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
      />
    </div>
  );
}
