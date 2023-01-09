import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      // Background Color
      100: "#151515",

      200: "#4773E3",
      300: "#94ABFF",
      400: "#FFE485",
      // Border Color
      500: "#2B2B2B",
        // Footer Color
      600: "#232323",
      // Footer Right side color
      700: "#7AA0FF",
    }
  },
  styles: {
    global: (props:any) => ({
      body: {
        overflowX: "hidden",
        color: "white",
        bg: "brand.100",
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "white",
      },
      html: {
        fontFamily: "Inter",
      },
    }),
  },
};
