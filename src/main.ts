import "./styles/global.less";
import { Contact } from "./types/contact";
import { ContactType } from "./types/contact_type";
import data from "./data/prepopulation.json";

type PrepopulationData = { contacts: Contact[] };

const typedData = data as PrepopulationData;

const getInitials = (fullName: string) => {
  if (!fullName) return "";

  const words = fullName.split(/\s+/);
  const initials = words.map((word) => word.charAt(0).toUpperCase());

  return initials.join("");
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const headerElement = document.createElement("header");
  headerElement.innerHTML = `
    <h1>ADDRESS BOOK</h1>
    <p>You can see all stored contacts in the list seen below. Each contact id either an indicidual or a company account. </p>
  `;
  app?.appendChild(headerElement);
  const container = document.createElement("div");
  container.classList.add("card-container");
  app?.appendChild(container);

  typedData.contacts.forEach((value) => {
    let title = value.type === ContactType.Individual ? value.title : undefined;
    if (!title && value.type === ContactType.Company) title = value.industry;

    if (!title) title = "";

    const cardElement: HTMLDivElement = document.createElement("div");

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("card-thumbnail");
    thumbnailDiv.innerHTML += `<p>${getInitials(value.name)}</p>`;

    const nameP = document.createElement("p");
    nameP.classList.add("name");
    nameP.innerText = `${value.name}`;
    const titleP = document.createElement("p");
    titleP.classList.add("title");
    titleP.innerText = `${title}`;

    const dropDownDiv = document.createElement("div");
    dropDownDiv.classList.add("drop-down");

    const lines = [
      `<p>${value.phoneNumber}</p>`,
      `<p>${value.email}</p>`,
      `<p>${value.address}</p>`,
      `<p>${value.website}</p>`,
    ];

    if (value.type === ContactType.Company) {
      lines.push(`<p class="key-contacts">Key contacts</p>`);
      value.keyContacts?.forEach((contact) => {
        lines.push(`<p>${contact.name}\n${contact.email}</p>`);
      });
    }

    dropDownDiv.innerHTML = lines.join("");

    const cardIcons = document.createElement("div");
    cardIcons.classList.add("card-icons");
    cardIcons.innerHTML = `
      <div class="icon-container">
        <img src="/telephone.png" alt="" />
      </div>
      <div class="icon-container">
        <img src="/email.png" alt="" />
      </div>
      <div class="icon-container">
        <img src="/chat.png" alt="" />
      </div>
      <div class="icon-container">
        <img src="/calendar.png" alt="" />
      </div>
    `;

    const cardDropDownArrow = document.createElement("div");
    cardDropDownArrow.classList.add("card-expand");
    cardDropDownArrow.id = "card-drop-down";
    cardDropDownArrow.innerHTML = `<img id="down-arrow" src="/down-arrow.png" alt="" />`;

    cardElement.classList.add("card-body");

    cardElement.append(
      thumbnailDiv,
      nameP,
      titleP,
      dropDownDiv,
      cardIcons,
      cardDropDownArrow,
    );

    const parentDiv: Element | null = document.querySelector(".card-container");
    if (parentDiv) parentDiv.appendChild(cardElement);
  });

  container?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const expandBtn = target.closest(".card-expand");

    if (expandBtn) {
      const cardBody = expandBtn.closest(".card-body");
      const dropDown = cardBody?.querySelector(".drop-down");
      const downArrow = cardBody?.querySelector("#down-arrow");

      dropDown?.classList.toggle("active");
      cardBody?.classList.toggle("active");
      downArrow?.classList.toggle("active");
    }
  });
});
