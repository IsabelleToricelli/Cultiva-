const form = document.querySelector("#presale-form");
const submitButton = form.querySelector(".submit-button");
const successMessage = document.querySelector("#success-message");
const successCopy = document.querySelector("#success-copy");
const productPreview = document.querySelector("#product-preview");
const previewGreeting = document.querySelector("#preview-greeting");
const previewArea = document.querySelector("#preview-area");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = form.elements.name.value.trim();
    const hectares = Number(form.elements.hectares.value);
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.setAttribute("aria-busy", "true");

    window.setTimeout(() => {
        successCopy.textContent = `Obrigado, ${name}. Preparamos uma prévia ilustrativa para sua propriedade.`;
        previewGreeting.textContent = `Veja como o Cultiva pode organizar as informações da propriedade de ${name}.`;
        previewArea.textContent = `${hectares.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} ha`;
        form.hidden = true;
        document.querySelector(".form-intro").hidden = true;
        successMessage.hidden = false;
        productPreview.hidden = false;
        productPreview.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
});

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
    menuToggle.innerHTML = isExpanded
        ? '<i class="fa-solid fa-bars" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();