
const selectButton = document.querySelector(
    'button[aria-haspopup="listbox"]'
);
const optionsList = document.querySelector('ul[role="listbox"]');
const options = optionsList.querySelectorAll('li[role="option"]');
optionsList.classList.add("hidden");
const buttonLabel = selectButton.querySelector("span.block");

// Toggle the dropdown
selectButton.addEventListener("click", function () {
    const expanded = selectButton.getAttribute("aria-expanded") === "true";
    selectButton.setAttribute("aria-expanded", !expanded);
    optionsList.classList.toggle("hidden");
});

// Select option and update button label
options.forEach((option) => {
    option.addEventListener("click", function () {
    // Remove checkmarks from other options
    options.forEach((opt) => {
        const checkmark = opt.querySelector("span.checkmark");
        if (checkmark) checkmark.classList.add("hidden");
    });

    // Add checkmark to the selected option
    const selectedCheckmark = this.querySelector("span.checkmark");
    if (selectedCheckmark) {
        selectedCheckmark.classList.remove("hidden");
    }

    // Update the button label
    const selectedText = this.querySelector("span.block").textContent;
    buttonLabel.textContent = selectedText;

    // Hide dropdown
    optionsList.classList.toggle("hidden");
    selectButton.setAttribute("aria-expanded", "false");
    });
});
