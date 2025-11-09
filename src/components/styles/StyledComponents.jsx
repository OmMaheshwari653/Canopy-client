import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { gray } from "../constants/color";

export const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  clip: "rect(0 0 0 0)",
  border: 0,
  padding: 0,
  height: "1px",
  width: "1px",
  overflow: "hidden",
});

export const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: `${gray}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${gray};
  font-size: 1.1rem;
`;

export const CurveButton = styled("button")({
  borderRadius: "1.5rem",
  padding: "1rem 2rem",
  border: "none",
  outline: "none",
  cursor: "pointer",
  backgroundColor: "black",
  color: "white",
  fontSize: "1.1rem",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

const bounceAnimation = keyframes`
0%{transform: scale(1)}
50%{transform: scale(1.5)}
100%{transform: scale(1)}
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));
