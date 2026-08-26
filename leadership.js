/* =========================================================
   LEADERSHIP PAGE JS
   TWC LTD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLeadershipModel();
    initScenarioAccordion();
    initLeadershipAccordion();
    initTimeline();
    initMetrics();

});


/* =========================================================
   1. INTERACTIVE LEADERSHIP MODEL
========================================================= */

function initLeadershipModel() {

    const nodes = document.querySelectorAll(
        ".leadership-model-node"
    );

    const title = document.getElementById(
        "principle-title"
    );

    const description = document.getElementById(
        "principle-description"
    );

    const tags = document.getElementById(
        "principle-tags"
    );

    const icon = document.querySelector(
        ".principle-panel-icon"
    );

    if (!nodes.length || !title || !description || !tags) {
        return;
    }


    const principles = {

        clarity: {
            number: "PRINCIPLE 01",
            title: "Clarity",
            icon: "◎",
            description:
                "I establish a clear purpose, outcomes and decision framework so teams understand where we are going, why it matters and what success looks like.",
            tags: [
                "Direction",
                "Prioritisation",
                "Decision making"
            ]
        },

        trust: {
            number: "PRINCIPLE 02",
            title: "Trust & Empowerment",
            icon: "◈",
            description:
                "I trust people to make decisions within clear boundaries. I encourage challenge, ownership and initiative rather than unnecessary layers of control.",
            tags: [
                "Autonomy",
                "Empowerment",
                "Coaching"
            ]
        },

        accountability: {
            number: "PRINCIPLE 03",
            title: "Accountability",
            icon: "✓",
            description:
                "Accountability is not about blame. It is about clear ownership, visible commitments and having the confidence to address issues early.",
            tags: [
                "Ownership",
                "Commitment",
                "Delivery"
            ]
        },

        communication: {
            number: "PRINCIPLE 04",
            title: "Communication",
            icon: "↗",
            description:
                "I communicate early, honestly and at the right level. Difficult messages are easier to manage when people understand the context, options and implications.",
            tags: [
                "Transparency",
                "Stakeholders",
                "Engagement"
            ]
        }

    };


    nodes.forEach(node => {

        node.addEventListener("click", () => {

            const principleName =
                node.dataset.principle;

            const principle =
                principles[principleName];

            if (!principle) {
                return;
            }


            nodes.forEach(n => {

                const active =
                    n === node;

                n.classList.toggle(
                    "active",
                    active
                );

                n.setAttribute(
                    "aria-pressed",
                    active ? "true" : "false"
                );

            });


            title.textContent =
                principle.title;

            description.textContent =
                principle.description;

            icon.textContent =
                principle.icon;


            const label =
                document.querySelector(
                    ".principle-panel-label"
                );

            if (label) {
                label.textContent =
                    principle.number;
            }


            tags.innerHTML =
                principle.tags
                    .map(tag =>
                        `<span>${tag}</span>`
                    )
                    .join("");


            const panel =
                document.getElementById(
                    "leadership-principle-panel"
                );

            if (panel) {

                panel.style.animation = "none";

                void panel.offsetWidth;

                panel.style.animation =
                    "leadershipPanelIn .3s ease";

            }

        });

    });

}
/* =====================================================
   LEADERSHIP UNDER PRESSURE
   Smooth Accordion
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const scenarioHeaders = document.querySelectorAll(".scenario-header");

    scenarioHeaders.forEach(header => {

        const content = header.nextElementSibling;

        if (!content) return;

        /* Initial state */
        content.style.overflow = "hidden";
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        content.style.transition =
            "max-height 0.35s ease, opacity 0.25s ease";

        header.addEventListener("click", () => {

            const isOpen =
                header.getAttribute("aria-expanded") === "true";


            /* =================================================
               CLOSE ALL OTHER SCENARIOS
               ================================================= */

            scenarioHeaders.forEach(otherHeader => {

                if (otherHeader === header) return;

                const otherContent = otherHeader.nextElementSibling;

                otherHeader.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherHeader.classList.remove("active");

                if (otherContent) {
                    otherContent.style.maxHeight = "0px";
                    otherContent.style.opacity = "0";
                }
            });


            /* =================================================
               OPEN / CLOSE SELECTED SCENARIO
               ================================================= */

            if (isOpen) {

                /* CLOSE */

                header.setAttribute(
                    "aria-expanded",
                    "false"
                );

                header.classList.remove("active");

                content.style.maxHeight = "0px";
                content.style.opacity = "0";

            } else {

                /* OPEN */

                header.setAttribute(
                    "aria-expanded",
                    "true"
                );

                header.classList.add("active");

                content.style.maxHeight =
                    content.scrollHeight + "px";

                content.style.opacity = "1";
            }

        });

    });


    /* =====================================================
       KEEP OPEN PANEL CORRECTLY SIZED ON RESIZE
       Useful for iPad / iPhone orientation changes
       ===================================================== */

    window.addEventListener("resize", () => {

        const openHeader =
            document.querySelector(
                '.scenario-header[aria-expanded="true"]'
            );

        if (!openHeader) return;

        const openContent =
            openHeader.nextElementSibling;

        if (!openContent) return;

        openContent.style.maxHeight =
            openContent.scrollHeight + "px";
    });

});


/* =========================================================
   3. LEADERSHIP IN ACTION ACCORDION
========================================================= */

function initLeadershipAccordion() {

    const headers =
        document.querySelectorAll(
            ".leadership-accordion-header"
        );

    if (!headers.length) {
        return;
    }


    headers.forEach(header => {

        header.addEventListener(
            "click",
            () => {

                const item =
                    header.closest(
                        ".leadership-accordion-item"
                    );

                const content =
                    item.querySelector(
                        ".leadership-accordion-content"
                    );

                const icon =
                    header.querySelector(
                        ".accordion-icon"
                    );

                const isOpen =
                    header.getAttribute(
                        "aria-expanded"
                    ) === "true";


                // Close everything
                document
                    .querySelectorAll(
                        ".leadership-accordion-header"
                    )
                    .forEach(otherHeader => {

                        otherHeader.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        const otherItem =
                            otherHeader.closest(
                                ".leadership-accordion-item"
                            );

                        const otherContent =
                            otherItem.querySelector(
                                ".leadership-accordion-content"
                            );

                        const otherIcon =
                            otherHeader.querySelector(
                                ".accordion-icon"
                            );

                        otherContent.style.display =
                            "none";

                        if (otherIcon) {
                            otherIcon.textContent =
                                "+";
                        }

                    });


                // Open clicked item
                if (!isOpen) {

                    header.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    content.style.display =
                        "block";

                    if (icon) {
                        icon.textContent = "−";
                    }

                }

            }
        );

    });

}


/* =========================================================
   4. INTERACTIVE TIMELINE
========================================================= */

function initTimeline() {

    const stages =
        document.querySelectorAll(
            ".timeline-stage"
        );

    const detail =
        document.getElementById(
            "timeline-detail"
        );

    if (!stages.length || !detail) {
        return;
    }


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
                "Progressed into multi-workstream programme leadership, establishing governance, delivery cadence and high-performing teams across complex transformation programmes.",
            capabilities: [
                "Programme Leadership",
                "Governance",
                "Team Leadership"
            ]
        },

        transformation: {
            label: "TRANSFORMATION LEADERSHIP",
            title: "Cyber, Cloud & Digital Transformation",
            description:
                "Led major cyber security, cloud and digital workplace transformations, balancing strategic direction with delivery execution across complex and highly regulated environments.",
            capabilities: [
                "Cyber Security",
                "Cloud Transformation",
                "Digital Workplace"
            ]
        },

        today: {
            label: "TODAY",
            title: "Strategic Transformation Leadership",
            description:
                "Today I bring together programme leadership, technology transformation and people leadership to turn complex strategic objectives into measurable outcomes.",
            capabilities: [
                "Strategic Leadership",
                "Transformation",
                "Outcome Delivery"
            ]
        }

    };


    stages.forEach(stage => {

        stage.addEventListener(
            "click",
            () => {

                const key =
                    stage.dataset.stage;

                const data =
                    timelineData[key];

                if (!data) {
                    return;
                }


                stages.forEach(s => {

                    const active =
                        s === stage;

                    s.classList.toggle(
                        "active",
                        active
                    );

                    s.setAttribute(
                        "aria-expanded",
                        active ? "true" : "false"
                    );

                });


                detail.innerHTML = `

                    <span class="timeline-detail-label">
                        ${data.label}
                    </span>

                    <h3>
                        ${data.title}
                    </h3>

                    <p>
                        ${data.description}
                    </p>

                    <div class="timeline-capabilities">

                        ${data.capabilities
                            .map(item =>
                                `<span>${item}</span>`
                            )
                            .join("")}

                    </div>

                `;


                detail.style.animation = "none";

                void detail.offsetWidth;

                detail.style.animation =
                    "leadershipPanelIn .3s ease";

            }
        );

    });

}


/* =========================================================
   5. OUTCOME METRICS
========================================================= */

function initMetrics() {

    const metrics =
        document.querySelectorAll(
            "[data-count]"
        );

    if (!metrics.length) {
        return;
    }


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    function formatMetric(element, value) {

        const prefix =
            element.dataset.prefix || "";

        const suffix =
            element.dataset.suffix || "";

        return prefix +
               Math.round(value) +
               suffix;

    }


    function setFinalValue(element) {

        const target =
            Number(element.dataset.count);

        element.textContent =
            formatMetric(
                element,
                target
            );

    }


    function animateMetric(element) {

        const target =
            Number(element.dataset.count);

        if (
            prefersReducedMotion ||
            Number.isNaN(target)
        ) {

            setFinalValue(element);
            return;

        }


        const duration = 1300;

        const start =
            performance.now();


        function update(now) {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );


            // Smooth ease-out
            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                target * eased;


            element.textContent =
                formatMetric(
                    element,
                    value
                );


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                setFinalValue(
                    element
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    if (!("IntersectionObserver" in window)) {

        metrics.forEach(
            setFinalValue
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateMetric(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.35
            }
        );


    metrics.forEach(metric => {

        observer.observe(metric);

    });

}
