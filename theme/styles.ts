import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/inter"

// If you need a spacing of 40px, divide it by 4. That'll give you 10. Then use it in your component.


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

      //Blue Border Color
      800: "#4A83EE"
    }
  },
  styles: {
    global: (props:any) => ({
      body: {
        overflowX: "hidden",
        color: "white",
        bg: "brand.100",
        fontFamily: "Inter",
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
