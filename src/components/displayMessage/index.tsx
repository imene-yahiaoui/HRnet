/**
 * DisplayMessage Function
 *
 * This function displays a toast message using Toastify.
 *
 * @param {string} text - The text to be displayed in the toast message.
 * @param {string} background - The background color of the toast message.
 *
 * @return {void} This function does not return anything directly, but it displays a toast message.
 */
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
const DisplayMessage = (text: string, background: string) => {
  Toastify({
    text: text,
    close: true,
    duration: 3000,
    style: {
      background: background,
    },
  }).showToast();
};
export default DisplayMessage;
