"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import { toPng } from "html-to-image";

/* ---------------------------------------------
   1) Define TypeScript Types
--------------------------------------------- */

// The “super categories” (pages 1, 2, 3):
type SuperCategory = "Basic needs" | "Physiological needs" | "Self-actualization";

// Subcategories for each super category:
type BasicNeedsSubcat = "Body & Health" | "Environment & Surroundings" | "Money & Finance";
type PhysioNeedsSubcat = "Family" | "Love" | "Work" | "Friendships & Social life" | "Leisure";
type SelfActualSubcat = "Self" | "Mindset and mood" | "Spirituality & Meaning";

// Union of all possible subcategories:
type SubCategory = 
  BasicNeedsSubcat | 
  PhysioNeedsSubcat | 
  SelfActualSubcat;

/* 
   Full shape of your superCategories object:
   Each super category maps to an object whose keys are subcategories 
   and whose values are arrays of strings (the “cards”).
*/
interface AllSuperCategories {
  "Basic needs": Record<BasicNeedsSubcat, string[]>;
  "Physiological needs": Record<PhysioNeedsSubcat, string[]>;
  "Self-actualization": Record<SelfActualSubcat, string[]>;
}

/* ---------------------------------------------
   2) The Data Objects (Full Lists)
--------------------------------------------- */

const superCategories: AllSuperCategories = {
  "Basic needs": {
    "Body & Health": [
      "Adopt a healthier diet",
      "Engage in regular exercise, including strength and cardio training",
      "Improve physical flexibility or posture",
      "Age gracefully",
      "Better skin routine",
      "Weight management",
      "Drink more water",
      "Improve sleep quality",
      "Manage stress levels",
      "Regular health check-ups",
      "Reduced reliance on substances (Drugs, Alcohol)",
      "Daily movement (e.g., walking, stretching)",
      "Take active breaks during the day (e.g., stand up, stretch)",
      "Limit screen time before bed",
      "Try a new physical activity or sport",
      "Improve balance & coordination",
      "Manage a specific health condition",
      "Practice mindful eating",
      "Reduce caffeine consumption",
      "Experiment with plant-based meals",
      "Practice deep breathing or relaxation exercises"
    ],
    "Environment & Surroundings": [
      "Make my home more cozy",
      "Declutter",
      "Spend more time in nature",
      "Organize  workspace",
      "Create a relaxation corner in your home",
      "Add plants or greenery to your space",
      "Have a tidier house",
      "Plan an upcoming move",
      "Find a new home",
      "Choose a new city / neighbourhood"
    ],
    "Money & Finance": [
      "Feel less insecure about money",
      "Understand my relationship with Money",
      "Teach my kids about money",
      "Have better conversations with my partner about money",
      "Reflect on how my spending aligns with my values",
      "Examine how money affects my sense of self-worth.",
      "Identify and track emotional triggers that lead to overspending",
      "Reflect on how my upbringing shaped my money habits.",
      "Reflect on how societal pressures influence my spending habits.",
      "Heal my relationship with money",
      "Explore how I can leave a legacy with my money",
      "Secure my chidren's financial future"
    ]
  },

  "Physiological needs": {
    Family: [
      "Less hovering over my children",
      "Heal a family feud",
      "Spend more quality time with my children",
      "Start a family",
      "Reconnect with my parents",
      "Reconnect with my children",
      "Have more boundaries",
      "Cutting a toxic family member out of my life",
      "Accepting my children's choices",
      "Start new family tradition",
      "Reconnect with my siblings",
      "Rebuild trust with a family member after a disagreement",
      "Have an honest conversation about unresolved family issues",
      "Work on being more patient with my family during conflicts",
      "Be more present during family gatherings by minimizing distractions",
      "Plan a family vacation or retreat to deepen connections",
      "Help a younger family member with a school, career, or life challenge",
      "Let go of resentment or grudges I have been holding toward a family member",
      "Accept that my family members may grow and change over time"
    ],
    Love: [
      "Get Married",
      "Find a partner",
      "Have more casual/meaningless sex",
      "Have emotionally closer sex",
      "Reconnect with my partner",
      "Have kinkier sex",
      "Settle down",
      "Deciding whether to stay or leave in a relationship",
      "Leave a relationship",
      "More fidelity",
      "Less sulking",
      "Express more gratitude to my partner",
      "More date nights",
      "More active listening towards my partner",
      "Have less arguments",
      "Dream more together",
      "Spend more quality time without distractions",
      "Build more intimacy",
      "Resolve one or more recurring conflicts",
      "Reassess my personal boundaries within the relationship",
      "Be more vulnerable",
      "Let go of resentmet",
      "Learn something new e.g. new skills or hobbies",
      "Surprise my partner more",
      "Have more adventures together"
    ],
    Work: [
      "Find more fulffing work",
      "Travel less",
      "Fewer late nights",
      "Less imposter syndrome",
      "Less perfectionism",
      "Live abroad",
      "Improve Management skills",
      "Better relationships with colleagues",
      "Be more assertive around colleagues",
      "Gaining more confidence to ask for things",
      "Greater recognition",
      "Quitting job",
      "Starting my own business",
      "Less manic ambition",
      "Earning more money",
      "Procrastinating less",
      "Greater ambition",
      "Delegate more",
      "Reflect on my long-term career goals",
      "Build a side hustle",
      "Elevate my knowledge and skills"
    ],
    "Friendships & Social life": [
      "Reconnect with old friends",
      "Less social engagements",
      "Being more vulnerable with friends",
      "Meet new people",
      "Caring less about the opinions of people I dislike",
      "Being less jealous of friends",
      "Talking more to strangers",
      "Having deeper, more meaningful conversations",
      "More parties",
      "Fewer but deeper friends",
      "Less status anxiety",
      "More time alone",
      "Less people pleasing",
      "Making peace with an enemy",
      "Get rid of frenemies",
      "Reflect on what I value most in my friendships.",
      "Set healthier boundaries with friends who drain my energy",
      "Apologize to a friend I have hurt or neglected",
      "Reassess friendships that no longer align with my values",
      "Be more consistent in checking in with friends",
      "Let go of resentment or grudges toward a friend.",
      "Initiate plans with friends instead of waiting for them to reach out"
    ],
    Leisure: [
      "Quieter weekends",
      "Less screen time",
      "Less mindless scrolling",
      "More fresh air",
      "Reading more",
      "Cooking more",
      "Earlier bedtime",
      "More arts and culture",
      "More creativity",
      "Visit new places",
      "More adventurous weekends",
      "More sunsets or sunrises",
      "More stargazing",
      "Less time on social media",
      "More music",
      "More exploration"
    ]
  },

  "Self-actualization": {
    Self: [
      "Enjoy the smaller pleasures",
      "Greater engagement with science",
      "Greater engagement with arts and culture",
      "Less cynicism",
      "More emotional maturity",
      "Overcoming traumas and wounds",
      "More self-reflection",
      "Less self-sabotage",
      "Accepting my limitations",
      "More self-love",
      "Seek therapy",
      "Forgive myself",
      "Being less irritable",
      "Greater curiosity",
      "Less regret",
      "More gratitude",
      "Being more vulnerable",
      "Greater self-confidence",
      "Greater Spontaneity",
      "More day-dreaming",
      "Embrace uncertainty and let go of control",
      "Being kinder to myself",
      "Stand up for myself more"
    ],
    "Mindset and mood": [
      "More patience",
      "More wonder",
      "Being more stoic",
      "Being more \"in the moment\"",
      "Less anxiety",
      "Less anger",
      "Less shame",
      "Less despair",
      "Less guilt",
      "Less negativity",
      "Identify my limiting beliefs",
      "Label my emotions",
      "Laugh more",
      "Understand my triggers"
    ],
    "Spirituality & Meaning": [
      "Finding my purpose",
      "Discovering my true talents",
      "Being happier with what I have",
      "More charitable work",
      "Accepting ageing and mortality",
      "Reflect on the legacy I want to leave behind",
      "Explore a spiritual or philosophical text",
      "Meditate or pray more",
      "Less material",
      "Find greater alignment with my authentic self",
      "Find my inner voice"
    ]
  }
};

/** 
 * How many cards can be selected per super category 
 */
const maxSelections: Record<SuperCategory, number> = {
  "Basic needs": 5,
  "Physiological needs": 4,
  "Self-actualization": 2
};

/** 
 * Short intros for pages 1–3 
 */
const pageIntros: Record<SuperCategory, string> = {
  "Basic needs":
    "Basic Needs are foundational. They include aspects like Body & Health, Environment & Surroundings, and Money & Finance. Focusing on these helps ensure your day-to-day stability and security.",
  "Physiological needs":
    "Physiological Needs (and related social needs) include Family, Love, Work, Friendships, and Leisure. These are about emotional well-being, connection, and a sense of belonging.",
  "Self-actualization":
    "Self-Actualization is about personal growth and fulfillment, including self-discovery, mindset, and spirituality/meaning. It’s the highest level of Maslow’s hierarchy."
};

/* ---------------------------------------------
   3) The React Component
--------------------------------------------- */

export default function CardGame() {
  /**
   * page = 0 => Intro
   * page = 1 => Basic needs
   * page = 2 => Physiological needs
   * page = 3 => Self-actualization
   * page = 4 => Results
   */
  const [page, setPage] = useState<number>(0);

  /**
   * selectedCards will map a subcategory (string key) to an array of selected card strings.
   * For example: { "Body & Health": ["Adopt a healthier diet"], "Family": [...] }
   */
  const [selectedCards, setSelectedCards] = useState<Partial<Record<SubCategory, string[]>>>({});

  /**
   * Collapsed by default => set all to false
   * Subcategory => boolean
   */
  const defaultExpandedState: Record<SubCategory, boolean> = {
    "Body & Health": false,
    "Environment & Surroundings": false,
    "Money & Finance": false,
    Family: false,
    Love: false,
    Work: false,
    "Friendships & Social life": false,
    Leisure: false,
    Self: false,
    "Mindset and mood": false,
    "Spirituality & Meaning": false
  };

  const [expandedCategories, setExpandedCategories] = useState<Record<SubCategory, boolean>>({
    ...defaultExpandedState
  });

  // ------------------ NAVIGATION ------------------
  const goToNextPage = () => setPage((prev) => prev + 1);
  const goToPreviousPage = () => setPage((prev) => prev - 1);

  // Re-collapse categories each time we land on pages 1–3
  useEffect(() => {
    if (page >= 1 && page <= 3) {
      setExpandedCategories({ ...defaultExpandedState });
    }
  }, [page]);

  // ------------------ UTILITY FUNCTIONS ------------------

  function getSuperCategory(): SuperCategory {
    // page=1 => "Basic needs", page=2 => "Physiological needs", page=3 => "Self-actualization"
    const keys = Object.keys(superCategories) as SuperCategory[];
    return keys[page - 1];
  }

  function getTotalSelectedInSuperCategory(superCategory: SuperCategory): number {
    const subCats = Object.keys(superCategories[superCategory]) as SubCategory[];
    return subCats.reduce((sum, subCat) => {
      const arr = selectedCards[subCat] || [];
      return sum + arr.length;
    }, 0);
  }

  function toggleCardSelection(category: SubCategory, card: string) {
    const currentSuperCategory = getSuperCategory();
    const limit = maxSelections[currentSuperCategory];
    const totalSelected = getTotalSelectedInSuperCategory(currentSuperCategory);

    const currentSelection = selectedCards[category] || [];
    const isSelected = currentSelection.includes(card);

    if (isSelected) {
      // remove
      setSelectedCards({
        ...selectedCards,
        [category]: currentSelection.filter((c) => c !== card)
      });
    } else {
      // add
      if (totalSelected < limit) {
        setSelectedCards({
          ...selectedCards,
          [category]: [...currentSelection, card]
        });
      } else {
        alert(
          `You can only select up to ${limit} cards in the ${currentSuperCategory} category.`
        );
      }
    }
  }

  function toggleCategory(category: SubCategory) {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  }

  function getSelectedCardsByCategory(superCategory: SuperCategory): string[] {
    const subCats = Object.keys(superCategories[superCategory]) as SubCategory[];
    return subCats.flatMap((sc) => selectedCards[sc] || []);
  }

  // ------------------ CLEAR SELECTIONS ------------------
  function clearCurrentCategory() {
    const currentSuperCategory = getSuperCategory();
    if (!currentSuperCategory) return;

    const newSelectedCards = { ...selectedCards };
    const subCats = Object.keys(superCategories[currentSuperCategory]) as SubCategory[];
    subCats.forEach((subCat) => {
      newSelectedCards[subCat] = [];
    });
    setSelectedCards(newSelectedCards);
  }

  function clearAllSelections() {
    setSelectedCards({});
  }

  // ------------------ SAVE PYRAMID AS IMAGE ------------------
  function savePyramidAsImage() {
    const pyramidRef = document.getElementById("pyramid");
    if (!pyramidRef) {
      console.error("Pyramid container not found.");
      return;
    }

    // Scroll up to ensure the entire container is visible
    window.scrollTo(0, 0);

    setTimeout(() => {
      // measure boundingRect to capture the full layout
      const rect = pyramidRef.getBoundingClientRect();

      toPng(pyramidRef, {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        pixelRatio: 2,
        style: {
          backgroundColor: "#000",
          overflow: "visible"
        }
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "pyramid.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to generate image:", err);
        });
    }, 1500); // Wait 1.5s for layout to stabilize
  }

  // ------------------ RENDER ------------------
  return (
    <div style={styles.container}>
      {/* PAGE 0: Intro */}
      {page === 0 && (
        <div style={styles.introPage}>
          <div style={styles.logoContainer}>
            <img src="/WIQ logo.png" alt="WealthIQ Logo" style={styles.logo} />
          </div>
          <h1>Welcome to Your Goal Visualization Journey</h1>
          <p>
            This is a reflective exercise that can take 1-2 hours to complete. Take your time and
            think deeply about each choice.
          </p>
          <p>
            This game helps you focus on your priorities inspired by Maslow's hierarchy of needs.
          </p>
          <div style={{ margin: "20px 0" }}>
            <button style={styles.button} onClick={goToNextPage}>
              Start
            </button>
          </div>
        </div>
      )}

      {/* PAGE 1-3: Category selection pages */}
      {page > 0 && page < 4 && (
        <div style={styles.categoryPage}>
          <h1 style={styles.pageTitle}>{getSuperCategory()}</h1>
          <p style={styles.pageIntro}>{pageIntros[getSuperCategory()]}</p>
          <p style={styles.pageInstructions}>
            Select up to {maxSelections[getSuperCategory()]} cards from this page
          </p>

          {Object.entries(superCategories[getSuperCategory()]).map(([category, cards]) => {
            const catKey = category as SubCategory;
            const subCatSelections = (selectedCards[catKey] || []).length;
            const totalSelectedInSuperCat = getTotalSelectedInSuperCategory(getSuperCategory());
            const limit = maxSelections[getSuperCategory()];

            return (
              <div key={category} style={styles.categoryContainer}>
                <div style={styles.categoryHeader} onClick={() => toggleCategory(catKey)}>
                  <h2 style={styles.categoryHeaderText}>
                    {category} ({subCatSelections} selected | total {totalSelectedInSuperCat}/
                    {limit})
                    <span style={{ marginLeft: "10px", fontSize: "1.2rem" }}>
                      {expandedCategories[catKey] ? "▲" : "▼"}
                    </span>
                  </h2>
                </div>

                {expandedCategories[catKey] && (
                  <div style={styles.cardsContainer}>
                    {cards.map((card) => {
                      const isSelected = (selectedCards[catKey] || []).includes(card);
                      return (
                        <div
                          key={card}
                          onClick={() => toggleCardSelection(catKey, card)}
                          style={{
                            ...styles.card,
                            backgroundColor: isSelected ? "#FFD5E5" : "#fff",
                            color: "#000"
                          }}
                        >
                          {card}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div style={styles.navigationButtons}>
            <button style={{ ...styles.button, marginRight: "20px" }} onClick={goToPreviousPage}>
              Previous
            </button>
            <button style={{ ...styles.button, marginRight: "20px" }} onClick={clearCurrentCategory}>
              Clear This Category
            </button>
            <button style={{ ...styles.button, marginRight: "20px" }} onClick={clearAllSelections}>
              Clear All
            </button>
            <button style={styles.button} onClick={goToNextPage}>
              {page === 3 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}

      {/* PAGE 4: Results (the left‐label “pyramid”) */}
      {page === 4 && (
        <div style={styles.resultsPage}>
          <h2>Your Priorities Pyramid</h2>
          <p>Here is your pyramid visualization:</p>

          <div id="pyramid" style={styles.pyramidContainer}>
            {/* Self-actualization row (top) */}
            <div style={styles.pyramidRow}>
              <div style={styles.pyramidLabel}>Self-actualization</div>
              <div style={{ ...styles.pyramidLevel, justifyContent: "center", marginTop: "0px" }}>
                {getSelectedCardsByCategory("Self-actualization").map((card, i) => (
                  <div key={`self-${i}`} style={styles.pyramidCard}>
                    {card}
                  </div>
                ))}
              </div>
            </div>

            {/* Physiological needs row (middle) */}
            <div style={styles.pyramidRow}>
              <div style={styles.pyramidLabel}>Physiological needs</div>
              <div style={{ ...styles.pyramidLevel, justifyContent: "center", marginTop: "20px" }}>
                {getSelectedCardsByCategory("Physiological needs").map((card, i) => (
                  <div key={`physio-${i}`} style={styles.pyramidCard}>
                    {card}
                  </div>
                ))}
              </div>
            </div>

            {/* Basic needs row (bottom) */}
            <div style={styles.pyramidRow}>
              <div style={styles.pyramidLabel}>Basic needs</div>
              <div style={{ ...styles.pyramidLevel, justifyContent: "center", marginTop: "20px" }}>
                {getSelectedCardsByCategory("Basic needs").map((card, i) => (
                  <div key={`basic-${i}`} style={styles.pyramidCard}>
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.resultsButtons}>
            <button style={{ ...styles.button, marginRight: "20px" }} onClick={savePyramidAsImage}>
              Save as Image
            </button>
            <button style={styles.button} onClick={() => setPage(0)}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------
   4) Styles with TypeScript
--------------------------------------------- */
const styles: Record<string, CSSProperties> = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    overflow: "visible"
  },
  introPage: {
    padding: "20px"
  },
  logoContainer: {
    marginBottom: "20px"
  },
  logo: {
    width: "120px",
    height: "auto"
  },
  categoryPage: {
    padding: "20px"
  },
  pageTitle: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#FFD5E5"
  },
  pageIntro: {
    fontSize: "1rem",
    margin: "0 auto 20px",
    width: "80%",
    maxWidth: "600px",
    color: "#D5F5E3"
  },
  pageInstructions: {
    fontSize: "1.2rem",
    marginBottom: "20px"
  },
  categoryContainer: {
    marginBottom: "20px"
  },
  categoryHeader: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "10px",
    backgroundColor: "#D5F5E3"
  },
  categoryHeaderText: {
    color: "#000",
    fontSize: "1.2rem",
    margin: 0
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px"
  },
  card: {
    border: "1px solid #D47392",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textAlign: "center",
    width: "140px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    wordWrap: "break-word",
    fontSize: "0.8rem",
    lineHeight: "1.2",
    backgroundColor: "#fff",
    color: "#000"
  },
  navigationButtons: {
    marginTop: "20px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#D47392",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  resultsPage: {
    padding: "20px"
  },
  pyramidContainer: {
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#000",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "1000px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "flex-start" // So the label is flush left
  },
  // Each row: label on left + cards on the right
  pyramidRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "10px",
    width: "100%"
  },
  pyramidLabel: {
    width: "150px", // Adjust as needed
    color: "#FFD5E5",
    fontWeight: "bold",
    marginTop: "20px",
    justifyContent: "center",
    textAlign: "right"
  },
  pyramidLevel: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    flex: 1 // let the row expand
  },
  pyramidCard: {
    border: "1px solid #D47392",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#FFD5E5",
    width: "140px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    wordWrap: "break-word",
    textAlign: "center",
    fontSize: "0.8rem",
    lineHeight: "1.2",
    color: "#000"
  },
  resultsButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  }
};
