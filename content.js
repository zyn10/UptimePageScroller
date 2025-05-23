function waitForElement(selector, callback) {
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
  }, 100);
}

function startAutoScroll(el) {
  let direction = 1;
  let lastScrollTop = el.scrollTop;
  let idleCount = 0;

  function scrollStep() {
    el.scrollBy({ top: direction * 1, behavior: "smooth" });

    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      direction = -1;
    } else if (el.scrollTop <= 0) {
      direction = 1;
    }

    // Detect if scrolling is stuck
    if (el.scrollTop === lastScrollTop) {
      idleCount++;
    } else {
      idleCount = 0;
    }

    lastScrollTop = el.scrollTop;

    // If stuck for 50 cycles (1 second), reset direction
    if (idleCount > 50) {
      direction *= -1;
      idleCount = 0;
    }
  }

  if (window.sectionInterval) clearInterval(window.sectionInterval);
  window.sectionInterval = setInterval(scrollStep, 20);
}

waitForElement(".monitor-list.scrollbar", startAutoScroll);
