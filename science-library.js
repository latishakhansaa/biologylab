
// =======================================
// BIOLOGY LAB — SCIENCE LIBRARY
// Created by Khansa Latisha
// =======================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. SMOOTH TABLE OF CONTENTS

  const tocLinks = document.querySelectorAll(".toc-card");

  tocLinks.forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(
          null,
          "",
          link.getAttribute("href")
        );
      }
    });
  });


  // 2. ACTIVE TABLE OF CONTENTS

  const sections = document.querySelectorAll(
    ".library-section[id]"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => {
            link.classList.toggle(
              "active-toc",
              link.getAttribute("href") ===
              "#" + entry.target.id
            );
          });
        }
      });
    }, {
      rootMargin: "-20% 0px -65% 0px"
    });

    sections.forEach(section => observer.observe(section));
  }


  // 3. BIOLOGY DICTIONARY SEARCH

  const searchInput = document.getElementById(
    "dictionarySearch"
  );

  const dictionaryItems = document.querySelectorAll(
    ".dictionary-item"
  );

  const noResult = document.getElementById(
    "noDictionaryResult"
  );

  if (searchInput) {
    searchInput.addEventListener("input", () => {

      const keyword = searchInput.value
        .toLowerCase()
        .trim();

      let visibleCount = 0;

      dictionaryItems.forEach(item => {

        const text = item.textContent.toLowerCase();

        const matched = text.includes(keyword);

        item.hidden = !matched;

        if (matched) visibleCount++;
      });

      if (noResult) {
        noResult.hidden = visibleCount !== 0;
      }

    });
  }

});
