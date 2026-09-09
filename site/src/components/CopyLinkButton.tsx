"use client";

import { useState } from "react";
import { Button } from "./Button";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (permissions, older browsers) —
      // fail quietly rather than throw in front of the reader.
    }
  }

  return (
    <Button type="button" size="sm" onClick={handleClick} aria-live="polite">
      {copied ? "Link copied" : "Copy link"}
    </Button>
  );
}
