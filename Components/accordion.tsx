import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fontTypes } from "@/utils/data";
import { AccordionActions } from "@mui/material";
import { useStore3 } from "@/Providers/zustand";

export default function BasicAccordion() {
  const store = useStore3();

  const handleSelect = (
    props: "Ubuntu" | "Libre" | "Spectral" | "OpenSans"
  ) => {
    store.setFont(props);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-xl font-semibold">Select your font.</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full flex flex-col items-start gap-3">
            {fontTypes.map((fontType, i) => (
              <AccordionActions
                onClick={() => {
                  handleSelect(fontType.types);
                }}
                className={`hover:text-blue-600 ${
                  store.font === fontType.types && "text-blue-600 font-semibold"
                } cursor-pointer`}
                key={i}
              >
                {fontType.fontName}
              </AccordionActions>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
