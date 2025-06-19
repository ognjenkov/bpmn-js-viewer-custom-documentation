export default function Comments(eventBus, overlays, bpmnjs) {}

Comments.$inject = ["eventBus", "overlays", "bpmnjs"];

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
