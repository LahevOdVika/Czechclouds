"use client";

import { FormEvent } from "react";
import { Form } from "@heroui/form";
import { Divider } from "@heroui/divider";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Button } from "@heroui/button";

import { submitContactFormAction } from "@/actions/contact";

export default function ClientContactPage(params: {
  params: { dict: Record<string, any>; lang: string };
}) {
  const dict = params.params.dict;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await submitContactFormAction(formData);

    if (result.success) {
      alert(result.message);
    } else {
      alert("Selhalo");
    }
  }

  return (
    <section className={"flex justify-center items-center mt-20"}>
      <Form
        className={"flex flex-col gap-4"}
        method={"post"}
        onSubmit={onSubmit}
      >
        <h1 className={"text-5xl font-bold"}>{dict.contact.title}</h1>
        <Divider />
        <Input
          isRequired
          label={dict.contact.fullName.label}
          name={"name"}
          placeholder={dict.contact.fullName.placeholder}
          type={"text"}
        />
        <Input
          isRequired
          label={dict.contact.email.label}
          name={"email"}
          placeholder={dict.contact.email.placeholder}
          type={"email"}
        />
        <Input
          label={dict.contact.orderNumber.label}
          name={"order"}
          placeholder={dict.contact.orderNumber.placeholder}
          type={"text"}
        />
        <RadioGroup
          isRequired
          label={dict.contact.radios.isClient.groupLabel}
          name={"isClient"}
        >
          <Radio value={"1"}>{dict.contact.radios.isClient.first}</Radio>
          <Radio value={"0"}>{dict.contact.radios.isClient.second}</Radio>
        </RadioGroup>
        <RadioGroup
          isRequired
          label={dict.contact.radios.reason.groupLabel}
          name={"reason"}
        >
          <Radio value={"question"}>{dict.contact.radios.reason.first}</Radio>
          <Radio value={"complain"}>{dict.contact.radios.reason.second}</Radio>
          <Radio value={"refund"}>{dict.contact.radios.reason.third}</Radio>
          <Radio value={"bigger"}>{dict.contact.radios.reason.fourth}</Radio>
          <Radio value={"cancel"}>{dict.contact.radios.reason.fifth}</Radio>
        </RadioGroup>
        <Textarea
          isRequired
          maxRows={10}
          minRows={5}
          name={"message"}
          placeholder={dict.contact.message.placeholder}
          title={dict.contact.message.title}
        />
        <Button
          className={"w-full"}
          color={"success"}
          size={"lg"}
          type={"submit"}
        >
          {dict.contact.button}
        </Button>
      </Form>
    </section>
  );
}
