"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteCarAction } from "@/app/actions/admin";

export function DeleteCarButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <form
      action={deleteCarAction}
      onSubmit={(event) => {
        if (!window.confirm(`Delete ${name}?`)) {
          event.preventDefault();
          return;
        }
        setBusy(true);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="destructive" size="sm" disabled={busy}>
        {busy ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
