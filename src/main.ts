import "./styles/global.less";
import { Contact } from "./types/contact";
import data from "./data/prepopulation.json";

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
  container.classList.add("card-conteaner");
  app?.appendChild(container);

  data.contacts.forEach((value) => {
    let title = value.title;
    if (!title) title = value.industry;

    const cardElemnt: HTMLDivElement = document.createElement("div");

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

    dropDownDiv.innerHTML += `
      <p>${value.phoneNumber}</p>
      <p>${value.email}</p>
      <p>${value.address}</p>
      <p>${value.website}</p>
    `;

    if (value.type === "company") {
      dropDownDiv.innerHTML += `<p class="key-contacts">Key contacts</p>`;
      value.keyContacts?.map(
        (contact) =>
          (dropDownDiv.innerHTML += `
        <p>${contact.name}\n${contact.email}</p>
      `),
      );
    } else {
      //
    }

    const cardIcons = document.createElement("div");
    cardIcons.classList.add("card-icons");
    cardIcons.innerHTML = `
      <div class="icon-conteaner">
        <img src="/public/telephone.png" alt="" />
      </div>
      <div class="icon-conteaner">
        <img src="/public/email.png" alt="" />
      </div>
      <div class="icon-conteaner">
        <img src="/public/chat.png" alt="" />
      </div>
      <div class="icon-conteaner">
        <img src="/public/calendar.png" alt="" />
      </div>
    `;

    const cardDropDownArrow = document.createElement("div");
    cardDropDownArrow.classList.add("card-expand");
    cardDropDownArrow.id = "card-drop-down";
    cardDropDownArrow.innerHTML = `
      <img id="img" src="/public/down-arrow.png" alt="" />
    `;

    cardElemnt.classList.add("card-body");

    cardElemnt.append(
      thumbnailDiv,
      nameP,
      titleP,
      dropDownDiv,
      cardIcons,
      cardDropDownArrow,
    );

    const parentDiv: Element | null = document.querySelector(".card-conteaner");
    if (parentDiv) parentDiv.appendChild(cardElemnt);
  });

  container?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const expandBtn = target.closest(".card-expand");

    if (expandBtn) {
      const cardBody = expandBtn.closest(".card-body");
      const dropDown = cardBody?.querySelector(".drop-down");
      const img = cardBody?.querySelector("#img");

      if (cardBody?.classList.value.includes("active")) {
        img?.setAttribute("src", "public/down-arrow.png");
      } else {
        img?.setAttribute("src", "public/up-arrows.png");
      }

      dropDown?.classList.toggle("active");
      cardBody?.classList.toggle("active");
    }
  });
});
