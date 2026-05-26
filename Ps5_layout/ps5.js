const pageBody = document.querySelector("body");
const wrapperCards = document.querySelector("#wrapperCards");

const showFriendsBtn = document.querySelector("#showFriendsBtn");
const addFriendBtn = document.querySelector("#addFriendBtn");
const removeFriendBtn = document.querySelector("#removeFriendBtn");
const searchFriendBtn = document.querySelector("#searchFriendBtn");

const nicknameInput = document.querySelector("#nicknameInput");
const friendNumberInput = document.querySelector("#friendNumberInput");
const statusMessage = document.querySelector("#statusMessage");
const friendsCount = document.querySelector("#friendsCount");

const selectedKind = document.querySelector("#selectedKind");
const selectedTitle = document.querySelector("#selectedTitle");
const screenKind = document.querySelector("#screenKind");
const screenTitle = document.querySelector("#screenTitle");
const screenInfo = document.querySelector("#screenInfo");
const overlayKind = document.querySelector("#overlayKind");
const overlayTitle = document.querySelector("#overlayTitle");
const overlayInfo = document.querySelector("#overlayInfo");
const screenOverlay = document.querySelector("#screenOverlay");
const openScreenBtn = document.querySelector("#openScreenBtn");
const closeScreenBtn = document.querySelector("#closeScreenBtn");
const selectedArea = document.querySelector("#selectedArea");

const quickPanel = document.querySelector("#quickPanel");
const quickSearchInput = document.querySelector("#quickSearchInput");
const quickPanelText = document.querySelector("#quickPanelText");
const searchBtn = document.querySelector("#searchBtn");
const settingsBtn = document.querySelector("#settingsBtn");
const profileBtn = document.querySelector("#profileBtn");
const clockBtn = document.querySelector("#clockBtn");
const tabs = document.querySelectorAll(".tab-btn");
const iconButtons = document.querySelectorAll(".icon-btn");
const gameRow = document.querySelector("#gameRow");
const gameCards = document.querySelectorAll(".game-card");
const scrollLeftBtn = document.querySelector("#scrollLeftBtn");
const scrollRightBtn = document.querySelector("#scrollRightBtn");
const friendsWidget = document.querySelector("#friendsWidget");
const screenWidget = document.querySelector("#screenWidget");
const accessWidget = document.querySelector("#accessWidget");
const accessText = document.querySelector("#accessText");
const batteryWidget = document.querySelector(".battery-widget");
const batteryCircles = document.querySelectorAll(".battery-circle");
const trophiesWidget = document.querySelector("#trophiesWidget");
const trophyTotal = document.querySelector("#trophyTotal");
const trophyProgress = document.querySelector("#trophyProgress");
const wishlistWidget = document.querySelector("#wishlistWidget");
const wishlistText = document.querySelector("#wishlistText");
const widgets = document.querySelectorAll(".widget");

const DELETE_SOUND = new Audio("../../EsercizioDom2/media/AAAAUUUGHHHH Meme Sound Effect.mp3");

const PS5_DASHBOARD = {
  friends: [
    { nickname: "NovaSpecter", friendNumber: 104455 },
    { nickname: "PixelRonin", friendNumber: 208812 },
    { nickname: "FrostCircuit", friendNumber: 331907 },
    { nickname: "MoonCipher", friendNumber: 442019 },
    { nickname: "IronPulse", friendNumber: 505777 },
    { nickname: "RocketShade", friendNumber: 690241 },
    { nickname: "ByteSamurai", friendNumber: 734801 },
    { nickname: "TurboComet", friendNumber: 845612 },
    { nickname: "WizardFlux", friendNumber: 912340 },
    { nickname: "CrystalBlade", friendNumber: 167890 },
    { nickname: "ThunderBreaker", friendNumber: 590418 },
    { nickname: "QuestRider", friendNumber: 728144 },
    { nickname: "ShadowOrbit", friendNumber: 819502 },
    { nickname: "RiftHunter", friendNumber: 438210 },
    { nickname: "FalconRush", friendNumber: 672935 },
    { nickname: "GhostLevel", friendNumber: 984301 },
    { nickname: "CyberAtlas", friendNumber: 782401 },
    { nickname: "SolarKnock", friendNumber: 315904 },
    { nickname: "BlueArcade", friendNumber: 496118 },
    { nickname: "PhantomDash", friendNumber: 257630 }
  ]
};

let friendsVisible = true;
let accessEnabled = false;
let trophyCounter = 380;
let trophyPercent = 33;
let wishlistSaved = false;
let clockEuropean = false;

function writeStatus(message) {
  statusMessage.innerHTML = message;
  quickPanelText.innerHTML = message;
}

function updateFriendsCount() {
  friendsCount.innerHTML = PS5_DASHBOARD.friends.length;
}

function updateScreen(kind, title, info) {
  selectedKind.innerHTML = kind;
  selectedTitle.innerHTML = title;
  screenKind.innerHTML = kind;
  screenTitle.innerHTML = title;
  screenInfo.innerHTML = info;
  overlayKind.innerHTML = kind;
  overlayTitle.innerHTML = title;
  overlayInfo.innerHTML = info;
}

function setActiveWidget(widget) {
  widgets.forEach((singleWidget) => {
    singleWidget.classList.remove("active-widget");
  });

  if (widget) {
    widget.classList.add("active-widget");
  }
}

function setActiveAction(button) {
  iconButtons.forEach((singleButton) => {
    singleButton.classList.remove("active-action");
  });

  if (button) {
    button.classList.add("active-action");
  }
}

function applyTheme(themeName) {
  const classes = [...pageBody.classList];

  classes.forEach((className) => {
    if (className.startsWith("theme-")) {
      pageBody.classList.remove(className);
    }
  });

  pageBody.classList.add("theme-" + themeName);
}

function openScreen() {
  screenOverlay.classList.remove("d-none");
  setActiveWidget(screenWidget);
  writeStatus("Screen opened.");
}

function closeScreen() {
  if (!screenOverlay.classList.contains("d-none")) {
    screenOverlay.classList.add("d-none");
    writeStatus("Screen closed.");
  }
}

function toggleClock() {
  clockEuropean = !clockEuropean;
  clockBtn.classList.toggle("active-clock");

  if (clockEuropean) {
    clockBtn.innerHTML = "16:20";
    updateScreen("Clock", "16:20", "Time shown in 24-hour format.");
    writeStatus("24h clock enabled.");
  } else {
    clockBtn.innerHTML = "4:20 AM";
    updateScreen("Clock", "4:20 AM", "Time shown in AM format.");
    writeStatus("AM clock enabled.");
  }
}

function showFriends(friendsToShow) {
  wrapperCards.innerHTML = "";
  updateFriendsCount();

  const friends = friendsToShow || PS5_DASHBOARD.friends;

  if (friends.length === 0) {
    wrapperCards.innerHTML = '<p class="empty-message">No players found.</p>';
    return;
  }

  friends.forEach((friend) => {
    const index = PS5_DASHBOARD.friends.indexOf(friend);
    const avatarNumber = (index % 6) + 1;
    const div = document.createElement("div");

    div.classList.add("friend-card", "avatar-" + avatarNumber);
    div.innerHTML = `
      <div class="player-icon">
        <i class="fa-solid fa-user-astronaut"></i>
      </div>

      <div class="player-info">
        <p class="player-name">${friend.nickname}</p>
        <p class="player-number">Friend Number: ${friend.friendNumber}</p>
      </div>

      <i class="fa-solid fa-trash-can" data-index="${index}"></i>
    `;

    div.addEventListener("click", () => {
      const cards = document.querySelectorAll(".friend-card");

      cards.forEach((card) => {
        card.classList.remove("selected");
      });

      div.classList.add("selected");
      nicknameInput.value = friend.nickname;
      friendNumberInput.value = friend.friendNumber;
      updateScreen("Friend", friend.nickname, "Friend Number: " + friend.friendNumber);
      setActiveWidget(friendsWidget);
      writeStatus("Player selected.");
    });

    wrapperCards.appendChild(div);
  });

  const icons = document.querySelectorAll(".fa-trash-can");

  icons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = icon.dataset.index;
      DELETE_SOUND.currentTime = 0;
      DELETE_SOUND.play();
      PS5_DASHBOARD.friends.splice(index, 1);
      showFriends();
      setActiveWidget(friendsWidget);
      writeStatus("Player removed.");
    });
  });
}

function addFriend(newNickname, newFriendNumber) {
  PS5_DASHBOARD.friends.push({ nickname: newNickname, friendNumber: newFriendNumber });
  showFriends();
  updateScreen("Friend", newNickname, "Friend Number: " + newFriendNumber);
  setActiveWidget(friendsWidget);
  writeStatus("Player added.");
}

function removeFriend(removedNickname) {
  const nicknames = PS5_DASHBOARD.friends.map((friend) => friend.nickname.toLowerCase());
  const index = nicknames.indexOf(removedNickname.toLowerCase());

  if (index > -1) {
    PS5_DASHBOARD.friends.splice(index, 1);
    showFriends();
    setActiveWidget(friendsWidget);
    writeStatus("Player removed.");
  } else {
    alert("Player not found.");
    writeStatus("Player not found.");
  }
}

function searchFriend(searchedNickname) {
  const friendsFound = PS5_DASHBOARD.friends.filter((friend) => {
    return friend.nickname.toLowerCase().includes(searchedNickname.toLowerCase());
  });

  showFriends(friendsFound);
  setActiveWidget(friendsWidget);
  writeStatus("Search results.");
}

function selectTab(tab) {
  tabs.forEach((singleTab) => {
    singleTab.classList.remove("active");
  });

  tab.classList.add("active");
  updateScreen("Tab", tab.dataset.view, tab.dataset.view + " section opened.");
  setActiveAction(null);

  if (tab.dataset.view === "Media") {
    applyTheme("library");
    setActiveWidget(wishlistWidget);
  } else {
    applyTheme("home");
    setActiveWidget(screenWidget);
  }

  writeStatus(tab.dataset.view + " selected.");
}

function selectGame(card) {
  gameCards.forEach((gameCard) => {
    gameCard.classList.remove("selected");
  });

  card.classList.add("selected");
  card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  applyTheme(card.dataset.theme);
  updateScreen(card.dataset.kind, card.dataset.title, card.dataset.info);
  writeStatus(card.dataset.title + " selected.");
  setTimeout(updateRailButtons, 250);
}

function scrollGames(direction) {
  gameRow.scrollBy({
    left: direction * 360,
    behavior: "smooth"
  });

  setTimeout(updateRailButtons, 250);
}

function updateRailButtons() {
  const maxScroll = gameRow.scrollWidth - gameRow.clientWidth;

  scrollLeftBtn.disabled = gameRow.scrollLeft <= 2;
  scrollRightBtn.disabled = gameRow.scrollLeft >= maxScroll - 2;
}

function selectNearGame(direction) {
  const games = [...gameCards];
  const currentIndex = games.findIndex((card) => {
    return card.classList.contains("selected");
  });
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < games.length) {
    selectGame(games[nextIndex]);
  }
}

function toggleQuickPanel() {
  quickPanel.classList.toggle("d-none");

  if (!quickPanel.classList.contains("d-none")) {
    setActiveAction(searchBtn);
    quickSearchInput.focus();
    writeStatus("Search opened.");
  } else {
    setActiveAction(null);
    writeStatus("Search closed.");
  }
}

function toggleAccessibility() {
  accessEnabled = !accessEnabled;
  accessWidget.classList.toggle("enabled");
  setActiveWidget(accessWidget);

  if (accessEnabled) {
    accessText.innerHTML = "Accessibility options enabled.";
    updateScreen("Settings", "Accessibility", "Accessibility options enabled.");
    writeStatus("Accessibility enabled.");
  } else {
    accessText.innerHTML = "Make your PS5 more usable for you.";
    updateScreen("Settings", "Accessibility", "Accessibility options disabled.");
    writeStatus("Accessibility disabled.");
  }
}

function cycleBattery(circle) {
  setActiveWidget(batteryWidget);

  if (circle.classList.contains("active")) {
    circle.classList.remove("active");
    circle.classList.add("warning");
    writeStatus("Battery medium.");
  } else if (circle.classList.contains("warning")) {
    circle.classList.remove("warning");
    circle.classList.add("low");
    writeStatus("Battery low.");
  } else {
    circle.classList.remove("low");
    circle.classList.add("active");
    writeStatus("Battery charged.");
  }

  updateScreen("Device", "Battery", "Controller battery status changed.");
}

function updateTrophies() {
  setActiveWidget(trophiesWidget);
  trophyCounter++;
  trophyPercent += 7;

  if (trophyPercent > 100) {
    trophyPercent = 33;
  }

  trophyTotal.innerHTML = trophyCounter;
  trophyProgress.style.width = trophyPercent + "%";
  updateScreen("Trophies", "Total: " + trophyCounter, "Progress updated to " + trophyPercent + "%.");
  writeStatus("Trophy progress updated.");
}

function toggleWishlist() {
  wishlistSaved = !wishlistSaved;
  wishlistWidget.classList.toggle("saved");
  setActiveWidget(wishlistWidget);

  if (wishlistSaved) {
    wishlistText.innerHTML = "Skyrim saved.";
    updateScreen("Wishlist", "Skyrim", "Saved in wishlist.");
    writeStatus("Skyrim saved in wishlist.");
  } else {
    wishlistText.innerHTML = "Click to save this game.";
    updateScreen("Wishlist", "Skyrim", "Removed from wishlist.");
    writeStatus("Skyrim removed from wishlist.");
  }
}

showFriendsBtn.addEventListener("click", () => {
  if (friendsVisible === false) {
    showFriends();
    friendsVisible = true;
    showFriendsBtn.innerHTML = "Hide";
    writeStatus("Friends visible.");
  } else {
    wrapperCards.innerHTML = "";
    friendsVisible = false;
    showFriendsBtn.innerHTML = "Show";
    writeStatus("Friends hidden.");
  }
});

addFriendBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  const friendNumber = friendNumberInput.value.trim();

  if (nickname !== "" && friendNumber !== "" && friendNumber.length >= 3) {
    addFriend(nickname, friendNumber);
    friendsVisible = true;
    showFriendsBtn.innerHTML = "Hide";
    nicknameInput.value = "";
    friendNumberInput.value = "";
  } else {
    alert("Insert nickname and friend number.");
    writeStatus("Fill nickname and friend number.");
  }
});

removeFriendBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();

  if (nickname === "") {
    alert("Insert nickname to remove.");
    return;
  }

  removeFriend(nickname);
  friendsVisible = true;
  showFriendsBtn.innerHTML = "Hide";
  nicknameInput.value = "";
});

searchFriendBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();

  if (nickname === "") {
    alert("Insert nickname to search.");
    return;
  }

  searchFriend(nickname);
  friendsVisible = true;
  showFriendsBtn.innerHTML = "Hide";
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectTab(tab);
  });
});

gameCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectGame(card);
  });
});

scrollLeftBtn.addEventListener("click", () => {
  scrollGames(-1);
  writeStatus("Games moved left.");
});

scrollRightBtn.addEventListener("click", () => {
  scrollGames(1);
  writeStatus("Games moved right.");
});

gameRow.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    gameRow.scrollBy({
      left: event.deltaY,
      behavior: "smooth"
    });
  }
}, { passive: false });

gameRow.addEventListener("scroll", () => {
  updateRailButtons();
});

window.addEventListener("resize", () => {
  updateRailButtons();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeScreen();
    quickPanel.classList.add("d-none");
    setActiveAction(null);
    return;
  }

  if (document.activeElement.tagName === "INPUT") {
    return;
  }

  if (event.key === "ArrowLeft") {
    selectNearGame(-1);
  } else if (event.key === "ArrowRight") {
    selectNearGame(1);
  }
});

searchBtn.addEventListener("click", () => {
  toggleQuickPanel();
});

settingsBtn.addEventListener("click", () => {
  setActiveAction(settingsBtn);
  setActiveWidget(accessWidget);
  applyTheme("controller");
  updateScreen("Settings", "Settings", "Console settings opened.");
  writeStatus("Settings opened.");
});

profileBtn.addEventListener("click", () => {
  setActiveAction(profileBtn);
  setActiveWidget(friendsWidget);
  applyTheme("home");
  updateScreen("Profile", "Player Profile", "Profile panel opened.");
  writeStatus("Profile opened.");
});

clockBtn.addEventListener("click", () => {
  toggleClock();
});

selectedArea.addEventListener("click", () => {
  openScreen();
});

friendsWidget.addEventListener("click", (event) => {
  if (event.target.closest("input, button, .friend-card, .fa-trash-can")) {
    return;
  }

  setActiveWidget(friendsWidget);
  updateScreen("Friends", "Online Friends", "Add, remove, search or select a player.");
  writeStatus("Friends widget selected.");
});

screenWidget.addEventListener("click", () => {
  openScreen();
});

quickSearchInput.addEventListener("input", () => {
  const text = quickSearchInput.value.trim().toLowerCase();
  const friendsFound = PS5_DASHBOARD.friends.filter((friend) => {
    return friend.nickname.toLowerCase().includes(text);
  });
  const gameFound = [...gameCards].find((card) => {
    return card.dataset.title.toLowerCase().includes(text);
  });

  if (text === "") {
    showFriends();
    writeStatus("Search ready.");
    return;
  }

  if (gameFound) {
    selectGame(gameFound);
  }

  showFriends(friendsFound);
  writeStatus("Quick search active.");
});

accessWidget.addEventListener("click", () => {
  toggleAccessibility();
});

batteryCircles.forEach((circle) => {
  circle.addEventListener("click", () => {
    cycleBattery(circle);
  });
});

trophiesWidget.addEventListener("click", () => {
  updateTrophies();
});

wishlistWidget.addEventListener("click", () => {
  toggleWishlist();
});

openScreenBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  openScreen();
});

closeScreenBtn.addEventListener("click", () => {
  closeScreen();
});

screenOverlay.addEventListener("click", (event) => {
  if (event.target === screenOverlay) {
    closeScreen();
  }
});

showFriends();
updateScreen("Home", "Welcome", "Your main PS5 dashboard.");
applyTheme("home");
writeStatus("Dashboard loaded.");
updateRailButtons();
