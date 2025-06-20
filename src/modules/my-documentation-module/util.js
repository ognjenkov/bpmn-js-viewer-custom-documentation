import { getBusinessObject, is } from "bpmn-js/lib/util/ModelUtil";

export function getExtensionElementsList(businessObject, type = undefined) {
  const elements =
    (businessObject.get("extensionElements") &&
      businessObject.get("extensionElements").get("values")) ||
    [];
  return elements.length && type
    ? elements.filter((value) => is(value, type))
    : elements;
}

export function getDocumentationDefinition(element) {
  // ocekuje shape
  const businessObject = getBusinessObject(element);
  const elements = getExtensionElementsList(
    businessObject,
    "sistemiv:Documentation"
  );

  return (elements || [])[0];
}

export function getDocumentationTemplate(element) {
  // ocekuje shape
  const documentation = getDocumentationDefinition(element);
  return documentation && documentation.get("template");
}

export function isSupported(element) {
  // element je Shape tip
  return (
    is(element, "bpmn:Task") ||
    is(element, "bpmn:Event") ||
    is(element, "bpmn:Process")
  );
}
