"use strict";
import { checkUser, fetchHandler } from "./util.js";

const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");
const openMobileNavBtn = document.querySelector(".open-mobile-nav-icon");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");

const logoutBtn = document.querySelector(".logout-btn");

const url = document.URL;

if (
  !url.includes("dashboard") &&
  !url.includes("manageblogs") &&
  !url.includes("inquiries.html" && !url.includes("settings"))
) {
  // OPEN AND CLOSE USER MENU
  if (document.querySelector(".header-profile-picture"))
    document
      .querySelector(".header-profile-picture")
      .addEventListener("click", () => {
        document
          .querySelector(".dropdown")
          .classList.toggle("toggle-user-menu");
      });
  openMobileNavBtn.addEventListener("click", () => {
    overlay.classList.add("show-overlay");
    mobileNav.classList.add("show-mobile-nav");
  });

  if (closeMobileNavBtn)
    closeMobileNavBtn.addEventListener("click", () => {
      overlay.classList.remove("show-overlay");
      mobileNav.classList.remove("show-mobile-nav");
    });

  // Check User and change navigation
  document.addEventListener("DOMContentLoaded", async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      const user = await checkUser(token);

      if (user) {
        if (document.URL.includes("sign-in")) {
          return location.assign("/");
        }
        const userNav = document.querySelector(".header__user-nav");
        userNav
          .querySelector(".header-profile-picture")
          .classList.remove("hidden");

        userNav.querySelector(".spinner").classList.add("hidden");
      } else {
        addLoginBtn();
      }
    } else {
      addLoginBtn();
    }
  });
}
// Hide default message for invalid inputs on submit
document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.preventDefault();
      e.target.focus();
    };
  })(),
  true
);

const addLoginBtn = () => {
  if (document.querySelector(".like-btn"))
    document.querySelector(".like-btn").remove();
  document.querySelector(".header__user-nav").innerHTML = "";
  document.querySelector(
    ".header__user-nav"
  ).innerHTML = `<a href="sign-in.html" class="btn btn--primary btn--big btn--link"
          >Signin</a>`;
};

// Logout
if (document.querySelector(".logout-btn"))
  document.querySelector(".logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const url = document.URL;
    localStorage.removeItem("token");
    if (
      url.includes("dashboard") ||
      url.includes("manageblogs") ||
      url.includes("inquiries.html") ||
      url.includes("settings")
    ) {
      location.assign("/");
    } else if (url.includes("blog.html")) {
      // Remove Like and Form
      document.querySelector(".like-btn").remove();
      document.querySelector(".blog-page__comment-form").remove();
      addLoginBtn();
    } else {
      addLoginBtn();
    }
  });
