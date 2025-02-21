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
        "Uses buttons with down arrows; supports TAB for quick actions.",
      "Functional Capabilities":
        "Modals, arrow keys, and enter supported; no drag/drop or right-click.",
      "Learnability & Efficiency":
        "Labeled UI; quick item addition but editing takes extra steps.",
      Accessibility:
        "Screen reader compatible; poor tab order; good color contrast; hover highlights.",
      "Dropdown Behavior": "Expands with subtle animation from button.",
      "Interactable Indicators": "Background lightens on hover.",
      "Screen Reader": "Reads focused items; hints for selection.",
      "Keyboard Navigation": "TAB-selectable; arrow keys work after selection.",
      "Workflow Impact": "Triggers a modal navigable by arrow keys & enter.",
      Notes: "Hover animations and screen reader hints aid usability.",
      "Dropdown Annotations": "./images/gcal.png",
    },
    Slack: {
      "Interaction Process":
        "Uses buttons with down arrows; channels open on click; no keyboard dropdown access.",
      "Functional Capabilities":
        "Displays & reorders channels; no drag/drop or right-click.",
      "Learnability & Efficiency":
        "Nested dropdowns slow navigation; overwhelming options.",
      Accessibility:
        "Screen reader compatible but skips secondary labels; no tab access.",
      "Dropdown Behavior": "Simple dropdown without animation.",
      "Interactable Indicators":
        "Background lightens; extra down arrow appears on hover.",
      "Screen Reader": "Reads items but omits 'up to date' notifications.",
      "Keyboard Navigation": "Mouse-only; arrows work after opening dropdown.",
      "Workflow Impact":
        "Updates right panel; side options can be overwhelming.",
      Notes: "Clear visual feedback, poor keyboard accessibility.",
      "Dropdown Annotations": "./images/slack.png",
    },
    Spotify: {
      "Interaction Process":
        "Uses three-dot buttons; toggles sorting; fully keyboard navigable.",
      "Functional Capabilities":
        "Supports arrow keys, enter, and reversible sorting; no drag/drop or right-click.",
      "Learnability & Efficiency":
        "Intuitive; green checkmarks indicate active states.",
      Accessibility:
        "Fully keyboard & screen reader accessible; easy tab access.",
      "Dropdown Behavior": "Simple dropdown, no animation.",
      "Interactable Indicators": "Text lightens to white on hover.",
      "Screen Reader": "Reads items but skips first option on entry.",
      "Keyboard Navigation":
        "Easily accessible via TAB; arrow keys & enter fully supported.",
      "Workflow Impact":
        "Dropdown closes after selection; reversible actions need re-entry.",
      "Dropdown Annotations": "./images/spotify.png",
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
            Redesigning Spotify's Dropdown Menu
          </h1>
          <div style={{ color: "white", width: "350px", fontSize: "large" }}>
            The current webpage will display my journey analyzing, designing and
            creating my own drop down component inspired by Spotify's dropdown.
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
              design often goes unnoticed—until they don’t work well. In this
              case we will be analyzing 3 dropdown and then redesigning one of
              them while incorporating the positive aspects of the otherones.
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
            <h3 className="imageTextSmall">
              While this worklow works really good for experienced users, having
              the dropdown close down after every action disencourages
              exploration for new users.
            </h3>
            <img src={"./images/sKey.png"} className="imageAnalysis" />
            <h3 className="imageTextSmall">
              Same issue here, after every action the dropdown closes.
              Additionally, when opening the component with tab the first
              element is not read by the screen reader.
            </h3>
            <h2 className="imageText">Redesign of Workflow</h2>
            <img src={"./images/mKey.png"} className="imageAnalysis" />
            <h3 className="imageTextSmall">
              To solve spotify's issue we will no longer close the dropdown upon
              interacting with it. Additionally hover options will now hold more
              information on their respective actions.
            </h3>
            <img src={"./images/mMouse.png"} className="imageAnalysis" />
            <h3 className="imageTextSmall">
              Just like with the mouse users will be able to re-choose selected
              options without the dropdown closing. All hover extra info will
              always display.
            </h3>
            <h3 className="imageTextSmall"></h3>
            <h2 className="imageText">Final Dropdown Design</h2>
            <img src={"./images/finald.png"} className="imageAnalysis" />
            <h3 className="imageTextSmall">
              As we can see this final design solves many of the issues in
              spotify's design. The dropdown no longer collapses, a dropdown
              icon is added for better clarity and also arrow signs are added to
              indicate whether an option has a binary state. Additionally, I
              added dynamic aria labels to make sure that users know which items
              are being hovered, or have already been selected.
            </h3>
          </div>

          <h2 className="section-title">
            Reflection on accesibility and mismatches on design
          </h2>
          <p>
            The observed components performed well in usability and
            accessibility, particularly in being screen reader compatible,
            having clear labels for users with eyesight impairments, and
            allowing keyboard-only navigation. However, accessibility gaps
            included the lack of dynamic ARIA labels (not notifiying when
            something has already been selected) and dropdowns closing upon
            selection, which were addressed in my design to enhance screen
            reader feedback and facilitate seamless keyboard navigation. These
            improvements help bridge accessibility mismatches by ensuring a more
            inclusive experience. For example, keyboard-only users struggle with
            dropdown navigation in Slack, while Spotify’s use of accent-colored
            icons aids users with visual impairments. Design priorities often
            favor mouse and mobile users, which can negatively impact keyboard
            and screen reader accessibility, limiting efficient navigation and
            usability.
          </p>
          <section className="conclusion-section">
            <h2 className="section-title">Conclusion</h2>
            <p>
              This project taught me that designing a great dropdown is about
              balancing usability, efficiency, and accessibility. By analyzing
              existing designs and iterating on their strengths and weaknesses,
              I created a dropdown component that is intuitive, accessible, and
              efficient.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
