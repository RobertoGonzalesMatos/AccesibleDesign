import React, { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown";
import { ReactComponent as ListIcon } from "./components/list.svg";
import { ReactComponent as ThreeLinesIcon } from "./components/threeLines.svg";
import { ReactComponent as Drop } from "./components/drop.svg";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";

function App() {
  const [viewMode, setViewMode] = useState("features");
  const [compact, isCompact] = useState(false);
  const [showAccordions, setShowAccordions] = useState(false);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    setShowAccordions(false);
    const timer = setTimeout(() => setShowAccordions(true), 1);
    return () => clearTimeout(timer);
  }, [compact]);

  const handleSelect = (
    section: string,
    item: { label: string },
    binaryState?: number
  ) => {
    if (section === "View Order") {
      setViewMode(item.label.toLowerCase());
      if (binaryState && binaryState == 1) {
        setReverse(true);
      } else {
        setReverse(false);
      }
    }
    if (section === "Display") {
      const a = compact;
      isCompact(item.label !== "Compact");
    }
  };

  const viewOptions = [
    {
      title: "View Order",
      useAsDropTitle: true,
      items: [
        { label: "Apps", hasBinaryState: true, binaryState: 1 },
        { label: "Features" },
      ],
    },
    {
      title: "Display",
      useAsDropTitle: false,
      useIcon: true,
      items: [
        { label: "Compact", icon: <ThreeLinesIcon /> },
        { label: "List", icon: <ListIcon /> },
      ],
    },
  ];

  const analysisTable: Record<string, Record<string, string>> = {
    GCal: {
      "Interaction Process":
        "Uses buttons with down arrows; supports TAB navigation for quick actions.",
      "Functional Capabilities":
        "Displays modals; supports arrow keys and enter; no drag/drop, no right-click or double-click actions.",
      "Learnability, Memorability, and Efficiency":
        "Labeled, consistent UI; efficient but limited; centralized actions make it quick for users to add items but editing requires additional steps.",
      "Accessibility Comparison":
        "Screen reader compatible; poor tab order; good color contrast and large font; hover distinctions indicate interactivity.",
      "Dropdown Selection Behavior":
        "Expands dropdown with subtle animation growing from the button.",
      "Interactable Indicators": "Background lightens on hover.",
      "Screen Reader Compatibility":
        "Reads focused items; offers hints for selecting items.",
      "Tab Selectability and Navigation":
        "Selectable with TAB but last in cycle; arrow keys don’t work until dropdown is selected.",
      "Option Selection and Workflow Impact":
        "Triggers modal upon selection; modal can be navigated with arrow keys and enter.",
      "Additional Notes":
        "Hover animations and screen reader hints aid usability.",
      "Dropdown Annotations": "./images/gcal.png", // Add image path
    },
    Slack: {
      "Interaction Process":
        "Uses buttons with down arrows; channels display on click; no keyboard navigation to open the dropdown.",
      "Functional Capabilities":
        "Displays channels; visually reorders them; no drag/drop, no right-click or double-click actions.",
      "Learnability, Memorability, and Efficiency":
        "Nested dropdowns reduce efficiency; can be overwhelming due to too many options.",
      "Accessibility Comparison":
        "Screen reader compatible but secondary labels are skipped; no tab access to dropdown.",
      "Dropdown Selection Behavior": "Simple dropdown without animation.",
      "Interactable Indicators":
        "Background lightens and an additional down arrow appears on hover.",
      "Screen Reader Compatibility":
        "Reads items but omits 'up to date' notifications.",
      "Tab Selectability and Navigation":
        "Not accessible via keyboard; only usable with mouse clicks; arrows work after dropdown is open.",
      "Option Selection and Workflow Impact":
        "Changes the right-side panel with selected channel options but side options can be overwhelming.",
      "Additional Notes":
        "Visual feedback is clear, but keyboard accessibility is poor.",
      "Dropdown Annotations": "./images/slack.png", // Add image path
    },
    Spotify: {
      "Interaction Process":
        "Uses buttons with three dots; toggles sorting features; fully keyboard navigable.",
      "Functional Capabilities":
        "Supports arrow key navigation, enter selection, and reversible sorting on double-click; no drag/drop or right-click actions.",
      "Learnability, Memorability, and Efficiency":
        "Highly intuitive; visible active states with green checkmarks; efficient except for reversible actions requiring a full dropdown cycle.",
      "Accessibility Comparison":
        "Fully keyboard and screen reader accessible; easy tab access and good hover indicators.",
      "Dropdown Selection Behavior": "Simple dropdown with no animation.",
      "Interactable Indicators": "Text lightens to white on hover.",
      "Screen Reader Compatibility":
        "Reads items but skips the first option on initial entry.",
      "Tab Selectability and Navigation":
        "Easily accessible via TAB (5th in cycle); arrow keys and enter are fully supported.",
      "Option Selection and Workflow Impact":
        "Closes dropdown after selection; reversible actions require re-entering the dropdown.",
      "Dropdown Annotations": "./images/spotify.png", // Add image path
    },
  };

  const categories = Object.keys(Object.values(analysisTable)[0]);
  const apps = Object.keys(analysisTable);
  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          alignContent: "start",
          marginRight: "50px",
          width: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "500px",
          }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: "white" }}>
            My Dropdown Journey
          </h1>
          <div style={{ color: "white", width: "350px", fontSize: "large" }}>
            The current webpage will display my journey analyzing, designing and
            creating my own drop down component.
          </div>
          <div
            style={{
              height: "100px",
            }}
          >
            <Dropdown
              sections={viewOptions}
              closeOnSelect={false}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>

      <div
        className="app-content space-y-3"
        style={{
          position: "absolute",
          overflowY: "scroll",
          scrollbarWidth: "none",
          height: "920px",
          right: "100px",
          maxWidth: "900px",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <section className="intro-section">
            <h2 className="section-title">Why Dropdowns Matter</h2>
            <p>
              Dropdowns are a fundamental part of user interfaces, but their
              design often goes unnoticed—until they don’t work well. By
              focusing on accessibility and usability, we can create components
              that work for everyone, not just the majority.
            </p>
          </section>
          <h2 className="text-2xl font-semibold mb-2">
            Complete Analysis Overview ({viewMode})
          </h2>
          {showAccordions &&
            (reverse
              ? [...(viewMode === "features" ? categories : apps)].reverse()
              : viewMode === "features"
              ? categories
              : apps
            ).map((item) => (
              <Accordion
                key={item}
                defaultExpanded={compact}
                disableGutters
                elevation={0}
                className="transition-all border-b border-gray-200 hover:bg-gray-50"
                style={{
                  backgroundColor: "#f2f9ff",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <div style={{ maxWidth: "18px", maxHeight: "18px" }}>
                      <Drop />
                    </div>
                  }
                  className="py-2"
                >
                  <Typography
                    variant="h6"
                    className="font-medium text-gray-800"
                  >
                    {item}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="pl-4 space-y-1">
                  {(viewMode === "features" ? apps : categories).map(
                    (subItem) => (
                      <Typography key={subItem} className="accordionText">
                        <strong>{subItem}:</strong>{" "}
                        {!(
                          subItem === "Dropdown Annotations" ||
                          item === "Dropdown Annotations"
                        ) &&
                          (analysisTable[subItem]?.[item] ||
                            analysisTable[item]?.[subItem] ||
                            "N/A")}
                        {(subItem === "Dropdown Annotations" ||
                          item === "Dropdown Annotations") && (
                          <img
                            src={
                              analysisTable[subItem]?.[item] ||
                              analysisTable[item]?.[subItem]
                            }
                            alt="Dropdown Annotations"
                            className="mt-2"
                            style={{ width: "850px" }}
                          />
                        )}
                      </Typography>
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          <div>
            <h2 className="section-title">Visual Walkthrough</h2>
            <h2 className="imageText">
              Analysis of Spotify's dropdown workflow
            </h2>
            <img src={"./images/sMouse.png"} className="imageAnalysis" />
            <img src={"./images/sKey.png"} className="imageAnalysis" />
            <h2 className="imageText">Redesign of Workflow</h2>
            <img src={"./images/mMouse.png"} className="imageAnalysis" />
            <img src={"./images/mKey.png"} className="imageAnalysis" />
            <h2 className="imageText">Final Dropdown Design</h2>
            <img src={"./images/finald.png"} className="imageAnalysis" />
          </div>

          <section className="conclusion-section">
            <h2 className="section-title">Conclusion</h2>
            <p>
              This project taught me that designing a great dropdown is about
              balancing usability, efficiency, and accessibility. By analyzing
              existing designs and iterating on their strengths and weaknesses,
              I created a dropdown component that is intuitive, accessible, and
              efficient. Whether you’re a designer, developer, or just someone
              interested in UI/UX, I hope this journey inspires you to think
              critically about the components you use every day.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
