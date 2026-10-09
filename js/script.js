const form = document.querySelector("#presale-form");
const submitButton = form.querySelector(".submit-button");
const successMessage = document.querySelector("#success-message");
const successCopy = document.querySelector("#success-copy");
const productPreview = document.querySelector("#product-preview");
const previewGreeting = document.querySelector("#preview-greeting");
const previewArea = document.querySelector("#preview-area");
const interestSurvey = document.querySelector("#interest-survey-form");
const surveyStatus = document.querySelector("#survey-status");
const planCards = document.querySelectorAll("[data-plan-card]");
const planButtons = document.querySelectorAll("[data-select-plan]");
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
        const recommendedPlan = hectares <= 100 ? "essencial" : hectares <= 500 ? "profissional" : "empresarial";

        planCards.forEach((card) => {
            const isRecommended = card.dataset.planCard === recommendedPlan;
            card.classList.toggle("is-recommended", isRecommended);
            card.querySelector(".plan-recommendation").hidden = !isRecommended;
        });

        form.hidden = true;
        document.querySelector(".form-intro").hidden = true;
        successMessage.hidden = false;
        productPreview.hidden = false;
        productPreview.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
});

planButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedPlan = button.dataset.selectPlan;
        const planInput = interestSurvey.querySelector(`input[name="plan"][value="${selectedPlan}"]`);
        planInput.checked = true;
        updatePlanButtons(selectedPlan);
        surveyStatus.textContent = `Plano ${planInput.labels[0].textContent.trim()} selecionado como interesse.`;
        interestSurvey.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

interestSurvey.querySelectorAll('input[name="plan"]').forEach((input) => {
    input.addEventListener("change", () => updatePlanButtons(input.value));
});

interestSurvey.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!interestSurvey.reportValidity()) return;

    const selectedNeeds = new FormData(interestSurvey).getAll("needs");
    const needLabels = {
        clima: "clima",
        solo: "solo",
        agua: "irrigação e água",
        insumos: "insumos e custos",
        monitoramento: "monitoramento da lavoura"
    };
    const selectedPlan = new FormData(interestSurvey).get("plan");
    const priorities = selectedNeeds.map((need) => needLabels[need]);
    const priorityMessage = priorities.length
        ? `Você destacou ${priorities.join(", ")}. `
        : "Você não marcou prioridades específicas. ";
    const planMessage = selectedPlan && selectedPlan !== "nao-sei"
        ? `Seu plano de interesse: ${selectedPlan}. `
        : "";

    surveyStatus.textContent = `${priorityMessage}${planMessage}Sua opinião ainda não é enviada nem armazenada pela Cultiva.`;
});

function updatePlanButtons(selectedPlan) {
    planButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.selectPlan === selectedPlan));
    });
}

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