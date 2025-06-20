import { getBusinessObject, is } from "bpmn-js/lib/util/ModelUtil";
import {
  getExtensionElementsList,
  getDocumentationDefinition,
  getDocumentationTemplate,
  isSupported,
} from "./util";
import { get } from "min-dash";

export default function SDocumentation(eventBus, overlays, bpmnjs) {
  eventBus.on("shape.added", function (event) {
    const element = event.element;
    const businessObject = getBusinessObject(element);
    const extensionElementsList = getExtensionElementsList(
      businessObject,
      undefined
    );
    const documentationTempalte = getDocumentationTemplate(element);

    if (is(element, "bpmn:Process") && !!documentationTempalte) {
      // upsi dokumentaciju pa return
      // return;
    }

    if (!!documentationTempalte) {
      // upsi dokumentaciju
    }

    if (is(element, "bpmn:UserTask")) {
      console.log("yes");
      console.log(element);
    }

    // defer(function() {
    //   createCommentBox(element);
    // });
  });
}

SDocumentation.$inject = ["eventBus", "overlays", "bpmnjs"];

// helpers ///////////////

function defer(fn) {
  setTimeout(fn, 0);
}

function getOverlayHtml(translate) {
  return (
    '<div class="comments-overlay">' +
    '<div class="toggle">' +
    '<span class="icon-comment"></span>' +
    '<span class="comment-count" data-comment-count></span>' +
    "</div>" +
    '<div class="content">' +
    '<div class="comments"></div>' +
    '<div class="edit">' +
    `<textarea tabindex="1" placeholder="${translate(
      "Add a comment"
    )}"></textarea>` +
    "</div>" +
    "</div>" +
    "</div>"
  );
}
