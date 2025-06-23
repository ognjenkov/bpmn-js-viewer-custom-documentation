import { getBusinessObject, is } from "bpmn-js/lib/util/ModelUtil";
import { getDocumentationTemplate, getDocumentationMarkdown } from "./util";
import { get } from "min-dash";

export default function SDocumentation(eventBus, overlays, bpmnjs) {
  function createOrUpdateOverlay(element, { formRef, documentationMarkdown }) {
    let overlayEntry = overlays.get({ element, type: "sistemiv" })[0];
    let overlay;

    if (overlayEntry) {
      overlay = overlayEntry.html;
    } else {
      overlay = document.createElement("div");
      overlay.className = "sistemiv-overlay";

      overlays.add(element, "sistemiv", {
        position: {
          bottom: 10,
          right: 10,
        },
        html: overlay,
      });
    }

    if (
      documentationMarkdown &&
      !overlay.querySelector(".sistemiv-overlay-documentation")
    ) {
      const docButton = document.createElement("div");
      docButton.className = "sistemiv-overlay-documentation";
      docButton.innerHTML =
        '<span class="sistemiv-overlay-documentation-icon"></span>' +
        '<span class="sistemiv-overlay-documentation-text">Documentation</span>';
      docButton.addEventListener("click", () => {
        eventBus.fire("documentation.open", {
          element,
          markdown: documentationMarkdown,
        });
      });
      overlay.appendChild(docButton);
    }

    if (formRef && !overlay.querySelector(".sistemiv-overlay-form")) {
      const formButton = document.createElement("div");
      formButton.className = "sistemiv-overlay-form";
      formButton.innerHTML =
        '<span class="sistemiv-overlay-form-icon"></span>' +
        '<span class="sistemiv-overlay-form-text">Form</span>';
      formButton.addEventListener("click", () => {
        eventBus.fire("form.open", {
          element,
          formRef,
        });
      });
      overlay.appendChild(formButton);
    }
  }

  eventBus.on("shape.added", function (event) {
    const element = event.element;
    const businessObject = getBusinessObject(element);

    const documentationMarkdown =
      getDocumentationTemplate(element) && getDocumentationMarkdown(element);
    const formRef =
      is(element, "bpmn:UserTask") && businessObject.get("camunda:formRef");

    if (documentationMarkdown || formRef) {
      defer(() =>
        createOrUpdateOverlay(element, {
          formRef,
          documentationMarkdown,
        })
      );
    }
  });
}

SDocumentation.$inject = ["eventBus", "overlays", "bpmnjs"];

// helpers

function defer(fn) {
  setTimeout(fn, 0);
}

function getOverlayHtml() {
  const div = document.createElement("div");
  div.className = "sistemiv-overlay";
  return div;
}
