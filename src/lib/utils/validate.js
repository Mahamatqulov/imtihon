// export function validate() {
//   if (!senderAddress?.street?.trim()) {
//     return {
//       target: " senderAddress",
//       message: "Jo‘natuvchi ko‘cha manzilini kiriting",
//     };
//   }

//   if (!senderAddress?.city?.trim()) {
//     return {
//       target: "senderCity",
//       message: "Jo‘natuvchi shahrini kiriting",
//     };
//   }

//   if (!senderAddress?.postCode?.trim()) {
//     return {
//       target: "senderPostCode",
//       message: "Jo‘natuvchi pochta kodini kiriting",
//     };
//   }

//   if (!senderAddress?.country?.trim()) {
//     return {
//       target: "senderCountry",
//       message: "Jo‘natuvchi davlatini kiriting",
//     };
//   }
//   if (!clientName?.trim())
//     return { target: "clientName", message: "Mijoz ismini kiriting" };

//   if (!clientEmail?.trim())
//     return { target: "clientEmail", message: "Mijoz emailini kiriting" };

//   if (!clientAddress?.street?.trim()) {
//     return {
//       target: "streetAddress",
//       message: "Mijoz ko‘cha manzilini kiriting",
//     };
//   }

//   if (!clientAddress?.city?.trim()) {
//     return { target: "city", message: "Mijoz shahrini kiriting" };
//   }

//   if (!clientAddress?.postCode?.trim()) {
//     return { target: "postCode", message: "Mijoz pochta kodini kiriting" };
//   }

//   if (!clientAddress?.country?.trim()) {
//     return { target: "country", message: "Mijoz davlatini kiriting" };
//   }

//   if (!paymentDue)
//     return {
//       target: "invoiceDate",
//       message: "Invoice sanasini kiriting",
//     };

//   if (!description?.trim())
//     return {
//       target: "projectDescription",
//       message: "Loyiha tavsifini kiriting",
//     };

//   return false;
// }

export function validate(formData) {
  const errors = {};

  if (formData.senderAddress?.street?.trim() == "")
    errors.senderAddress = "Jo‘natuvchi ko‘cha manzilini kiriting";

  if (formData.senderAddress?.city?.trim() == "")
    errors.senderCity = "Jo‘natuvchi shahrini kiriting";

  if (formData.senderAddress?.postCode?.trim() == "")
    errors.senderPostCode = "Jo‘natuvchi pochta kodini kiriting";

  if (formData.senderAddress?.country?.trim() == "")
    errors.senderCountry = "Jo‘natuvchi davlatini kiriting";

  if (formData.clientName?.trim() == "")
    errors.clientName = "Mijoz ismini kiriting";

  if (formData.clientEmail?.trim() == "")
    errors.clientEmail = "Mijoz emailini kiriting";

  if (formData.clientAddress?.street?.trim() == "")
    errors.streetAddress = "Mijoz ko‘cha manzilini kiriting";

  if (formData.clientAddress?.city?.trim() == "")
    errors.city = "Mijoz shahrini kiriting";

  if (formData.clientAddress?.postCode?.trim() == "")
    errors.postCode = "Mijoz pochta kodini kiriting";

  if (formData.clientAddress?.country?.trim() == "")
    errors.country = "Mijoz davlatini kiriting";

  if (formData.invoiceDate?.trim() == "")
    errors.invoiceDate = "Invoice sanasini kiriting";

  if (formData.description?.trim() == "")
    errors.description = "Loyiha tavsifini kiriting";

  return errors;
}
