import { Button } from "@heroui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className={"flex flex-col items-center gap-4 mt-20"}>
      <h1 className={"text-5xl"}>Something went wrong!</h1>
      <p className={"text-default-500 text-xl"}>
        No order was placed. Please try it again.
      </p>
      <Button
        as={Link}
        color={"success"}
        href={"/order"}
        size={"lg"}
        variant={"solid"}
      >
        Try again
      </Button>
    </section>
  );
}
