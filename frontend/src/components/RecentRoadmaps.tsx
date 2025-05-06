import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Clock, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RecentRoadmaps = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Load from localStorage into state
  const [recentRoadmaps, setRecentRoadmaps] = useState(() => {
    return JSON.parse(localStorage.getItem("recent-roadmaps") || "[]");
  });

  const recentThreeRoadmaps = recentRoadmaps.slice(0, 3);

  const navigateToRoadmap = (roadmap) => {
    localStorage.setItem("formData", JSON.stringify(roadmap.formData));
    localStorage.setItem(
      "failure-prediction",
      JSON.stringify(roadmap.failurePrediction),
    );
    localStorage.setItem(
      "legal-checklist",
      JSON.stringify(roadmap.legalChecklist),
    );
    localStorage.setItem("roadmap", JSON.stringify(roadmap.roadmap));
    localStorage.setItem("swot", JSON.stringify(roadmap.swotAnalysis));
    navigate("/roadmap-result");
    setIsOpen(false);
  };

  // ✅ Remove one roadmap
  const removeRoadmap = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = [...recentRoadmaps];
    updated.splice(index, 1);
    setRecentRoadmaps(updated);
    localStorage.setItem("recent-roadmaps", JSON.stringify(updated));
  };

  // ✅ Clear all
  const clear = () => {
    setRecentRoadmaps([]);
    localStorage.removeItem("recent-roadmaps");
  };

  // Toggle dropdown open/close
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-none" ref={dropdownRef}>
      <button
        className={cn(
          "flex items-center justify-between w-full sm:w-[225px] px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg",
          "bg-card hover:bg-muted/40 transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75",
          "border shadow-sm",
          isOpen ? "shadow-md" : "border-border/40",
        )}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-medium truncate">Recent Roadmaps</span>
        </div>
        <div className="flex items-center gap-2">
          {recentRoadmaps.length > 0 && (
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {Math.min(recentRoadmaps.length, 3)}
            </span>
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              isOpen ? "rotate-180" : "",
            )}
          />
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 bg-card rounded-lg shadow-lg border border-border/40 overflow-hidden",
              "w-[280px]",
            )}
          >
            <div>
              {recentThreeRoadmaps.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="w-10 h-10 sm:w-12 sm:h-12 opacity-40" />
                    <p className="text-sm">No recent roadmaps</p>
                  </div>
                </div>
              ) : (
                recentThreeRoadmaps.map((roadmap, index) => (
                  <div
                    key={`${roadmap.skill}-${roadmap.score}-${index}`}
                    className="group p-2 sm:p-3 border-b last:border-b-0 border-border/40 hover:bg-muted/30 cursor-pointer transition-all duration-200"
                    onClick={() => navigateToRoadmap(roadmap)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm group-hover:text-primary transition-colors duration-200 truncate">
                            {index + 1}
                            {" . "}
                            {roadmap.formData?.uniqueValueProposition?.substring(
                              0,
                              28,
                            )}
                            ...
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={(e) => removeRoadmap(e, index)}
                        className={cn(
                          "p-1.5 rounded-full hover:bg-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-primary",
                          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100",
                        )}
                        aria-label="Remove from recent roadmaps"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Clear All */}
            {recentThreeRoadmaps.length > 0 && (
              <div className="p-2 border-t border-border/40 bg-muted/10">
                <button
                  onClick={clear}
                  className="w-full text-center text-xs font-medium text-primary hover:underline py-1.5"
                >
                  Clear all roadmaps
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentRoadmaps;
