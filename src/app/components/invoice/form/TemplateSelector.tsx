"use client";

import Image from "next/image";

import { useFormContext } from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    BaseButton,
    InvoiceTemplate1,
    InvoiceTemplate2,
} from "@/app/components";
import { Check } from "lucide-react";
import { InvoiceType } from "@/types";

export default function TemplateSelector() {
    const { watch, setValue } = useFormContext<InvoiceType>();
    const formValues = watch();
    const templates = [
        {
            id: 1,
            name: "Template 1",
            description: "Template 1 description",
            img: "/assets/img/invoice-1-example.png",
            component: <InvoiceTemplate1 {...formValues} />,
        },
        {
            id: 2,
            name: "Template 2",
            description: "Second template",
            img: "/assets/img/invoice-2-example.png",
            component: <InvoiceTemplate2 {...formValues} />,
        },
    ];
    return (
        <>
            <div>
                <Label>Choose Invoice Template:</Label>

                <div>
                    <Card>
                        <CardHeader>
                            Templates
                            <CardDescription>
                                Select one of the predefined templates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <div className="flex overflow-x-auto">
                                {templates.map((template, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col flex-shrink-0 mr-4 gap-y-3"
                                    >
                                        <p>{template.name}</p>

                                        <div className="relative">
                                            {formValues.details.pdfTemplate ===
                                                template.id && (
                                                <div className="shadow-lg absolute right-2 top-2 rounded-full bg-blue-300 dark:bg-blue-600">
                                                    <Check />
                                                </div>
                                            )}
                                            <Image
                                                src={template.img}
                                                alt={template.name}
                                                width={300}
                                                height={700}
                                                className="cursor-pointer rounded-lg border-2 hover:border-blue-600"
                                                onClick={() =>
                                                    setValue(
                                                        "details.pdfTemplate",
                                                        template.id
                                                    )
                                                }
                                            />
                                            {/* {template.component} */}
                                        </div>

                                        <BaseButton
                                            onClick={() =>
                                                setValue(
                                                    "details.pdfTemplate",
                                                    template.id
                                                )
                                            }
                                        >
                                            Select
                                        </BaseButton>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};
