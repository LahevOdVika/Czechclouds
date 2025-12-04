import { Button } from "@heroui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className={"flex flex-col items-center gap-4 mt-20"}>
      <h1 className={"text-5xl"}>Thank you for your order!</h1>
      <p className={"text-default-500 text-xl"}>We will email you shortly.</p>
      <Button
        as={Link}
        color={"success"}
        href={"/"}
        size={"lg"}
        variant={"solid"}
      >
        Back Home
      </Button>
    </section>
  );
}
