function waitForElement(selector, callback) {
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
  }, 100); // check every 100ms
}

function startAutoScroll(el) {
  if (window.sectionInterval) return;

  let direction = 1;
  window.sectionInterval = setInterval(() => {
    el.scrollBy({ top: direction * 1, behavior: "smooth" });

    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      direction = -1;
    } else if (el.scrollTop <= 0) {
      direction = 1;
    }
  }, 20);
}

// Wait for DOM and target element to load
waitForElement(".monitor-list.scrollbar", startAutoScroll);
