import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  // Placeholder for handling actions like adding to cart
  const formData = await request.formData();
  console.log("Action Form Data: ", formData);

  return null;
};
