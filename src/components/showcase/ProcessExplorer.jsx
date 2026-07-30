"use client";

import { useRef, useState } from "react";
import {
  Boxes,
  Check,
  ClipboardList,
  Code2,
  Compass,
  FileOutput,
  LifeBuoy,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Discovery",
    verb: "Understand",
    icon: Search,
    question: "What must work better, for whom, and why now?",
    summary:
      "We map the current workflow, user groups, business objective, constraints, existing tools, risks, and the evidence that would make the project useful.",
    effy: [
      "Run requirement and workflow discussions",
      "Identify users, roles, pain points, and decision owners",
      "Surface dependencies, risks, and unresolved assumptions",
    ],
    client: [
      "Explain the current process and intended outcome",
      "Share available examples, records, tools, and constraints",
      "Identify the people who can approve key decisions",
    ],
    deliverables: [
      "Problem and workflow map",
      "User and stakeholder outline",
      "Discovery findings and open decisions",
    ],
    checkpoint:
      "Both sides agree on the problem, target users, constraints, and the next decisions required.",
  },
  {
    number: "02",
    title: "Scope & Planning",
    verb: "Prioritize",
    icon: ClipboardList,
    question: "What is the smallest credible route to the required outcome?",
    summary:
      "We turn discovery into product boundaries, priorities, responsibilities, release stages, dependencies, and acceptance conditions.",
    effy: [
      "Separate required scope from later opportunities",
      "Define user journeys, modules, and release priorities",
      "Document assumptions, responsibilities, and dependencies",
    ],
    client: [
      "Confirm business priorities and non-negotiable workflows",
      "Choose between scope, timing, and depth trade-offs",
      "Approve the proposed delivery boundary",
    ],
    deliverables: [
      "Prioritized scope and module map",
      "Delivery plan and review route",
      "Acceptance criteria for the agreed release",
    ],
    checkpoint:
      "The delivery boundary, priorities, responsibilities, and approval route are accepted before implementation expands.",
  },
  {
    number: "03",
    title: "Architecture & Design",
    verb: "Structure",
    icon: Boxes,
    question:
      "How should experience, data, permissions, and infrastructure connect?",
    summary:
      "We define the interface direction and the technical system behind it: boundaries, data flow, roles, integrations, environments, and production responsibilities.",
    effy: [
      "Design core journeys and interface hierarchy",
      "Define application, data, permission, and integration boundaries",
      "Select technology and deployment direction around the system",
    ],
    client: [
      "Review the priority journeys and content structure",
      "Confirm access roles, business rules, and policy constraints",
      "Provide brand, content, domain, or integration access when needed",
    ],
    deliverables: [
      "Approved experience direction",
      "Architecture and data-flow decisions",
      "Role, integration, and environment plan",
    ],
    checkpoint:
      "Core journeys and architecture are coherent enough to build without hiding major product or data decisions.",
  },
  {
    number: "04",
    title: "Development",
    verb: "Build",
    icon: Code2,
    question: "Can the agreed system be reviewed as working software?",
    summary:
      "We implement the product in visible increments, connecting interface, business rules, data, administration, and integrations while preserving the approved boundaries.",
    effy: [
      "Build working product and operational workflows",
      "Integrate data, authentication, administration, and external services",
      "Review code, validate assumptions, and expose usable increments",
    ],
    client: [
      "Review working flows against real operating expectations",
      "Provide content, records, and access needed for the current increment",
      "Resolve scoped business questions without reopening approved work casually",
    ],
    deliverables: [
      "Reviewable product increments",
      "Connected core workflows and administration",
      "Decision and implementation record",
    ],
    checkpoint:
      "The agreed workflows operate end to end in the review environment and remaining gaps are explicit.",
  },
  {
    number: "05",
    title: "Testing & Review",
    verb: "Verify",
    icon: ShieldCheck,
    question:
      "Does the system behave correctly under real use and failure conditions?",
    summary:
      "We verify critical journeys, permissions, data behavior, responsiveness, accessibility, content, and release readiness—not only visual completion.",
    effy: [
      "Test critical paths, validation, permissions, and error states",
      "Verify responsive behavior, accessibility, and production assumptions",
      "Track findings through correction and regression checks",
    ],
    client: [
      "Complete acceptance review with representative data and users",
      "Confirm content, policy, and operational accuracy",
      "Approve resolved findings or record accepted limitations",
    ],
    deliverables: [
      "Verification results and resolved findings",
      "Acceptance review record",
      "Release-readiness decision",
    ],
    checkpoint:
      "Critical issues are resolved, accepted limitations are recorded, and the release is explicitly approved.",
  },
  {
    number: "06",
    title: "Deployment",
    verb: "Release",
    icon: Rocket,
    question:
      "Can the production system be released, operated, and recovered safely?",
    summary:
      "We prepare production configuration, deploy the approved release, verify live behavior, connect ownership, and document the path used to operate the system.",
    effy: [
      "Prepare production environment and release configuration",
      "Deploy and verify critical live workflows",
      "Organize access, repository, documentation, and handover",
    ],
    client: [
      "Provide or approve production accounts, domain, and policy details",
      "Confirm live business content and operational contacts",
      "Accept production access and ownership responsibilities",
    ],
    deliverables: [
      "Verified production release",
      "Access and handover package",
      "Known-state and post-launch plan",
    ],
    checkpoint:
      "Production verification passes, ownership is transferred clearly, and post-launch responsibilities are agreed.",
  },
  {
    number: "07",
    title: "Support & Iteration",
    verb: "Improve",
    icon: LifeBuoy,
    question: "What does real usage reveal about the next best improvement?",
    summary:
      "We support the released system within the agreed scope, investigate production findings, and prioritize iteration from evidence rather than uncontrolled feature drift.",
    effy: [
      "Respond to agreed support and maintenance needs",
      "Review production behavior, feedback, and operational gaps",
      "Plan corrections or new iterations as controlled scope",
    ],
    client: [
      "Report issues with reproducible context and business impact",
      "Share user feedback and changing operational needs",
      "Prioritize the next decisions against value and effort",
    ],
    deliverables: [
      "Support and maintenance record",
      "Prioritized improvement backlog",
      "Scoped route for the next iteration",
    ],
    checkpoint:
      "Support findings are resolved or prioritized, and any new work begins as an explicit decision—not silent scope growth.",
  },
];

function DetailList({ title, icon: Icon, items, tone = "light" }) {
  return (
    <section className={`process-detail-list process-detail-list-${tone}`}>
      <div className="process-detail-list-heading">
        <Icon size={19} aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={15} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProcessExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeStage = stages[activeIndex];
  const ActiveIcon = activeStage.icon;

  const selectStage = (index, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) {
      tabRefs.current[index]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % stages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + stages.length) % stages.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = stages.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectStage(nextIndex, true);
  };

  return (
    <section
      id="delivery-process"
      className="process-explorer-section"
      aria-labelledby="process-explorer-title"
    >
      <div className="ap-shell">
        <div className="ap-section-heading">
          <p className="ap-eyebrow">THE SEVEN PHASES</p>
          <h2 id="process-explorer-title">
            Select a phase to see the work, inputs, outputs, and checkpoint.
          </h2>
          <p className="process-heading-note">
            Use the tabs with a mouse, or move with Arrow, Home, and End keys.
          </p>
        </div>

        <div className="process-explorer">
          <div
            className="process-tabs"
            role="tablist"
            aria-label="Effy Tech delivery phases"
          >
            {stages.map((stage, index) => {
              const selected = activeIndex === index;
              const Icon = stage.icon;

              return (
                <button
                  key={stage.title}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`process-tab-${index + 1}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="process-stage-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectStage(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={selected ? "is-active" : ""}
                >
                  <span className="process-tab-number">{stage.number}</span>
                  <span className="process-tab-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="process-tab-copy">
                    <small>{stage.verb}</small>
                    <strong>{stage.title}</strong>
                  </span>
                  <span className="process-tab-state" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <article
            id="process-stage-panel"
            className="process-stage-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${activeIndex + 1}`}
            tabIndex={0}
          >
            <div className="process-panel-intro">
              <div className="process-panel-identity">
                <span>{activeStage.number}</span>
                <ActiveIcon size={25} aria-hidden="true" />
              </div>
              <p className="ap-eyebrow">{activeStage.verb}</p>
              <h2>{activeStage.title}</h2>
              <strong>{activeStage.question}</strong>
              <p>{activeStage.summary}</p>
            </div>

            <div className="process-detail-grid">
              <DetailList
                title="What Effy Tech does"
                icon={Compass}
                items={activeStage.effy}
              />
              <DetailList
                title="What the client provides"
                icon={ClipboardList}
                items={activeStage.client}
              />
              <DetailList
                title="Visible deliverables"
                icon={FileOutput}
                items={activeStage.deliverables}
                tone="accent"
              />
            </div>

            <div className="process-checkpoint">
              <span>
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <small>REVIEW & APPROVAL CHECKPOINT</small>
                <strong>{activeStage.checkpoint}</strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
