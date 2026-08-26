/* =========================================================
   LEADERSHIP PAGE JAVASCRIPT
   TWC LTD
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

        modelNodes.forEach(node => {

            const isActive =
                node.dataset.principle === principleKey;

            node.classList.toggle("active", isActive);

            node.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );
        });


        if (!principlePanel) return;


        /* Small fade/reveal effect */

        principlePanel.classList.remove("leadership-panel-refresh");

        requestAnimationFrame(() => {
            principlePanel.classList.add(
                "leadership-panel-refresh"
            );
        });


        if (principleIcon) {
            principleIcon.textContent = data.icon;
        }

        if (principleLabel) {
            principleLabel.textContent =
                `PRINCIPLE ${data.number}`;
        }

        if (principleTitle) {
            principleTitle.textContent = data.title;
        }

        if (principleDescription) {
            principleDescription.textContent =
                data.description;
        }

        if (principleTags) {

            principleTags.innerHTML = "";

            data.tags.forEach(tag => {

                const span =
                    document.createElement("span");

                span.textContent = tag;

                principleTags.appendChild(span);
            });
        }
    }


    modelNodes.forEach(node => {

        node.addEventListener("click", () => {

            const principle =
                node.dataset.principle;

            updatePrinciple(principle);
        });

    });



    /* =====================================================
       LEADERSHIP UNDER PRESSURE
       SMOOTH ACCORDION
    ===================================================== */

    const scenarioHeaders =
        document.querySelectorAll(".scenario-header");


    function closeScenario(header, content) {

        header.classList.remove("active");

        header.setAttribute(
            "aria-expanded",
            "false"
        );

        content.style.maxHeight = "0px";
        content.style.opacity = "0";

        const plus =
            header.querySelector(".scenario-plus");

        if (plus) {
            plus.textContent = "+";
        }
    }


    function openScenario(header, content) {

        header.classList.add("active");

        header.setAttribute(
            "aria-expanded",
            "true"
        );

        /* Calculate the real content height */

        content.style.maxHeight =
            content.scrollHeight + "px";

        content.style.opacity = "1";

        const plus =
            header.querySelector(".scenario-plus");

        if (plus) {
            plus.textContent = "−";
        }
    }


    scenarioHeaders.forEach(header => {

        const content =
            header.parentElement?.querySelector(
                ".scenario-content"
            );

        if (!content) return;


        /* Ensure initial state is controlled by JS */

        if (
            header.getAttribute("aria-expanded") === "true"
        ) {
            openScenario(header, content);
        } else {
            closeScenario(header, content);
        }


        header.addEventListener("click", () => {

            const isOpen =
                header.getAttribute("aria-expanded") === "true";


            /*
             * Close any other open scenario.
             * This keeps the component clean and avoids
             * several large panels being open simultaneously.
             */

            scenarioHeaders.forEach(otherHeader => {

                if (otherHeader === header) return;

                const otherContent =
                    otherHeader.parentElement?.querySelector(
                        ".scenario-content"
                    );

                if (!otherContent) return;

                closeScenario(
                    otherHeader,
                    otherContent
                );
            });


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

    });


    /*
     * Recalculate an open scenario if the browser
     * changes width. This prevents text wrapping from
     * being clipped after orientation changes.
     */

    window.addEventListener("resize", () => {

        scenarioHeaders.forEach(header => {

            if (
                header.getAttribute("aria-expanded") !== "true"
            ) {
                return;
            }

            const content =
                header.parentElement?.querySelector(
                    ".scenario-content"
                );

            if (!content) return;

            content.style.maxHeight =
                content.scrollHeight + "px";
        });

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

        const target =
            parseFloat(element.dataset.count);

        if (Number.isNaN(target)) return;

        const prefix =
            element.dataset.prefix || "";

        const suffix =
            element.dataset.suffix || "";

        const duration = 1400;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /*
             * Ease-out effect:
             * fast at the beginning and slower
             * as the number reaches its target.
             */

            const eased =
                1 - Math.pow(1 - progress, 3);


            const value =
                target * eased;


            /*
             * All current metrics are whole numbers,
             * so keep the display clean.
             */

            element.textContent =
                prefix +
                Math.round(value) +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    prefix +
                    target +
                    suffix;
            }
        }


        requestAnimationFrame(update);
    }


    /*
     * Only animate metrics once they enter the viewport.
     */

    if ("IntersectionObserver" in window) {

        const metricObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        animateMetric(entry.target);

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
            metricObserver.observe(metric);
        });

    } else {

        metricNumbers.forEach(metric => {
            animateMetric(metric);
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
        document.querySelectorAll(".timeline-stage");

    const timelineDetail =
        document.getElementById("timeline-detail");


    function updateTimeline(stageKey) {

        const data =
            timelineData[stageKey];

        if (!data || !timelineDetail) return;


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


        const label =
            timelineDetail.querySelector(
                ".timeline-detail-label"
            );

        const title =
            timelineDetail.querySelector("h3");

        const paragraph =
            timelineDetail.querySelector("p");

        const capabilities =
            timelineDetail.querySelector(
                ".timeline-capabilities"
            );


        if (label) {
            label.textContent = data.label;
        }

        if (title) {
            title.textContent = data.title;
        }

        if (paragraph) {
            paragraph.textContent =
                data.description;
        }

        if (capabilities) {

            capabilities.innerHTML = "";

            data.capabilities.forEach(item => {

                const span =
                    document.createElement("span");

                span.textContent = item;

                capabilities.appendChild(span);
            });
        }


        /*
         * Restart the detail animation cleanly.
         */

        timelineDetail.style.animation = "none";

        requestAnimationFrame(() => {

            timelineDetail.style.animation =
                "leadershipPanelIn .3s ease";
        });
    }


    timelineStages.forEach(stage => {

        stage.addEventListener("click", () => {

            updateTimeline(
                stage.dataset.stage
            );

        });

    });



    /* =====================================================
       LEADERSHIP IN ACTION
       SMOOTH ACCORDION
    ===================================================== */

    const accordionHeaders =
        document.querySelectorAll(
            ".leadership-accordion-header"
        );


    function closeActionItem(header, content) {

        header.setAttribute(
            "aria-expanded",
            "false"
        );

        header.classList.remove("active");

        content.style.maxHeight = "0px";
        content.style.opacity = "0";

        const icon =
            header.querySelector(".accordion-icon");

        if (icon) {
            icon.textContent = "+";
        }
    }


    function openActionItem(header, content) {

        header.setAttribute(
            "aria-expanded",
            "true"
        );

        header.classList.add("active");

        content.style.maxHeight =
            content.scrollHeight + "px";

        content.style.opacity = "1";

        const icon =
            header.querySelector(".accordion-icon");

        if (icon) {
            icon.textContent = "−";
        }
    }


    accordionHeaders.forEach(header => {

        const content =
            header.parentElement?.querySelector(
                ".leadership-accordion-content"
            );

        if (!content) return;


        /*
         * Initial state
         */

        closeActionItem(
            header,
            content
        );


        header.addEventListener("click", () => {

            const isOpen =
                header.getAttribute("aria-expanded") === "true";


            /*
             * Close other items.
             */

            accordionHeaders.forEach(otherHeader => {

                if (otherHeader === header) return;

                const otherContent =
                    otherHeader.parentElement?.querySelector(
                        ".leadership-accordion-content"
                    );

                if (!otherContent) return;

                closeActionItem(
                    otherHeader,
                    otherContent
                );
            });


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

        });

    });


    /*
     * Keep open accordion content correctly sized
     * when the viewport changes.
     */

    window.addEventListener("resize", () => {

        accordionHeaders.forEach(header => {

            if (
                header.getAttribute("aria-expanded") !== "true"
            ) {
                return;
            }

            const content =
                header.parentElement?.querySelector(
                    ".leadership-accordion-content"
                );

            if (!content) return;

            content.style.maxHeight =
                content.scrollHeight + "px";
        });

    });



    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener("keydown", event => {

        /*
         * Escape closes an open scenario.
         */

        if (event.key === "Escape") {

            scenarioHeaders.forEach(header => {

                const content =
                    header.parentElement?.querySelector(
                        ".scenario-content"
                    );

                if (!content) return;

                closeScenario(
                    header,
                    content
                );
            });


            /*
             * Escape also closes open Leadership
             * in Action accordion items.
             */

            accordionHeaders.forEach(header => {

                const content =
                    header.parentElement?.querySelector(
                        ".leadership-accordion-content"
                    );

                if (!content) return;

                closeActionItem(
                    header,
                    content
                );
            });
        }

    });



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    /*
     * Ensure the existing active principle is rendered.
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
     * Ensure the existing active timeline stage
     * is rendered.
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

});
