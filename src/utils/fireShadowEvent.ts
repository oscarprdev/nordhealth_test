export function fireShadowEvent(
  element: HTMLElement,
  eventType: string,
  targetOverrides: Record<string, unknown> = {}
): void {
  const event = new Event(eventType, { bubbles: true });

  Object.defineProperty(event, 'target', {
    value: { ...targetOverrides },
    writable: false,
  });

  element.dispatchEvent(event);
}
