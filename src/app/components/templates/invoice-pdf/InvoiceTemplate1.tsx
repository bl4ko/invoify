import React from "react";

import { InvoiceLayout } from "@/app/components";
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";
import { DATE_OPTIONS } from "@/lib/variables";
import { InvoiceType } from "@/types";
// import { useTranslations } from "next-intl"
// import { getTranslations } from "next-intl/server"

export default function InvoiceTemplate(data: InvoiceType) {
    const { sender, receiver, details } = data;

    // const t = await getTranslations('template')

    return (
        <InvoiceLayout data={data}>
            <div className="flex justify-between" id="template">
                <div>
                    {details.invoiceLogo && (
                        <img
                            src={details.invoiceLogo}
                            width={140}
                            height={100}
                            alt={`Logo of ${sender.name}`}
                        />
                    )}
                    <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
                        {sender.name}
                    </h1>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        {/* {t('invoice')} # */}
                        Račun
                    </h2>
                    <span className="mt-1 block text-gray-500">
                        {details.invoiceNumber}
                    </span>
                    <address className="mt-4 not-italic text-gray-800 text-right">
                        {sender.address}
                        <br />
                        {sender.zipCode} {sender.city}, {sender.country}
                        <br />
                        {sender.vat && (
                            <>
                                {/* {t('vat')}: {sender.vat} */}
                                Davčna številka: {sender.vat}
                                <br />
                            </>
                        )}
                        {sender.iban && (
                            <>
                                {/* {t('iban')}: {sender.iban} */}
                                IBAN: {sender.iban}
                                <br />
                            </>
                        )}
                    </address>
                </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {/* {t('billTo')} */}
                        Račun za
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {receiver.name}
                    </h3>
                    <address className="mt-2 not-italic text-gray-500">
                        {receiver.address},
                        <br />
                        {receiver.zipCode} {receiver.city}, {receiver.country}
                        <br />
                        {receiver.vat && (
                            <>
                                {/* {t('vat')}: {receiver.vat} */}
                                Davčna številka: {receiver.vat}
                                <br />
                            </>
                        )}
                        {receiver.iban && (
                            <>
                                {/* {t('iban')}: {receiver.iban} */}
                                IBAN: {receiver.iban}
                                <br />
                            </>
                        )}
                    </address>
                </div>
                <div className="sm:text-right space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-6 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                {/* {t('invoiceDate')}: */}
                                Datum računa:
                            </dt>
                            <dd className="col-span-3 text-gray-500">
                                {new Date(
                                    details.invoiceDate
                  ).toLocaleDateString("sl-SI", DATE_OPTIONS)}
                            </dd>
                        </dl>
                        <dl className="grid sm:grid-cols-6 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                {/* {t('dueDate')}: */}
                                Datum zapadlosti:
                            </dt>
                            <dd className="col-span-3 text-gray-500">
                                {new Date(details.dueDate).toLocaleDateString(
                                    "sl-SI",
                                    DATE_OPTIONS
                                )}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="border border-gray-200 p-1 rounded-lg space-y-1">
                    <div className="grid grid-cols-5">
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">
                            {/* {t('item')} */}
                            Ime in opis
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">
                            {/* {t('quantity')} */}
                            Kol.
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">
                            {/* {t('unit')} */}
                            Enota
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">
                            {/* {t('rate')} */}
                            Postavka
                        </div>
                        <div className="text-right text-xs font-medium text-gray-500 uppercase">
                            {/* {t('total')} */}
                            Končni znesek
                        </div>
                    </div>
                    <div className="hidden sm:block border-b border-gray-200"></div>
                    <div className="grid grid-cols-5">
                        {details.items.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="border-b border-gray-300">
                                    <p className="font-medium text-gray-800">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-600 whitespace-pre-line">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="border-b border-gray-300">
                                    <p className="text-gray-800">
                                        {item.quantity}
                                    </p>
                                </div>
                                <div className="border-b border-gray-300">
                                    <p className="text-gray-800">
                                        {item.unitName}
                                    </p>
                                </div>
                                <div className="border-b border-gray-300">
                                    <p className="text-gray-800">
                                        {item.unitPrice} {details.currency}
                                    </p>
                                </div>
                                <div className="border-b border-gray-300">
                                    <p className="sm:text-right text-gray-800">
                                        {item.total} {details.currency}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="sm:hidden border-b border-gray-200"></div>
                </div>
            </div>

            <div className="mt-2 flex sm:justify-end">
                <div className="sm:text-right space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                      { details.taxDetails?.amount != undefined &&
                         details.taxDetails?.amount > 0 && (
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                {/* {t('subTotal')}: */}
                                Skupaj
                            </dt>
                            <dd className="col-span-2 text-gray-500">
                                {formatNumberWithCommas(
                                    Number(details.subTotal)
                                )}{" "}
                                {details.currency}
                            </dd>
                        </dl>
                        )}
                        {details.discountDetails?.amount != undefined &&
                            details.discountDetails?.amount > 0 && (
                                <dl className="grid sm:grid-cols-5 gap-x-3">
                                    <dt className="col-span-3 font-semibold text-gray-800">
                                        {/* {t('discount')}: */}
                                        Popust
                                    </dt>
                                    <dd className="col-span-2 text-gray-500">
                                        {details.discountDetails.amountType ===
                                        "amount"
                                            ? `- ${details.discountDetails.amount} ${details.currency}`
                                            : `- ${details.discountDetails.amount}%`}
                                    </dd>
                                </dl>
                            )}
                        {details.taxDetails?.amount != undefined &&
                            details.taxDetails?.amount > 0 && (
                                <dl className="grid sm:grid-cols-5 gap-x-3">
                                    <dt className="col-span-3 font-semibold text-gray-800">
                                        {/* {t('tax')}: */}
                                        Davek
                                    </dt>
                                    <dd className="col-span-2 text-gray-500">
                                        {details.taxDetails.amountType ===
                                        "amount"
                                            ? `+ ${details.taxDetails.amount} ${details.currency}`
                                            : `+ ${details.taxDetails.amount}%`}
                                    </dd>
                                </dl>
                            )}
                        {details.shippingDetails?.cost != undefined &&
                            details.shippingDetails?.cost > 0 && (
                                <dl className="grid sm:grid-cols-5 gap-x-3">
                                    <dt className="col-span-3 font-semibold text-gray-800">
                                        {/* {t('shipping')}: */}
                                        Poštnina
                                    </dt>
                                    <dd className="col-span-2 text-gray-500">
                                        {details.shippingDetails.costType ===
                                        "amount"
                                            ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                            : `+ ${details.shippingDetails.cost}%`}
                                    </dd>
                                </dl>
                            )}
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                {/* {t('total')}: */}
                                Skupaj
                            </dt>
                            <dd className="col-span-2 text-gray-500">
                                {formatNumberWithCommas(
                                    Number(details.totalAmount)
                                )}{" "}
                                {details.currency}
                            </dd>
                        </dl>
                        {details.totalAmountInWords && (
                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800">
                                    {/* {t('totalInWords')}: */}
                                    Skupaj z besedami
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    <em>
                                        {details.totalAmountInWords}{" "}
                                        {details.currency}
                                    </em>
                                </dd>
                            </dl>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div className="my-4">
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            {/* {t('additionalNotes')}: */}
                            Dodatne opombe
                        </p>
                        <p className="font-regular text-gray-800">
                            {details.additionalNotes}
                        </p>
                    </div>
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            {/* {t('paymentTerms')}: */}
                            Plačilni pogoji
                        </p>
                        <p className="font-regular text-gray-800">
                            {details.paymentTerms}
                        </p>
                    </div>
                    <div className="my-2">
                        <span className="font-semibold text-md text-gray-800">
                           {/* {t('sendThePaymentToDescription')} */}
                           Prosimo, pošljite plačilo na naslov
                            <p className="text-sm">
                                {/* {t('bank')}: {details.paymentInformation?.bankName} */}
                                Banka: {details.paymentInformation?.bankName}
                            </p>
                            <p className="text-sm">
                                {/* {t("accountName")}:{" "} */}
                                Ime računa:{" "}
                                {details.paymentInformation?.accountName}
                            </p>
                            <p className="text-sm">
                                {/* {t("accountNumber")}:{" "} */}
                                Številka računa:{" "}
                                {details.paymentInformation?.accountNumber}
                            </p>
                        </span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">
                   {/* {t('contactInformationDescription')} */}
                    Kontaktni podatki
                </p>
                <div>
                    <p className="block text-sm font-medium text-gray-800">
                        {sender.email}
                    </p>
                    <p className="block text-sm font-medium text-gray-800">
                        {sender.phone}
                    </p>
                </div>
            </div>

            {/* Signature */}
            {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
                <div className="mt-6">
                    {/* <p className="font-semibold text-gray-800">{t('signature')}:</p> */}
                    <p className="font-semibold text-gray-800">Podpis:</p>
                    <img
                        src={details.signature.data}
                        width={120}
                        height={60}
                        alt={`Signature of ${sender.name}`}
                    />
                </div>
            ) : details.signature?.data ? (
                <div className="mt-6">
                    {/* <p className="text-gray-800">{t('signature')}:</p> */}
                    <p className="text-gray-800">podpis:</p>
                    <p
                        style={{
                            fontSize: 30,
                            fontWeight: 400,
                            fontFamily: `${details.signature.fontFamily}, cursive`,
                            color: "black",
                        }}
                    >
                        {details.signature.data}
                    </p>
                </div>
            ) : null}
        </InvoiceLayout>
    );
};
