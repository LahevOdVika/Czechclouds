"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Switch,
} from "@heroui/react";
import { redirect, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { NumberInput } from "@heroui/number-input";
import Form from "next/form";

import { MinusIcon, PlusIcon } from "@/components/Icons";
import { submitOrder } from "@/actions/order";

let nextId = 0;

export default function OrderForm(params: {
  params: { dict: Record<string, any>; lang: string };
}) {
  const dict = params.params.dict;
  const plans = dict.plans;

  const searchParams = useSearchParams();

  const [plan, setPlan] = useState(plans[0]);
  const [isYearly, setIsYearly] = useState(false);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [storage, setStorage] = useState(0); // in GB
  const [domainOption, setDomainOption] = useState("own");
  const [domainName, setDomainName] = useState("");

  const total = useMemo(() => {
    const planPrice = isYearly ? plan.priceYearly : plan.priceMonthly;
    const storagePrice = isYearly ? storage * 0.01 * 12 : storage * 0.01;
    const domainPrice = domainOption === "new" ? (isYearly ? 12 : 1) : 0;

    return planPrice + storagePrice + domainPrice;
  }, [plan, storage, domainOption, isYearly]);

  useEffect(() => {
    const urlPlan = searchParams.get("plan");
    const urlIsYearly = searchParams.get("yearly");

    const selectedPlan = plans.find((p: Plan) => p.id === urlPlan);

    if (selectedPlan) {
      setPlan(selectedPlan);
    }
    if (urlIsYearly === "true") {
      setIsYearly(true);
    }
  }, [searchParams, plans]);

  useEffect(() => {
    if (plan.id === "pro") {
      setDomainOption("included");
    } else {
      setDomainOption("own");
    }
  }, [plan]);

  useEffect(() => {
    const errorMessage = document.querySelector(".error");

    if (users.length == 0) {
      errorMessage?.classList.remove("hidden");
    } else {
      errorMessage?.classList.add("hidden");
    }
  }, [users]);

  async function OnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (users.length == 0) {
      return;
    }

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      any
    >;

    data["plan"] = plan.id;
    data["yearly"] = isYearly;
    data["storage"] = storage;
    data["domainOption"] = domainOption;
    data["domainName"] = domainName;
    data["users"] = users.map((u) => u.name);
    data["total"] = total;

    const status = await submitOrder(data);

    return status == 1 ? redirect("/order/success") : redirect("/order/failed");
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">{dict.order.title}</h1>
        <p className="text-default-500 mt-2">{dict.order.subtitle}</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {plans.map((p: Plan) => (
          <Card
            key={p.id}
            isPressable
            className={`p-4 cursor-pointer ${
              plan.id === p.id ? "border-2 border-success" : ""
            }`}
            onPress={() => setPlan(p)}
          >
            <CardHeader className="flex flex-col items-start">
              <p
                className={`text-tiny uppercase font-bold ${
                  p.isPopular ? "text-success" : ""
                }`}
              >
                {p.title}
              </p>
              <h4 className="font-bold text-large">{p.name}</h4>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-4xl font-bold">
                €{isYearly ? p.priceYearly : p.priceMonthly}
                <span className="text-default-500 text-sm">
                  /{isYearly ? dict.order.year : dict.order.month}
                </span>
              </p>
              <ul className="mt-4 space-y-2">
                {p.features.map((feature) => (
                  <li key={feature}>✅ {feature}</li>
                ))}
                {p.nonFeatures.map((feature) => (
                  <li key={feature}>❌ {feature}</li>
                ))}
                <li>
                  <Tooltip content={dict.order.tooltip}>
                    🙋{dict.order.recommended}: {p.recommendation}
                  </Tooltip>
                </li>
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {dict.order.configure}
        </h2>
        <Form
          action={"/api/checkout_sessions"}
          className="space-y-8"
          onSubmit={OnSubmit}
        >
          <div className="flex justify-center items-center gap-4">
            <span>{dict.order.monthly}</span>
            <Switch
              color="success"
              isSelected={isYearly}
              onValueChange={setIsYearly}
            />
            <span>
              {dict.order.yearly}{" "}
              <span className="text-success">(Save up to 17%)</span>
            </span>
          </div>

          <Input
            isRequired
            label={dict.order.fullName}
            name={"fullname"}
            type="text"
          />
          <Input
            isRequired
            label={dict.order.email}
            name={"email"}
            type="email"
          />

          <h2 className="font-bold text-xl">{dict.order.userAdd}</h2>
          <p className={"text-default-500"}>{dict.order.userLimit}</p>
          <Card>
            <CardBody className="flex flex-col">
              <Button
                isIconOnly
                aria-label={dict.order.userAddLabel}
                className={"bg-green-500/20 max-w-sm"}
                onPress={() => {
                  setUsers([...users, { id: nextId++, name: "" }]);
                }}
              >
                <PlusIcon />
              </Button>
              {users.map((user) => (
                <div key={user.id} className={"flex flex-col gap-4 mt-4"}>
                  <Input
                    isRequired
                    label={dict.order.fullName}
                    placeholder={"First Last"}
                    value={user.name}
                    onValueChange={(value) => {
                      const newUsers = users.map((u) => {
                        if (u.id === user.id) {
                          return { ...u, name: value };
                        }

                        return u;
                      });

                      setUsers(newUsers);
                    }}
                  />
                  <div className={"flex gap-4"}>
                    <Button
                      isIconOnly
                      className={"max-w-fit bg-danger-500/20"}
                      variant={"solid"}
                      onPress={() => {
                        setUsers(users.filter((a) => a.id !== user.id));
                      }}
                    >
                      <MinusIcon />
                    </Button>
                  </div>
                </div>
              ))}
              <span className={"error text-danger text-tiny mt-2"}>
                {dict.order.error}
              </span>
            </CardBody>
          </Card>

          <NumberInput
            isRequired
            className="amx-w-s"
            defaultValue={0}
            description={dict.order.additionalStorageDesc}
            label={dict.order.additionalStorage}
            minValue={0}
            name={"additionalsize"}
            placeholder={"Enter the amount"}
            onValueChange={(value) => setStorage((value as number) || 0)}
          />

          {plan.id === "basic" ? (
            <>
              <RadioGroup
                label={dict.order.domain}
                value={domainOption}
                onValueChange={setDomainOption}
              >
                <Radio value="own">{dict.order.myOwn}</Radio>
                <Radio value="new">
                  {dict.order.neednewDomain} (€
                  {isYearly ? `16/${dict.order.year}` : `2/${dict.order.month}`}
                  )
                </Radio>
              </RadioGroup>

              {domainOption === "new" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {dict.order.findNew}
                  </h3>
                  <p className="text-sm text-default-500 mb-4">
                    This is a placeholder for the VEDOS API integration.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="your-domain"
                      value={domainName}
                      onValueChange={setDomainName}
                    />
                    <Button color="success">{dict.order.check}</Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {dict.order.findNew}
                </h3>
                <p className="text-sm text-default-500 mb-4">
                  {dict.order.domainIncluded}
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="your-domain"
                    value={domainName}
                    onValueChange={setDomainName}
                  />
                  <Button color="success">Check</Button>
                </div>
              </div>
            </>
          )}

          <Divider />

          <div className="text-center">
            <p className="text-lg">
              {isYearly ? dict.order.yearly : dict.order.montly}{" "}
              {dict.order.total}
            </p>
            <p className="text-5xl font-bold">€{total.toFixed(2)}</p>
          </div>

          <Button
            fullWidth
            color="success"
            size="lg"
            type="submit"
            variant="shadow"
          >
            {dict.order.button}
          </Button>
          {(isYearly && (
            <p className={"text-small text-default-500 text-center"}>
              {dict.order.yearlyAgree.firstPart}{" "}
              <strong>
                {dict.order.yearlyAgree.feeOf} €{total}
              </strong>
              . {dict.order.yearlyAgree.secondPart}
            </p>
          )) || (
            <p className={"text-small text-default-500 text-center"}>
              {dict.order.monthlyAgree.firstPart}
              <strong>
                {dict.order.monthlyAgree.feeOf} €{total}
              </strong>
              .{dict.order.monthlyAgree.secondPart}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
