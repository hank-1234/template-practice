// const different show-modal to deal with the problem of the invalid click for the near object
const showModalBtn = document.querySelector(".show-modal");
const showModalBtn2 = document.querySelector(".show-modal2");
const showModalBtn3 = document.querySelector(".show-modal3");
const showModalBtn4 = document.querySelector(".show-modal4");
const showModalBtn5 = document.querySelector(".show-modal5");
const showModalBtn6 = document.querySelector(".show-modal6");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");

// Global variables for tracking drag events
let isDragging = false, startY, startHeight;

const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
    
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`;
    bottomSheet.classList.toggle("fullscreen", height === 100)
}

// Sets initial drag position and sheetContent height
const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
}

// Calculates the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default
// height based om the current height of the sheet content
const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50)
}

document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);

document.addEventListener("touchend", dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);

showModalBtn.addEventListener("click", showBottomSheet);
showModalBtn2.addEventListener("click", showBottomSheet);
showModalBtn3.addEventListener("click", showBottomSheet);
showModalBtn4.addEventListener("click", showBottomSheet);
showModalBtn5.addEventListener("click", showBottomSheet);
showModalBtn6.addEventListener("click", showBottomSheet);
sheetOverlay.addEventListener("click", hideBottomSheet);