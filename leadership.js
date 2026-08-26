/* =========================================================
   LEADERSHIP PAGE JAVASCRIPT
   TWC LTD
   Includes:
   - Leadership Model
   - Principle Detail Panel
   - Leadership Under Pressure Accordions
   - Leadership Metrics Count-Up
   - Leadership Journey Timeline
   - Leadership in Action Accordions
   - Keyboard Accessibility
   - Responsive Accordion Height Handling
   IMPORTANT:
   This file is self-contained and should replace the
   existing Leadership page JavaScript.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       LEADERSHIP MODEL
    ===================================================== */
    const principleData = {
        clarity: {
            number: "01",
            icon: "◎",
            title: "Clarity",
            description:
                "I establish a clear purpose, outcomes and decision framework so teams understand where we are going, why it matters and what success looks like.",
            tags: [
                "Direction",
                "Prioritisation",
                "Decision making"
            ]
        },
        trust: {
            number: "02",
            icon: "◈",
            title: "Trust & Empowerment",
            description:
                "I trust people to make decisions within clear boundaries. I encourage challenge, ownership and initiative rather than unnecessary layers of control.",
            tags: [
                "Empowerment",
                "Ownership",
                "Autonomy"
            ]
        },
        accountability: {
            number: "03",
            icon: "✓",
            title: "Accountability",
            description:
                "Accountability is not about blame. It is about clear ownership, visible commitments and having the confidence to address issues early.",
            tags: [
                "Ownership",
                "Commitments",
                "Outcomes"
            ]
        },
        communication: {
            number: "04",
            icon: "↗",
            title: "Communication",
            description:
                "I communicate early, honestly and at the right level. Difficult messages are easier to manage when people understand the context, options and implications.",
            tags: [
                "Transparency",
                "Stakeholders",
                "Engagement"
            ]
        }
    };
    const modelNodes =
        document.querySelectorAll(".leadership-model-node");
    const principlePanel =
        document.getElementById("leadership-principle-panel");
    const principleIcon =
        principlePanel?.querySelector(".principle-panel-icon");
    const principleLabel =
        principlePanel?.querySelector(".principle-panel-label");
    const principleTitle =
        document.getElementById("principle-title");
    const principleDescription =
        document.getElementById("principle-description");
    const principleTags =
        document.getElementById("principle-tags");
    function updatePrinciple(principleKey) {
        const data = principleData[principleKey];
        if (!data) return;
        /* Update active node */
        modelNodes.forEach(node => {
            const isActive =
                node.dataset.principle === principleKey;
            node.classList.toggle(
                "active",
                isActive
            );
            node.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );
        });
        if (!principlePanel) return;
        /* Update panel content */
        if (principleIcon) {
            principleIcon.textContent = data.icon;
        }
        if (principleLabel) {
            principleLabel.textContent =
                `PRINCIPLE ${data.number}`;
        }
        if (principleTitle) {
            principleTitle.textContent =
                data.title;
        }
        if (principleDescription) {
            principleDescription.textContent =
                data.description;
        }
        /* Update tags */
        if (principleTags) {
            principleTags.innerHTML = "";
            data.tags.forEach(tag => {
                const span =
                    document.createElement("span");
                span.textContent = tag;
                principleTags.appendChild(span);
            });
        }
        /* Restart panel animation */
        principlePanel.classList.remove(
            "leadership-panel-refresh"
        );
        requestAnimationFrame(() => {
            principlePanel.classList.add(
                "leadership-panel-refresh"
            );
        });
    }
    /* Model node click */
    modelNodes.forEach(node => {
        node.addEventListener("click", () => {
            updatePrinciple(
                node.dataset.principle
            );
        });
        /* Keyboard accessibility */
        node.addEventListener("keydown", event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                updatePrinciple(
                    node.dataset.principle
                );
            }
        });
    });
    /* =====================================================
       LEADERSHIP UNDER PRESSURE
       SMOOTH ACCORDION
    ===================================================== */
    const scenarioHeaders =
        document.querySelectorAll(".scenario-header");
    function getScenarioContent(header) {
        if (!header) return null;
        return header.parentElement?.querySelector(
            ".scenario-content"
        ) || null;
    }
    function closeScenario(header, content) {
        if (!header || !content) return;
        header.classList.remove("active");
        header.setAttribute(
            "aria-expanded",
            "false"
        );
        /*
         * Force the collapsed state.
         *
         * Using max-height rather than display:none
         * allows the CSS transition to animate smoothly.
         */
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        content.style.visibility = "hidden";
        const plus =
            header.querySelector(".scenario-plus");
        if (plus) {
            plus.textContent = "+";
        }
    }
    function openScenario(header, content) {
        if (!header || !content) return;
        header.classList.add("active");
        header.setAttribute(
            "aria-expanded",
            "true"
        );
        /*
         * Make content measurable before calculating
         * its actual height.
         */
        content.style.visibility = "visible";
        content.style.opacity = "1";
        /*
         * Reset first so scrollHeight is always recalculated.
         */
        content.style.maxHeight = "none";
        const contentHeight =
            content.scrollHeight;
        content.style.maxHeight =
            contentHeight + "px";
        const plus =
            header.querySelector(".scenario-plus");
        if (plus) {
            plus.textContent = "−";
        }
    }
    function refreshOpenScenarios() {
        scenarioHeaders.forEach(header => {
            if (
                header.getAttribute("aria-expanded") !== "true"
            ) {
                return;
            }
            const content =
                getScenarioContent(header);
            if (!content) return;
            /*
             * Temporarily remove the fixed max-height,
             * measure the natural height, then restore it.
             */
            content.style.maxHeight = "none";
            const height =
                content.scrollHeight;
            content.style.maxHeight =
                height + "px";
        });
    }
    scenarioHeaders.forEach(header => {
        const content =
            getScenarioContent(header);
        if (!content) return;
        /*
         * Make sure every scenario starts in a
         * predictable state.
         */
        const initiallyExpanded =
            header.getAttribute("aria-expanded") === "true";
        if (initiallyExpanded) {
            openScenario(
                header,
                content
            );
        } else {
            closeScenario(
                header,
                content
            );
        }
        /* Click handler */
        header.addEventListener("click", event => {
            event.preventDefault();
            const isOpen =
                header.getAttribute("aria-expanded") === "true";
            /*
             * Close every other scenario first.
             */
            scenarioHeaders.forEach(otherHeader => {
                if (otherHeader === header) {
                    return;
                }
                const otherContent =
                    getScenarioContent(
                        otherHeader
                    );
                if (!otherContent) {
                    return;
                }
                closeScenario(
                    otherHeader,
                    otherContent
                );
            });
            /*
             * Toggle the selected scenario.
             */
            if (isOpen) {
                closeScenario(
                    header,
                    content
                );
            } else {
                openScenario(
                    header,
                    content
                );
            }
        });
        /* Keyboard support */
        header.addEventListener("keydown", event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                header.click();
            }
        });
    });
    /*
     * Recalculate open scenario height when the
     * browser changes width/orientation.
     */
    let scenarioResizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(
            scenarioResizeTimer
        );
        scenarioResizeTimer =
            setTimeout(() => {
                refreshOpenScenarios();
            }, 100);
    });
    /* =====================================================
       LEADERSHIP METRICS
       COUNT-UP ANIMATION
    ===================================================== */
    const metricNumbers =
        document.querySelectorAll(
            ".leadership-metric strong[data-count]"
        );
    function animateMetric(element) {
        if (!element) return;
        const target =
            parseFloat(
                element.dataset.count
            );
        if (Number.isNaN(target)) {
            return;
        }
        const prefix =
            element.dataset.prefix || "";
        const suffix =
            element.dataset.suffix || "";
        const duration = 1400;
        const startTime =
            performance.now();
        function updateMetric(currentTime) {
            const elapsed =
                currentTime - startTime;
            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );
            /*
             * Ease-out animation.
             */
            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );
            const value =
                target * eased;
            element.textContent =
                prefix +
                Math.round(value) +
                suffix;
            if (progress < 1) {
                requestAnimationFrame(
                    updateMetric
                );
            } else {
                element.textContent =
                    prefix +
                    target +
                    suffix;
            }
        }
        requestAnimationFrame(
            updateMetric
        );
    }
    /*
     * Animate metrics when they enter the viewport.
     */
    if (
        "IntersectionObserver" in window
    ) {
        const metricObserver =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }
                        animateMetric(
                            entry.target
                        );
                        metricObserver.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.35
                }
            );
        metricNumbers.forEach(metric => {
            metricObserver.observe(
                metric
            );
        });
    } else {
        metricNumbers.forEach(metric => {
            animateMetric(
                metric
            );
        });
    }
    /* =====================================================
       LEADERSHIP JOURNEY
    ===================================================== */
    const timelineData = {
        early: {
            label: "EARLY CAREER",
            title: "Building Delivery Discipline",
            description:
                "Developed a strong foundation in technology delivery, stakeholder management and operational discipline across complex enterprise environments.",
            capabilities: [
                "Delivery",
                "Stakeholder Management",
                "Technology"
            ]
        },
        programme: {
            label: "PROGRAMME LEADERSHIP",
            title: "From Delivery to Leadership",
            description:
                "Progressed from individual technology delivery into programme leadership, taking greater responsibility for outcomes, governance, teams and stakeholder alignment.",
            capabilities: [
                "Programme Leadership",
                "Governance",
                "Stakeholder Alignment"
            ]
        },
        transformation: {
            label: "TRANSFORMATION LEADERSHIP",
            title: "Leading Complex Transformation",
            description:
                "Expanded into large-scale cyber, cloud, infrastructure and digital workplace transformation, connecting technology change with measurable organisational outcomes.",
            capabilities: [
                "Cyber Transformation",
                "Cloud",
                "Digital Workplace"
            ]
        },
        today: {
            label: "TODAY",
            title: "Strategic Transformation Leadership",
            description:
                "Today my focus is on creating the clarity, governance and leadership needed to deliver complex transformation while building capable teams and sustainable delivery environments.",
            capabilities: [
                "Strategic Leadership",
                "Transformation",
                "Delivery Excellence"
            ]
        }
    };
    const timelineStages =
        document.querySelectorAll(
            ".timeline-stage"
        );
    const timelineDetail =
        document.getElementById(
            "timeline-detail"
        );
    function updateTimeline(stageKey) {
        const data =
            timelineData[stageKey];
        if (
            !data ||
            !timelineDetail
        ) {
            return;
        }
        /*
         * Update active timeline stage.
         */
        timelineStages.forEach(stage => {
            const active =
                stage.dataset.stage === stageKey;
            stage.classList.toggle(
                "active",
                active
            );
            stage.setAttribute(
                "aria-expanded",
                active ? "true" : "false"
            );
        });
        /*
         * Find detail elements.
         */
        const label =
            timelineDetail.querySelector(
                ".timeline-detail-label"
            );
        const title =
            timelineDetail.querySelector(
                "h3"
            );
        const paragraph =
            timelineDetail.querySelector(
                "p"
            );
        const capabilities =
            timelineDetail.querySelector(
                ".timeline-capabilities"
            );
        /*
         * Populate detail panel.
         */
        if (label) {
            label.textContent =
                data.label;
        }
        if (title) {
            title.textContent =
                data.title;
        }
        if (paragraph) {
            paragraph.textContent =
                data.description;
        }
        if (capabilities) {
            capabilities.innerHTML = "";
            data.capabilities.forEach(item => {
                const span =
                    document.createElement(
                        "span"
                    );
                span.textContent =
                    item;
                capabilities.appendChild(
                    span
                );
            });
        }
        /*
         * Restart animation.
         */
        timelineDetail.style.animation =
            "none";
        requestAnimationFrame(() => {
            timelineDetail.style.animation =
                "leadershipPanelIn .3s ease";
        });
    }
    timelineStages.forEach(stage => {
        stage.addEventListener(
            "click",
            () => {
                updateTimeline(
                    stage.dataset.stage
                );
            }
        );
        /*
         * Keyboard accessibility.
         */
        stage.addEventListener(
            "keydown",
            event => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    updateTimeline(
                        stage.dataset.stage
                    );
                }
            }
        );
    });
    /* =====================================================
       LEADERSHIP IN ACTION
       SMOOTH ACCORDION
    ===================================================== */
    const accordionHeaders =
        document.querySelectorAll(
            ".leadership-accordion-header"
        );
    function getActionContent(header) {
        if (!header) return null;
        return header.parentElement?.querySelector(
            ".leadership-accordion-content"
        ) || null;
    }
    function closeActionItem(
        header,
        content
    ) {
        if (
            !header ||
            !content
        ) {
            return;
        }
        header.setAttribute(
            "aria-expanded",
            "false"
        );
        header.classList.remove(
            "active"
        );
        /*
         * Smooth collapsed state.
         */
        content.style.maxHeight =
            "0px";
        content.style.opacity =
            "0";
        content.style.visibility =
            "hidden";
        const icon =
            header.querySelector(
                ".accordion-icon"
            );
        if (icon) {
            icon.textContent =
                "+";
        }
    }
    function openActionItem(
        header,
        content
    ) {
        if (
            !header ||
            !content
        ) {
            return;
        }
        header.setAttribute(
            "aria-expanded",
            "true"
        );
        header.classList.add(
            "active"
        );
        /*
         * Make content visible before measuring.
         */
        content.style.visibility =
            "visible";
        content.style.opacity =
            "1";
        /*
         * Reset height to allow accurate measurement.
         */
        content.style.maxHeight =
            "none";
        const contentHeight =
            content.scrollHeight;
        content.style.maxHeight =
            contentHeight + "px";
        const icon =
            header.querySelector(
                ".accordion-icon"
            );
        if (icon) {
            icon.textContent =
                "−";
        }
    }
    function refreshOpenActionItems() {
        accordionHeaders.forEach(header => {
            if (
                header.getAttribute(
                    "aria-expanded"
                ) !== "true"
            ) {
                return;
            }
            const content =
                getActionContent(
                    header
                );
            if (!content) {
                return;
            }
            /*
             * Recalculate natural height.
             */
            content.style.maxHeight =
                "none";
            const height =
                content.scrollHeight;
            content.style.maxHeight =
                height + "px";
        });
    }
    accordionHeaders.forEach(header => {
        const content =
            getActionContent(
                header
            );
        if (!content) {
            return;
        }
        /*
         * Always start closed unless the HTML
         * explicitly declares aria-expanded="true".
         */
        const initiallyExpanded =
            header.getAttribute(
                "aria-expanded"
            ) === "true";
        if (initiallyExpanded) {
            openActionItem(
                header,
                content
            );
        } else {
            closeActionItem(
                header,
                content
            );
        }
        /*
         * Click handler.
         */
        header.addEventListener(
            "click",
            event => {
                event.preventDefault();
                const isOpen =
                    header.getAttribute(
                        "aria-expanded"
                    ) === "true";
                /*
                 * Close all other accordion items.
                 */
                accordionHeaders.forEach(
                    otherHeader => {
                        if (
                            otherHeader === header
                        ) {
                            return;
                        }
                        const otherContent =
                            getActionContent(
                                otherHeader
                            );
                        if (!otherContent) {
                            return;
                        }
                        closeActionItem(
                            otherHeader,
                            otherContent
                        );
                    }
                );
                /*
                 * Toggle selected item.
                 */
                if (isOpen) {
                    closeActionItem(
                        header,
                        content
                    );
                } else {
                    openActionItem(
                        header,
                        content
                    );
                }
            }
        );
        /*
         * Keyboard accessibility.
         */
        header.addEventListener(
            "keydown",
            event => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    header.click();
                }
            }
        );
    });
    /*
     * Recalculate open accordion height
     * after resize/orientation change.
     */
    let actionResizeTimer = null;
    window.addEventListener(
        "resize",
        () => {
            clearTimeout(
                actionResizeTimer
            );
            actionResizeTimer =
                setTimeout(() => {
                    refreshOpenActionItems();
                }, 100);
        }
    );
    /* =====================================================
       GLOBAL KEYBOARD ACCESSIBILITY
    ===================================================== */
    document.addEventListener(
        "keydown",
        event => {
            /*
             * Escape closes all Leadership Under
             * Pressure scenarios.
             */
            if (event.key === "Escape") {
                scenarioHeaders.forEach(
                    header => {
                        const content =
                            getScenarioContent(
                                header
                            );
                        if (!content) {
                            return;
                        }
                        closeScenario(
                            header,
                            content
                        );
                    }
                );
                /*
                 * Escape also closes all
                 * Leadership in Action items.
                 */
                accordionHeaders.forEach(
                    header => {
                        const content =
                            getActionContent(
                                header
                            );
                        if (!content) {
                            return;
                        }
                        closeActionItem(
                            header,
                            content
                        );
                    }
                );
            }
        }
    );
    /* =====================================================
       INITIAL STATE
    ===================================================== */
    /*
     * Render the existing active Leadership Model
     * principle.
     */
    const initialPrinciple =
        document.querySelector(
            ".leadership-model-node.active"
        );
    if (initialPrinciple) {
        updatePrinciple(
            initialPrinciple.dataset.principle
        );
    }
    /*
     * Render the existing active Leadership Journey
     * timeline stage.
     */
    const initialTimeline =
        document.querySelector(
            ".timeline-stage.active"
        );
    if (initialTimeline) {
        updateTimeline(
            initialTimeline.dataset.stage
        );
    }
    /* =====================================================
       FINAL ACCORDION HEIGHT REFRESH
    ===================================================== */
    /*
     * Run once after the page has fully rendered.
     * This is particularly useful on iPad/Safari where
     * fonts and responsive layout can finish changing
     * shortly after DOMContentLoaded.
     */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            refreshOpenScenarios();
            refreshOpenActionItems();
        });
    });
});
