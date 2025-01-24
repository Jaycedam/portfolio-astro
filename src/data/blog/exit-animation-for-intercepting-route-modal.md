---
title: "Exit Animation for Intercepting Route Modal (Next.js)"
category: "Guides"
description: "This feature isn’t supported in Next.js, but we can use the modal state to trigger route changes after the animation ends."
date: "2024-03-7"
updatedDate: "2025-01-12"
tags: ["nextjs"]
---

## Update

It looks like React just merged support for the View Transitions API, which provides an easy way to handle transitions for your application since it's native to the browser. You can check out the PR [here](https://github.com/facebook/react/pull/31975), and find more info about the API [here](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).

This solves the issue of exit animations; _however_, it will likely take some time before it's released in the stable version of Next.js. In the meantime, you can still use the solution below.

## The issue

Since Next.js doesn't support exit animations yet ([Relevant issue](https://github.com/vercel/next.js/issues/49279)), we need to manually create the animation event.

For this example I'm using the [Sheet component](https://ui.shadcn.com/docs/components/sheet) from shadcn/ui, but you can use the [Dialog](https://www.radix-ui.com/primitives/docs/components/dialog#api-reference) from Radix directly with your own style.

## Initial modal component

This is our initial component using shadcn/ui Drawer component, based on the [Next.js docs](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals).

```tsx
// app/components/modal.tsx

"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    function handleClose() {
        router.back();
    }

    return (
        <Sheet open onOpenChange={handleClose}>
            <SheetContent
                side="bottom"
                className="h-full overflow-auto rounded-t-3xl px-0 py-16 md:h-[96%]"
            >
                {children}
            </SheetContent>
        </Sheet>
    );
}
```

Where we just call the **router.back()** to close the modal by switching the URL.

## Adding a closing animation

To achieve this, we need to control the open state to perform the **router.back()** after the closing animation ends, using **onAnimationEndCapture**.

```tsx
// app/components/modal.tsx

"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react"; // [!code ++]

export default function Modal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true); // [!code ++]
    const router = useRouter();

    function handleClose() {
        router.back(); // [!code --]
        setOpen(false); // [!code ++]
    }

    function handleAnimationEnd() {
        // [!code ++]
        // when the modal animation ends: if it's closed, navigate back // [!code ++]
        if (!open) {
            // [!code ++]
            router.back(); // [!code ++]
        } // [!code ++]
    } // [!code ++]

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent
                onAnimationEndCapture={handleAnimationEnd} // [!code ++]
                side="bottom"
                className="h-full overflow-auto rounded-t-3xl px-0 py-16 md:h-[96%]"
            >
                {children}
            </SheetContent>
        </Sheet>
    );
}
```

## Result

Now when pressing the close button or the ESC key, the modal will exit with an animation then go back to the previous URL.

<video class="w-full rounded-md aspect-16/10" autoPlay muted loop controls>
  <source src="/blog/intercepting-modal.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>

We still can't animate when the React component is unmounted (eg: when using the browser's back button), for that we'll have to wait for native framework support.

For now this cover the rest of usecases.
