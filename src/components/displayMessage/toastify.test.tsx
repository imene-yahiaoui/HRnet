import DisplayMessage from "./index";
import Toastify from "toastify-js";

// Mock Toastify
jest.mock("toastify-js", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    showToast: jest.fn(),
    options: {},
    toastElement: null,
    hideToast: jest.fn(),
  }),
}));

describe("DisplayMessage function", () => {
  beforeEach(() => {
    // mock before each test
    (Toastify as jest.MockedFunction<typeof Toastify>).mockClear();
    (Toastify as jest.MockedFunction<typeof Toastify>).mockReturnValue({
      showToast: jest.fn(),
      options: {},
      toastElement: null,
      hideToast: jest.fn(),
    });
  });

  it("should call Toastify with correct parameters", () => {
    DisplayMessage("Test Message", "blue");
    expect(Toastify).toHaveBeenCalledWith({
      text: "Test Message",
      close: true,
      duration: 3000,
      style: {
        background: "blue",
      },
    });
  });
});
